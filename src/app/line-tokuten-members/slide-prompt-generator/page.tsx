import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SlidePromptGenerator } from "@/components/member/slide-prompt-generator/SlidePromptGenerator";
import { UpgradeBanner } from "@/components/member/slide-prompt-generator/UpgradeBanner";

export const metadata: Metadata = {
    title: "伝わるプロンプト工房（無料版）｜LINE友だち限定特典｜自主トレ素材庫",
    description:
        "LINE友だち限定の無料版プロンプト工房。用途とテーマを選ぶだけで、ChatGPTにそのまま貼り付けられるスライド画像生成プロンプトを作成できます。",
    robots: { index: false, follow: false },
};

export default function SlidePromptGeneratorFreePage() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Header />
            <main className="flex-1">
                {/* 特典ページへ戻るリンク */}
                <div className="border-b border-slate-200 bg-white">
                    <div className="container mx-auto max-w-6xl px-4 py-3">
                        <Link
                            href="/line-tokuten-members/"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 transition-colors hover:text-slate-800"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="currentColor"
                                className="h-3.5 w-3.5"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 19.5 8.25 12l7.5-7.5"
                                />
                            </svg>
                            特典一覧に戻る
                        </Link>
                    </div>
                </div>

                <section className="border-b border-slate-200 bg-gradient-to-b from-sky-50 via-white to-white">
                    <div className="container mx-auto grid grid-cols-1 max-w-6xl gap-8 px-4 pb-6 pt-10 sm:pb-8 sm:pt-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
                        <div>
                            <p className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-black tracking-wide text-emerald-700">
                                <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                                    <path d="M10 1.5 12.5 7l5.5.5-4.2 3.7 1.3 5.4L10 13.8 4.9 16.6l1.3-5.4L2 7.5 7.5 7 10 1.5Z" />
                                </svg>
                                LINE友だち限定・無料版
                            </p>
                            <h1 className="flex max-w-3xl flex-wrap gap-x-3 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                                <span className="inline-block">伝わる</span>
                                <span className="inline-block">プロンプト工房</span>
                            </h1>
                            <p className="mt-4 max-w-3xl text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
                                用途・テーマ・枚数を選ぶだけで、ChatGPT にそのまま貼り付けられるスライド画像生成プロンプトを作成できます。
                                家族説明、勉強会、利用者説明、退院前指導などの資料づくりに使えます。
                            </p>

                            <div className="mt-5 rounded-2xl border border-sky-100 bg-sky-50/60 p-4">
                                <p className="text-xs font-black tracking-wider text-sky-700 sm:text-sm">
                                    無料版でお使いいただける機能
                                </p>
                                <p className="mt-1 text-xs leading-relaxed text-slate-700 sm:text-sm break-keep">
                                    無料版では、テンプレート2種・ビジュアルスタイル3種・スライド3枚までお使いいただけます。
                                </p>
                            </div>

                            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.008M10.34 3.94 1.91 18a1.5 1.5 0 0 0 1.3 2.25h17.58a1.5 1.5 0 0 0 1.3-2.25L13.66 3.94a1.5 1.5 0 0 0-2.6 0Z" />
                                </svg>
                                <p className="text-xs font-medium leading-relaxed text-amber-800 sm:text-sm">
                                    生成された内容は、医療・介護現場での使用前に必ず専門職が確認してください。
                                    個人情報、実名、詳細な症例情報は入力しないでください。
                                </p>
                            </div>
                        </div>

                        <div className="hidden rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm lg:block">
                            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                                <div className="border-b border-slate-200 bg-slate-950 px-4 py-3 text-xs font-black text-sky-300">
                                    SLIDE PROMPT
                                </div>
                                <div className="space-y-3 p-4">
                                    <div className="h-3 w-3/4 rounded-full bg-slate-200" />
                                    <div className="h-3 w-full rounded-full bg-slate-100" />
                                    <div className="grid grid-cols-3 gap-2 pt-2">
                                        <div className="h-14 rounded-xl bg-sky-50 ring-1 ring-sky-100" />
                                        <div className="h-14 rounded-xl bg-slate-100" />
                                        <div className="h-14 rounded-xl bg-slate-100" />
                                    </div>
                                    <div className="rounded-2xl bg-slate-950 p-4">
                                        <div className="mb-3 h-2 w-24 rounded-full bg-sky-400" />
                                        <div className="space-y-2">
                                            <div className="h-2 rounded-full bg-slate-700" />
                                            <div className="h-2 w-5/6 rounded-full bg-slate-700" />
                                            <div className="h-2 w-2/3 rounded-full bg-slate-700" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="pb-8 pt-4 sm:pb-12 sm:pt-6">
                    <div className="container mx-auto max-w-6xl px-4">
                        <SlidePromptGenerator plan="free" />
                    </div>
                </section>

                {/* アップセル */}
                <section className="pb-12 pt-2 sm:pb-16">
                    <div className="container mx-auto max-w-6xl px-4">
                        <UpgradeBanner />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
