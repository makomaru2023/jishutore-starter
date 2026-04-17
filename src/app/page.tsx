import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomeGallery } from "@/components/HomeGallery";
import Link from "next/link";

export default function Home() {

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-slate-900 pt-24 pb-32 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="mx-auto max-w-3xl text-center space-y-8">
              <p className="inline-block px-4 py-1.5 rounded-full bg-slate-800 text-teal-400 font-bold text-sm tracking-widest border border-slate-700">
                PT・OT・ST向け 自主トレイラスト
              </p>

              <h1 className="text-[1.75rem] sm:text-5xl lg:text-6xl font-black text-white leading-[1.2] tracking-tight">
                <span className="inline-block">リハビリ職のための</span><br />
                <span className="inline-block">自主トレイラスト無料素材集</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 font-medium max-w-2xl mx-auto">
                現役作業療法士が作った、貼るだけ5分のイラスト素材集。<br className="hidden sm:block" />
                統一感のあるイラストで、資料作成の時間を
                <span className="text-yellow-400 font-black px-1 text-xl sm:text-2xl">20分 → 5分</span>
                に。
              </p>

              {/* 特徴バッジ */}
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                {[
                  { icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", text: "200点以上" },
                  { icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", text: "全素材無料" },
                  { icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", text: "商用利用OK" },
                ].map((badge, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700 text-sm font-bold text-slate-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-teal-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d={badge.icon} />
                    </svg>
                    {badge.text}
                  </span>
                ))}
              </div>

              {/* CTA ボタン */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link
                  href="/items"
                  className="px-10 py-4 rounded-full bg-teal-500 text-white font-black text-lg hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/30 flex items-center gap-2"
                >
                  素材を見る
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <a
                  href="#line"
                  className="px-10 py-4 rounded-full font-black text-lg transition-all shadow-lg flex items-center gap-2 hover:scale-105"
                  style={{ backgroundColor: '#06C755', color: '#fff' }}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                  </svg>
                  LINE友だち追加
                </a>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-12 bg-slate-50" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)' }}></div>
        </section>

        {/* Free Illustration Gallery Section */}
        <HomeGallery />

        {/* LINE Registration Banner Section */}
        <section id="line" className="py-16 sm:py-20 relative overflow-hidden" style={{ backgroundColor: '#06C755' }}>
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
                  <p className="text-white font-black text-lg text-center leading-tight">退院後も<br />続けてもらう<br />5点セット</p>
                </div>
              </div>

              {/* 右側: テキスト＋特典リスト＋ボタン */}
              <div className="lg:w-3/5 text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
                  退院後も自主トレを続けてもらう<br className="sm:hidden" />
                  <span style={{ color: '#FDE047' }}>「5点セット」</span>を無料配布中
                </h2>
                <p className="font-medium mb-6 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  現役リハビリ職が現場で使っている患者配布資料。<br className="hidden sm:block" />
                  LINE友だち追加で、今すぐ全部もらえます。
                </p>

                <div className="space-y-2 mb-8">
                  {[
                    "患者さんが続けたくなる「自主トレする理由」説明スライド",
                    "続けた日が一目でわかる、カレンダー式チェックシート",
                    "自宅の転倒リスクがわかる環境チェックリスト",
                    "ご家族とも共有できる、お薬・リハビリ記録ノート",
                    "退院後あるあるに答える「生活Q&A集」"
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
                  LINEで受け取る（無料・1分）
                </a>
                <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.6)' }}>※ ブロックはいつでも可能です。しつこい営業メッセージは送りません。</p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
