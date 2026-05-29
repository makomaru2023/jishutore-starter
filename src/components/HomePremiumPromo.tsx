import Link from "next/link";
import { PremiumItemCard } from "./PremiumItemCard";
import { premiumItems } from "../../data/premiumItems";

export function HomePremiumPromo() {
    return (
        <section className="bg-white py-16 sm:py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-10">
                        <p className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-700 font-bold text-xs tracking-widest mb-4">
                            完成済み資料セット
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 leading-tight">
                            無料イラストを1枚ずつ貼る
                            <br className="sm:hidden" />
                            時間がない方へ
                        </h2>
                        <p className="text-slate-500 font-medium text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                            イラストを集めて1枚ずつ作るのが大変なときに。
                            <br className="hidden sm:block" />
                            疾患別に説明したい場合と、今できる姿勢から選びたい場合で使い分けられます。
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {premiumItems.map((item) => (
                            <PremiumItemCard key={item.id} item={item} variant="compact" />
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all"
                        >
                            PowerPoint資料の商品一覧を見る
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
