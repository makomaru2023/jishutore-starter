"use client";

import { useState } from "react";
import { trackEvent, trackPlusCtaClick } from "@/lib/analytics";
import {
    formatYen,
    PLUS_PROMO_CURRENT_PRICE_YEN,
    PLUS_YEARLY_PRICE_YEN,
} from "@/constants/plus-pricing";

type PlusPlan = "monthly" | "yearly";

/**
 * 自主トレ素材庫Plus の申し込みボタン。
 * クリックで /api/plus/checkout/ を呼び、Stripe の決済ページへ遷移する。
 * plan="yearly" の場合は年払い価格でセッションを作る。
 */
export function PlusSubscribeButton({
    placement,
    plan = "monthly",
    label,
    className,
}: {
    placement: string;
    plan?: PlusPlan;
    label?: string;
    className?: string;
}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const priceYen = plan === "yearly" ? PLUS_YEARLY_PRICE_YEN : PLUS_PROMO_CURRENT_PRICE_YEN;
    const resolvedLabel =
        label ??
        (plan === "yearly"
            ? `年払い${formatYen(priceYen)}で申し込む`
            : `月額${formatYen(priceYen)}で申し込む`);

    async function handleClick() {
        if (loading) return;
        setLoading(true);
        setError(null);
        const checkoutParams = {
            currency: "JPY",
            value: priceYen,
            placement,
            items: [{
                item_id: plan === "yearly" ? "jishutore-plus-yearly" : "jishutore-plus",
                item_name: plan === "yearly" ? "自主トレ素材庫Plus（年払い）" : "自主トレ素材庫Plus",
                price: priceYen,
                quantity: 1,
            }],
        };
        trackPlusCtaClick(placement);
        trackEvent("checkout_start", checkoutParams);
        trackEvent("begin_checkout", checkoutParams);
        try {
            const res = await fetch("/api/plus/checkout/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ plan }),
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
                {loading ? "読み込み中…" : resolvedLabel}
            </button>
            {error && <p className="mt-2 text-xs font-medium text-red-600">{error}</p>}
        </div>
    );
}
