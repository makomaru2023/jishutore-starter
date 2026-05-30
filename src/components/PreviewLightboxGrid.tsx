'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export interface PreviewItem {
    /** カード見出し（例：座位でできる自主トレ） */
    title: string;
    /** 補足キャプション（例：立位が不安定な方にも使いやすい例） */
    caption?: string;
    /** public 配下の画像パス（例：/products/.../previews/sitting-01.webp） */
    src: string;
}

// 本文用 / 見出し用の日本語タイポグラフィ（globals.css の共通方針）
const JP_WRAP = 'jp-text';
const JP_HEADING = 'jp-heading';

/**
 * 透かし入りプレビュー画像のグリッド。クリックで拡大（ライトボックス）表示する。
 * 表示する画像は呼び出し側（サーバー側）で存在確認済みのものだけを受け取る前提。
 */
export function PreviewLightboxGrid({
    items,
    columns = 3,
}: {
    items: PreviewItem[];
    columns?: 2 | 3;
}) {
    const [active, setActive] = useState<PreviewItem | null>(null);

    // モーダル表示中は Esc で閉じ、背景スクロールを抑止する
    useEffect(() => {
        if (!active) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setActive(null);
        };
        document.addEventListener('keydown', onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [active]);

    const colClass =
        columns === 2
            ? 'grid-cols-1 sm:grid-cols-2'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

    return (
        <>
            <div className={`grid gap-4 sm:gap-5 ${colClass}`}>
                {items.map((item) => (
                    <button
                        key={item.src}
                        type="button"
                        onClick={() => setActive(item)}
                        className="group flex max-w-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm transition-all hover:border-blue-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
                    >
                        <div className="relative aspect-[16/9] w-full max-w-full overflow-hidden bg-slate-50">
                            <Image
                                src={item.src}
                                alt={`${item.title}｜透かし入りサンプル`}
                                fill
                                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <span className="absolute left-2 top-2 rounded-full bg-slate-900/70 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white">
                                透かし入りサンプル
                            </span>
                        </div>
                        <div className="border-t border-slate-100 px-4 py-3">
                            <h3 className={`text-sm font-black text-slate-900 ${JP_HEADING}`}>
                                {item.title}
                            </h3>
                            {item.caption && (
                                <p className={`mt-1 text-xs font-medium leading-relaxed text-slate-500 ${JP_WRAP}`}>
                                    {item.caption}
                                </p>
                            )}
                        </div>
                    </button>
                ))}
            </div>

            {active && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
                    onClick={() => setActive(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${active.title} 拡大プレビュー`}
                >
                    <div
                        className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-3">
                            <p className={`text-sm font-black text-slate-900 ${JP_WRAP}`}>
                                {active.title}
                                {active.caption ? `｜${active.caption}` : ''}
                            </p>
                            <button
                                type="button"
                                onClick={() => setActive(null)}
                                aria-label="閉じる"
                                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 transition-colors hover:bg-slate-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4 text-slate-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="bg-slate-50">
                            <Image
                                src={active.src}
                                alt={`${active.title} 拡大サンプル`}
                                width={1200}
                                height={675}
                                className="h-auto w-full max-w-full"
                            />
                        </div>
                        <p className="px-5 py-3 text-center text-xs leading-relaxed text-slate-500">
                            透かし入りプレビューです。購入後のPowerPoint・PDFファイルには透かしは入りません。
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
