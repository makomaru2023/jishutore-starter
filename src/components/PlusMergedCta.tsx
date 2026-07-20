import Link from "next/link";
import {
    PLUS_PROMO_CURRENT_PRICE_YEN,
    PLUS_PROMO_IS_ACTIVE,
    PLUS_PROMO_PRICE_NOTE,
} from "@/constants/plus-pricing";

/* 旧・個別販売商品ページ用の「Plusに収録されました」誘導。
 * banner: ページ最上部のお知らせ帯（Header直下に置く）
 * button: 旧・購入ボタンの置き換えブロック */
export function PlusMergedCta({ variant = "button" }: { variant?: "banner" | "button" }) {
    if (variant === "banner") {
        return (
            <div className="border-b border-amber-200 bg-amber-50">
                <div className="container mx-auto flex flex-col gap-2 px-4 py-3 text-center sm:flex-row sm:items-center sm:justify-center sm:gap-3 sm:text-left">
                    <p className="text-xs font-bold leading-5 text-amber-900 sm:text-sm">
                        この商品は「自主トレ素材庫Plus」に収録されました。個別販売は終了しています。
                        ご購入済みの方は、これまでどおりご利用いただけます。
                    </p>
                    <Link
                        href="/products/jishutore-plus/"
                        className="mx-auto inline-flex flex-shrink-0 items-center justify-center rounded-full bg-blue-700 px-4 py-1.5 text-xs font-black text-white transition hover:bg-blue-800 sm:mx-0"
                    >
                        Plusを見る
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-md text-center">
            <Link
                href="/products/jishutore-plus/"
                className="inline-flex w-full items-center justify-center rounded-full bg-blue-700 px-8 py-4 text-base font-black text-white shadow-sm transition hover:bg-blue-800"
            >
                自主トレ素材庫Plusで利用する（月額{PLUS_PROMO_CURRENT_PRICE_YEN}円）
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
                個別販売は終了し、Plusに収録されました。
                {PLUS_PROMO_IS_ACTIVE && ` ${PLUS_PROMO_PRICE_NOTE}`}
            </p>
        </div>
    );
}
