import {
    formatYen,
    PLUS_YEARLY_IS_ACTIVE,
    PLUS_YEARLY_LIST_YEN,
    PLUS_YEARLY_MONTHLY_EQUIVALENT_YEN,
    PLUS_YEARLY_PRICE_YEN,
    PLUS_YEARLY_SAVING_LABEL,
} from "@/constants/plus-pricing";
import { PlusSubscribeButton } from "@/components/plus/PlusSubscribeButton";

/**
 * 月払いCTAの下に置く年払いの選択肢。
 * NEXT_PUBLIC_PLUS_YEARLY_ACTIVE=true のときだけ表示される（既定は非表示）。
 */
export function PlusYearlyOption({
    placement,
    className,
}: {
    placement: string;
    className?: string;
}) {
    if (!PLUS_YEARLY_IS_ACTIVE) return null;

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
