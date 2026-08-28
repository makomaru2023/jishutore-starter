'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
    formatYen,
    PLUS_PROMO_CURRENT_PRICE_YEN,
} from "@/constants/plus-pricing";
import { trackLineClick, trackPlusCtaClick } from "@/lib/analytics";
import { TrackedPlusMemberLink } from "@/components/TrackedPlusMemberLink";
import { PlusAnnouncementBar } from "@/components/PlusAnnouncementBar";
import { PLUS_SIGNUP_PAUSED } from "@/constants/plus-availability";
import { SurveyEngagementBanner } from "@/components/survey/SurveyEngagementBanner";

const plusPriceLabel = formatYen(PLUS_PROMO_CURRENT_PRICE_YEN);

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    // ★受付停止中はPlus LPが「新規受付停止中」の案内ページになるため、
    //   ヘッダーの申込CTA（#pricing へのスクロール）も出さない。
    const isPlusProductPage =
        !PLUS_SIGNUP_PAUSED &&
        (pathname === "/products/jishutore-plus" ||
            pathname.startsWith("/products/jishutore-plus/"));

    const closeMenu = () => setIsMobileMenuOpen(false);

    return (
        <>
            {/* 全ページ最上部の告知バー。Headerに同梱することで27ページ分の個別設置が要らない。
                Plus LP上では出さない（すでに料金が書いてあるページなので邪魔になるだけ）。
                sticky な <header> の外に置くので、スクロールすると流れて消える。 */}
            {!isPlusProductPage && !PLUS_SIGNUP_PAUSED && <PlusAnnouncementBar />}
            {/* 2ページ以上見た人にだけ出す利用者アンケートのバナー。
                全ページに置く必要があるのでHeaderに同梱している（PlusAnnouncementBarと同じ理由）。
                出す・出さないの判定はコンポーネント側が持つ。画面下部に固定表示。 */}
            <SurveyEngagementBanner />
        <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900 text-white shadow-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="text-xl font-black tracking-tight group-hover:text-teal-400 transition-colors">自主トレ素材庫</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-4 md:flex lg:gap-6 xl:gap-8">
                    <Link href="/items" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">
                        無料素材
                    </Link>

                    <Link href="/fee-check" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">
                        報酬チェック
                    </Link>

                    {/* 報酬チェックの隣に置く。コラムは入口側の資産で、実際の流れも
                        報酬チェック → コラム → Plus の順になるため。
                        ★企画書§10の「ヘッダーナビへの追加はしない」は記事0本のときの判断で、
                        24本になった2026-08-15に見直した。

                        ★lg以上でだけ出す。md（768px）だと5項目でロゴとナビが接触する
                        （実測：コラム有りで隙間1px／無しで59px）。768〜1023pxでは出ないが、
                        1023px以下のモバイルメニューには常に入れてあるので、行き止まりにはならない。 */}
                    <Link href="/column/" className="hidden text-sm font-bold text-slate-300 transition-colors hover:text-white lg:block">
                        コラム
                    </Link>

                    {/* ★2026-08-28：有料の入口をヘッダーに常設する（ユーザー指示）。
                        Plus停止中は買い切り2商品（疾患別／姿勢別 各¥980）が有料の主役で、
                        /products はその一覧。ヘッダー・フッターのどこからもリンクが無く、
                        検索直着地でしか辿り着けない状態だったのを解消する。
                        Plus再開後も、月額と買い切りをまとめた入口として機能する。 */}
                    <Link href="/products/" className="text-sm font-bold text-teal-300 transition-colors hover:text-teal-200">
                        有料コンテンツ
                    </Link>

                    {/* ★2026-08-22：Plusの新規受付停止にともないナビから外している。
                        再開するときは PLUS_SIGNUP_PAUSED を false にすれば戻る。
                        「会員ページ」は既存会員の入口なので残す。 */}
                    {!PLUS_SIGNUP_PAUSED && (
                        <Link href="/products/jishutore-plus" className="text-sm font-bold text-teal-300 hover:text-teal-200 transition-colors">
                            素材庫Plus
                        </Link>
                    )}

                    <TrackedPlusMemberLink
                        placement="header"
                        className="text-sm font-bold text-slate-300 transition-colors hover:text-white"
                    >
                        会員ページ
                    </TrackedPlusMemberLink>

                    {isPlusProductPage ? (
                        <Link
                            href="#pricing"
                            onClick={() => trackPlusCtaClick("plus_lp_header", "scroll_to_pricing")}
                            className="flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30 lg:px-6 xl:ml-2"
                        >
                            月額{plusPriceLabel}で始める
                        </Link>
                    ) : (
                        <Link href="/#line" onClick={() => trackLineClick('header')} className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-all hover:scale-105 hover:shadow-lg hover:shadow-green-500/30 lg:px-6 xl:ml-2" style={{ backgroundColor: '#06C755', color: '#fff' }}>
                            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                            </svg>
                            無料特典を受け取る
                        </Link>
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label={isMobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobile-navigation"
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div id="mobile-navigation" className="md:hidden border-t border-slate-800 bg-slate-900 shadow-xl absolute w-full left-0">
                    <div className="container mx-auto px-4 py-6 space-y-3">
                        <Link
                            href="/items"
                            className="block py-3 px-4 text-base font-bold text-white bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors"
                            onClick={closeMenu}
                        >
                            無料素材
                        </Link>
                        <Link
                            href="/fee-check"
                            className="block py-3 px-4 text-base font-bold text-white bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors"
                            onClick={closeMenu}
                        >
                            報酬チェック
                        </Link>
                        <Link
                            href="/column/"
                            className="block py-3 px-4 text-base font-bold text-white bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors"
                            onClick={closeMenu}
                        >
                            コラム
                        </Link>
                        <Link
                            href="/products/"
                            className="block rounded-xl bg-slate-800 px-4 py-3 text-base font-bold text-teal-200 transition-colors hover:bg-slate-700"
                            onClick={closeMenu}
                        >
                            有料コンテンツ
                        </Link>
                        {!PLUS_SIGNUP_PAUSED && (
                            <Link
                                href="/products/jishutore-plus"
                                className="block py-3 px-4 text-base font-bold text-teal-200 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors"
                                onClick={closeMenu}
                            >
                                素材庫Plus
                            </Link>
                        )}
                        <TrackedPlusMemberLink
                            placement="header"
                            className="block rounded-xl bg-slate-800 px-4 py-3 text-base font-bold text-white transition-colors hover:bg-slate-700"
                            onClick={closeMenu}
                        >
                            会員ページ
                        </TrackedPlusMemberLink>
                        {isPlusProductPage ? (
                            <Link
                                href="#pricing"
                                className="flex items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-base font-bold text-white transition-colors hover:bg-blue-500"
                                onClick={() => {
                                    trackPlusCtaClick("plus_lp_header", "scroll_to_pricing");
                                    closeMenu();
                                }}
                            >
                                月額{plusPriceLabel}で始める
                            </Link>
                        ) : (
                            <Link
                                href="/#line"
                                className="flex items-center justify-center gap-2 py-3 px-4 text-base font-bold text-white rounded-xl transition-colors"
                                style={{ backgroundColor: '#06C755' }}
                                onClick={() => { trackLineClick('header'); closeMenu(); }}
                            >
                                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                                </svg>
                                無料特典を受け取る
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
        </>
    );
}
