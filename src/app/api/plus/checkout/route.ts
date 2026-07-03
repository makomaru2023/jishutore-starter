import { NextResponse } from "next/server";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { pickPlusPrice } from "@/lib/plus-subscription";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/**
 * 自主トレ素材庫Plus のサブスク決済セッションを作る。
 * 先着10名は自動で¥500、以降は¥980の価格が選ばれる。
 */
export async function POST() {
    if (!isStripeConfigured()) {
        return NextResponse.json(
            { error: "決済機能の準備中です。時間をおいて再度お試しください。" },
            { status: 503 },
        );
    }

    let picked;
    try {
        picked = await pickPlusPrice();
    } catch (err) {
        console.error("plus checkout: pickPlusPrice failed:", err);
        return NextResponse.json({ error: "価格情報の取得に失敗しました。" }, { status: 500 });
    }

    if (!picked) {
        console.error("plus checkout: STRIPE_PRICE_ID_PLUS_* が未設定です。");
        return NextResponse.json({ error: "商品の価格設定が見つかりません。" }, { status: 503 });
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
            success_url: `${SITE_URL}/plus/welcome/?session_id={CHECKOUT_SESSION_ID}`,
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
