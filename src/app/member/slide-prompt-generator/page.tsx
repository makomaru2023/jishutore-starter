import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SlidePromptGenerator } from "@/components/member/slide-prompt-generator/SlidePromptGenerator";

export const metadata: Metadata = {
  title: "リハ職向けスライド作成プロンプトメーカー｜自主トレ素材庫",
  description:
    "用途・枚数・テーマを選ぶだけで、ChatGPTにそのまま貼り付けられるスライド作成プロンプトを生成します。",
  robots: { index: false, follow: false },
};

export default function SlidePromptGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50/50 via-slate-50 to-slate-50">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-slate-200/70 bg-white">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-sky-300/10 blur-3xl" />
          <div className="container relative z-10 mx-auto max-w-5xl px-4 py-12 sm:py-16">
            <p className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 px-3.5 py-1.5 text-xs font-bold tracking-wide text-white shadow-sm shadow-blue-500/20">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                <path d="M10 1.5 12.5 7l5.5.5-4.2 3.7 1.3 5.4L10 13.8 4.9 16.6l1.3-5.4L2 7.5 7.5 7 10 1.5Z" />
              </svg>
              購入者専用ツール
            </p>
            <h1 className="text-2xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl">
              リハ職向け
              <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                スライド作成プロンプト
              </span>
              メーカー
            </h1>
            <p className="mt-4 max-w-3xl text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
              用途・枚数・テーマを選ぶだけで、ChatGPTにそのまま貼り付けられるスライド作成プロンプトを生成します。
              家族説明、勉強会、症例発表、自主トレ指導資料のたたき台作成に使えます。
            </p>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/80 p-4 backdrop-blur-sm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.008M10.34 3.94 1.91 18a1.5 1.5 0 0 0 1.3 2.25h17.58a1.5 1.5 0 0 0 1.3-2.25L13.66 3.94a1.5 1.5 0 0 0-2.6 0Z" />
              </svg>
              <p className="text-xs font-medium leading-relaxed text-amber-800 sm:text-sm">
                生成された内容は、医療・介護現場での使用前に必ず専門職が確認してください。
                個人情報、実名、詳細な症例情報は入力しないでください。
              </p>
            </div>
          </div>
        </section>

        {/* ツール本体 */}
        <section className="py-8 sm:py-12">
          <div className="container mx-auto max-w-5xl px-4">
            <SlidePromptGenerator />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
