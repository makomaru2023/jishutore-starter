import { NextResponse } from "next/server";
import { signMagicToken, normalizeEmail } from "@/lib/plus-auth";
import { findActivePlusSubscription } from "@/lib/plus-subscription";
import { sendPlusMagicLink } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * ログイン用マジックリンクを送る。
 * セキュリティ上、契約の有無に関わらず常に成功レスポンスを返す
 * （どのメールが会員かを外部に漏らさないため）。
 * 実際に有効な契約があるメールにだけリンクを送信する。
 */
export async function POST(req: Request) {
    let email: string;
    try {
        const body = await req.json();
        email = typeof body?.email === "string" ? normalizeEmail(body.email) : "";
    } catch {
        return NextResponse.json({ error: "リクエストの形式が正しくありません。" }, { status: 400 });
    }

    if (!EMAIL_RE.test(email)) {
        return NextResponse.json({ error: "メールアドレスの形式が正しくありません。" }, { status: 400 });
    }

    try {
        const active = await findActivePlusSubscription(email);
        if (active) {
            const token = await signMagicToken(email);
            const url = `${SITE_URL}/api/plus/auth/verify/?token=${encodeURIComponent(token)}`;
            await sendPlusMagicLink(email, url);
        }
    } catch (err) {
        // 送信失敗しても、会員判定を漏らさないため成功レスポンスは維持する。
        console.error("plus auth request error:", err);
    }

    return NextResponse.json({ ok: true });
}
