import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FilteredItemList } from "@/components/FilteredItemList";
import { LineBanner } from "@/components/LineBanner";
import { ProductCta } from "@/components/ProductCta";
import { RepeatVisitBanner } from "@/components/RepeatVisitBanner";
import { PLUS_SIGNUP_PAUSED } from "@/constants/plus-availability";
import { PostDownloadLineToast } from "@/components/PostDownloadLineToast";
import { SurveyModal } from "@/components/survey/SurveyModal";
import { CategoryColumnLinks } from "@/components/CategoryColumnLinks";
import { resolveCategoryColumns } from "@/lib/category-columns";
import {
    buildItemPageUrl,
    getItemPageRange,
    getTotalItemPages,
    listExtraPageNumbers,
} from "@/lib/item-pagination";
import { getSwallowingItems } from "@/lib/seoCategoryMatching";

const BASE_PATH = "/items/swallowing-exercises/";
const PAGE_URL = "https://jishutore-sozaiko.online" + BASE_PATH;

/**
 * このページから読ませる公開コラム。
 * ★口腔体操の「順番」と、渡したあと続けてもらう工夫。素材を選んだ後に進む先。
 *   （下書き記事は書かない。存在しない slug は resolveCategoryColumns がビルドで落とす）
 */
const RELATED_COLUMNS = ["kokuku-taiso-junban", "jishutore-tsuzukanai-watashikata"];

/** 2ページ目以降のページ番号（generateStaticParams 用）。 */
export function listSwallowingExtraPages(): number[] {
    return listExtraPageNumbers(getSwallowingItems().length);
}

/**
 * ★2ページ目以降の canonical は自分自身のURL。1ページ目へまとめない。
 */
export function createSwallowingMetadata(page = 1): Metadata {
    const total = getSwallowingItems().length;
    const range = getItemPageRange(page, total);
    if (page === 1) {
        return { ...BASE_METADATA, alternates: { canonical: PAGE_URL } };
    }
    const title = `嚥下体操の自主トレイラスト ${page}ページ目【無料・商用OK】｜自主トレ素材庫`;
    return {
        title,
        description:
            `嚥下体操・口腔体操・舌の運動に使える無料イラスト一覧の${page}ページ目です` +
            `（全${total}点のうち${range.start}〜${range.end}点目）。` +
            "パタカラ体操、頬の膨らませ、舌の突出と左右運動、シャキア訓練などを掲載しています。",
        alternates: {
            canonical: "https://jishutore-sozaiko.online" + buildItemPageUrl(BASE_PATH, page),
        },
    };
}

const META_TITLE = "嚥下体操の自主トレイラスト【無料・商用OK】｜自主トレ素材庫";

const BASE_METADATA: Metadata = {
    title: META_TITLE,
    // ★2026-08-17：Bing の「description が短すぎる」警告を受けて75字→127字へ拡充。
    description:
        "嚥下体操・口腔体操・舌の運動に使える無料イラスト。パタカラ体操、頬の膨らませ、舌の突出と左右運動、シャキア訓練まで。深呼吸から始める食事前の準備体操を組むのにも使えます。STの嚥下リハ、オーラルフレイル予防、介護施設の体操資料に無料でお使いいただけます。",
    alternates: {
        canonical: PAGE_URL,
    },
    openGraph: {
        title: "嚥下体操の自主トレイラスト【無料・商用OK】",
        description:
            "嚥下体操・口腔体操・舌の運動に使えるイラストを、文字あり・文字なしで無料配布しています。",
        url: PAGE_URL,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "嚥下体操の自主トレイラスト【無料・商用OK】",
        description:
            "嚥下体操・口腔体操・舌の運動に使えるイラストを無料ダウンロードできます。",
    },
};

const faqs = [
    {
        question: "嚥下体操のイラストは無料で使えますか？",
        answer:
            "はい。自主トレ素材庫の利用ガイドラインの範囲で、患者さんへの説明資料や施設内の体操資料に無料で使えます。",
    },
    {
        question: "印刷して患者さんや利用者さんへ配布できますか？",
        answer:
            "配布できます。文字あり素材はそのまま使いやすく、文字なし素材は対象者に合わせて説明を追加できます。",
    },
    {
        question: "どのような嚥下体操の素材がありますか？",
        answer:
            "舌の前後・上下・左右運動、口唇の運動、パタカラ体操、シャキア訓練、嚥下おでこ体操などを掲載しています。",
    },
];

export function SwallowingExercisesPage({ page = 1 }: { page?: number }) {
    const items = getSwallowingItems();
    const totalPages = getTotalItemPages(items.length);
    const range = getItemPageRange(page, items.length);
    const pageUrl = "https://jishutore-sozaiko.online" + buildItemPageUrl(BASE_PATH, page);
    const relatedColumns = resolveCategoryColumns("swallowing-exercises", RELATED_COLUMNS);

    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "嚥下体操の自主トレイラスト",
            description:
                "嚥下体操・口腔体操・舌の運動に使える無料イラスト素材集です。",
            url: pageUrl,
            isPartOf: {
                "@type": "WebSite",
                name: "自主トレ素材庫",
                url: "https://jishutore-sozaiko.online/",
            },
            // ★構造化データも「このページに載っている素材」だけを並べる。
            mainEntity: {
                "@type": "ItemList",
                numberOfItems: items.length,
                itemListElement: items
                    .slice(Math.max(0, range.start - 1), range.end)
                    .map((item, index) => ({
                        "@type": "ListItem",
                        position: range.start + index,
                        name: item.titleJa || item.title,
                        url: "https://jishutore-sozaiko.online/items/" + item.id + "/",
                    })),
            },
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer,
                },
            })),
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "ホーム",
                    item: "https://jishutore-sozaiko.online/",
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "無料素材",
                    item: "https://jishutore-sozaiko.online/items/",
                },
                {
                    "@type": "ListItem",
                    position: 3,
                    name: "嚥下体操・口腔体操",
                    item: pageUrl,
                },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <main>
                <section className="border-b border-slate-200 bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
                        <nav aria-label="パンくずリスト" className="mb-6 text-sm text-slate-500">
                            <Link href="/" className="transition-colors hover:text-blue-600">
                                ホーム
                            </Link>
                            <span className="mx-2" aria-hidden="true">/</span>
                            <Link href="/items/" className="transition-colors hover:text-blue-600">
                                無料素材
                            </Link>
                            <span className="mx-2" aria-hidden="true">/</span>
                            {page > 1 ? (
                                <>
                                    <Link href={BASE_PATH} className="transition-colors hover:text-blue-600">
                                        嚥下体操
                                    </Link>
                                    <span className="mx-2" aria-hidden="true">/</span>
                                    <span className="text-slate-700">{page}ページ目</span>
                                </>
                            ) : (
                                <span className="text-slate-700">嚥下体操</span>
                            )}
                        </nav>

                        <p className="mb-3 text-sm font-bold text-blue-700">
                            ST・リハビリ職・介護職向け
                        </p>
                        <h1 className="max-w-4xl text-3xl font-black leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                            嚥下体操・口腔体操の
                            <span className="block text-blue-700">自主トレイラスト</span>
                        </h1>
                        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                            嚥下リハや口腔フレイル予防で使いやすい、舌・頬・口唇の運動イラストをまとめました。
                            患者さんへの説明、配布資料、介護施設での体操資料に無料で使えます。
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                            {["無料ダウンロード", "商用利用OK", "登録不要", "文字あり・文字なし"].map((label) => (
                                <span
                                    key={label}
                                    className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700"
                                >
                                    {label}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
                    <div className="max-w-4xl">
                        <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
                            嚥下体操の自主トレ資料づくりに使えます
                        </h2>
                        <div className="mt-5 space-y-4 text-base leading-8 text-slate-700">
                            <p>
                                嚥下体操は、飲み込みに関わる舌・頬・口唇などを動かす練習です。
                                動きを言葉だけで説明しにくい場面でも、イラストがあると姿勢や動かし方を共有しやすくなります。
                            </p>
                            <p>
                                このページでは、パタカラ体操、舌の運動、口唇の運動、シャキア訓練、
                                嚥下おでこ体操などの関連素材を一覧で探せます。
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-7 text-amber-950">
                        <p className="font-bold">使用前にご確認ください</p>
                        <p className="mt-1">
                            嚥下機能や全身状態には個人差があります。実際の指導では、医師・歯科医師・言語聴覚士など、
                            担当する専門職の評価と方針を優先してください。
                        </p>
                    </div>

                    <div className="mt-14">
                        <div className="mb-8">
                            <p className="text-sm font-bold text-blue-700">FREE MATERIALS</p>
                            <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
                                嚥下体操・口腔体操の無料イラスト
                            </h2>
                            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                                関連する{items.length}点を掲載しています。
                                {totalPages > 1 && `${range.start}〜${range.end}点目を表示しています（${page} / ${totalPages}ページ）。`}
                                素材名や「舌」「口唇」などのキーワードで、さらに絞り込めます。
                            </p>
                        </div>

                        <FilteredItemList
                            items={items}
                            categoryFilter={{ key: "swallowing-exercises", label: "嚥下体操・口腔体操" }}
                            pagination={{ basePath: BASE_PATH, currentPage: page, totalPages }}
                        />

                        {/* 素材を選んだあとに読む導線。一覧より上には置かない。 */}
                        <CategoryColumnLinks
                            categorySlug="swallowing-exercises"
                            categoryLabel="嚥下体操・口腔体操"
                            columns={relatedColumns}
                        />
                    </div>
                </section>

                <section className="border-y border-slate-200 bg-white">
                    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
                            嚥下体操イラストのよくある質問
                        </h2>
                        <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
                            {faqs.map((faq) => (
                                <div key={faq.question} className="py-6">
                                    <h3 className="font-bold leading-7 text-slate-900">
                                        {faq.question}
                                    </h3>
                                    <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
                                        {faq.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-8 text-sm leading-7 text-slate-600">
                            利用範囲の詳細は
                            <Link href="/license/" className="mx-1 font-bold text-blue-700 hover:underline">
                                利用規約・ガイドライン
                            </Link>
                            をご確認ください。
                        </p>
                    </div>
                </section>

                <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                    {!PLUS_SIGNUP_PAUSED && (
                        <div className="mb-6">
                            <ProductCta location="items_bottom_cta" variant="compact" />
                        </div>
                    )}
                    <div className="mb-6">
                        <RepeatVisitBanner placement="category_bottom" />
                    </div>
                    <LineBanner />
                </div>
            </main>

            <Footer />
            <PostDownloadLineToast />
            <SurveyModal />
        </div>
    );
}
