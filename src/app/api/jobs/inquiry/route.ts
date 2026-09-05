import { NextResponse } from "next/server";
import { JOB_CONTACT_EMAIL } from "@/constants/jobs";
import { sendJobPostingInquiry } from "@/lib/email";
import { sanitizeLine, validateJobInquiry } from "@/lib/job-inquiry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * 求人掲載の初回相談を受け取り、運営宛にメールで転送する。
 * ================================================================
 * ★既存のメール基盤（Resend／src/lib/email.ts）をそのまま使う。
 *   Googleフォーム等の外部サービスは新規に増やさない。
 *   RESEND_API_KEY が未設定の環境では送信されず、ここは 503 を返す
 *   （成功したように見せると、届いていない相談を取りこぼす）。
 *
 * ★このAPIは応募（求職者）の受付には使わない。応募は施設の公式採用ページで完結する。
 *
 * 【スパム対策】
 *   1. ハニーポット（company 欄）… ボットが埋めたら 200 を返して何もしない
 *   2. 送信までの経過時間 … 3秒未満は機械的な送信とみなす
 *   3. IP単位の簡易レート制限 … 同一IPから10分に3件まで
 *   ⚠ 3はサーバーレスのインスタンスごとのメモリなので完全ではない。
 *     連投が実際に起きたら、Vercel側のレート制限か外部KVへ移すこと。
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const MIN_FILL_MS = 3000;

const recentByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const hits = (recentByIp.get(ip) ?? []).filter((at) => now - at < WINDOW_MS);
    if (hits.length >= MAX_PER_WINDOW) {
        recentByIp.set(ip, hits);
        return true;
    }
    hits.push(now);
    recentByIp.set(ip, hits);
    // 使われなくなったIPを溜め込まない
    if (recentByIp.size > 500) {
        for (const [key, times] of recentByIp) {
            if (times.every((at) => now - at >= WINDOW_MS)) recentByIp.delete(key);
        }
    }
    return false;
}

function getClientIp(req: Request): string {
    const forwarded = req.headers.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
    return req.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function POST(req: Request) {
    let body: Record<string, unknown>;
    try {
        body = (await req.json()) as Record<string, unknown>;
    } catch {
        return NextResponse.json(
            { error: "送信内容を読み取れませんでした。時間をおいてお試しください。" },
            { status: 400 },
        );
    }

    // 1. ハニーポット。人には見えない欄なので、埋まっていたら機械的な送信。
    //    エラーを返すと突破の手がかりになるため、成功と同じ応答を返して何もしない。
    if (sanitizeLine(body.company)) {
        return NextResponse.json({ ok: true });
    }

    // 2. フォームを開いてから送信までが短すぎるもの
    const elapsedMs = typeof body.elapsedMs === "number" ? body.elapsedMs : 0;
    if (elapsedMs > 0 && elapsedMs < MIN_FILL_MS) {
        return NextResponse.json({ ok: true });
    }

    // 3. 同一IPからの連投
    if (isRateLimited(getClientIp(req))) {
        return NextResponse.json(
            {
                error: `送信が続いています。しばらく時間をおくか、${JOB_CONTACT_EMAIL} まで直接ご連絡ください。`,
            },
            { status: 429 },
        );
    }

    const result = validateJobInquiry(body);
    if (!result.ok) {
        return NextResponse.json(
            { error: "入力内容をご確認ください。", errors: result.errors },
            { status: 400 },
        );
    }

    if (!process.env.RESEND_API_KEY) {
        console.error("job inquiry: RESEND_API_KEY is not configured.");
        return NextResponse.json(
            {
                error: `ただいまフォームからの送信ができません。お手数ですが ${JOB_CONTACT_EMAIL} までメールでご連絡ください。`,
            },
            { status: 503 },
        );
    }

    const sent = await sendJobPostingInquiry({
        to: JOB_CONTACT_EMAIL,
        ...result.value,
        placement: sanitizeLine(body.placement).slice(0, 60) || "unknown",
    });

    if (!sent) {
        return NextResponse.json(
            {
                error: `送信に失敗しました。お手数ですが ${JOB_CONTACT_EMAIL} までメールでご連絡ください。`,
            },
            { status: 502 },
        );
    }

    return NextResponse.json({ ok: true });
}
