import { getItems } from "@/lib/items";
import { FilteredItemList } from "@/components/FilteredItemList";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LineBanner } from "@/components/LineBanner";
import { ProductDualCta } from "@/components/ProductDualCta";
import { SponsorAdPlaceholder } from "@/components/SponsorAdPlaceholder";
import { Metadata } from "next";

// カテゴリキーワード（ローマ字）→ フィルタ用キーワードのマッピング
// FilteredItemList が title / titleJa / fileName 中にいずれか1ワードを含めばヒット扱い
const CATEGORY_KEYWORDS: Record<string, { label: string; keywords: string[] }> = {
    shoulder: {
        label: "上肢（肩・腕）",
        keywords: [
            // 英語
            "shoulder", "scapular", "elbow", "arm", "wrist", "hand", "finger",
            "chopstick", "peg", "reach", "grip", "beanbag", "azuki", "banzai",
            "patakara", "pataka", "puffing", "puckering",
            // 日本語
            "肩", "肘", "腕", "上肢", "手指", "手のひら", "手首", "タオル握",
            "バンザイ", "箸", "お手玉", "ペグ", "ダンベル", "棒", "リーチ",
            "ピンキー", "母指", "対立",
        ],
    },
    hip: {
        label: "下肢（脚・股関節）",
        keywords: [
            // 英語
            "hip", "knee", "leg", "thigh", "squat", "heel", "slr", "leg-raise",
            "quadriceps", "hamstring", "glute", "bridge", "clam", "lunge",
            "ankle", "foot", "toe", "calf", "kneeling",
            // 日本語
            "膝", "股", "脚", "下肢", "足首", "足関節", "ヒール", "スライド", "SLR",
            "レッグレイズ", "スクワット", "ブリッジ", "太もも", "クラム", "四頭筋",
            "お尻", "臀", "ハム", "ヒンジ", "カーフ", "つま先", "かかと",
            "底背屈", "底屈", "背屈", "セッティング",
        ],
    },
    trunk: {
        label: "体幹トレーニング",
        keywords: [
            // 英語
            "trunk", "core", "plank", "abdomen", "back", "pelvic", "pelvis",
            "draw-in", "cat-and-dog", "diagonal", "rotation", "side-bridge",
            "puppy",
            // 日本語
            "体幹", "腹", "背筋", "骨盤", "ドローイン", "プランク", "ダイアゴナル",
            "回旋", "キャット", "腰", "サイドブリッジ", "パピーポジション",
            "腹筋",
        ],
    },
    stretch: {
        label: "ストレッチ",
        keywords: [
            // 英語
            "stretch", "flexion-stretch", "extension-stretch", "opening",
            "doorway", "towel-side-bend", "trunk-extension", "trunk-flexion",
            // 日本語
            "ストレッチ", "伸ばし", "柔軟", "ハムストリング", "胸開き",
            "ロッキング", "ドアウェイ",
        ],
    },
    walking: {
        label: "歩行訓練",
        keywords: [
            // 英語
            "walking", "walk", "cane", "walker", "parallel-bar", "treadmill", "gait",
            // 日本語
            "歩行", "歩", "杖", "歩行器", "平行棒", "トレッドミル", "ノルディック",
        ],
    },
    stand: {
        label: "立ち上がり・バランス",
        keywords: [
            // 英語
            "stand", "sit-to-stand", "sit", "standing", "single-leg", "balance",
            "side-step", "step", "rolling", "side-lying", "edge-sitting",
            "wheelchair", "toilet", "bath",
            // 日本語
            "立ち", "立位", "片足", "バランス", "サイドステップ", "椅子", "イス",
            "段差", "転倒", "スリッパ", "車椅子", "トイレ", "浴室", "寝返り",
            "端座位", "側臥位", "起き上がり", "肘立て", "両膝倒し", "コード",
            "正座", "脚を組", "脚組み", "前屈", "靴下", "靴ひも", "しゃがみ",
            "階段", "THA",
        ],
    },
};

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
        title: "自主トレイラスト素材一覧（全300点以上）｜無料ダウンロード｜自主トレ素材庫",
        description: "スクワット・ブリッジ・ストレッチ・歩行訓練など300点以上の自主トレイラストを無料ダウンロード。上肢・下肢・体幹・嚥下など部位別に検索可能。文字あり・文字なしの2タイプ。商用利用OK。",
    };
}

export default async function ItemsPage({ searchParams }: { searchParams: Promise<{ category?: string; q?: string }> }) {
    const { category, q } = await searchParams;
    const allItems = getItems();

    let items = allItems;
    let title = "自主トレイラスト素材一覧";
    let description = "スクワット・ブリッジ・ストレッチなど、300点以上の自主トレイラストを、無料でダウンロードできます。";

    // ローマ字カテゴリ（?q=shoulder 等）優先。サーバー側で複数キーワードORフィルタを実行し、
    // SSR時点で素材一覧がHTMLに出るようにする（Suspense fallback空問題の解消）。
    if (q && CATEGORY_KEYWORDS[q]) {
        const cfg = CATEGORY_KEYWORDS[q];
        const lowerKw = cfg.keywords.map((k) => k.toLowerCase());
        items = allItems.filter((item) => {
            const t = item.title.toLowerCase();
            const tj = (item.titleJa ?? '').toLowerCase();
            const fn = item.fileName.toLowerCase();
            return lowerKw.some((kw) => t.includes(kw) || tj.includes(kw) || fn.includes(kw));
        });
        if (CATEGORY_META[q]) {
            title = CATEGORY_META[q].title;
            description = CATEGORY_META[q].description;
        }
    } else if (category === 'plain') {
        items = allItems.filter(item => item.category === 'plain');
        title = "自主トレイラスト一覧（文字なし）";
        description = "文字が入っていないシンプルなイラスト素材です。自由にテキストを追加して使えます。";
    } else if (category === 'text') {
        items = allItems.filter(item => item.category === 'text');
        title = "自主トレイラスト一覧（文字あり）";
        description = "運動名・手順の説明付き。印刷してそのまま患者さんに渡せるイラスト素材です。";
    }

    // カテゴリチップ・検索バー挙動だけ知らせれば良い（filterは既にサーバー側で完了）。
    const categoryFilter = q && CATEGORY_KEYWORDS[q]
        ? { key: q, label: CATEGORY_KEYWORDS[q].label }
        : undefined;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-12 flex-1">
                <div className="mb-10 text-center">
                    <h1 className="mb-4 text-3xl font-black text-slate-900 sm:text-4xl tracking-tight">
                        {title}
                    </h1>
                    <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-500 font-medium break-keep">
                        {description}
                    </p>
                </div>

                {/* 上部：自社商品2LP直リンク（メインCTA） */}
                <div className="mb-6 max-w-5xl mx-auto">
                    <ProductDualCta />
                </div>

                {/* 上部：スポンサー枠（広告主向け） */}
                <div className="mb-10 max-w-5xl mx-auto">
                    <SponsorAdPlaceholder variant="top" />
                </div>

                <FilteredItemList
                    items={items}
                    inlineAds
                    categoryFilter={categoryFilter}
                />

                {/* 下部：LINE無料特典 */}
                <div className="mt-16 max-w-5xl mx-auto">
                    <LineBanner />
                </div>
            </main>
            <Footer />
        </div>
    );
}
