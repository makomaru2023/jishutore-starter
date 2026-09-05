import { getItems } from "@/lib/items";
import {
    seoItemCategories,
    type SeoItemCategoryConfig,
} from "@/lib/seoItemCategories";
import type { Item } from "@/types";

function normalize(value: string): string {
    return value.normalize("NFKC").toLowerCase();
}

function getItemSearchText(
    item: Item,
    scope: SeoItemCategoryConfig["matchScope"],
): string {
    const fields = [item.title, item.titleJa, item.fileName];

    if (scope === "content" || scope === "all") {
        fields.push(item.description);
    }

    if (scope === "all") {
        fields.push(item.exercisePoint, item.targetCondition, item.difficulty);
    }

    return normalize(fields.filter(Boolean).join(" "));
}

export function itemMatchesSeoCategory(
    item: Item,
    config: SeoItemCategoryConfig,
): boolean {
    const searchText = getItemSearchText(item, config.matchScope);
    return config.keywords.some((keyword) =>
        searchText.includes(normalize(keyword)),
    );
}

export function getSeoCategoryItems(config: SeoItemCategoryConfig): Item[] {
    return getItems().filter((item) => itemMatchesSeoCategory(item, config));
}

// 口腔・嚥下ページ（/items/swallowing-exercises/）は seoItemCategories 外の独立ページのため、
// 同ページの絞り込み（SWALLOWING_KEYWORDS）と同じ条件をここでも持つ。
const SWALLOWING_KEYWORDS = [
    "swallow", "tongue", "cheek", "mouth", "patakara", "pataka", "shakia", "saliva",
    "嚥下", "舌", "口腔", "口唇", "頬", "唇", "パタカラ", "シャキア", "唾液",
];

export function itemMatchesSwallowing(item: Item): boolean {
    if (item.fileName === "deep-breathing.png") {
        return true;
    }
    const searchText = normalize(
        [
            item.title,
            item.titleJa,
            item.fileName,
            item.description,
            item.exercisePoint,
            item.targetCondition,
        ]
            .filter(Boolean)
            .join(" "),
    );
    return SWALLOWING_KEYWORDS.some((keyword) =>
        searchText.includes(normalize(keyword)),
    );
}

/**
 * 素材が属するSEOカテゴリページ（/items/<slug>/）の一覧を返す。
 * 素材詳細ページから部位・用途カテゴリへの内部リンクに使う。
 */
export function getCategoriesForItem(
    item: Item,
): Pick<SeoItemCategoryConfig, "slug" | "breadcrumb">[] {
    const categories = seoItemCategories
        .filter((config) => itemMatchesSeoCategory(item, config))
        .map(({ slug, breadcrumb }) => ({ slug, breadcrumb }));

    if (itemMatchesSwallowing(item)) {
        categories.push({
            slug: "swallowing-exercises",
            breadcrumb: "口腔・嚥下",
        });
    }

    return categories;
}

/**
 * 口腔・嚥下ページ（/items/swallowing-exercises/）に載せる素材。
 * ★ページ側にも同じ絞り込みが書かれていたので、こちらを正本にした（2026-09-05）。
 *   ページ分割のルート（page/[page]）と1ページ目で並び順がずれないよう、1か所から取る。
 */
export function getSwallowingItems(): Item[] {
    return getItems().filter(itemMatchesSwallowing);
}
