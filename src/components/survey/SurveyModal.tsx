"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { trackSurveyClick, trackSurveyDismiss, trackSurveyImpression } from "@/lib/analytics";
import { MATERIAL_DOWNLOADED_EVENT } from "@/components/MaterialDownloadButton";
import { buildSurveyUrl, SURVEY_ENABLED } from "@/constants/survey";
import {
    canShowSurveyPrompt,
    markSurveyClicked,
    markSurveyDismissed,
    markSurveyPromptShown,
} from "@/lib/survey";

/**
 * 素材ダウンロード完了後に、画面中央へ出すアンケートの案内。
 * --------------------------------------------------------------
 * ★アンケート回答をダウンロードの条件には絶対にしない。
 *   ダウンロードの遷移が始まったあと、遅れて前面に出るだけ。
 *
 * ★2026-08-22：右下のトーストでは弱いというユーザー判断で、中央モーダルに変更した
 *   （30日で100件を集めるため。多少の離脱は許容する方針）。
 *   ただし塞ぎっぱなしにはしない：暗幕クリック・Escape・×・「あとで」で閉じられる。
 *   ページのスクロールも止めていないので、閉じなくても操作を続けられる。
 *
 * ★検索からの着地ページ（コラム・報酬チェック）ではモーダルを使わない。
 *   Googleの「煩わしいインタースティシャル」の評価対象になり得るため、
 *   そちらは記事末尾のカードで案内する。
 *
 * 回答リンクを押した人には今後ずっと出さない。閉じた人には7日間出さない（src/lib/survey.ts）。
 */

const SHOW_DELAY_MS = 2500; // ダウンロードの保存が始まってから
const PLACEMENT = "material_download" as const;

export function SurveyModal() {
    const [visible, setVisible] = useState(false);
    const [entered, setEntered] = useState(false);
    const scheduledRef = useRef(false);

    const close = useCallback(() => {
        setEntered(false);
        markSurveyDismissed();
        trackSurveyDismiss(PLACEMENT);
        window.setTimeout(() => setVisible(false), 200);
    }, []);

    useEffect(() => {
        if (!SURVEY_ENABLED) return;

        function onDownloaded() {
            if (scheduledRef.current) return;
            if (!canShowSurveyPrompt("toast")) return;
            scheduledRef.current = true;

            window.setTimeout(() => {
                markSurveyPromptShown("toast");
                trackSurveyImpression(PLACEMENT);
                setVisible(true);
                window.requestAnimationFrame(() => setEntered(true));
            }, SHOW_DELAY_MS);
        }

        window.addEventListener(MATERIAL_DOWNLOADED_EVENT, onDownloaded);
        return () => window.removeEventListener(MATERIAL_DOWNLOADED_EVENT, onDownloaded);
    }, []);

    useEffect(() => {
        if (!visible) return;
        function onKey(event: KeyboardEvent) {
            if (event.key === "Escape") close();
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [visible, close]);

    if (!visible) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="survey-modal-title"
            data-post-download-toast="survey"
            className={`fixed inset-0 z-[70] flex items-center justify-center p-4 transition-opacity duration-200 ${
                entered ? "opacity-100" : "opacity-0"
            }`}
        >
            {/* 暗幕。クリックで閉じられる */}
            <button
                type="button"
                aria-label="アンケートの案内を閉じる"
                onClick={close}
                className="absolute inset-0 h-full w-full cursor-default bg-slate-900/50"
            />

            <div
                className={`relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl transition-transform duration-200 sm:p-7 ${
                    entered ? "translate-y-0" : "translate-y-3"
                }`}
            >
                <button
                    type="button"
                    onClick={close}
                    aria-label="閉じる"
                    className="absolute right-3 top-3 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-6 w-6 text-blue-700" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                    </svg>
                </div>

                <p className="mt-3 text-xs font-black tracking-widest text-blue-700">ANQUETE</p>
                <h2 id="survey-modal-title" className="mt-1 break-keep text-lg font-black leading-snug text-slate-950 sm:text-xl">
                    次に増やしてほしい素材、教えてください
                </h2>
                <p className="mt-2 break-keep text-sm font-medium leading-relaxed text-slate-600">
                    自主トレ素材庫をどんな職種・現場の方が使っているのか調査しています。
                    回答を今後の素材・機能追加に活用します。
                </p>
                <p className="mt-2 break-keep text-xs font-medium leading-relaxed text-slate-400">
                    匿名・選択式中心です
                </p>

                <a
                    href={buildSurveyUrl(PLACEMENT)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                        markSurveyClicked();
                        trackSurveyClick(PLACEMENT);
                        close();
                    }}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-blue-700 px-6 py-3 text-sm font-black text-white transition-colors hover:bg-blue-800 sm:text-base"
                >
                    アンケートに回答する
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4 flex-shrink-0" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                </a>
                <button
                    type="button"
                    onClick={close}
                    className="mt-2 w-full rounded-full px-4 py-2 text-xs font-bold text-slate-400 transition-colors hover:text-slate-600"
                >
                    あとにする
                </button>
            </div>
        </div>
    );
}
