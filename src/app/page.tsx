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
        {/* Hero Section */}
        <div className="bg-blue-600 py-20 sm:py-24 lg:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              自主トレ素材庫.jp
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-blue-100">
              現場ですぐに使える、統一感のある自主トレイラストをダウンロード。<br />
              PDFやWordに貼り付けるだけで、質の高い指導資料が作成できます。
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                プランを見る
              </Link>
              <Link
                href="/free"
                className="inline-flex items-center justify-center rounded-lg border border-blue-400 bg-blue-500 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-blue-400"
              >
                無料素材を見る
              </Link>
            </div>
          </div>
        </div>

        {/* Materials List Section */}
        <div id="materials" className="bg-gray-50 py-24 sm:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                素材一覧
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                プランごとの素材一覧はこちらからご確認いただけます。
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/free" className="group relative flex flex-col items-center rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">無料素材</h3>
                <p className="mt-2 text-center text-sm text-gray-500">毎月更新の無料素材</p>
              </Link>
              <Link href="/basic" className="group relative flex flex-col items-center rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">Basic素材</h3>
                <p className="mt-2 text-center text-sm text-gray-500">基本的な自主トレ素材40点</p>
              </Link>
              <Link href="/pro" className="group relative flex flex-col items-center rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">Pro素材</h3>
                <p className="mt-2 text-center text-sm text-gray-500">Basic + 実用的な素材60点</p>
              </Link>
              <Link href="/premium" className="group relative flex flex-col items-center rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">Premium素材</h3>
                <p className="mt-2 text-center text-sm text-gray-500">全200点以上 + 新作優先</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24 sm:py-32">
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
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">統一感のあるデザイン</h3>
                <p className="mt-4 text-gray-600">
                  全てのイラストが同じテイストで描かれているため、資料全体に統一感が生まれます。
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">時短で資料作成</h3>
                <p className="mt-4 text-gray-600">
                  ダウンロードして貼り付けるだけ。絵を描く時間を節約し、患者様との時間を増やせます。
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">商用利用OK</h3>
                <p className="mt-4 text-gray-600">
                  作成した資料は、患者様への配布はもちろん、院内掲示や学会発表にもご利用いただけます。
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
