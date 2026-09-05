'use client';

import Link from 'next/link';
import { buildItemPageUrl } from '@/lib/item-pagination';

/**
 * 素材一覧のページ送り。
 * ================================================================
 * ★通常の <a href> で組む。JavaScriptを切っていても次のページへ進めること。
 *   （Suspense の fallback 側でも同じものを描くので、配信HTMLに必ず入る）
 *
 * ★「さらに24件見る」で表示を増やしたときは、nextPage がその先を指す。
 *   例）1ページ目で1回押して48件見えている → 「次のページ」は3ページ目（49件目から）。
 *   URLに出ている内容と、リンクの行き先が食い違わないようにするための計算。
 */
export function ItemListPagination({
    basePath,
    currentPage,
    totalPages,
    nextPage,
    shownThrough,
    total,
}: {
    basePath: string;
    /** いま開いているURLのページ番号 */
    currentPage: number;
    totalPages: number;
    /** 次に進むページ番号。最後まで表示済みなら null */
    nextPage: number | null;
    /** 画面に出ている最後の素材の通し番号（1始まり） */
    shownThrough: number;
    total: number;
}) {
    if (totalPages <= 1) return null;

    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const pageNumbers = buildPageNumbers(currentPage, totalPages);

    return (
        <nav
            aria-label="素材一覧のページ送り"
            className="mt-8 border-t border-slate-200 pt-6"
        >
            <p className="text-center text-xs font-bold text-slate-500">
                {total}件中 {shownThrough}件まで表示 ／ {currentPage} / {totalPages}ページ
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {prevPage ? (
                    <Link
                        href={buildItemPageUrl(basePath, prevPage)}
                        rel="prev"
                        className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:border-teal-400 hover:text-teal-700"
                    >
                        ← 前のページ
                    </Link>
                ) : null}

                {nextPage ? (
                    <Link
                        href={buildItemPageUrl(basePath, nextPage)}
                        rel="next"
                        className="inline-flex min-h-11 items-center justify-center rounded-full bg-slate-900 px-6 py-2.5 text-sm font-black text-white transition-colors hover:bg-slate-800"
                    >
                        次のページ（{nextPage} / {totalPages}）→
                    </Link>
                ) : null}
            </div>

            <ol className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
                {pageNumbers.map((entry, index) =>
                    entry === null ? (
                        <li
                            key={`gap-${index}`}
                            aria-hidden="true"
                            className="px-1 text-sm font-bold text-slate-400"
                        >
                            …
                        </li>
                    ) : (
                        <li key={entry}>
                            <Link
                                href={buildItemPageUrl(basePath, entry)}
                                aria-current={entry === currentPage ? 'page' : undefined}
                                aria-label={`${entry}ページ目`}
                                className={`inline-flex h-10 min-w-10 items-center justify-center rounded-lg px-2.5 text-sm font-bold transition-colors ${
                                    entry === currentPage
                                        ? 'bg-teal-700 text-white'
                                        : 'border border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:text-teal-700'
                                }`}
                            >
                                {entry}
                            </Link>
                        </li>
                    ),
                )}
            </ol>

            {currentPage > 1 && (
                <p className="mt-4 text-center">
                    <Link
                        href={basePath}
                        className="text-sm font-bold text-teal-700 underline underline-offset-2 hover:text-teal-600"
                    >
                        一覧の先頭に戻る
                    </Link>
                </p>
            )}
        </nav>
    );
}

/**
 * 表示するページ番号を作る。null は「…」の位置。
 * 先頭・末尾・現在の前後1つを残し、間は省略する（ページ数が多くても行が折り返さない）。
 */
function buildPageNumbers(currentPage: number, totalPages: number): (number | null)[] {
    const shown = new Set<number>([1, totalPages, currentPage]);
    if (currentPage - 1 > 1) shown.add(currentPage - 1);
    if (currentPage + 1 < totalPages) shown.add(currentPage + 1);

    const sorted = [...shown].filter((n) => n >= 1 && n <= totalPages).sort((a, b) => a - b);
    const out: (number | null)[] = [];
    let previous = 0;
    for (const page of sorted) {
        if (previous && page - previous > 1) out.push(null);
        out.push(page);
        previous = page;
    }
    return out;
}
