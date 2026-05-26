import Stripe from 'stripe';

// 環境変数 STRIPE_SECRET_KEY が未設定でもモジュール読み込み時には落ちないようにする。
// 実際に Stripe API を呼び出す時点で未設定なら例外になる（呼び出し側で catch する想定）。

let cached: Stripe | null = null;

export function isStripeConfigured(): boolean {
    return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function getStripe(): Stripe | null {
    if (cached) return cached;
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) return null;
    cached = new Stripe(key);
    return cached;
}

// 既存呼び出し（`stripe.checkout.sessions.create(...)` 等）と互換を保つための Proxy。
// 環境変数未設定の状態でプロパティアクセスすると例外になるため、
// 利用側で isStripeConfigured() を事前チェックするか try/catch で囲むこと。
export const stripe: Stripe = new Proxy({} as Stripe, {
    get(_target, prop) {
        const s = getStripe();
        if (!s) {
            throw new Error(
                'STRIPE_SECRET_KEY が設定されていません。.env に STRIPE_SECRET_KEY を追加してください。'
            );
        }
        const value = (s as unknown as Record<string | symbol, unknown>)[prop];
        if (typeof value === 'function') {
            return (value as (...args: unknown[]) => unknown).bind(s);
        }
        return value;
    },
});
