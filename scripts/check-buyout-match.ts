/**
 * 買い切りCTAの検算スクリプト（一時的な確認用ではなくリポジトリに残す）。
 * 全素材について、matchBuyoutProduct が返すプレビュー画像が実在するかを確認する。
 * 使い方: npx tsx scripts/check-buyout-match.ts
 */
import fs from "node:fs";
import path from "node:path";
import { getItems } from "../src/lib/items";
import { matchBuyoutProduct } from "../src/lib/buyout-match";

const items = getItems();
const counts = new Map<string, number>();
const missing: string[] = [];

for (const item of items) {
    const match = matchBuyoutProduct(item);
    const key = `${match.product.name} / ${match.deckLabel}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);

    const filePath = path.join(process.cwd(), "public", match.previewSrc);
    if (!fs.existsSync(filePath)) missing.push(`${item.id} -> ${match.previewSrc}`);
}

for (const [key, count] of [...counts.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(String(count).padStart(4), key);
}
console.log(`\n素材 ${items.length}点 / 画像欠け ${missing.length}件`);
for (const line of missing.slice(0, 10)) console.log("  MISSING", line);
