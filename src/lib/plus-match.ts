import { PLUS_ITEMS, type PlusItem } from "@/data/plus-items";

/**
 * 無料素材ID → 対応するPlusスライドを引く。
 *
 * 無料素材のIDは `<slug>-premium`（文字なし）/ `<slug>-premium-text`（文字あり）、
 * Plusスライドは同じ `<slug>` を持つ（無料イラスト全点をpptx化しているため、
 * 2026-07時点で全373点が1:1対応）。この対応を使い、素材詳細ページで
 * 「この素材の編集できる版がPlusにある」という文脈連動の導線を出す。
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
