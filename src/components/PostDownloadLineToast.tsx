"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent, trackLineClick, trackLineToastImpression } from "@/lib/analytics";
import { canShowSurveyPrompt } from "@/lib/survey";
import { MATERIAL_DOWNLOADED_EVENT } from "@/components/MaterialDownloadButton";

/**
 * ダウンロード直後のLINE案内トースト
 * - material-downloaded イベントを購読し、3秒後にフェードイン
 * - 「閉じる」を押すと30日間は再表示しない（localStorage）
 * - 同一セッション内では最大1回（sessionStorage）
 * しつこさ厳禁。ダウンロード完了を妨げないタイミングで控えめに表示する。
 *
 * ★2026-08-22：利用者アンケートの導線を優先するようにした。
 *   アンケート未回答・未拒否の人にはアンケートトースト（SurveyToast）が出るので、
 *   そのときこのトーストは出さない。アンケートを回答済み／閉じた人だけがここに来る。
 *   両方が canShowSurveyPrompt() を見ているので、同時に2つ出ることはない。
 */

const LINE_URL = "https://lin.ee/79a5bNt";
const DISMISS_KEY = "line_toast_dismissed_until";
const SESSION_KEY = "line_toast_shown_session";
const SHOW_DELAY_MS = 3000;
const DISMISS_MS = 30 * 24 * 60 * 60 * 1000; // 30日

const LINE_SVG_PATH =
    "M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314";

export function PostDownloadLineToast() {
    const [visible, setVisible] = useState(false);
    const [entered, setEntered] = useState(false);
    const scheduledRef = useRef(false);

    useEffect(() => {
        function canShow(): boolean {
            try {
                if (sessionStorage.getItem(SESSION_KEY)) return false;
                const until = localStorage.getItem(DISMISS_KEY);
                if (until && Date.now() < Number(until)) return false;
            } catch {
                /* storage 不可でも表示は許可 */
            }
            return true;
        }

        function onDownloaded() {
            if (scheduledRef.current) return;
            // アンケートの導線が出る回はそちらに譲る（同時に2つ出さない）
            if (canShowSurveyPrompt()) return;
            if (!canShow()) return;
            scheduledRef.current = true;

            window.setTimeout(() => {
                try {
                    sessionStorage.setItem(SESSION_KEY, "1");
                } catch {
                    /* noop */
                }
                trackLineToastImpression("post_download_toast");
                setVisible(true);
                // 次フレームでフェードイン
                window.requestAnimationFrame(() => setEntered(true));
            }, SHOW_DELAY_MS);
        }

        window.addEventListener(MATERIAL_DOWNLOADED_EVENT, onDownloaded);
        return () => window.removeEventListener(MATERIAL_DOWNLOADED_EVENT, onDownloaded);
    }, []);

    function close() {
        setEntered(false);
        try {
            localStorage.setItem(DISMISS_KEY, String(Date.now() + DISMISS_MS));
        } catch {
            /* noop */
        }
        window.setTimeout(() => setVisible(false), 300);
    }

    if (!visible) return null;

    return (
        <div
            role="status"
            data-post-download-toast="line"
            className={`fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-sm transition-all duration-300 sm:left-auto sm:right-4 ${
                entered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
        >
            <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-xl">
                <div className="flex items-start gap-3">
                    <div
                        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: "#06C755" }}
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="white">
                            <path d={LINE_SVG_PATH} />
                        </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold leading-snug text-slate-800">
                            ダウンロードありがとうございます
                        </p>
                        <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                            患者さんにそのまま渡せる<strong className="font-black text-slate-700">資料7点セット</strong>を、LINEで無料配布しています。
                            チェックシート・記録ノート・退院後のQ&amp;A集など。お知らせは月1〜2回だけです。
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                            <a
                                href={LINE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackLineClick("post_download_toast")}
                                className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-black text-white transition-all hover:scale-105"
                                style={{ backgroundColor: "#06C755" }}
                            >
                                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="white">
                                    <path d={LINE_SVG_PATH} />
                                </svg>
                                7点セットを受け取る
                            </a>
                            <a
                                href="/products/jishutore-plus/"
                                onClick={() =>
                                    trackEvent("product_cta_click", {
                                        location: "post_download_toast_plus",
                                        url: "/products/jishutore-plus/",
                                        label: "自主トレ素材庫Plus",
                                    })
                                }
                                className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-700 transition-colors hover:bg-blue-100"
                            >
                                編集できる版を見る
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
