'use client';

import { useState } from "react";
import Image from "next/image";
import { trackLineClick } from "@/lib/analytics";

/**
 * LINE友だち追加バナー（再利用コンポーネント）
 * 特典の中身をタグ表示 + クリックでウォーターマーク付きプレビュー
 */

type TokutenItem = {
    label: string;
    preview: string;
    ready: boolean;
};

const LINE_SVG_PATH = "M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314";

const tokutenRow1: TokutenItem[] = [
    { label: "自主トレする理由 説明スライド", preview: "/line-tokuten/previews/jishutore-reason.jpg", ready: true },
    { label: "カレンダー式チェックシート", preview: "/line-tokuten/previews/jishutore-checksheet.jpg", ready: true },
    { label: "転倒予防チェックリスト", preview: "/line-tokuten/previews/fall-prevention-checklist.jpg", ready: true },
];

const tokutenRow2: TokutenItem[] = [
    { label: "お薬・リハビリ記録ノート", preview: "/line-tokuten/previews/medicine-rehab-record-weekly.jpg", ready: true },
    { label: "退院後の生活Q&A集", preview: "/line-tokuten/previews/post-discharge-qa.jpg", ready: true },
    { label: "腰痛 自主トレメニュー（Plus収録サンプル）", preview: "/line-tokuten/previews/low-back-pain-jishutore.jpg", ready: true },
];

function LineIcon({ className }: { className: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="#06C755">
            <path d={LINE_SVG_PATH} />
        </svg>
    );
}

function LineIconWhite({ className }: { className: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
            <path d={LINE_SVG_PATH} />
        </svg>
    );
}

export function LineBanner() {
    const [preview, setPreview] = useState<TokutenItem | null>(null);

    return (
        <>
            <section className="py-6 sm:py-8 px-4 sm:px-8 rounded-2xl relative overflow-hidden" style={{ backgroundColor: '#06C755' }}>
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.06)', transform: 'translate(40%, -40%)' }}></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.06)', transform: 'translate(-40%, 40%)' }}></div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    {/* 上段：見出し + ボタン */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-4">
                        <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white flex items-center justify-center shadow-lg">
                            <LineIcon className="w-9 h-9 sm:w-10 sm:h-10" />
                        </div>

                        <div className="flex-1 text-center sm:text-left">
                            <h3 className="text-lg sm:text-xl font-black text-white leading-tight mb-2">
                                退院後も自主トレを続けてもらう<span style={{ color: '#FDE047' }}>「7点セット」</span>を無料配布
                            </h3>
                            <p className="text-xs sm:text-sm font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>
                                現役リハビリ職が現場で使っている患者配布資料。印刷してそのまま渡せます。
                            </p>
                        </div>

                        <div className="flex-shrink-0 hidden sm:block">
                            <a
                                href="https://lin.ee/79a5bNt"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackLineClick('tokuten_banner')}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white font-black text-base rounded-full hover:scale-105 transition-all shadow-lg whitespace-nowrap"
                                style={{ color: '#06C755' }}
                            >
                                <LineIcon className="w-5 h-5" />
                                LINEで受け取る（無料）
                            </a>
                        </div>
                    </div>

                    {/* NEW：プロンプト工房（無料版） */}
                    <div className="mb-2 flex flex-wrap justify-center gap-2 sm:justify-start">
                        <span
                            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black text-white"
                            style={{ backgroundColor: 'rgba(255,255,255,0.28)' }}
                        >
                            <span
                                className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-black tracking-wider"
                                style={{ backgroundColor: '#FDE047', color: '#1f2937' }}
                            >
                                NEW
                            </span>
                            <span aria-hidden="true">🛠</span>
                            伝わるプロンプト工房（無料版）も使える
                        </span>
                    </div>

                    {/* 特典タグ 1列目 */}
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-2">
                        {tokutenRow1.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => setPreview(item)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-white cursor-pointer hover:scale-105 transition-all"
                                style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}
                                title="クリックでプレビュー"
                            >
                                <span style={{ color: '#FDE047' }}>✓</span> {item.label}
                            </button>
                        ))}
                    </div>

                    {/* 特典タグ 2列目 */}
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-3">
                        {tokutenRow2.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => setPreview(item)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-white cursor-pointer hover:scale-105 transition-all"
                                style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}
                                title="クリックでプレビュー"
                            >
                                <span style={{ color: '#FDE047' }}>✓</span> {item.label}
                            </button>
                        ))}
                    </div>

                    {/* プラスαの特典 */}
                    <div className="flex flex-wrap justify-center sm:justify-start gap-x-3 gap-y-1 mb-4 sm:mb-3 text-xs font-bold" style={{ color: 'rgba(255,255,255,0.95)' }}>
                        <span className="inline-flex items-center gap-1">
                            <span style={{ color: '#FDE047' }}>＋</span>
                            新作イラストをLINEでお知らせ
                        </span>
                        <span className="inline-flex items-center gap-1">
                            <span style={{ color: '#FDE047' }}>＋</span>
                            欲しい体操をリクエストOK
                        </span>
                    </div>

                    {/* モバイル用ボタン */}
                    <div className="sm:hidden text-center">
                        <a
                            href="https://lin.ee/79a5bNt"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackLineClick('tokuten_banner')}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white font-black text-base rounded-full hover:scale-105 transition-all shadow-lg"
                            style={{ color: '#06C755' }}
                        >
                            <LineIcon className="w-5 h-5" />
                            LINEで受け取る（無料）
                        </a>
                    </div>
                </div>
            </section>

            {/* プレビューモーダル */}
            {preview && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={() => setPreview(null)}
                >
                    <div
                        className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[85vh] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* ヘッダー */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                            <div>
                                <p className="font-black text-slate-900 text-sm">{preview.label}</p>
                                <p className="text-xs text-slate-400 font-medium">
                                    {preview.ready ? "サンプルプレビュー" : "準備中"}
                                </p>
                            </div>
                            <button
                                onClick={() => setPreview(null)}
                                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-slate-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* プレビュー画像 */}
                        <div className="overflow-y-auto max-h-[55vh] bg-slate-50">
                            <Image
                                src={preview.preview}
                                alt={`${preview.label} プレビュー`}
                                width={600}
                                height={848}
                                className="w-full h-auto"
                                style={{ objectFit: 'contain' }}
                            />
                        </div>

                        {/* CTA */}
                        <div className="px-5 py-4 text-center border-t border-slate-100">
                            <a
                                href="https://lin.ee/79a5bNt"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackLineClick('tokuten_banner')}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-black text-white text-sm rounded-full hover:scale-105 transition-all shadow-md w-full"
                                style={{ backgroundColor: '#06C755' }}
                            >
                                <LineIconWhite className="w-5 h-5" />
                                LINE友だち追加で無料ダウンロード
                            </a>
                            <p className="text-xs text-slate-400 mt-2 font-medium">
                                ブロックはいつでも可能です
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
