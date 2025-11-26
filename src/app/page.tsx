import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-blue-600 to-blue-800 py-20 sm:py-28 lg:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-8 text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
              リハビリ資料作成の時間を、<br className="hidden sm:block" />
              もっと「患者様と向き合う時間」へ。
            </h1>
            <p className="mx-auto mb-12 max-w-2xl text-lg sm:text-xl text-blue-100 leading-relaxed">
              PT・OT・ST・介護職のための、統一感のある自主トレ素材集。<br />
              ダウンロードして印刷するだけで、伝わる指導資料が完成します。<br />
              <span className="text-sm mt-2 block opacity-80">（商用利用OK / 会員登録不要で試せます）</span>
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/free"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-bold text-blue-600 shadow-lg hover:bg-blue-50 transition-all transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                無料素材を見る
                <span className="ml-2 text-xs font-normal text-blue-500">（登録不要）</span>
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-lg border-2 border-blue-400 bg-transparent px-8 py-4 text-lg font-bold text-white shadow-sm hover:bg-white/10 transition-all"
              >
                料金プランを見る
              </Link>
            </div>
          </div>
        </div>

        {/* Materials List Section */}
        <div id="materials" className="bg-white py-24 sm:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                各プラン素材
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                用途や頻度に合わせて選べる、4つのバリエーション。
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/free" className="group relative flex flex-col items-center rounded-2xl bg-gray-50 p-8 border border-gray-100 transition-all hover:shadow-lg hover:border-blue-200">
                <div className="mb-4 rounded-full bg-blue-100 p-3 text-blue-600 font-bold">Free</div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600">無料素材</h3>
                <p className="mt-2 text-center text-sm text-gray-500">毎月更新のお試し素材<br />（CC BY 4.0）</p>
              </Link>
              <Link href="/basic" className="group relative flex flex-col items-center rounded-2xl bg-white p-8 border border-gray-200 transition-all hover:shadow-lg hover:border-blue-200">
                <div className="mb-4 rounded-full bg-gray-100 p-3 text-gray-600 font-bold">Basic</div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600">Basic素材</h3>
                <p className="mt-2 text-center text-sm text-gray-500">基本的な自主トレ40点<br />（買い切り）</p>
              </Link>
              <Link href="/pro" className="group relative flex flex-col items-center rounded-2xl bg-white p-8 border border-gray-200 transition-all hover:shadow-lg hover:border-blue-200">
                <div className="mb-4 rounded-full bg-gray-100 p-3 text-gray-600 font-bold">Pro</div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600">Pro素材</h3>
                <p className="mt-2 text-center text-sm text-gray-500">実用的な素材60点<br />（買い切り）</p>
              </Link>
              <Link href="/premium" className="group relative flex flex-col items-center rounded-2xl bg-gradient-to-br from-blue-50 to-white p-8 border border-blue-200 transition-all hover:shadow-lg hover:border-blue-400">
                <div className="mb-4 rounded-full bg-blue-600 p-3 text-white font-bold">Premium</div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600">Premium素材</h3>
                <p className="mt-2 text-center text-sm text-gray-500">全200点以上 + 新作優先<br />（買い切り）</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gray-50 py-24 sm:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                選ばれる理由
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                忙しい臨床現場で働く療法士のために作られました。
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col items-center text-center bg-white p-8 rounded-xl shadow-sm">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">統一感のあるデザイン</h3>
                <p className="mt-4 text-gray-600">
                  全てのイラストが同じテイストで描かれているため、資料全体に統一感が生まれます。「バラバラのフリー素材」から卒業しましょう。
                </p>
              </div>
              <div className="flex flex-col items-center text-center bg-white p-8 rounded-xl shadow-sm">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">時短で資料作成</h3>
                <p className="mt-4 text-gray-600">
                  ダウンロードして貼り付けるだけ。絵を描く時間を節約し、患者様とのコミュニケーションやカルテ記載の時間を増やせます。
                </p>
              </div>
              <div className="flex flex-col items-center text-center bg-white p-8 rounded-xl shadow-sm">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">商用利用OK</h3>
                <p className="mt-4 text-gray-600">
                  有料素材はクレジット表記不要で商用利用が可能。院内掲示、配布資料、学会発表、SNSなど、幅広く安心してご利用いただけます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
