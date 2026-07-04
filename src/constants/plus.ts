import { PLUS_ITEMS } from "@/data/plus-items";

/**
 * 自主トレ素材庫Plus の収録スライド数。
 * 資料データ（PLUS_ITEMS）から動的に算出するため、素材を増やせば自動で反映される。
 * 表示は必ずこの定数を参照すること（ハードコード禁止）。
 */
export const PLUS_SLIDE_COUNT = PLUS_ITEMS.length;
