import { NextRequest, NextResponse } from 'next/server';
import { getStripe, isStripeConfigured } from '@/lib/stripe';
import { DAY_SERVICE_EXERCISE_PACK_PRICE_ID, POSTURE_SELF_TRAINING_PRICE_ID } from '@/lib/products';
import { PRODUCT_ZIP_KEYS } from '@/lib/orders';
import { r2ObjectExists } from '@/lib/r2';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

type ProductConfig = {
    /** Stripe Price ID（環境変数） */
    priceId: string | undefined;
    /** キャンセル時に戻す URL（NEXT_PUBLIC_SITE_URL を起点とした絶対 URL） */
    cancelPath: string;
};

// ★2026-08-20：素材の買い切り2つ（疾患別・姿勢別）を各¥980で再開した（ユーザー判断）。
// 線引きは「素材＝買い切り／道具・調べ物＝サブスク」。
// まとめ買い（¥1,480）とプロンプト工房は戻さない＝Plus¥500に負けて軸が濁るため。
const PRODUCTS: Record<string, ProductConfig> = {
    'self-training-materials-vol01': {
        priceId: process.env.STRIPE_PRICE_ID_SELF_TRAINING_SET,
        cancelPath: '/products/self-training-materials',
    },
    'home-elderly-self-training': {
        priceId: POSTURE_SELF_TRAINING_PRICE_ID,
        cancelPath: '/products/home-elderly-self-training',
    },
    'day-service-exercise-pack': {
        priceId: DAY_SERVICE_EXERCISE_PACK_PRICE_ID,
        cancelPath: '/products/day-service-exercise-pack',
    },
};

export async function POST(req: NextRequest) {
    let productId: string | undefined;

    try {
        const body = await req.json();
        productId = typeof body?.productId === 'string' ? body.productId : undefined;
    } catch {
        return NextResponse.json({ error: 'リクエストの形式が正しくありません。' }, { status: 400 });
    }

    if (!productId || !PRODUCTS[productId]) {
        return NextResponse.json({ error: '不正な商品IDです。' }, { status: 400 });
    }

    const { priceId, cancelPath } = PRODUCTS[productId];

    if (!isStripeConfigured()) {
        console.error('Stripe checkout: STRIPE_SECRET_KEY is not configured.');
        return NextResponse.json(
            { error: '決済機能の準備中です。時間をおいて再度お試しください。' },
            { status: 503 }
        );
    }

    if (!priceId) {
        console.error(`Stripe checkout: price id is not configured for product "${productId}".`);
        return NextResponse.json(
            { error: '商品の価格設定が見つかりません。' },
            { status: 503 }
        );
    }

    // 配布ZIPが設定済みかつR2に実在する場合だけ決済を開始する。
    // 支払い後にファイルを受け取れない事故を安全側で防ぐ。
    const zipKey = PRODUCT_ZIP_KEYS[productId];
    if (!zipKey || !(await r2ObjectExists(zipKey))) {
        console.error(`Stripe checkout: delivery file is not ready for product "${productId}".`);
        return NextResponse.json(
            { error: '配布ファイルの準備中です。時間をおいて再度お試しください。' },
            { status: 503 }
        );
    }

    const stripe = getStripe();
    if (!stripe) {
        return NextResponse.json(
            { error: '決済機能の準備中です。時間をおいて再度お試しください。' },
            { status: 503 }
        );
    }

    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: [{ price: priceId, quantity: 1 }],
            success_url: `${SITE_URL}/thank-you?product=${productId}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${SITE_URL}${cancelPath}?canceled=1`,
        });

        if (!session.url) {
            return NextResponse.json(
                { error: 'Checkout セッションの作成に失敗しました。' },
                { status: 500 }
            );
        }

        return NextResponse.json({ url: session.url });
    } catch (err) {
        console.error('Stripe checkout error:', err);
        return NextResponse.json(
            { error: '決済セッションの作成に失敗しました。' },
            { status: 500 }
        );
    }
}
