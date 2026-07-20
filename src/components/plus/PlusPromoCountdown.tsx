"use client";

import { useEffect, useState } from "react";
import {
    PLUS_PROMO_DEADLINE_ISO,
    PLUS_PROMO_IS_ACTIVE,
} from "@/constants/plus-pricing";
import { getPlusPromoCountdownLabel } from "@/lib/plus-promo-countdown";

export function PlusPromoCountdown({
    className,
    prefix = "",
}: {
    className?: string;
    prefix?: string;
}) {
    const [label, setLabel] = useState<string | null>(null);

    useEffect(() => {
        const updateLabel = () => {
            setLabel(
                getPlusPromoCountdownLabel({
                    nowMs: Date.now(),
                    deadlineIso: PLUS_PROMO_DEADLINE_ISO,
                    isActive: PLUS_PROMO_IS_ACTIVE,
                }),
            );
        };

        updateLabel();
        const timerId = window.setInterval(updateLabel, 60_000);
        return () => window.clearInterval(timerId);
    }, []);

    if (!label) return null;

    return <span className={className}>{prefix}{label}</span>;
}
