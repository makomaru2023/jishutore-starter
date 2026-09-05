import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import items from "../../../../data/items.json";

// Initialize S3 Client
// NOTE: Account ID and Bucket Name need to be provided via environment variables
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;

// 無料素材の配布専用API。任意のR2キーを許可すると、同じバケット内の
// 有料ZIPや注文JSONも取得できるため、台帳に登録済みのキーだけを許可する。
const PUBLIC_ITEM_KEYS = new Set(items.map((item) => item.previewSrc));

/**
 * 一覧カード用の軽いWebP（preview/…）。
 * ★2026-09-05 追加。@/lib/items の getPreviewWebpKey と同じ変換規則。
 *   ここでも台帳から作るので、任意のキーは許可しない（許可リストの考え方は変えていない）。
 */
function toPreviewKey(previewSrc: string): string {
    return previewSrc.replace(/^premium\//, "preview/").replace(/\.(png|jpe?g)$/i, ".webp");
}

/** WebPキー → 元のPNGキー。WebPがまだ無いときの切り替え先を引く。 */
const PREVIEW_KEY_TO_ORIGINAL = new Map(
    items.map((item) => [toPreviewKey(item.previewSrc), item.previewSrc] as const),
);

const S3 = new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: R2_ACCESS_KEY_ID || "",
        secretAccessKey: R2_SECRET_ACCESS_KEY || "",
    },
});

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const key = searchParams.get("key");

    if (!key) {
        return new NextResponse("Missing key parameter", { status: 400 });
    }

    if (!PUBLIC_ITEM_KEYS.has(key) && !PREVIEW_KEY_TO_ORIGINAL.has(key)) {
        return new NextResponse("Image not found", { status: 404 });
    }

    if (!R2_ACCOUNT_ID || !R2_BUCKET_NAME || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
        console.error("Missing R2 environment variables");
        return new NextResponse("Server Configuration Error", { status: 500 });
    }

    // ★WebPがまだ無いキーは、元のPNGへ黙って切り替える。
    //   生成し忘れやアップロード漏れで、一覧の画像が消えたように見える事故を作らないため。
    const fallbackKey = PREVIEW_KEY_TO_ORIGINAL.get(key);

    try {
        return await fetchFromR2(key);
    } catch (error) {
        if (fallbackKey) {
            try {
                return await fetchFromR2(fallbackKey);
            } catch (fallbackError) {
                console.error("Error fetching fallback image from R2:", fallbackError);
            }
        }
        console.error("Error fetching image from R2:", error);
        return new NextResponse("Error fetching image", { status: 500 });
    }
}

async function fetchFromR2(key: string): Promise<NextResponse> {
    const response = await S3.send(
        new GetObjectCommand({ Bucket: R2_BUCKET_NAME, Key: key }),
    );

    if (!response.Body) {
        throw new Error(`R2 returned an empty body for ${key}`);
    }

    const body = response.Body.transformToWebStream() as ReadableStream<Uint8Array>;
    return new NextResponse(body, {
        headers: {
            "Content-Type": response.ContentType || "image/png",
            "Cache-Control": "public, max-age=31536000, immutable",
        },
    });
}
