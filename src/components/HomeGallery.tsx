import Image from "next/image";
import Link from "next/link";
import { FREE_MATERIAL_COUNT_LABEL } from "@/constants/content-counts";
import { getItems, getItemImageUrl } from "@/lib/items";

/**
 * トップページ用・無料素材ショーケース
 * 代表的な8点のイラストをグリッド表示し、素材一覧への導線をつくる
 */

const FEATURED_IDS = [
    "squat-premium",
    "cane-walking-premium",
    "scapular-retraction-exercise-premium",
    "ankle-dorsiflexion-and-plantarflexion-premium",
    "cat-and-dog-premium",
    "air-bike-premium",
    "draw-in-premium",
    "chest-opening-with-stretch-pole-premium",
];

export function HomeGallery() {
    const allItems = getItems();
    const featured = FEATURED_IDS
        .map((id) => allItems.find((item) => item.id === id))
        .filter((item): item is NonNullable<typeof item> => Boolean(item));

    return (
        <section className="py-16 sm:py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                {/* セクションヘッダー */}
                <div className="text-center mb-10 sm:mb-12">
                    <p className="inline-block px-4 py-1.5 rounded-full bg-teal-50 text-teal-600 font-black text-xs tracking-widest mb-4 border border-teal-100">
                        FREE ILLUSTRATIONS
                    </p>
                    <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mb-3 tracking-tight">
                        こんなイラストが、<span className="text-teal-500">全部無料</span>
                    </h2>
                    <p className="text-slate-500 font-medium text-sm sm:text-base max-w-2xl mx-auto">
                        上肢・下肢・体幹・歩行・ストレッチなど、現場でよく使う自主トレをイラスト化。<br className="hidden sm:block" />
                        下のイラストをクリックすると詳細ページで使い方まで確認できます。
                    </p>
                </div>

                {/* ギャラリーグリッド */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 max-w-6xl mx-auto mb-10">
                    {featured.map((item) => {
                        const imageUrl = getItemImageUrl(item.previewSrc);

                        return (
                            <Link
                                key={item.id}
                                href={`/items/${item.id}`}
                                className="group relative flex flex-col overflow-hidden rounded-2xl border-2 border-slate-100 bg-white shadow-sm transition-all hover:shadow-xl hover:shadow-teal-500/10 hover:border-teal-400/40 hover:-translate-y-1"
                            >
                                <div className="relative aspect-square w-full overflow-hidden bg-slate-50">
                                    <Image
                                        src={imageUrl}
                                        alt={item.titleJa || item.title}
                                        fill
                                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    />
                                </div>
                                <div className="px-3 py-3 sm:px-4 sm:py-3 border-t border-slate-100">
                                    <p className="text-xs sm:text-sm font-bold text-slate-700 line-clamp-1 group-hover:text-teal-600 transition-colors">
                                        {item.titleJa || item.title}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* もっと見るボタン */}
                <div className="text-center">
                    <Link
                        href="/items"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-900 text-white font-black text-base sm:text-lg hover:bg-slate-800 hover:scale-105 transition-all shadow-lg"
                    >
                        {FREE_MATERIAL_COUNT_LABEL}をすべて見る
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </Link>
                    <p className="text-xs text-slate-400 font-medium mt-3">
                        会員登録・クレジットカード不要。クリック1つでダウンロードできます。
                    </p>
                </div>
            </div>
        </section>
    );
}
