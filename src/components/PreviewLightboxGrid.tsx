'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

// 自動再生のフレーム間隔（ミリ秒）
const AUTOPLAY_MS = 1300;

const canHover = () =>
    typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;
const prefersReduced = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * カテゴリ1つ分を「めくれる1枚のカード」として表示する。
 * - PC: ホバー中だけ全ページを順に自動再生（離れると先頭に戻る）
 * - タッチ端末: 画面に入っている間だけ自動再生（ホバーが無いため）
 * - reduce motion 設定時は自動再生せず、ドット/クリックで操作
 * クリックすると、表示中のページで拡大ライトボックスを開く。
 */
function GroupCarouselCard({
    group,
    groupNumber,
    onOpen,
}: {
    group: PreviewGroup;
    groupNumber: number;
    onOpen: (src: string) => void;
}) {
    const items = group.items;
    const total = items.length;
    const [index, setIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const currentIndex = total > 0 && index < total ? index : 0;

    // 自動再生タイマー
    useEffect(() => {
        if (!playing || total <= 1) return;
        const id = setInterval(() => setIndex((i) => (i + 1) % total), AUTOPLAY_MS);
        return () => clearInterval(id);
    }, [playing, total]);

    // タッチ端末は画面内にある間だけ再生（PCはホバーで制御）
    useEffect(() => {
        const el = cardRef.current;
        if (!el || canHover() || prefersReduced()) return;
        const io = new IntersectionObserver(
            (entries) =>
                setPlaying(
                    !!entries[0]?.isIntersecting && entries[0].intersectionRatio > 0.5,
                ),
            { threshold: [0, 0.5, 1] },
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const handleEnter = () => {
        if (canHover() && !prefersReduced()) setPlaying(true);
    };
    const handleLeave = () => {
        if (canHover()) {
            setPlaying(false);
            setIndex(0);
        }
    };

    return (
        <div ref={cardRef} className="flex flex-col">
            {/* カテゴリ見出し */}
            <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600 text-[11px] font-black text-white">
                    {String(groupNumber).padStart(2, '0')}
                </span>
                <h3 className={`min-w-0 text-sm font-black text-slate-900 sm:text-base ${JP_HEADING}`}>
                    {group.title}
                </h3>
                <span className="ml-auto flex-shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                    全{total}ページ
                </span>
            </div>

            {/* めくれるカード */}
            <button
                type="button"
                onClick={() => onOpen(items[currentIndex]?.src ?? items[0].src)}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                aria-label={`${group.title}のサンプルを拡大（全${total}ページ）`}
                className="group relative block w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:border-blue-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
            >
                <div className="relative aspect-[16/9] w-full bg-slate-50">
                    {items.map((it, i) => (
                        <Image
                            key={it.src}
                            src={it.src}
                            alt={i === currentIndex ? `${group.title}｜${it.title}｜透かし入りサンプル` : ''}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className={`object-cover transition-opacity duration-500 ${
                                i === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                        />
                    ))}
                    <span className="absolute left-2 top-2 rounded-full bg-slate-900/70 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white">
                        透かし入りサンプル
                    </span>
                    <span className="absolute right-2 top-2 rounded-full bg-slate-900/70 px-2 py-0.5 text-[10px] font-bold tabular-nums text-white">
                        {currentIndex + 1}/{total}
                    </span>
                    <div className="pointer-events-none absolute inset-0 flex items-end justify-center p-3 transition-colors group-hover:bg-slate-900/10">
                        <span className="translate-y-2 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-black text-slate-700 opacity-0 shadow transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                            クリックで拡大
                        </span>
                    </div>
                </div>
            </button>

            {group.caption && (
                <p className={`mt-2.5 text-xs font-medium leading-relaxed text-slate-500 ${JP_WRAP}`}>
                    {group.caption}
                </p>
            )}

            {/* ページインジケーター（クリックでそのページへ） */}
            {total > 1 && (
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    {items.map((it, i) => (
                        <button
                            key={it.src}
                            type="button"
                            onClick={() => {
                                setPlaying(false);
                                setIndex(i);
                            }}
                            aria-label={`${i + 1}ページ目を表示`}
                            aria-current={i === currentIndex}
                            className={`h-2 rounded-full transition-all ${
                                i === currentIndex ? 'w-4 bg-blue-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

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
    display = 'grid',
}: {
    items?: PreviewItem[];
    groups?: PreviewGroup[];
    columns?: 2 | 3;
    /** groups 表示時のレイアウト。'carousel' はカテゴリごとに1枚のめくれるカードにする。 */
    display?: 'grid' | 'carousel';
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

    const openBySrc = (src: string) => setActiveIndex(indexBySrc.get(src) ?? null);

    return (
        <>
            {display === 'carousel' && groups && groups.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                    {groups.map((group, gi) => (
                        <GroupCarouselCard
                            key={group.title}
                            group={group}
                            groupNumber={gi + 1}
                            onOpen={openBySrc}
                        />
                    ))}
                </div>
            ) : groups && groups.length > 0 ? (
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
