import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FilteredItemList } from "@/components/FilteredItemList";
import { LineBanner } from "@/components/LineBanner";
import { PostDownloadLineToast } from "@/components/PostDownloadLineToast";
import { getItems } from "@/lib/items";
import {
    seoItemCategories,
    type SeoItemCategoryConfig,
} from "@/lib/seoItemCategories";
import type { Item } from "@/types";

const BASE_URL = "https://jishutore-sozaiko.online";

function normalize(value: string): string {
    return value.normalize("NFKC").toLowerCase();
}

function getItemSearchText(
    item: Item,
    scope: SeoItemCategoryConfig["matchScope"],
): string {
    const fields = [item.title, item.titleJa, item.fileName];

    if (scope === "content" || scope === "all") {
        fields.push(item.description);
    }

    if (scope === "all") {
        fields.push(item.exercisePoint, item.targetCondition, item.difficulty);
    }

    return normalize(fields.filter(Boolean).join(" "));
}

export function getSeoCategoryItems(config: SeoItemCategoryConfig): Item[] {
    const keywords = config.keywords.map(normalize);
    return getItems().filter((item) => {
        const searchText = getItemSearchText(item, config.matchScope);
        return keywords.some((keyword) => searchText.includes(keyword));
    });
}

export function createSeoCategoryMetadata(
    config: SeoItemCategoryConfig,
): Metadata {
    const pageUrl = BASE_URL + "/items/" + config.slug + "/";

    return {
        title: config.metaTitle,
        description: config.metaDescription,
        alternates: {
            canonical: pageUrl,
        },
        openGraph: {
            title: config.metaTitle,
            description: config.metaDescription,
            url: pageUrl,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: config.metaTitle,
            description: config.metaDescription,
        },
    };
}

export function SeoItemCategoryPage({
    config,
}: {
    config: SeoItemCategoryConfig;
}) {
    const items = getSeoCategoryItems(config);
    const pageUrl = BASE_URL + "/items/" + config.slug + "/";
    const relatedCategories = seoItemCategories.filter(
        (category) => category.slug !== config.slug,
    );

    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: config.title + config.accentTitle,
            description: config.metaDescription,
            url: pageUrl,
            isPartOf: {
                "@type": "WebSite",
                name: "自主トレ素材庫",
                url: BASE_URL + "/",
            },
            mainEntity: {
                "@type": "ItemList",
                numberOfItems: items.length,
                itemListElement: items.map((item, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: item.titleJa || item.title,
                    url: BASE_URL + "/items/" + item.id + "/",
                })),
            },
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: config.faqs.map((faq) => ({
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
                    item: BASE_URL + "/",
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "無料素材",
                    item: BASE_URL + "/items/",
                },
                {
                    "@type": "ListItem",
                    position: 3,
                    name: config.breadcrumb,
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
                        <nav
                            aria-label="パンくずリスト"
                            className="mb-6 text-sm text-slate-500"
                        >
                            <Link
                                href="/"
                                className="transition-colors hover:text-blue-700"
                            >
                                ホーム
                            </Link>
                            <span className="mx-2" aria-hidden="true">
                                /
                            </span>
                            <Link
                                href="/items/"
                                className="transition-colors hover:text-blue-700"
                            >
                                無料素材
                            </Link>
                            <span className="mx-2" aria-hidden="true">
                                /
                            </span>
                            <span className="text-slate-700">
                                {config.breadcrumb}
                            </span>
                        </nav>

                        <p className="mb-3 text-sm font-bold text-blue-700">
                            {config.eyebrow}
                        </p>
                        <h1 className="max-w-5xl text-3xl font-black leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                            {config.title}
                            <span className="block text-blue-700">
                                {config.accentTitle}
                            </span>
                        </h1>
                        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                            {config.intro}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                            {[
                                "無料ダウンロード",
                                "商用利用OK",
                                "登録不要",
                                "文字あり・文字なし",
                            ].map((label) => (
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
                            {config.listTitle.replace("無料イラスト", "資料づくりに使えます")}
                        </h2>
                        <div className="mt-5 space-y-4 text-base leading-8 text-slate-700">
                            {config.body.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 grid gap-6 border-y border-slate-200 py-8 sm:grid-cols-3">
                        {config.useCases.map((useCase) => (
                            <div key={useCase.title} className="min-w-0">
                                <h3 className="font-bold leading-7 text-slate-900">
                                    {useCase.title}
                                </h3>
                                <p className="mt-2 text-sm leading-7 text-slate-600">
                                    {useCase.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-7 text-amber-950">
                        <p className="font-bold">使用前にご確認ください</p>
                        <p className="mt-1">{config.safetyNote}</p>
                    </div>

                    <div className="mt-14">
                        <div className="mb-8">
                            <p className="text-sm font-bold text-blue-700">
                                FREE MATERIALS
                            </p>
                            <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
                                {config.listTitle}
                            </h2>
                            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                                関連する{items.length}点を掲載しています。
                                {config.listDescription}
                            </p>
                        </div>

                        <FilteredItemList
                            items={items}
                            categoryFilter={{
                                key: config.slug,
                                label: config.searchLabel,
                            }}
                        />
                    </div>
                </section>

                <section className="border-y border-slate-200 bg-white">
                    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
                            {config.breadcrumb}のよくある質問
                        </h2>
                        <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
                            {config.faqs.map((faq) => (
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
                            <Link
                                href="/license/"
                                className="mx-1 font-bold text-blue-700 hover:underline"
                            >
                                利用規約・ガイドライン
                            </Link>
                            をご確認ください。
                        </p>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
                        関連する自主トレ素材
                    </h2>
                    <div className="mt-5 flex flex-wrap gap-3">
                        <Link
                            href="/items/swallowing-exercises/"
                            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:border-blue-400 hover:text-blue-700"
                        >
                            嚥下体操・口腔体操
                        </Link>
                        {relatedCategories.map((category) => (
                            <Link
                                key={category.slug}
                                href={"/items/" + category.slug + "/"}
                                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:border-blue-400 hover:text-blue-700"
                            >
                                {category.breadcrumb}
                            </Link>
                        ))}
                    </div>
                </section>

                <div className="mx-auto max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
                    <LineBanner />
                </div>
            </main>

            <Footer />
            <PostDownloadLineToast />
        </div>
    );
}
