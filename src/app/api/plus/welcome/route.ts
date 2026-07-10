import { NextResponse, type NextRequest } from "next/server";
import { getStripe } from "@/lib/stripe";
import { isPlusPriceObject } from "@/lib/plus-subscription";
import {
    signSessionToken,
    PLUS_SESSION_COOKIE,
    PLUS_SESSION_MAX_AGE,
    normalizeEmail,
} from "@/lib/plus-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LP_PATH = "/products/jishutore-plus/";

/**
 * Plus 購入直後のリダイレクト先（Checkout success_url）。
 * Checkout セッションを検証 → セッションCookieを付与 → 資料庫へ。
 * ※ Cookie の書き込みは Route Handler でのみ可能なため、ページ描画ではなくここで行う。
 */
export async function GET(req: NextRequest) {
    const sessionId = req.nextUrl.searchParams.get("session_id") ?? "";
    const redirectTo = (path: string) => NextResponse.redirect(new URL(path, req.url));

    if (!sessionId) return redirectTo(LP_PATH);

    const stripe = getStripe();
    if (!stripe) return redirectTo(LP_PATH);

    // 1. Checkout セッションを取得
    let session;
    try {
        session = await stripe.checkout.sessions.retrieve(sessionId);
    } catch (err) {
        console.error("plus welcome: retrieve failed", err);
        return redirectTo(LP_PATH);
    }

    // 2. サブスクとして正常に完了しているか
    if (session.mode !== "subscription") return redirectTo(LP_PATH);
    if (session.status !== "complete" && session.payment_status !== "paid") {
        return redirectTo(LP_PATH);
    }

    // 3. 購入された価格が Plus 商品群のものか
    let priceOk = false;
    try {
        const items = await stripe.checkout.sessions.listLineItems(session.id, { limit: 5 });
        priceOk = isPlusPriceObject(items.data[0]?.price);
    } catch (err) {
        console.error("plus welcome: listLineItems failed", err);
        return redirectTo(LP_PATH);
    }
    if (!priceOk) return redirectTo(LP_PATH);

    const customerId =
        typeof session.customer === "string" ? session.customer : session.customer?.id;
    if (!customerId) return redirectTo(LP_PATH);

    const email = session.customer_details?.email
        ? normalizeEmail(session.customer_details.email)
        : "";

    // 4. セッションCookie付与して資料庫へ
    const token = await signSessionToken({ email, cid: customerId });
    const successPath = `/plus/library/?welcome=1&session_id=${encodeURIComponent(session.id)}`;
    const res = redirectTo(successPath);
    res.cookies.set(PLUS_SESSION_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: PLUS_SESSION_MAX_AGE,
    });
    return res;
}
