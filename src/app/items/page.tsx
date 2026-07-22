import { getItems } from "@/lib/items";
import { FilteredItemList } from "@/components/FilteredItemList";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LineBanner } from "@/components/LineBanner";
import { ProductCta } from "@/components/ProductCta";
import { RepeatVisitBanner } from "@/components/RepeatVisitBanner";
import { PostDownloadLineToast } from "@/components/PostDownloadLineToast";
import { FREE_MATERIAL_COUNT } from "@/constants/content-counts";
import { seoItemCategories } from "@/lib/seoItemCategories";
import { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

const PROTECTED_JAPANESE_PHRASES = new Set([
    "自主トレ",
    "イラスト",
    "素材一覧",
    "トレーニング",
    "ストレッチ",
    "リハビリ",
    "バランス",
    "口腔フレイル",
]);
const JAPANESE_WORD_SEGMENTER = new Intl.Segmenter("ja", { granularity: "word" });

function protectJapanesePhrases(text: string): ReactNode {
    return text
        .split(/(自主トレ|イラスト|素材一覧|トレーニング|ストレッチ|リハビリ|バランス|口腔フレイル)/)
        .map((part, index) =>
            PROTECTED_JAPANESE_PHRASES.has(part) ? (
                <span key={`${part}-${index}`} className="inline-block sm:whitespace-nowrap">
                    {part}
                </span>
            ) : part,
        );
}

function wrapJapaneseWords(text: string): ReactNode {
    return Array.from(JAPANESE_WORD_SEGMENTER.segment(text), ({ segment, isWordLike }, index) =>
        isWordLike ? (
            <span key={`${segment}-${index}`} className="inline-block">
                {segment}
            </span>
        ) : segment,
    );
}

// カテゴリキーワード（ローマ字）→ フィルタ用キーワードのマッピング
// FilteredItemList が title / titleJa / fileName 中にいずれか1ワードを含めばヒット扱い
const CATEGORY_KEYWORDS: Record<string, { label: string; keywords: string[] }> = {
    shoulder: {
        label: "上肢（肩・腕）",
        keywords: [
            // 英語
            "shoulder", "scapular", "elbow", "arm", "wrist", "hand", "finger",
            "chopstick", "peg", "reach", "grip", "beanbag", "azuki", "banzai",
            "pendulum", "wall slide", "wall-slide", "writing", "eating", "spoon",
            // 日本語
            "肩", "肘", "腕", "上肢", "手指", "手のひら", "手首", "タオル握",
            "バンザイ", "箸", "お手玉", "ペグ", "ダンベル", "棒", "リーチ",
            "ピンキー", "母指", "対立",
            "振り子", "ウォールサイド", "書字", "食事", "スプーン",
        ],
    },
    hip: {
        label: "下肢（脚・股関節）",
        keywords: [
            // 英語
            "hip", "knee", "leg", "thigh", "squat", "heel", "slr", "leg-raise",
            "quadriceps", "hamstring", "glute", "bridge", "clam", "lunge",
            "ankle", "foot", "toe", "calf", "kneeling",
            "aerobike", "air bike", "air-bike", "towel gather", "towel-gather",
            // 日本語
            "膝", "股", "脚", "下肢", "足首", "足関節", "ヒール", "スライド", "SLR",
            "レッグレイズ", "スクワット", "ブリッジ", "太もも", "クラム", "四頭筋",
            "お尻", "臀", "ハム", "ヒンジ", "カーフ", "つま先", "かかと",
            "底背屈", "底屈", "背屈", "セッティング",
            "エアロバイク", "タオルギャザー", "ギャザー",
        ],
    },
    trunk: {
        label: "体幹トレーニング",
        keywords: [
            // 英語
            "trunk", "core", "plank", "abdomen", "back", "pelvic", "pelvis",
            "draw-in", "cat-and-dog", "diagonal", "rotation", "side-bridge",
            "puppy", "spine",
            // 日本語
            "体幹", "腹", "背筋", "骨盤", "ドローイン", "プランク", "ダイアゴナル",
            "回旋", "キャット", "腰", "サイドブリッジ", "パピーポジション",
            "腹筋", "脊椎",
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
            "wheelchair", "toilet", "bath", "sock", "jogging",
            // 日本語
            "立ち", "立位", "片足", "バランス", "サイドステップ", "椅子", "イス",
            "段差", "転倒", "スリッパ", "車椅子", "トイレ", "浴室", "寝返り",
            "端座位", "側臥位", "起き上がり", "肘立て", "両膝倒し", "コード",
            "正座", "脚を組", "脚組み", "前屈", "靴下", "靴ひも", "しゃがみ",
            "階段", "THA", "ソックス", "ジョギング",
        ],
    },
    oral: {
        label: "口腔・嚥下",
        keywords: [
            // 英語
            "cheek", "puffing", "puckering", "swallowing", "swallow",
            "forehead", "tongue", "saliva", "patakara", "pataka", "shakia",
            // 日本語
            "頬", "嚥下", "おでこ", "舌", "唾液", "口腔", "口唇",
            "パタカラ", "唇", "飲み込み", "シャキア",
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
    oral: {
        title: "口腔・嚥下の自主トレイラスト",
        description: "嚥下体操・舌・頬・口唇の運動向けイラスト素材です。摂食嚥下リハビリや口腔フレイル予防の指導に。",
        metaTitle: "口腔・嚥下の自主トレイラスト【無料・商用OK】｜自主トレ素材庫",
        metaDescription: "パタカラ体操・嚥下おでこ体操・舌の運動・頬の膨らませなど、口腔・嚥下のリハビリイラストを無料ダウンロード。PT・OT・ST向け。商用利用OK・登録不要。",
    },
};

const CATEGORY_CANONICALS: Record<string, string> = {
    shoulder: "/items/upper-limb-exercises/",
    hip: "/items/lower-limb-exercises/",
    trunk: "/items/trunk-exercises/",
    stretch: "/items/stretching-exercises/",
    walking: "/items/walking-exercises/",
};

const ITEM_CATEGORY_LINKS = [
    ...seoItemCategories.map(({ slug, breadcrumb }) => ({ slug, breadcrumb })),
    { slug: "swallowing-exercises", breadcrumb: "口腔・嚥下" },
];

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ category?: string; q?: string }> }): Promise<Metadata> {
    const { category, q } = await searchParams;

    // ローマ字カテゴリ（?q=shoulder 等）優先
    if (q && CATEGORY_META[q]) {
        const meta = CATEGORY_META[q];
        return {
            title: meta.metaTitle,
            description: meta.metaDescription,
            alternates: CATEGORY_CANONICALS[q]
                ? {
                    canonical:
                        "https://jishutore-sozaiko.online" + CATEGORY_CANONICALS[q],
                }
                : undefined,
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
            description: "運動名・手順の説明付きPNG素材を無料ダウンロード。印刷してそのまま患者さんに渡せます。画像内の文字は編集できません。商用利用OK・登録不要。",
        };
    }

    return {
        title: `自主トレイラスト素材 全${FREE_MATERIAL_COUNT}点【無料・商用OK・登録不要】｜自主トレ素材庫`,
        description: `スクワット・ブリッジ・嚥下体操など自主トレイラスト${FREE_MATERIAL_COUNT}点をすべて無料ダウンロード。登録不要・商用OK・クレジット表記不要。印刷してそのまま患者さんに渡せます。部位・疾患・姿勢で検索でき、文字あり・文字なしの2タイプ。`,
    };
}

export default async function ItemsPage({ searchParams }: { searchParams: Promise<{ category?: string; q?: string }> }) {
    const { category, q } = await searchParams;
    const allItems = getItems();

    let items = allItems;
    let title = "自主トレイラスト素材一覧";
    let description: ReactNode = (
        <>
            <span className="inline-block sm:whitespace-nowrap">スクワット・ブリッジ・</span>
            <span className="inline-block sm:whitespace-nowrap">ストレッチなど、</span>
            <span className="inline-block sm:whitespace-nowrap">{FREE_MATERIAL_COUNT}点の自主トレ素材を</span>
            <span className="inline-block sm:whitespace-nowrap">無料でダウンロードできます。</span>
            <span className="inline-block sm:whitespace-nowrap">文字なし版と、</span>
            <span className="inline-block sm:whitespace-nowrap">運動名・説明つきの文字あり版の</span>
            <span className="inline-block sm:whitespace-nowrap">2タイプから選べます。</span>
        </>
    );

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
            description = wrapJapaneseWords(CATEGORY_META[q].description);
        }
    } else if (category === 'plain') {
        items = allItems.filter(item => item.category === 'plain');
        title = "自主トレイラスト一覧（文字なし）";
        description = (
            <>
                <span className="inline-block sm:whitespace-nowrap">文字が入っていない</span>
                <span className="inline-block sm:whitespace-nowrap">シンプルなイラスト素材です。</span>
                <span className="inline-block sm:whitespace-nowrap">自由にテキストを追加して</span>
                <span className="inline-block sm:whitespace-nowrap">使えます。</span>
            </>
        );
    } else if (category === 'text') {
        items = allItems.filter(item => item.category === 'text');
        title = "自主トレイラスト一覧（文字あり）";
        description = (
            <>
                <span className="inline-block sm:whitespace-nowrap">運動名・手順の説明付きPNGです。</span>
                <span className="inline-block sm:whitespace-nowrap">印刷してそのまま使えますが、</span>
                <span className="inline-block sm:whitespace-nowrap">画像内の文字は編集できません。</span>
            </>
        );
    }

    // カテゴリチップ・検索バー挙動だけ知らせれば良い（filterは既にサーバー側で完了）。
    const categoryFilter = q && CATEGORY_KEYWORDS[q]
        ? { key: q, label: CATEGORY_KEYWORDS[q].label }
        : undefined;

    const activeItemType = category === "plain" || category === "text" ? category : "all";
    const itemTypeCounts = allItems.reduce(
        (counts, item) => {
            if (item.category === "plain") counts.plain += 1;
            if (item.category === "text") counts.text += 1;
            return counts;
        },
        { plain: 0, text: 0 },
    );
    const itemTypeTabs = [
        { key: "all", label: "すべて", href: "/items/", count: allItems.length },
        { key: "plain", label: "文字なし", href: "/items?category=plain", count: itemTypeCounts.plain },
        { key: "text", label: "文字あり", href: "/items?category=text", count: itemTypeCounts.text },
    ] as const;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-12 flex-1">
                <div className="mb-10 text-center">
                    <h1 className="jp-heading mb-4 text-[1.75rem] font-black text-slate-900 sm:text-4xl tracking-tight">
                        {protectJapanesePhrases(title)}
                    </h1>
                    <p className="jp-text mx-auto max-w-2xl text-base sm:text-lg text-slate-500 font-medium">
                        {description}
                    </p>
                    <div className="mt-5 flex flex-wrap justify-center gap-2">
                        {[
                            "無料ダウンロード",
                            "商用利用OK",
                            "登録不要",
                            "クレジット表記不要",
                        ].map((label) => (
                            <span
                                key={label}
                                className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700"
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                </div>

                {!q && (
                    <nav
                        aria-label="素材タイプ"
                        className="mx-auto mb-8 max-w-3xl rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
                    >
                        <p className="jp-text mb-3 text-center text-sm leading-relaxed text-slate-600">
                            同じ運動のイラストに、文字なし版と
                            <span className="inline-block sm:whitespace-nowrap">文字あり版（運動名・説明つき）</span>
                            の<span className="inline-block sm:whitespace-nowrap">2タイプがあります。</span>
                        </p>
                        <div className="grid grid-cols-3 gap-1.5 rounded-xl bg-slate-100 p-1 sm:gap-2">
                            {itemTypeTabs.map((tab) => {
                                const isActive = activeItemType === tab.key;

                                return (
                                    <Link
                                        key={tab.key}
                                        href={tab.href}
                                        aria-current={isActive ? "page" : undefined}
                                        className={`flex min-w-0 flex-col items-center justify-center rounded-lg px-1.5 py-2.5 text-center transition sm:px-4 ${
                                            isActive
                                                ? "bg-teal-700 text-white shadow-sm"
                                                : "text-slate-600 hover:bg-white hover:text-teal-700"
                                        }`}
                                    >
                                        <span className="whitespace-nowrap text-xs font-black sm:text-sm">
                                            {tab.label}
                                        </span>
                                        <span
                                            className={`mt-0.5 whitespace-nowrap text-[10px] font-bold sm:text-xs ${
                                                isActive ? "text-teal-50" : "text-slate-700"
                                            }`}
                                        >
                                            {tab.count}点
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>
                )}

                <nav
                    aria-label="素材カテゴリ"
                    className="mx-auto mb-8 max-w-5xl rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
                >
                    <div className="mb-3 flex items-center justify-between gap-3">
                        <h2 className="whitespace-nowrap text-sm font-black text-slate-900 sm:text-base">
                            部位・用途から探す
                        </h2>
                        <Link
                            href="/items/"
                            className="shrink-0 text-xs font-bold text-teal-700 transition-colors hover:text-teal-500"
                        >
                            すべて表示
                        </Link>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
                        {ITEM_CATEGORY_LINKS.map((itemCategory) => (
                            <Link
                                key={itemCategory.slug}
                                href={`/items/${itemCategory.slug}/`}
                                className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 sm:text-sm"
                            >
                                {itemCategory.breadcrumb}
                            </Link>
                        ))}
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:hidden">
                        横にスワイプすると、ほかのカテゴリも選べます。
                    </p>
                </nav>

                <FilteredItemList
                    items={items}
                    inlineAds
                    categoryFilter={categoryFilter}
                />

                {/* 下部：有料資料への導線 */}
                <div className="mt-16 max-w-5xl mx-auto">
                    <ProductCta location="items_bottom_cta" variant="compact" />
                </div>

                {/* 下部：ブックマーク・新着通知（リピーター化導線） */}
                <div className="mt-6 max-w-5xl mx-auto">
                    <RepeatVisitBanner placement="items_bottom" />
                </div>

                {/* 下部：LINE無料特典 */}
                <div className="mt-6 max-w-5xl mx-auto">
                    <LineBanner />
                </div>
            </main>
            <Footer />
            <PostDownloadLineToast />
        </div>
    );
}
