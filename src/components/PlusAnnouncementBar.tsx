"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { formatYen, PLUS_PROMO_CURRENT_PRICE_YEN } from "@/constants/plus-pricing";
import { FEE_CHECK_ITEM_COUNT, PLUS_SLIDE_COUNT_PUBLIC } from "@/constants/public-counts";
import { trackEvent } from "@/lib/analytics";

const PLUS_URL = "/products/jishutore-plus/";

/**
 * 全ページ最上部の細い告知バー。
 *
 * 2026-08-09：先行モニターの期間限定告知（「7月31日まで¥500 → 8月から¥980」）から、
 * 月額¥500の常設案内に変更した。Plus LPへの到達が週10人しかなく、到達数そのものが
 * ボトルネックだったため、Header に同梱して全ページへ露出させている
 * （設置は Header.tsx の1箇所だけ。個別ページへの追加は不要）。
 *
 * ★閉じるボタンは意図的に持たせていない。
 *   ページ遷移のたびに Header が再マウントされるため、React state だけでは
 *   閉じても毎回出てしまい、sessionStorage で覚えるには useEffect 内の setState が要る
 *   （react-hooks/set-state-in-effect に抵触＋初回描画のちらつきが出る）。
 *   sticky な <header> の外にあってスクロールで流れて消える細いバーなので、
 *   状態を持たない実装のほうが素直だと判断した。
 */
export function PlusAnnouncementBar() {
    const pathname = usePathname();
    const price = formatYen(PLUS_PROMO_CURRENT_PRICE_YEN);

    // 報酬チェック配下では訴求を切り替える。
    // 2026-08-10：来訪者の46%が報酬チェック目当てで、加算を調べに来た人に
    // 「編集できるスライド227点」を先に見せても刺さらないため。
    const isFeeCheck = pathname.startsWith("/fee-check");

    return (
        <div className="bg-blue-700 text-white">
            <Link
                href={PLUS_URL}
                onClick={() =>
                    trackEvent("product_cta_click", {
                        location: isFeeCheck ? "announcement_bar_fee_check" : "announcement_bar",
                        url: PLUS_URL,
                        label: "自主トレ素材庫Plus",
                    })
                }
                className="flex items-center justify-center gap-1.5 px-4 py-2 text-center text-xs font-bold leading-tight transition-colors hover:bg-blue-800 sm:text-sm"
            >
                <span className="break-keep sm:hidden">
                    {isFeeCheck
                        ? `記録・自己点検まで見るならPlus（月額${price}）`
                        : `素材庫Plusは月額${price}｜スライド${PLUS_SLIDE_COUNT_PUBLIC}点`}
                </span>
                <span className="hidden break-keep sm:inline">
                    {isFeeCheck
                        ? `全${FEE_CHECK_ITEM_COUNT}項目の「記録に残すこと・自己点検ポイント」まで見られるのは自主トレ素材庫Plus（月額${price}）`
                        : `自主トレ素材庫Plus｜編集できるスライド${PLUS_SLIDE_COUNT_PUBLIC}点と報酬チェックが月額${price}`}
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
        </div>
    );
}
