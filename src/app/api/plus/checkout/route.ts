import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { isPlusPlan, pickPlusPrice, type PlusPlan } from "@/lib/plus-subscription";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** リクエストボディからプランを読む。未指定・不正な値は従来どおり月払い。 */
async function readPlan(req: NextRequest): Promise<PlusPlan> {
    try {
        const body = await req.json();
        const plan = (body as { plan?: unknown } | null)?.plan;
        return isPlusPlan(plan) ? plan : "monthly";
    } catch {
        return "monthly";
    }
}

/**
 * 自主トレ素材庫Plus のサブスク決済セッションを作る。
 * plan: "monthly"（既定）/ "yearly" で価格を切り替える。
 */
export async function POST(req: NextRequest) {
    if (!isStripeConfigured()) {
        return NextResponse.json(
            { error: "決済機能の準備中です。時間をおいて再度お試しください。" },
            { status: 503 },
        );
    }

    const plan = await readPlan(req);

    let picked;
    try {
        picked = await pickPlusPrice(plan);
    } catch (err) {
        console.error("plus checkout: pickPlusPrice failed:", err);
        return NextResponse.json({ error: "価格情報の取得に失敗しました。" }, { status: 500 });
    }

    if (!picked) {
        console.error(`plus checkout: ${plan} の価格ID（STRIPE_PRICE_ID_PLUS_*）が未設定です。`);
        return NextResponse.json(
            {
                error:
                    plan === "yearly"
                        ? "年払いは現在ご利用いただけません。月払いでお申し込みください。"
                        : "商品の価格設定が見つかりません。",
            },
            { status: 503 },
        );
    }

    const stripe = getStripe();
    if (!stripe) {
        return NextResponse.json(
            { error: "決済機能の準備中です。時間をおいて再度お試しください。" },
            { status: 503 },
        );
    }

    try {
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            line_items: [{ price: picked.priceId, quantity: 1 }],
            allow_promotion_codes: true,
            metadata: { plus_plan: picked.plan },
            subscription_data: { metadata: { plus_plan: picked.plan } },
            success_url: `${SITE_URL}/api/plus/welcome/?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${SITE_URL}/products/jishutore-plus/?canceled=1`,
        });

        if (!session.url) {
            return NextResponse.json({ error: "決済セッションの作成に失敗しました。" }, { status: 500 });
        }
        return NextResponse.json({ url: session.url });
    } catch (err) {
        console.error("plus checkout error:", err);
        return NextResponse.json({ error: "決済セッションの作成に失敗しました。" }, { status: 500 });
    }
}
