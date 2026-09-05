"use client";

import { trackB2bContactClick } from "@/lib/analytics";
import { JOB_POSTING_INQUIRY_ANCHOR_ID } from "@/constants/jobs";

/**
 * 求人掲載の相談CTA（/jobs/posting/ 用）。
 * --------------------------------------------------------------
 * ★2026-09-05：飛び先を「長いmailto」から「同じページ内の初回相談フォーム」に変えた。
 *   メールアプリの設定がない端末でも相談でき、最初に書く項目も5つで済む。
 *   掲載原稿（職業安定法の明示事項を含む一式）は STEP 2 で別途お送りする。
 *
 * 計測は既存の b2b_contact_click（placement 付き）を再利用する。
 * 新しいイベント名やカスタムディメンションは増やさない。
 * ⚠ このクリックは「フォームを開いた」であって送信完了ではない。
 *   送信完了は JobPostingInquiryForm 側の b2b_contact_submit で数える。
 * placement 例：jobs_posting_hero / jobs_posting_pricing / jobs_posting_footer
 */
export function JobPostingCtaButton({
    placement,
    variant = "primary",
    children,
    className = "",
}: {
    placement: string;
    variant?: "primary" | "secondary";
    children: React.ReactNode;
    className?: string;
}) {
    const base =
        "inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-black transition-colors sm:w-auto";
    const style =
        variant === "primary"
            ? "bg-blue-700 text-white hover:bg-blue-800"
            : "border-2 border-white bg-transparent text-white hover:bg-white/10";

    return (
        <a
            href={`#${JOB_POSTING_INQUIRY_ANCHOR_ID}`}
            onClick={() => trackB2bContactClick(placement)}
            className={`${base} ${style} ${className}`}
        >
            {children}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="h-4 w-4 shrink-0"
                aria-hidden="true"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0-6-6m6 6 6-6" />
            </svg>
        </a>
    );
}
