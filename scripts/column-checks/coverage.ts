/**
 * fee-check の項目のうち、コラムから逆引き導線（relatedFeeItems）が付いているものの割合を出す。
 *
 * `analytics/column-probe-tracker.md` の「分野別の導線カバー率」に貼る数字はここから取る。
 * ★2026-08-28にリポジトリへ移した。それまでは毎回その場で書き直していた。
 *
 * 使い方: npx tsx scripts/column-checks/coverage.ts
 */

import { getColumnArticles } from "@/lib/column";
import { getAllFeeItems } from "@/lib/fee-check";

const covered = new Set<string>();
for (const article of getColumnArticles()) {
    for (const rel of article.relatedFeeItems ?? []) {
        covered.add(`${rel.domain}/${rel.id}`);
    }
}

type Row = { total: number; hit: number; miss: string[] };
const byDomain = new Map<string, Row>();

for (const { domain, item } of getAllFeeItems()) {
    const row = byDomain.get(domain.domain) ?? { total: 0, hit: 0, miss: [] };
    row.total += 1;
    if (covered.has(`${domain.domain}/${item.id}`)) row.hit += 1;
    else row.miss.push(item.id);
    byDomain.set(domain.domain, row);
}

let total = 0;
let hit = 0;
for (const [domainId, row] of byDomain) {
    total += row.total;
    hit += row.hit;
    const pct = Math.round((row.hit / row.total) * 100);
    const miss = row.miss.length ? `  未カバー: ${row.miss.join(", ")}` : "";
    console.log(`${domainId}: ${row.hit}/${row.total} (${pct}%)${miss}`);
}

console.log(
    `\n合計: ${hit}/${total} (${Math.round((hit / total) * 100)}%) / 記事 ${getColumnArticles().length} 本`,
);
