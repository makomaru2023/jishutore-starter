'use client';

import Link from 'next/link';
import { PRODUCT_AD_CONFIG, trackProductAdClick } from './ProductInlineAd';

const ArrowIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6 21 12m0 0-7.5 6M21 12H3" />
    </svg>
);

/**
 * /items/ ページ上部で使えるPlus専用導線。
 * 旧・疾患別／姿勢別商品の再掲を防ぐため、リンク先とコピーをPlusに統一する。
 */
export function ProductDualCta() {
    const cfg = PRODUCT_AD_CONFIG.plus;

    return (
        <section className="w-full min-w-0">
            <div className="rounded-3xl border border-blue-100 bg-white px-5 py-6 shadow-sm sm:px-8 sm:py-8">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="mb-2 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold tracking-wider text-blue-700">
                        自主トレ素材庫Plus
                    </p>
                    <h2 className="text-lg font-black leading-snug text-slate-900 sm:text-xl">
                        資料づくりも、算定確認も、Plusひとつで
                    </h2>
                    <p className="jp-text mt-2 text-sm font-medium leading-relaxed text-slate-600">
                        {cfg.description}
                    </p>
                    <Link
                        href={cfg.href}
                        onClick={() => trackProductAdClick('plus', 'items_top_cta')}
                        className="mt-5 inline-flex max-w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-center text-sm font-bold leading-5 text-white transition hover:bg-blue-500"
                    >
                        {cfg.buttonLabel}
                        <ArrowIcon className="h-4 w-4 flex-shrink-0" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
