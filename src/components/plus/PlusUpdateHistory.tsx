"use client";

import { useState } from "react";
import {
    ANNOUNCEMENT_KIND_LABEL,
    formatAnnouncementDate,
    getAnnouncements,
} from "@/constants/announcements";

/** 初期表示する件数。これを超える分は「すべて見る」で開く。 */
const INITIAL_COUNT = 3;

/**
 * バッジの色。区分ごとに変えず1色でそろえる（区分は文字で読み分けられるため、
 * 色を分けるより見出しの赤に統一したほうが一覧が静かに見える）。
 * ここを変えれば全バッジの色が変わる。
 */
const BADGE_CLASS = "bg-red-700 text-white";
const HEADING_CLASS = "text-red-700";

const ChevronRight = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
    </svg>
);

/**
 * 会員資料庫のTOPICS。
 * 「今月も増えている」ことが会員に伝わらないと月額の継続理由が見えなくなるため、
 * 最新3件は開かずに読める状態で置く。
 */
export function PlusUpdateHistory() {
    const [expanded, setExpanded] = useState(false);
    const all = getAnnouncements("plus");
    if (all.length === 0) return null;

    const visible = expanded ? all : all.slice(0, INITIAL_COUNT);
    const hiddenCount = all.length - visible.length;

    return (
        <section
            aria-labelledby="plus-topics-title"
            className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
        >
            <div className="mb-3 text-center">
                <h2
                    id="plus-topics-title"
                    className={`font-serif text-xl tracking-[0.25em] sm:text-2xl ${HEADING_CLASS}`}
                >
                    TOPICS
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">資料と機能の追加をここに掲載します</p>
            </div>

            <ol className="border-t border-dotted border-slate-300">
                {visible.map((a) => (
                    <li
                        key={`${a.date}-${a.title}`}
                        className="flex flex-col gap-1 border-b border-dotted border-slate-300 py-3 sm:flex-row sm:items-baseline sm:gap-4"
                    >
                        {/* スマホではバッジと日付を1行にまとめ、sm以上ではliの直接の子に戻す */}
                        <div className="flex items-center gap-3 sm:contents">
                            <span
                                className={`inline-flex w-20 flex-shrink-0 items-center justify-center self-start px-2 py-1 text-[11px] font-bold tracking-wide ${BADGE_CLASS}`}
                            >
                                {ANNOUNCEMENT_KIND_LABEL[a.kind]}
                            </span>

                            <time
                                dateTime={a.date}
                                className="flex-shrink-0 text-xs font-bold tabular-nums text-slate-500 sm:text-sm"
                            >
                                {formatAnnouncementDate(a.date)}
                            </time>
                        </div>

                        <div className="min-w-0">
                            {a.href ? (
                                <a
                                    href={a.href}
                                    className="text-sm font-bold text-slate-800 underline underline-offset-2 transition hover:text-red-700"
                                >
                                    {a.title}
                                </a>
                            ) : (
                                <p className="text-sm font-bold text-slate-800">{a.title}</p>
                            )}
                            {a.body ? (
                                <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{a.body}</p>
                            ) : null}
                        </div>
                    </li>
                ))}
            </ol>

            {hiddenCount > 0 ? (
                <div className="mt-3 flex justify-end">
                    <button
                        type="button"
                        onClick={() => setExpanded(true)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 transition hover:text-red-700"
                    >
                        過去のお知らせをすべて見る（あと{hiddenCount}件）
                        <ChevronRight />
                    </button>
                </div>
            ) : null}
        </section>
    );
}
