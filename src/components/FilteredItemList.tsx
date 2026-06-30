'use client';

import { Suspense, useState, useMemo, ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Item } from '@/types';
import { ItemCard } from '@/components/ItemCard';
import { ProductInlineAd, ProductAdType } from '@/components/ProductInlineAd';
import { SponsorAdPlaceholder } from '@/components/SponsorAdPlaceholder';

export interface CategoryFilter {
    key: string;
    label: string;
}

interface FilteredItemListProps {
    items: Item[];
    /** N枚目のカード直後に挿入する単発CTA（旧仕様・互換用） */
    middleCta?: ReactNode;
    /** middleCtaを何枚目の後に挿入するか（デフォルト12） */
    middleCtaAfter?: number;
    /** グリッド内に商品広告カードを一定間隔で挿入するか */
    inlineAds?: boolean;
    /** カテゴリーモード。サーバー側で既に items をフィルタ済みである前提で、
     *  ここではチップ表示と検索バーの URL q 流し込み抑止だけに使う。 */
    categoryFilter?: CategoryFilter;
}

type SearchSuggestion = {
    label: string;
    query: string;
};

type SearchSuggestionGroup = {
    label: string;
    suggestions: SearchSuggestion[];
};

const SEARCH_SUGGESTION_GROUPS: SearchSuggestionGroup[] = [
    {
        label: '疾患名',
        suggestions: [
            { label: '脳卒中', query: '脳卒中' },
            { label: '腰痛', query: '腰痛' },
            { label: '膝OA・TKA', query: '膝OA' },
            { label: '五十肩', query: '五十肩' },
            { label: 'パーキンソン病', query: 'パーキンソン病' },
            { label: '大腿骨骨折', query: '大腿骨骨折' },
            { label: '圧迫骨折', query: '圧迫骨折' },
        ],
    },
    {
        label: '部位',
        suggestions: [
            { label: '上肢', query: '上肢' },
            { label: '肩', query: '肩' },
            { label: '手指', query: '手指' },
            { label: '体幹', query: '体幹' },
            { label: '股関節', query: '股関節' },
            { label: '膝', query: '膝' },
            { label: '足首', query: '足首' },
            { label: '口腔・嚥下', query: '口腔 嚥下' },
        ],
    },
    {
        label: '姿勢',
        suggestions: [
            { label: '座位', query: '座位' },
            { label: '立位', query: '立位' },
            { label: '仰向け', query: '仰向け' },
            { label: '横向き', query: '横向き' },
            { label: '四つん這い', query: '四つん這い' },
        ],
    },
];

const SEARCH_ALIASES: Record<string, string[]> = {
    '脳梗塞': ['脳卒中', '片麻痺'],
    '脳出血': ['脳卒中', '片麻痺'],
    '膝oa': ['変形性膝関節症', '膝関節症', '人工膝関節', 'tka', '膝'],
    'tka': ['人工膝関節', '変形性膝関節症', '膝'],
    '五十肩': ['肩関節周囲炎', '肩'],
    'パーキンソン病': ['パーキンソン'],
    '圧迫骨折': ['圧迫骨折', '脊椎', '腰椎'],
    '仰臥位': ['仰臥位', '仰向け', 'supine'],
    '臥位': ['臥位', '仰向け', '横向き', '側臥位', 'supine', 'side lying'],
    '横向き': ['横向き', '側臥位', 'side lying', 'side-lying'],
    '四つ這い': ['四つ這い', '四つん這い'],
};

function normalizeSearchText(value: string): string {
    return value.normalize('NFKC').toLowerCase();
}

function getSearchHaystack(item: Item): string {
    return normalizeSearchText([
        item.title,
        item.titleJa,
        item.fileName,
        item.description,
        item.exercisePoint,
        item.targetCondition,
        item.difficulty,
    ].filter(Boolean).join(' '));
}

function matchesSearch(item: Item, query: string): boolean {
    const haystack = getSearchHaystack(item);
    const keywords = normalizeSearchText(query).trim().split(/\s+/).filter(Boolean);

    return keywords.every((keyword) => {
        const candidates = [keyword, ...(SEARCH_ALIASES[keyword] ?? [])]
            .map(normalizeSearchText);
        return candidates.some((candidate) => haystack.includes(candidate));
    });
}

function SearchSuggestions({
    activeQuery,
    onSelect,
}: {
    activeQuery?: string;
    onSelect?: (query: string) => void;
}) {
    return (
        <div className="mt-4 space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            {SEARCH_SUGGESTION_GROUPS.map((group) => (
                <div key={group.label} className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start">
                    <span className="w-14 flex-none pt-1 text-xs font-bold text-slate-500">
                        {group.label}
                    </span>
                    <div className="flex min-w-0 flex-wrap gap-2">
                        {group.suggestions.map((suggestion) => {
                            const isActive = activeQuery === suggestion.query;
                            const className = `inline-flex min-h-8 items-center justify-center rounded-full border px-3 py-1 text-xs font-bold transition-colors ${
                                isActive
                                    ? 'border-teal-500 bg-teal-50 text-teal-700'
                                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700'
                            }`;

                            return onSelect ? (
                                <button
                                    key={suggestion.label}
                                    type="button"
                                    onClick={() => onSelect(suggestion.query)}
                                    aria-pressed={isActive}
                                    className={className}
                                >
                                    {suggestion.label}
                                </button>
                            ) : (
                                <Link
                                    key={suggestion.label}
                                    href={`/items?q=${encodeURIComponent(suggestion.query)}`}
                                    className={className}
                                >
                                    {suggestion.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
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
const AD_TYPE_ORDER: InlineSlotType[] = ['condition', 'sponsor', 'posture'];

/** items の配列から、widget広告を一定間隔で挟んだ ReactNode[] を作る純関数。 */
function buildGridChildren(items: Item[], inlineAds: boolean, keyPrefix = ''): ReactNode[] {
    const out: ReactNode[] = [];
    let adCount = 0;
    items.forEach((item, i) => {
        out.push(<ItemCard key={item.id} item={item} />);
        if (!inlineAds || items.length < INLINE_AD_MIN_ITEMS) return;
        const pos = i + 1; // 1-indexed
        const nextAdPos = FIRST_AD_AFTER + AD_INTERVAL * adCount;
        if (pos === nextAdPos) {
            const remaining = items.length - pos;
            if (remaining >= TRAILING_GUARD) {
                const type = AD_TYPE_ORDER[adCount % AD_TYPE_ORDER.length];
                if (type === 'sponsor') {
                    out.push(
                        <div key={`${keyPrefix}ad-${adCount}-sponsor`} className="col-span-full">
                            <SponsorAdPlaceholder variant="inline" />
                        </div>
                    );
                } else {
                    out.push(<ProductInlineAd key={`${keyPrefix}ad-${adCount}-${type}`} type={type} />);
                }
            }
            adCount += 1;
        }
    });
    return out;
}

function FilteredItemListInner({ items, middleCta, middleCtaAfter = 12, inlineAds = false, categoryFilter }: FilteredItemListProps) {
    const searchParams = useSearchParams();
    const urlQuery = categoryFilter ? '' : searchParams.get('q') || '';
    const [searchState, setSearchState] = useState(() => ({
        source: urlQuery,
        value: urlQuery,
    }));
    const searchQuery = searchState.source === urlQuery ? searchState.value : urlQuery;
    const setSearchQuery = (value: string) => {
        setSearchState({ source: urlQuery, value });
    };

    const filteredItems = useMemo(() => {
        // items は既にサーバー側でカテゴリフィルタ済み。
        // ここではフリーテキスト検索だけ AND マッチで適用する。
        const trimmed = searchQuery.trim();
        if (!trimmed) return items;

        return items.filter((item) => matchesSearch(item, trimmed));
    }, [items, searchQuery]);

    const isManualSearching = !!searchQuery.trim();

    // 旧middleCtaモード: 検索中は出さない（カテゴリーフィルタのみのときは表示）
    const showMiddleCta = !!middleCta && !isManualSearching && filteredItems.length > middleCtaAfter;
    // 新inlineAdsモード: 手動検索中・件数少のときは出さない
    const showInlineAds = inlineAds && !isManualSearching && filteredItems.length >= INLINE_AD_MIN_ITEMS;

    const renderedGridChildren = useMemo<ReactNode[]>(
        () => buildGridChildren(filteredItems, showInlineAds),
        [filteredItems, showInlineAds],
    );

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

            <div className="mb-8 mx-auto max-w-3xl">
                <div className="relative shadow-sm rounded-full overflow-hidden border border-slate-200 focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500 transition-all">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="block w-full border-none bg-white py-3.5 pl-12 pr-12 font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 sm:text-base"
                        placeholder={categoryFilter ? `${categoryFilter.label}内を検索（例：座位、タオル）` : '疾患名・部位・姿勢で検索（例：脳卒中、肩、座位）'}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            aria-label="検索キーワードを消去"
                            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-slate-400 transition-colors hover:text-slate-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
                <SearchSuggestions activeQuery={searchQuery} onSelect={setSearchQuery} />
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

/**
 * Suspense fallback として SSR時 に描画される静的な素材グリッド。
 * - 検索バーは非インタラクティブ（hydration後の本体に置き換わる）
 * - items はサーバー側でカテゴリフィルタ済みのものが渡る
 * - インライン広告も決定論的な位置で挿入される
 * これにより本番HTMLにおいて <FilteredItemList> 位置で素材一覧が
 * 出力され、LineBanner / Footer より前に並ぶ DOM順を保てる。
 */
function StaticItemGrid({ items, inlineAds = false, categoryFilter }: { items: Item[]; inlineAds?: boolean; categoryFilter?: CategoryFilter }) {
    const children = buildGridChildren(items, inlineAds, 'fb-');

    return (
        <div>
            {categoryFilter && (
                <div className="mb-5 flex justify-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-bold text-teal-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                        </svg>
                        {categoryFilter.label}で絞り込み中
                    </span>
                </div>
            )}
            <div className="mb-8 mx-auto max-w-3xl">
                <div className="relative shadow-sm rounded-full overflow-hidden border border-slate-200">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        readOnly
                        placeholder={categoryFilter ? `${categoryFilter.label}内を検索（例：座位、タオル）` : '疾患名・部位・姿勢で検索（例：脳卒中、肩、座位）'}
                        className="block w-full border-none bg-white py-3.5 pl-12 pr-4 font-medium text-slate-900 placeholder-slate-400 sm:text-base"
                    />
                </div>
                <SearchSuggestions />
            </div>

            {items.length > 0 ? (
                <div className={GRID_CLASS}>{children}</div>
            ) : (
                <div className="text-center py-16 text-slate-500 bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <div className="text-4xl mb-4">🔍</div>
                    <p className="font-bold text-lg text-slate-700">該当する素材がありません</p>
                </div>
            )}
        </div>
    );
}

export function FilteredItemList(props: FilteredItemListProps) {
    return (
        <Suspense
            fallback={
                <StaticItemGrid
                    items={props.items}
                    inlineAds={props.inlineAds}
                    categoryFilter={props.categoryFilter}
                />
            }
        >
            <FilteredItemListInner {...props} />
        </Suspense>
    );
}
