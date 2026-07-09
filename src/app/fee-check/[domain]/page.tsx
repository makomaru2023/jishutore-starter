import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
    categoryLabels,
    categoryStyles,
    feeDomains,
    getDomainUrl,
    getFeeDomain,
    getFeeItemUrl,
    getPublicFeeSearchText,
    insuranceLabels,
    normalizeFeeText,
    sampleFeeItems,
    type FeeCategory,
} from "@/lib/fee-check";

const ALL = "all";

export async function generateStaticParams() {
    return feeDomains.map((domain) => ({
        domain: domain.domain,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ domain: string }> }): Promise<Metadata> {
    const { domain: domainId } = await params;
    const domain = getFeeDomain(domainId);
    if (!domain) {
        return { title: "報酬チェック項目が見つかりません｜自主トレ素材庫" };
    }

    return {
        title: `${domain.domainLabel}の算定要件・単位数一覧｜自主トレ素材庫`,
        description: `${domain.domainLabel}の報酬チェック項目を一覧で確認できます。単位数・算定要件・根拠資料リンクは無料公開、記録・自己点検ポイントはPlusで確認できます。`,
        alternates: {
            canonical: `https://jishutore-sozaiko.online${getDomainUrl(domain.domain)}`,
        },
    };
}

export default async function FeeCheckDomainPage({
    params,
    searchParams,
}: {
    params: Promise<{ domain: string }>;
    searchParams: Promise<{ q?: string; category?: string }>;
}) {
    const [{ domain: domainId }, { q = "", category = ALL }] = await Promise.all([params, searchParams]);
    const domain = getFeeDomain(domainId);
    if (!domain) notFound();

    const normalizedQuery = normalizeFeeText(q.trim());
    const filteredItems = domain.items.filter((item) => {
        if (category !== ALL && item.category !== category) return false;
        if (!normalizedQuery) return true;
        return getPublicFeeSearchText(item).includes(normalizedQuery);
    });
    const sampleId = sampleFeeItems[domain.domain];

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Header />
            <main className="flex-1">
                <section className="border-b border-blue-100 bg-white py-10">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-5xl">
                            <Link href="/fee-check/" className="text-sm font-black text-blue-700 hover:underline">
                                報酬チェックトップへ
                            </Link>
                            <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-end">
                                <div>
                                    <p className="text-xs font-black tracking-widest text-blue-700">分野別一覧</p>
                                    <h1 className="mt-2 break-keep text-3xl font-black leading-tight text-slate-950">
                                        {domain.domainLabel}の算定要件・単位数
                                    </h1>
                                    <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                                        単位数・算定要件・根拠資料リンクは無料で確認できます。
                                        記録に残すこと、自己点検で見るポイントはPlusで表示します。
                                    </p>
                                </div>
                                <dl className="grid grid-cols-2 gap-2">
                                    <div className="rounded-lg bg-blue-50 p-3 text-center">
                                        <dt className="text-xs font-black text-blue-700">項目数</dt>
                                        <dd className="mt-1 text-2xl font-black text-blue-950">{domain.items.length}</dd>
                                    </div>
                                    <div className="rounded-lg bg-slate-100 p-3 text-center">
                                        <dt className="text-xs font-black text-slate-600">原本確認</dt>
                                        <dd className="mt-1 text-2xl font-black text-slate-950">
                                            {domain.items.filter((item) => item.verificationLevel === "genpon").length}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-8">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-5xl">
                            <form action={getDomainUrl(domain.domain)} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                                <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px_120px]">
                                    <label className="block">
                                        <span className="sr-only">キーワード検索</span>
                                        <input
                                            type="search"
                                            name="q"
                                            defaultValue={q}
                                            placeholder="名称・単位数・算定要件で検索"
                                            className="h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                                        />
                                    </label>
                                    <select
                                        name="category"
                                        defaultValue={category}
                                        className="h-11 rounded-md border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                                        aria-label="カテゴリ"
                                    >
                                        <option value={ALL}>すべてのカテゴリ</option>
                                        <option value="kihon">基本報酬</option>
                                        <option value="kasan">加算</option>
                                        <option value="gensan">減算</option>
                                        <option value="rule">ルール</option>
                                    </select>
                                    <button type="submit" className="h-11 rounded-md bg-blue-700 px-4 text-sm font-black text-white transition hover:bg-blue-800">
                                        検索
                                    </button>
                                </div>
                                {(q || category !== ALL) && (
                                    <Link href={getDomainUrl(domain.domain)} className="mt-3 inline-block text-sm font-bold text-blue-700 hover:underline">
                                        絞り込みを解除
                                    </Link>
                                )}
                            </form>

                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-sm font-bold text-slate-500">
                                    表示中 <span className="text-slate-900">{filteredItems.length}</span> / {domain.items.length}項目
                                </p>
                            </div>

                            <div className="mt-4 grid gap-4">
                                {filteredItems.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={getFeeItemUrl(domain.domain, item.id)}
                                        className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
                                    >
                                        <div className="flex flex-wrap gap-2">
                                            <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-black text-blue-800">
                                                {insuranceLabels[item.insurance]}
                                            </span>
                                            <span className={`rounded-full border px-2.5 py-1 text-xs font-black ${categoryStyles[item.category as FeeCategory]}`}>
                                                {categoryLabels[item.category]}
                                            </span>
                                            {item.id === sampleId && (
                                                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-800">
                                                    全文公開サンプル
                                                </span>
                                            )}
                                        </div>
                                        <h2 className="mt-3 break-keep text-xl font-black leading-snug text-slate-950">{item.name}</h2>
                                        <p className="mt-2 text-sm leading-6 text-slate-600">
                                            {item.units[0]?.condition}: <span className="font-black text-blue-800">{item.units[0]?.value}</span>
                                            {item.units[0]?.note ? ` / ${item.units[0].note}` : ""}
                                        </p>
                                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                                            {item.requirements[0]}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
