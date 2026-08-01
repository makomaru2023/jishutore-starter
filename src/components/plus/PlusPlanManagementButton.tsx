"use client";

import type { ReactNode } from "react";
import { useCallback, useState } from "react";

export function PlusPlanManagementButton({
    children = "プラン管理",
    className,
}: {
    children?: ReactNode;
    className: string;
}) {
    const [loading, setLoading] = useState(false);

    const openPortal = useCallback(async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await fetch("/api/plus/portal/", { method: "POST" });
            if (response.status === 401) {
                window.location.href = "/plus/login/";
                return;
            }
            const data = await response.json().catch(() => ({}));
            if (data?.url) {
                window.location.href = data.url;
                return;
            }
        } catch {
            // 失敗時はボタンを再操作できる状態へ戻す。
        } finally {
            setLoading(false);
        }
    }, [loading]);

    return (
        <button
            type="button"
            onClick={openPortal}
            disabled={loading}
            aria-busy={loading}
            aria-label={loading ? "プラン管理を開いています" : undefined}
            className={className}
        >
            {loading ? "…" : children}
        </button>
    );
}
