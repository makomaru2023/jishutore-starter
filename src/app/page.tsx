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
        <div className="bg-gradient-to-b from-blue-600 to-blue-800 py-16 sm:py-24 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Text Content */}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="mb-6 text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl leading-normal">
                  「自主トレ資料づくり」に、<br className="hidden sm:block" />もう悩まない。<br />
                  <span className="text-blue-200 text-xl sm:text-3xl lg:text-4xl mt-4 block">
                    現場のプロが作った、貼るだけ5分のイラスト素材集。
                  </span>
                </h1>

                <p className="mb-8 text-lg text-blue-100 sm:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  臨床経験14年目の現役作業療法士が、
                  「現場で本当に使いやすい」を追求して作成しました。<br className="hidden sm:block" />
                  統一感のある素材で、資料作成の時間を20分から5分へ。<br className="hidden sm:block" />
                  浮いた時間を、患者様と向き合う大切な時間にお使いください。
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start mb-6">
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

                <p className="text-sm text-blue-200">
                  ※無料素材はクレジット表記で利用OK。有料プランはクレジット不要・買い切り。
                </p>
              </div>

              {/* Profile Image */}
              <div className="flex-shrink-0 relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80">
                <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 blur-2xl transform translate-y-4"></div>
                <div className="relative w-full h-full rounded-full border-4 border-white/30 overflow-hidden shadow-2xl">
                  <Image
                    src="/images/profile.png"
                    alt="運営者（作業療法士）"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 320px"
                    priority
                  />
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg border border-blue-100 whitespace-nowrap z-10">
                  <p className="text-blue-800 text-sm sm:text-base font-bold">運営者: トロル (OT)</p>
                </div>
              </div>
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
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
                選ばれる理由
              </h2>
              <p className="text-lg text-gray-600">
                臨床経験14年目の作業療法士が、<br className="hidden sm:block" />
                「現場での使いやすさ」を第一に考えて作成しました。
              </p>
            </div>

            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="flex flex-col bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 self-start">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">統一感のある資料に</h3>
                <p className="text-gray-600 leading-relaxed">
                  全てのイラストを同一テイストで作成。<br />
                  つぎはぎの資料から卒業し、プロのような統一感のある資料が作れます。
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 self-start">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">作成時間を1/4に</h3>
                <p className="text-gray-600 leading-relaxed">
                  ダウンロードして貼るだけ5分。<br />
                  月7時間の業務削減で、患者様と向き合う時間を増やせます。
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 self-start">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">商用利用も安心</h3>
                <p className="text-gray-600 leading-relaxed">
                  有料素材はクレジット表記不要。<br />
                  学会発表や配布資料、SNSなど、権利関係を気にせず自由に使えます。
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
