"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

export const PLUS_PRODUCT_URL = "/products/jishutore-plus/";
const PLUS_PRODUCT_LABEL = "自主トレ素材庫Plus";

export type TrackedProductCtaLocation =
    | "home_hero_cta"
    | "home_plus_band"
    | "items_top_cta"
    | "category_plus_band";

interface TrackedProductCtaLinkProps {
    children: ReactNode;
    className?: string;
    location: TrackedProductCtaLocation;
    ariaLabel?: string;
}

export function TrackedProductCtaLink({
    children,
    className,
    location,
    ariaLabel,
}: TrackedProductCtaLinkProps) {
    const handleClick = () => {
        trackEvent("product_cta_click", {
            location,
            url: PLUS_PRODUCT_URL,
            label: PLUS_PRODUCT_LABEL,
        });
    };

    return (
        <Link
            href={PLUS_PRODUCT_URL}
            onClick={handleClick}
            className={className}
            aria-label={ariaLabel}
        >
            {children}
        </Link>
    );
}
