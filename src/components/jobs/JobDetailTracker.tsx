"use client";

import { useEffect, useRef } from "react";
import { trackJobDetailView, type JobEventSource } from "@/lib/analytics";

/**
 * 求人詳細ページの表示を1回だけ計測する。
 * 表示だけが仕事なので何も描画しない。
 */
export function JobDetailTracker({ job }: { job: JobEventSource }) {
    const sentRef = useRef(false);

    useEffect(() => {
        if (sentRef.current) return;
        sentRef.current = true;
        trackJobDetailView(job);
    }, [job]);

    return null;
}
