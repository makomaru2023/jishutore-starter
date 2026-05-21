'use client';

import { useState } from 'react';
import Image from 'next/image';

interface PreviewItem {
    slug: string;
    label: string;
}

const PREVIEWS: PreviewItem[] = [
    { slug: 'parkinsons', label: 'パーキンソン病' },
    { slug: 'frozen-shoulder', label: '五十肩' },
    { slug: 'hip-replacement', label: '人工股関節（術後）' },
    { slug: 'compression-fracture', label: '圧迫骨折後' },
    { slug: 'femur-fracture', label: '大腿骨骨折（術後）' },
    { slug: 'stroke-upper', label: '脳卒中 上肢' },
    { slug: 'stroke-lower', label: '脳卒中 下肢' },
    { slug: 'low-back-pain', label: '腰痛' },
    { slug: 'knee-oa-tka', label: '膝OA・TKA' },
];

const SRC_PREFIX = '/preview/self-training-materials';

export function SelfTrainingPreviewGallery() {
    const [active, setActive] = useState<PreviewItem | null>(null);

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
            <h2 className="mb-3 text-lg font-black text-slate-900">中身のサンプル（クリックで拡大）</h2>
            <p className="mb-4 text-xs leading-relaxed text-slate-500">
                各疾患から 1 ページずつ抜粋しています。<strong className="text-slate-700">サンプル透かしは購入後のファイルには入りません</strong>。
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {PREVIEWS.map((item) => (
                    <button
                        key={item.slug}
                        type="button"
                        onClick={() => setActive(item)}
                        className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition-all hover:border-blue-300 hover:shadow-md"
                    >
                        <div className="relative aspect-[16/9] w-full overflow-hidden bg-white">
                            <Image
                                src={`${SRC_PREFIX}/${item.slug}.jpg`}
                                alt={`${item.label} プレビュー`}
                                fill
                                sizes="(min-width: 640px) 33vw, 50vw"
                                className="object-cover transition-transform group-hover:scale-105"
                            />
                        </div>
                        <span className="border-t border-slate-200 px-2.5 py-2 text-center text-xs font-bold text-slate-700">
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>

            {active && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
                    onClick={() => setActive(null)}
                >
                    <div
                        className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
                            <p className="text-sm font-black text-slate-900">{active.label} ／ サンプルプレビュー</p>
                            <button
                                type="button"
                                onClick={() => setActive(null)}
                                aria-label="閉じる"
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 transition-colors hover:bg-slate-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4 text-slate-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="bg-slate-50">
                            <Image
                                src={`${SRC_PREFIX}/${active.slug}.jpg`}
                                alt={`${active.label} 拡大プレビュー`}
                                width={1200}
                                height={675}
                                className="h-auto w-full"
                            />
                        </div>
                        <p className="px-5 py-3 text-center text-xs text-slate-500">
                            購入後のファイルは透かしのない高解像度版です。
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
}
