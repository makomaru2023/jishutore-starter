import { NextResponse } from "next/server";
import { getR2Object } from "@/lib/r2";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const KEY = "samples/low-back-pain-sample.pdf";
const FILENAME = "腰痛_自主トレメニュー_サンプル.pdf";

/**
 * 無料サンプル：腰痛 自主トレメニュー（全 12 ページ PDF）
 * - 認証なし。LINE 等からの公開導線。
 * - R2 から都度ストリーミング配信。
 */
export async function GET() {
    try {
        const obj = await getR2Object(KEY);
        // RFC 5987 encoding so non-ASCII filenames are accepted by all browsers
        const encoded = encodeURIComponent(FILENAME);
        return new NextResponse(obj.body, {
            headers: {
                "Content-Type": obj.contentType || "application/pdf",
                "Content-Disposition": `inline; filename="sample.pdf"; filename*=UTF-8''${encoded}`,
                ...(obj.contentLength ? { "Content-Length": String(obj.contentLength) } : {}),
                "Cache-Control": "public, max-age=3600",
            },
        });
    } catch (err) {
        console.error("Failed to stream low-back-pain sample:", err);
        return NextResponse.json({ error: "Failed to fetch sample" }, { status: 500 });
    }
}
