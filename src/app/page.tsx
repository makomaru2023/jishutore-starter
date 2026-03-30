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
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-slate-800/50 to-transparent"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="mx-auto max-w-5xl lg:flex lg:items-center lg:justify-between gap-12">
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

                <form action="/items" method="GET" className="mt-8 max-w-xl mx-auto lg:mx-0 p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 px-4 py-3 flex items-center bg-slate-800/40 rounded-xl focus-within:ring-2 focus-within:ring-teal-500 transition-all cursor-text">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input
                      type="text"
                      name="q"
                      placeholder="素材を検索（例: 肩, スクワット）"
                      className="w-full bg-transparent text-white placeholder-slate-400 focus:outline-none font-medium text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-xl bg-teal-500 text-white font-bold hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/30 flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    検索する
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </form>

                <p className="text-xs text-slate-400 font-medium flex items-center justify-center lg:justify-start gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-teal-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  200点以上・全素材無料・商用利用OK
                </p>
              </div>

              <div className="mt-16 lg:mt-0 relative w-64 h-64 sm:w-80 sm:h-80 mx-auto lg:mx-0 flex-shrink-0 perspective-1000">
                <div className="absolute inset-0 bg-teal-500/20 rounded-[3rem] rotate-6 transform-gpu"></div>
                <div className="absolute inset-0 bg-slate-800 rounded-[3rem] -rotate-3 border border-slate-700 shadow-2xl overflow-hidden flex items-center justify-center">
                  <Image
                    src="/images/hero-illustration.png"
                    alt="リハビリを指導するセラピストと患者のイラスト"
                    fill
                    className="object-cover opacity-90 scale-110 hover:scale-100 transition-transform duration-700"
                    sizes="(max-width: 768px) 256px, 320px"
                    priority
                  />
                </div>
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

        {/* LINE Registration Banner Section */}
        <section className="py-16 sm:py-20 relative overflow-hidden" style={{ backgroundColor: '#06C755' }}>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.05)', transform: 'translate(50%, -50%)' }}></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.05)', transform: 'translate(-50%, 50%)' }}></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="mx-auto max-w-5xl lg:flex lg:items-center lg:gap-12">
              {/* 左側: LINEアイコン */}
              <div className="lg:w-2/5 mb-8 lg:mb-0 flex justify-center">
                <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-3xl flex flex-col items-center justify-center p-6 shadow-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4">
                    <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#06C755">
                      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                    </svg>
                  </div>
                  <p className="text-white font-black text-lg text-center leading-tight">LINE登録で<br />5つの特典を<br />無料プレゼント！</p>
                </div>
              </div>

              {/* 右側: テキスト＋特典リスト＋ボタン */}
              <div className="lg:w-3/5 text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
                  LINE登録で<br className="sm:hidden" />
                  <span style={{ color: '#FDE047' }}>無料特典5点</span>をプレゼント
                </h2>
                <p className="font-medium mb-6 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  患者さんにそのまま印刷して渡せる資料を、<br className="hidden sm:block" />
                  LINE友だち追加で今すぐ無料ダウンロード！
                </p>

                <div className="space-y-2 mb-8">
                  {[
                    "自主トレを継続する理由（患者説明用スライド）",
                    "自主トレチェックシート（カレンダー式記録表）",
                    "転倒予防 環境チェックリスト",
                    "お薬・リハビリ記録ノート",
                    "退院後の生活 Q&A"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-xl px-4 py-2.5 max-w-lg mx-auto lg:mx-0" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FDE047' }}>
                        <span className="text-xs font-black" style={{ color: '#166534' }}>{i + 1}</span>
                      </div>
                      <span className="text-white font-bold text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="https://lin.ee/79a5bNt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-white font-black text-lg rounded-full hover:scale-105 transition-all shadow-xl"
                  style={{ color: '#06C755' }}
                >
                  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#06C755">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                  </svg>
                  友だち追加で特典を受け取る
                </a>
                <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.6)' }}>※ LINE公式アカウントに友だち追加されます</p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
