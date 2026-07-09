import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
    categoryLabels,
    feeDomains,
    getDomainUrl,
    getFeeCheckTotalCount,
    getFeeItemUrl,
    getSampleFeeItems,
} from "@/lib/fee-check";

export const metadata: Metadata = {
    title: "診療・介護報酬チェック｜算定要件・単位数を無料で確認｜自主トレ素材庫",
    description:
        "訪問リハ・通所リハ・老健・訪問看護からのリハ・回復期リハ病棟の算定要件、単位数・点数、根拠資料リンクを無料公開。記録・自己点検ポイントは自主トレ素材庫Plusで確認できます。",
    alternates: {
        canonical: "https://jishutore-sozaiko.online/fee-check/",
    },
};

export default function FeeCheckTopPage() {
    const totalCount = getFeeCheckTotalCount();
    const samples = getSampleFeeItems();

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
                                訪問リハ・通所リハ・老健・訪問看護からのリハ・回復期リハ病棟の主要項目を整理しています。
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
                                {feeDomains.map((domain) => {
                                    const categoryCounts = domain.items.reduce<Record<string, number>>((counts, item) => {
                                        counts[item.category] = (counts[item.category] ?? 0) + 1;
                                        return counts;
                                    }, {});
                                    return (
                                        <Link
                                            key={domain.domain}
                                            href={getDomainUrl(domain.domain)}
                                            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h3 className="break-keep text-lg font-black text-slate-950">{domain.domainLabel}</h3>
                                                    <p className="mt-2 text-sm leading-6 text-slate-600">
                                                        {domain.items.length}項目を掲載。単位数・算定要件・根拠資料を確認できます。
                                                    </p>
                                                </div>
                                                <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-black text-blue-800">
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

                <section className="bg-white py-10 sm:py-14">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
                            <div>
                                <p className="text-xs font-black tracking-widest text-blue-700">無料とPlusの違い</p>
                                <h2 className="mt-2 text-2xl font-black text-slate-950">無料公開は要件確認、Plusは実務チェックまで</h2>
                                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                                        <h3 className="font-black text-slate-900">無料で見られる内容</h3>
                                        <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                                            <li>単位数・点数</li>
                                            <li>算定要件</li>
                                            <li>根拠資料リンク・確認日</li>
                                            <li>分野内検索・カテゴリ絞り込み</li>
                                        </ul>
                                    </div>
                                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                                        <h3 className="font-black text-blue-950">Plusで見られる内容</h3>
                                        <ul className="mt-3 space-y-2 text-sm leading-6 text-blue-950">
                                            <li>記録に残すこと</li>
                                            <li>自己点検で見るポイント</li>
                                            <li>つまずきやすい点・関連Q&A</li>
                                            <li>改定差分・印刷表示</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
                                <p className="text-sm font-black text-emerald-800">全文公開サンプル</p>
                                <p className="mt-2 text-sm leading-6 text-emerald-950">
                                    各分野から1項目だけ、Plus表示をそのまま無料公開しています。
                                </p>
                                <div className="mt-4 space-y-2">
                                    {samples.map(({ domain, item }) => (
                                        <Link
                                            key={item.id}
                                            href={getFeeItemUrl(domain.domain, item.id)}
                                            className="block rounded-md border border-emerald-200 bg-white px-3 py-2 text-sm font-bold leading-6 text-emerald-900 hover:border-emerald-400"
                                        >
                                            {domain.domainLabel}: {item.name}
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
