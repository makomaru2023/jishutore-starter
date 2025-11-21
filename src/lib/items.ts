import { Item } from "@/types";
import itemsData from "../../data/items.json";

export function getItems(): Item[] {
    return itemsData as Item[];
}

export function getItemsByTier(tier: string): Item[] {
    return (itemsData as Item[]).filter((item) => item.tier === tier);
}
