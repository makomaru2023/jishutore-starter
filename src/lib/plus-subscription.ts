import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { normalizeEmail } from "@/lib/plus-auth";

/**
 * 自主トレ素材庫Plus のサブスク制御（Stripe が真実の情報源）。
 *
 * 料金は「現在価格を環境変数で切り替える」方式。
 *   2026年7月登録 = ¥500（先行） / 2026年8月1日〜 = ¥980（全部入り一本化後の新規価格）
 * 契約ごとに価格がロックされるため、既存会員は登録時の価格のまま永久据え置き。
 *
 * - 新規に売る価格 = 環境変数 STRIPE_PRICE_ID_PLUS_CURRENT（月払い）と
 *   STRIPE_PRICE_ID_PLUS_CURRENT_YEARLY（年払い）の2本だけ。
 *   値上げのたびにこの環境変数を新しい価格IDに差し替える（コード変更不要）。
 * - 会員かどうかの判定 = 「Plus商品群（STRIPE_PRODUCT_IDS_PLUS）に属する価格の
 *   有効サブスクを持っているか」。月払い/年払い・過去/未来どの価格帯の会員でも通る。
 *   ＝ 年額価格は必ず既存の Plus 商品配下に作ること（別商品にすると会員判定から漏れる）。
 */

/** 申し込みプラン。年払いは価格IDが設定されている場合のみ選べる。 */
export type PlusPlan = "monthly" | "yearly";

export function isPlusPlan(value: unknown): value is PlusPlan {
    return value === "monthly" || value === "yearly";
}

/** 現在、新規登録者に適用する月払いの価格ID（例：7月は¥500）。 */
export const PLUS_CURRENT_PRICE =
    process.env.STRIPE_PRICE_ID_PLUS_CURRENT ||
    process.env.STRIPE_PRICE_ID_PLUS_FOUNDING || // 旧設定からのフォールバック
    undefined;

/** 現在、新規登録者に適用する年払いの価格ID（未設定なら年払いは売らない）。 */
export const PLUS_CURRENT_PRICE_YEARLY =
    process.env.STRIPE_PRICE_ID_PLUS_CURRENT_YEARLY || undefined;

/** 年払いが購入可能か（サーバー側の実態）。 */
export const isPlusYearlyAvailable = () => Boolean(PLUS_CURRENT_PRICE_YEARLY);

/** アクセスを許可する契約ステータス（支払い遅延中も猶予として許可）。 */
const ACTIVE_STATUSES = new Set(["active", "trialing", "past_due"]);

/** Plus の全価格が属する Stripe 商品IDの集合（¥500商品・¥980商品など）。 */
const DEFAULT_PLUS_PRODUCTS = ["prod_UoDU46q5ryStkb", "prod_UoDVVo05cDyNoa"];
const PLUS_PRODUCT_IDS: Set<string> = (() => {
    const fromEnv = (process.env.STRIPE_PRODUCT_IDS_PLUS ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    return new Set(fromEnv.length > 0 ? fromEnv : DEFAULT_PLUS_PRODUCTS);
})();

/** 価格オブジェクトから商品IDを取り出す（string / Product / DeletedProduct に対応）。 */
function priceProductId(price: Stripe.Price | null | undefined): string | null {
    const product = price?.product;
    if (!product) return null;
    return typeof product === "string" ? product : product.id;
}

/** この価格が Plus 商品群に属するか。 */
export function isPlusPriceObject(price: Stripe.Price | null | undefined): boolean {
    const pid = priceProductId(price);
    return pid ? PLUS_PRODUCT_IDS.has(pid) : false;
}

/**
 * 新規登録者に割り当てる価格を返す（プランごとに現在価格1本）。
 * 年払いを指定されても価格IDが未設定なら null を返す（月払いへの黙った差し替えはしない）。
 */
export async function pickPlusPrice(
    plan: PlusPlan = "monthly",
): Promise<{ priceId: string; plan: PlusPlan } | null> {
    const priceId = plan === "yearly" ? PLUS_CURRENT_PRICE_YEARLY : PLUS_CURRENT_PRICE;
    if (!priceId) return null;
    return { priceId, plan };
}

export interface ActivePlusSubscription {
    customerId: string;
    subscriptionId: string;
    status: string;
}

/**
 * メールアドレスに紐づく「有効な Plus 契約」を探す。
 * 同じメールで複数の Stripe Customer が存在しうるため全て走査する。
 */
export async function findActivePlusSubscription(
    email: string,
): Promise<ActivePlusSubscription | null> {
    const stripe = getStripe();
    if (!stripe) return null;

    const customers = await stripe.customers.list({ email: normalizeEmail(email), limit: 100 });
    for (const customer of customers.data) {
        const subs = await stripe.subscriptions.list({
            customer: customer.id,
            status: "all",
            limit: 100,
        });
        for (const sub of subs.data) {
            if (!ACTIVE_STATUSES.has(sub.status)) continue;
            if (isPlusPriceObject(sub.items.data[0]?.price)) {
                return { customerId: customer.id, subscriptionId: sub.id, status: sub.status };
            }
        }
    }
    return null;
}

/**
 * 特定の Stripe Customer が有効な Plus 契約を持つか確認する。
 * ダウンロード時のゲート（解約者を弾く）に使う。cid は確実に存在するため email より正確。
 */
export async function hasActivePlusForCustomer(customerId: string): Promise<boolean> {
    const stripe = getStripe();
    if (!stripe) return false;
    const subs = await stripe.subscriptions.list({ customer: customerId, status: "all", limit: 100 });
    return subs.data.some(
        (sub) => ACTIVE_STATUSES.has(sub.status) && isPlusPriceObject(sub.items.data[0]?.price),
    );
}

/** Stripe カスタマーポータル（プラン管理・解約）のURLを発行する。 */
export async function createPortalUrl(customerId: string, returnUrl: string): Promise<string | null> {
    const stripe = getStripe();
    if (!stripe) return null;
    const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
    });
    return session.url ?? null;
}
