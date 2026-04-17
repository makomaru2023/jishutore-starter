import Link from "next/link";

/**
 * トップページ用・カテゴリ別検索ナビ
 * 部位・用途別カードから素材一覧の検索結果へ直接ジャンプ
 */

type Category = {
    emoji: string;
    title: string;
    description: string;
    query: string;
    color: string;
};

const categories: Category[] = [
    {
        emoji: "💪",
        title: "上肢（肩・腕）",
        description: "肩関節・上肢のトレーニング",
        query: "肩",
        color: "from-rose-50 to-pink-50 border-rose-100 hover:border-rose-300",
    },
    {
        emoji: "🦵",
        title: "下肢（脚・股関節）",
        description: "股関節・下肢のトレーニング",
        query: "股",
        color: "from-amber-50 to-orange-50 border-amber-100 hover:border-amber-300",
    },
    {
        emoji: "🧘",
        title: "体幹トレーニング",
        description: "腹筋・背筋・体幹の強化",
        query: "体幹",
        color: "from-teal-50 to-cyan-50 border-teal-100 hover:border-teal-300",
    },
    {
        emoji: "🤸",
        title: "ストレッチ",
        description: "筋肉の柔軟性・可動域改善",
        query: "ストレッチ",
        color: "from-violet-50 to-purple-50 border-violet-100 hover:border-violet-300",
    },
    {
        emoji: "🚶",
        title: "歩行訓練",
        description: "歩行能力の改善・維持",
        query: "歩行",
        color: "from-sky-50 to-blue-50 border-sky-100 hover:border-sky-300",
    },
    {
        emoji: "🎯",
        title: "立ち上がり・バランス",
        description: "立位保持・転倒予防",
        query: "立",
        color: "from-emerald-50 to-green-50 border-emerald-100 hover:border-emerald-300",
    },
];

export function HomeCategoryNav() {
    return (
        <section className="py-16 sm:py-20 bg-white border-y border-slate-100">
            <div className="container mx-auto px-4">
                {/* セクションヘッダー */}
                <div className="text-center mb-10 sm:mb-12">
                    <p className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-black text-xs tracking-widest mb-4">
                        CATEGORY
                    </p>
                    <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mb-3 tracking-tight">
                        部位・目的から<span className="text-teal-500">探す</span>
                    </h2>
                    <p className="text-slate-500 font-medium text-sm sm:text-base max-w-2xl mx-auto">
                        ご利用シーンに合わせて、ぴったりの自主トレイラストをすぐに見つけられます。
                    </p>
                </div>

                {/* カテゴリグリッド */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 max-w-5xl mx-auto">
                    {categories.map((cat) => (
                        <Link
                            key={cat.query}
                            href={`/items?q=${encodeURIComponent(cat.query)}`}
                            className={`group relative flex flex-col items-center text-center p-5 sm:p-6 rounded-2xl bg-gradient-to-br ${cat.color} border-2 transition-all hover:shadow-lg hover:-translate-y-1`}
                        >
                            <div className="text-4xl sm:text-5xl mb-3 transition-transform group-hover:scale-110">
                                {cat.emoji}
                            </div>
                            <h3 className="font-black text-slate-900 text-sm sm:text-base mb-1 leading-tight">
                                {cat.title}
                            </h3>
                            <p className="text-xs text-slate-500 font-medium leading-snug hidden sm:block">
                                {cat.description}
                            </p>
                            <div className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-slate-600 group-hover:text-teal-600 transition-colors">
                                見る
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* キーワード検索の補足 */}
                <div className="text-center mt-10">
                    <p className="text-sm text-slate-500 font-medium">
                        探したい部位や運動名がある方は
                        <Link href="/items" className="text-teal-600 font-black hover:text-teal-500 underline-offset-2 hover:underline ml-1">
                            素材一覧でキーワード検索 →
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
