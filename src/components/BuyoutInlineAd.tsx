'use client';

import Link from 'next/link';
import {
    BUYOUT_PRICE_YEN,
    BUYOUT_PRODUCTS,
    getOtherBuyoutProduct,
    type BuyoutProductId,
} from '@/lib/buyout-match';
import { formatYen } from '@/constants/plus-pricing';

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

const PRICE_LABEL = formatYen(BUYOUT_PRICE_YEN);

/**
 * 素材一覧に置く、買い切り2商品（疾患別9本セット・姿勢別セット／各980円）の案内枠。
 * ================================================================
 * ★2026-09-05 新設。素材一覧の自社広告は ProductInlineAd（Plus）1種類しかなく、
 *   Plusの新規受付停止中は一覧から有料導線が丸ごと消えていた。
 *   受付停止フラグ（PLUS_SIGNUP_PAUSED）はそのまま維持したうえで、
 *   販売中の買い切り商品だけを別条件で出せるようにする。
 *
 * 【置き方の約束】
 *   - 1つの一覧に1枠だけ。「さらに24件見る」で追加される素材の直前に置く
 *   - 素材の閲覧を、広告のクリック・閉じる操作・待ち時間の条件にしない
 *   - 同じページで他のバナーと重ねない
 *   - 手動検索中は出さない（探している最中に割り込まない）
 *
 * 【文言の約束】
 *   ⚠ 一覧に並んでいる無料イラストがセットに収録されている、とは書かない。
 *     セットは別に作った完成資料で、無料素材との対応関係はない。
 *     「無料PNG」と「完成済みのPowerPoint」の違いを示すだけにとどめる。
 */

/** どちらのセットを主役にするか。両方から選んでもらうときは 'both'。 */
export type BuyoutAdFocus = BuyoutProductId | 'both';

type Target = 'buyout_primary' | 'buyout_secondary';

function trackClick(productId: BuyoutProductId, target: Target, location: string) {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
    const product = BUYOUT_PRODUCTS[productId];
    try {
        // ★既存の買い切り計測（ItemDetailBuyoutCta）と同じイベント名・パラメータ名にそろえる。
        //   新しいイベントを増やさずに、location で設置場所を見分ける。
        window.gtag('event', 'product_cta_click', {
            location,
            target,
            label: product.name,
            url: product.href,
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

const LEAD: Record<BuyoutProductId, string> = {
    disease: '疾患名から選びたいときは、疾患別の9本セットがあります。',
    posture: '姿勢から選びたいときは、姿勢別のセットがあります。',
};

export function BuyoutInlineAd({
    focus,
    location = 'items_inline_buyout',
}: {
    focus: BuyoutAdFocus;
    location?: string;
}) {
    const isBoth = focus === 'both';
    const primary = isBoth ? null : BUYOUT_PRODUCTS[focus];
    const secondary = primary ? getOtherBuyoutProduct(primary) : null;

    return (
        <div className="col-span-full min-w-0 max-w-full">
            <div className="min-w-0 max-w-full rounded-2xl border border-blue-100 bg-blue-50/40 px-5 py-5 sm:px-6">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                        買い切り{PRICE_LABEL}
                    </span>
                    <span className="text-xs font-bold text-blue-700">PowerPoint／編集・印刷配布OK</span>
                </div>

                <p className="jp-text mt-3 text-sm font-bold leading-relaxed text-slate-800">
                    {isBoth
                        ? '説明の文章まで入った完成資料もあります。'
                        : LEAD[(primary as { id: BuyoutProductId }).id]}
                </p>
                <p className="jp-text mt-1.5 text-sm leading-relaxed text-slate-600">
                    ここに並ぶ素材は、文字を自分で足して使う無料のPNGです。手順・回数・注意点まで書かれた完成済みのPowerPointは、買い切り{PRICE_LABEL}でご用意しています。月額はありません。
                </p>

                {isBoth ? (
                    <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                        {(['disease', 'posture'] as const).map((id) => (
                            <Link
                                key={id}
                                href={BUYOUT_PRODUCTS[id].href}
                                onClick={() => trackClick(id, 'buyout_primary', location)}
                                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-center text-sm font-bold text-white transition-colors hover:bg-blue-500"
                            >
                                {BUYOUT_PRODUCTS[id].name}
                                <ArrowIcon className="h-4 w-4 shrink-0" />
                            </Link>
                        ))}
                    </div>
                ) : (
                    <>
                        <Link
                            href={primary!.href}
                            onClick={() => trackClick(primary!.id, 'buyout_primary', location)}
                            className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-500 sm:w-auto"
                        >
                            {primary!.name}の中身を見る
                            <ArrowIcon className="h-4 w-4 shrink-0" />
                        </Link>
                        <p className="mt-3 text-xs leading-relaxed text-slate-500">
                            {primary!.id === 'disease' ? '姿勢から選びたいときは' : '疾患名から選びたいときは'}
                            <Link
                                href={secondary!.href}
                                onClick={() => trackClick(secondary!.id, 'buyout_secondary', location)}
                                className="mx-1 font-bold text-blue-700 underline underline-offset-2 hover:text-blue-600"
                            >
                                {secondary!.name}（{PRICE_LABEL}）
                            </Link>
                            もあります。
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
