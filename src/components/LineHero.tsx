'use client';

import { useState } from "react";
import Image from "next/image";

/**
 * トップページ用 LINE特典セクション（大）
 * 5点セットの各項目をクリックでプレビュー表示
 */

type TokutenItem = {
    label: string;
    preview: string;
    ready: boolean;
};

const LINE_SVG_PATH = "M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314";

const tokutenList: TokutenItem[] = [
    { label: "「自主トレする理由」説明スライド", preview: "/line-tokuten/previews/jishutore-reason.jpg", ready: true },
    { label: "カレンダー式チェックシート", preview: "/line-tokuten/previews/jishutore-checksheet.jpg", ready: true },
    { label: "転倒予防チェックリスト", preview: "/line-tokuten/previews/fall-prevention-checklist.jpg", ready: true },
    { label: "お薬・リハビリ記録ノート", preview: "/line-tokuten/previews/medicine-rehab-record-weekly.jpg", ready: true },
    { label: "退院後の生活Q&A集", preview: "/line-tokuten/previews/post-discharge-qa.jpg", ready: true },
    { label: "腰痛 自主トレメニュー（資料セットサンプル）", preview: "/line-tokuten/previews/low-back-pain-jishutore.jpg", ready: true },
];

function LineIconWhite({ className }: { className: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
            <path d={LINE_SVG_PATH} />
        </svg>
    );
}

export function LineHero() {
    const [preview, setPreview] = useState<TokutenItem | null>(null);

    return (
        <>
            <section id="line" className="py-16 sm:py-20 relative overflow-hidden" style={{ backgroundColor: '#06C755' }}>
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.05)', transform: 'translate(50%, -50%)' }}></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.05)', transform: 'translate(-50%, 50%)' }}></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="mx-auto max-w-5xl lg:flex lg:items-center lg:gap-12">
                        {/* 左側: LINEアイコン */}
                        <div className="lg:w-2/5 mb-8 lg:mb-0 flex justify-center">
                            <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-3xl flex flex-col items-center justify-center p-6 shadow-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4">
                                    <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#06C755">
                                        <path d={LINE_SVG_PATH} />
                                    </svg>
                                </div>
                                <p className="text-white font-black text-lg text-center leading-tight">退院後も<br />続けてもらう<br />6点セット</p>
                            </div>
                        </div>

                        {/* 右側: テキスト＋特典リスト＋ボタン */}
                        <div className="lg:w-3/5 text-center lg:text-left">
                            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight mb-4">
                                <span className="block sm:inline">退院後も自主トレを</span>
                                <span className="block sm:inline">続けてもらう</span>
                                <span className="block sm:inline">
                                    <span style={{ color: '#FDE047' }}>「6点セット」</span>を無料配布中
                                </span>
                            </h2>
                            <p className="font-medium mb-6 text-sm sm:text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
                                現役リハビリ職が現場で使っている患者配布資料。
                                <br />
                                <span className="font-black" style={{ color: '#FDE047' }}>
                                    有料9本セットから「腰痛 自主トレメニュー」のサンプルも追加！
                                </span>
                                <br />
                                LINE友だち追加で、今すぐ全部もらえます。
                                <br />
                                <span className="text-xs" style={{ color: '#FDE047' }}>
                                    ↓ クリックでプレビュー
                                </span>
                            </p>

                            <div className="space-y-2 mb-6">
                                {tokutenList.map((item, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => setPreview(item)}
                                        className="w-full flex items-center gap-3 rounded-xl px-4 py-2.5 max-w-lg mx-auto lg:mx-0 cursor-pointer hover:scale-[1.02] hover:bg-white/20 transition-all text-left"
                                        style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                                        title="クリックでプレビュー"
                                    >
                                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FDE047' }}>
                                            <span className="text-xs font-black" style={{ color: '#166534' }}>{i + 1}</span>
                                        </div>
                                        <span className="text-white font-bold text-sm flex-1">{item.label}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-white/70 flex-shrink-0">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 9-3 3m0 0-3-3m3 3V2.25M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    </button>
                                ))}
                            </div>

                            {/* さらに使える、LINE登録ならではの特典 */}
                            <div className="rounded-xl p-4 mb-8 max-w-lg mx-auto lg:mx-0" style={{ backgroundColor: 'rgba(0,0,0,0.15)', border: '1px dashed rgba(255,255,255,0.3)' }}>
                                <p className="text-xs font-black mb-3 tracking-wider" style={{ color: '#FDE047' }}>
                                    ＋ LINE登録ならではの特典
                                </p>
                                <div className="space-y-2.5">
                                    <div className="flex items-start gap-2.5 text-white text-sm font-bold leading-snug">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#FDE047' }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                                        </svg>
                                        <span>新作イラストが追加されたらLINEでお知らせ</span>
                                    </div>
                                    <div className="flex items-start gap-2.5 text-white text-sm font-bold leading-snug">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#FDE047' }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                        </svg>
                                        <span>「こんな体操が欲しい」のリクエストOK</span>
                                    </div>
                                </div>
                            </div>

                            <a
                                href="https://lin.ee/79a5bNt"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-white font-black text-lg rounded-full hover:scale-105 transition-all shadow-xl"
                                style={{ color: '#06C755' }}
                            >
                                <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#06C755">
                                    <path d={LINE_SVG_PATH} />
                                </svg>
                                LINEで受け取る（無料・1分）
                            </a>
                            <p className="text-xs mt-3 leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                                ※ ブロックはいつでも可能です。
                                <br className="sm:hidden" />
                                しつこい営業メッセージは送りません。
                            </p>
                        </div>
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
