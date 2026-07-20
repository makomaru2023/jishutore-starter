import Link from "next/link";
import { ProductSelectLink } from "./ProductSelectLink";
import { PLUS_SLIDE_COUNT } from "@/constants/plus";
import {
    PLUS_PROMO_BADGE_TEXT,
    PLUS_PROMO_CURRENT_PRICE_YEN,
    PLUS_PROMO_IS_ACTIVE,
} from "@/constants/plus-pricing";

const PLUS_FEATURES = [
    { label: "スライド素材", value: `編集できる${PLUS_SLIDE_COUNT}点` },
    { label: "完成デッキ", value: "疾患別9本＋姿勢別セット" },
    { label: "会員ツール", value: "伝わるプロンプト工房" },
    { label: "報酬チェック", value: "記録・自己点検まで" },
] as const;

export function HomePremiumPromo() {
    return (
        <section className="bg-white py-16 sm:py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-10">
                        <p className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-xs tracking-widest mb-4">
                            自主トレ素材庫Plus
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 leading-tight">
                            無料イラストを1枚ずつ貼る
                            <br className="sm:hidden" />
                            時間がない方へ
                        </h2>
                        <p className="text-slate-500 font-medium text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                            編集できるスライド素材、完成デッキ、資料づくりのツール、報酬チェックまで。
                            <br className="hidden sm:block" />
                            有料はぜんぶ入りの「Plus」ひとつにまとめました。
                        </p>
                    </div>

                    <div className="rounded-2xl border border-blue-200 bg-gradient-to-b from-blue-50/70 to-white p-5 sm:p-7">
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {PLUS_FEATURES.map((feature) => (
                                <div key={feature.label} className="rounded-xl border border-blue-100 bg-white p-4">
                                    <p className="text-xs font-black tracking-wider text-blue-700">{feature.label}</p>
                                    <p className="mt-1 text-sm font-black text-slate-950 break-keep">{feature.value}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
                            <div className="text-center sm:text-left">
                                <p className="text-lg font-black text-slate-950">
                                    月額{PLUS_PROMO_CURRENT_PRICE_YEN}円で全部入り
                                </p>
                                {PLUS_PROMO_IS_ACTIVE && (
                                    <p className="mt-0.5 text-xs font-bold text-amber-700">{PLUS_PROMO_BADGE_TEXT}</p>
                                )}
                            </div>
                            <Link
                                href="/products/jishutore-plus/"
                                className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm shadow-blue-600/20 transition-colors hover:bg-blue-500"
                            >
                                Plusの内容を見る
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* 施設・事業所向け資料パックへの導線 */}
                    <div className="mt-6 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/70 to-white p-5 sm:p-6">
                        <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                            <div className="min-w-0 flex-1 text-center sm:text-left">
                                <p className="mb-1 inline-block rounded-full bg-white px-2.5 py-0.5 text-[11px] font-black tracking-widest text-blue-700 border border-blue-100">
                                    施設・事業所向け
                                </p>
                                <p className="text-sm font-black leading-snug text-slate-900 sm:text-base break-keep">
                                    デイサービスで使う体操・口腔体操・転倒予防の資料パック
                                </p>
                                <p className="mt-1 text-xs text-slate-600 break-keep sm:text-sm">
                                    施設内で印刷・配布・掲示・職員共有OK。毎日の体操資料をまとめて準備できます。
                                </p>
                            </div>
                            <ProductSelectLink
                                href="/products/day-service-exercise-pack"
                                itemName="デイサービス向け 体操・口腔体操・転倒予防資料パック"
                                location="home_facility"
                                className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-blue-600/20 transition-colors hover:bg-blue-500"
                            >
                                資料パックを見る
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </ProductSelectLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
