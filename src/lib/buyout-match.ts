import { Item } from "@/types";

/**
 * 買い切り2商品（疾患別9本セット・姿勢別セット）の文脈マッチング。
 * --------------------------------------------------------------
 * ★2026-08-28：素材詳細507ページの有料CTAを買い切り版に差し替えたときに新設。
 *   8/22のPlus新規受付停止で ItemDetailPlusCta が null を返すようになり、
 *   最大流入面（素材詳細）から有料導線が消えていたため、
 *   8/20に販売再開した買い切り2商品をここへ戻す。
 *
 * 素材1点につき「疾患別」か「姿勢別」のどちらか一方を主役として出す。
 * 両方を並べるとバラ売り時代の「どれを買えばいいか分からない」に逆戻りするため、
 * もう一方はカード下部に1行だけ添える（2026-07の主役CTA＋副導線1行の設計を踏襲）。
 */

export type BuyoutProductId = "disease" | "posture";

export type BuyoutProduct = {
    id: BuyoutProductId;
    /** 商品名（CTAボタン・リンク文言に使う） */
    name: string;
    href: string;
    /** 透かし入りプレビューの置き場所 */
    previewDir: string;
};

/** 買い切りの価格。商品ページ側の表記と揃えること。 */
export const BUYOUT_PRICE_YEN = 980;

export const BUYOUT_PRODUCTS: Record<BuyoutProductId, BuyoutProduct> = {
    disease: {
        id: "disease",
        name: "疾患別 9本セット",
        href: "/products/self-training-materials/",
        previewDir: "/preview/self-training-materials/previews",
    },
    posture: {
        id: "posture",
        name: "姿勢別セット",
        href: "/products/home-elderly-self-training/",
        previewDir: "/products/home-elderly-self-training/previews",
    },
};

export type BuyoutMatch = {
    product: BuyoutProduct;
    /** セット内の該当ページ名（例: 腰痛／座位でできる自主トレ） */
    deckLabel: string;
    /** 透かし入りプレビュー画像（実在するファイルだけを指す） */
    previewSrc: string;
};

/**
 * 疾患判定から外す注意喚起の文。
 * targetCondition には「腰痛がある場合は医師に相談してください」のような
 * 禁忌・注意の記述が混ざっており、これを拾うと無関係な素材が腰痛判定になる。
 */
const CAUTION_MARKERS = ["相談", "禁忌", "避け", "中止", "悪化", "控え", "注意してください", "痛みが強い"];

const dropCautionSentences = (text: string): string =>
    text
        .split(/(?<=。)/)
        .filter((sentence) => !CAUTION_MARKERS.some((marker) => sentence.includes(marker)))
        .join("");

/** 疾患別セットの収録9本。判定は上から順に、具体的な疾患名を優先する。 */
const DISEASE_DECKS: { slug: string; label: string; keywords: string[] }[] = [
    { slug: "parkinsons", label: "パーキンソン病", keywords: ["パーキンソン"] },
    { slug: "frozen-shoulder", label: "五十肩", keywords: ["五十肩", "肩関節周囲炎", "四十肩"] },
    { slug: "compression-fracture", label: "圧迫骨折後", keywords: ["圧迫骨折", "脊椎骨折", "骨粗鬆"] },
    { slug: "hip-replacement", label: "人工股関節術後", keywords: ["人工股関節", "THA", "股関節置換"] },
    { slug: "femur-fracture", label: "大腿骨骨折術後", keywords: ["大腿骨頸部", "大腿骨骨折", "頸部骨折"] },
    { slug: "knee-oa-tka", label: "膝OA・TKA", keywords: ["変形性膝関節症", "膝OA", "TKA", "人工膝"] },
    { slug: "low-back-pain", label: "腰痛", keywords: ["腰痛症", "腰痛", "脊柱管", "椎間板"] },
];

/** 脳卒中は上肢／下肢で収録が分かれているので、部位の語で振り分ける。 */
const STROKE_KEYWORDS = ["脳卒中", "片麻痺", "脳血管", "麻痺側"];
const UPPER_LIMB_KEYWORDS = ["肩", "肘", "手指", "上肢", "リーチ", "手首", "前腕"];

/** 姿勢別セットの収録6本。姿勢（座位・臥位・立位）を部位より優先する。 */
const POSTURE_DECKS: { slug: string; label: string; keywords: string[] }[] = [
    { slug: "supine", label: "臥位でできる自主トレ", keywords: ["臥位", "ベッド上", "仰向け", "寝た"] },
    { slug: "sitting", label: "座位でできる自主トレ", keywords: ["座位", "椅子に座", "座って"] },
    { slug: "standing", label: "立位でできる自主トレ", keywords: ["立位", "立って", "立ち上が", "つかまり"] },
    { slug: "upper-limb", label: "上肢の自主トレ", keywords: UPPER_LIMB_KEYWORDS },
    {
        slug: "lower-limb",
        label: "下肢の自主トレ",
        keywords: ["下肢", "歩行", "膝", "足", "太もも", "ふくらはぎ", "股関節"],
    },
];

const FULL_BODY_DECK = { slug: "full-body", label: "全身で使える自主トレ" };

const buildMatch = (product: BuyoutProduct, slug: string, deckLabel: string): BuyoutMatch => ({
    product,
    deckLabel,
    previewSrc: `${product.previewDir}/${slug}-01.webp`,
});

/**
 * 素材1点に対して、主役として出す買い切り商品を決める。
 * 疾患名が読み取れれば疾患別セット、読み取れなければ姿勢別セットへ寄せる。
 * どの素材でも必ず1件返る（CTAが消える状態を作らない）。
 */
export function matchBuyoutProduct(item: Item): BuyoutMatch {
    const title = item.titleJa || item.title || "";

    // 疾患判定は注意喚起の文を除いたテキストで行う。
    const diseaseSource = [
        title,
        dropCautionSentences(item.description || ""),
        dropCautionSentences(item.targetCondition || ""),
    ].join(" ");

    for (const deck of DISEASE_DECKS) {
        if (deck.keywords.some((keyword) => diseaseSource.includes(keyword))) {
            return buildMatch(BUYOUT_PRODUCTS.disease, deck.slug, deck.label);
        }
    }

    if (STROKE_KEYWORDS.some((keyword) => diseaseSource.includes(keyword))) {
        const isUpper = UPPER_LIMB_KEYWORDS.some((keyword) => diseaseSource.includes(keyword));
        return isUpper
            ? buildMatch(BUYOUT_PRODUCTS.disease, "stroke-upper", "脳卒中 上肢")
            : buildMatch(BUYOUT_PRODUCTS.disease, "stroke-lower", "脳卒中 下肢");
    }

    // 姿勢は素材名と説明文に出る。対象疾患欄は姿勢の記述が薄いので見ない。
    const postureSource = [title, item.description || ""].join(" ");
    for (const deck of POSTURE_DECKS) {
        if (deck.keywords.some((keyword) => postureSource.includes(keyword))) {
            return buildMatch(BUYOUT_PRODUCTS.posture, deck.slug, deck.label);
        }
    }

    return buildMatch(BUYOUT_PRODUCTS.posture, FULL_BODY_DECK.slug, FULL_BODY_DECK.label);
}

/** 主役の反対側（副導線1行で案内する方）。 */
export function getOtherBuyoutProduct(product: BuyoutProduct): BuyoutProduct {
    return product.id === "disease" ? BUYOUT_PRODUCTS.posture : BUYOUT_PRODUCTS.disease;
}
