'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
    BUYOUT_PRICE_YEN,
    getOtherBuyoutProduct,
    type BuyoutMatch,
} from '@/lib/buyout-match';
import { formatYen } from '@/constants/plus-pricing';

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

const PRICE_LABEL = formatYen(BUYOUT_PRICE_YEN);

function trackClick(match: BuyoutMatch, target: 'buyout_primary' | 'buyout_preview' | 'buyout_secondary') {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
    try {
        window.gtag('event', 'product_cta_click', {
            location: 'item_detail_buyout',
            target,
            label: match.product.name,
            url: match.product.href,
            deck: match.deckLabel,
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

interface ItemDetailBuyoutCtaProps {
    /** 素材の表示名（【文字あり】等のタグを除いたもの）例: 杖歩き */
    itemTitle: string;
    /** 素材ID（GA計測用） */
    itemSlug: string;
    /** サーバー側で決めた、この素材に近い買い切り商品 */
    match: BuyoutMatch;
}

/**
 * 素材詳細ページの有料CTA（買い切り版）。
 * --------------------------------------------------------------
 * ★2026-08-28 新設。Plusの新規受付停止中に表示する主役CTA。
 *   8/20に再開した買い切り2商品（各¥980）へ、素材の文脈から片方だけを出す。
 *   もう一方はカード下部に1行だけ添える（両方を並べると選べなくなるため）。
 *
 * ⚠ この無料イラストそのものがセットに収録されているとは書かないこと。
 *   セットは別に作った完成資料で、無料素材との対応関係はない。
 *   「同じ場面で使う、完成済みの資料がある」という言い方に留める。
 *
 * 遷移先はStripeではなく商品ページ。透かし入りの全ページプレビューを
 * 見てもらってから決済に進む方が、無料ページからの直行より無理がない。
 */
export function ItemDetailBuyoutCta({ itemTitle, itemSlug, match }: ItemDetailBuyoutCtaProps) {
    const { product, deckLabel, previewSrc } = match;
    const other = getOtherBuyoutProduct(product);
    const isDisease = product.id === 'disease';

    const lead = isDisease
        ? `この素材は「${deckLabel}」の方によく使われます。疾患別9本セットには、${deckLabel}を含む9疾患ぶんの説明資料（全108ページ）が、編集できるPowerPointで入っています。`
        : `「${deckLabel}」としてまとめた完成資料があります。座位・立位・臥位など、その方が今できる姿勢から選んで、そのまま渡せます。`;

    const benefits = [
        '手順・回数・注意点まで書かれた、完成済みの資料です',
        'PowerPointで回数や文言を書き換えて、そのまま印刷・配布できます',
        `買い切り${PRICE_LABEL}。月額はなく、追加料金もかかりません`,
    ];

    return (
        <section className="overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-sm">
            <div className="flex flex-wrap items-center gap-2 border-b border-blue-100 bg-blue-50/50 px-5 py-3 sm:px-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                    {product.name}
                </span>
                <span className="text-xs font-bold text-blue-700">買い切り{PRICE_LABEL}</span>
            </div>

            <div className="px-5 py-6 sm:px-6">
                <h3 className="break-keep text-base font-bold leading-snug text-slate-900 sm:text-lg">
                    「{itemTitle}」の説明資料、毎回ゼロから作っていませんか？
                </h3>
                <p className="mt-2 break-keep text-sm leading-relaxed text-slate-600">{lead}</p>

                <figure className="mt-4">
                    <Link
                        href={product.href}
                        onClick={() => trackClick(match, 'buyout_preview')}
                        aria-label={`${product.name}に収録されている「${deckLabel}」の中身を見る`}
                        className="group relative block overflow-hidden rounded-xl border border-blue-100 bg-slate-50 shadow-sm transition hover:border-blue-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                        <Image
                            src={previewSrc}
                            alt={`${product.name}に収録されている「${deckLabel}」の資料（透かし入りプレビュー）`}
                            width={1200}
                            height={675}
                            loading="lazy"
                            sizes="(min-width: 1024px) 368px, (min-width: 768px) calc(50vw - 144px), calc(100vw - 136px)"
                            className="h-auto w-full transition duration-300 group-hover:scale-[1.01]"
                        />
                        <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-3 py-1 text-[11px] font-bold text-white shadow-sm">
                            {deckLabel}
                        </span>
                    </Link>
                    <figcaption className="mt-2 text-xs font-medium leading-relaxed text-slate-500">
                        実物の1ページ目です。商品ページで全ページを透かし入りで公開しています。
                    </figcaption>
                </figure>

                <ol className="mt-4 space-y-2.5" aria-label={`${product.name}の内容`}>
                    {benefits.map((benefit, index) => (
                        <li key={benefit} className="flex items-start gap-3 text-sm leading-relaxed text-slate-700">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[11px] font-black text-blue-700" aria-hidden="true">
                                {index + 1}
                            </span>
                            <span>{benefit}</span>
                        </li>
                    ))}
                </ol>

                <Link
                    href={product.href}
                    onClick={() => trackClick(match, 'buyout_primary')}
                    data-item-slug={itemSlug}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-md"
                >
                    {product.name}の中身を見る
                    <ArrowIcon className="h-4 w-4" />
                </Link>
                <p className="mt-2 text-center text-xs font-medium text-slate-500">
                    買い切り{PRICE_LABEL}・PowerPoint編集OK・印刷配布OK
                </p>

                <p className="mt-4 border-t border-slate-100 pt-4 text-center text-xs leading-relaxed text-slate-500">
                    {isDisease ? '姿勢から選びたいときは' : '疾患名から選びたいときは'}、
                    <Link
                        href={other.href}
                        onClick={() => trackClick(match, 'buyout_secondary')}
                        className="font-bold text-blue-700 underline underline-offset-2 hover:text-blue-600"
                    >
                        {other.name}（{PRICE_LABEL}）
                    </Link>
                    もあります。
                </p>
            </div>
        </section>
    );
}
