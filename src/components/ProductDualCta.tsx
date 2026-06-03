'use client';

import Link from 'next/link';
import { PRODUCT_AD_CONFIG, ProductAdType, trackProductAdClick } from './ProductInlineAd';

const ArrowIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6 21 12m0 0-7.5 6M21 12H3" />
    </svg>
);

/**
 * /items/ ページ上部の有料商品導線。
 * 疾患別LP・姿勢別LPへ直接飛ばす2CTA構成。
 */
export function ProductDualCta() {
    const order: ProductAdType[] = ['condition', 'posture'];

    return (
        <section className="w-full">
            <div className="rounded-3xl border border-blue-100 bg-white px-5 py-6 shadow-sm sm:px-8 sm:py-8">
                <div className="mb-5 text-center sm:mb-6">
                    <p className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold tracking-wider text-blue-700">
                        POWERPOINT 資料セット（980円・買い切り）
                    </p>
                    <h2 className="mb-2 text-lg font-black leading-snug text-slate-900 sm:text-xl">
                        無料イラストだけでは、説明資料づくりに時間がかかる方へ
                    </h2>
                    <p className="mx-auto max-w-2xl text-sm font-medium leading-relaxed text-slate-600 break-keep">
                        自主トレ素材庫では、300点以上の無料イラストに加えて、患者さんにそのまま渡しやすいPowerPoint資料セットも用意しています。疾患名から選べる資料と、今できる姿勢から選べる資料を用途に合わせて使い分けできます。
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                    {order.map((type) => {
                        const cfg = PRODUCT_AD_CONFIG[type];
                        return (
                            <Link
                                key={type}
                                href={cfg.href}
                                onClick={() => trackProductAdClick(type, 'items_top_cta')}
                                className="group flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-blue-50/40 px-4 py-4 transition-all hover:border-blue-200 hover:bg-blue-50 sm:px-5 sm:py-5"
                            >
                                <div className="min-w-0 flex-1">
                                    <p className="text-[11px] font-bold tracking-wider text-blue-600">
                                        {type === 'condition' ? '疾患名から選ぶ' : '姿勢から選ぶ'}
                                    </p>
                                    <p className="mt-1 text-sm font-black leading-snug text-slate-900 sm:text-base">
                                        {cfg.buttonLabel}
                                    </p>
                                </div>
                                <ArrowIcon className="h-4 w-4 flex-shrink-0 text-blue-600 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        );
                    })}
                </div>

                <p className="mt-3 text-center text-[11px] font-medium text-slate-400">
                    どちらも無料イラストはそのまま使えます
                </p>
            </div>
        </section>
    );
}
