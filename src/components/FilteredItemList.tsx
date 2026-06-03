'use client';

import { Suspense, useState, useMemo, useEffect, ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { Item } from '@/types';
import { ItemCard } from '@/components/ItemCard';
import { ProductInlineAd, ProductAdType } from '@/components/ProductInlineAd';

interface FilteredItemListProps {
    items: Item[];
    /** N枚目のカード直後に挿入する単発CTA（旧仕様・互換用） */
    middleCta?: ReactNode;
    /** middleCtaを何枚目の後に挿入するか（デフォルト12） */
    middleCtaAfter?: number;
    /** グリッド内に商品広告カードを一定間隔で挿入するか */
    inlineAds?: boolean;
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

const AD_TYPE_ORDER: ProductAdType[] = ['condition', 'posture'];

function FilteredItemListInner({ items, middleCta, middleCtaAfter = 12, inlineAds = false }: FilteredItemListProps) {
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(() => searchParams.get('q') || '');

    useEffect(() => {
        const q = searchParams.get('q') || '';
        setSearchQuery(q);
    }, [searchParams]);

    const filteredItems = useMemo(() => {
        if (!searchQuery.trim()) return items;

        const query = searchQuery.toLowerCase().trim();
        const keywords = query.split(/\s+/);

        return items.filter((item) => {
            const titleEn = item.title.toLowerCase();
            const titleJa = item.titleJa?.toLowerCase() || '';
            const fileName = item.fileName.toLowerCase();

            return keywords.every(keyword =>
                titleEn.includes(keyword) ||
                titleJa.includes(keyword) ||
                fileName.includes(keyword)
            );
        });
    }, [items, searchQuery]);

    const isSearching = !!searchQuery.trim();

    // 旧middleCtaモード: 検索中は出さない
    const showMiddleCta = !!middleCta && !isSearching && filteredItems.length > middleCtaAfter;
    // 新inlineAdsモード: 検索中・件数少のときは出さない
    const showInlineAds = inlineAds && !isSearching && filteredItems.length >= INLINE_AD_MIN_ITEMS;

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
                    out.push(<ProductInlineAd key={`ad-${adCount}-${type}`} type={type} />);
                }
                adCount += 1;
            }
        });
        return out;
    }, [filteredItems, showInlineAds]);

    return (
        <div>
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
                        placeholder="キーワードで検索（例: 肩, スクワット）"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                {searchQuery && (
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
