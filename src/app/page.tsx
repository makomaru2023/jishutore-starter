import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LineHero } from "@/components/LineHero";
import { PopularItemsSection } from "@/components/PopularItemsSection";
import { FREE_MATERIAL_COUNT } from "@/constants/content-counts";
import { feeDomains, getDomainUrl, getFeeCheckTotalCount } from "@/lib/fee-check";

// 5項目以上そろった分野だけをトップページのタイルに出す（準備中分野は /fee-check 側で案内）。
const FEE_DOMAIN_READY_THRESHOLD = 5;

export const metadata: Metadata = {
  title: "自主トレ資料、毎回ゼロから作っていませんか？｜自主トレ素材庫",
  description:
    `PT・OT・ST向けの自主トレイラスト素材サイト。スクワット・ブリッジ・ストレッチ・歩行練習など${FREE_MATERIAL_COUNT}点の素材を無料ダウンロード。退院前指導・訪問リハ・通所リハ・家族説明の資料作成に使えます。`,
};

const categoryLinks = [
  { label: "上肢", href: "/items/upper-limb-exercises/" },
  { label: "下肢", href: "/items/lower-limb-exercises/" },
  { label: "体幹", href: "/items/trunk-exercises/" },
  { label: "ストレッチ", href: "/items/stretching-exercises/" },
  { label: "歩行", href: "/items/walking-exercises/" },
  { label: "座位体操", href: "/items/seated-exercises/" },
] as const;

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6 21 12m0 0-7.5 6M21 12H3" />
    </svg>
  );
}

export default function Home() {
  const feeTotalCount = getFeeCheckTotalCount();
  const readyFeeDomains = feeDomains.filter(
    (domain) => domain.items.length >= FEE_DOMAIN_READY_THRESHOLD,
  );
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1 [&_h1]:break-keep [&_h2]:break-keep [&_h3]:break-keep [&_p]:break-keep">
        <section className="bg-slate-900 py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <p className="inline-block rounded-full border border-slate-700 bg-slate-800 px-4 py-1.5 text-xs font-bold tracking-widest text-teal-300 sm:text-sm">
                PT・OT・ST向け 自主トレ素材サイト
              </p>
              <h1 className="mt-6 text-3xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                自主トレ資料、毎回ゼロから作っていませんか？
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base font-bold leading-8 text-slate-200 sm:text-xl">
                患者さんに渡せる自主トレ資料を、もっと短時間で。
                リハビリ職向けのイラスト素材と資料をまとめています。
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                スクワット・ブリッジ・ストレッチ・歩行練習など、
                {FREE_MATERIAL_COUNT}点の素材を無料でダウンロードできます。
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/items"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-teal-500 px-8 py-4 text-base font-black text-white shadow-lg shadow-teal-500/25 transition hover:bg-teal-400"
                >
                  無料素材を見る
                  <ArrowIcon className="h-5 w-5" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-slate-600 bg-white/10 px-8 py-4 text-base font-black text-white transition hover:bg-white/15"
                >
                  有料コンテンツを見る
                  <ArrowIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <PopularItemsSection />

        <section className="bg-white py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-black tracking-widest text-teal-600">無料素材</p>
                  <h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
                    検索やカテゴリから、必要な素材を探せます
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                    文字なし・文字ありのPNG素材を、登録なしで使えます。
                    まずは一覧から、必要な運動を探してください。
                  </p>
                </div>
                <Link
                  href="/items"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-black text-white transition hover:bg-slate-800"
                >
                  素材一覧へ
                </Link>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {categoryLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-black text-slate-800 transition hover:border-teal-300 hover:bg-teal-50"
                  >
                    {item.label}の素材を見る
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-100 bg-white py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-black tracking-widest text-blue-700">診療・介護報酬チェック</p>
                  <h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
                    算定要件と単位数を、根拠リンクつきで確認できます
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                    単位数・算定要件・根拠資料リンクは、登録なしで無料で見られます。
                    記録・自己点検ポイントは自主トレ素材庫Plusで確認できます。
                  </p>
                </div>
                <Link
                  href="/fee-check"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-700 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-800"
                >
                  報酬チェックを見る
                  <ArrowIcon />
                </Link>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {readyFeeDomains.map((domain) => (
                  <Link
                    key={domain.domain}
                    href={getDomainUrl(domain.domain)}
                    className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:bg-blue-50"
                  >
                    <span className="text-sm font-black text-slate-800">{domain.domainLabel}</span>
                    <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-black text-blue-800">
                      {domain.items.length}項目
                    </span>
                  </Link>
                ))}
              </div>
              <p className="mt-4 text-xs leading-6 text-slate-500">
                全{feeTotalCount}項目を公開中。各分野から1項目は、Plus表示のまま全文を無料で読めます。
              </p>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl rounded-lg border border-blue-100 bg-white p-5 shadow-sm sm:p-7">
              <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_240px] md:items-center">
                <div>
                  <p className="text-xs font-black tracking-widest text-blue-700">有料コンテンツ</p>
                  <h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
                    Plusと買い切り資料があります
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    毎月追加される素材を使いたい方にはPlus。
                    必要な資料やツールだけ使いたい方には買い切りコンテンツを用意しています。
                  </p>
                </div>
                <Link
                  href="/products"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-700 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-800"
                >
                  一覧を見る
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <LineHero />
      </main>
      <Footer />
    </div>
  );
}
