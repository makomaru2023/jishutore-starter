/**
 * コラム記事のカード。一覧（/column/）とトップの「新着コラム」枠で共用する。
 * 記事本体（Body）には触れず、メタデータだけを表示する。
 */

import Link from "next/link";
import {
    columnCategoryLabels,
    columnCategoryStyles,
    getColumnUrl,
    type ColumnArticle,
} from "@/lib/column";

export function ColumnCard({ article }: { article: ColumnArticle }) {
    const isUpdated = article.updatedAt !== article.publishedAt;

    return (
        <Link
            href={getColumnUrl(article.slug)}
            className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
        >
            <span className="flex flex-wrap items-center gap-2">
                <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-black ${columnCategoryStyles[article.category]}`}
                >
                    {columnCategoryLabels[article.category]}
                </span>
                <span className="text-xs font-bold text-slate-500">
                    {isUpdated ? `${article.updatedAt} 更新` : article.publishedAt}
                </span>
            </span>
            <span className="jp-heading mt-3 text-base font-black leading-relaxed text-slate-950 sm:text-lg">
                {article.title}
            </span>
            <span className="jp-text mt-2.5 flex-1 text-sm leading-7 text-slate-600 line-clamp-3">
                {article.description}
            </span>
            <span className="mt-4 text-sm font-black text-blue-700">読む →</span>
        </Link>
    );
}
