import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PLUS_ITEMS, MAX_SELECTION } from "@/data/plus-items";
import { mergePlusSlides } from "@/lib/plus-merge";
import { verifySessionToken, PLUS_SESSION_COOKIE } from "@/lib/plus-auth";
import { hasActivePlusForCustomer } from "@/lib/plus-subscription";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// 選択された運動スライドを1つのPowerPointに合体して返す（Nodeネイティブ・Vercel対応）。
// ★契約者限定：ログインCookie＋Stripeの有効契約を毎回確認する（解約者は弾く）。
export async function POST(req: Request) {
    // 1. ログイン確認
    const cookieStore = await cookies();
    const raw = cookieStore.get(PLUS_SESSION_COOKIE)?.value;
    const session = raw ? await verifySessionToken(raw) : null;
    if (!session) {
        return NextResponse.json(
            { error: "ログインが必要です。", code: "unauthorized" },
            { status: 401 },
        );
    }
    // 2. Stripe で有効契約を再確認（解約・支払い停止を弾く）
    try {
        const active = await hasActivePlusForCustomer(session.cid);
        if (!active) {
            return NextResponse.json(
                { error: "有効なご契約が見つかりませんでした。", code: "no_subscription" },
                { status: 403 },
            );
        }
    } catch (e) {
        console.error("plus download: subscription check failed", e);
        return NextResponse.json({ error: "契約状態の確認に失敗しました。" }, { status: 503 });
    }

    let ids: unknown;
    try {
        ({ ids } = await req.json());
    } catch {
        return NextResponse.json({ error: "bad request" }, { status: 400 });
    }
    if (!Array.isArray(ids) || ids.length === 0) {
        return NextResponse.json({ error: "資料が選択されていません" }, { status: 400 });
    }
    if (ids.length > MAX_SELECTION) {
        return NextResponse.json({ error: `選択は最大${MAX_SELECTION}件までです` }, { status: 400 });
    }

    const byId = new Map(PLUS_ITEMS.map((i) => [i.id, i]));
    const selection = (ids as string[])
        .map((id) => byId.get(id))
        .filter((it): it is (typeof PLUS_ITEMS)[number] => Boolean(it))
        .map((it) => ({ deck: it.deck, slide: it.slide }));

    if (selection.length === 0) {
        return NextResponse.json({ error: "選択が不正です" }, { status: 400 });
    }

    try {
        const buf = await mergePlusSlides(selection);
        const filename = "自主トレ素材庫Plus_資料.pptx";
        return new NextResponse(new Uint8Array(buf), {
            headers: {
                "Content-Type": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                "Content-Disposition": `attachment; filename="plus.pptx"; filename*=UTF-8''${encodeURIComponent(filename)}`,
                "Cache-Control": "no-store",
            },
        });
    } catch (e) {
        return NextResponse.json({ error: "資料の作成に失敗しました", detail: String(e).slice(0, 200) }, { status: 500 });
    }
}
