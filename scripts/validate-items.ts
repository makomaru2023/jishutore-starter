// data/items.json の整合性チェック。items.json を手で編集した後・build前に実行する。
// 使い方: npx tsx scripts/validate-items.ts
// エラーがあれば一覧を出して exit 1、警告のみなら exit 0。

import fs from "fs/promises";

const FILE = "data/items.json";
const VALID_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const REQUIRED_FIELDS = [
    "id",
    "tier",
    "category",
    "title",
    "titleJa",
    "previewSrc",
    "fileHref",
    "fileName",
    "description",
] as const;

type Item = Record<string, unknown> & { id?: string };

// fileHref は "/api/image?key=premium%2Fplain%2Fxxx.png" 形式。key をデコードして末尾を返す
function hrefBasename(href: string): string {
    const match = href.match(/[?&]key=([^&]+)/);
    const p = match ? decodeURIComponent(match[1]) : href;
    return p.split("/").pop() || "";
}

async function main() {
    const raw = await fs.readFile(FILE, "utf-8");
    const items: Item[] = JSON.parse(raw);

    const errors: string[] = [];
    const warnings: string[] = [];

    // 重複IDチェック
    const seen = new Map<string, number>();
    for (const item of items) {
        const id = String(item.id ?? "");
        seen.set(id, (seen.get(id) || 0) + 1);
    }
    for (const [id, count] of seen) {
        if (count > 1) errors.push(`重複ID: "${id}" が ${count}件`);
    }

    for (const item of items) {
        const id = String(item.id ?? "(idなし)");

        for (const field of REQUIRED_FIELDS) {
            const value = item[field];
            if (value === undefined || value === null || String(value).trim() === "") {
                errors.push(`${id}: 必須フィールド "${field}" が空`);
            }
        }

        if (item.id && !VALID_ID.test(String(item.id))) {
            errors.push(`${id}: IDが英小文字 kebab-case ではない`);
        }

        for (const field of ["previewSrc", "fileHref", "fileName"] as const) {
            const value = String(item[field] ?? "");
            if (!value) continue;
            if (/[^\x20-\x7E]/.test(value)) errors.push(`${id}: ${field} に非ASCII文字（日本語等）が含まれる: ${value}`);
            if (/\s/.test(value)) errors.push(`${id}: ${field} にスペースが含まれる: ${value}`);
            if (/\.(png|jpe?g)\.(png|jpe?g)$/i.test(value)) errors.push(`${id}: ${field} が二重拡張子: ${value}`);
        }

        const fileHref = String(item.fileHref ?? "");
        const fileName = String(item.fileName ?? "");
        if (fileHref && fileName && hrefBasename(fileHref) !== fileName) {
            errors.push(`${id}: fileName "${fileName}" と fileHref の key末尾 "${hrefBasename(fileHref)}" が一致しない`);
        }
    }

    // plain / text ペアチェック（"-text" 付きIDに相方がいるか、その逆）
    // イラスト自体に文字が焼き込まれていて plain 版が存在しない素材はここに登録して除外する
    const intentionalSingles = new Set([
        "patakara-exercise-premium-text", // パタカラ体操：パ・タ・カ・ラの説明文がイラスト本体
    ]);
    const ids = new Set(items.map((i) => String(i.id)));
    for (const id of ids) {
        if (intentionalSingles.has(id)) continue;
        if (id.endsWith("-text")) {
            const plainId = id.slice(0, -"-text".length);
            if (!ids.has(plainId)) warnings.push(`ペア欠け: "${id}" はあるが "${plainId}"（plain版）が無い`);
        } else {
            if (!ids.has(`${id}-text`)) warnings.push(`ペア欠け: "${id}" はあるが "${id}-text"（文字あり版）が無い`);
        }
    }

    console.log(`検査対象: ${items.length}エントリ`);
    if (warnings.length > 0) {
        console.log(`\n⚠ 警告 ${warnings.length}件（意図的なら無視してOK）:`);
        for (const w of warnings) console.log(`   ${w}`);
    }
    if (errors.length > 0) {
        console.log(`\n❌ エラー ${errors.length}件（修正が必要）:`);
        for (const e of errors) console.log(`   ${e}`);
        process.exit(1);
    }
    console.log("\n✅ エラーなし。");
}

main().catch((err) => {
    console.error("エラー:", err);
    process.exit(1);
});
