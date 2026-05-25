import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LoginForm } from "@/components/member/slide-prompt-generator/LoginForm";

export const metadata: Metadata = {
  title: "購入者専用ページ｜スライド作成プロンプトメーカー｜自主トレ素材庫",
  description:
    "スライド作成プロンプトメーカーを利用するには、購入時に案内されたパスワードを入力してください。",
  robots: { index: false, follow: false },
};

export default function SlidePromptLoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50/50 via-slate-50 to-slate-50">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-sky-500 to-blue-500" />
          <div className="p-8 sm:p-10">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-sky-500 text-white shadow-md shadow-blue-500/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-7 w-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </div>
            <h1 className="mb-2 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
              購入者専用ページ
            </h1>
            <p className="text-sm font-medium leading-relaxed text-slate-500">
              スライド作成プロンプトメーカーを利用するには、購入時に案内されたパスワードを入力してください。
            </p>
          </div>

          <LoginForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
