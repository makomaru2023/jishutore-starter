import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AiPromptMakerForm } from "@/components/AiPromptMakerForm";
import { PromptMakerGate } from "@/components/PromptMakerGate";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AIプロンプトメーカー｜自主トレイラスト生成用｜自主トレ素材庫",
  description:
    "リハビリ自主トレイラストを画像生成AIで作るためのプロンプトを、チェックを入れるだけで簡単作成。動作・対象者・スタイルを選ぶだけで「かんたん版」「こだわり版」のプロンプトが完成します。",
  robots: { index: false, follow: false },
  openGraph: {
    title: "AIプロンプトメーカー｜自主トレイラスト生成用｜自主トレ素材庫",
    description:
      "リハビリ自主トレイラスト用のAIプロンプトを生成。動作・対象者・スタイルを選んで即コピー。",
  },
};

export default function AiPromptMakerPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-slate-900 pt-20 pb-16 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
            <p className="inline-block px-4 py-1.5 rounded-full bg-slate-800 text-teal-400 font-bold text-sm tracking-widest border border-slate-700 mb-6">
              note購入者限定
            </p>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4">
              自主トレイラスト用<br />AIプロンプトメーカー
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-medium">
              動作を入力し、対象者・スタイルを選ぶだけで
              <br className="hidden sm:block" />
              画像生成AI用のプロンプトが完成。そのままコピー&amp;ペースト。
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-slate-50" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)" }} />
        </section>

        {/* Form */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <PromptMakerGate>
              <AiPromptMakerForm />
            </PromptMakerGate>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 sm:py-16 bg-slate-900 text-center">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
              完成イラストの素材も無料で使えます
            </h2>
            <p className="text-slate-300 font-medium mb-8">
              プロンプトで生成したイラストだけでなく、すぐ使える既製素材も300点以上。
              <br className="hidden sm:block" />
              すべて無料・商用OK・登録不要。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/items"
                className="px-10 py-4 rounded-full bg-teal-500 text-white font-black text-lg hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/30 flex items-center gap-2"
              >
                素材を見る
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/#line"
                className="px-10 py-4 rounded-full font-black text-lg transition-all shadow-lg flex items-center gap-2 hover:scale-105"
                style={{ backgroundColor: "#06C755", color: "#fff" }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
                LINE友だち追加
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
