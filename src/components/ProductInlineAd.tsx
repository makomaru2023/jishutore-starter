'use client';

import Link from 'next/link';
import {
    FEE_CHECK_DOMAIN_COUNT,
    FEE_CHECK_ITEM_COUNT,
    PLUS_SLIDE_COUNT_PUBLIC,
} from '@/constants/public-counts';
import {
    formatYen,
    PLUS_PROMO_CURRENT_PRICE_YEN,
} from '@/constants/plus-pricing';

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

export type ProductAdType = 'plus';

interface ProductAdConfig {
    label: string;
    title: string;
    description: string;
    href: string;
    price: string;
    priceNote: string;
    buttonLabel: string;
    note: string;
    itemName: string;
}

export const PRODUCT_AD_CONFIG: Record<ProductAdType, ProductAdConfig> = {
    plus: {
        label: '自主トレ素材庫Plus',
        title: '資料づくりも、算定確認も、Plusひとつで',
        description:
            `${PLUS_SLIDE_COUNT_PUBLIC}点の編集できる運動スライド、疾患別・姿勢別の完成デッキ、伝わるプロンプト工房、全${FEE_CHECK_DOMAIN_COUNT}分野・${FEE_CHECK_ITEM_COUNT}項目の診療・介護報酬チェックを利用できます。`,
        href: '/products/jishutore-plus/',
        price: `月額${formatYen(PLUS_PROMO_CURRENT_PRICE_YEN)}`,
        priceNote: 'いつでも解約OK',
        buttonLabel: 'Plusの内容を見る',
        note: 'PowerPoint編集・完成デッキ・会員ツール・報酬チェック',
        itemName: '自主トレ素材庫Plus',
    },
};

export type ProductAdLocation = 'items_inline_ad' | 'item_detail_bottom_ad' | 'items_top_cta' | 'items_top_bundle_cta';

export function trackProductAdClick(type: ProductAdType, location: ProductAdLocation) {
    if (typeof window === 'undefined') return;
    if (typeof window.gtag !== 'function') return;
    const cfg = PRODUCT_AD_CONFIG[type];
    try {
        window.gtag('event', 'product_ad_click', {
            item_name: cfg.itemName,
            location,
            destination: cfg.href,
        });
    } catch {
        // GA4未設定でもエラーにしない
    }
}

const ArrowIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6 21 12m0 0-7.5 6M21 12H3" />
    </svg>
);

interface ProductInlineAdProps {
    type: ProductAdType;
    location?: ProductAdLocation;
}

/**
 * /items/ グリッド内に挿入する自社商品広告カード。
 * グリッドのカラム数によらず1行全体を専有する（col-span-full）。
 */
export function ProductInlineAd({ type, location = 'items_inline_ad' }: ProductInlineAdProps) {
    const cfg = PRODUCT_AD_CONFIG[type];

    return (
        <div className="col-span-full min-w-0 max-w-full">
            <div className="min-w-0 max-w-full rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col gap-5 px-5 py-6 sm:px-7 sm:py-7 md:flex-row md:items-center md:gap-8">
                    {/* 左ブロック: ラベル＋価格 */}
                    <div className="flex min-w-0 flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3 md:w-44 md:flex-shrink-0 md:flex-col md:items-start md:gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                            {cfg.label}
                        </span>
                        <div className="flex min-w-0 flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                            <span className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">{cfg.price}</span>
                            <span className="text-xs font-bold leading-5 text-slate-400">{cfg.priceNote}</span>
                        </div>
                    </div>

                    {/* 中央: 見出し＋本文 */}
                    <div className="min-w-0 flex-1">
                        <h3 className="mb-2 text-base font-black leading-snug text-slate-900 sm:text-lg">
                            {cfg.title}
                        </h3>
                        <p className="jp-text text-sm font-medium leading-relaxed text-slate-600">
                            {cfg.description}
                        </p>
                        <p className="mt-2 text-xs font-bold text-slate-500">
                            {cfg.note}
                        </p>
                    </div>

                    {/* 右ブロック: CTA */}
                    <div className="md:flex-shrink-0">
                        <Link
                            href={cfg.href}
                            onClick={() => trackProductAdClick(type, location)}
                            className="inline-flex max-w-full w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-center text-sm font-bold leading-5 text-white shadow-sm shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-md sm:w-auto sm:whitespace-nowrap"
                        >
                            {cfg.buttonLabel}
                            <ArrowIcon className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
