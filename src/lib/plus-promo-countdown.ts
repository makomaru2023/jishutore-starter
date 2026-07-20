const DAY_MS = 24 * 60 * 60 * 1000;
const JST_OFFSET_MS = 9 * 60 * 60 * 1000;
const ISO_WITH_TIMEZONE_PATTERN = /(Z|[+-]\d{2}:\d{2})$/i;

type PlusPromoCountdownParams = {
    nowMs: number;
    deadlineIso: string;
    isActive: boolean;
};

/**
 * Plusキャンペーンの締切までを、JSTの暦日差で返す。
 * 7月31日は終日「本日まで」、締切後・無効・不正な日時は非表示にする。
 */
export function getPlusPromoCountdownLabel({
    nowMs,
    deadlineIso,
    isActive,
}: PlusPromoCountdownParams): string | null {
    if (!isActive || !Number.isFinite(nowMs)) return null;

    const normalizedDeadline = deadlineIso.trim();
    if (!ISO_WITH_TIMEZONE_PATTERN.test(normalizedDeadline)) return null;

    const deadlineMs = Date.parse(normalizedDeadline);
    if (!Number.isFinite(deadlineMs) || nowMs > deadlineMs) return null;

    const nowJstDay = Math.floor((nowMs + JST_OFFSET_MS) / DAY_MS);
    const deadlineJstDay = Math.floor((deadlineMs + JST_OFFSET_MS) / DAY_MS);
    const remainingDays = deadlineJstDay - nowJstDay;

    if (remainingDays < 0) return null;
    return remainingDays === 0 ? "本日まで" : `あと${remainingDays}日`;
}
