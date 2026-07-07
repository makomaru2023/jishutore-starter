// 新規イラストバッチをR2にアップロードするスクリプト。
// 使い方:
//   npx tsx scripts/upload-batch.ts <バッチフォルダ>            ← ドライラン（確認のみ）
//   npx tsx scripts/upload-batch.ts <バッチフォルダ> --execute  ← 実際にアップロード
//   npx tsx scripts/upload-batch.ts <バッチフォルダ> --execute --overwrite  ← 既存キーも上書き
//
// バッチフォルダは「文字なし/」(→ premium/plain/) と「文字あり/」(→ premium/text/)
// のサブフォルダを持つ想定（plain/ text/ という英語名でもOK）。
// アップロード前にファイル名を検証する: kebab-case 英小文字 ASCII のみ・二重拡張子NG。
// plain と text でペアが揃っていない場合は警告する。

import { S3Client, ListObjectsV2Command, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";

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

const VALID_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*\.(?:png|jpe?g)$/;

const SUBDIR_TO_PREFIX: Record<string, string> = {
    文字なし: "premium/plain/",
    plain: "premium/plain/",
    文字あり: "premium/text/",
    text: "premium/text/",
};

const CONTENT_TYPES: Record<string, string> = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
};

type Plan = {
    localPath: string;
    key: string;
    exists: boolean;
    error?: string;
};

async function listExistingKeys(prefix: string): Promise<Set<string>> {
    const keys = new Set<string>();
    let continuationToken: string | undefined = undefined;
    do {
        const command: ListObjectsV2Command = new ListObjectsV2Command({
            Bucket: R2_BUCKET_NAME,
            Prefix: prefix,
            MaxKeys: 1000,
            ContinuationToken: continuationToken,
        });
        const response = await S3.send(command);
        for (const content of response.Contents || []) {
            if (content.Key) keys.add(content.Key);
        }
        continuationToken = response.IsTruncated ? response.NextContinuationToken : undefined;
    } while (continuationToken);
    return keys;
}

async function main() {
    const args = process.argv.slice(2);
    const execute = args.includes("--execute");
    const overwrite = args.includes("--overwrite");
    const batchDir = args.find((a) => !a.startsWith("--"));

    if (!batchDir) {
        console.error("使い方: npx tsx scripts/upload-batch.ts <バッチフォルダ> [--execute] [--overwrite]");
        process.exit(1);
    }
    if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
        console.error("エラー: .env.local の R2_* 環境変数が読めません。");
        process.exit(1);
    }

    const plans: Plan[] = [];
    const byPrefix: Record<string, string[]> = { "premium/plain/": [], "premium/text/": [] };

    const entries = await fs.readdir(batchDir, { withFileTypes: true });
    for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        const prefix = SUBDIR_TO_PREFIX[entry.name];
        if (!prefix) continue;
        const subdir = path.join(batchDir, entry.name);
        for (const file of await fs.readdir(subdir)) {
            if (file.startsWith(".")) continue; // .DS_Store 等を除外
            const localPath = path.join(subdir, file);
            const stat = await fs.stat(localPath);
            if (!stat.isFile()) continue;
            const plan: Plan = { localPath, key: prefix + file, exists: false };
            if (!VALID_NAME.test(file)) {
                plan.error = "ファイル名が不正（英小文字 kebab-case + .png/.jpg のみ可）";
            }
            plans.push(plan);
            if (!plan.error) byPrefix[prefix].push(file.replace(/\.[^.]+$/, ""));
        }
    }

    if (plans.length === 0) {
        console.error(`エラー: ${batchDir} の下に 文字なし/文字あり (または plain/text) フォルダの画像が見つかりません。`);
        process.exit(1);
    }

    // plain / text のペアチェック（片方にしか無いものを警告）
    const plainSet = new Set(byPrefix["premium/plain/"]);
    const textSet = new Set(byPrefix["premium/text/"]);
    const unpaired: string[] = [];
    for (const name of plainSet) if (!textSet.has(name)) unpaired.push(`${name}（plainのみ）`);
    for (const name of textSet) if (!plainSet.has(name)) unpaired.push(`${name}（textのみ）`);

    // R2の既存キーと突き合わせ
    const existing = await listExistingKeys("premium/");
    for (const plan of plans) plan.exists = existing.has(plan.key);

    const errors = plans.filter((p) => p.error);
    const skips = plans.filter((p) => !p.error && p.exists && !overwrite);
    const uploads = plans.filter((p) => !p.error && (!p.exists || overwrite));

    console.log(`\n=== バッチ検証結果: ${batchDir} ===`);
    console.log(`対象ファイル: ${plans.length}件`);
    if (errors.length > 0) {
        console.log(`\n❌ 名前が不正（要リネーム・アップロード対象外）: ${errors.length}件`);
        for (const p of errors) console.log(`   ${p.localPath}`);
    }
    if (unpaired.length > 0) {
        console.log(`\n⚠ plain/text のペアが揃っていない: ${unpaired.length}件`);
        for (const u of unpaired) console.log(`   ${u}`);
    }
    if (skips.length > 0) {
        console.log(`\n⏭ R2に既存のためスキップ: ${skips.length}件（上書きするには --overwrite）`);
        for (const p of skips) console.log(`   ${p.key}`);
    }
    console.log(`\n⬆ アップロード対象: ${uploads.length}件`);
    for (const p of uploads) console.log(`   ${p.key}${p.exists ? "（上書き）" : ""}`);

    if (errors.length > 0) {
        console.log("\n名前が不正なファイルがあるため中断します。リネーム後に再実行してください。");
        process.exit(1);
    }
    if (!execute) {
        console.log("\nドライランです。実際にアップロードするには --execute を付けて再実行してください。");
        return;
    }

    let done = 0;
    for (const p of uploads) {
        const body = await fs.readFile(p.localPath);
        await S3.send(
            new PutObjectCommand({
                Bucket: R2_BUCKET_NAME,
                Key: p.key,
                Body: body,
                ContentType: CONTENT_TYPES[path.extname(p.localPath).toLowerCase()] || "application/octet-stream",
            })
        );
        done++;
        console.log(`✅ (${done}/${uploads.length}) ${p.key}`);
    }
    console.log(`\n完了: ${done}件アップロードしました。次は items.json への追加 → validate-items.ts → npm run build です。`);
}

main().catch((err) => {
    console.error("エラー:", err);
    process.exit(1);
});
