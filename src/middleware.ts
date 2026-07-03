import { NextResponse, type NextRequest } from "next/server";
import { verifySessionToken, PLUS_SESSION_COOKIE } from "@/lib/plus-auth";

// --- 伝わるプロンプト工房（既存） ---
const SLIDE_BASE_PATH = "/member/slide-prompt-generator";
const SLIDE_LOGIN_PATH = `${SLIDE_BASE_PATH}/login`;
const SLIDE_COOKIE_NAME = "slide_prompt_access";

// --- 自主トレ素材庫Plus 会員ページ ---
const PLUS_LIBRARY_PATH = "/plus/library";
const PLUS_LOGIN_PATH = "/plus/login";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // === Plus 資料庫のゲート ===
    if (pathname === PLUS_LIBRARY_PATH || pathname.startsWith(`${PLUS_LIBRARY_PATH}/`)) {
        const token = req.cookies.get(PLUS_SESSION_COOKIE)?.value;
        const session = token ? await verifySessionToken(token) : null;
        if (session) {
            return NextResponse.next();
        }
        const loginUrl = req.nextUrl.clone();
        loginUrl.pathname = PLUS_LOGIN_PATH;
        loginUrl.search = "";
        return NextResponse.redirect(loginUrl);
    }

    // === 伝わるプロンプト工房のゲート（既存） ===
    if (pathname === SLIDE_LOGIN_PATH || pathname.startsWith(`${SLIDE_LOGIN_PATH}/`)) {
        return NextResponse.next();
    }
    const cookieValue = req.cookies.get(SLIDE_COOKIE_NAME)?.value;
    const expected = process.env.SLIDE_PROMPT_COOKIE_VALUE;
    if (expected && cookieValue === expected) {
        return NextResponse.next();
    }
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = SLIDE_LOGIN_PATH;
    loginUrl.search = "";
    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: [
        "/member/slide-prompt-generator/:path*",
        "/plus/library",
        "/plus/library/:path*",
    ],
};
