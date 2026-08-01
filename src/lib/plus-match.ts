import { PLUS_ITEMS, type PlusItem } from "@/data/plus-items";

/**
 * 無料素材ID → 対応するPlusスライドを引く。
 *
 * 無料素材のIDは `<slug>-premium`（文字なし）/ `<slug>-premium-text`（文字あり）、
 * Plusスライドは同じ `<slug>` を持つ。この対応を使い、素材詳細ページで
 * 「この素材の編集できる版がPlusにある」という文脈連動の導線を出す。
 * pptx未作成の素材は undefined が返り、Plus導線が出ないだけなので、
 * 1:1で揃っていなくても支障はない（2026-08-01時点では全点そろっている）。
 *
 * ※サーバーコンポーネント専用（PLUS_ITEMS を import するため、
 *   クライアントバンドルに載せないこと）。
 */
const PLUS_BY_SLUG = new Map(PLUS_ITEMS.map((item) => [item.id, item]));

export function stripFreeItemSuffix(freeItemId: string): string {
    return freeItemId.replace(/-premium-text$/, "").replace(/-premium$/, "");
}

export function findPlusForFreeItem(freeItemId: string): PlusItem | undefined {
    return PLUS_BY_SLUG.get(stripFreeItemSuffix(freeItemId));
}
