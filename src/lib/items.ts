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
