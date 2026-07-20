"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PLUS_SLIDE_COUNT_PUBLIC } from "@/constants/public-counts";

export type PlusPreviewItem = {
    src: string;
    title: string;
    caption: string;
};

type PlusEvidenceSectionsProps = {
    previews: readonly PlusPreviewItem[];
    hasLibraryScreen: boolean;
    hasPptEditingScreen: boolean;
    hasSample: boolean;
};

const SAMPLE_DOWNLOAD_PATH = "/images/plus/sample.pptx";

function MissingImage({ label }: { label: string }) {
    return (
        <div className="flex aspect-[16/10] w-full items-center justify-center bg-slate-100 px-5 text-center">
            <p className="text-sm font-bold text-slate-500">{label}の画面イメージを準備中です</p>
        </div>
    );
}

function DownloadVisual({ previews }: { previews: readonly PlusPreviewItem[] }) {
    const [primaryPreview, ...secondaryPreviews] = previews.slice(0, 3);

    if (!primaryPreview) {
        return <MissingImage label="PowerPoint" />;
    }

    return (
        <div className="grid aspect-[16/10] grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] gap-2 bg-slate-100 p-3 sm:gap-3 sm:p-4">
            <div className="min-w-0 self-center overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
                <Image
                    src={primaryPreview.src}
                    alt={`${primaryPreview.title}のPowerPoint完成スライド例`}
                    width={1200}
                    height={675}
                    sizes="(max-width: 639px) 55vw, (max-width: 1023px) 48vw, 30vw"
                    className="h-auto w-full object-contain"
                />
            </div>
            <div className="flex min-w-0 flex-col justify-center gap-2 sm:gap-3">
                {secondaryPreviews.map((preview) => (
                    <div
                        key={preview.src}
                        className="min-w-0 overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm"
                    >
                        <Image
                            src={preview.src}
                            alt={`${preview.title}のPowerPoint完成スライド例`}
                            width={1200}
                            height={675}
                            sizes="(max-width: 639px) 34vw, (max-width: 1023px) 30vw, 19vw"
                            className="h-auto w-full object-contain"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function PlusHowItWorks({
    previews,
    hasLibraryScreen,
    hasPptEditingScreen,
    hasSample,
}: PlusEvidenceSectionsProps) {
    const steps = [
        {
            number: "01",
            title: `${PLUS_SLIDE_COUNT_PUBLIC}点から選ぶ`,
            body: "部位やキーワードから検索し、対象者に合う運動スライドを選択します。",
            visual: hasLibraryScreen ? (
                <Image
                    src="/images/plus/library-screen.jpg"
                    alt="自主トレ素材庫Plusのライブラリで運動スライドを選択している画面"
                    width={1265}
                    height={645}
                    sizes="(max-width: 639px) 92vw, (max-width: 1023px) 90vw, 640px"
                    className="h-auto w-full object-contain"
                />
            ) : (
                <MissingImage label="ライブラリ" />
            ),
        },
        {
            number: "02",
            title: "1つのPowerPointでダウンロード",
            body: "選んだスライドを1つのファイルにまとめて、そのまま保存できます。",
            visual: <DownloadVisual previews={previews} />,
        },
        {
            number: "03",
            title: "文字を自由に編集して配布",
            body: "回数・運動のポイントはすべて編集できます。確認後、印刷や説明に使えます。",
            visual: hasPptEditingScreen ? (
                <Image
                    src="/images/plus/ppt-editing.png"
                    alt="自主トレ素材庫Plusの実際の収録スライドで回数を編集するPowerPoint画面イメージ"
                    width={1280}
                    height={720}
                    sizes="(max-width: 639px) 92vw, (max-width: 1023px) 90vw, 490px"
                    className="h-auto w-full object-contain"
                />
            ) : (
                <MissingImage label="PowerPoint編集" />
            ),
        },
    ];

    return (
        <section id="how-it-works" className="scroll-mt-20 border-y border-slate-200 bg-slate-50 py-10 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-xs font-bold tracking-widest text-blue-700">HOW TO USE</p>
                    <h2 className="jp-heading mt-3 text-2xl font-black text-slate-950 sm:text-3xl">
                        3ステップで、対象者に合う資料ができる
                    </h2>
                    <p className="jp-text mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                        探して貼り付ける作業を減らし、必要なページを選ぶところから始められます。
                    </p>
                </div>

                <ol className="mx-auto mt-8 grid max-w-5xl gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-2">
                    {steps.map((step) => (
                        <li
                            key={step.number}
                            className={`${step.number === "01" ? "lg:col-span-2 lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)]" : ""} min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm`}
                        >
                            <div
                                className={`${step.number === "01" ? "lg:border-b-0 lg:border-r" : ""} border-b border-slate-100`}
                            >
                                {step.visual}
                            </div>
                            <div className="flex items-start gap-3 p-4 sm:p-5 lg:block lg:self-center lg:p-6">
                                <p className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-black tracking-tight text-blue-700 lg:h-auto lg:w-auto lg:rounded-none lg:bg-transparent lg:tracking-widest">
                                    <span className="lg:hidden">{step.number}</span>
                                    <span className="hidden lg:inline">STEP {step.number}</span>
                                </p>
                                <div className="min-w-0">
                                    <h3 className="jp-heading text-base font-black leading-6 text-slate-950 sm:text-lg lg:mt-2 lg:leading-7">{step.title}</h3>
                                    <p className="jp-text mt-1.5 text-sm leading-6 text-slate-600 sm:leading-7 lg:mt-2">{step.body}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>

                <div className="mx-auto mt-8 max-w-2xl border-t border-slate-200 pt-8 text-center">
                    <h3 className="jp-heading text-lg font-black text-slate-950 sm:text-xl">
                        まずは無料サンプルで編集感を確かめる
                    </h3>
                    <p className="jp-text mt-2 text-sm leading-6 text-slate-600">
                        実際のPowerPointを開き、文字や回数を変更してお試しいただけます。
                    </p>
                    <div className="mt-5 flex justify-center">
                        {hasSample ? (
                            <a
                                href={SAMPLE_DOWNLOAD_PATH}
                                download="自主トレ素材庫Plus_無料サンプル.pptx"
                                className="inline-flex w-full items-center justify-center rounded-lg border-2 border-blue-600 bg-white px-6 py-3 text-sm font-bold text-blue-700 transition-colors hover:bg-blue-50 sm:w-auto"
                            >
                                無料サンプルをダウンロード
                            </a>
                        ) : (
                            // TODO: public/images/plus/sample.pptx の配置後、上のダウンロードリンクへ自動で切り替わります。
                            <span
                                aria-disabled="true"
                                className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-lg border-2 border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-400 sm:w-auto"
                            >
                                無料サンプルを準備中
                            </span>
                        )}
                    </div>
                    <p className="mt-3 text-xs text-slate-500">スライド3枚入り・会員登録不要・文字や回数を編集できます</p>
                </div>
            </div>
        </section>
    );
}

export function PlusPreviewGallery({ previews }: { previews: readonly PlusPreviewItem[] }) {
    const [activePreview, setActivePreview] = useState<PlusPreviewItem | null>(null);

    useEffect(() => {
        if (!activePreview) return;

        const previousOverflow = document.body.style.overflow;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setActivePreview(null);
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [activePreview]);

    return (
        <section className="py-10 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-xs font-bold tracking-widest text-blue-700">収録イメージ</p>
                    <h2 className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">
                        こんなスライドを組み合わせられます
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                        画像を押すと拡大できます。収録スライドは継続して追加しています。
                    </p>
                </div>

                <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
                    {previews.map((preview, index) => (
                        <figure
                            key={preview.src}
                            className={`${index >= 2 ? "hidden sm:block" : ""} min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm`}
                        >
                            <button
                                type="button"
                                onClick={() => setActivePreview(preview)}
                                className="group block w-full cursor-zoom-in border-b border-slate-100 bg-white text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-600"
                                aria-label={`${preview.title}のスライドを拡大表示`}
                            >
                                <Image
                                    src={preview.src}
                                    alt={`${preview.title}の収録スライド`}
                                    width={1200}
                                    height={675}
                                    sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 390px"
                                    className="h-auto w-full transition-transform duration-200 group-hover:scale-[1.02]"
                                />
                            </button>
                            <figcaption className="p-4">
                                <p className="text-sm font-black text-slate-900">{preview.title}</p>
                                <p className="mt-1 text-xs leading-5 text-slate-600">{preview.caption}</p>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>

            {activePreview && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${activePreview.title}の拡大画像`}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-8"
                >
                    <button
                        type="button"
                        onClick={() => setActivePreview(null)}
                        className="absolute inset-0 cursor-default bg-slate-950/85"
                        aria-label="拡大表示を閉じる"
                    />
                    <div className="relative z-10 w-full max-w-6xl overflow-hidden rounded-lg bg-white shadow-2xl">
                        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
                            <p className="min-w-0 truncate text-sm font-bold text-slate-900">{activePreview.title}</p>
                            <button
                                type="button"
                                onClick={() => setActivePreview(null)}
                                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-2xl leading-none text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                                aria-label="閉じる"
                            >
                                ×
                            </button>
                        </div>
                        <div className="max-h-[calc(100dvh-7rem)] overflow-auto bg-slate-100 p-2 sm:p-4">
                            <Image
                                src={activePreview.src}
                                alt={`${activePreview.title}の拡大スライド`}
                                width={1200}
                                height={675}
                                sizes="100vw"
                                priority
                                className="mx-auto h-auto w-full max-w-[1200px]"
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
