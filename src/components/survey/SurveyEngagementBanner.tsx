"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { trackSurveyClick, trackSurveyDismiss, trackSurveyImpression } from "@/lib/analytics";
import { buildSurveyUrl, SURVEY_ENABLED } from "@/constants/survey";
import {
    canShowSurveyPrompt,
    markSurveyClicked,
    markSurveyDismissed,
    markSurveyPromptShown,
} from "@/lib/survey";

/**
 * 2ページ以上見た人にだけ出す、画面下部の細いアンケートバナー。
 * --------------------------------------------------------------
 * ★出す相手を絞る理由：新規訪問がとても多いサイトなので、
 *   1ページ見ただけの人に聞いても回答の質が低い（サービスをまだ使っていない）。
 *   2ページ以上見た＝ある程度関心を持っている人にだけ聞く。
 *
 * ★出さない場所（他の導線と二重にしないため）：
 *   - /items 系 … ダウンロード後のトーストが担当
 *   - /fee-check 系 … ページ下部のカードが担当
 *   - Plus・会員・決済まわり … 申し込みの邪魔をしない
 *
 * 回答リンクを押した人には今後ずっと出さない。閉じた人には7日間。
 * さらに1セッション1回まで（src/lib/survey.ts）。
 */

const PAGE_VIEW_KEY = "surveyPageViews";
const LAST_PATH_KEY = "surveyLastPath";
const MIN_PAGE_VIEWS = 2;
const SHOW_DELAY_MS = 8000; // 読み始めてすぐには出さない
const PLACEMENT = "engagement_banner" as const;

/** このパスでバナーを出してよいか */
function isAllowedPath(pathname: string): boolean {
    const blocked = [
        "/items",       // ダウンロード後トーストの担当
        "/fee-check",   // ページ下部カードの担当
        "/plus",        // 会員ページ
        "/member",
        "/thank-you",   // 決済直後
        "/products",    // 商品LP（申し込みの邪魔をしない）
        "/login",
    ];
    return !blocked.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

/** セッション内のページ閲覧数を数える（同じパスの連続は数えない） */
function countPageView(pathname: string): number {
    try {
        if (window.sessionStorage.getItem(LAST_PATH_KEY) === pathname) {
            return Number(window.sessionStorage.getItem(PAGE_VIEW_KEY) || "0");
        }
        const next = Number(window.sessionStorage.getItem(PAGE_VIEW_KEY) || "0") + 1;
        window.sessionStorage.setItem(PAGE_VIEW_KEY, String(next));
        window.sessionStorage.setItem(LAST_PATH_KEY, pathname);
        return next;
    } catch {
        return 0;
    }
}

export function SurveyEngagementBanner() {
    const pathname = usePathname();
    const [visible, setVisible] = useState(false);
    const [entered, setEntered] = useState(false);

    useEffect(() => {
        if (!SURVEY_ENABLED) return;
        if (!pathname) return;

        const views = countPageView(pathname);
        if (views < MIN_PAGE_VIEWS) return;
        if (!isAllowedPath(pathname)) return;
        if (!canShowSurveyPrompt("banner")) return;

        const timer = window.setTimeout(() => {
            // 割り込み型が別に出ていたら譲る（DL後トースト等）
            if (document.querySelector("[data-post-download-toast]")) return;
            if (!canShowSurveyPrompt("banner")) return;
            markSurveyPromptShown("banner");
            trackSurveyImpression(PLACEMENT);
            setVisible(true);
            window.requestAnimationFrame(() => setEntered(true));
        }, SHOW_DELAY_MS);

        return () => window.clearTimeout(timer);
    }, [pathname]);

    function close() {
        setEntered(false);
        markSurveyDismissed();
        trackSurveyDismiss(PLACEMENT);
        window.setTimeout(() => setVisible(false), 300);
    }

    if (!visible) return null;

    return (
        <div
            role="status"
            className={`fixed inset-x-0 bottom-0 z-[55] transition-all duration-300 ${
                entered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
        >
            <div className="border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-4px_16px_rgba(15,23,42,0.08)] backdrop-blur">
                <div className="container mx-auto flex max-w-3xl items-center gap-3">
                    <p className="min-w-0 flex-1 break-keep text-xs font-bold leading-relaxed text-slate-600 sm:text-sm">
                        自主トレ素材庫をもっと使いやすくするために、簡単なアンケートを実施しています。
                        <span className="text-slate-400">匿名・約1分です。</span>
                    </p>
                    <a
                        href={buildSurveyUrl(PLACEMENT)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                            markSurveyClicked();
                            trackSurveyClick(PLACEMENT);
                        }}
                        className="flex-shrink-0 whitespace-nowrap rounded-full bg-blue-700 px-4 py-2 text-xs font-black text-white transition-colors hover:bg-blue-800 sm:text-sm"
                    >
                        回答する
                    </a>
                    <button
                        onClick={close}
                        aria-label="アンケートの案内を閉じる"
                        className="flex-shrink-0 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="currentColor"
                            className="h-4 w-4"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
