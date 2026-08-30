"use client";

import { trackJobApplyClick, type JobEventSource } from "@/lib/analytics";

/**
 * 施設・法人の公式採用ページへ送るボタン。
 * --------------------------------------------------------------
 * ★自主トレ素材庫では応募を受け付けない。応募はすべて施設の公式窓口で行う。
 *   計測イベント名は job_apply_click だが、
 *   意味は「公式採用ページへ遷移したクリック」であって応募完了ではない。
 */
export function JobApplyButton({
    job,
    href,
    variant = "primary",
    children,
}: {
    job: JobEventSource;
    href: string;
    variant?: "primary" | "secondary";
    children: React.ReactNode;
}) {
    const base =
        "inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-black transition-colors sm:w-auto sm:px-8";
    const style =
        variant === "primary"
            ? "bg-blue-700 text-white hover:bg-blue-800"
            : "border-2 border-blue-700 bg-white text-blue-700 hover:bg-blue-50";

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackJobApplyClick(job)}
            className={`${base} ${style}`}
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
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
            </svg>
        </a>
    );
}
