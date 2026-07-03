import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomeGallery } from "@/components/HomeGallery";
import { HomeCategoryNav } from "@/components/HomeCategoryNav";
import { HomeHowTo } from "@/components/HomeHowTo";
import { HomePremiumPromo } from "@/components/HomePremiumPromo";
import { LineHero } from "@/components/LineHero";
import { SponsorAdPlaceholder } from "@/components/SponsorAdPlaceholder";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "自主トレ資料、毎回ゼロから作っていませんか？｜自主トレ素材庫",
  description:
    "PT・OT・ST向けの自主トレイラスト素材サイト。スクワット・ブリッジ・ストレッチ・歩行練習など370点以上の素材を無料ダウンロード。退院前指導・訪問リハ・通所リハ・家族説明の資料作成に使えます。",
};

export default function Home() {

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-slate-900 pt-20 pb-28 sm:pt-24 sm:pb-32 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="mx-auto max-w-4xl text-center space-y-7 sm:space-y-8">
              <p className="inline-block rounded-full border border-slate-700 bg-slate-800 px-4 py-1.5 text-xs font-bold tracking-widest text-teal-400 sm:text-sm">
                PT・OT・ST向け 自主トレ素材サイト
              </p>

              <h1 className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-4 gap-y-1 text-[2rem] font-black leading-tight tracking-tight text-white sm:gap-x-6 sm:text-5xl lg:text-6xl">
                <span className="inline-block whitespace-nowrap">自主トレ資料、</span>
                <span className="inline-block whitespace-nowrap">毎回ゼロから</span>
                <span className="inline-block whitespace-nowrap">作っていませんか？</span>
              </h1>

              <p className="mx-auto max-w-2xl break-keep text-base font-bold leading-relaxed text-slate-200 sm:text-xl">
                患者さんに渡せる自主トレ資料を、もっと短時間で。
                <br className="hidden sm:block" />
                現役作業療法士が作った、リハビリ職向けの自主トレイラスト素材サイトです。
              </p>

              <p className="mx-auto max-w-3xl break-keep text-sm font-medium leading-relaxed text-slate-400 sm:text-base">
                スクワット・ブリッジ・ストレッチ・歩行練習など、370点以上のイラストを無料でダウンロードできます。
                <br className="hidden sm:block" />
                退院前指導・訪問リハ・通所リハ・家族説明の資料作成に使えます。
              </p>

              {/* 特徴バッジ */}
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                {[
                  { icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", text: "370点以上の自主トレイラスト" },
                  { icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", text: "無料ダウンロード・商用利用OK" },
                  { icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", text: "患者配布資料に使いやすい" },
                ].map((badge, i) => (
                  <span key={i} className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/80 px-4 py-2 text-sm font-bold text-slate-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-teal-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d={badge.icon} />
                    </svg>
                    <span className="break-keep">{badge.text}</span>
                  </span>
                ))}
              </div>

              {/* CTA ボタン */}
              <div className="flex flex-col items-stretch justify-center gap-4 pt-4 sm:flex-row sm:items-center">
                <Link
                  href="/items"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-teal-500 px-8 py-4 text-base font-black text-white shadow-lg shadow-teal-500/30 transition-all hover:bg-teal-400 sm:px-10 sm:text-lg"
                >
                  無料素材を見る
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link
                  href="/products"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-slate-600 bg-white/10 px-8 py-4 text-base font-black text-white shadow-lg transition-all hover:bg-white/15 sm:px-10 sm:text-lg"
                >
                  PowerPoint資料を見る
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-12 bg-slate-50" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)' }}></div>
        </section>

        {/* Free Illustration Gallery Section */}
        <HomeGallery />

        {/* Category Navigation Section */}
        <HomeCategoryNav />

        {/* How To Use 3 Steps Section */}
        <HomeHowTo />

        {/* Premium PowerPoint資料 Section */}
        <HomePremiumPromo />

        {/* 自主トレ素材庫Plus（月額プラン）Section */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-blue-100 bg-blue-50/60">
              <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
                <div className="min-w-0">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-blue-700 px-3 py-1 text-xs font-bold text-white">月額プラン</span>
                    <span className="rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-bold text-blue-800">7月登録は永続500円</span>
                  </div>
                  <h2 className="break-keep text-2xl font-black text-slate-900 sm:text-3xl">
                    自主トレ素材庫<span className="text-blue-600">Plus</span>
                  </h2>
                  <p className="mt-3 break-keep text-sm leading-7 text-slate-600 sm:text-base">
                    完成済みのPowerPointスライドから必要なページを選び、文字を編集して自由に組み替え。
                    利用者さんに合わせた自主トレ資料を、その場で作れる月額サービスです。
                  </p>
                  <ul className="mt-4 space-y-1.5 text-sm text-slate-700">
                    <li>・105本の運動スライド（順次追加）から選べる</li>
                    <li>・選んで1つのPowerPointにまとめてダウンロード</li>
                    <li>・7月中のご登録なら、ずっと月額500円（8月〜680円）</li>
                  </ul>
                  <div className="mt-6">
                    <Link
                      href="/products/jishutore-plus"
                      className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-base font-black text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-700"
                    >
                      Plusの詳細を見る
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {["ex-001", "ex-020", "ex-050", "ex-080"].map((id) => (
                    <div key={id} className="aspect-video overflow-hidden rounded-lg border border-blue-100 bg-white shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/plus/previews/${id}.webp`}
                        alt="自主トレ素材庫Plusの収録スライド例"
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* スポンサー枠（広告掲載募集） */}
        <section className="py-12 sm:py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <SponsorAdPlaceholder variant="compact" />
            </div>
          </div>
        </section>

        {/* LINE Registration Banner Section */}
        <LineHero />

      </main>
      <Footer />
    </div>
  );
}
