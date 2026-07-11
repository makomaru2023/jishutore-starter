import type { Metadata } from "next";
import Link from "next/link";
import { FeeCheckGlobalSearch, type FeeCheckSearchEntry } from "@/components/fee-check/FeeCheckGlobalSearch";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
    categoryLabels,
    feeDomains,
    getDomainUrl,
    getFeeCheckTotalCount,
    getFeeItemUrl,
    getPublicFeeSearchText,
    getSampleFeeItems,
} from "@/lib/fee-check";

export const metadata: Metadata = {
    title: "診療・介護報酬チェック｜算定要件・単位数を無料で確認｜自主トレ素材庫",
    description:
        "訪問リハ・通所リハ・老健・訪問看護からのリハ・回復期リハ病棟・地域包括ケア病棟・急性期一般病棟の算定要件、単位数・点数、根拠資料リンクを無料公開。記録・自己点検ポイントは自主トレ素材庫Plusで確認できます。",
    alternates: {
        canonical: "https://jishutore-sozaiko.online/fee-check/",
    },
};

// これ未満の項目数の分野は「準備中・第1弾公開」として、完成分野と視覚的に区別する。
const DOMAIN_READY_THRESHOLD = 5;

export default function FeeCheckTopPage() {
    const totalCount = getFeeCheckTotalCount();
    const samples = getSampleFeeItems();
    const searchEntries: FeeCheckSearchEntry[] = feeDomains.flatMap((domain) =>
        domain.items.map((item) => ({
            domain: domain.domain,
            domainLabel: domain.domainLabel,
            id: item.id,
            name: item.name,
            insurance: item.insurance,
            category: item.category,
            unitCondition: item.units[0]?.condition ?? "区分なし",
            unitValue: item.units[0]?.value ?? "—",
            searchText: getPublicFeeSearchText(item),
        })),
    );
    // 完成分野を先に、準備中（項目数が少ない）分野を末尾に並べる。
    const orderedDomains = [...feeDomains].sort(
        (a, b) =>
            Number(a.items.length < DOMAIN_READY_THRESHOLD) -
            Number(b.items.length < DOMAIN_READY_THRESHOLD),
    );

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Header />
            <main className="flex-1">
                <section className="border-b border-blue-100 bg-white py-12 sm:py-16">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-4xl text-center">
                            <p className="text-xs font-black tracking-widest text-blue-700">診療・介護報酬チェック</p>
                            <h1 className="mt-3 break-keep text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
                                算定要件・単位数を、根拠リンクつきで確認できます
                            </h1>
                            <p className="mx-auto mt-4 max-w-3xl break-keep text-sm leading-7 text-slate-600 sm:text-base">
                                介護保険・医療保険の全{feeDomains.length}分野を整理しています。
                                単位数・算定要件・根拠資料は無料公開中です。
                            </p>
                            <div className="mt-6 flex flex-wrap justify-center gap-3">
                                <span className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-black text-blue-800">
                                    全{totalCount}項目
                                </span>
                                <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-black text-slate-700">
                                    一次資料リンクつき
                                </span>
                                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-800">
                                    全文サンプルあり
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                <FeeCheckGlobalSearch
                    entries={searchEntries}
                    domains={feeDomains.map((domain) => ({ id: domain.domain, label: domain.domainLabel }))}
                />

                <section className="py-10 sm:py-14">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-5xl">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <p className="text-xs font-black tracking-widest text-blue-700">分野を選ぶ</p>
                                    <h2 className="mt-2 text-2xl font-black text-slate-950">公開中のチェック項目</h2>
                                </div>
                                <Link href="/products/jishutore-plus/" className="text-sm font-black text-blue-700 hover:underline">
                                    記録・自己点検ポイントまで見る
                                </Link>
                            </div>

                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                                {orderedDomains.map((domain) => {
                                    const isPreparing = domain.items.length < DOMAIN_READY_THRESHOLD;
                                    const categoryCounts = domain.items.reduce<Record<string, number>>((counts, item) => {
                                        counts[item.category] = (counts[item.category] ?? 0) + 1;
                                        return counts;
                                    }, {});
                                    return (
                                        <Link
                                            key={domain.domain}
                                            href={getDomainUrl(domain.domain)}
                                            className={`rounded-lg border p-5 shadow-sm transition hover:shadow-md ${
                                                isPreparing
                                                    ? "border-dashed border-slate-300 bg-slate-50 hover:border-slate-400"
                                                    : "border-slate-200 bg-white hover:border-blue-300"
                                            }`}
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <h3 className="break-keep text-lg font-black text-slate-950">{domain.domainLabel}</h3>
                                                        {isPreparing && (
                                                            <span className="rounded-full border border-slate-300 bg-white px-2.5 py-0.5 text-xs font-black text-slate-500">
                                                                準備中・第1弾公開
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="mt-2 text-sm leading-6 text-slate-600">
                                                        {isPreparing
                                                            ? `第1弾として${domain.items.length}項目を公開中。順次追加していきます。`
                                                            : `${domain.items.length}項目を掲載。単位数・算定要件・根拠資料を確認できます。`}
                                                    </p>
                                                </div>
                                                <span
                                                    className={`rounded-full px-3 py-1 text-sm font-black ${
                                                        isPreparing ? "bg-slate-200 text-slate-500" : "bg-blue-50 text-blue-800"
                                                    }`}
                                                >
                                                    {domain.items.length}
                                                </span>
                                            </div>
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {Object.entries(categoryCounts).map(([category, count]) => (
                                                    <span key={category} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600">
                                                        {categoryLabels[category as keyof typeof categoryLabels]} {count}
                                                    </span>
                                                ))}
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-t border-slate-200 bg-white py-12 sm:py-16">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-5xl">
                            <div className="text-center">
                                <p className="text-xs font-black tracking-widest text-blue-700">無料とPlusの違い</p>
                                <h2 className="mt-2 text-2xl font-black leading-tight text-slate-950 sm:text-3xl">
                                    要件確認は無料。実務の見落とし対策はPlus。
                                </h2>
                                <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                                    無料版とPlusの違いを比べて、必要な範囲を選べます。
                                </p>
                            </div>

                            <div className="mt-8 grid items-stretch gap-4 md:grid-cols-2">
                                <div className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-black text-slate-700">
                                                無料公開
                                            </span>
                                            <h3 className="mt-3 text-xl font-black text-slate-950">算定の前提をすばやく確認</h3>
                                        </div>
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-lg shadow-sm" aria-hidden="true">
                                            🔎
                                        </span>
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        単位数と要件を、一次資料までさかのぼって確認したいときに。
                                    </p>
                                    <ul className="mt-5 flex-1 space-y-3 text-sm font-bold leading-6 text-slate-700">
                                        {[
                                            "単位数・点数",
                                            "算定要件",
                                            "根拠資料リンク・確認日",
                                            "全分野検索・カテゴリ絞り込み",
                                        ].map((label) => (
                                            <li key={label} className="flex gap-2.5">
                                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs text-emerald-700" aria-hidden="true">✓</span>
                                                <span>{label}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        href="#fee-check-search"
                                        className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-black text-slate-800 transition hover:border-blue-300 hover:text-blue-700"
                                    >
                                        無料で項目を検索する
                                    </Link>
                                </div>

                                <div className="relative flex flex-col overflow-hidden rounded-2xl border-2 border-blue-500 bg-gradient-to-br from-blue-700 to-indigo-800 p-5 text-white shadow-lg shadow-blue-900/15 sm:p-6">
                                    <div className="absolute right-0 top-0 h-32 w-32 translate-x-10 -translate-y-10 rounded-full bg-white/10" aria-hidden="true" />
                                    <div className="relative flex items-start justify-between gap-4">
                                        <div>
                                            <span className="inline-flex rounded-full bg-amber-300 px-3 py-1 text-xs font-black text-amber-950">
                                                自主トレ素材庫Plus
                                            </span>
                                            <h3 className="mt-3 text-xl font-black">実務の確認まで、ひとつの画面で</h3>
                                        </div>
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-lg" aria-hidden="true">
                                            ✓
                                        </span>
                                    </div>
                                    <p className="relative mt-3 text-sm leading-6 text-blue-100">
                                        無料公開の内容に加えて、記録漏れや見落としを減らす確認項目まで見られます。
                                    </p>
                                    <div className="relative mt-4 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs font-black text-blue-50">
                                        無料で見られる内容をすべて含みます
                                    </div>
                                    <ul className="relative mt-4 flex-1 space-y-3 text-sm font-bold leading-6 text-white">
                                        {[
                                            "記録に残すこと",
                                            "自己点検で見るポイント",
                                            "つまずきやすい点・関連Q&A",
                                            "改定差分・印刷表示",
                                        ].map((label) => (
                                            <li key={label} className="flex gap-2.5">
                                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-xs text-blue-700" aria-hidden="true">✓</span>
                                                <span>{label}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        href="/products/jishutore-plus/"
                                        className="relative mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-black text-blue-800 shadow-sm transition hover:bg-blue-50"
                                    >
                                        Plusの内容・料金を見る
                                        <span aria-hidden="true">→</span>
                                    </Link>
                                </div>
                            </div>

                            <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 sm:p-7">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                                    <div>
                                        <span className="inline-flex rounded-full bg-emerald-700 px-3 py-1 text-xs font-black text-white">
                                            登録不要・無料
                                        </span>
                                        <h3 className="mt-3 text-xl font-black text-emerald-950 sm:text-2xl">
                                            まずは全文サンプルで、Plus表示を体験
                                        </h3>
                                        <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-950/80">
                                            各分野から1項目ずつ、記録・自己点検・つまずきやすい点まで全文公開しています。
                                        </p>
                                    </div>
                                    <p className="shrink-0 text-xs font-black text-emerald-800">
                                        全{samples.length}分野のサンプル
                                    </p>
                                </div>
                                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                    {samples.map(({ domain, item }) => (
                                        <Link
                                            key={item.id}
                                            href={getFeeItemUrl(domain.domain, item.id)}
                                            className="group flex min-h-32 flex-col rounded-xl border border-emerald-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md"
                                        >
                                            <span className="text-xs font-black text-emerald-700">{domain.domainLabel}</span>
                                            <span className="mt-2 flex-1 text-sm font-black leading-6 text-slate-900">{item.name}</span>
                                            <span className="mt-3 text-xs font-black text-emerald-700 group-hover:underline">
                                                全文を見る <span aria-hidden="true">→</span>
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
