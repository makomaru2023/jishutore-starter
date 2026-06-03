'use client';

import Link from 'next/link';

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

export type ProductAdType = 'condition' | 'posture';

interface ProductAdConfig {
    label: string;
    title: string;
    description: string;
    href: string;
    price: string;
    buttonLabel: string;
    note: string;
    itemName: string;
}

export const PRODUCT_AD_CONFIG: Record<ProductAdType, ProductAdConfig> = {
    condition: {
        label: '資料セット',
        title: '疾患別に使えるPowerPoint資料もあります',
        description:
            '脳卒中・腰痛・膝OA・術後など、疾患ごとの自主トレ説明を時短したい方向け。無料イラストを1枚ずつ貼る時間がない方に、編集できる資料セットを用意しています。',
        href: '/products/self-training-materials/',
        price: '980円・買い切り',
        buttonLabel: '疾患別セットを見る',
        note: 'PowerPoint編集OK・PDF印刷用つき',
        itemName: '疾患別自主トレ資料セット',
    },
    posture: {
        label: '資料セット',
        title: '今できる姿勢から選べる資料もあります',
        description:
            '座位・立位・臥位など、利用者さんの状態に合わせて運動を選びたい方向け。訪問リハ・通所リハ・在宅高齢者の自主トレ指導に使いやすい資料セットです。',
        href: '/products/home-elderly-self-training/',
        price: '980円・買い切り',
        buttonLabel: '姿勢別セットを見る',
        note: 'PowerPoint編集OK・PDF印刷用つき',
        itemName: '姿勢別自主トレ指導資料セット',
    },
};

export type ProductAdLocation = 'items_inline_ad' | 'items_top_cta';

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
}

/**
 * /items/ グリッド内に挿入する自社商品広告カード。
 * グリッドのカラム数によらず1行全体を専有する（col-span-full）。
 */
export function ProductInlineAd({ type }: ProductInlineAdProps) {
    const cfg = PRODUCT_AD_CONFIG[type];

    return (
        <div className="col-span-full">
            <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col gap-5 px-5 py-6 sm:px-7 sm:py-7 md:flex-row md:items-center md:gap-8">
                    {/* 左ブロック: ラベル＋価格 */}
                    <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-2 md:w-44 md:flex-shrink-0">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                            {cfg.label}
                        </span>
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">¥980</span>
                            <span className="text-xs font-bold text-slate-400">買い切り</span>
                        </div>
                    </div>

                    {/* 中央: 見出し＋本文 */}
                    <div className="min-w-0 flex-1">
                        <h3 className="mb-2 text-base font-black leading-snug text-slate-900 sm:text-lg">
                            {cfg.title}
                        </h3>
                        <p className="text-sm font-medium leading-relaxed text-slate-600 break-keep">
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
                            onClick={() => trackProductAdClick(type, 'items_inline_ad')}
                            className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-md sm:w-auto"
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
