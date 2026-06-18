"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Slide = { src: string; title: string };

const SLIDES: Slide[] = [
    { src: "/products/slide-prompt-generator/samples/positioning-01.webp", title: "ポジショニングとは何か？" },
    { src: "/products/slide-prompt-generator/samples/positioning-02.webp", title: "なぜポジショニングが必要なのか？" },
    { src: "/products/slide-prompt-generator/samples/positioning-03.webp", title: "良いポジショニングの原則" },
    { src: "/products/slide-prompt-generator/samples/positioning-04.webp", title: "臥位ポジショニングのポイント" },
    { src: "/products/slide-prompt-generator/samples/positioning-05.webp", title: "座位ポジショニングのポイント" },
    { src: "/products/slide-prompt-generator/samples/positioning-06.webp", title: "よくあるNGのポジショニング" },
    { src: "/products/slide-prompt-generator/samples/positioning-07.webp", title: "現場で実践するためのポイント" },
];

const AUTOPLAY_MS = 1300;
const TOTAL = SLIDES.length;

function ChevronLeft() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-6 w-6" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
    );
}
function ChevronRight() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-6 w-6" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
    );
}
function CloseIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-5 w-5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    );
}

export function SampleSlideGallery() {
    const [index, setIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [open, setOpen] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const prefersReduced = useCallback(
        () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        []
    );

    const go = useCallback((dir: number) => setIndex((i) => (i + dir + TOTAL) % TOTAL), []);

    // 自動再生のタイマー（モーダルを開いている間は停止）
    useEffect(() => {
        if (!playing || open) return;
        const id = setInterval(() => setIndex((i) => (i + 1) % TOTAL), AUTOPLAY_MS);
        return () => clearInterval(id);
    }, [playing, open]);

    // タッチ端末（ホバー不可）は、画面に入ったら自動再生
    useEffect(() => {
        const el = cardRef.current;
        if (!el || typeof window === "undefined") return;
        if (window.matchMedia("(hover: hover)").matches) return; // PCはホバーで制御
        if (prefersReduced()) return;
        const io = new IntersectionObserver(
            (entries) => setPlaying(entries[0]?.isIntersecting && entries[0].intersectionRatio > 0.5),
            { threshold: [0, 0.5, 1] }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [prefersReduced]);

    // モーダル：キー操作・スクロールロック
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
            else if (e.key === "ArrowRight") go(1);
            else if (e.key === "ArrowLeft") go(-1);
        };
        window.addEventListener("keydown", onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [open, go]);

    const handleEnter = () => {
        if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches && !prefersReduced()) {
            setPlaying(true);
        }
    };
    const handleLeave = () => {
        if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
            setPlaying(false);
            setIndex(0);
        }
    };

    return (
        <div className="mx-auto max-w-3xl">
            {/* プレビューカード */}
            <div ref={cardRef}>
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    onMouseEnter={handleEnter}
                    onMouseLeave={handleLeave}
                    aria-label={`サンプルスライドを拡大表示（全${TOTAL}枚）`}
                    className="group relative block w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                    <div className="relative aspect-[16/9] w-full bg-slate-100">
                        {SLIDES.map((s, i) => (
                            <Image
                                key={s.src}
                                src={s.src}
                                alt={i === index ? s.title : ""}
                                fill
                                sizes="(min-width: 768px) 768px, 100vw"
                                className={`object-cover transition-opacity duration-500 ${i === index ? "opacity-100" : "opacity-0"}`}
                            />
                        ))}
                        <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-slate-900/0 p-4 transition-colors group-hover:bg-slate-900/10">
                            <span className="translate-y-2 rounded-full bg-white/95 px-4 py-2 text-xs font-black text-slate-700 opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                タップ／クリックで全{TOTAL}枚を拡大
                            </span>
                        </div>
                    </div>
                </button>

                {/* インジケーター（クリックで該当スライドへ） */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                    {SLIDES.map((s, i) => (
                        <button
                            key={s.src}
                            type="button"
                            onClick={() => {
                                setPlaying(false);
                                setIndex(i);
                            }}
                            aria-label={`${i + 1}枚目：${s.title}`}
                            aria-current={i === index}
                            className={`h-2.5 rounded-full transition-all ${
                                i === index ? "w-6 bg-blue-600" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                            }`}
                        />
                    ))}
                </div>

                <p className="mt-3 text-center text-sm font-bold text-slate-700 break-keep">
                    <span className="text-blue-600">{index + 1}</span>
                    <span className="text-slate-400"> / {TOTAL}</span>
                    <span className="mx-2 text-slate-300">｜</span>
                    {SLIDES[index].title}
                </p>
            </div>

            {/* 拡大モーダル */}
            {open && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="サンプルスライド拡大表示"
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-[60] flex flex-col bg-slate-950/90 p-4 backdrop-blur-sm sm:p-6"
                >
                    <div className="flex items-center justify-between px-1 pb-3 text-white" onClick={(e) => e.stopPropagation()}>
                        <span className="text-sm font-bold">
                            {index + 1} / {TOTAL}
                        </span>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            aria-label="閉じる"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                        >
                            <CloseIcon />
                        </button>
                    </div>

                    <div className="flex flex-1 items-center justify-center" onClick={(e) => e.stopPropagation()}>
                        <div className="relative w-full max-w-5xl">
                            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-800 shadow-2xl">
                                <Image
                                    src={SLIDES[index].src}
                                    alt={SLIDES[index].title}
                                    fill
                                    sizes="(min-width: 1024px) 960px, 100vw"
                                    className="object-contain"
                                />
                            </div>
                            <p className="mt-3 text-center text-sm font-bold text-white/90 break-keep">{SLIDES[index].title}</p>

                            <button
                                type="button"
                                onClick={() => go(-1)}
                                aria-label="前のスライド"
                                className="absolute left-1 top-[calc(50%-1rem)] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg transition hover:bg-white sm:-left-4"
                            >
                                <ChevronLeft />
                            </button>
                            <button
                                type="button"
                                onClick={() => go(1)}
                                aria-label="次のスライド"
                                className="absolute right-1 top-[calc(50%-1rem)] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg transition hover:bg-white sm:-right-4"
                            >
                                <ChevronRight />
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center gap-2 overflow-x-auto px-1 pt-4" onClick={(e) => e.stopPropagation()}>
                        {SLIDES.map((s, i) => (
                            <button
                                key={s.src}
                                type="button"
                                onClick={() => setIndex(i)}
                                aria-label={`${i + 1}枚目を表示`}
                                className={`relative h-11 w-[72px] flex-shrink-0 overflow-hidden rounded-md border-2 transition ${
                                    i === index ? "border-blue-400" : "border-transparent opacity-50 hover:opacity-90"
                                }`}
                            >
                                <Image src={s.src} alt="" fill sizes="72px" className="object-cover" />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
