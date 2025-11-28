'use server';

import Stripe from 'stripe';
import { signDownloadToken } from '@/lib/auth';

import { cookies } from 'next/headers';

export async function verifySessionAndGetToken(sessionId: string) {
    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error('Stripe Secret Key is missing');
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-11-17.clover',
    });

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['line_items'],
        });

        if (session.payment_status !== 'paid') {
            return { error: 'お支払いが完了していません。' };
        }

        // Determine plan from price ID or metadata
        // Since we didn't store plan name in metadata in the checkout route (wait, we did: metadata: { planName }), 
        // let's try to get it from there first.
        // If not, we can infer from amount or price ID.

        let plan = 'basic'; // default
        const amount = session.amount_total;

        // Simple logic based on amount (since we just updated prices)
        if (amount === 980) plan = 'basic';
        else if (amount === 1980) plan = 'pro';
        else if (amount === 2980) plan = 'premium';
        else {
            // Fallback: check line items if needed, or metadata
            // Note: metadata might be null if not passed correctly, but we added it in checkout route.
            // However, let's rely on amount for robustness as it's definitive for this MVP.
        }

        const token = await signDownloadToken({ plan, sessionId });

        // Set purchased cookie server-side for better durability (10 years)
        cookies().set('purchased', 'true', {
            path: '/',
            maxAge: 315360000, // 10 years in seconds
            httpOnly: false, // Allow client-side access if needed for UI checks
            secure: true,
            sameSite: 'lax',
        });

        return { success: true, token, plan };
    } catch (error) {
        console.error('Session verification error:', error);
        return { error: 'セッションの確認に失敗しました。' };
    }
}
