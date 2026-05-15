import { getItems } from "@/lib/items";
import { FilteredItemList } from "@/components/FilteredItemList";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LineBanner } from "@/components/LineBanner";
import { ProductCta } from "@/components/ProductCta";
import { SponsorRecruitment } from "@/components/SponsorRecruitment";
import { Metadata } from "next";

// カテゴリキーワード（ローマ字）→ 表示メタ情報のマッピング
const CATEGORY_META: Record<string, { title: string; description: string; metaTitle: string; metaDescription: string }> = {
    shoulder: {
        title: "上肢（肩・腕）の自主トレイラスト",
        description: "肩関節・上肢のトレーニング向けイラスト素材です。リハビリ指導や患者配布資料にお使いいただけます。",
        metaTitle: "上肢（肩・腕）の自主トレイラスト【無料・商用OK】｜自主トレ素材庫",
        metaDescription: "肩関節屈曲・外転・肩甲骨運動など、上肢のリハビリ自主トレイラストを無料ダウンロード。PT・OT・ST向け。商用利用OK・登録不要。",
    },
    hip: {
        title: "下肢（脚・股関節）の自主トレイラスト",
        description: "股関節・下肢のトレーニング向けイラスト素材です。歩行・バランス能力の改善指導にお使いください。",
        metaTitle: "下肢（脚・股関節）の自主トレイラスト【無料・商用OK】｜自主トレ素材庫",
        metaDescription: "股関節外転・SLR・ヒップヒンジ・お尻上げなど、下肢のリハビリ自主トレイラストを無料ダウンロード。PT・OT・ST向け。商用利用OK・登録不要。",
    },
    trunk: {
        title: "体幹トレーニングの自主トレイラスト",
        description: "腹筋・背筋・体幹強化のトレーニング向けイラスト素材です。姿勢改善や腰痛予防の指導に。",
        metaTitle: "体幹トレーニングの自主トレイラスト【無料・商用OK】｜自主トレ素材庫",
        metaDescription: "体幹回旋・伸展・屈曲・プランクなど、体幹トレーニングのイラストを無料ダウンロード。PT・OT・ST向け。商用利用OK・登録不要。",
    },
    stretch: {
        title: "ストレッチの自主トレイラスト",
        description: "筋肉の柔軟性向上・関節可動域改善のためのストレッチイラスト素材です。",
        metaTitle: "ストレッチの自主トレイラスト【無料・商用OK】｜自主トレ素材庫",
        metaDescription: "ハムストリングス・四頭筋・前腕・頚部・下腿などのストレッチイラストを無料ダウンロード。PT・OT・ST向け。商用利用OK・登録不要。",
    },
    walking: {
        title: "歩行訓練の自主トレイラスト",
        description: "歩行能力の改善・維持に役立つ歩行訓練イラスト素材です。杖・歩行器・平行棒の指導に。",
        metaTitle: "歩行訓練の自主トレイラスト【無料・商用OK】｜自主トレ素材庫",
        metaDescription: "杖歩行・歩行器・平行棒・ノルディック・トレッドミルなど、歩行訓練のイラストを無料ダウンロード。PT・OT・ST向け。商用利用OK・登録不要。",
    },
    stand: {
        title: "立ち上がり・バランスの自主トレイラスト",
        description: "立位保持・立ち上がり・転倒予防に向けたイラスト素材です。介護予防・地域体操にも。",
        metaTitle: "立ち上がり・バランスの自主トレイラスト【無料・商用OK】｜自主トレ素材庫",
        metaDescription: "立ち座り・片足立ち・立位での運動など、バランス・転倒予防のイラストを無料ダウンロード。PT・OT・ST向け。商用利用OK・登録不要。",
    },
};

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ category?: string; q?: string }> }): Promise<Metadata> {
    const { category, q } = await searchParams;

    // ローマ字カテゴリ（?q=shoulder 等）優先
    if (q && CATEGORY_META[q]) {
        const meta = CATEGORY_META[q];
        return {
            title: meta.metaTitle,
            description: meta.metaDescription,
        };
    }

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

export default async function ItemsPage({ searchParams }: { searchParams: Promise<{ category?: string; q?: string }> }) {
    const { category, q } = await searchParams;
    const allItems = getItems();

    let items = allItems;
    let title = "自主トレイラスト素材一覧";
    let description = "スクワット・ブリッジ・ストレッチなど、200点以上の自主トレイラストを、無料でダウンロードできます。";

    // ローマ字カテゴリ（?q=shoulder 等）優先
    if (q && CATEGORY_META[q]) {
        title = CATEGORY_META[q].title;
        description = CATEGORY_META[q].description;
    } else if (category === 'plain') {
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
                    <p className="mx-auto max-w-2xl text-lg text-slate-500 font-medium break-keep">
                        {description}
                    </p>
                </div>

                {/* note有料商品への導線（上部・コンパクト） */}
                <div className="mb-8 max-w-5xl mx-auto">
                    <ProductCta location="items_top_cta" variant="compact" />
                </div>

                {/* LINE友だち追加バナー（上部） */}
                <div className="mb-10 max-w-5xl mx-auto">
                    <LineBanner />
                </div>

                <FilteredItemList
                    items={items}
                    middleCta={<ProductCta location="items_middle_cta" variant="full" />}
                    middleCtaAfter={12}
                />

                {/* スポンサー募集 */}
                <div className="mt-16 max-w-5xl mx-auto">
                    <SponsorRecruitment />
                </div>

                {/* LINE友だち追加バナー */}
                <div className="mt-10 max-w-5xl mx-auto">
                    <LineBanner />
                </div>
            </main>
            <Footer />
        </div>
    );
}
