"use client";

import { useEffect, useState } from "react";
import {
    formatYen,
    PLUS_YEARLY_FORCE_OFF,
    PLUS_YEARLY_FORCE_ON,
    PLUS_YEARLY_LIST_YEN,
    PLUS_YEARLY_MONTHLY_EQUIVALENT_YEN,
    PLUS_YEARLY_PRICE_YEN,
    PLUS_YEARLY_SAVING_LABEL,
    PLUS_YEARLY_START_ISO,
} from "@/constants/plus-pricing";
import { shouldShowPlusYearly } from "@/lib/plus-yearly";
import { PlusSubscribeButton } from "@/components/plus/PlusSubscribeButton";
import { PLUS_SIGNUP_PAUSED } from "@/constants/plus-availability";

/**
 * 月払いCTAの下に置く年払いの選択肢。
 *
 * 2026-08-01 00:00 JST を過ぎると自動で表示される（環境変数の切り替え不要）。
 * 日付判定はマウント後に行うため、開始前は静的HTMLにも一切含まれない。
 * isPurchasable は年額の価格IDが設定済みかをサーバー側から受け取る。
 * ★新規受付停止中は月払いごと止まっているので、年払いの案内も出さない。
 */
export function PlusYearlyOption({
    placement,
    isPurchasable,
    className,
}: {
    placement: string;
    isPurchasable: boolean;
    className?: string;
}) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const update = () => {
            setVisible(
                shouldShowPlusYearly({
                    nowMs: Date.now(),
                    startIso: PLUS_YEARLY_START_ISO,
                    isPurchasable,
                    forceOn: PLUS_YEARLY_FORCE_ON,
                    forceOff: PLUS_YEARLY_FORCE_OFF,
                }),
            );
        };

        update();
        const timerId = window.setInterval(update, 60_000);
        return () => window.clearInterval(timerId);
    }, [isPurchasable]);

    if (PLUS_SIGNUP_PAUSED) return null;
    if (!visible) return null;

    return (
        <div
            className={
                className ??
                "mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-center"
            }
        >
            <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="rounded-full bg-emerald-700 px-3 py-1 text-xs font-black text-white">
                    年払いなら{PLUS_YEARLY_SAVING_LABEL}
                </span>
            </div>
            <p className="mt-3 text-2xl font-black tracking-tight text-slate-950">
                年額 <span className="text-emerald-700">{formatYen(PLUS_YEARLY_PRICE_YEN)}</span>
            </p>
            <p className="mt-1 text-xs font-bold leading-5 text-slate-600">
                月払い1年分{formatYen(PLUS_YEARLY_LIST_YEN)}
                　→　実質月額{formatYen(PLUS_YEARLY_MONTHLY_EQUIVALENT_YEN)}
            </p>
            <div className="mt-4">
                <PlusSubscribeButton
                    placement={placement}
                    plan="yearly"
                    className="inline-flex w-full items-center justify-center rounded-xl border-2 border-emerald-700 bg-white px-6 py-3.5 text-sm font-black text-emerald-800 transition hover:bg-emerald-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                />
            </div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">
                年払いは1年ごとの自動更新です。期間途中の解約による日割り返金はありません。
            </p>
        </div>
    );
}
