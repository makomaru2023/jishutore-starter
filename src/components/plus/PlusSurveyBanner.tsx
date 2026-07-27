"use client";

import { useEffect, useState } from "react";
import { trackPlusSurveyClick } from "@/lib/analytics";

/** 購入者アンケート（Googleフォーム）。差し替えはここだけを直す。 */
export const PLUS_SURVEY_URL = "https://forms.gle/EUgVsC7jQkMzQgeL8";

const STORAGE_KEY = "plus_library_survey_banner_dismissed_v1";

const CloseIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);

const SurveyIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v0a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 13 2 2 4-4" />
    </svg>
);

/**
 * 会員資料庫のヘッダー直下に出す購入者アンケート導線。
 * 一度閉じたら localStorage で再表示しない（PlusWelcomeGuide と同じ方針）。
 */
export function PlusSurveyBanner({ show = true }: { show?: boolean }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!show) return;

        let shouldShow = true;
        try {
            shouldShow = window.localStorage.getItem(STORAGE_KEY) !== "1";
        } catch {
            // localStorageが使えない環境でも、この画面では案内する。
        }

        const timerId = window.setTimeout(() => setIsVisible(shouldShow), 0);
        return () => window.clearTimeout(timerId);
    }, [show]);

    if (!isVisible) return null;

    const dismiss = () => {
        setIsVisible(false);
        try {
            window.localStorage.setItem(STORAGE_KEY, "1");
        } catch {
            // 保存できない環境でも、この画面では閉じられるようにする。
        }
    };

    return (
        <section
            role="region"
            aria-labelledby="plus-survey-banner-title"
            className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-sm sm:p-5"
        >
            <div className="flex items-start gap-3">
                <span
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-500 text-white"
                    aria-hidden="true"
                >
                    <SurveyIcon />
                </span>

                <div className="min-w-0 flex-1">
                    <p id="plus-survey-banner-title" className="text-sm font-black text-slate-900 sm:text-base">
                        Plusをもっと使いやすくするため、アンケートにご協力ください
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                        3分ほどで終わります。いただいたご意見は、今後の資料追加や機能の優先順位を決める参考にさせていただきます。
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        <a
                            href={PLUS_SURVEY_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackPlusSurveyClick("plus_library_header")}
                            className="inline-flex items-center rounded-full bg-amber-500 px-4 py-2 text-xs font-black text-white shadow-sm transition hover:bg-amber-600 sm:text-sm"
                        >
                            アンケートに回答する
                        </a>
                        <button
                            type="button"
                            onClick={dismiss}
                            className="text-xs font-bold text-slate-500 underline underline-offset-2 transition hover:text-slate-700"
                        >
                            あとで
                        </button>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={dismiss}
                    aria-label="アンケートの案内を閉じる"
                    className="flex-shrink-0 rounded-full p-1.5 text-slate-400 transition hover:bg-amber-100 hover:text-slate-600"
                >
                    <CloseIcon />
                </button>
            </div>
        </section>
    );
}
