'use client';

import Link from 'next/link';
import { PLUS_SLIDE_COUNT_PUBLIC } from '@/constants/public-counts';
import { PRODUCT_AD_CONFIG } from '@/components/ProductInlineAd';

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

// Plusの価格・遷移先は広告コピーの単一ソース（PRODUCT_AD_CONFIG）を再利用し、
// 値上げ（8月〜¥680 等）の更新漏れを防ぐ。
const PLUS_HREF = PRODUCT_AD_CONFIG.plus.href;
const PLUS_PRICE = PRODUCT_AD_CONFIG.plus.price;
const PLUS_PRICE_NOTE = PRODUCT_AD_CONFIG.plus.priceNote;
const BUY_ONCE_HREF = '/products/';

type PlusCtaClick = 'plus_primary' | 'buyonce_secondary';

function trackClick(target: PlusCtaClick, itemSlug: string) {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
    try {
        window.gtag('event', 'plus_context_cta_click', {
            location: 'item_detail',
            target,
            item_slug: itemSlug,
        });
    } catch {
        // GA4未設定でもエラーにしない
    }
}

function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6 21 12m0 0-7.5 6M21 12H3" />
        </svg>
    );
}

interface ItemDetailPlusCtaProps {
    /** 素材の表示名（【文字あり】等のタグを除いたもの）例: 杖歩き */
    itemTitle: string;
    /** 素材ID（GA計測用） */
    itemSlug: string;
    /** 対応するPlusスライドの回数めやす（あれば表示） 例: 10回×2セット */
    plusReps?: string;
}

/**
 * 素材詳細ページの「主役」有料CTA。
 * 無料PNG（このページ）と、Plusの編集できるスライド版の差を見せ、
 * この素材そのものがPlusに収録されている文脈で誘導する。
 * 買い切り資料は主張を抑えた副導線として1行だけ添える。
 */
export function ItemDetailPlusCta({ itemTitle, itemSlug, plusReps }: ItemDetailPlusCtaProps) {
    return (
        <section className="overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-sm">
            <div className="border-b border-blue-100 bg-blue-50/50 px-5 py-3 sm:px-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                    自主トレ素材庫Plus
                </span>
            </div>

            <div className="px-5 py-6 sm:px-6">
                <h3 className="text-base font-bold leading-snug text-slate-900 sm:text-lg">
                    「{itemTitle}」の説明資料、毎回ゼロから作っていませんか？
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 break-keep">
                    このイラストは、Plusでは説明文・回数つきの<strong className="font-bold text-slate-800">編集できるスライド</strong>として収録されています。文字も回数も書き換えて、そのまま印刷・配布できます。
                </p>

                {/* 無料 → Plus の差 */}
                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-stretch">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                        <p className="text-xs font-bold text-slate-500">無料（このページ）</p>
                        <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">
                            PNG画像 1枚<br />
                            <span className="text-slate-500">画像内の文字は固定</span>
                        </p>
                    </div>
                    <div className="hidden items-center justify-center text-blue-400 sm:flex" aria-hidden="true">
                        <ArrowIcon className="h-5 w-5" />
                    </div>
                    <div className="rounded-xl border border-blue-200 bg-blue-50/60 px-4 py-3">
                        <p className="text-xs font-bold text-blue-700">Plus</p>
                        <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">
                            編集できるスライド<br />
                            <span className="text-slate-600">説明文・回数を書き換え／最大10点を1ファイルにまとめてDL</span>
                        </p>
                    </div>
                </div>

                {plusReps && (
                    <p className="mt-3 text-xs font-medium text-slate-500">
                        この素材の目安：<span className="font-bold text-slate-700">{plusReps}</span>（Plusでは書き換え可）
                    </p>
                )}

                <Link
                    href={PLUS_HREF}
                    onClick={() => trackClick('plus_primary', itemSlug)}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-md"
                >
                    Plusでこの素材を編集して使う
                    <ArrowIcon className="h-4 w-4" />
                </Link>
                <p className="mt-2 text-center text-xs font-medium text-slate-500">
                    {PLUS_PRICE}（{PLUS_PRICE_NOTE}）・全{PLUS_SLIDE_COUNT_PUBLIC}点＋毎月追加
                </p>

                <p className="mt-4 border-t border-slate-100 pt-4 text-center text-xs leading-relaxed text-slate-500">
                    単発でよければ、疾患別・姿勢別の
                    <Link
                        href={BUY_ONCE_HREF}
                        onClick={() => trackClick('buyonce_secondary', itemSlug)}
                        className="mx-0.5 font-bold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-500"
                    >
                        買い切り資料（¥980）
                    </Link>
                    もあります。
                </p>
            </div>
        </section>
    );
}
