'use client';

import { Suspense, useState, useMemo, useEffect, ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Item } from '@/types';
import { ItemCard } from '@/components/ItemCard';
import { ProductInlineAd, ProductAdType } from '@/components/ProductInlineAd';
import { SponsorAdPlaceholder } from '@/components/SponsorAdPlaceholder';

export interface CategoryFilter {
    key: string;
    label: string;
    keywords: string[];
}

interface FilteredItemListProps {
    items: Item[];
    /** N枚目のカード直後に挿入する単発CTA（旧仕様・互換用） */
    middleCta?: ReactNode;
    /** middleCtaを何枚目の後に挿入するか（デフォルト12） */
    middleCtaAfter?: number;
    /** グリッド内に商品広告カードを一定間隔で挿入するか */
    inlineAds?: boolean;
    /** カテゴリーモード（?q=shoulder 等）。指定があると複数キーワードORでフィルタしつつ
     *  検索バーには英単語を流し込まず、カテゴリチップとクリアボタンを表示する */
    categoryFilter?: CategoryFilter;
}

// グリッド共通クラス
const GRID_CLASS = 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

// 広告挿入位置（1-indexed: 16枚目の後 → 40枚目の後 → 64枚目の後 → 88枚目の後 …）
const FIRST_AD_AFTER = 16;
const AD_INTERVAL = 24;
// 検索結果がこの枚数以下のときはインライン広告を出さない
const INLINE_AD_MIN_ITEMS = 12;
// 広告のあとに残るカードがこの枚数未満なら、その広告は省く（末尾広告の防止）
const TRAILING_GUARD = 4;

type InlineSlotType = ProductAdType | 'sponsor';
// 表示順：疾患別 → スポンサー → 姿勢別 → 疾患別 → スポンサー → 姿勢別 …
// 自社商品の方が優先度が高いので、間にスポンサーを挟む形にしている
const AD_TYPE_ORDER: InlineSlotType[] = ['condition', 'sponsor', 'posture'];

function FilteredItemListInner({ items, middleCta, middleCtaAfter = 12, inlineAds = false, categoryFilter }: FilteredItemListProps) {
    const searchParams = useSearchParams();

    // カテゴリーモードのときは、URLの q を検索バーに流し込まない
    // （?q=shoulder のような英単語が表示されると違和感が出るため）
    const [searchQuery, setSearchQuery] = useState(() => {
        if (categoryFilter) return '';
        return searchParams.get('q') || '';
    });

    useEffect(() => {
        if (categoryFilter) {
            setSearchQuery('');
            return;
        }
        const q = searchParams.get('q') || '';
        setSearchQuery(q);
    }, [searchParams, categoryFilter]);

    const filteredItems = useMemo(() => {
        let result = items;

        // 1) カテゴリーフィルタ（複数キーワードのいずれかにヒット）
        if (categoryFilter) {
            const lowerKeywords = categoryFilter.keywords.map(k => k.toLowerCase());
            result = result.filter(item => {
                const titleEn = item.title.toLowerCase();
                const titleJa = item.titleJa?.toLowerCase() || '';
                const fileName = item.fileName.toLowerCase();
                return lowerKeywords.some(kw =>
                    titleEn.includes(kw) || titleJa.includes(kw) || fileName.includes(kw)
                );
            });
        }

        // 2) 追加のテキスト検索（カテゴリーモードでもAND条件として効く）
        const trimmed = searchQuery.trim();
        if (trimmed) {
            const query = trimmed.toLowerCase();
            const keywords = query.split(/\s+/);
            result = result.filter(item => {
                const titleEn = item.title.toLowerCase();
                const titleJa = item.titleJa?.toLowerCase() || '';
                const fileName = item.fileName.toLowerCase();
                return keywords.every(keyword =>
                    titleEn.includes(keyword) || titleJa.includes(keyword) || fileName.includes(keyword)
                );
            });
        }

        return result;
    }, [items, categoryFilter, searchQuery]);

    const isManualSearching = !!searchQuery.trim();

    // 旧middleCtaモード: 検索中は出さない（カテゴリーフィルタのみのときは表示）
    const showMiddleCta = !!middleCta && !isManualSearching && filteredItems.length > middleCtaAfter;
    // 新inlineAdsモード: 手動検索中・件数少のときは出さない
    const showInlineAds = inlineAds && !isManualSearching && filteredItems.length >= INLINE_AD_MIN_ITEMS;

    // 一覧+広告を1つのフラットな配列に組み立てる
    const renderedGridChildren = useMemo<ReactNode[]>(() => {
        const out: ReactNode[] = [];
        let adCount = 0;
        filteredItems.forEach((item, i) => {
            out.push(<ItemCard key={item.id} item={item} />);
            if (!showInlineAds) return;
            const pos = i + 1; // 1-indexed
            const nextAdPos = FIRST_AD_AFTER + AD_INTERVAL * adCount;
            if (pos === nextAdPos) {
                const remaining = filteredItems.length - pos;
                if (remaining >= TRAILING_GUARD) {
                    const type = AD_TYPE_ORDER[adCount % AD_TYPE_ORDER.length];
                    if (type === 'sponsor') {
                        out.push(
                            <div key={`ad-${adCount}-sponsor`} className="col-span-full">
                                <SponsorAdPlaceholder variant="inline" />
                            </div>
                        );
                    } else {
                        out.push(<ProductInlineAd key={`ad-${adCount}-${type}`} type={type} />);
                    }
                }
                adCount += 1;
            }
        });
        return out;
    }, [filteredItems, showInlineAds]);

    return (
        <div>
            {/* カテゴリーチップ（カテゴリーモードのときのみ） */}
            {categoryFilter && (
                <div className="mb-5 flex justify-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-bold text-teal-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                        </svg>
                        {categoryFilter.label}で絞り込み中
                        <Link
                            href="/items"
                            className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-teal-600 transition-colors hover:bg-teal-600 hover:text-white"
                            aria-label="カテゴリフィルタを解除"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="h-3 w-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </Link>
                    </span>
                </div>
            )}

            <div className="mb-8 max-w-md mx-auto">
                <div className="relative shadow-sm rounded-full overflow-hidden border border-slate-200 focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500 transition-all">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-12 pr-4 py-3.5 border-none bg-white placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-0 sm:text-base font-medium"
                        placeholder={categoryFilter ? `${categoryFilter.label}内をさらに絞り込み（例: タオル, 立位）` : 'キーワードで検索（例: 肩, スクワット）'}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                {(searchQuery || categoryFilter) && (
                    <p className="mt-2 text-sm text-gray-500 text-center">
                        {filteredItems.length} 件見つかりました
                    </p>
                )}
            </div>

            {filteredItems.length > 0 ? (
                showMiddleCta ? (
                    <>
                        {/* 上半分（最初のN枚） */}
                        <div className={GRID_CLASS}>
                            {filteredItems.slice(0, middleCtaAfter).map((item) => (
                                <ItemCard key={item.id} item={item} />
                            ))}
                        </div>

                        {/* 中段CTA（旧middleCtaモード） */}
                        <div className="my-12 max-w-5xl mx-auto">
                            {middleCta}
                        </div>

                        {/* 下半分（残り） */}
                        <div className={GRID_CLASS}>
                            {filteredItems.slice(middleCtaAfter).map((item) => (
                                <ItemCard key={item.id} item={item} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className={GRID_CLASS}>
                        {renderedGridChildren}
                    </div>
                )
            ) : (
                <div className="text-center py-16 text-slate-500 bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <div className="text-4xl mb-4">🔍</div>
                    <p className="font-bold text-lg text-slate-700">見つかりませんでした</p>
                    <p className="mt-2 text-sm">別のキーワードでお試しください。</p>
                </div>
            )}
        </div>
    );
}

export function FilteredItemList(props: FilteredItemListProps) {
    return (
        <Suspense fallback={null}>
            <FilteredItemListInner {...props} />
        </Suspense>
    );
}
