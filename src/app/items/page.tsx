import { getItems } from "@/lib/items";
import { FilteredItemList } from "@/components/FilteredItemList";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LineBanner } from "@/components/LineBanner";
import { Metadata } from "next";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ category?: string }> }): Promise<Metadata> {
    const { category } = await searchParams;

    if (category === 'plain') {
        return {
            title: "文字なし自主トレイラスト一覧【無料・商用OK】｜自主トレ素材庫",
            description: "文字が入っていないシンプルな自主トレイラスト素材を無料ダウンロード。自由にテキストを追加して使えます。PT・OT・STの指導資料・患者配布用に。商用利用OK・登録不要。",
        };
    } else if (category === 'text') {
        return {
            title: "文字あり自主トレイラスト一覧【無料・商用OK】｜自主トレ素材庫",
            description: "運動名・手順の説明付き自主トレイラスト素材を無料ダウンロード。印刷してそのまま患者さんに渡せます。PT・OT・STの指導資料に。商用利用OK・登録不要。",
        };
    }

    return {
        title: "自主トレイラスト素材一覧（全200点以上）｜無料ダウンロード｜自主トレ素材庫",
        description: "スクワット・ブリッジ・ストレッチ・歩行訓練など200点以上の自主トレイラストを無料ダウンロード。上肢・下肢・体幹・嚥下など部位別に検索可能。文字あり・文字なしの2タイプ。商用利用OK。",
    };
}

export default async function ItemsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
    const { category } = await searchParams;
    const allItems = getItems();

    let items = allItems;
    let title = "自主トレイラスト素材一覧";
    let description = "スクワット・ブリッジ・ストレッチなど200点以上の自主トレイラストを無料でダウンロードできます。";

    if (category === 'plain') {
        items = allItems.filter(item => item.category === 'plain');
        title = "自主トレイラスト一覧（文字なし）";
        description = "文字が入っていないシンプルなイラスト素材です。自由にテキストを追加して使えます。";
    } else if (category === 'text') {
        items = allItems.filter(item => item.category === 'text');
        title = "自主トレイラスト一覧（文字あり）";
        description = "運動名・手順の説明付き。印刷してそのまま患者さんに渡せるイラスト素材です。";
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-12 flex-1">
                <div className="mb-10 text-center">
                    <h1 className="mb-4 text-3xl font-black text-slate-900 sm:text-4xl tracking-tight">
                        {title}
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-slate-500 font-medium">
                        {description}
                    </p>
                </div>

                <FilteredItemList items={items} />

                {/* LINE友だち追加バナー */}
                <div className="mt-16 max-w-5xl mx-auto">
                    <LineBanner />
                </div>
            </main>
            <Footer />
        </div>
    );
}
