import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ColumnCard } from "@/components/column/ColumnCard";
import { ColumnCta } from "@/components/column/ColumnCta";
import { ColumnRelatedFeeItems } from "@/components/column/ColumnRelatedFeeItems";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { FREE_MATERIAL_COUNT } from "@/constants/content-counts";
import { PLUS_PROMO_CURRENT_PRICE_YEN, formatYen } from "@/constants/plus-pricing";
import {
    columnCategoryLabels,
    columnCategoryStyles,
    getColumnArticle,
    getColumnArticles,
    getColumnUrl,
    resolveColumnRelatedFeeItems,
    type ColumnCategory,
    type ColumnCtaId,
} from "@/lib/column";

const SITE_URL = "https://jishutore-sozaiko.online";

/**
 * 読む文章の最大幅（44rem＝704px）。記事カード側は 54rem（本文領域800px）なので、
 * 図解と表は ColumnProse 側で `lg:-mx-12` して 800px まで広げられる。
 */
const COLUMN_TEXT_WIDTH = "max-w-[44rem]";

export async function generateStaticParams() {
    return getColumnArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const article = getColumnArticle(slug);
    if (!article) {
        return { title: "コラムが見つかりません｜自主トレ素材庫" };
    }

    const title = `${article.title}｜自主トレ素材庫`;
    const pageUrl = `${SITE_URL}${getColumnUrl(article.slug)}`;

    return {
        title,
        description: article.description,
        alternates: { canonical: pageUrl },
        openGraph: {
            title,
            description: article.description,
            url: pageUrl,
            siteName: "自主トレ素材庫",
            type: "article",
            publishedTime: article.publishedAt,
            modifiedTime: article.updatedAt,
        },
    };
}

/**
 * 免責文。カテゴリごとに出し分ける。
 * ★資料づくり（shiryo）は告示にもとづく記事ではないので、制度記事の免責をそのまま出すと
 * 事実と違う。あわせて「法定研修対応」と読ませない書き方にしている（CLAUDE.md の注意）。
 */
const DISCLAIMER: Record<ColumnCategory, string> = {
    "fee-practice":
        "この記事は、厚生労働省の告示・通知・疑義解釈をもとに、リハビリ専門職の自己点検用に整理したものです。個別ケースの算定可否を判断するものではありません。実際の請求にあたっては原本を確認し、判断に迷う場合は保険者・地方厚生局への確認を優先してください。また、掲載内容は医療行為の代替となるものではありません。",
    "kaitei-watch":
        "この記事は、厚生労働省の告示・通知・疑義解釈をもとに、掲載内容の点検結果を記録したものです。網羅性を保証するものではなく、個別ケースの算定可否を判断するものでもありません。実際の請求にあたっては原本を確認し、判断に迷う場合は保険者・地方厚生局への確認を優先してください。",
    shiryo:
        "この記事は、施設内の勉強会・研修づくりの進め方について、作業療法士としての経験をもとに整理したものです。法定研修の要件を満たすことを保証するものではありません。実施が必要な研修の種類・回数・内容は、指定基準や自治体の通知を確認してください。また、掲載内容は医療行為の代替となるものではありません。",
};

/** CTAの文言。記事側で書き分けず、種類ごとに1つに揃える（詰め込み防止）。 */
const CTA_COPY: Record<ColumnCtaId, { heading: string; body: string; buttonLabel: string }> = {
    plus: {
        heading: "記録に何を残すかまで、まとめて確認したい方へ",
        body: `自主トレ素材庫Plusでは、報酬チェックの全項目で「記録に残すこと」「自己点検で見るポイント」「つまずきやすい点」まで表示します。月額${formatYen(PLUS_PROMO_CURRENT_PRICE_YEN)}です。`,
        buttonLabel: "Plusの内容・料金を見る",
    },
    "free-items": {
        heading: "説明に使えるイラストを探している方へ",
        body: `自主トレのイラスト素材を${FREE_MATERIAL_COUNT}点、無料で配布しています。説明用のプリントづくりや、宿題として渡す自主トレ表にそのまま使えます。`,
        buttonLabel: "無料素材を見る",
    },
};

export default async function ColumnArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = getColumnArticle(slug);
    if (!article) notFound();

    const { Body } = article;
    const relatedFeeItems = resolveColumnRelatedFeeItems(article);
    const otherArticles = getColumnArticles()
        .filter((entry) => entry.slug !== article.slug)
        .slice(0, 2);
    const pageUrl = `${SITE_URL}${getColumnUrl(article.slug)}`;
    const cta = CTA_COPY[article.cta];

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "ホーム", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "コラム", item: `${SITE_URL}/column/` },
            { "@type": "ListItem", position: 3, name: article.title, item: pageUrl },
        ],
    };
    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.description,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        author: {
            "@type": "Person",
            name: "トロル",
            jobTitle: "作業療法士",
            url: `${SITE_URL}/about/`,
        },
        publisher: {
            "@type": "Organization",
            name: "自主トレ素材庫",
            url: `${SITE_URL}/`,
        },
        mainEntityOfPage: pageUrl,
    };

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Header />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbJsonLd, articleJsonLd]) }}
            />
            <main className="flex-1">
                {/* 記事カードは 54rem（本文領域800px）。タイトルと図解はこの幅いっぱいを使い、
                    読む文章だけ COLUMN_TEXT_WIDTH に絞る。日本語は1行45字を超えると読みにくいため。 */}
                <div className="container mx-auto px-4 py-8 sm:py-10">
                    <div className="mx-auto max-w-[54rem]">
                        <nav className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500">
                            <Link href="/column/" className="text-blue-700 hover:underline">
                                コラム
                            </Link>
                            <span>/</span>
                            <Link
                                href={`/column/?category=${article.category}`}
                                className="text-blue-700 hover:underline"
                            >
                                {columnCategoryLabels[article.category]}
                            </Link>
                        </nav>

                        <article className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
                            <header>
                                <span
                                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-black ${columnCategoryStyles[article.category]}`}
                                >
                                    {columnCategoryLabels[article.category]}
                                </span>
                                {/* 日本語の太字は文字の高さが行送りを上回るため、
                                    折り返しても行が重ならないよう leading-relaxed にする */}
                                <h1 className="jp-heading mt-4 text-2xl font-black leading-relaxed text-slate-950 sm:text-3xl">
                                    {article.title}
                                </h1>
                                <p className="mt-3 text-xs font-bold text-slate-500 sm:text-sm">
                                    公開 {article.publishedAt}
                                    {article.updatedAt !== article.publishedAt && ` / 更新 ${article.updatedAt}`}
                                    <span className="mx-2 text-slate-300">|</span>
                                    作業療法士・トロル
                                </p>
                            </header>

                            {article.hero && (
                                <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                                    <Image
                                        src={article.hero.src}
                                        alt={article.hero.alt}
                                        width={article.hero.width}
                                        height={article.hero.height}
                                        className="h-auto w-full"
                                        priority
                                    />
                                </div>
                            )}

                            <div className={`mx-auto ${COLUMN_TEXT_WIDTH}`}>
                                <section className="mt-7 rounded-xl border border-blue-200 bg-blue-50/70 p-5">
                                    <h2 className="jp-heading text-base font-black text-blue-950">この記事でわかること</h2>
                                    <ul className="mt-3 space-y-2">
                                        {article.takeaways.map((takeaway) => (
                                            <li
                                                key={takeaway}
                                                className="jp-text flex gap-2.5 text-sm font-bold leading-7 text-slate-800"
                                            >
                                                <span
                                                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs text-white"
                                                    aria-hidden="true"
                                                >
                                                    ✓
                                                </span>
                                                <span>{takeaway}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>

                                <Body />
                            </div>

                            <ColumnRelatedFeeItems slug={article.slug} entries={relatedFeeItems} />

                            <ColumnCta
                                variant={article.cta}
                                slug={article.slug}
                                heading={cta.heading}
                                body={cta.body}
                                buttonLabel={cta.buttonLabel}
                            />

                            <p className="jp-text mt-10 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs leading-6 text-slate-500 sm:p-5">
                                {DISCLAIMER[article.category]}
                            </p>
                        </article>

                        {otherArticles.length > 0 && (
                            <section className="mt-10">
                                <h2 className="jp-heading text-lg font-black text-slate-950">ほかのコラム</h2>
                                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                    {otherArticles.map((entry) => (
                                        <ColumnCard key={entry.slug} article={entry} />
                                    ))}
                                </div>
                                <Link
                                    href="/column/"
                                    className="mt-5 inline-block text-sm font-black text-blue-700 hover:underline"
                                >
                                    コラム一覧を見る →
                                </Link>
                            </section>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
