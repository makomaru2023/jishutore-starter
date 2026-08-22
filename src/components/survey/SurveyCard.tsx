"use client";

import { useEffect, useRef } from "react";
import { trackSurveyClick, trackSurveyImpression } from "@/lib/analytics";
import { buildSurveyUrl, SURVEY_ENABLED, type SurveyPlacement } from "@/constants/survey";
import { markSurveyClicked } from "@/lib/survey";

/**
 * 本文を読み終えた位置に置く、静かなアンケート導線カード。
 * --------------------------------------------------------------
 * 報酬チェックの個別ページ末尾で使う。
 * ★本文の途中には置かない。算定要件を確認しに来た人の作業を邪魔しないため、
 *   必要な情報を読み終えた後（既存の分野CTAのさらに下）に置く。
 *
 * 画面に入ったときだけ survey_impression を送る（マウント時ではなく実際に見られたとき）。
 * 常設のページ内容なので、閉じる機能や30日抑制は付けていない。
 */
export function SurveyCard({
    placement,
    className = "",
}: {
    placement: SurveyPlacement;
    className?: string;
}) {
    const ref = useRef<HTMLElement | null>(null);
    const sentRef = useRef(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        if (typeof IntersectionObserver !== "function") {
            // 未対応環境ではマウント時に1回だけ送る
            if (!sentRef.current) {
                sentRef.current = true;
                trackSurveyImpression(placement);
            }
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting && !sentRef.current) {
                        sentRef.current = true;
                        trackSurveyImpression(placement);
                        observer.disconnect();
                    }
                }
            },
            { threshold: 0.5 },
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [placement]);

    if (!SURVEY_ENABLED) return null;

    return (
        <section
            ref={ref}
            className={`rounded-lg border border-slate-200 bg-white p-5 ${className}`}
        >
            <p className="text-xs font-black tracking-widest text-slate-400">ANQUETE</p>
            <h2 className="mt-1 break-keep text-base font-black leading-snug text-slate-950 sm:text-lg">
                自主トレ素材庫をもっと使いやすくするために
            </h2>
            <p className="mt-1.5 break-keep text-sm font-bold leading-relaxed text-slate-600">
                どんな職種・領域の方に使っていただいているのかを知りたくて、簡単なアンケートを実施しています。
                匿名で、回答は約1分です。
            </p>
            <a
                href={buildSurveyUrl(placement)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                    markSurveyClicked();
                    trackSurveyClick(placement);
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-5 py-2.5 text-sm font-black text-blue-700 transition-colors hover:bg-blue-100"
            >
                アンケートに回答する（約1分）
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="h-4 w-4 flex-shrink-0"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
            </a>
        </section>
    );
}
