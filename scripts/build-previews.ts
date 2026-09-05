// 一覧カード用の軽いプレビュー画像（WebP）を作って R2 にアップロードするスクリプト。
// ================================================================
// 使い方:
//   npx tsx scripts/build-previews.ts            ← ドライラン（何を作るかだけ表示）
//   npx tsx scripts/build-previews.ts --execute  ← 実際に生成・アップロード
//   npx tsx scripts/build-previews.ts --execute --force  ← 既にあるWebPも作り直す
//
// ★新しい素材を items.json に追加したら、これを1回流す。
//   既にWebPがあるキーは飛ばすので、増えたぶんだけが処理される。
//
// なぜ必要か
//   配布用のPNGは 1200x675・平均164KB あるが、一覧では幅250px前後の枠に縮めて出している。
//   `next.config.js` の `images: { unoptimized: true }` で Next の自動縮小が効かないため、
//   一覧の初回表示だけで 3.8MB を落としていた（2026-09-05に実測）。
//   600px幅のWebPを別に持たせて、一覧のカードだけそちらを見る。
//
// ⚠ 触らないもの
//   - 配布するPNG（items.json の fileHref）
//   - 素材詳細ページの大きい画像
//   元の premium/… は消さない。preview/… を新しく足すだけ。

import { S3Client, GetObjectCommand, ListObjectsV2Command, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import path from "path";
import dotenv from "dotenv";
import items from "../data/items.json";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;

const S3 = new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: R2_ACCESS_KEY_ID || "",
        secretAccessKey: R2_SECRET_ACCESS_KEY || "",
    },
});

/** 出力する幅。一覧カードの枠は250px前後なので、2倍の画面でちょうど足りる。 */
const OUTPUT_WIDTH = 600;

/**
 * 品質。
 * ★文字あり版は品質を上げる。説明文が入っているぶん、縮小と圧縮の影響が出やすい。
 *   （文字なし 5.7KB / 文字あり 15.9KB。どちらも元の1/10以下）
 */
const QUALITY_PLAIN = 82;
const QUALITY_TEXT = 90;

/** premium/plain/air-bike.png → preview/plain/air-bike.webp（src/lib/items.ts と同じ規則） */
function toPreviewKey(previewSrc: string): string {
    return previewSrc.replace(/^premium\//, "preview/").replace(/\.(png|jpe?g)$/i, ".webp");
}

function isTextVariant(previewSrc: string): boolean {
    return previewSrc.startsWith("premium/text/");
}

async function listExistingPreviewKeys(): Promise<Set<string>> {
    const keys = new Set<string>();
    let token: string | undefined;
    do {
        const res = await S3.send(
            new ListObjectsV2Command({
                Bucket: R2_BUCKET_NAME,
                Prefix: "preview/",
                ContinuationToken: token,
            }),
        );
        for (const obj of res.Contents ?? []) if (obj.Key) keys.add(obj.Key);
        token = res.IsTruncated ? res.NextContinuationToken : undefined;
    } while (token);
    return keys;
}

async function downloadOriginal(key: string): Promise<Buffer> {
    const res = await S3.send(new GetObjectCommand({ Bucket: R2_BUCKET_NAME, Key: key }));
    if (!res.Body) throw new Error(`R2 に中身がありません: ${key}`);
    const chunks: Uint8Array[] = [];
    // @ts-expect-error Node の Readable として反復できる
    for await (const chunk of res.Body) chunks.push(chunk as Uint8Array);
    return Buffer.concat(chunks);
}

async function main() {
    const execute = process.argv.includes("--execute");
    const force = process.argv.includes("--force");

    if (!R2_ACCOUNT_ID || !R2_BUCKET_NAME || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
        console.error("R2 の環境変数が足りません（.env.local を確認してください）。");
        process.exit(1);
    }

    const existing = force ? new Set<string>() : await listExistingPreviewKeys();
    const targets = items
        .map((item) => ({ src: item.previewSrc, dst: toPreviewKey(item.previewSrc) }))
        .filter((t) => !existing.has(t.dst));

    console.log(`台帳の素材：${items.length}点`);
    console.log(`R2にある既存のWebP：${existing.size}点`);
    console.log(`今回つくる：${targets.length}点${force ? "（--force で全件作り直し）" : ""}`);

    if (targets.length === 0) {
        console.log("作るものはありません。");
        return;
    }

    if (!execute) {
        console.log("\n--- ドライラン（--execute を付けると実行します）---");
        for (const t of targets.slice(0, 10)) console.log(`  ${t.src}  →  ${t.dst}`);
        if (targets.length > 10) console.log(`  … 他 ${targets.length - 10}点`);
        return;
    }

    let done = 0;
    let originalBytes = 0;
    let webpBytes = 0;
    const failed: { key: string; reason: string }[] = [];

    for (const t of targets) {
        try {
            const original = await downloadOriginal(t.src);
            const quality = isTextVariant(t.src) ? QUALITY_TEXT : QUALITY_PLAIN;
            const webp = await sharp(original)
                .resize({ width: OUTPUT_WIDTH, withoutEnlargement: true })
                .webp({ quality, effort: 6 })
                .toBuffer();

            await S3.send(
                new PutObjectCommand({
                    Bucket: R2_BUCKET_NAME,
                    Key: t.dst,
                    Body: webp,
                    ContentType: "image/webp",
                    CacheControl: "public, max-age=31536000, immutable",
                }),
            );

            originalBytes += original.length;
            webpBytes += webp.length;
            done += 1;
            if (done % 25 === 0 || done === targets.length) {
                console.log(`  ${done} / ${targets.length} 完了`);
            }
        } catch (error) {
            failed.push({ key: t.src, reason: error instanceof Error ? error.message : String(error) });
        }
    }

    const mb = (n: number) => (n / 1024 / 1024).toFixed(2);
    console.log(`\n生成できたもの：${done}点`);
    console.log(`元のPNG合計：${mb(originalBytes)} MB → WebP合計：${mb(webpBytes)} MB`);
    if (done > 0) {
        console.log(`1枚あたり平均：${Math.round(originalBytes / done / 1024)} KB → ${Math.round(webpBytes / done / 1024)} KB`);
    }

    if (failed.length > 0) {
        console.log(`\n★失敗 ${failed.length}件（この素材は一覧でも元のPNGが出ます）`);
        for (const f of failed) console.log(`  ${f.key}: ${f.reason}`);
        process.exitCode = 1;
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
