const parsePrice = (value: string | undefined, fallback: number) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const PLUS_PROMO_IS_ACTIVE = process.env.NEXT_PUBLIC_PLUS_PROMO_ACTIVE !== "false";
export const PLUS_PROMO_DEADLINE_LABEL =
    process.env.NEXT_PUBLIC_PLUS_PROMO_DEADLINE_LABEL || "7月31日まで";
export const PLUS_PROMO_DEADLINE_ISO =
    process.env.NEXT_PUBLIC_PLUS_PROMO_DEADLINE_ISO?.trim() ||
    "2026-07-31T23:59:59.999+09:00";
export const PLUS_PROMO_CURRENT_PRICE_YEN = parsePrice(
    process.env.NEXT_PUBLIC_PLUS_PROMO_CURRENT_PRICE_YEN,
    500,
);
// 2026-08-01 の全部入り刷新後の新規価格。Vercel の NEXT_PUBLIC_PLUS_PROMO_NEXT_PRICE_YEN が
// 設定されている場合はそちらが優先されるため、切替時は環境変数側も 980 に揃えること。
export const PLUS_PROMO_NEXT_PRICE_YEN = parsePrice(
    process.env.NEXT_PUBLIC_PLUS_PROMO_NEXT_PRICE_YEN,
    980,
);

export const formatYen = (value: number) => `¥${value.toLocaleString("ja-JP")}`;

export const PLUS_PROMO_BADGE_TEXT = `${PLUS_PROMO_DEADLINE_LABEL}の登録で月額${formatYen(PLUS_PROMO_CURRENT_PRICE_YEN)}のまま永久据え置き`;
export const PLUS_PROMO_PRICE_NOTE = `${PLUS_PROMO_DEADLINE_LABEL}に登録した方は月額${formatYen(PLUS_PROMO_CURRENT_PRICE_YEN)}のまま据え置きです。8月以降の新規登録は月額${formatYen(PLUS_PROMO_NEXT_PRICE_YEN)}になります。`;
