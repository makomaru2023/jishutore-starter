import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    FeeCheckSearchTracker,
    FeeCheckTrackedLink,
    FeeCheckViewTracker,
} from "@/components/fee-check/FeeCheckAnalytics";
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
    hasComboCheck,
    insuranceLabels,
    normalizeFeeText,
    isSampleFeeItem,
    formatAppliedYears,
    formatLastVerified,
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

    const title = `${domain.domainLabel}の算定要件・単位数一覧｜自主トレ素材庫`;
    // ★2026-08-17：Bing の「description が短すぎる」警告を受けて73字→124〜138字へ拡充。
    //   分野ラベルが最長（訪問看護からのリハビリ…）でも138字で、160字の上限に収まる。
    const description = `${domain.domainLabel}の加算・減算・基本報酬を一覧で確認できます。単位数と算定要件、告示・通知など根拠資料へのリンクは無料公開。8分野148項目を毎月の改定確認で更新しています。記録に残すことと自己点検のポイントは自主トレ素材庫Plusでご覧いただけます。`;
    const pageUrl = `https://jishutore-sozaiko.online${getDomainUrl(domain.domain)}`;

    return {
        title,
        description,
        alternates: {
            canonical: pageUrl,
        },
        openGraph: {
            title,
            description,
            url: pageUrl,
            siteName: "自主トレ素材庫",
            type: "website",
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
    const pageUrl = `https://jishutore-sozaiko.online${getDomainUrl(domain.domain)}`;

    // 対象年度と、この分野で最も新しい最終確認日。
    // 未確認（null）の項目は無視する。1件も確認日がなければ「未確認」と出す。
    const appliedYearLabel = formatAppliedYears(domain.appliedYear);
    const latestVerified = domain.items
        .map((item) => item.lastVerified)
        .filter((value): value is string => Boolean(value))
        .sort()
        .at(-1);
    const domainLastVerified = formatLastVerified(latestVerified ?? null);

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "報酬チェック", item: "https://jishutore-sozaiko.online/fee-check/" },
            { "@type": "ListItem", position: 2, name: domain.domainLabel, item: pageUrl },
        ],
    };

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Header />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
            <FeeCheckViewTracker
                type="domain"
                params={{ fee_domain: domain.domain, item_count: domain.items.length }}
            />
            {(q || category !== ALL) && (
                <FeeCheckSearchTracker
                    params={{
                        search_term: q,
                        fee_domain: domain.domain,
                        insurance: ALL,
                        fee_category: category,
                        result_count: filteredItems.length,
                        search_location: "domain",
                    }}
                />
            )}
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
                                    {/* 対象年度と、この分野の最終確認日。
                                        制度改定のあとに古い情報が残っていないかを、
                                        本文を読む前に見分けられるようにする。 */}
                                    <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs font-bold leading-6 text-slate-600">
                                        {appliedYearLabel && (
                                            <div className="flex gap-1.5">
                                                <dt className="text-slate-500">対象年度</dt>
                                                <dd className="text-slate-800">{appliedYearLabel}</dd>
                                            </div>
                                        )}
                                        <div className="flex gap-1.5">
                                            <dt className="text-slate-500">分野内の最終確認</dt>
                                            <dd className="text-slate-800">{domainLastVerified}</dd>
                                        </div>
                                    </dl>
                                    <p className="mt-3 text-xs font-bold leading-6 text-slate-500">
                                        作業療法士が運営・一次資料を基準に作成しています。掲載内容は各項目の最終確認日時点のものです。
                                        <Link href="/fee-check/editorial-policy/" className="ml-2 text-blue-700 hover:underline">
                                            編集方針・確認方法
                                        </Link>
                                    </p>
                                </div>
                                <dl className="grid grid-cols-2 gap-2">
                                    <div className="rounded-lg bg-blue-50 p-3 text-center">
                                        <dt className="text-xs font-black text-blue-700">項目数</dt>
                                        <dd className="mt-1 text-2xl font-black text-blue-950">{domain.items.length}</dd>
                                    </div>
                                    <div className="rounded-lg bg-slate-100 p-3 text-center">
                                        <dt className="text-xs font-black text-slate-600">一次資料確認済</dt>
                                        <dd className="mt-1 text-2xl font-black text-slate-950">
                                            {domain.items.filter((item) => item.verificationLevel === "genpon").length}/{domain.items.length}
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

                            <div className="mt-4 grid gap-3 lg:grid-cols-2">
                                {filteredItems.map((item) => (
                                    <FeeCheckTrackedLink
                                        key={item.id}
                                        href={getFeeItemUrl(domain.domain, item.id)}
                                        event="result"
                                        params={{
                                            fee_domain: domain.domain,
                                            fee_item_id: item.id,
                                            fee_category: item.category,
                                            search_location: q || category !== ALL ? "domain_search" : "domain_list",
                                        }}
                                        className="flex flex-col rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition hover:border-blue-300 hover:shadow-md sm:p-4"
                                    >
                                        <div className="flex flex-wrap gap-2">
                                            {item.currentlyNotClaimable && (
                                                <span className="rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-black text-amber-800">
                                                    現在算定不可
                                                </span>
                                            )}
                                            <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-black text-blue-800">
                                                {insuranceLabels[item.insurance]}
                                            </span>
                                            <span className={`rounded-full border px-2.5 py-1 text-xs font-black ${categoryStyles[item.category as FeeCategory]}`}>
                                                {categoryLabels[item.category]}
                                            </span>
                                            {isSampleFeeItem(domain.domain, item.id) && (
                                                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-800">
                                                    全文公開サンプル
                                                </span>
                                            )}
                                        </div>
                                        <h2 className="mt-2 break-keep text-base font-black leading-snug text-slate-950 sm:mt-3 sm:text-lg">{item.name}</h2>
                                        <p className="mt-2 rounded-md bg-blue-50 px-3 py-2 text-sm leading-6 text-slate-700 sm:mt-3">
                                            <span className="font-bold">{item.units[0]?.condition}</span>
                                            <span className="mx-2 text-slate-300">|</span>
                                            <span className="text-base font-black text-blue-800">{item.units[0]?.value}</span>
                                        </p>
                                        <p className="mt-2 hidden text-sm leading-6 text-slate-600 sm:line-clamp-2">
                                            {item.requirements[0]}
                                        </p>
                                        <p className="mt-auto pt-2 text-right text-xs font-black text-blue-700 sm:pt-3 sm:text-sm">詳細を見る →</p>
                                    </FeeCheckTrackedLink>
                                ))}
                            </div>
                        </div>

                        {hasComboCheck(domain.domain) && (
                            <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50/60 p-5 sm:p-6">
                                <p className="text-xs font-bold tracking-widest text-blue-700">PLUS限定ツール</p>
                                <h2 className="mt-2 text-lg font-black text-slate-950 sm:text-xl">
                                    この加算、一緒に算定できる？をまとめてチェック
                                </h2>
                                <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                                    自施設で算定している（予定の）加算にチェックを入れると、併算定不可・条件付き・区分選択制・前提加算の規定を、根拠リンクつきで表示します。返戻の原因になりやすい組み合わせの自己点検に。
                                </p>
                                {/* 非会員が大半の無料ページなので、会員ハブ（＝非会員はログイン画面へ飛ぶ）
                                    ではなく説明ページへ送る。会員は middleware がハブへ転送する。 */}
                                <Link
                                    href="/plus/fee-check-combo/"
                                    className="mt-4 inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
                                >
                                    加算の組み合わせチェックを使う（Plus）
                                </Link>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
