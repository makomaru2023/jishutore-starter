"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "plus_library_return_guide_dismissed_v1";

export function PlusWelcomeGuide({ show }: { show: boolean }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!show) return;

        try {
            const url = new URL(window.location.href);
            url.searchParams.delete("welcome");
            url.searchParams.delete("session_id");
            window.history.replaceState(
                window.history.state,
                "",
                `${url.pathname}${url.search}${url.hash}`,
            );
        } catch {
            // URLの整理に失敗しても案内表示は続ける。
        }

        let shouldShow = true;
        try {
            shouldShow = window.localStorage.getItem(STORAGE_KEY) !== "1";
        } catch {
            // localStorageが使えない場合も、この画面では案内する。
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
            aria-labelledby="plus-welcome-guide-title"
            className="mb-5 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-4 shadow-sm sm:p-5"
        >
            <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v16H7.5A2.5 2.5 0 0 0 5 21.5v-16Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 18.5A2.5 2.5 0 0 1 7.5 16H19M9 7h6" />
                    </svg>
                </span>
                <div className="min-w-0 flex-1">
                    <h2 id="plus-welcome-guide-title" className="text-sm font-black text-blue-950 sm:text-base">
                        次回も迷わず資料庫へ戻れます
                    </h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-blue-900/80 jp-text">
                        このページをブックマークしておくと、次回からすぐ開けます。スマホではホーム画面への追加も便利です。ログインが切れたときは、サイト上部の「会員ページ」からメールアドレスを入力して再ログインできます。
                    </p>
                </div>
                <button
                    type="button"
                    onClick={dismiss}
                    aria-label="戻り方案内を閉じる"
                    className="flex min-h-11 flex-shrink-0 items-center gap-1 rounded-lg px-2 text-xs font-bold text-blue-700 transition hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                    <span className="hidden sm:inline">閉じる</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-5 w-5" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </section>
    );
}
