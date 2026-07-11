import type { ReactNode } from "react";
import { FeeCheckTrackedLink } from "@/components/fee-check/FeeCheckAnalytics";
import { FeeCheckPrintButton } from "@/components/fee-check/FeeCheckPrintButton";
import {
    categoryLabels,
    categoryStyles,
    getFeeItemUrl,
    getSampleFeeItems,
    insuranceLabels,
    type FeeDomain,
    type FeeItem,
    type RelatedQA,
} from "@/lib/fee-check";

type LockedListKind = "records" | "audit" | "pitfalls";

const ExternalIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 4h6v6M10 14 20 4M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5" />
    </svg>
);

const sectionStyles: Record<LockedListKind, { itemClass: string; marker: string }> = {
    records: {
        itemClass: "rounded-md bg-blue-50 px-3 py-2 text-slate-700",
        marker: "📋",
    },
    audit: {
        itemClass: "text-slate-700",
        marker: "□",
    },
    pitfalls: {
        itemClass: "rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-amber-950",
        marker: "⚠",
    },
};

function UnitsTable({ item }: { item: FeeItem }) {
    return (
        <>
            <dl className="space-y-3 sm:hidden">
                {item.units.map((unit, index) => (
                    <div key={`${item.id}-unit-mobile-${index}`} className="rounded-lg border border-blue-100 bg-blue-50/50 p-4">
                        <dt className="text-sm font-bold leading-6 text-slate-700">{unit.condition}</dt>
                        <dd className="mt-1 text-2xl font-black leading-tight text-blue-800">{unit.value}</dd>
                        {unit.note && (
                            <p className="mt-2 border-t border-blue-100 pt-2 text-sm leading-6 text-slate-600">{unit.note}</p>
                        )}
                    </div>
                ))}
            </dl>
            <div className="hidden overflow-hidden rounded-lg border border-slate-200 sm:block">
                <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-xs font-black text-slate-600">
                    <tr>
                        <th className="w-[36%] px-3 py-2">区分</th>
                        <th className="w-[24%] px-3 py-2">単位数・点数</th>
                        <th className="px-3 py-2">補足</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {item.units.map((unit, index) => (
                        <tr key={`${item.id}-unit-${index}`}>
                            <td className="px-3 py-3 font-bold text-slate-800">{unit.condition}</td>
                            <td className="px-3 py-3 text-base font-black text-blue-800">{unit.value}</td>
                            <td className="px-3 py-3 leading-6 text-slate-600">{unit.note || "—"}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </>
    );
}

function Section({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
    return (
        <section className={`rounded-lg border border-slate-200 bg-white p-4 ${className}`}>
            <h2 className="text-base font-black text-slate-900 break-keep">{title}</h2>
            <div className="mt-3">{children}</div>
        </section>
    );
}

function RequirementsList({ items }: { items: string[] }) {
    return (
        <ol className="max-w-prose list-decimal space-y-2 pl-5">
            {items.map((item, index) => (
                <li key={`requirement-${index}`} className="pl-1 text-sm leading-7 text-slate-700">
                    {item}
                </li>
            ))}
        </ol>
    );
}

function LockedTextList({ items, kind }: { items: string[]; kind: LockedListKind }) {
    const styles = sectionStyles[kind];
    return (
        <ul className="max-w-prose space-y-2">
            {items.map((item, index) => (
                <li key={`${kind}-${index}`} className={`flex gap-2 text-sm leading-6 ${styles.itemClass}`}>
                    <span className="mt-0.5 flex-shrink-0 font-black text-blue-700" aria-hidden="true">
                        {styles.marker}
                    </span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

function LockedSection({
    title,
    items,
    kind,
    isUnlocked,
    hiddenCount,
}: {
    title: string;
    items: string[];
    kind: LockedListKind;
    isUnlocked: boolean;
    hiddenCount: number;
}) {
    if (items.length === 0) return null;

    return (
        <Section title={title} className={kind === "pitfalls" ? "border-amber-200 bg-amber-50/30" : "border-blue-100 bg-blue-50/30"}>
            <LockedTextList items={items} kind={kind} />
            {!isUnlocked && hiddenCount > 0 && (
                <div className="mt-3 rounded-md border border-dashed border-blue-200 bg-white px-3 py-3 text-sm font-black text-blue-800">
                    🔒 あと{hiddenCount}件はPlusで確認できます。
                </div>
            )}
        </Section>
    );
}

function RelatedQAList({ items, domain, itemId }: { items: RelatedQA[]; domain: string; itemId: string }) {
    return (
        <ul className="space-y-2">
            {items.map((qa, index) => (
                <li key={`qa-${index}`}>
                    <FeeCheckTrackedLink
                        href={qa.url}
                        target="_blank"
                        rel="noreferrer"
                        event="source"
                        params={{ fee_domain: domain, fee_item_id: itemId, source_type: "qa", source_label: qa.label }}
                        className="inline-flex items-center gap-1 text-sm font-bold leading-6 text-blue-700 hover:underline"
                    >
                        {qa.label}
                        <ExternalIcon />
                    </FeeCheckTrackedLink>
                </li>
            ))}
        </ul>
    );
}

function SourcesList({ item, domain }: { item: FeeItem; domain: string }) {
    return (
        <ul className="space-y-3">
            {item.sources.map((source, index) => (
                <li key={`${item.id}-source-${index}`} className="text-sm leading-6">
                    <FeeCheckTrackedLink
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        event="source"
                        params={{ fee_domain: domain, fee_item_id: item.id, source_type: "primary", source_label: source.label }}
                        className="inline-flex items-center gap-1 font-bold text-blue-700 hover:underline"
                    >
                        {source.label}
                        <ExternalIcon />
                    </FeeCheckTrackedLink>
                    {source.page && <p className="mt-1 text-xs font-medium text-slate-500">{source.page}</p>}
                </li>
            ))}
        </ul>
    );
}

function LockedCta({ domain, item, isUnlocked }: { domain: FeeDomain; item: FeeItem; isUnlocked: boolean }) {
    if (isUnlocked) return null;
    const sample = getSampleFeeItems().find((entry) => entry.domain.domain === domain.domain);
    const sampleHref = sample ? getFeeItemUrl(sample.domain.domain, sample.item.id) : "/fee-check/";

    return (
        <div className="rounded-lg border border-blue-200 bg-white p-4 print:hidden">
            <p className="text-sm font-black text-slate-900 break-keep">
                記録・自己点検ポイントまで見るにはPlus登録が必要です。
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
                「{item.name}」では一部だけ表示しています。全文公開サンプルでは、Plusで見られる表示をそのまま確認できます。
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <FeeCheckTrackedLink
                    href={sampleHref}
                    event="result"
                    params={{ fee_domain: domain.domain, fee_item_id: item.id, result_type: "sample" }}
                    className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-black text-blue-700 transition hover:bg-blue-50"
                >
                    全文サンプルを見る
                </FeeCheckTrackedLink>
                <FeeCheckTrackedLink
                    href="/products/jishutore-plus/"
                    event="plus"
                    params={{ fee_domain: domain.domain, fee_item_id: item.id, placement: "locked_detail" }}
                    className="inline-flex items-center justify-center rounded-full bg-blue-700 px-4 py-2 text-sm font-black text-white transition hover:bg-blue-800"
                >
                    Plusに登録する
                </FeeCheckTrackedLink>
            </div>
        </div>
    );
}

export function FeeCheckDetailCard({
    domain,
    item,
    isUnlocked,
    isSample,
    hiddenCounts,
}: {
    domain: FeeDomain;
    item: FeeItem;
    isUnlocked: boolean;
    isSample: boolean;
    hiddenCounts: {
        records: number;
        auditPoints: number;
        pitfalls: number;
    };
}) {
    return (
        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5 print:border-slate-300 print:shadow-none">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                    <div className="flex flex-wrap gap-2">
                        {item.currentlyNotClaimable && (
                            <span className="rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-black text-amber-800">
                                現在算定不可
                            </span>
                        )}
                        <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-black text-blue-800">
                            {insuranceLabels[item.insurance]}
                        </span>
                        <span className={`rounded-full border px-2.5 py-1 text-xs font-black ${categoryStyles[item.category]}`}>
                            {categoryLabels[item.category]}
                        </span>
                        {item.verificationLevel === "genpon" && (
                            <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-black text-slate-600">
                                一次資料確認済
                            </span>
                        )}
                        {isSample && (
                            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-800">
                                全文公開サンプル
                            </span>
                        )}
                    </div>
                    <h1 className="mt-3 text-2xl font-black leading-snug text-slate-950 jp-heading sm:text-3xl">
                        {item.name}の算定要件・単位数
                    </h1>
                    <p className="mt-2 text-sm font-bold text-slate-500">
                        {domain.domainLabel} / 確認日: {item.lastVerified}
                    </p>
                </div>
                {isUnlocked && <FeeCheckPrintButton domain={domain.domain} itemId={item.id} />}
            </div>

            {isSample && (
                <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-black leading-6 text-emerald-900 break-keep">
                    🔓 全文公開サンプル。Plusではすべての項目がこの表示で見られます。
                </div>
            )}

            {isUnlocked && item.changedInLastRevision && item.changeSummary && (
                <div className="mt-5 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-bold leading-6 text-indigo-900">
                    {item.changeSummary}
                </div>
            )}

            <div className="mt-5 space-y-4">
                <Section title="単位数・点数">
                    <UnitsTable item={item} />
                </Section>

                <Section title="算定要件">
                    <RequirementsList items={item.requirements} />
                </Section>

                <div className={`rounded-lg border px-4 py-3 text-sm font-black break-keep ${
                    isUnlocked
                        ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                        : "border-blue-100 bg-blue-50 text-blue-900"
                }`}>
                    {isUnlocked
                        ? isSample
                            ? "🔓 ここからも全文公開中（記録・自己点検の実務項目）"
                            : "✓ Plus実務チェック（記録・自己点検）"
                        : "🔒 ここからはPlus限定（記録・自己点検の実務項目）"}
                </div>

                <LockedSection
                    title="記録に残すこと"
                    items={item.records}
                    kind="records"
                    isUnlocked={isUnlocked}
                    hiddenCount={hiddenCounts.records}
                />
                <LockedSection
                    title="自己点検で見るポイント"
                    items={item.auditPoints}
                    kind="audit"
                    isUnlocked={isUnlocked}
                    hiddenCount={hiddenCounts.auditPoints}
                />
                <LockedSection
                    title="つまずきやすい点"
                    items={item.pitfalls ?? []}
                    kind="pitfalls"
                    isUnlocked={isUnlocked}
                    hiddenCount={hiddenCounts.pitfalls}
                />
                <LockedCta domain={domain} item={item} isUnlocked={isUnlocked} />
            </div>

            <div className="mt-5 grid gap-3 border-t border-slate-100 pt-4 md:grid-cols-2">
                {isUnlocked && item.relatedQA && item.relatedQA.length > 0 && (
                    <details className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                        <summary className="cursor-pointer text-sm font-black text-slate-800">関連Q&A</summary>
                        <div className="mt-3">
                            <RelatedQAList items={item.relatedQA} domain={domain.domain} itemId={item.id} />
                        </div>
                    </details>
                )}
                <details className="rounded-lg border border-slate-200 bg-slate-50 p-3" open>
                    <summary className="cursor-pointer text-sm font-black text-slate-800">根拠資料</summary>
                    <div className="mt-3">
                        <SourcesList item={item} domain={domain.domain} />
                    </div>
                </details>
            </div>

            <p className="mt-4 rounded-md bg-slate-50 p-3 text-xs leading-5 text-slate-500">
                {domain.disclaimer}
            </p>
        </article>
    );
}
