import { Item } from "@/types";
import itemsData from "../../data/items.json";

const ALL_ITEMS = itemsData as Item[];
const TEXT_ID_SUFFIX = "-text";
const ITEMS_BY_ID = new Map(ALL_ITEMS.map((item) => [item.id, item]));

// items.json は編集せず、plain版の出現順を基準に plain → text の順へ正規化する。
// モジュール初期化時に一度だけ計算し、getItems() のたびに並べ替えない。
const ORDERED_ITEMS: Item[] = (() => {
    const orderedItems: Item[] = [];
    const emittedIds = new Set<string>();

    for (const item of ALL_ITEMS) {
        if (emittedIds.has(item.id)) continue;

        if (item.id.endsWith(TEXT_ID_SUFFIX)) {
            const plainId = item.id.slice(0, -TEXT_ID_SUFFIX.length);

            // 相方があるtext版は、plain版を処理するときにその直後へ追加する。
            if (ITEMS_BY_ID.has(plainId)) continue;

            // text版しかない素材は、items.json上の位置で単独表示する。
            orderedItems.push(item);
            emittedIds.add(item.id);
            continue;
        }

        orderedItems.push(item);
        emittedIds.add(item.id);

        const textItem = ITEMS_BY_ID.get(`${item.id}${TEXT_ID_SUFFIX}`);
        if (textItem) {
            orderedItems.push(textItem);
            emittedIds.add(textItem.id);
        }
    }

    return orderedItems;
})();

export function getItems(): Item[] {
    return ORDERED_ITEMS;
}

export function getItemsByTier(tier: string): Item[] {
    return ORDERED_ITEMS.filter((item) => item.tier === tier);
}

/**
 * Find an item by id, robust to URL-encoding.
 *
 * Item ids are now all lowercase kebab-case, but the [id] param can still arrive
 * URL-encoded during static generation, which would
 * fail a strict `item.id === id` comparison and render the "Item Not Found" page. We therefore
 * compare against both the raw and the decoded form.
 */
export function findItemById(id: string): Item | undefined {
    let decoded = id;
    try {
        decoded = decodeURIComponent(id);
    } catch {
        // malformed escape sequence – fall back to raw id
    }
    return ALL_ITEMS.find((item) => item.id === id || item.id === decoded);
}

const R2_PREVIEW_VERSION = "20260707";

/**
 * Build a same-origin image URL from an item's previewSrc.
 *
 * R2's public development URL is intentionally not exposed here. Preview images are
 * served through the allowlisted /api/image route so the bucket itself can remain
 * private without breaking item pages.
 */
export function getItemImageUrl(previewSrc: string): string {
    if (previewSrc.startsWith("https://")) return previewSrc;
    return `/api/image?key=${encodeURIComponent(previewSrc)}&v=${R2_PREVIEW_VERSION}`;
}
