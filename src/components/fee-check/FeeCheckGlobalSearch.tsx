"use client";

import { useMemo, useState, type FormEvent } from "react";
import { FeeCheckTrackedLink } from "@/components/fee-check/FeeCheckAnalytics";
import {
    categoryLabels,
    categoryStyles,
    getFeeItemUrl,
    insuranceLabels,
    normalizeFeeText,
    type FeeCategory,
    type FeeInsurance,
} from "@/lib/fee-check-shared";
import { trackFeeCheckSearch } from "@/lib/analytics";

const ALL = "all";
const RESULT_LIMIT = 20;

export type FeeCheckSearchEntry = {
    domain: string;
    domainLabel: string;
    id: string;
    name: string;
    insurance: FeeInsurance;
    category: FeeCategory;
    unitCondition: string;
    unitValue: string;
    searchText: string;
};

function filterEntries(
    entries: FeeCheckSearchEntry[],
    query: string,
    domain: string,
    insurance: string,
    category: string,
) {
    const keywords = normalizeFeeText(query.trim()).split(/\s+/).filter(Boolean);
    return entries.filter((entry) => {
        if (domain !== ALL && entry.domain !== domain) return false;
        if (insurance !== ALL && entry.insurance !== insurance) return false;
        if (category !== ALL && entry.category !== category) return false;
        return keywords.every((keyword) => entry.searchText.includes(keyword));
    });
}

export function FeeCheckGlobalSearch({
    entries,
    domains,
}: {
    entries: FeeCheckSearchEntry[];
    domains: Array<{ id: string; label: string }>;
}) {
    const [query, setQuery] = useState("");
    const [domain, setDomain] = useState(ALL);
    const [insurance, setInsurance] = useState(ALL);
    const [category, setCategory] = useState(ALL);
    const [submitted, setSubmitted] = useState(false);
    const [applied, setApplied] = useState({ query: "", domain: ALL, insurance: ALL, category: ALL });

    const results = useMemo(
        () => filterEntries(entries, applied.query, applied.domain, applied.insurance, applied.category),
        [applied, entries],
    );

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const next = { query, domain, insurance, category };
        const nextResults = filterEntries(entries, query, domain, insurance, category);
        setApplied(next);
        setSubmitted(true);
        trackFeeCheckSearch({
            query: query.trim(),
            domain,
            insurance,
            category,
            resultCount: nextResults.length,
            location: "global",
        });
    };

    return (
        <section id="fee-check-search" className="scroll-mt-20 border-b border-blue-100 bg-blue-50/50 py-8 sm:py-10">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-5xl rounded-xl border border-blue-200 bg-white p-4 shadow-sm sm:p-6">
                    <div className="mb-4">
                        <p className="text-xs font-black tracking-widest text-blue-700">全分野から探す</p>
                        <h2 className="mt-2 text-2xl font-black text-slate-950">名称や要件をまとめて検索</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            分野が分からなくても、加算名・単位数・算定要件から探せます。
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_190px_150px_150px_100px]">
                        <label>
                            <span className="sr-only">キーワード</span>
                            <input
                                type="search"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="例：短期集中、退院、200単位"
                                className="h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                            />
                        </label>
                        <select
                            value={domain}
                            onChange={(event) => setDomain(event.target.value)}
                            aria-label="分野"
                            className="h-11 rounded-md border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700"
                        >
                            <option value={ALL}>すべての分野</option>
                            {domains.map((item) => (
                                <option key={item.id} value={item.id}>{item.label}</option>
                            ))}
                        </select>
                        <select
                            value={insurance}
                            onChange={(event) => setInsurance(event.target.value)}
                            aria-label="保険種別"
                            className="h-11 rounded-md border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700"
                        >
                            <option value={ALL}>すべての保険</option>
                            <option value="care">介護保険</option>
                            <option value="medical">医療保険</option>
                        </select>
                        <select
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                            aria-label="カテゴリ"
                            className="h-11 rounded-md border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700"
                        >
                            <option value={ALL}>全カテゴリ</option>
                            <option value="kihon">基本報酬</option>
                            <option value="kasan">加算</option>
                            <option value="gensan">減算</option>
                            <option value="rule">ルール</option>
                        </select>
                        <button type="submit" className="h-11 rounded-md bg-blue-700 px-4 text-sm font-black text-white transition hover:bg-blue-800">
                            検索
                        </button>
                    </form>

                    {submitted && (
                        <div className="mt-5 border-t border-slate-100 pt-5" aria-live="polite">
                            <p className="text-sm font-bold text-slate-600">
                                <span className="text-slate-950">{results.length}件</span>見つかりました
                                {results.length > RESULT_LIMIT && `（先頭${RESULT_LIMIT}件を表示）`}
                            </p>
                            {results.length > 0 ? (
                                <div className="mt-3 grid gap-2 md:grid-cols-2">
                                    {results.slice(0, RESULT_LIMIT).map((item) => (
                                        <FeeCheckTrackedLink
                                            key={`${item.domain}-${item.id}`}
                                            href={getFeeItemUrl(item.domain, item.id)}
                                            event="result"
                                            params={{
                                                fee_domain: item.domain,
                                                fee_item_id: item.id,
                                                fee_category: item.category,
                                                search_location: "global",
                                            }}
                                            className="rounded-lg border border-slate-200 bg-slate-50 p-3 transition hover:border-blue-300 hover:bg-blue-50"
                                        >
                                            <div className="flex flex-wrap items-center gap-1.5">
                                                <span className="text-xs font-black text-blue-700">{item.domainLabel}</span>
                                                <span className="rounded-full border border-blue-200 bg-white px-2 py-0.5 text-[11px] font-black text-blue-800">
                                                    {insuranceLabels[item.insurance]}
                                                </span>
                                                <span className={`rounded-full border px-2 py-0.5 text-[11px] font-black ${categoryStyles[item.category]}`}>
                                                    {categoryLabels[item.category]}
                                                </span>
                                            </div>
                                            <p className="mt-2 break-keep text-sm font-black leading-6 text-slate-950">{item.name}</p>
                                            <p className="mt-1 text-sm text-slate-600">
                                                {item.unitCondition}: <span className="font-black text-blue-800">{item.unitValue}</span>
                                            </p>
                                        </FeeCheckTrackedLink>
                                    ))}
                                </div>
                            ) : (
                                <p className="mt-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm font-bold text-slate-500">
                                    条件に合う項目がありません。言葉を短くしてお試しください。
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
