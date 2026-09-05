'use client';

import { Suspense, useState, useMemo, ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Item } from '@/types';
import { ItemCard } from '@/components/ItemCard';
import { ProductInlineAd } from '@/components/ProductInlineAd';
import { BuyoutInlineAd, type BuyoutAdFocus } from '@/components/BuyoutInlineAd';
import { ItemListPagination } from '@/components/ItemListPagination';
import { PLUS_SIGNUP_PAUSED } from '@/constants/plus-availability';
import { ITEM_PAGE_SIZE, getItemPageRange } from '@/lib/item-pagination';

export interface CategoryFilter {
    key: string;
    label: string;
}

/** ページ分割の情報。サーバー側（一覧ページ）から渡す。 */
export interface ItemListPaginationInfo {
    /** 1ページ目のURL（末尾スラッシュ付き）。例 "/items/" */
    basePath: string;
    /** いま開いているURLのページ番号（1始まり） */
    currentPage: number;
    /** 総ページ数 */
    totalPages: number;
}

interface FilteredItemListProps {
    items: Item[];
    /** グリッド内に商品広告カードを一定間隔で挿入するか */
    inlineAds?: boolean;
    /**
     * 買い切り商品（疾患別／姿勢別・各980円）の案内を1枠だけ出すか。
     * ★Plusの新規受付停止フラグ（PLUS_SIGNUP_PAUSED）とは切り離してある。
     *   Plus広告は停止中に出さないが、販売中の買い切りはこの指定だけで決まる。
     */
    buyoutAd?: BuyoutAdFocus | null;
    /** カテゴリーモード。サーバー側で既に items をフィルタ済みである前提で、
     *  ここではチップ表示と検索バーの URL q 流し込み抑止だけに使う。 */
    categoryFilter?: CategoryFilter;
    /** ページ分割。渡すとページ送りリンクが出る（渡さなければ従来どおり） */
    pagination?: ItemListPaginationInfo;
}

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

// グリッド共通クラス
const GRID_CLASS = 'grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4';
const INITIAL_VISIBLE_COUNT = ITEM_PAGE_SIZE;
const LOAD_MORE_COUNT = ITEM_PAGE_SIZE;

// 初回表示では16枚目の後に広告を出す。
// 追加表示では、25枚目・49枚目・73枚目…の直前に広告を入れ、
// 「さらに24件見る」を押した位置で自社サービスを案内してから素材を続ける。
const FIRST_AD_AFTER = 16;
// 検索結果がこの枚数以下のときはインライン広告を出さない
const INLINE_AD_MIN_ITEMS = 12;
// 広告のあとに残るカードがこの枚数未満なら、その広告は省く（末尾広告の防止）
const TRAILING_GUARD = 4;

interface GridAdOptions {
    /** Plus広告（受付停止中は false で渡ってくる） */
    inlineAds: boolean;
    /** 買い切り案内。null なら出さない */
    buyoutAd: BuyoutAdFocus | null;
}

/**
 * items の配列から、自社広告を挟んだ ReactNode[] を作る純関数。
 * ================================================================
 * ★買い切り案内は「さらに24件見る」で追加される素材の直前に1枠だけ。
 *   24件目までしか見ていない人には出ない（初回表示に広告を足さない）。
 *   49件目・73件目…には繰り返さない。1つの一覧に1枠だけ、が原則。
 * ★素材の表示そのものは、広告のクリックにも「閉じる」にも待ち時間にも依存しない。
 */
function buildGridChildren(
    items: Item[],
    { inlineAds, buyoutAd }: GridAdOptions,
    keyPrefix = '',
): ReactNode[] {
    const out: ReactNode[] = [];
    // ★2026-08-22：Plusの新規受付停止中は自社広告（Plus）を挟まない。
    //   ★2026-09-05：この条件は買い切り案内には掛けない（販売中の商品なので別扱い）。
    const canShowPlusAds = !PLUS_SIGNUP_PAUSED && inlineAds && items.length >= INLINE_AD_MIN_ITEMS;
    const canShowBuyoutAd = Boolean(buyoutAd) && items.length > LOAD_MORE_COUNT;

    items.forEach((item, i) => {
        // 追加表示分の先頭に自社広告を挿入する。初回24件だけのときは表示されない。
        if (canShowPlusAds && i > 0 && i % LOAD_MORE_COUNT === 0) {
            const remaining = items.length - i;
            if (remaining >= TRAILING_GUARD) {
                out.push(<ProductInlineAd key={`${keyPrefix}ad-batch-${i}-plus`} type="plus" />);
            }
        }

        // 買い切り案内は最初の追加表示の直前だけ（i === 24）。
        if (canShowBuyoutAd && i === LOAD_MORE_COUNT) {
            out.push(<BuyoutInlineAd key={`${keyPrefix}ad-buyout`} focus={buyoutAd!} />);
        }

        out.push(<ItemCard key={item.id} item={item} />);

        if (!canShowPlusAds) return;
        const pos = i + 1; // 1-indexed
        if (pos === FIRST_AD_AFTER) {
            const remaining = items.length - pos;
            if (remaining >= TRAILING_GUARD) {
                out.push(<ProductInlineAd key={`${keyPrefix}ad-initial-plus`} type="plus" />);
            }
        }
    });
    return out;
}

function FilteredItemListInner({
    items,
    inlineAds = false,
    buyoutAd = null,
    categoryFilter,
    pagination,
}: FilteredItemListProps) {
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
    const visibilitySource = [
        searchQuery,
        items.length,
        items[0]?.id ?? '',
        items[items.length - 1]?.id ?? '',
    ].join('|');
    const [visibilityState, setVisibilityState] = useState(() => ({
        source: visibilitySource,
        count: INITIAL_VISIBLE_COUNT,
    }));
    const visibleCount = visibilityState.source === visibilitySource
        ? visibilityState.count
        : INITIAL_VISIBLE_COUNT;

    const filteredItems = useMemo(() => {
        // items は既にサーバー側でカテゴリフィルタ済み。
        // ここではフリーテキスト検索だけ AND マッチで適用する。
        const trimmed = searchQuery.trim();
        if (!trimmed) return items;

        return items.filter((item) => matchesSearch(item, trimmed));
    }, [items, searchQuery]);

    const isManualSearching = !!searchQuery.trim();

    // 新inlineAdsモード: 手動検索中・件数少のときは出さない
    const showInlineAds = inlineAds && !isManualSearching && filteredItems.length >= INLINE_AD_MIN_ITEMS;
    // 買い切り案内も、検索中は出さない（探している最中に割り込まない）
    const showBuyoutAd = !isManualSearching ? buyoutAd : null;

    // ★2ページ目以降は、そのページの先頭からの24件を出す。
    //   検索中はページの区切りを外し、全件から探す（ページ内だけを探す挙動にしない）。
    const currentPage = pagination?.currentPage ?? 1;
    const pageOffset = isManualSearching ? 0 : (currentPage - 1) * ITEM_PAGE_SIZE;
    const visibleItems = filteredItems.slice(pageOffset, pageOffset + visibleCount);
    const hasMore = pageOffset + visibleCount < filteredItems.length;

    const renderedGridChildren = useMemo<ReactNode[]>(
        () => buildGridChildren(visibleItems, { inlineAds: showInlineAds, buyoutAd: showBuyoutAd }),
        [showBuyoutAd, showInlineAds, visibleItems],
    );

    // ページ送りの行き先。「さらに24件見る」で増やした分だけ先を指す
    // （48件見えている1ページ目からは、49件目にあたる3ページ目へ進む）。
    const shownThrough = Math.min(pageOffset + visibleCount, filteredItems.length);
    const nextPage = hasMore ? currentPage + Math.ceil(visibleCount / ITEM_PAGE_SIZE) : null;

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
                <p className="mt-3 text-center text-sm font-bold text-slate-500" aria-live="polite">
                    {searchQuery || categoryFilter
                        ? `${filteredItems.length}件見つかりました`
                        : `全${filteredItems.length}件`}
                    {filteredItems.length > 0 &&
                        (pageOffset > 0
                            ? `（${pageOffset + 1}〜${shownThrough}件目を表示中）`
                            : `（${shownThrough}件を表示中）`)}
                </p>
            </div>

            {filteredItems.length > 0 ? (
                <>
                    <div className={GRID_CLASS}>
                        {renderedGridChildren}
                    </div>
                    {hasMore && (
                        <div className="mt-10 flex flex-col items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setVisibilityState({
                                    source: visibilitySource,
                                    count: visibleCount + LOAD_MORE_COUNT,
                                })}
                                className="inline-flex min-h-12 items-center justify-center rounded-full bg-slate-900 px-8 py-3 text-sm font-black text-white transition hover:bg-slate-800"
                            >
                                さらに{Math.min(LOAD_MORE_COUNT, filteredItems.length - shownThrough)}件見る
                            </button>
                            <p className="text-xs font-bold text-slate-400">
                                {shownThrough} / {filteredItems.length}件
                            </p>
                        </div>
                    )}
                    {/* ★ページ送り。JavaScriptが動かなくても次のページへ進めるよう、通常のリンクで置く。
                        検索中はページの区切りが意味を持たないので出さない（URLも増やさない）。 */}
                    {pagination && !isManualSearching && (
                        <ItemListPagination
                            basePath={pagination.basePath}
                            currentPage={currentPage}
                            totalPages={pagination.totalPages}
                            nextPage={nextPage}
                            shownThrough={shownThrough}
                            total={filteredItems.length}
                        />
                    )}
                </>
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
 *
 * ★ここが「配信HTML」そのもの。検索エンジンとJavaScript無効の利用者はこれを見る。
 *   だからページ送りのリンクも、本体側と同じものをここで描く。
 */
function StaticItemGrid({
    items,
    inlineAds = false,
    buyoutAd = null,
    categoryFilter,
    pagination,
}: FilteredItemListProps) {
    const currentPage = pagination?.currentPage ?? 1;
    const pageOffset = (currentPage - 1) * ITEM_PAGE_SIZE;
    const initialItems = items.slice(pageOffset, pageOffset + INITIAL_VISIBLE_COUNT);
    const children = buildGridChildren(initialItems, { inlineAds, buyoutAd }, 'fb-');
    const range = getItemPageRange(currentPage, items.length);
    const shownThrough = Math.min(pageOffset + INITIAL_VISIBLE_COUNT, items.length);
    const nextPage = shownThrough < items.length ? currentPage + 1 : null;

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
                <p className="mt-3 text-center text-sm font-bold text-slate-500">
                    全{items.length}件
                    {items.length > 0 &&
                        (pageOffset > 0
                            ? `（${range.start}〜${range.end}件目を表示中）`
                            : `（${initialItems.length}件を表示中）`)}
                </p>
            </div>

            {initialItems.length > 0 ? (
                <>
                    <div className={GRID_CLASS}>{children}</div>
                    {nextPage && !pagination && (
                        <p className="mt-10 text-center text-sm font-bold text-slate-500">
                            続きは「さらに見る」から表示できます。
                        </p>
                    )}
                    {pagination && (
                        <ItemListPagination
                            basePath={pagination.basePath}
                            currentPage={currentPage}
                            totalPages={pagination.totalPages}
                            nextPage={nextPage}
                            shownThrough={shownThrough}
                            total={items.length}
                        />
                    )}
                </>
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
        <Suspense fallback={<StaticItemGrid {...props} />}>
            <FilteredItemListInner {...props} />
        </Suspense>
    );
}
