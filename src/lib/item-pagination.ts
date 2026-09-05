/**
 * 素材一覧（/items/ と用途カテゴリ）のページ分割。
 * ================================================================
 * ★2026-09-05 新設。それまで一覧は初回24件＋「さらに24件見る」のボタンだけで、
 *   25件目以降へ進む通常のHTMLリンクが無かった。
 *   検索エンジンはユーザー操作の必要なボタンを押して巡回しないので、
 *   固有URLと次ページへのリンクを用意する。
 *   参考：https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading
 *
 * ★データを import しないので、クライアントコンポーネントからも読める。
 *   実際に素材を集めてページを切るのは @/lib/item-list-sources（サーバー側）。
 *
 * 【URLの形】
 *   1ページ目 … /items/                     /items/<slug>/
 *   2ページ目 … /items/page/2/              /items/<slug>/page/2/
 *   ★1ページ目に /page/1/ は作らない。同じ内容のURLを2つ作らないため。
 *   ★検索語・並び替えのURLは作らない。一覧内の検索はJavaScriptだけで動かし、
 *     URLを生やさない（組み合わせで無限にURLが増えるのを防ぐ）。
 */

/** 1ページあたりの件数。「さらに24件見る」の単位と同じにそろえる。 */
export const ITEM_PAGE_SIZE = 24;

/** 全件数から総ページ数を出す。0件でも1ページ（＝1ページ目だけ）として扱う。 */
export function getTotalItemPages(total: number, pageSize = ITEM_PAGE_SIZE): number {
    if (total <= 0) return 1;
    return Math.ceil(total / pageSize);
}

/**
 * ページ番号からURLを組み立てる。
 * basePath は必ず末尾スラッシュ付き（next.config.js が trailingSlash: true）。
 */
export function buildItemPageUrl(basePath: string, page: number): string {
    if (page <= 1) return basePath;
    return `${basePath}page/${page}/`;
}

/** そのページに載る素材の範囲（1始まり）。件数表示に使う。 */
export function getItemPageRange(
    page: number,
    total: number,
    pageSize = ITEM_PAGE_SIZE,
): { start: number; end: number } {
    if (total <= 0) return { start: 0, end: 0 };
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, total);
    return { start, end };
}

/**
 * URLの page パラメータを検証する。
 * ★2以上の整数だけを受ける。"1"・"0"・"02"・"abc"・"2.5" はすべて null。
 *   ゆるく受けると /items/page/0001/ のような同内容URLが無限に生える。
 */
export function parseItemPageParam(raw: string): number | null {
    // 先頭ゼロ・空文字・記号を弾く（"02" と "2" が別URLになるのを防ぐ）
    if (!/^[1-9][0-9]*$/.test(raw)) return null;
    const page = Number(raw);
    if (!Number.isSafeInteger(page)) return null;
    // 1ページ目は基準URL（/items/）が担当するので、ここでは受けない
    return page >= 2 ? page : null;
}

/** 2ページ目以降のページ番号を並べる（generateStaticParams 用）。 */
export function listExtraPageNumbers(total: number, pageSize = ITEM_PAGE_SIZE): number[] {
    const totalPages = getTotalItemPages(total, pageSize);
    return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => i + 2);
}
