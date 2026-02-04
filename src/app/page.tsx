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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-blue-600 to-blue-800 py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl lg:flex lg:items-center lg:justify-between gap-10">
              {/* Left: Text */}
              <div className="max-w-2xl space-y-6 text-center lg:text-left mx-auto lg:mx-0">
                <p className="text-sm font-bold text-blue-200 tracking-wider">
                  PT・OT・ST向け 自主トレイラスト
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  <span className="inline-block">「自主トレ資料づくり」に、</span><br />
                  <span className="inline-block">もう悩まない。</span>
                </h1>
                <div className="space-y-2">
                  <p className="text-lg text-blue-50 font-medium">
                    現役作業療法士が作った、貼るだけ5分のイラスト素材集です。
                  </p>
                  <p className="text-sm text-blue-200">
                    統一感のあるイラストで、資料作成の時間を20分 → 5分に。
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                  <Link
                    href="/items"
                    className="px-8 py-3 rounded-full bg-white text-blue-600 font-bold hover:bg-blue-50 transition-all shadow-lg flex items-center justify-center"
                  >
                    素材一覧を見る <span className="text-xs font-normal ml-1">（全素材無料）</span>
                  </Link>
                </div>
                <p className="text-xs text-blue-300">
                  ※全ての素材を無料でご利用いただけます。商用利用もOK。
                </p>
              </div>

              {/* Right: Image */}
              <div className="mt-10 lg:mt-0 flex-shrink-0 relative w-40 h-40 sm:w-48 sm:h-48 mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 blur-2xl transform translate-y-4"></div>
                <div className="relative w-full h-full rounded-full border-4 border-white/30 overflow-hidden shadow-xl">
                  <Image
                    src="/images/profile.png"
                    alt="運営者（作業療法士）"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 160px, 192px"
                    priority
                  />
                </div>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md border border-blue-100 whitespace-nowrap z-10">
                  <p className="text-blue-800 text-xs font-bold">運営者: トロル (OT)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section (Moved from Hero) */}
        <div className="bg-white py-12 border-b border-gray-100">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <p className="text-gray-600 leading-relaxed text-lg inline-block text-balance">
              現役作業療法士が、「現場で本当に使いやすい」を追求して作成しました。<br className="hidden sm:block" />
              浮いた時間を、患者様と向き合う大切な時間にお使いください。
            </p>
          </div>
        </div>

        {/* Materials List Section */}
        <div id="materials" className="bg-white py-24 sm:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                提供中の自主トレ素材
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                全ての素材を無料で公開しています。
              </p>
            </div>

            {/* Popular Items Slider */}
            <div className="mb-16">
              <MaterialSlider items={popularItems} options={{ loop: true, align: 'start' }} />
            </div>

            <div className="flex justify-center">
              <Link href="/items" className="group relative flex flex-col items-center rounded-2xl bg-gradient-to-br from-blue-50 to-white p-8 border border-blue-200 transition-all hover:shadow-lg hover:border-blue-400 max-w-sm w-full">
                <div className="mb-4 rounded-full bg-blue-600 p-3 text-white font-bold">All Free</div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600">素材一覧を見る</h3>
                <p className="mt-2 text-center text-sm text-gray-500">200点以上の自主トレ素材<br />全て無料・登録不要</p>
              </Link>
            </div>
          </div>
        </div>



      </main>
      <Footer />
    </div>
  );
}
