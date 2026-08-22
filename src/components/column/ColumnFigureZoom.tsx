"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

/**
 * コラム本文の図解を、タップ／クリックで拡大表示する。
 *
 * ★図解は文字が多く、スマホの幅だと本文中では読めない（2026-08-23・ユーザー指摘）。
 *   そこで「開く」だけでなく **拡大と移動** まで持たせている。中身はSVGなので、
 *   何倍に伸ばしても字はぼやけない。
 *
 * 操作：
 * - 開く＝図をタップ／クリック（キーボードは Enter・Space。button なので既定で効く）
 * - 閉じる＝Esc・背景・✕
 * - 拡大＝＋ / − ボタン、ダブルタップ、2本指のピンチ
 * - 移動＝そのままスワイプ（タッチ）／ドラッグ（マウス）
 *
 * ★倍率は「コンテナ幅に対する割合」で持つ。1 = 画面にちょうど収まる状態。
 *   px で持つと端末幅ごとに意味が変わるため。
 */

/**
 * ★倍率の基準は「図の全体が見えている状態」＝ fit（表示上の100%）。
 *   コンテナ幅いっぱいを基準にすると、縦長の図がPCで縦にはみ出す。
 *   内部で持つ scale は「コンテナ幅に対する割合」なので、fit は1より小さくなることがある。
 */
/** fit の何倍まで拡げられるか */
const MAX_ZOOM = 5;
/** ＋ / − の刻み（fit 比）。細かすぎると押す回数が増え、粗いと読みたい大きさを飛ばす */
const STEP_ZOOM = 0.5;
/** ダブルタップで飛ぶ倍率（fit 比）。スマホでだいたい読める大きさ */
const DOUBLE_TAP_ZOOM = 2.5;

export function ColumnFigureZoom({
    src,
    alt,
    caption,
    width,
    height,
}: {
    src: string;
    alt: string;
    caption?: string;
    width: number;
    height: number;
}) {
    const [open, setOpen] = useState(false);
    /** 図の全体が見えるときの scale。開いたときに実測して入れる */
    const [fit, setFit] = useState(1);
    const [scale, setScale] = useState(1);
    const scrollRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const openerRef = useRef<HTMLButtonElement>(null);

    const clamp = useCallback(
        (v: number) => Math.min(fit * MAX_ZOOM, Math.max(fit, v)),
        [fit],
    );
    /** 画面に出す倍率。fit を100%とする */
    const shownPercent = Math.round((scale / fit) * 100);

    const openViewer = useCallback(() => {
        setOpen(true);
        trackEvent("column_figure_zoom", { figure: src });
    }, [src]);

    const close = useCallback(() => setOpen(false), []);

    // Esc で閉じる・背景のスクロールを止める・閉じたら元のボタンへフォーカスを戻す
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
            else if (e.key === "+" || e.key === "=") setScale((s) => clamp(s + fit * STEP_ZOOM));
            else if (e.key === "-") setScale((s) => clamp(s - fit * STEP_ZOOM));
        };
        document.addEventListener("keydown", onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        closeRef.current?.focus();
        // 閉じたときに戻すフォーカス先は、開いた時点のボタンを控えておく
        const opener = openerRef.current;
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
            opener?.focus();
        };
    }, [open, close, clamp, fit]);

    const prevScale = useRef(1);
    const centerAt = useRef<number | null>(null);

    // ★開いたときに fit と初期倍率を実測して決める。
    //   fit ＝ 図の全体が収まる倍率（縦長の図はここで1より小さくなる）。
    //   初期倍率 ＝ 図が本来描かれている幅（800px）。ただし fit を下回らせない。
    //   等倍で開くと、スマホでは本文で見たときと同じ大きさになり、開く意味が無いため。
    //   画面の広いPCでは fit のほうが大きくなるので、全体が見えた状態で開く。
    useEffect(() => {
        if (!open) return;
        const el = scrollRef.current;
        if (!el) return;
        const cs = getComputedStyle(el);
        const contentW =
            el.clientWidth - parseFloat(cs.paddingLeft || "0") - parseFloat(cs.paddingRight || "0");
        const contentH =
            el.clientHeight - parseFloat(cs.paddingTop || "0") - parseFloat(cs.paddingBottom || "0");
        if (contentW <= 0 || contentH <= 0) return;
        // scale=1 のときの高さは contentW * (height / width)
        const nextFit = Math.min(1, contentH / (contentW * (height / width)));
        const initial = Math.max(nextFit, width / contentW);
        setFit(nextFit);
        prevScale.current = initial;
        // 中央寄せは幅が実際に変わってからでないと効かない（scrollWidth が古いままになる）。
        // ★倍率を控えておいて、その倍率で描き終わった回に寄せる。rAF では早すぎた。
        centerAt.current = initial;
        setScale(initial);
    }, [open, width, height]);

    // 開いた直後の1回だけ、横位置を中央に置く
    useEffect(() => {
        const el = scrollRef.current;
        if (!open || !el || centerAt.current === null || scale !== centerAt.current) return;
        centerAt.current = null;
        el.scrollLeft = Math.max(0, (el.scrollWidth - el.clientWidth) / 2);
    }, [open, scale]);

    // 拡大したぶんは、見ていた中心をなるべく保ったままにする
    useEffect(() => {
        const el = scrollRef.current;
        if (!el || prevScale.current === scale) return;
        const ratio = scale / prevScale.current;
        const cx = el.scrollLeft + el.clientWidth / 2;
        const cy = el.scrollTop + el.clientHeight / 2;
        prevScale.current = scale;
        requestAnimationFrame(() => {
            el.scrollLeft = cx * ratio - el.clientWidth / 2;
            el.scrollTop = cy * ratio - el.clientHeight / 2;
        });
    }, [scale]);

    // マウスでのドラッグ移動。拡大していないときは何もしない
    const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
    const onPointerDown = (e: React.PointerEvent) => {
        if (e.pointerType === "touch" || scale <= fit) return;
        const el = scrollRef.current;
        if (!el) return;
        drag.current = { x: e.clientX, y: e.clientY, left: el.scrollLeft, top: el.scrollTop };
        el.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: React.PointerEvent) => {
        const el = scrollRef.current;
        if (!el || !drag.current) return;
        el.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
        el.scrollTop = drag.current.top - (e.clientY - drag.current.y);
    };
    const endDrag = (e: React.PointerEvent) => {
        const el = scrollRef.current;
        if (el?.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
        drag.current = null;
    };

    // 2本指のピンチ。1本指のときは既定のスクロール（＝移動）に任せる
    const pinch = useRef<{ dist: number; scale: number } | null>(null);
    const distanceOf = (t: React.TouchList) =>
        Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
    const onTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 2) pinch.current = { dist: distanceOf(e.touches), scale };
    };
    const onTouchMove = (e: React.TouchEvent) => {
        if (e.touches.length !== 2 || !pinch.current) return;
        e.preventDefault();
        const next = clamp(pinch.current.scale * (distanceOf(e.touches) / pinch.current.dist));
        setScale(Number(next.toFixed(2)));
    };
    const onTouchEnd = (e: React.TouchEvent) => {
        if (e.touches.length < 2) pinch.current = null;
    };

    const toggleZoom = () => setScale((s) => (s > fit ? fit : clamp(fit * DOUBLE_TAP_ZOOM)));

    const label = caption ?? alt.slice(0, 40);

    return (
        <>
            <button
                ref={openerRef}
                type="button"
                onClick={openViewer}
                aria-label={`図解を拡大して表示：${label}`}
                className="group block w-full cursor-zoom-in overflow-hidden rounded-xl border border-slate-200 bg-white transition-colors hover:border-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
            >
                <div className="p-3 sm:p-4">
                    <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full" />
                </div>
                {/* ★押せることが分かるようにする。図の上に重ねると文字を隠すので、下に帯で置く。
                    タッチ端末はホバーが無いので常に出したままにする。 */}
                <span className="flex items-center justify-center gap-1.5 border-t border-slate-100 bg-slate-50 px-3 py-2 text-[11px] font-bold text-slate-500 transition-colors group-hover:bg-blue-50 group-hover:text-blue-700">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.2}
                        stroke="currentColor"
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6"
                        />
                    </svg>
                    拡大して見る
                </span>
            </button>

            {open && (
                <div
                    className="fixed inset-0 z-[9999] flex flex-col bg-slate-900/95 backdrop-blur-sm"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`図解の拡大表示：${label}`}
                    onClick={close}
                >
                    {/* 操作バー */}
                    <div
                        className="flex flex-shrink-0 items-center gap-2 border-b border-white/10 px-3 py-2.5 sm:px-5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <p className="jp-text min-w-0 flex-1 truncate text-xs font-bold text-white/90 sm:text-sm">
                            {label}
                        </p>
                        <div className="flex flex-shrink-0 items-center gap-1.5">
                            <button
                                type="button"
                                onClick={() => setScale((s) => clamp(s - fit * STEP_ZOOM))}
                                disabled={scale <= fit}
                                aria-label="縮小"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 disabled:opacity-30"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                </svg>
                            </button>
                            <span className="w-12 text-center text-xs font-bold tabular-nums text-white/80">
                                {shownPercent}%
                            </span>
                            <button
                                type="button"
                                onClick={() => setScale((s) => clamp(s + fit * STEP_ZOOM))}
                                disabled={scale >= fit * MAX_ZOOM}
                                aria-label="拡大"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 disabled:opacity-30"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                                </svg>
                            </button>
                            <button
                                ref={closeRef}
                                type="button"
                                onClick={close}
                                aria-label="閉じる"
                                className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* 図。拡大したぶんは、この枠の中をスクロールして見る */}
                    <div
                        ref={scrollRef}
                        className={`flex-1 overflow-auto overscroll-contain p-3 sm:p-6 ${
                            scale > fit ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
                        }`}
                        onClick={(e) => e.stopPropagation()}
                        onDoubleClick={toggleZoom}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={endDrag}
                        onPointerCancel={endDrag}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        {/* 全体が見えているときだけ中央に置く。拡大中に中央寄せすると端が掴めなくなる */}
                        <div className={scale > fit ? "" : "flex h-full items-center justify-center"}>
                            <div style={{ width: `${scale * 100}%` }} className="mx-auto">
                                <Image
                                    src={src}
                                    alt={alt}
                                    width={width}
                                    height={height}
                                    className="h-auto w-full select-none rounded-lg bg-white"
                                    draggable={false}
                                />
                            </div>
                        </div>
                    </div>

                    <p
                        className="flex-shrink-0 px-4 pb-3 text-center text-[11px] leading-5 text-white/50"
                        onClick={(e) => e.stopPropagation()}
                    >
                        ダブルタップまたは2本指で拡大できます。閉じるには背景をタップするか Esc を押してください。
                    </p>
                </div>
            )}
        </>
    );
}
