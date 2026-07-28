"use client";

import { useState } from "react";
import {
    ANNOUNCEMENT_KIND_LABEL,
    formatAnnouncementDate,
    getAnnouncements,
    type AnnouncementKind,
} from "@/constants/announcements";

/** 初期表示する件数。これを超える分は「もっと見る」で開く。 */
const INITIAL_COUNT = 3;

const KIND_STYLE: Record<AnnouncementKind, string> = {
    material: "border-blue-200 bg-blue-50 text-blue-700",
    feature: "border-emerald-200 bg-emerald-50 text-emerald-700",
    fix: "border-slate-200 bg-slate-50 text-slate-600",
};

/**
 * 会員資料庫の更新履歴。
 * 「今月も増えている」ことが会員に伝わらないと、月額の継続理由が見えなくなるため、
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
            aria-labelledby="plus-update-history-title"
            className="mb-5 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm sm:p-5"
        >
            <div className="mb-3 flex items-baseline gap-2">
                <h2 id="plus-update-history-title" className="text-sm font-black text-slate-900 sm:text-base">
                    更新履歴
                </h2>
                <p className="text-xs text-slate-500">資料と機能の追加をここに掲載します</p>
            </div>

            <ol className="space-y-3">
                {visible.map((a) => (
                    <li key={`${a.date}-${a.title}`} className="flex flex-col gap-1.5 sm:flex-row sm:gap-3">
                        <div className="flex flex-shrink-0 items-center gap-2 sm:w-40">
                            <time dateTime={a.date} className="text-xs font-bold tabular-nums text-slate-500">
                                {formatAnnouncementDate(a.date)}
                            </time>
                            <span
                                className={`rounded-full border px-2 py-0.5 text-[11px] font-bold ${KIND_STYLE[a.kind]}`}
                            >
                                {ANNOUNCEMENT_KIND_LABEL[a.kind]}
                            </span>
                        </div>

                        <div className="min-w-0">
                            {a.href ? (
                                <a
                                    href={a.href}
                                    className="text-sm font-bold text-blue-700 underline underline-offset-2 transition hover:text-blue-900"
                                >
                                    {a.title}
                                </a>
                            ) : (
                                <p className="text-sm font-bold text-slate-800">{a.title}</p>
                            )}
                            {a.body ? (
                                <p className="mt-0.5 text-xs leading-relaxed text-slate-600">{a.body}</p>
                            ) : null}
                        </div>
                    </li>
                ))}
            </ol>

            {hiddenCount > 0 ? (
                <button
                    type="button"
                    onClick={() => setExpanded(true)}
                    className="mt-3 text-xs font-bold text-slate-500 underline underline-offset-2 transition hover:text-slate-700"
                >
                    過去の更新をすべて見る（あと{hiddenCount}件）
                </button>
            ) : null}
        </section>
    );
}
