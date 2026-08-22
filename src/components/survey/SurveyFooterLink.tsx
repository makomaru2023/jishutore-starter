"use client";

import { trackSurveyClick } from "@/lib/analytics";
import { buildSurveyUrl, SURVEY_ENABLED } from "@/constants/survey";
import { markSurveyClicked } from "@/lib/survey";

/**
 * フッターの常設アンケートリンク。
 * プライバシーポリシー等と同じ扱いで、目立たせない。
 * 常設なので30日抑制の対象外（押した記録だけは残し、割り込み型の導線を止める）。
 */
export function SurveyFooterLink({ className = "" }: { className?: string }) {
    if (!SURVEY_ENABLED) return null;

    return (
        <a
            href={buildSurveyUrl("footer")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
                markSurveyClicked();
                trackSurveyClick("footer");
            }}
            className={className}
        >
            利用者アンケート（約1分）
        </a>
    );
}
