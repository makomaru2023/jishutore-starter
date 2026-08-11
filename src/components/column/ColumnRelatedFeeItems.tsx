/**
 * 記事末尾の「関連する報酬チェック」ブロック。
 *
 * 記事側は frontmatter に項目IDを書くだけで、名称・単位数は fee-check の
 * 検証済みデータから引く。記事本文に数字を書き写さないための仕組み
 * （改定のたびに記事を直す量を減らす／編集ガイド§5）。
 */

import { FeeCheckTrackedLink } from "@/components/fee-check/FeeCheckAnalytics";
import { categoryLabels, getFeeItemUrl, type FeeDomain, type FeeItem } from "@/lib/fee-check";

export function ColumnRelatedFeeItems({
    slug,
    entries,
}: {
    slug: string;
    entries: Array<{ domain: FeeDomain; item: FeeItem }>;
}) {
    if (entries.length === 0) return null;

    return (
        <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <p className="text-xs font-black tracking-widest text-blue-700">関連する報酬チェック</p>
            <h2 className="jp-heading mt-2 text-lg font-black text-slate-950 sm:text-xl">
                単位数・算定要件・根拠資料はこちらで確認できます
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {entries.map(({ domain, item }) => (
                    <FeeCheckTrackedLink
                        key={`${domain.domain}-${item.id}`}
                        href={getFeeItemUrl(domain.domain, item.id)}
                        event="result"
                        params={{
                            fee_domain: domain.domain,
                            fee_item_id: item.id,
                            fee_category: item.category,
                            search_location: "column_fee_item_link",
                            column_slug: slug,
                        }}
                        className="flex flex-col rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50"
                    >
                        <span className="flex flex-wrap gap-2">
                            <span className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-xs font-black text-slate-600">
                                {domain.domainLabel}
                            </span>
                            <span className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-xs font-black text-slate-600">
                                {categoryLabels[item.category]}
                            </span>
                        </span>
                        <span className="jp-heading mt-2.5 text-base font-black leading-relaxed text-slate-950">
                            {item.name}
                        </span>
                        <span className="mt-2 text-sm leading-6 text-slate-600">
                            <span className="font-bold">{item.units[0]?.condition}</span>
                            <span className="mx-2 text-slate-300">|</span>
                            <span className="font-black text-blue-800">{item.units[0]?.value}</span>
                        </span>
                        <span className="mt-3 text-xs font-black text-blue-700">
                            確認日 {item.lastVerified} / 詳しく見る →
                        </span>
                    </FeeCheckTrackedLink>
                ))}
            </div>
        </section>
    );
}
