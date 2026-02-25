import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { MaterialSlider } from "@/components/MaterialSlider";
import { getItems } from "@/lib/items";

export default function Home() {
  const items = getItems();
  const popularItems = items.slice(0, 10);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-slate-900 pt-20 pb-28 relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-slate-800/50 to-transparent"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="mx-auto max-w-5xl lg:flex lg:items-center lg:justify-between gap-12">
              {/* Left: Text */}
              <div className="max-w-3xl space-y-8 text-center lg:text-left mx-auto lg:mx-0">
                <p className="inline-block px-4 py-1.5 rounded-full bg-slate-800 text-teal-400 font-bold text-sm tracking-widest border border-slate-700 mb-2">
                  PT・OT・ST向け 自主トレイラスト
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.2] tracking-tight">
                  <span className="inline-block">「自主トレ資料づくり」</span><br />
                  <span className="inline-block">に、もう悩まない。</span>
                </h1>

                <div className="space-y-4 pt-2">
                  <p className="text-lg sm:text-xl text-slate-300 font-medium">
                    現役作業療法士が作った、貼るだけ5分のイラスト素材集です。<br className="hidden sm:block" />
                    統一感のあるイラストで、資料作成の時間を
                    <span className="text-yellow-400 font-black px-1 text-xl sm:text-2xl">20分 → 5分</span>
                    に。
                  </p>
                </div>

                {/* Search Bar / Main CTA Area embedded in Hero */}
                <div className="mt-8 max-w-xl mx-auto lg:mx-0 p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 px-4 py-3 flex items-center text-slate-300 gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <span className="text-sm font-medium">素材を検索（例: 肩, スクワット）</span>
                  </div>
                  <Link
                    href="/items"
                    className="px-8 py-3.5 rounded-xl bg-teal-500 text-white font-bold hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/30 flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    素材一覧を見る
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>

                <p className="text-xs text-slate-400 font-medium flex items-center justify-center lg:justify-start gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-teal-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  200点以上・全素材無料・商用利用OK
                </p>
              </div>

              {/* Right: Image / Illustration Area */}
              <div className="mt-16 lg:mt-0 relative w-64 h-64 sm:w-80 sm:h-80 mx-auto lg:mx-0 flex-shrink-0 perspective-1000">
                <div className="absolute inset-0 bg-teal-500/20 rounded-[3rem] rotate-6 transform-gpu"></div>
                <div className="absolute inset-0 bg-slate-800 rounded-[3rem] -rotate-3 border border-slate-700 shadow-2xl overflow-hidden flex items-center justify-center">
                  {/* Placeholder for a nice hero graphic or the profile picture */}
                  <Image
                    src="/images/profile.png"
                    alt="運営者（作業療法士）"
                    fill
                    className="object-cover opacity-90 scale-110 hover:scale-100 transition-transform duration-700"
                    sizes="(max-width: 768px) 256px, 320px"
                    priority
                  />
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -right-6 bg-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce-slow">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500 font-bold text-xl">
                    !
                  </div>
                  <div className="text-left">
                    <p className="text-slate-900 font-black text-sm leading-tight">すぐ使える</p>
                    <p className="text-slate-500 font-bold text-xs">著作権フリー</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Wave/Shape Divider */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-slate-50" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)' }}></div>
        </section>

        {/* Benefits Cards Section */}
        <section className="bg-slate-50 py-16 -mt-8 relative z-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { title: "探しやすい", desc: "部位や動作でサクッと検索", icon: "🔍" },
                { title: "加工しやすい", desc: "シンプルな線画で使い勝手抜群", icon: "✏️" },
                { title: "完全無料", desc: "面倒な登録不要ですぐDL", icon: "🎁" }
              ].map((benefit, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-2xl flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-bold text-lg">{benefit.title}</h3>
                    <p className="text-slate-500 text-sm mt-1 leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Materials List Section */}
        <section id="materials" className="bg-slate-50 py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                人気の自主トレ素材
              </h2>
              <p className="mt-4 text-slate-500 font-medium">
                現場でよく使われる定番イラストをピックアップ
              </p>
            </div>

            {/* Popular Items Slider - Ensure outer container respects new rounding if needed */}
            <div className="mb-16 max-w-6xl mx-auto">
              <MaterialSlider items={popularItems} options={{ loop: true, align: 'start' }} />
            </div>

            <div className="flex justify-center">
              <Link href="/items" className="group relative flex flex-col items-center rounded-[2rem] bg-white p-10 border-2 border-slate-100 transition-all hover:border-teal-500 hover:shadow-xl hover:shadow-teal-500/10 max-w-md w-full">
                <div className="mb-6 rounded-full bg-teal-50 px-6 py-2 text-teal-600 font-black text-sm uppercase tracking-wider">
                  View All Materials
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-teal-500 transition-colors">もっと素材を探す</h3>
                <p className="text-center text-slate-500 font-medium mb-8">
                  200点以上のイラストが<br className="sm:hidden" />全て無料でダウンロード可能です
                </p>
                <div className="w-12 h-12 rounded-full bg-teal-500 text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
