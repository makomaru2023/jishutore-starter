/**
 * 公開コピー（広告・LP）に出す件数。
 *
 * なぜ数値を直接持つのか：参照元がクライアントコンポーネント（ProductInlineAd 等）で、
 * 元データを import すると `/items` のバンドルに plus-items.ts（73KB）と
 * fee-items の JSON（764KB）が乗ってしまうため。数値だけをここに置く。
 *
 * ★ここがズレたらビルドが落ちる（src/lib/fee-check.ts と src/constants/plus.ts の
 * assertPublicCount による検証）。項目を追加したらこの値も更新すること。
 * サーバーコンポーネントからは元の動的な値（getFeeCheckTotalCount() /
 * feeDomains.length / PLUS_SLIDE_COUNT）を直接使うこと。
 */
export const FEE_CHECK_DOMAIN_COUNT = 8;
export const FEE_CHECK_ITEM_COUNT = 148;
export const PLUS_SLIDE_COUNT_PUBLIC = 105;

/**
 * 公開コピー用の定数と実データ件数のズレを検出する。サーバー側モジュールの
 * トップレベルから呼び、ズレていればビルドを失敗させる（古い数字を公開しないため）。
 */
export function assertPublicCount(label: string, actual: number, declared: number): void {
    if (actual !== declared) {
        throw new Error(
            `[public-counts] ${label} が実データとズレています（実データ ${actual} / 公開コピー ${declared}）。` +
            `src/constants/public-counts.ts の値を ${actual} に更新してください。`
        );
    }
}
