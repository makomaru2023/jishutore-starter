import { NextResponse, type NextRequest } from "next/server";
import { verifySessionToken, PLUS_SESSION_COOKIE } from "@/lib/plus-auth";

// --- 伝わるプロンプト工房（既存） ---
const SLIDE_BASE_PATH = "/member/slide-prompt-generator";
const SLIDE_LOGIN_PATH = `${SLIDE_BASE_PATH}/login`;
const SLIDE_COOKIE_NAME = "slide_prompt_access";

// --- 自主トレ素材庫Plus 会員ページ ---
const PLUS_LIBRARY_PATH = "/plus/library";
const PLUS_FEE_CHECK_PATH = "/plus/fee-check";
const PLUS_FEE_CHECK_COMBO_PATH = "/plus/fee-check-combo";
const PLUS_LOGIN_PATH = "/plus/login";

function normalizeLegacyItemId(id: string): string {
    return id
        .normalize("NFKC")
        .toLowerCase()
        .replace(/[’']/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // 旧素材URL（大文字・空白・括弧など）を現行kebab-caseへ恒久転送する。
    // Search Consoleに残る旧URLを404にせず、評価と利用者を新URLへ引き継ぐ。
    if (pathname.startsWith("/items/")) {
        const segments = pathname.split("/").filter(Boolean);
        if (segments.length === 2) {
            let requestedId = segments[1];
            try {
                requestedId = decodeURIComponent(requestedId);
            } catch {
                // 不正なエンコードは正規化せず、通常の404処理へ渡す。
            }
            const normalizedId = normalizeLegacyItemId(requestedId);
            if (normalizedId && normalizedId !== requestedId) {
                const normalizedUrl = req.nextUrl.clone();
                normalizedUrl.pathname = `/items/${normalizedId}/`;
                return NextResponse.redirect(normalizedUrl, 308);
            }
        }
        return NextResponse.next();
    }

    if (pathname === PLUS_FEE_CHECK_PATH || pathname.startsWith(`${PLUS_FEE_CHECK_PATH}/`)) {
        const feeCheckUrl = req.nextUrl.clone();
        feeCheckUrl.pathname = pathname.replace(PLUS_FEE_CHECK_PATH, "/fee-check");
        feeCheckUrl.search = req.nextUrl.search;
        return NextResponse.redirect(feeCheckUrl, 301);
    }

    // === Plus 加算の組み合わせチェックのゲート ===
    if (
        pathname === PLUS_FEE_CHECK_COMBO_PATH ||
        pathname.startsWith(`${PLUS_FEE_CHECK_COMBO_PATH}/`)
    ) {
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

    // === Plus 資料庫のゲート ===
    if (
        pathname === PLUS_LIBRARY_PATH ||
        pathname.startsWith(`${PLUS_LIBRARY_PATH}/`)
    ) {
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
    // Plus会員もツールを利用できる（全部入り化）。契約の有効性はページ側で確認する。
    const plusToken = req.cookies.get(PLUS_SESSION_COOKIE)?.value;
    if (plusToken && (await verifySessionToken(plusToken))) {
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
        "/plus/fee-check",
        "/plus/fee-check/:path*",
        "/plus/fee-check-combo",
        "/plus/fee-check-combo/:path*",
        "/items/:path*",
    ],
};
