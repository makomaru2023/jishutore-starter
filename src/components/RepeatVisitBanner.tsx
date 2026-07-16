'use client';

import { trackNoteClick } from "@/lib/analytics";

/**
 * リピーター化のための「また使ってもらう」導線バナー。
 * ブックマーク推奨 + 新着素材のお知らせ（LINE・note）を案内する。
 * LINEの友だち追加ボタンは直下の LineBanner に任せ、ここでは note 導線のみ持つ。
 * - full: 素材一覧・カテゴリページの下部用（LineBanner の直前に置く）
 * - compact: 素材詳細ページ用（1〜2行のスリム表示）
 */

const NOTE_URL = "https://note.com/jisyutore";

interface RepeatVisitBannerProps {
    /** GA4 の placement パラメータに送る設置場所 */
    placement: string;
    variant?: "full" | "compact";
}

function BookmarkIcon({ className }: { className: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
        </svg>
    );
}

export function RepeatVisitBanner({ placement, variant = "full" }: RepeatVisitBannerProps) {
    if (variant === "compact") {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4">
                <p className="flex items-start gap-2 text-sm font-medium leading-relaxed text-slate-600">
                    <BookmarkIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-600" />
                    <span className="break-keep">
                        素材は毎月追加しています。次の資料づくりのために、ブックマーク登録がおすすめです。新着情報は
                        <a
                            href={NOTE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackNoteClick(placement)}
                            className="mx-0.5 font-bold text-teal-700 underline decoration-teal-300 underline-offset-2 transition-colors hover:text-teal-500"
                        >
                            note
                        </a>
                        でも発信しています。
                    </span>
                </p>
            </div>
        );
    }

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
                <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-center gap-2">
                        <BookmarkIcon className="h-5 w-5 flex-shrink-0 text-teal-600" />
                        <h2 className="text-base font-black text-slate-900 sm:text-lg">
                            素材は毎月追加しています
                        </h2>
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-slate-600 break-keep">
                        次に資料を作るときにすぐ探せるよう、このページのブックマーク登録がおすすめです。
                        新着素材のお知らせは、下のLINEまたはnoteで受け取れます。
                    </p>
                    <p className="mt-2 text-xs font-medium text-slate-400">
                        ブックマークは Ctrl+D（Macは⌘+D）、スマホはブラウザの共有メニューから追加できます。
                    </p>
                </div>
                <div className="flex flex-shrink-0 flex-col gap-2.5 sm:w-56">
                    <a
                        href={NOTE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackNoteClick(placement)}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-black text-slate-700 transition-colors hover:border-teal-400 hover:text-teal-700"
                    >
                        noteで更新情報を読む
                    </a>
                </div>
            </div>
        </section>
    );
}
