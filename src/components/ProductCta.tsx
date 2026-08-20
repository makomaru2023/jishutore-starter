'use client';

import Link from 'next/link';
import { PRODUCT_AD_CONFIG } from './ProductInlineAd';

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

const PLUS_CONFIG = PRODUCT_AD_CONFIG.plus;
const PRODUCT_URL = PLUS_CONFIG.href;
const LABEL = PLUS_CONFIG.itemName;

export type ProductCtaLocation =
    | 'items_top_cta'
    | 'items_middle_cta'
    | 'items_bottom_cta'
    | 'item_detail_cta';

export type ProductCtaVariant = 'compact' | 'full' | 'short' | 'inline';

interface ProductCtaProps {
    /** GA4の location パラメータに送る値 */
    location: ProductCtaLocation;
    /** 表示バリアント */
    variant?: ProductCtaVariant;
}

const trackClick = (location: ProductCtaLocation) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'product_cta_click', {
            location,
            url: PRODUCT_URL,
            label: LABEL,
        });
    }
};

const ArrowIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6 21 12m0 0-7.5 6M21 12H3" />
    </svg>
);

export function ProductCta({ location, variant = 'full' }: ProductCtaProps) {
    const handleClick = () => trackClick(location);

    // 上部用: スリムなバナー
    if (variant === 'compact') {
        return (
            <section className="w-full">
                <Link
                    href={PRODUCT_URL}
                    onClick={handleClick}
                    className="group block rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/60 to-sky-50/40 hover:from-blue-50 hover:to-sky-50 transition-all px-5 py-4 sm:px-6 sm:py-5"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-blue-700 mb-0.5">
                                自主トレ素材庫Plus
                            </p>
                            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                                編集できる運動スライド、資料づくりのツール、報酬チェックをひとつの月額で利用できます。
                            </p>
                        </div>
                        <div className="flex items-center justify-end sm:flex-shrink-0">
                            <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-blue-200 bg-white px-4 py-2 text-center text-sm font-bold leading-5 text-blue-600 transition-all group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white">
                                Plusの内容を見る
                                <ArrowIcon className="w-3.5 h-3.5" />
                            </span>
                        </div>
                    </div>
                </Link>
            </section>
        );
    }

    // 下部用: 短め再案内
    if (variant === 'short') {
        return (
            <section className="w-full">
                <div className="rounded-2xl border border-slate-200 bg-white px-6 py-6 sm:py-7 text-center">
                    <p className="text-sm sm:text-base font-bold text-slate-700 mb-1.5">
                        資料づくりも、算定確認も、Plusひとつで
                    </p>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium mb-4 leading-relaxed">
                        編集できるスライドと会員ツール、報酬チェックを利用できます。
                    </p>
                    <Link
                        href={PRODUCT_URL}
                        onClick={handleClick}
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white text-sm font-bold transition-all"
                    >
                        Plusの内容を見る
                        <ArrowIcon className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </section>
        );
    }

    // 詳細ページ用: ダウンロードボタン下のインライン
    if (variant === 'inline') {
        return (
            <section className="w-full">
                <div className="rounded-2xl border border-blue-100 bg-blue-50/40 px-5 py-5 sm:px-6 sm:py-6">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white border border-blue-100 text-blue-600 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                            </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-blue-700 mb-1">
                                この素材を編集できるスライドで使いたい方へ
                            </p>
                            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                                Plusなら、編集できるPowerPointスライドをダウンロードできます。
                            </p>
                        </div>
                    </div>
                    <Link
                        href={PRODUCT_URL}
                        onClick={handleClick}
                        className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all shadow-sm"
                    >
                        Plusの内容を見る
                        <ArrowIcon className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </section>
        );
    }

    // full（middle / 本命CTA）
    return (
        <section className="w-full">
            <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-blue-50/70 pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-sky-50/60 pointer-events-none" />

                <div className="relative px-6 py-8 sm:px-10 sm:py-10 md:flex md:items-center md:gap-10">
                    <div className="flex md:flex-col md:items-start items-center gap-3 md:gap-2 md:w-48 md:flex-shrink-0 mb-5 md:mb-0">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold border border-blue-100">
                            自主トレ素材庫Plus
                        </span>
                        <div className="flex flex-wrap items-baseline gap-1">
                            <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{PLUS_CONFIG.price}</span>
                            <span className="text-xs font-bold text-slate-400">{PLUS_CONFIG.priceNote}</span>
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <p className="text-xs sm:text-sm font-bold text-blue-600 mb-2 tracking-wide">
                            資料づくりも、算定確認も、ひとつのサービスで
                        </p>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 leading-snug mb-3">
                            編集できる資料と実務ツールを、Plusひとつで。
                        </h3>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                            {PLUS_CONFIG.description}
                        </p>
                    </div>

                    <div className="mt-6 md:mt-0 md:w-auto md:flex-shrink-0">
                        <Link
                            href={PRODUCT_URL}
                            onClick={handleClick}
                            className="inline-flex w-full max-w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-center text-base font-bold leading-6 text-white shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02] hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/30 md:w-auto"
                        >
                            Plusの内容を見る
                            <ArrowIcon className="w-4 h-4" />
                        </Link>
                        <p className="text-[11px] text-slate-400 mt-2 text-center md:text-right font-medium">
                            ※ Plusの詳しい内容を確認できます
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
