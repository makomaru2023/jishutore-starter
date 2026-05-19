import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

const PRODUCTS: Record<string, { priceId: string | undefined }> = {
    'self-training-materials-vol01': {
        priceId: process.env.STRIPE_PRICE_ID_SELF_TRAINING_SET,
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

    const priceId = PRODUCTS[productId].priceId;

    if (!priceId) {
        return NextResponse.json(
            { error: '商品の価格設定が見つかりません。' },
            { status: 500 }
        );
    }

    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: [{ price: priceId, quantity: 1 }],
            success_url: `${SITE_URL}/thank-you?product=${productId}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${SITE_URL}/products/self-training-materials?canceled=1`,
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
