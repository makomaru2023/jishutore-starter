"use client";

import Link from "next/link";
import { useEffect, type ReactNode } from "react";
import {
    trackEvent,
    trackFeeCheckPlusClick,
    trackFeeCheckResultClick,
    trackFeeCheckSourceClick,
    trackFeeCheckView,
} from "@/lib/analytics";

type SerializableParams = Record<string, string | number | boolean>;

export function FeeCheckViewTracker({
    type,
    params,
}: {
    type: "domain" | "item";
    params: SerializableParams;
}) {
    const serialized = JSON.stringify(params);

    useEffect(() => {
        trackFeeCheckView(type, JSON.parse(serialized) as SerializableParams);
    }, [serialized, type]);

    return null;
}

export function FeeCheckSearchTracker({ params }: { params: SerializableParams }) {
    const serialized = JSON.stringify(params);

    useEffect(() => {
        trackEvent("fee_check_search", JSON.parse(serialized) as SerializableParams);
    }, [serialized]);

    return null;
}

export function FeeCheckTrackedLink({
    href,
    event,
    params,
    className,
    target,
    rel,
    children,
}: {
    href: string;
    event: "plus" | "source" | "result";
    params: SerializableParams;
    className?: string;
    target?: string;
    rel?: string;
    children: ReactNode;
}) {
    const handleClick = () => {
        if (event === "plus") {
            trackFeeCheckPlusClick(params);
            return;
        }
        if (event === "source") {
            trackFeeCheckSourceClick(params);
            return;
        }
        trackFeeCheckResultClick(params);
    };

    return (
        <Link
            href={href}
            className={className}
            target={target}
            rel={rel}
            onClick={handleClick}
        >
            {children}
        </Link>
    );
}
