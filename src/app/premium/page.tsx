import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LineBanner } from "@/components/LineBanner";
import { PremiumItemCard } from "@/components/PremiumItemCard";
import { premiumItems } from "../../../data/premiumItems";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "PowerPoint資料｜患者さんにそのまま渡せる自主トレ説明資料｜自主トレ素材庫",
    description:
        "退院前指導・訪問リハ・通所リハ・家族説明で使える、編集可能なPowerPoint資料。疾患別9本セット・在宅高齢者向け6点セットを販売中。",
};

export default function PremiumPage() {
    const firstAvailable = premiumItems.find((p) => p.status !== "coming-soon");

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero */}
                <section className="bg-slate-900 pt-16 pb-24 relative overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-10 left-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-10 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl" />
                    </div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="mx-auto max-w-3xl text-center space-y-6">
                            <p className="inline-block px-4 py-1.5 rounded-full bg-slate-800 text-teal-400 font-bold text-sm tracking-widest border border-slate-700">
                                POWERPOINT資料
                            </p>
                            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
                                患者さんにそのまま渡せる
                                <br className="hidden sm:block" />
                                <span className="text-teal-400">PowerPoint資料</span>
                            </h1>
                            <p className="text-base sm:text-lg text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
                                退院前指導、訪問リハ、通所リハ、家族説明で使いやすい
                                <br className="hidden sm:block" />
                                自主トレ説明資料をまとめました。
                                <br />
                                PowerPoint形式なので、施設名や回数、注意点を必要に応じて編集できます。
                            </p>

                            {/* Feature badges */}
                            <div className="flex flex-wrap justify-center gap-3 pt-2">
                                {[
                                    "PowerPoint形式",
                                    "編集自由",
                                    "印刷配布OK",
                                    "買い切り",
                                ].map((badge) => (
                                    <span
                                        key={badge}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700 text-sm font-bold text-slate-300"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-teal-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        {badge}
                                    </span>
                                ))}
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                                {firstAvailable && (
                                    <a
                                        href={firstAvailable.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-8 py-4 rounded-full bg-teal-500 hover:bg-teal-400 text-white font-black text-base transition-all shadow-lg shadow-teal-500/30 flex items-center gap-2"
                                    >
                                        noteで購入する
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                        </svg>
                                    </a>
                                )}
                                <a
                                    href="#products"
                                    className="px-8 py-4 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-base transition-all border border-slate-700 flex items-center gap-2"
                                >
                                    資料の内容を見る
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute bottom-0 left-0 right-0 h-12 bg-slate-50"
                        style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)" }}
                    />
                </section>

                {/* Why this resource */}
                <section className="py-12 sm:py-16 bg-slate-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-3">
                            {[
                                {
                                    title: "資料作成の時短に",
                                    body: "ゼロから作らず、必要なところだけ編集して使えます。",
                                    icon: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
                                },
                                {
                                    title: "そのまま印刷OK",
                                    body: "患者さんやご家族にそのまま渡せる仕上がりです。",
                                    icon: "M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z",
                                },
                                {
                                    title: "編集自由",
                                    body: "施設名・回数・注意点も自由に書き換えられます。",
                                    icon: "M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125",
                                },
                            ].map((feature) => (
                                <div
                                    key={feature.title}
                                    className="bg-white rounded-2xl p-6 border border-slate-200"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                                        </svg>
                                    </div>
                                    <h3 className="font-black text-slate-900 mb-1.5">{feature.title}</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">{feature.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Products */}
                <section id="products" className="py-16 sm:py-20 bg-white scroll-mt-24">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                                資料ラインナップ
                            </h2>
                            <p className="text-slate-500 font-medium text-sm sm:text-base">
                                現在ご用意している資料です。新しい資料が完成し次第、随時追加していきます。
                            </p>
                        </div>

                        <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
                            {premiumItems.map((item) => (
                                <PremiumItemCard key={item.id} item={item} />
                            ))}
                        </div>

                        <div className="mt-12 max-w-3xl mx-auto text-center px-6 py-6 bg-slate-50 rounded-2xl border border-slate-200">
                            <p className="text-sm text-slate-600 leading-relaxed">
                                すべての資料は <span className="font-bold">買い切り</span> です。月額課金や追加料金はありません。
                                <br />
                                ご質問は
                                <a href="/contact" className="text-teal-600 font-bold hover:underline mx-1">
                                    お問い合わせ
                                </a>
                                からお気軽にどうぞ。
                            </p>
                        </div>
                    </div>
                </section>

                {/* Prompt Maker */}
                <section className="py-16 sm:py-20 bg-slate-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center bg-white rounded-3xl border border-slate-200 px-6 py-10 sm:px-10 sm:py-12">
                            <p className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold tracking-widest mb-4">
                                PROMPT MAKER
                            </p>
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 leading-snug">
                                プロンプトメーカー
                            </h2>
                            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 break-keep">
                                自主トレ素材の説明文や、イラスト作成に使えるプロンプトを作成できます。
                            </p>
                            <Link
                                href="/ai-prompt-maker"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors"
                            >
                                プロンプトメーカーを見る
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2.5}
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </section>

                <LineBanner />
            </main>
            <Footer />
        </div>
    );
}
