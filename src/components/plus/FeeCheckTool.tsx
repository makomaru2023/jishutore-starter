"use client";

import { useMemo, useState } from "react";
import feeDataJson from "@/data/fee-items/homon-riha.json";

type FeeInsurance = "care" | "medical";
type FeeCategory = "kihon" | "kasan" | "gensan" | "rule";

type FeeUnit = {
    condition: string;
    value: string;
    note?: string;
};

type FeeSource = {
    label: string;
    url: string;
    page?: string;
};

type RelatedQA = {
    label: string;
    url: string;
};

type FeeItem = {
    id: string;
    insurance: FeeInsurance;
    category: FeeCategory;
    name: string;
    units: FeeUnit[];
    requirements: string[];
    records: string[];
    auditPoints: string[];
    pitfalls?: string[];
    relatedQA?: RelatedQA[];
    sources: FeeSource[];
    lastVerified: string;
    changedInLastRevision?: boolean;
    changeSummary?: string;
    verificationLevel?: string;
};

type FeeDomain = {
    schemaVersion: number;
    domain: string;
    domainLabel: string;
    revision: {
        care: string;
        medical: string;
    };
    disclaimer: string;
    items: FeeItem[];
};

const feeData = feeDataJson as FeeDomain;

const ALL = "all";

const insuranceLabels: Record<FeeInsurance, string> = {
    care: "介護保険",
    medical: "医療保険",
};

const categoryLabels: Record<FeeCategory, string> = {
    kihon: "基本報酬",
    kasan: "加算",
    gensan: "減算",
    rule: "ルール",
};

const categoryStyles: Record<FeeCategory, string> = {
    kihon: "border-blue-200 bg-blue-50 text-blue-800",
    kasan: "border-amber-200 bg-amber-50 text-amber-800",
    gensan: "border-rose-200 bg-rose-50 text-rose-800",
    rule: "border-slate-200 bg-slate-100 text-slate-700",
};

const normalize = (value: string) => value.normalize("NFKC").toLowerCase();

const SearchIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.3-4.3M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" />
    </svg>
);

const ExternalIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 4h6v6M10 14 20 4M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5" />
    </svg>
);

const PrintIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 8V4h10v4M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M7 14h10v6H7z" />
    </svg>
);

const SectionList = ({ title, items }: { title: string; items: string[] }) => (
    <section className="min-w-0">
        <h4 className="text-sm font-black text-slate-900">{title}</h4>
        <ul className="mt-2 space-y-1.5">
            {items.map((item, index) => (
                <li key={`${title}-${index}`} className="flex gap-2 text-sm leading-6 text-slate-700">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </section>
);

const FeeCard = ({ item }: { item: FeeItem }) => (
    <article className="break-inside-avoid rounded-lg border border-slate-200 bg-white p-5 shadow-sm print:border-slate-300 print:shadow-none">
        <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
                <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-black text-blue-800">
                        {insuranceLabels[item.insurance]}
                    </span>
                    <span className={`rounded-full border px-2.5 py-1 text-xs font-black ${categoryStyles[item.category]}`}>
                        {categoryLabels[item.category]}
                    </span>
                    {item.changedInLastRevision && (
                        <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs font-black text-indigo-800">
                            改定で変更
                        </span>
                    )}
                    {item.verificationLevel === "genpon" && (
                        <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-black text-slate-600">
                            原本確認済
                        </span>
                    )}
                </div>
                <h3 className="mt-3 text-xl font-black leading-snug text-slate-950 jp-heading">{item.name}</h3>
                {item.changeSummary && (
                    <p className="mt-2 text-sm font-bold leading-6 text-blue-800">{item.changeSummary}</p>
                )}
            </div>
            <p className="rounded-md bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-500">
                確認日: {item.lastVerified}
            </p>
        </div>

        <div className="mt-5 overflow-hidden rounded-lg border border-slate-200">
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

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <SectionList title="算定要件" items={item.requirements} />
            <SectionList title="記録に残すこと" items={item.records} />
            <SectionList title="自己点検で見るポイント" items={item.auditPoints} />
            {item.pitfalls && item.pitfalls.length > 0 && <SectionList title="つまずきやすい点" items={item.pitfalls} />}
        </div>

        {(item.relatedQA?.length || item.sources.length) && (
            <div className="mt-5 grid gap-3 border-t border-slate-100 pt-4 md:grid-cols-2">
                {item.relatedQA && item.relatedQA.length > 0 && (
                    <details className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                        <summary className="cursor-pointer text-sm font-black text-slate-800">関連Q&A</summary>
                        <ul className="mt-3 space-y-2">
                            {item.relatedQA.map((qa, index) => (
                                <li key={`${item.id}-qa-${index}`}>
                                    <a
                                        href={qa.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1 text-sm font-bold leading-6 text-blue-700 hover:underline"
                                    >
                                        {qa.label}
                                        <ExternalIcon />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </details>
                )}
                <details className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <summary className="cursor-pointer text-sm font-black text-slate-800">根拠資料</summary>
                    <ul className="mt-3 space-y-3">
                        {item.sources.map((source, index) => (
                            <li key={`${item.id}-source-${index}`} className="text-sm leading-6">
                                <a
                                    href={source.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 font-bold text-blue-700 hover:underline"
                                >
                                    {source.label}
                                    <ExternalIcon />
                                </a>
                                {source.page && <p className="mt-1 text-xs font-medium text-slate-500">{source.page}</p>}
                            </li>
                        ))}
                    </ul>
                </details>
            </div>
        )}

        <p className="mt-4 rounded-md bg-slate-50 p-3 text-xs leading-5 text-slate-500">
            {feeData.disclaimer}
        </p>
    </article>
);

export function FeeCheckTool() {
    const [query, setQuery] = useState("");
    const [insurance, setInsurance] = useState<FeeInsurance | typeof ALL>(ALL);
    const [category, setCategory] = useState<FeeCategory | typeof ALL>(ALL);
    const [changedOnly, setChangedOnly] = useState(false);

    const filteredItems = useMemo(() => {
        const q = normalize(query.trim());
        return feeData.items.filter((item) => {
            if (insurance !== ALL && item.insurance !== insurance) return false;
            if (category !== ALL && item.category !== category) return false;
            if (changedOnly && !item.changedInLastRevision) return false;
            if (!q) return true;
            const haystack = normalize(
                [
                    item.name,
                    item.units.map((u) => `${u.condition} ${u.value} ${u.note || ""}`).join(" "),
                    item.requirements.join(" "),
                    item.records.join(" "),
                    item.auditPoints.join(" "),
                    item.pitfalls?.join(" ") || "",
                    item.changeSummary || "",
                ].join(" ")
            );
            return haystack.includes(q);
        });
    }, [category, changedOnly, insurance, query]);

    const stats = useMemo(() => {
        const genpon = feeData.items.filter((item) => item.verificationLevel === "genpon").length;
        const changed = feeData.items.filter((item) => item.changedInLastRevision).length;
        return { total: feeData.items.length, genpon, changed };
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 print:bg-white">
            <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur print:static print:border-slate-300">
                <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
                    <a href="/plus/library/" className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-700 text-white shadow-sm" aria-label="Plus資料庫へ">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16M4 6h16M4 18h10" />
                        </svg>
                    </a>
                    <div className="min-w-0">
                        <p className="text-base font-black leading-tight text-slate-900 sm:text-lg">報酬算定チェック</p>
                        <p className="hidden truncate text-xs text-slate-500 sm:block">
                            {feeData.domainLabel}の算定要件を、根拠資料つきで自己点検
                        </p>
                    </div>
                    <nav className="ml-auto flex items-center gap-2 text-xs font-bold print:hidden">
                        <a href="/plus/library/" className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-600 transition hover:border-blue-300 hover:text-blue-700">
                            資料庫
                        </a>
                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="hidden items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-600 transition hover:border-blue-300 hover:text-blue-700 sm:flex"
                        >
                            <PrintIcon />
                            印刷
                        </button>
                        <form action="/api/plus/auth/logout/" method="post">
                            <button type="submit" className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                                ログアウト
                            </button>
                        </form>
                    </nav>
                </div>
            </header>

            <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 print:px-0">
                <section className="rounded-lg border border-blue-100 bg-white p-5 shadow-sm print:border-slate-300 print:shadow-none">
                    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
                        <div>
                            <p className="text-sm font-black text-blue-700">自主トレ素材庫Plus</p>
                            <h1 className="mt-2 text-2xl font-black leading-tight text-slate-950 sm:text-3xl jp-heading">
                                訪問リハビリテーションの算定要件を確認する
                            </h1>
                            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                                単位数・算定要件・記録に残すこと・自己点検で見るポイントを、同じ型で確認できます。
                                厚生労働省の告示・通知・疑義解釈へのリンクも各項目にまとめています。
                            </p>
                        </div>
                        <dl className="grid grid-cols-3 gap-2">
                            <div className="rounded-lg bg-blue-50 p-3 text-center">
                                <dt className="text-xs font-black text-blue-700">項目数</dt>
                                <dd className="mt-1 text-2xl font-black text-blue-950">{stats.total}</dd>
                            </div>
                            <div className="rounded-lg bg-slate-100 p-3 text-center">
                                <dt className="text-xs font-black text-slate-600">原本確認</dt>
                                <dd className="mt-1 text-2xl font-black text-slate-950">{stats.genpon}</dd>
                            </div>
                            <div className="rounded-lg bg-indigo-50 p-3 text-center">
                                <dt className="text-xs font-black text-indigo-700">改定変更</dt>
                                <dd className="mt-1 text-2xl font-black text-indigo-950">{stats.changed}</dd>
                            </div>
                        </dl>
                    </div>
                    <div className="mt-4 grid gap-2 text-xs font-bold text-slate-500 md:grid-cols-2">
                        <p>介護保険: {feeData.revision.care}</p>
                        <p>医療保険: {feeData.revision.medical}</p>
                    </div>
                    <p className="mt-4 rounded-md bg-slate-50 p-3 text-xs leading-5 text-slate-500">
                        {feeData.disclaimer}
                    </p>
                </section>

                <section className="mt-5 rounded-lg border border-slate-200 bg-white p-4 shadow-sm print:hidden">
                    <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_180px_220px_160px]">
                        <label className="relative block">
                            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                <SearchIcon />
                            </span>
                            <input
                                type="search"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="名称・要件・記録内容で検索"
                                className="h-11 w-full rounded-md border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                            />
                        </label>
                        <select
                            value={insurance}
                            onChange={(event) => setInsurance(event.target.value as FeeInsurance | typeof ALL)}
                            className="h-11 rounded-md border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                            aria-label="保険種別"
                        >
                            <option value={ALL}>すべての保険</option>
                            <option value="care">介護保険</option>
                            <option value="medical">医療保険</option>
                        </select>
                        <select
                            value={category}
                            onChange={(event) => setCategory(event.target.value as FeeCategory | typeof ALL)}
                            className="h-11 rounded-md border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                            aria-label="カテゴリ"
                        >
                            <option value={ALL}>すべてのカテゴリ</option>
                            <option value="kihon">基本報酬</option>
                            <option value="kasan">加算</option>
                            <option value="gensan">減算</option>
                            <option value="rule">ルール</option>
                        </select>
                        <label className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700">
                            <input
                                type="checkbox"
                                checked={changedOnly}
                                onChange={(event) => setChangedOnly(event.target.checked)}
                                className="h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-400"
                            />
                            改定変更のみ
                        </label>
                    </div>
                </section>

                <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm font-bold text-slate-500">
                        表示中 <span className="text-slate-900">{filteredItems.length}</span> / {feeData.items.length}項目
                    </p>
                    {(query || insurance !== ALL || category !== ALL || changedOnly) && (
                        <button
                            type="button"
                            onClick={() => {
                                setQuery("");
                                setInsurance(ALL);
                                setCategory(ALL);
                                setChangedOnly(false);
                            }}
                            className="text-sm font-bold text-blue-700 hover:underline print:hidden"
                        >
                            絞り込みを解除
                        </button>
                    )}
                </div>

                <div className="mt-4 space-y-4">
                    {filteredItems.length === 0 ? (
                        <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                            <p className="text-sm font-bold text-slate-500">条件に合う項目が見つかりませんでした。</p>
                        </div>
                    ) : (
                        filteredItems.map((item) => <FeeCard key={item.id} item={item} />)
                    )}
                </div>
            </main>
        </div>
    );
}
