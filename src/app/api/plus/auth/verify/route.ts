import { NextResponse, type NextRequest } from "next/server";
import {
    verifyMagicToken,
    signSessionToken,
    PLUS_SESSION_COOKIE,
    PLUS_SESSION_MAX_AGE,
} from "@/lib/plus-auth";
import { findActivePlusSubscription } from "@/lib/plus-subscription";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * マジックリンクのクリック先。
 * トークン検証 → Stripe で有効契約を再確認 → セッションCookie付与 → 資料庫へ。
 */
export async function GET(req: NextRequest) {
    const token = req.nextUrl.searchParams.get("token") ?? "";

    const redirectTo = (path: string) => NextResponse.redirect(new URL(path, req.url));

    const magic = await verifyMagicToken(token);
    if (!magic) {
        return redirectTo("/plus/login/?error=expired");
    }

    let active;
    try {
        active = await findActivePlusSubscription(magic.email);
    } catch (err) {
        console.error("plus verify: subscription check failed:", err);
        return redirectTo("/plus/login/?error=server");
    }

    if (!active) {
        return redirectTo("/plus/login/?error=nosub");
    }

    const sessionToken = await signSessionToken({ email: magic.email, cid: active.customerId });

    const res = redirectTo("/plus/library/");
    res.cookies.set(PLUS_SESSION_COOKIE, sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: PLUS_SESSION_MAX_AGE,
    });
    return res;
}
