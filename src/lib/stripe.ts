import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
    throw new Error(
        'STRIPE_SECRET_KEY が設定されていません。.env.local に STRIPE_SECRET_KEY を追加してください。'
    );
}

export const stripe = new Stripe(secretKey);
