import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-11-20.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
        return NextResponse.json(
            { error: 'Stripe署名がありません' },
            { status: 400 }
        );
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        console.error('Webhook署名検証エラー:', err);
        return NextResponse.json(
            { error: 'Webhook署名検証に失敗しました' },
            { status: 400 }
        );
    }

    // イベントタイプに応じた処理
    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object as Stripe.Checkout.Session;

            console.log('決済完了:', {
                sessionId: session.id,
                customerEmail: session.customer_details?.email,
                planName: session.metadata?.planName,
                amount: session.amount_total,
            });

            // ここで以下の処理を実装できます：
            // 1. データベースに購入情報を保存
            // 2. ユーザーにダウンロードリンクをメール送信
            // 3. ユーザーアカウントに購入プランを紐付け

            break;
        }

        case 'payment_intent.succeeded': {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            console.log('支払い成功:', paymentIntent.id);
            break;
        }

        case 'payment_intent.payment_failed': {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            console.log('支払い失敗:', paymentIntent.id);
            break;
        }

        default:
            console.log(`未処理のイベントタイプ: ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
