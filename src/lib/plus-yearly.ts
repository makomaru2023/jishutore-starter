const ISO_WITH_TIMEZONE_PATTERN = /(Z|[+-]\d{2}:\d{2})$/i;

type PlusYearlyVisibilityParams = {
    nowMs: number;
    startIso: string;
    /** 年額の Stripe 価格IDがサーバー側に設定されているか（買えない年払いを出さないため）。 */
    isPurchasable: boolean;
    /** NEXT_PUBLIC_PLUS_YEARLY_ACTIVE=true（開始日を待たず即表示）。 */
    forceOn: boolean;
    /** NEXT_PUBLIC_PLUS_YEARLY_ACTIVE=false（緊急停止）。 */
    forceOff: boolean;
};

/**
 * 年払いプランをUIに出してよいかを判定する。
 *
 * 判定順:
 *   1. 緊急停止（forceOff）が最優先
 *   2. 買えない（価格ID未設定）なら出さない ＝ 押すと503になるボタンを表示しない
 *   3. forceOn なら開始日を待たずに表示（動作確認用）
 *   4. 開始日時（既定 2026-08-01 00:00 JST）を過ぎていれば表示
 *
 * 開始日時が不正な場合は fail-closed（表示しない）。
 */
export function shouldShowPlusYearly({
    nowMs,
    startIso,
    isPurchasable,
    forceOn,
    forceOff,
}: PlusYearlyVisibilityParams): boolean {
    if (forceOff) return false;
    if (!isPurchasable) return false;
    if (forceOn) return true;

    if (!Number.isFinite(nowMs)) return false;

    const normalizedStart = startIso.trim();
    if (!ISO_WITH_TIMEZONE_PATTERN.test(normalizedStart)) return false;

    const startMs = Date.parse(normalizedStart);
    if (!Number.isFinite(startMs)) return false;

    return nowMs >= startMs;
}
