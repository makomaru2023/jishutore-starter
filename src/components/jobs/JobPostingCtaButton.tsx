"use client";

import { trackB2bContactClick } from "@/lib/analytics";
import {
    JOB_POSTING_APPLICATION_IS_EXTERNAL,
    JOB_POSTING_APPLICATION_URL,
} from "@/constants/jobs";

/**
 * 求人掲載の申込CTA（/jobs/posting/ 用）。
 * --------------------------------------------------------------
 * ★申込先URLは @/constants/jobs の JOB_POSTING_APPLICATION_URL 1か所だけ。
 *   ここを含め、ページ側にURLは書かない。
 *
 * 計測は既存の b2b_contact_click（placement 付き）を再利用する。
 * 新しいイベント名やカスタムディメンションは増やさない。
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
            href={JOB_POSTING_APPLICATION_URL}
            {...(JOB_POSTING_APPLICATION_IS_EXTERNAL
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
        </a>
    );
}
