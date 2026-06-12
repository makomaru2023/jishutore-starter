import Link from "next/link";
import { PremiumItemCard } from "./PremiumItemCard";
import { premiumItems } from "../../data/premiumItems";
import { SLIDE_PROMPT_GENERATOR_PRICE_ID } from "@/lib/products";

export function HomePremiumPromo() {
    // 工房（Webツール）は購入可能になったときだけ導線を出す（カタログ側と同条件）。
    const slidePromptReady = Boolean(SLIDE_PROMPT_GENERATOR_PRICE_ID);

    return (
        <section className="bg-white py-16 sm:py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-10">
                        <p className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-700 font-bold text-xs tracking-widest mb-4">
                            完成済み資料セット
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 leading-tight">
                            無料イラストを1枚ずつ貼る
                            <br className="sm:hidden" />
                            時間がない方へ
                        </h2>
                        <p className="text-slate-500 font-medium text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                            イラストを集めて1枚ずつ作るのが大変なときに。
                            <br className="hidden sm:block" />
                            疾患別に説明したい場合と、今できる姿勢から選びたい場合で使い分けられます。
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {premiumItems.map((item) => (
                            <PremiumItemCard key={item.id} item={item} variant="compact" />
                        ))}
                    </div>

                    {/* 2点まとめ買いセットの訴求 */}
                    <div className="mt-6 rounded-2xl border border-amber-100 bg-gradient-to-r from-amber-50/60 to-white p-5 sm:p-6">
                        <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                            <div className="min-w-0 flex-1 text-center sm:text-left">
                                <p className="mb-1 inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-black tracking-widest text-amber-800">
                                    ★ お得なセット
                                </p>
                                <p className="text-sm font-black leading-snug text-slate-900 sm:text-base break-keep">
                                    両方使いたい方へ：2点まとめ買いセット
                                </p>
                                <p className="mt-1 text-xs text-slate-600 break-keep sm:text-sm">
                                    通常 <span className="line-through">1,960円</span> → <strong className="text-amber-700">1,480円</strong>（480円お得・買い切り）
                                </p>
                            </div>
                            <Link
                                href="/products#bundle"
                                className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border border-amber-200 bg-white px-5 py-2.5 text-sm font-bold text-amber-700 transition-colors hover:bg-amber-50"
                            >
                                2点セットを見る
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all"
                        >
                            PowerPoint資料の商品一覧を見る
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                />
                            </svg>
                        </Link>
                    </div>

                    {/* スライドを自分で作りたい方への控えめな導線（Webツール） */}
                    {slidePromptReady && (
                        <p className="mt-4 text-center text-sm text-slate-500">
                            スライドを自分で作りたい方へ：
                            <Link
                                href="/products/slide-prompt-generator"
                                className="font-bold text-blue-600 hover:underline"
                            >
                                伝わるプロンプト工房 →
                            </Link>
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
