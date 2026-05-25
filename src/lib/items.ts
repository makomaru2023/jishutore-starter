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
 * Some item ids contain spaces / parentheses (e.g. "Swallowing forehead exercises-premium").
 * During static generation the [id] param can arrive URL-encoded ("...%20..."), which would
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
 * Some previewSrc values contain spaces / parentheses
 * (e.g. "premium/plain/Knee-holding exercise (holding both knees).png").
 * Those characters must be percent-encoded or the browser / next/image cannot load them.
 * Each path segment is encoded individually so the "/" separators are preserved.
 */
export function getItemImageUrl(previewSrc: string): string {
    if (previewSrc.startsWith("https://")) return previewSrc;
    const encodedPath = previewSrc.split("/").map(encodeURIComponent).join("/");
    return `${R2_PUBLIC_DOMAIN}/${encodedPath}`;
}
