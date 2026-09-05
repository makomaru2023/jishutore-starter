'use client';

import Link from 'next/link';
import type { CategoryColumnLink } from '@/lib/category-columns';

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

/**
 * 用途カテゴリ →「素材の使い方」コラムへの小さな導線。
 * ================================================================
 * ★素材を探しに来た人が主役なので、一覧より上には置かない（一覧の下）。
 * ★長い記事紹介にしない。タイトル＋1行だけ。
 * ★既存のFAQ・関連カテゴリ・商品広告と役割が重ならないよう、
 *   「素材を選んだあと、どの順で渡すか」に絞る。
 *
 * 計測：category_column_click（category と column_slug）。
 *   既存イベントに「カテゴリからコラムへ」を見分けられるものが無いので、
 *   最小限これだけ足す。二重送信を避けるため onClick 1か所からのみ送る。
 */
function trackClick(category: string, columnSlug: string) {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
    try {
        window.gtag('event', 'category_column_click', {
            category,
            column_slug: columnSlug,
        });
    } catch {
        // GA4未設定でもエラーにしない
    }
}

export function CategoryColumnLinks({
    categorySlug,
    categoryLabel,
    columns,
}: {
    categorySlug: string;
    categoryLabel: string;
    columns: CategoryColumnLink[];
}) {
    if (columns.length === 0) return null;

    return (
        <section
            aria-labelledby={`category-columns-${categorySlug}`}
            className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
        >
            <h2
                id={`category-columns-${categorySlug}`}
                className="text-base font-black text-slate-900 sm:text-lg"
            >
                素材の使い方を読む
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
                {categoryLabel}の素材を、どの順で選んで渡すか。実際の場面から書いた記事です。
            </p>
            <ul className="mt-4 divide-y divide-slate-100 border-t border-slate-100">
                {columns.map((column) => (
                    <li key={column.slug} className="py-3">
                        <Link
                            href={column.href}
                            onClick={() => trackClick(categorySlug, column.slug)}
                            className="group block"
                        >
                            <span className="block text-sm font-bold leading-6 text-blue-700 underline-offset-2 group-hover:underline">
                                {column.title}
                            </span>
                            <span className="mt-0.5 block text-xs leading-6 text-slate-500">
                                {column.summary}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
