import { PLUS_ITEMS } from "@/data/plus-items";
import { PLUS_SLIDE_COUNT_PUBLIC, assertPublicCount } from "@/constants/public-counts";

/**
 * 自主トレ素材庫Plus の収録スライド数。
 * 資料データ（PLUS_ITEMS）から動的に算出するため、素材を増やせば自動で反映される。
 * 表示は必ずこの定数を参照すること（ハードコード禁止）。
 * ※クライアントコンポーネントからは PLUS_SLIDE_COUNT_PUBLIC を使う
 * （このモジュールを import すると plus-items.ts がバンドルに乗るため）。
 */
export const PLUS_SLIDE_COUNT = PLUS_ITEMS.length;

assertPublicCount("Plusの収録スライド数", PLUS_SLIDE_COUNT, PLUS_SLIDE_COUNT_PUBLIC);
