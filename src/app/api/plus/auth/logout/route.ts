import { NextResponse, type NextRequest } from "next/server";
import { PLUS_SESSION_COOKIE } from "@/lib/plus-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** ログアウト：セッションCookieを消してログイン画面へ。
 *  フォームからのPOST→GET遷移を成立させるため 303 See Other を使う。 */
export async function POST(req: NextRequest) {
    const res = NextResponse.redirect(new URL("/plus/login/", req.url), 303);
    res.cookies.set(PLUS_SESSION_COOKIE, "", { path: "/", maxAge: 0 });
    return res;
}
