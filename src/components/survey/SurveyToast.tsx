"use client";

import { useEffect, useRef, useState } from "react";
import { trackSurveyClick, trackSurveyImpression } from "@/lib/analytics";
import { MATERIAL_DOWNLOADED_EVENT } from "@/components/MaterialDownloadButton";
import { willLineToastShow } from "@/components/PostDownloadLineToast";
import { buildSurveyUrl, SURVEY_ENABLED } from "@/constants/survey";
import {
    canShowSurveyPrompt,
    markSurveyClicked,
    markSurveyDismissed,
    markSurveyPromptShown,
} from "@/lib/survey";

/**
 * 素材ダウンロード完了後のアンケート案内トースト。
 * --------------------------------------------------------------
 * ★アンケート回答をダウンロードの条件には絶対にしない。
 *   ダウンロードのリンク遷移が始まったあと、遅れて画面のすみに出るだけ。
 *
 * 既存の PostDownloadLineToast（LINE 7点セット）と場所が同じなので、
 * 二重に出さないよう次の順番にしている：
 *   1. LINEトーストが出る回 → アンケートは出さない（LINE導線を優先）
 *   2. LINEが出ない回（既に出た・閉じられて30日以内）→ アンケートを出す
 * 結果として「2枚目以降をダウンロードした人」＝関心の高い人に当たりやすい。
 *
 * 閉じた／回答した人には30日間出さない（src/lib/survey.ts）。
 */

const SHOW_DELAY_MS = 3500; // LINEトースト（3000ms）より後。DLの妨げにならない位置
const PLACEMENT = "material_download" as const;

export function SurveyToast() {
    const [visible, setVisible] = useState(false);
    const [entered, setEntered] = useState(false);
    const scheduledRef = useRef(false);

    useEffect(() => {
        if (!SURVEY_ENABLED) return;

        function onDownloaded() {
            if (scheduledRef.current) return;
            if (!canShowSurveyPrompt()) return;
            // LINEトーストが出る回はそちらに譲る
            if (willLineToastShow()) return;
            scheduledRef.current = true;

            window.setTimeout(() => {
                // 直前のダウンロードで出たLINEトーストがまだ画面に残っていたら出さない
                if (document.querySelector('[data-post-download-toast="line"]')) return;
                markSurveyPromptShown();
                trackSurveyImpression(PLACEMENT);
                setVisible(true);
                window.requestAnimationFrame(() => setEntered(true));
            }, SHOW_DELAY_MS);
        }

        window.addEventListener(MATERIAL_DOWNLOADED_EVENT, onDownloaded);
        return () => window.removeEventListener(MATERIAL_DOWNLOADED_EVENT, onDownloaded);
    }, []);

    function close() {
        setEntered(false);
        markSurveyDismissed();
        window.setTimeout(() => setVisible(false), 300);
    }

    if (!visible) return null;

    return (
        <div
            role="status"
            data-post-download-toast="survey"
            className={`fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-sm transition-all duration-300 sm:left-auto sm:right-4 ${
                entered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
        >
            <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-xl">
                <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-50">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5 text-blue-700"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                            />
                        </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="break-keep text-sm font-bold leading-snug text-slate-800">
                            30秒だけ、ご協力いただけませんか？
                        </p>
                        <p className="mt-0.5 break-keep text-xs leading-relaxed text-slate-500">
                            自主トレ素材庫をどんな方に使っていただいているのか、簡単なアンケートを実施しています。
                            匿名・約1分で回答できます。
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                            <a
                                href={buildSurveyUrl(PLACEMENT)}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => {
                                    markSurveyClicked();
                                    trackSurveyClick(PLACEMENT);
                                }}
                                className="inline-flex items-center rounded-full bg-blue-700 px-4 py-1.5 text-xs font-black text-white transition-colors hover:bg-blue-800"
                            >
                                1分アンケートに回答する
                            </a>
                            <button
                                onClick={close}
                                className="rounded-full px-3 py-1.5 text-xs font-bold text-slate-400 transition-colors hover:text-slate-600"
                            >
                                閉じる
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
