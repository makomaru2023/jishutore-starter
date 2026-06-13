import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SlidePromptGenerator } from "@/components/member/slide-prompt-generator/SlidePromptGenerator";

export const metadata: Metadata = {
  title: "伝わるプロンプト工房｜自主トレ素材庫",
  description:
    "用途・テーマ・枚数を選ぶだけで、ChatGPTにそのまま貼り付けられるスライド画像生成プロンプトを作成できます。",
  robots: { index: false, follow: false },
};

export default function SlidePromptGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <section className="border-b border-slate-200 bg-gradient-to-b from-sky-50 via-white to-white">
          <div className="container mx-auto grid grid-cols-1 max-w-6xl gap-8 px-4 pb-6 pt-10 sm:pb-8 sm:pt-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
            <div>
              <p className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1.5 text-xs font-black tracking-wide text-sky-700">
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="M10 1.5 12.5 7l5.5.5-4.2 3.7 1.3 5.4L10 13.8 4.9 16.6l1.3-5.4L2 7.5 7.5 7 10 1.5Z" />
                </svg>
                購入者専用ツール
              </p>
              <h1 className="flex max-w-3xl flex-wrap gap-x-3 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                <span className="inline-block">伝わる</span>
                <span className="inline-block">プロンプト工房</span>
              </h1>
              <p className="mt-4 max-w-3xl text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
                用途・テーマ・枚数を選ぶだけで、ChatGPT にそのまま貼り付けられるスライド画像生成プロンプトを作成できます。
                家族説明、勉強会、利用者説明、退院前指導などの資料づくりに使えます。
              </p>

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
            <SlidePromptGenerator />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
