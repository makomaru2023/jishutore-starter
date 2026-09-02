import type { Metadata } from "next";
import type { JobFacilityType } from "@/types/job";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FeeCheckViewTracker } from "@/components/fee-check/FeeCheckAnalytics";
import { FeeCheckDetailCard } from "@/components/fee-check/FeeCheckDetailCard";
import { FeeCheckDomainCta } from "@/components/fee-check/FeeCheckDomainCta";
import { SurveyCard } from "@/components/survey/SurveyCard";
import { FeeCheckMemberHubBanner } from "@/components/fee-check/FeeCheckMemberHubBanner";
import { SponsoredJobCard } from "@/components/jobs/SponsoredJobCard";
import { pickSponsoredJob } from "@/lib/jobs";

/**
 * 報酬チェックの分野 → 求人の施設種別。求人カードを分野の文脈に合わせるために使う。
 * ★ここに無い分野（急性期・地域包括ケア病棟など）は絞り込まない。
 *   地域包括ケア病棟は一般病院の一病棟で、JobFacilityType のどれとも1対1にならないため。
 */
const FEE_CHECK_DOMAIN_TO_FACILITY: Record<string, JobFacilityType | undefined> = {
    "roken-nyusho": "roken",
    "kaifukuki-riha": "kaifukuki-hospital",
    "tsusho-riha": "day-care",
    "tsusho-kaigo": "day-service",
    "homon-riha": "home-rehab",
    "homon-kango-riha": "home-nursing",
};
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getColumnsByFeeItem, getColumnUrl, getLatestKaiteiWatch } from "@/lib/column";
import {
    getFeeDescription,
    getFeeItemTitle,
    getDomainUrl,
    getFeeItem,
    getFeeItemUrl,
    getAllFeeItems,
    isSampleFeeItem,
    feeDomains,
} from "@/lib/fee-check";
import { hasActivePlusAccess } from "@/lib/plus-access";

export async function generateStaticParams() {
    return getAllFeeItems().map(({ domain, item }) => ({
        domain: domain.domain,
        id: item.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ domain: string; id: string }> }): Promise<Metadata> {
    const { domain: domainId, id } = await params;
    const result = getFeeItem(domainId, id);
    if (!result) {
        return { title: "報酬チェック項目が見つかりません｜自主トレ素材庫" };
    }

    const { domain, item } = result;
    // ★2026-08-22：検索結果で切られない長さへ短縮した（生成規則と経緯は getFeeItemTitle 側）。
    const title = getFeeItemTitle(item, domain);
    const description = getFeeDescription(item, domain);

    return {
        title,
        description,
        alternates: {
            canonical: `https://jishutore-sozaiko.online${getFeeItemUrl(domain.domain, item.id)}`,
        },
        openGraph: {
            title,
            description,
            url: `https://jishutore-sozaiko.online${getFeeItemUrl(domain.domain, item.id)}`,
            siteName: "自主トレ素材庫",
            type: "article",
        },
    };
}

export default async function FeeCheckDetailPage({ params }: { params: Promise<{ domain: string; id: string }> }) {
    const { domain: domainId, id } = await params;
    const result = getFeeItem(domainId, id);
    if (!result) notFound();

    const { domain, item } = result;
    const isSample = isSampleFeeItem(domain.domain, item.id);
    const isMember = await hasActivePlusAccess();
    const isUnlocked = isMember || isSample;
    const visibleItem = isUnlocked
        ? item
        : {
            ...item,
            records: item.records.slice(0, 1),
            auditPoints: item.auditPoints.slice(0, 1),
            pitfalls: item.pitfalls?.slice(0, 1),
            relatedQA: undefined,
            changedInLastRevision: false,
            changeSummary: undefined,
        };
    const hiddenCounts = isUnlocked
        ? { records: 0, auditPoints: 0, pitfalls: 0 }
        : {
            records: Math.max(item.records.length - visibleItem.records.length, 0),
            auditPoints: Math.max(item.auditPoints.length - visibleItem.auditPoints.length, 0),
            pitfalls: Math.max((item.pitfalls?.length ?? 0) - (visibleItem.pitfalls?.length ?? 0), 0),
        };
    const relatedItems = domain.items
        .filter((entry) => entry.id !== item.id && entry.category === item.category)
        .slice(0, 4);

    // ページ下部に出す求人広告。分野から施設種別を推定して文脈連動させる。
    // 該当が無い分野（急性期・地域包括ケア病棟など）は絞り込まず、掲載中の求人をそのまま出す。
    const sponsoredJob = pickSponsoredJob(
        FEE_CHECK_DOMAIN_TO_FACILITY[domain.domain]
            ? { facilityTypes: [FEE_CHECK_DOMAIN_TO_FACILITY[domain.domain]!] }
            : undefined,
    );
    const latestKaiteiWatch = getLatestKaiteiWatch();
    const kaiteiWatch = latestKaiteiWatch
        ? {
            title: latestKaiteiWatch.title,
            href: getColumnUrl(latestKaiteiWatch.slug),
            updatedAt: latestKaiteiWatch.updatedAt,
        }
        : undefined;
    // この項目を図解しているコラム記事。算定要件の直後に出す（企画書_コラムの部分公開とPlus導線 §3-9）。
    // 記事側の relatedFeeItems を逆から引いているだけなので、項目データには何も足していない。
    const relatedColumns = getColumnsByFeeItem(domain.domain, item.id)
        .slice(0, 2)
        .map((article) => ({ title: article.title, href: getColumnUrl(article.slug) }));
    const pageUrl = `https://jishutore-sozaiko.online${getFeeItemUrl(domain.domain, item.id)}`;
    const domainUrl = `https://jishutore-sozaiko.online${getDomainUrl(domain.domain)}`;
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "報酬チェック", item: "https://jishutore-sozaiko.online/fee-check/" },
            { "@type": "ListItem", position: 2, name: domain.domainLabel, item: domainUrl },
            { "@type": "ListItem", position: 3, name: item.name, item: pageUrl },
        ],
    };
    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: `${item.name}の算定要件・単位数（${domain.domainLabel}）`,
        description: getFeeDescription(item, domain),
        // 未確認の項目には dateModified を出さない（構造化データに嘘の更新日を入れない）
        ...(item.lastVerified ? { dateModified: item.lastVerified } : {}),
        author: {
            "@type": "Person",
            name: "トロル",
            jobTitle: "作業療法士",
            url: "https://jishutore-sozaiko.online/about/",
        },
        publisher: {
            "@type": "Organization",
            name: "自主トレ素材庫",
            url: "https://jishutore-sozaiko.online/",
        },
        mainEntityOfPage: pageUrl,
    };

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Header />
            {isMember && (
                <FeeCheckMemberHubBanner
                    domainCount={feeDomains.length}
                    placement="fee_check_detail_member_banner"
                />
            )}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbJsonLd, articleJsonLd]) }} />
            <FeeCheckViewTracker
                type="item"
                params={{
                    fee_domain: domain.domain,
                    fee_item_id: item.id,
                    fee_category: item.category,
                    is_unlocked: isUnlocked,
                    is_sample: isSample,
                }}
            />
            <main className="flex-1">
                <div className="container mx-auto px-4 py-8">
                    <div className="mx-auto max-w-5xl">
                        <nav className="mb-4 flex flex-wrap gap-2 text-sm font-bold text-slate-500">
                            <Link href="/fee-check/" className="text-blue-700 hover:underline">
                                報酬チェック
                            </Link>
                            <span>/</span>
                            <Link href={`/fee-check/${domain.domain}/`} className="text-blue-700 hover:underline">
                                {domain.domainLabel}
                            </Link>
                        </nav>

                        <FeeCheckDetailCard
                            domain={domain}
                            item={visibleItem}
                            isUnlocked={isUnlocked}
                            isSample={isSample}
                            hiddenCounts={hiddenCounts}
                            kaiteiWatch={kaiteiWatch}
                            relatedColumns={relatedColumns}
                        />

                        {/* 必要な情報を読み終えた後にだけ出す、利用者アンケートの導線。
                            ★本文途中には置かない（算定要件の確認という目的を邪魔しないため）。
                              根拠資料と確認日まで読み終えた＝詳細カードの直後がその位置。
                            ★2026-08-30：もとはページ最下部（実測87%地点・1280px幅で2,785px下）で、
                              「同じカテゴリの項目」と分野CTAの先にあり、まず見られていなかった。
                              詳細カードの直後に上げる。集中期間が終わったら元の位置に戻してよい。 */}
                        <SurveyCard placement="fee_check" className="mt-6" emphasis />

                        {relatedItems.length > 0 && (
                            <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
                                <h2 className="text-lg font-black text-slate-950">同じカテゴリの項目</h2>
                                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                                    {relatedItems.map((related) => (
                                        <Link
                                            key={related.id}
                                            href={getFeeItemUrl(domain.domain, related.id)}
                                            className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold leading-6 text-slate-700 hover:border-blue-300 hover:text-blue-700"
                                        >
                                            {related.name}
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 1問1答で離脱している層に「この分野には他にもある」と伝える導線。
                            詳細を読み終えた直後に置くのが狙い（2026-08-10の分析）。 */}
                        <FeeCheckDomainCta
                            domain={domain.domain}
                            domainLabel={domain.domainLabel}
                            href={getDomainUrl(domain.domain)}
                            itemCount={domain.items.length}
                        />

                        {/* 求人広告枠（/jobs/posting/ で販売している「サイト内での求人カード表示」の実体）。
                            ★分野から施設種別を推定して求人を選ぶ＝報酬チェックの文脈に連動させる。
                              例）老健の加算を調べている人には老健の求人。
                            ★掲載中の求人が無ければ null で何も描画しない。
                              絞り込みで該当0件でも pickSponsoredJob が先頭にフォールバックする。
                            ★位置：算定要件の確認を邪魔しないよう、分野CTAの後（最下部）に置く。 */}
                        {sponsoredJob && (
                            <SponsoredJobCard
                                job={sponsoredJob}
                                placement="fee_check"
                                className="mt-6"
                            />
                        )}

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
