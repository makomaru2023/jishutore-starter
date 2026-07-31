"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { PLUS_DISPLAY_PRICE_YEN } from "@/constants/plus-pricing";

/**
 * 自主トレ素材庫Plus の申し込みボタン。
 * クリックで /api/plus/checkout/ を呼び、Stripe の決済ページへ遷移する。
 */
export function PlusSubscribeButton({
    label = `月額${PLUS_DISPLAY_PRICE_YEN}円で申し込む`,
    className,
}: {
    label?: string;
    className?: string;
}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleClick() {
        if (loading) return;
        setLoading(true);
        setError(null);
        const checkoutParams = {
            currency: "JPY",
            value: PLUS_DISPLAY_PRICE_YEN,
            items: [{
                item_id: "jishutore-plus",
                item_name: "自主トレ素材庫Plus",
                price: PLUS_DISPLAY_PRICE_YEN,
                quantity: 1,
            }],
        };
        trackEvent("checkout_start", checkoutParams);
        trackEvent("begin_checkout", checkoutParams);
        try {
            const res = await fetch("/api/plus/checkout/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json().catch(() => ({}));
            if (res.ok && data?.url) {
                window.location.href = data.url;
                return;
            }
            setError(data?.error ?? "申し込みページを開けませんでした。時間をおいて再度お試しください。");
        } catch {
            setError("通信エラーが発生しました。時間をおいて再度お試しください。");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full sm:w-auto">
            <button
                type="button"
                onClick={handleClick}
                disabled={loading}
                className={
                    className ??
                    "inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                }
            >
                {loading ? "読み込み中…" : label}
            </button>
            {error && <p className="mt-2 text-xs font-medium text-red-600">{error}</p>}
        </div>
    );
}
