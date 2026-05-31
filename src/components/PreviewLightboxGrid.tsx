'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

export interface PreviewItem {
    /** カード見出し（例：座位でできる自主トレ／1ページ目 など） */
    title: string;
    /** 補足キャプション（例：立位が不安定な方にも使いやすい例） */
    caption?: string;
    /** public 配下の画像パス（例：/products/.../previews/sitting-01.webp） */
    src: string;
}

/** カテゴリ単位でまとめたプレビュー群（例：座位 / 立位 / 臥位…） */
export interface PreviewGroup {
    /** カテゴリ見出し（例：座位でできる自主トレ） */
    title: string;
    /** カテゴリの補足（例：椅子に座って行える運動メニュー） */
    caption?: string;
    /** このカテゴリのプレビュー画像 */
    items: PreviewItem[];
}

// 本文用 / 見出し用の日本語タイポグラフィ（globals.css の共通方針）
const JP_WRAP = 'jp-text';
const JP_HEADING = 'jp-heading';

// ライトボックスで前後移動するための、グループ名つきフラットリスト要素
interface FlatItem extends PreviewItem {
    /** 属するカテゴリ名（グループ表示時のみ。フラット表示では undefined） */
    groupTitle?: string;
}

const colClassFor = (columns: 2 | 3) =>
    columns === 2
        ? 'grid-cols-1 sm:grid-cols-2'
        : 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3';

/**
 * 透かし入りプレビュー画像のグリッド。クリックで拡大（ライトボックス）表示する。
 * - items: 単一グリッド表示（従来どおり）
 * - groups: カテゴリごとに見出し付きでまとめて表示
 * いずれの場合も、ライトボックスでは全画像を前後に行き来できる。
 * 表示する画像は呼び出し側（サーバー側）で存在確認済みのものだけを受け取る前提。
 */
export function PreviewLightboxGrid({
    items,
    groups,
    columns = 3,
}: {
    items?: PreviewItem[];
    groups?: PreviewGroup[];
    columns?: 2 | 3;
}) {
    // ライトボックス用に全画像を表示順でフラット化する
    const flat = useMemo<FlatItem[]>(() => {
        if (groups && groups.length > 0) {
            return groups.flatMap((group) =>
                group.items.map((item) => ({ ...item, groupTitle: group.title })),
            );
        }
        return (items ?? []).map((item) => ({ ...item }));
    }, [items, groups]);

    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const active = activeIndex === null ? null : flat[activeIndex] ?? null;

    const close = useCallback(() => setActiveIndex(null), []);
    const showPrev = useCallback(
        () => setActiveIndex((i) => (i === null ? i : (i - 1 + flat.length) % flat.length)),
        [flat.length],
    );
    const showNext = useCallback(
        () => setActiveIndex((i) => (i === null ? i : (i + 1) % flat.length)),
        [flat.length],
    );

    // モーダル表示中は Esc で閉じ、矢印キーで前後移動、背景スクロールを抑止する
    useEffect(() => {
        if (activeIndex === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
            else if (e.key === 'ArrowLeft') showPrev();
            else if (e.key === 'ArrowRight') showNext();
        };
        document.addEventListener('keydown', onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [activeIndex, close, showPrev, showNext]);

    const colClass = colClassFor(columns);

    // src からフラットリスト上の位置を引くためのマップ
    const indexBySrc = useMemo(() => {
        const map = new Map<string, number>();
        flat.forEach((item, i) => map.set(item.src, i));
        return map;
    }, [flat]);

    const renderCard = (item: PreviewItem) => (
        <button
            key={item.src}
            type="button"
            onClick={() => setActiveIndex(indexBySrc.get(item.src) ?? null)}
            className="group flex max-w-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm transition-all hover:border-blue-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
        >
            <div className="relative aspect-[16/9] w-full max-w-full overflow-hidden bg-slate-50">
                <Image
                    src={item.src}
                    alt={`${item.title}｜透かし入りサンプル`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute left-2 top-2 rounded-full bg-slate-900/70 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white">
                    透かし入りサンプル
                </span>
            </div>
            <div className="border-t border-slate-100 px-3 py-2.5 sm:px-4 sm:py-3">
                <h3 className={`text-xs font-black text-slate-900 sm:text-sm ${JP_HEADING}`}>
                    {item.title}
                </h3>
                {item.caption && (
                    <p className={`mt-1 text-xs font-medium leading-relaxed text-slate-500 ${JP_WRAP}`}>
                        {item.caption}
                    </p>
                )}
            </div>
        </button>
    );

    return (
        <>
            {groups && groups.length > 0 ? (
                <div className="space-y-10 sm:space-y-12">
                    {groups.map((group, gi) => (
                        <div key={group.title}>
                            <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-b border-slate-100 pb-3">
                                <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600 text-xs font-black text-white">
                                    {String(gi + 1).padStart(2, '0')}
                                </span>
                                <h3 className={`text-base font-black text-slate-900 sm:text-lg ${JP_HEADING}`}>
                                    {group.title}
                                </h3>
                                {group.caption && (
                                    <span className={`text-xs font-medium text-slate-500 ${JP_WRAP}`}>
                                        {group.caption}
                                    </span>
                                )}
                                <span className="ml-auto rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-500">
                                    全{group.items.length}ページ
                                </span>
                            </div>
                            <div className={`grid gap-3 sm:gap-5 ${colClass}`}>
                                {group.items.map(renderCard)}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={`grid gap-3 sm:gap-5 ${colClass}`}>
                    {(items ?? []).map(renderCard)}
                </div>
            )}

            {active && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
                    onClick={close}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${active.title} 拡大プレビュー`}
                >
                    {/* 前へ */}
                    {flat.length > 1 && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                showPrev();
                            }}
                            aria-label="前のサンプル"
                            className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-lg transition-colors hover:bg-white sm:left-5"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                    )}

                    <div
                        className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-3">
                            <p className={`min-w-0 text-sm font-black text-slate-900 ${JP_WRAP}`}>
                                {active.groupTitle ? `${active.groupTitle}｜` : ''}
                                {active.title}
                                {active.caption ? `｜${active.caption}` : ''}
                            </p>
                            <div className="flex flex-shrink-0 items-center gap-3">
                                {flat.length > 1 && (
                                    <span className="text-xs font-bold tabular-nums text-slate-400">
                                        {(activeIndex ?? 0) + 1} / {flat.length}
                                    </span>
                                )}
                                <button
                                    type="button"
                                    onClick={close}
                                    aria-label="閉じる"
                                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 transition-colors hover:bg-slate-200"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4 text-slate-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="bg-slate-50">
                            <Image
                                src={active.src}
                                alt={`${active.title} 拡大サンプル`}
                                width={1280}
                                height={720}
                                className="h-auto w-full max-w-full"
                            />
                        </div>
                        <p className="px-5 py-3 text-center text-xs leading-relaxed text-slate-500">
                            透かし入りプレビューです。購入後のPowerPoint・PDFファイルには透かしは入りません。
                        </p>
                    </div>

                    {/* 次へ */}
                    {flat.length > 1 && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                showNext();
                            }}
                            aria-label="次のサンプル"
                            className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-lg transition-colors hover:bg-white sm:right-5"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    )}
                </div>
            )}
        </>
    );
}
