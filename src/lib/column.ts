/**
 * サイト内コラム（/column/）のレジストリと型。
 *
 * 方式：記事は1ファイル1記事の TSX モジュール（`src/data/column/articles/*.tsx`）。
 * MDX 等の追加依存を入れず、frontmatter 相当のメタデータを型で縛る。
 * 記事の追加はこのファイルの `articles` に1行足すだけ。
 *
 * ★このモジュールはクライアントコンポーネントから import しないこと。
 * 記事本体（JSX）と fee-check の全データを巻き込むため、バンドルが太る。
 * ラベルやリンク先が必要なときは、サーバー側から props で渡す。
 * （fee-check.ts / fee-check-shared.ts を分けているのと同じ理由）
 */

import type { ComponentType } from "react";
import { getFeeItem } from "@/lib/fee-check";
import { getItems } from "@/lib/items";

import { article as anzenTaisakuTaiseiKasan } from "@/data/column/articles/anzen-taisaku-taisei-kasan";
import { article as bcpMisakuteiGensan } from "@/data/column/articles/bcp-misakutei-gensan";
import { article as benkyokaiShiryoMaeNiKimeru } from "@/data/column/articles/benkyokai-shiryo-mae-ni-kimeru";
import { article as homonRihaShinryoMijisshiGensan } from "@/data/column/articles/homon-riha-shinryo-mijisshi-gensan";
import { article as kaiteiJohoDokoWoMiru } from "@/data/column/articles/kaitei-joho-doko-wo-miru";
import { article as kaiteiWatch202608 } from "@/data/column/articles/kaitei-watch-2026-08";
import { article as kanpoTeiseiToWa } from "@/data/column/articles/kanpo-teisei-to-wa";
import { article as kokujiTsuchiGigikaishakuChigai } from "@/data/column/articles/kokuji-tsuchi-gigikaishaku-chigai";
import { article as ninchishoTankiShuchuRihaTsusho } from "@/data/column/articles/ninchisho-tanki-shuchu-riha-tsusho";
import { article as nyushoZengoHomonShidoJitsumu } from "@/data/column/articles/nyusho-zengo-homon-shido-jitsumu";
import { article as rihaKeikakushoSetsumeiTejun } from "@/data/column/articles/riha-keikakusho-setsumei-tejun";
import { article as rokenShokiKasanKubun } from "@/data/column/articles/roken-shoki-kasan-kubun";
import { article as rokenTaishojiShienKasan } from "@/data/column/articles/roken-taishoji-shien-kasan";
import { article as santeiYoukenToShisetsuKijun } from "@/data/column/articles/santei-youken-to-shisetsu-kijun";

export type ColumnCategory = "fee-practice" | "kaitei-watch" | "seido-yomikata" | "shiryo";

/** 記事末尾のCTA。1記事につき1つだけ（詰め込まない・企画書§4）。 */
export type ColumnCtaId = "plus" | "free-items";

export type ColumnRelatedFeeItem = {
    /** fee-check の分野ID（例 "roken-nyusho"） */
    domain: string;
    /** fee-check の項目ID（例 "roken-nyusho-nyusho-zengo-homon-shido"） */
    id: string;
};

export type ColumnArticle = {
    /** URL になる。`/column/<slug>/` */
    slug: string;
    /** h1・metadata title のもと。先頭に検索語を置く（編集ガイド§3） */
    title: string;
    /** metadata description。120〜150字で記事の答えを先出しする */
    description: string;
    category: ColumnCategory;
    /** YYYY-MM-DD */
    publishedAt: string;
    /** YYYY-MM-DD。sitemap の lastModified と JSON-LD の dateModified に使う */
    updatedAt: string;
    /**
     * 記事冒頭のアイキャッチ画像（任意）。`public/column/` に置いた画像を指す。
     * ファイル名は kebab-case の ASCII。alt は「何が描かれているか」を書く。
     * ★場面イラスト用。数字や要件を伝える図解は本文の Figure（SVG）で扱うこと。
     */
    hero?: { src: string; alt: string; width: number; height: number };
    /** 「この記事でわかること」。3点が基本 */
    takeaways: string[];
    /** 関連する報酬チェック。3件まで。ビルド時に実在チェックする */
    relatedFeeItems?: ColumnRelatedFeeItem[];
    /** 関連する無料素材のID（items.json）。任意。ビルド時に実在チェックする */
    relatedItems?: string[];
    cta: ColumnCtaId;
    /** 本文。h2 は2〜4個（編集ガイド§3） */
    Body: ComponentType;
};

export const columnCategoryLabels: Record<ColumnCategory, string> = {
    "fee-practice": "加算と記録の実務",
    "kaitei-watch": "改定ウォッチ",
    // 個別の加算ではなく、制度の資料そのものの読み方を扱う回。
    // 「聞きにくいけれど誰も教えてくれない」ところを引き受ける枠。
    "seido-yomikata": "制度の読み方",
    shiryo: "資料づくりのコツ",
};

export const columnCategoryStyles: Record<ColumnCategory, string> = {
    "fee-practice": "border-blue-200 bg-blue-50 text-blue-800",
    "kaitei-watch": "border-amber-200 bg-amber-50 text-amber-800",
    "seido-yomikata": "border-violet-200 bg-violet-50 text-violet-800",
    shiryo: "border-emerald-200 bg-emerald-50 text-emerald-800",
};

/**
 * 記事の一覧。**この配列の順番が、公開日が同じ記事どうしの表示順になる**。
 * 見せたい順に並べること（先頭ほど上に出る）。
 */
const articles: ColumnArticle[] = [
    kaiteiWatch202608,
    // 「制度の読み方」は、加算の記事を読むための土台になる回。先頭近くに置く。
    kokujiTsuchiGigikaishakuChigai,
    santeiYoukenToShisetsuKijun,
    kanpoTeiseiToWa,
    kaiteiJohoDokoWoMiru,
    rokenShokiKasanKubun,
    homonRihaShinryoMijisshiGensan,
    nyushoZengoHomonShidoJitsumu,
    rokenTaishojiShienKasan,
    rihaKeikakushoSetsumeiTejun,
    ninchishoTankiShuchuRihaTsusho,
    bcpMisakuteiGensan,
    anzenTaisakuTaiseiKasan,
    benkyokaiShiryoMaeNiKimeru,
];

export function getColumnUrl(slug: string): string {
    return `/column/${slug}/`;
}

/**
 * 新着順（publishedAt の降順）。同じ公開日の記事は `articles` の並び順を保つ。
 * slug のアルファベット順にすると、まとめて公開した月の並びが意味を持たなくなるため。
 */
export function getColumnArticles(): ColumnArticle[] {
    return articles
        .map((article, index) => ({ article, index }))
        .sort((a, b) =>
            a.article.publishedAt === b.article.publishedAt
                ? a.index - b.index
                : b.article.publishedAt.localeCompare(a.article.publishedAt),
        )
        .map(({ article }) => article);
}

export function getColumnArticle(slug: string): ColumnArticle | undefined {
    return articles.find((article) => article.slug === slug);
}

/**
 * 最新の改定ウォッチ記事。fee-check 側の「今月の変更まとめ」導線が参照する。
 * 記事が1本も無い間は undefined を返し、導線側で出し分ける。
 */
export function getLatestKaiteiWatch(): ColumnArticle | undefined {
    return getColumnArticles().find((article) => article.category === "kaitei-watch");
}

/** relatedFeeItems を fee-check の実データに解決する（表示用に項目名・単位数を取る）。 */
export function resolveColumnRelatedFeeItems(article: ColumnArticle) {
    return (article.relatedFeeItems ?? []).flatMap((ref) => {
        const found = getFeeItem(ref.domain, ref.id);
        return found ? [found] : [];
    });
}

// --- ビルド時の検証（企画書§3の必須条件） ---
// typo で死リンクを作らないよう、ここで落とす。next build で気づける。

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const MAX_RELATED_FEE_ITEMS = 3;

function fail(slug: string, message: string): never {
    throw new Error(`[column] 記事 "${slug}": ${message}`);
}

const seenSlugs = new Set<string>();
const itemIds = new Set(getItems().map((item) => item.id));

for (const article of articles) {
    const { slug } = article;

    if (!/^[a-z0-9-]+$/.test(slug)) {
        fail(slug, "slug は英小文字・数字・ハイフンのみで書きます（URLになるため）。");
    }
    if (seenSlugs.has(slug)) {
        fail(slug, "slug が重複しています。");
    }
    seenSlugs.add(slug);

    if (!DATE_PATTERN.test(article.publishedAt)) {
        fail(slug, `publishedAt が YYYY-MM-DD 形式ではありません: "${article.publishedAt}"`);
    }
    if (!DATE_PATTERN.test(article.updatedAt)) {
        fail(slug, `updatedAt が YYYY-MM-DD 形式ではありません: "${article.updatedAt}"`);
    }
    if (article.updatedAt < article.publishedAt) {
        fail(slug, "updatedAt が publishedAt より前になっています。");
    }

    // description は検索結果に出る。長すぎると切られ、短すぎると答えを先出しできない。
    if (article.description.length < 80 || article.description.length > 160) {
        fail(slug, `description は80〜160字にします（現在 ${article.description.length}字）。`);
    }
    if (article.takeaways.length < 2 || article.takeaways.length > 4) {
        fail(slug, `「この記事でわかること」は2〜4点にします（現在 ${article.takeaways.length}点）。`);
    }

    const relatedFeeItems = article.relatedFeeItems ?? [];
    if (relatedFeeItems.length > MAX_RELATED_FEE_ITEMS) {
        fail(slug, `relatedFeeItems は${MAX_RELATED_FEE_ITEMS}件までです（現在 ${relatedFeeItems.length}件）。`);
    }
    for (const ref of relatedFeeItems) {
        if (!getFeeItem(ref.domain, ref.id)) {
            fail(slug, `relatedFeeItems に存在しない報酬チェック項目が指定されています: ${ref.domain} / ${ref.id}`);
        }
    }

    for (const itemId of article.relatedItems ?? []) {
        if (!itemIds.has(itemId)) {
            fail(slug, `relatedItems に存在しない素材IDが指定されています: ${itemId}`);
        }
    }

    if (article.hero) {
        if (!article.hero.src.startsWith("/column/")) {
            fail(slug, `hero.src は /column/ 配下にします（現在 "${article.hero.src}"）。`);
        }
        if (!/^\/column\/[a-z0-9-]+\.(svg|png|jpg|webp)$/.test(article.hero.src)) {
            fail(slug, `hero.src のファイル名は kebab-case の ASCII にします（現在 "${article.hero.src}"）。`);
        }
        if (article.hero.alt.length < 10) {
            fail(slug, "hero.alt は何が描かれているか分かる説明文にします。");
        }
    }
}
