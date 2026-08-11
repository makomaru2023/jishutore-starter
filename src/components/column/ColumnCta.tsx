"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

/**
 * コラム記事末尾のCTA。1記事につき1つだけ置く（企画書§4・編集ガイド§3）。
 *
 * 計測は既存の product_cta_click を流用し、location で設置場所を分ける。
 * ★fee_check_plus_click は使わない。あちらは報酬チェック起点の転換を測る指標で、
 * コラム由来のクリックを混ぜると前後比較が読めなくなる（2026-08-11の申し送り）。
 */

const CTA_CONFIG = {
    plus: {
        href: "/products/jishutore-plus/",
        label: "自主トレ素材庫Plus",
        location: "column_footer_plus",
    },
    "free-items": {
        href: "/items/",
        label: "無料素材一覧",
        location: "column_footer_items",
    },
} as const;

export type ColumnCtaVariant = keyof typeof CTA_CONFIG;

export function ColumnCta({
    variant,
    slug,
    heading,
    body,
    buttonLabel,
}: {
    variant: ColumnCtaVariant;
    slug: string;
    heading: string;
    body: string;
    buttonLabel: string;
}) {
    const config = CTA_CONFIG[variant];
    const isPlus = variant === "plus";

    const handleClick = () => {
        trackEvent("product_cta_click", {
            location: config.location,
            url: config.href,
            label: config.label,
            column_slug: slug,
        });
    };

    return (
        <aside
            className={`mt-12 rounded-2xl border p-5 sm:p-7 ${
                isPlus ? "border-blue-200 bg-blue-50/70" : "border-teal-200 bg-teal-50/70"
            }`}
        >
            <h2 className={`jp-heading text-lg font-black sm:text-xl ${isPlus ? "text-blue-950" : "text-teal-950"}`}>
                {heading}
            </h2>
            <p className="jp-text mt-2 text-sm leading-7 text-slate-700">{body}</p>
            <Link
                href={config.href}
                onClick={handleClick}
                className={`mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-black text-white shadow-sm transition ${
                    isPlus ? "bg-blue-700 hover:bg-blue-800" : "bg-teal-600 hover:bg-teal-700"
                }`}
            >
                {buttonLabel}
                <span aria-hidden="true">→</span>
            </Link>
        </aside>
    );
}
