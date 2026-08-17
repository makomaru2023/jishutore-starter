import type { Metadata } from "next";
import Link from "next/link";
import { ColumnCard } from "@/components/column/ColumnCard";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LineHero } from "@/components/LineHero";
import { PopularItemsSection } from "@/components/PopularItemsSection";
import { PlusRealPreviewBand } from "@/components/PlusRealPreviewBand";
import { TrackedProductCtaLink } from "@/components/TrackedProductCtaLink";
import { FREE_MATERIAL_COUNT } from "@/constants/content-counts";
import { getColumnArticles } from "@/lib/column";
import { feeDomains, getDomainUrl, getFeeCheckTotalCount } from "@/lib/fee-check";

// 5項目以上そろった分野だけをトップページのタイルに出す（準備中分野は /fee-check 側で案内）。
const FEE_DOMAIN_READY_THRESHOLD = 5;

export const metadata: Metadata = {
  title: "自主トレ資料、毎回ゼロから作っていませんか？｜自主トレ素材庫",
  // ★2026-08-17：Bing の「description が短すぎる」警告を受けて96字→150字へ拡充。
  //   ★ここが `/` の実際の description（layout.tsx のものを上書きしている）。
  //   あわせて報酬チェックを1文足した。来訪者の約半分が報酬チェック層なのに、
  //   トップの説明文がイラストの話だけだったため（[[audience-split]]）。
  description:
    `PT・OT・ST向けの自主トレイラスト素材サイト。スクワット・ブリッジ・ストレッチ・歩行練習・嚥下体操など${FREE_MATERIAL_COUNT}点を無料ダウンロード。登録不要・商用OKで、退院前指導や家族説明の資料がすぐ作れます。訪問リハ・通所リハ・老健の報酬チェック（単位数と算定要件）も無料公開中。`,
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
  const latestColumnArticles = getColumnArticles().slice(0, 3);
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <section className="bg-slate-900 py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <p className="inline-block rounded-full border border-slate-700 bg-slate-800 px-4 py-1.5 text-xs font-bold tracking-widest text-teal-300 sm:text-sm">
                PT・OT・ST向け 自主トレ素材サイト
              </p>
              <h1 className="jp-heading mt-6 text-3xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                <span className="inline-block sm:whitespace-nowrap">自主トレ資料、</span>
                <span className="inline-block sm:whitespace-nowrap">毎回ゼロから</span>
                <span className="inline-block sm:whitespace-nowrap">作っていませんか？</span>
              </h1>
              <p className="jp-text mx-auto mt-5 max-w-2xl text-base font-bold leading-8 text-slate-200 sm:text-xl">
                <span className="inline-block">患者さんに渡せる自主トレ資料を、</span>
                <span className="inline-block">もっと短時間で。</span>
                <span className="inline-block">リハビリ職向けのイラスト素材と</span>
                <span className="inline-block">資料をまとめています。</span>
              </p>
              <p className="jp-text mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                <span className="inline-block">スクワット・ブリッジ・ストレッチ・</span>
                <span className="inline-block">歩行練習など、{FREE_MATERIAL_COUNT}点の素材を</span>
                <span className="inline-block">無料でダウンロードできます。</span>
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/items"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-teal-500 px-8 py-4 text-base font-black text-white shadow-lg shadow-teal-500/25 transition hover:bg-teal-400"
                >
                  無料素材を見る
                  <ArrowIcon className="h-5 w-5" />
                </Link>
                <TrackedProductCtaLink
                  location="home_hero_cta"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-slate-600 bg-white/10 px-8 py-4 text-base font-black text-white transition hover:bg-white/15"
                >
                  素材庫Plusを見る
                  <ArrowIcon className="h-5 w-5" />
                </TrackedProductCtaLink>
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
                  <h2 className="jp-heading mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
                    <span className="inline-block sm:whitespace-nowrap">検索やカテゴリから、</span>
                    <span className="inline-block sm:whitespace-nowrap">必要な素材を探せます</span>
                  </h2>
                  <p className="jp-text mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                    <span className="inline-block">文字なし・文字ありのPNG素材を、</span>
                    <span className="inline-block">登録なしで使えます。</span>
                    <span className="inline-block">まずは一覧から、</span>
                    <span className="inline-block">必要な運動を探してください。</span>
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
                  <h2 className="jp-heading mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
                    算定要件と単位数を、根拠リンクつきで確認できます
                  </h2>
                  <p className="jp-text mt-3 max-w-2xl text-sm leading-7 text-slate-600">
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
              <p className="jp-text mt-4 text-xs leading-6 text-slate-500">
                全{feeTotalCount}項目を公開中。各分野から1項目は、Plus表示のまま全文を無料で読めます。
              </p>
            </div>
          </div>
        </section>

        {latestColumnArticles.length > 0 && (
          <section className="border-t border-slate-200 bg-slate-50 py-12 sm:py-16">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-5xl">
                {/* 読み物の枠だと分かるよう、誌名のように「コラム」を立てて中央に置く。
                    一覧への導線は記事カードの下（＝いくつか見たあと）に置くこと。
                    見出しの横に置くと、スマホでは記事より先に出てしまう。
                    ★見出しは特定のテーマに寄せない。制度以外の記事も増やしていくため
                    （2026-08-12にユーザー判断で説明文を削除し、見出しも広げた）。 */}
                <div className="text-center">
                  <p className="text-sm font-black tracking-[0.25em] text-blue-700">コラム</p>
                  <span className="mx-auto mt-3 block h-px w-12 bg-blue-200" aria-hidden="true" />
                  <h2 className="jp-heading mt-4 text-2xl font-black text-slate-950 sm:text-3xl">
                    現場で迷いやすいところを、ひとつずつ
                  </h2>
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {latestColumnArticles.map((article) => (
                    <ColumnCard key={article.slug} article={article} />
                  ))}
                </div>
                <div className="mt-8 flex justify-center">
                  <Link
                    href="/column/"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-black text-slate-800 transition hover:border-blue-300 hover:text-blue-700"
                  >
                    コラム一覧を見る
                    <ArrowIcon />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="bg-slate-50 py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <PlusRealPreviewBand
                variant="rich"
                location="home_plus_band"
              />
            </div>
          </div>
        </section>

        <LineHero />
      </main>
      <Footer />
    </div>
  );
}
