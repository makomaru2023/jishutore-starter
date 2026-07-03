"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getStripe } from "@/lib/stripe";
import { isPlusPriceObject } from "@/lib/plus-subscription";
import {
    signSessionToken,
    PLUS_SESSION_COOKIE,
    PLUS_SESSION_MAX_AGE,
    normalizeEmail,
} from "@/lib/plus-auth";

const LP_PATH = "/products/jishutore-plus/";

/**
 * Plus 購入直後、Checkout セッションを検証してセッションCookieを付与し、
 * そのまま資料庫（/plus/library）へ入れる Server Action。
 * 検証に失敗した場合は LP に戻す。
 */
export async function grantPlusAccess(sessionId: string): Promise<void> {
    if (!sessionId) redirect(LP_PATH);

    const stripe = getStripe();
    if (!stripe) redirect(LP_PATH);

    // 1. Checkout セッションを取得
    let session;
    try {
        session = await stripe.checkout.sessions.retrieve(sessionId);
    } catch (err) {
        console.error("grantPlusAccess: retrieve failed", err);
        redirect(LP_PATH);
    }

    // 2. サブスクとして正常に完了しているか
    if (session.mode !== "subscription") redirect(LP_PATH);
    if (session.status !== "complete" && session.payment_status !== "paid") {
        redirect(LP_PATH);
    }

    // 3. 購入された価格が Plus 商品群のものか
    let priceOk = false;
    try {
        const items = await stripe.checkout.sessions.listLineItems(session.id, { limit: 5 });
        priceOk = isPlusPriceObject(items.data[0]?.price);
    } catch (err) {
        console.error("grantPlusAccess: listLineItems failed", err);
        redirect(LP_PATH);
    }
    if (!priceOk) redirect(LP_PATH);

    const customerId =
        typeof session.customer === "string" ? session.customer : session.customer?.id;
    if (!customerId) redirect(LP_PATH);

    const email = session.customer_details?.email
        ? normalizeEmail(session.customer_details.email)
        : "";

    // 4. セッションCookie付与
    const token = await signSessionToken({ email, cid: customerId });
    const jar = await cookies();
    jar.set(PLUS_SESSION_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: PLUS_SESSION_MAX_AGE,
    });

    // 5. 資料庫へ
    redirect("/plus/library/");
}
