import { NextResponse, type NextRequest } from "next/server";

const BASE_PATH = "/member/slide-prompt-generator";
const LOGIN_PATH = `${BASE_PATH}/login`;
const COOKIE_NAME = "slide_prompt_access";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ログインページは保護対象から除外
  if (pathname === LOGIN_PATH || pathname.startsWith(`${LOGIN_PATH}/`)) {
    return NextResponse.next();
  }

  const cookieValue = req.cookies.get(COOKIE_NAME)?.value;
  const expected = process.env.SLIDE_PROMPT_COOKIE_VALUE;

  if (expected && cookieValue === expected) {
    return NextResponse.next();
  }

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = LOGIN_PATH;
  loginUrl.search = "";
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/member/slide-prompt-generator/:path*"],
};
