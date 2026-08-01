import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken, PLUS_SESSION_COOKIE } from "@/lib/plus-auth";
import { hasActivePlusForCustomer } from "@/lib/plus-subscription";
import { getR2Object } from "@/lib/r2";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Plus会員向け 完成デッキ（旧買い切りセット）のZIP配信。
// ★契約者限定：ログインCookie＋Stripeの有効契約を毎回確認する（解約者は弾く）。
const DECKS: Record<string, { zipKey: string; filename: string }> = {
    "disease-9-set": {
        zipKey: "products/jishutore-materials-vol01.zip",
        filename: "疾患別自主トレPowerPoint9本セット.zip",
    },
    "posture-set": {
        zipKey: "products/home-elderly-self-training.zip",
        filename: "姿勢別自主トレPowerPointセット.zip",
    },
};

export async function GET(req: NextRequest) {
    const cookieStore = await cookies();
    const raw = cookieStore.get(PLUS_SESSION_COOKIE)?.value;
    const session = raw ? await verifySessionToken(raw) : null;
    if (!session) {
        return NextResponse.json(
            { error: "ログインが必要です。", code: "unauthorized" },
            { status: 401 },
        );
    }

    try {
        const active = await hasActivePlusForCustomer(session.cid);
        if (!active) {
            return NextResponse.json(
                { error: "有効なご契約が見つかりませんでした。", code: "no_subscription" },
                { status: 403 },
            );
        }
    } catch (e) {
        console.error("plus deck download: subscription check failed", e);
        return NextResponse.json({ error: "契約状態の確認に失敗しました。" }, { status: 503 });
    }

    const deckId = req.nextUrl.searchParams.get("deck");
    const deck = deckId ? DECKS[deckId] : undefined;
    if (!deck) {
        return NextResponse.json({ error: "不正なデッキ指定です。" }, { status: 400 });
    }

    try {
        const obj = await getR2Object(deck.zipKey);
        return new NextResponse(obj.body, {
            headers: {
                "Content-Type": obj.contentType || "application/zip",
                "Content-Disposition": `attachment; filename="deck.zip"; filename*=UTF-8''${encodeURIComponent(deck.filename)}`,
                ...(obj.contentLength ? { "Content-Length": String(obj.contentLength) } : {}),
                "Cache-Control": "private, no-store",
            },
        });
    } catch (err) {
        console.error(`plus deck download: failed to stream R2 object ${deck.zipKey}:`, err);
        return NextResponse.json({ error: "ファイルの取得に失敗しました。" }, { status: 500 });
    }
}
