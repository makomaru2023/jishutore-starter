import Link from "next/link";
import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FilteredItemList, type CategoryFilter, type ItemListPaginationInfo } from "@/components/FilteredItemList";
import { LineBanner } from "@/components/LineBanner";
import { PlusRealPreviewBand } from "@/components/PlusRealPreviewBand";
import { ProductCta } from "@/components/ProductCta";
import { RepeatVisitBanner } from "@/components/RepeatVisitBanner";
import { PLUS_SIGNUP_PAUSED } from "@/constants/plus-availability";
import { PostDownloadLineToast } from "@/components/PostDownloadLineToast";
import { SurveyModal } from "@/components/survey/SurveyModal";
import { seoItemCategories } from "@/lib/seoItemCategories";
import type { BuyoutAdFocus } from "@/components/BuyoutInlineAd";
import type { Item } from "@/types";

/**
 * 素材一覧（/items/ と /items/page/<N>/）の中身。
 * ================================================================
 * ★2026-09-05：/items/page.tsx の JSX をここへ出した。
 *   ページ分割のルート（/items/page/[page]/）と1ページ目で、
 *   見出し・カテゴリ導線・下部バナーの並びを1本の実装で保つため。
 *   絞り込み（?category= / ?q=）の判定は従来どおり /items/page.tsx が持つ。
 */

const ITEM_CATEGORY_LINKS = [
    ...seoItemCategories.map(({ slug, breadcrumb }) => ({ slug, breadcrumb })),
    { slug: "swallowing-exercises", breadcrumb: "口腔・嚥下" },
];

export interface ItemTypeTab {
    key: string;
    label: string;
    href: string;
    count: number;
}

export function ItemsIndexPage({
    items,
    title,
    description,
    typeTabs,
    activeItemType,
    categoryFilter,
    pagination,
    buyoutAd = null,
    breadcrumb,
}: {
    items: Item[];
    title: ReactNode;
    description: ReactNode;
    /** 「すべて／文字なし／文字あり」のタブ。出さないときは undefined */
    typeTabs?: readonly ItemTypeTab[];
    activeItemType?: string;
    categoryFilter?: CategoryFilter;
    pagination?: ItemListPaginationInfo;
    buyoutAd?: BuyoutAdFocus | null;
    /** 2ページ目以降のパンくず。1ページ目では出さない */
    breadcrumb?: ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-12 flex-1">
                {breadcrumb && (
                    <nav aria-label="パンくずリスト" className="mb-6 text-sm text-slate-500">
                        {breadcrumb}
                    </nav>
                )}

                <div className="mb-10 text-center">
                    <h1 className="jp-heading mb-4 text-[1.75rem] font-black text-slate-900 sm:text-4xl tracking-tight">
                        {title}
                    </h1>
                    <p className="jp-text mx-auto max-w-2xl text-base sm:text-lg text-slate-500 font-medium">
                        {description}
                    </p>
                    <div className="mt-5 flex flex-wrap justify-center gap-2">
                        {[
                            "無料ダウンロード",
                            "商用利用OK",
                            "登録不要",
                            "クレジット表記不要",
                        ].map((label) => (
                            <span
                                key={label}
                                className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700"
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                </div>

                {!PLUS_SIGNUP_PAUSED && (
                    <div className="mx-auto mb-8 max-w-5xl">
                        <PlusRealPreviewBand variant="band" location="items_top_cta" />
                    </div>
                )}

                {typeTabs && (
                    <nav
                        aria-label="素材タイプ"
                        className="mx-auto mb-8 max-w-3xl rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
                    >
                        <p className="jp-text mb-3 text-center text-sm leading-relaxed text-slate-600">
                            同じ運動のイラストに、文字なし版と
                            <span className="inline-block sm:whitespace-nowrap">文字あり版（運動名・説明つき）</span>
                            の<span className="inline-block sm:whitespace-nowrap">2タイプがあります。</span>
                        </p>
                        <div className="grid grid-cols-3 gap-1.5 rounded-xl bg-slate-100 p-1 sm:gap-2">
                            {typeTabs.map((tab) => {
                                const isActive = activeItemType === tab.key;

                                return (
                                    <Link
                                        key={tab.key}
                                        href={tab.href}
                                        aria-current={isActive ? "page" : undefined}
                                        className={`flex min-w-0 flex-col items-center justify-center rounded-lg px-1.5 py-2.5 text-center transition sm:px-4 ${
                                            isActive
                                                ? "bg-teal-700 text-white shadow-sm"
                                                : "text-slate-600 hover:bg-white hover:text-teal-700"
                                        }`}
                                    >
                                        <span className="whitespace-nowrap text-xs font-black sm:text-sm">
                                            {tab.label}
                                        </span>
                                        <span
                                            className={`mt-0.5 whitespace-nowrap text-[10px] font-bold sm:text-xs ${
                                                isActive ? "text-teal-50" : "text-slate-700"
                                            }`}
                                        >
                                            {tab.count}点
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>
                )}

                <nav
                    aria-label="素材カテゴリ"
                    className="mx-auto mb-8 max-w-5xl rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
                >
                    <div className="mb-3 flex items-center justify-between gap-3">
                        <h2 className="whitespace-nowrap text-sm font-black text-slate-900 sm:text-base">
                            部位・用途から探す
                        </h2>
                        <Link
                            href="/items/"
                            className="shrink-0 text-xs font-bold text-teal-700 transition-colors hover:text-teal-500"
                        >
                            すべて表示
                        </Link>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
                        {ITEM_CATEGORY_LINKS.map((itemCategory) => (
                            <Link
                                key={itemCategory.slug}
                                href={`/items/${itemCategory.slug}/`}
                                className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 sm:text-sm"
                            >
                                {itemCategory.breadcrumb}
                            </Link>
                        ))}
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:hidden">
                        横にスワイプすると、ほかのカテゴリも選べます。
                    </p>
                </nav>

                <FilteredItemList
                    items={items}
                    inlineAds
                    buyoutAd={buyoutAd}
                    categoryFilter={categoryFilter}
                    pagination={pagination}
                />

                {/* 下部：有料資料への導線（Plus受付停止中は出さない） */}
                {!PLUS_SIGNUP_PAUSED && (
                    <div className="mt-16 max-w-5xl mx-auto">
                        <ProductCta location="items_bottom_cta" variant="compact" />
                    </div>
                )}

                {/* 下部：ブックマーク・新着通知（リピーター化導線） */}
                <div className={PLUS_SIGNUP_PAUSED ? "mt-16 max-w-5xl mx-auto" : "mt-6 max-w-5xl mx-auto"}>
                    <RepeatVisitBanner placement="items_bottom" />
                </div>

                {/* 下部：LINE無料特典 */}
                <div className="mt-6 max-w-5xl mx-auto">
                    <LineBanner />
                </div>
            </main>
            <Footer />
            <PostDownloadLineToast />
            <SurveyModal />
        </div>
    );
}
