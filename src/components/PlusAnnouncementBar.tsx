"use client";

import Link from "next/link";
import { useState } from "react";
import {
    PLUS_PROMO_BADGE_TEXT,
    PLUS_PROMO_IS_ACTIVE,
    PLUS_PROMO_NEXT_PRICE_YEN,
} from "@/constants/plus-pricing";

/**
 * トップ最上部の細い告知バー（Plus先行モニターの価格告知）。
 * 閉じるボタン付き。状態はセッション内のReact stateのみ（localStorage等は使わない）。
 */
export function PlusAnnouncementBar() {
    const [open, setOpen] = useState(true);
    if (!open || !PLUS_PROMO_IS_ACTIVE) return null;

    return (
        <div className="relative bg-blue-700 text-white">
            <Link
                href="/products/jishutore-plus/"
                className="flex items-center justify-center gap-1.5 px-9 py-2 text-center text-xs font-bold leading-tight transition-colors hover:bg-blue-800 sm:text-sm"
            >
                <span className="sm:hidden">{PLUS_PROMO_BADGE_TEXT}｜素材庫Plus</span>
                <span className="hidden sm:inline">
                    {PLUS_PROMO_BADGE_TEXT} → 8月から{PLUS_PROMO_NEXT_PRICE_YEN}円 ｜ 自主トレ素材庫Plus
                </span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="h-3.5 w-3.5 flex-shrink-0"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
            </Link>
            <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="お知らせを閉じる"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 text-white/80 transition-colors hover:text-white"
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
    );
}
