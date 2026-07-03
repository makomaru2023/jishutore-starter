import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { normalizeEmail } from "@/lib/plus-auth";

/**
 * 自主トレ素材庫Plus のサブスク制御（Stripe が真実の情報源）。
 *
 * 料金は「時期・素材点数のマイルストーンで現在価格を切り替える」方式。
 *   7月登録 = ¥500 / 8月〜 = ¥680 / 200点到達 = ¥780 / 300点到達 = ¥980
 * 契約ごとに価格がロックされるため、既存会員は登録時の価格のまま永久据え置き。
 *
 * - 新規に売る価格 = 環境変数 STRIPE_PRICE_ID_PLUS_CURRENT の1本だけ。
 *   値上げのたびにこの環境変数を新しい価格IDに差し替える（コード変更不要）。
 * - 会員かどうかの判定 = 「Plus商品群（STRIPE_PRODUCT_IDS_PLUS）に属する価格の
 *   有効サブスクを持っているか」。過去/未来どの価格帯の会員でも通る。
 */

/** 現在、新規登録者に適用する価格ID（例：7月は¥500）。 */
export const PLUS_CURRENT_PRICE =
    process.env.STRIPE_PRICE_ID_PLUS_CURRENT ||
    process.env.STRIPE_PRICE_ID_PLUS_FOUNDING || // 旧設定からのフォールバック
    undefined;

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

/** 新規登録者に割り当てる価格を返す（現在価格1本）。 */
export async function pickPlusPrice(): Promise<{ priceId: string } | null> {
    if (!PLUS_CURRENT_PRICE) return null;
    return { priceId: PLUS_CURRENT_PRICE };
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
