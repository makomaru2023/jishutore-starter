import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken, PLUS_SESSION_COOKIE } from "@/lib/plus-auth";
import { createPortalUrl } from "@/lib/plus-subscription";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** Stripe カスタマーポータル（プラン管理・解約）のURLを返す。ログイン必須。 */
export async function POST(_req: NextRequest) {
    const cookieStore = await cookies();
    const raw = cookieStore.get(PLUS_SESSION_COOKIE)?.value;
    const session = raw ? await verifySessionToken(raw) : null;
    if (!session) {
        return NextResponse.json({ error: "ログインが必要です。" }, { status: 401 });
    }

    try {
        const url = await createPortalUrl(session.cid, `${SITE_URL}/plus/library`);
        if (!url) {
            return NextResponse.json({ error: "ポータルの発行に失敗しました。" }, { status: 500 });
        }
        return NextResponse.json({ url });
    } catch (err) {
        console.error("plus portal error:", err);
        return NextResponse.json({ error: "ポータルの発行に失敗しました。" }, { status: 500 });
    }
}
