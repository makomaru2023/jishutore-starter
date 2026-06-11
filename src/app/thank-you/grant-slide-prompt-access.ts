"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { SLIDE_PROMPT_GENERATOR_PRICE_ID } from "@/lib/products";

const SLIDE_PROMPT_PATH = "/member/slide-prompt-generator";
const COOKIE_NAME = "slide_prompt_access";
const MAX_AGE = 60 * 60 * 24 * 30; // 30日（切れたら同じサンクスURLから再付与可能）

/**
 * 「伝わるプロンプト工房」購入者にアクセス権 Cookie を付与する Server Action。
 *
 * フロー:
 * 1. 受け取った sessionId が Stripe で実在し、`paid` であることを確認
 * 2. その line item の priceId が「プロンプト工房」のものと一致することを確認
 * 3. 一致したら `slide_prompt_access` Cookie をセット
 * 4. /member/slide-prompt-generator にリダイレクト
 *
 * 検証に失敗した場合は何もせず `/products/slide-prompt-generator` にリダイレクト。
 */
export async function grantSlidePromptAccess(sessionId: string): Promise<void> {
    const cookieValue = process.env.SLIDE_PROMPT_COOKIE_VALUE;
    if (!cookieValue) {
        console.error("SLIDE_PROMPT_COOKIE_VALUE is not configured.");
        redirect("/products/slide-prompt-generator");
    }

    if (!SLIDE_PROMPT_GENERATOR_PRICE_ID) {
        console.error("STRIPE_PRICE_ID_SLIDE_PROMPT_GENERATOR is not configured.");
        redirect("/products/slide-prompt-generator");
    }

    if (!sessionId) {
        redirect("/products/slide-prompt-generator");
    }

    // 1. Stripe セッションを検証
    let session;
    try {
        session = await stripe.checkout.sessions.retrieve(sessionId);
    } catch (err) {
        console.error("grantSlidePromptAccess: failed to retrieve Stripe session", err);
        redirect("/products/slide-prompt-generator");
    }

    if (session.payment_status !== "paid") {
        redirect("/products/slide-prompt-generator");
    }

    // 2. line item の priceId を確認
    let priceId: string | undefined;
    try {
        const items = await stripe.checkout.sessions.listLineItems(session.id, { limit: 5 });
        priceId = items.data[0]?.price?.id;
    } catch (err) {
        console.error("grantSlidePromptAccess: failed to list line items", err);
        redirect("/products/slide-prompt-generator");
    }

    if (priceId !== SLIDE_PROMPT_GENERATOR_PRICE_ID) {
        console.error("grantSlidePromptAccess: priceId mismatch", { priceId });
        redirect("/products/slide-prompt-generator");
    }

    // 3. Cookie 付与
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, cookieValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: SLIDE_PROMPT_PATH,
        maxAge: MAX_AGE,
    });

    // 4. 工房へリダイレクト
    redirect(SLIDE_PROMPT_PATH);
}
