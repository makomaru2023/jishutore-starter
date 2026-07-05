import { Item } from "@/types";
import itemsData from "../../data/items.json";

export function getItems(): Item[] {
    return itemsData as Item[];
}

export function getItemsByTier(tier: string): Item[] {
    return (itemsData as Item[]).filter((item) => item.tier === tier);
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
    return (itemsData as Item[]).find((item) => item.id === id || item.id === decoded);
}

const R2_PUBLIC_DOMAIN = "https://pub-00b4caa7ca60422fa31c5d5d0d6772c3.r2.dev";

/**
 * Build a usable R2 image URL from an item's previewSrc.
 *
 * previewSrc values are now all kebab-case ASCII, but each path segment is still
 * encoded defensively (with "/" separators preserved) so an irregular key can never
 * produce a URL the browser / next/image cannot load.
 */
export function getItemImageUrl(previewSrc: string): string {
    if (previewSrc.startsWith("https://")) return previewSrc;
    const encodedPath = previewSrc.split("/").map(encodeURIComponent).join("/");
    return `${R2_PUBLIC_DOMAIN}/${encodedPath}`;
}
