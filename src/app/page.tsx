import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomeGallery } from "@/components/HomeGallery";
import { HomeCategoryNav } from "@/components/HomeCategoryNav";
import { HomeHowTo } from "@/components/HomeHowTo";
import { LineHero } from "@/components/LineHero";
import { SponsorAdPlaceholder } from "@/components/SponsorAdPlaceholder";
import { PlusAnnouncementBar } from "@/components/PlusAnnouncementBar";
import { PLUS_SLIDE_COUNT } from "@/constants/plus";
import { feeDomains, getFeeCheckTotalCount, getFeeItemUrl, sampleFeeItems } from "@/lib/fee-check";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "自主トレ資料、毎回ゼロから作っていませんか？｜自主トレ素材庫",
  description:
    "PT・OT・ST向けの自主トレイラスト素材サイト。スクワット・ブリッジ・ストレッチ・歩行練習など370点以上の素材を無料ダウンロード。退院前指導・訪問リハ・通所リハ・家族説明の資料作成に使えます。",
};

export default function Home() {
  const feeCheckTotalCount = getFeeCheckTotalCount();
  const firstSampleDomain = feeDomains[0];
  const firstSampleId = sampleFeeItems[firstSampleDomain.domain];
  const feeCheckDomainLabels = feeDomains.map((domain) => domain.domainLabel).join("・");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <PlusAnnouncementBar />
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

        <section className="bg-white py-14 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-black tracking-widest text-blue-700">算定要件チェック（無料公開中）</p>
                  <h2 className="mt-3 break-keep text-2xl font-black text-slate-900 sm:text-3xl">
                    診療・介護報酬の単位数・要件も確認できます
                  </h2>
                  <p className="mt-4 max-w-2xl break-keep text-sm leading-7 text-slate-600 sm:text-base">
                    {feeCheckDomainLabels}の{feeCheckTotalCount}項目を整理しています。
                    単位数・算定要件・根拠リンクは無料、記録・自己点検ポイントはPlusで確認できます。
                  </p>
                </div>
                <Link
                  href="/fee-check/"
                  className="inline-flex items-center justify-center rounded-full bg-blue-700 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-800"
                >
                  報酬チェックを見る
                </Link>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {feeDomains.map((domain) => (
                  <Link
                    key={domain.domain}
                    href={`/fee-check/${domain.domain}/`}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50"
                  >
                    <p className="break-keep text-sm font-black leading-6 text-slate-900">{domain.domainLabel}</p>
                    <p className="mt-2 text-xs font-bold text-slate-500">{domain.items.length}項目</p>
                  </Link>
                ))}
              </div>

              {firstSampleId && (
                <Link
                  href={getFeeItemUrl(firstSampleDomain.domain, firstSampleId)}
                  className="mt-5 inline-flex text-sm font-black text-blue-700 hover:underline"
                >
                  全文公開サンプルを見る
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* How To Use 3 Steps Section */}
        <HomeHowTo />

        {/* 有料プラン：3段の価格ラダー（無料 → 買い切り → Plus） */}
        <section className="bg-white py-14 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold tracking-widest text-blue-700">料金プラン</p>
              <h2 className="mt-3 break-keep text-2xl font-black text-slate-900 sm:text-3xl">
                使い方に合わせて選べます
              </h2>
              <p className="mx-auto mt-4 max-w-2xl break-keep text-sm leading-7 text-slate-600 sm:text-base">
                無料の画像から、完成した資料セット、選んで編集できる月額プランまで。目的に合わせて選べます。
              </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-5xl gap-5 lg:grid-cols-3 lg:items-stretch">
              {/* 無料 */}
              <div className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-black text-slate-500">無料素材</p>
                <p className="mt-2 text-3xl font-black text-slate-900">¥0</p>
                <p className="mt-1 text-xs text-slate-500">1枚ずつダウンロード</p>
                <ul className="mt-5 flex-1 space-y-2 text-sm text-slate-600">
                  <li>370点以上のPNGイラスト</li>
                  <li>無料・商用利用OK</li>
                  <li>登録不要ですぐダウンロード</li>
                </ul>
                <Link
                  href="/items"
                  className="mt-6 inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-teal-300 hover:text-teal-700"
                >
                  無料素材を見る
                </Link>
              </div>
              {/* 買い切り */}
              <div className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-black text-slate-500">買い切り資料セット</p>
                <p className="mt-2 text-3xl font-black text-slate-900">
                  ¥980<span className="text-base font-bold text-slate-500">〜</span>
                </p>
                <p className="mt-1 text-xs text-slate-500">完成した資料をそのまま使う</p>
                <ul className="mt-5 flex-1 space-y-2 text-sm text-slate-600">
                  <li>PowerPoint＋PDF</li>
                  <li>完成済みですぐ使える</li>
                  <li>買い切り（追加費用なし）</li>
                </ul>
                <Link
                  href="/products"
                  className="mt-6 inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
                >
                  資料セットを見る
                </Link>
              </div>
              {/* Plus（おすすめ） */}
              <div className="relative flex flex-col rounded-2xl border-2 border-blue-500 bg-blue-50/60 p-6 shadow-lg shadow-blue-500/10">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-black text-white">
                  おすすめ
                </span>
                <p className="text-sm font-black text-blue-700">自主トレ素材庫Plus</p>
                <p className="mt-2 text-3xl font-black text-slate-900">
                  ¥500<span className="text-base font-bold text-slate-500">/月〜</span>
                </p>
                <p className="mt-1 text-xs font-bold text-blue-700">7月登録は永続500円（8月〜680円）</p>
                <ul className="mt-5 flex-1 space-y-2 text-sm text-slate-700">
                  <li>{PLUS_SLIDE_COUNT}点の運動スライド（毎月追加中）</li>
                  <li>選んで編集・1つにまとめてダウンロード</li>
                  <li>いつでも解約OK</li>
                </ul>
                <Link
                  href="/products/jishutore-plus/"
                  className="mt-6 inline-flex items-center justify-center gap-1.5 rounded-full bg-blue-600 px-6 py-3 text-sm font-black text-white shadow transition hover:bg-blue-700"
                >
                  Plusの詳細を見る
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
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
