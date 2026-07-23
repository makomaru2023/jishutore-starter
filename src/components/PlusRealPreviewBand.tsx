"use client";

import Image from "next/image";
import {
    formatYen,
    PLUS_PROMO_CURRENT_PRICE_YEN,
    PLUS_PROMO_DEADLINE_ISO,
    PLUS_PROMO_DEADLINE_LABEL,
    PLUS_PROMO_IS_ACTIVE,
    PLUS_PROMO_NEXT_PRICE_YEN,
} from "@/constants/plus-pricing";
import { PLUS_SLIDE_COUNT_PUBLIC } from "@/constants/public-counts";
import {
    TrackedProductCtaLink,
    type TrackedProductCtaLocation,
} from "@/components/TrackedProductCtaLink";

const PREVIEW_IMAGES = [
    {
        src: "/plus/previews/shoulder-raise.webp",
        alt: "肩挙上運動の編集できるPlusスライド",
    },
    {
        src: "/plus/previews/sit-to-stand-using-chair.webp",
        alt: "椅子からの立ち上がり運動の編集できるPlusスライド",
    },
    {
        src: "/plus/previews/chair-squat.webp",
        alt: "椅子スクワットの編集できるPlusスライド",
    },
] as const;

const BAND_FRAME_CLASSES = [
    "absolute left-0 top-4 z-10 aspect-video w-[72px] -rotate-3 overflow-hidden rounded-md border border-white bg-white shadow-md sm:left-1 sm:top-5 sm:w-[132px]",
    "absolute right-0 top-0 z-20 aspect-video w-[76px] rotate-2 overflow-hidden rounded-md border border-white bg-white shadow-md sm:w-[138px]",
    "absolute bottom-0 left-3 z-30 aspect-video w-[78px] -rotate-1 overflow-hidden rounded-md border border-white bg-white shadow-md sm:left-8 sm:w-[142px]",
] as const;

const RICH_FRAME_CLASSES = [
    "absolute left-0 top-7 z-10 aspect-video w-[68%] -rotate-3 overflow-hidden rounded-lg border-2 border-white bg-white shadow-lg",
    "absolute right-0 top-0 z-20 aspect-video w-[70%] rotate-2 overflow-hidden rounded-lg border-2 border-white bg-white shadow-lg",
    "absolute bottom-0 left-[14%] z-30 aspect-video w-[72%] -rotate-1 overflow-hidden rounded-lg border-2 border-white bg-white shadow-xl",
] as const;

const DESCRIPTION =
    "この素材の文字入りスライド版を、回数や文言を書き換えてそのまま印刷できます。";

export type PlusRealPreviewLocation = Exclude<
    TrackedProductCtaLocation,
    "home_hero_cta"
>;

interface PlusRealPreviewBandProps {
    variant: "band" | "rich";
    location: PlusRealPreviewLocation;
}

function PreviewHeading() {
    return (
        <>
            <span className="inline-block max-w-full">PowerPointで編集して、</span>
            <span className="inline-block max-w-full">このまま渡せます</span>
        </>
    );
}

function PreviewStack({ variant }: { variant: PlusRealPreviewBandProps["variant"] }) {
    const isRich = variant === "rich";
    const frameClasses = isRich ? RICH_FRAME_CLASSES : BAND_FRAME_CLASSES;

    return (
        <div
            className={
                isRich
                    ? "relative mx-auto h-[176px] w-full max-w-[400px] shrink-0 sm:h-[220px]"
                    : "relative h-[78px] w-[92px] shrink-0 sm:h-[94px] sm:w-[180px]"
            }
        >
            {PREVIEW_IMAGES.map((image, index) => (
                <div key={image.src} className={frameClasses[index]}>
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        loading="lazy"
                        sizes={
                            isRich
                                ? "(min-width: 768px) 280px, 64vw"
                                : "(min-width: 640px) 142px, 78px"
                        }
                        className="object-cover"
                    />
                </div>
            ))}
        </div>
    );
}

function PriceChips({ compact = false }: { compact?: boolean }) {
    const displayPrice = PLUS_PROMO_IS_ACTIVE
        ? PLUS_PROMO_CURRENT_PRICE_YEN
        : PLUS_PROMO_NEXT_PRICE_YEN;

    return (
        <>
            <span
                className={
                    compact
                        ? "inline-flex shrink-0 items-center rounded-full bg-blue-700 px-2 py-1 text-[10px] font-black leading-none text-white"
                        : "inline-flex items-center rounded-full bg-blue-700 px-3 py-1.5 text-xs font-black text-white"
                }
            >
                月額{formatYen(displayPrice)}
            </span>
            {PLUS_PROMO_IS_ACTIVE && (
                <time
                    dateTime={PLUS_PROMO_DEADLINE_ISO}
                    className={
                        compact
                            ? "inline-flex shrink-0 items-center rounded-full border border-amber-300 bg-amber-50 px-2 py-1 text-[10px] font-black leading-none text-amber-900"
                            : "inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-black text-amber-900"
                    }
                >
                    {compact
                        ? PLUS_PROMO_DEADLINE_LABEL
                        : `${PLUS_PROMO_DEADLINE_LABEL}の登録で据え置き`}
                </time>
            )}
        </>
    );
}

export function PlusRealPreviewBand({
    variant,
    location,
}: PlusRealPreviewBandProps) {
    if (variant === "band") {
        return (
            <section aria-label="自主トレ素材庫Plusの実物スライド">
                <TrackedProductCtaLink
                    location={location}
                    ariaLabel="自主トレ素材庫Plusの実物スライドを見る"
                    className="group block min-w-0 overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 via-white to-sky-50 shadow-sm transition hover:border-blue-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
                >
                    <div className="grid min-h-[100px] min-w-0 grid-cols-[92px_minmax(0,1fr)] items-center gap-3 px-3 py-2 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-5 sm:px-5 sm:py-4">
                        <PreviewStack variant="band" />

                        <div className="min-w-0">
                            <div className="flex min-w-0 items-center gap-1.5">
                                <span className="inline-flex shrink-0 items-center rounded-full bg-blue-100 px-2 py-1 text-[10px] font-black leading-none text-blue-700">
                                    Plus実物
                                </span>
                                <span className="hidden truncate text-[10px] font-bold text-slate-500 sm:inline">
                                    {PLUS_SLIDE_COUNT_PUBLIC}点の編集可能スライド
                                </span>
                                <span className="ml-auto inline-flex shrink-0 items-center gap-1 text-[11px] font-black text-blue-700 transition group-hover:translate-x-0.5 sm:text-xs">
                                    Plusを見る
                                    <span aria-hidden="true">→</span>
                                </span>
                            </div>

                            <h2 className="jp-heading mt-1 text-[13px] font-black leading-[1.45] text-slate-950 sm:text-base">
                                <PreviewHeading />
                            </h2>
                            <p className="sr-only sm:not-sr-only sm:mt-1 sm:block sm:truncate sm:text-xs sm:leading-5 sm:text-slate-600">
                                {DESCRIPTION}
                            </p>

                            <div className="mt-1.5 flex min-w-0 flex-wrap items-center gap-1.5">
                                <PriceChips compact />
                            </div>
                        </div>
                    </div>
                </TrackedProductCtaLink>
            </section>
        );
    }

    return (
        <section aria-label="自主トレ素材庫Plusの実物スライド">
            <TrackedProductCtaLink
                location={location}
                ariaLabel="自主トレ素材庫Plusの実物スライドを見る"
                className="group block min-w-0 overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-sky-50 shadow-sm transition hover:border-blue-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
            >
                <div className="grid min-w-0 gap-6 px-5 py-6 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:items-center md:px-8 md:py-8">
                    <PreviewStack variant="rich" />

                    <div className="min-w-0 text-center md:text-left">
                        <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-blue-700">
                                自主トレ素材庫Plus
                            </span>
                            <span className="rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-black text-blue-700">
                                {PLUS_SLIDE_COUNT_PUBLIC}点の実物スライド
                            </span>
                        </div>

                        <h2 className="jp-heading mt-4 text-2xl font-black leading-tight text-slate-950 sm:text-3xl">
                            <PreviewHeading />
                        </h2>
                        <p className="jp-text mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                            {DESCRIPTION}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                            <PriceChips />
                        </div>

                        <span className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-700 px-6 py-3 text-sm font-black text-white shadow-sm transition group-hover:bg-blue-800">
                            Plusを見る
                            <span aria-hidden="true">→</span>
                        </span>
                    </div>
                </div>
            </TrackedProductCtaLink>
        </section>
    );
}
