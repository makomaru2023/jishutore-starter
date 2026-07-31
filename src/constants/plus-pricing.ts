const parsePrice = (value: string | undefined, fallback: number) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const PLUS_PROMO_IS_ACTIVE = process.env.NEXT_PUBLIC_PLUS_PROMO_ACTIVE !== "false";
export const PLUS_PROMO_DEADLINE_LABEL =
    process.env.NEXT_PUBLIC_PLUS_PROMO_DEADLINE_LABEL || "7月31日まで";
export const PLUS_PROMO_CURRENT_PRICE_YEN = parsePrice(
    process.env.NEXT_PUBLIC_PLUS_PROMO_CURRENT_PRICE_YEN,
    500,
);
export const PLUS_PROMO_NEXT_PRICE_YEN = parsePrice(
    process.env.NEXT_PUBLIC_PLUS_PROMO_NEXT_PRICE_YEN,
    680,
);

/**
 * いま新規登録者に案内する月額（表示用）。
 * 先行価格の期間中は現行価格、終了後（NEXT_PUBLIC_PLUS_PROMO_ACTIVE=false）は改定後価格。
 * 価格を出すCTA・カードはすべてこれを使う。ハードコードすると値上げのたびに
 * 直し漏れが出るため（過去に /products と素材一覧の広告が7月コピーのまま残った）。
 * ※実際の課金額は Stripe 側の STRIPE_PRICE_ID_PLUS_CURRENT が正。表示と必ず揃えること。
 */
export const PLUS_DISPLAY_PRICE_YEN = PLUS_PROMO_IS_ACTIVE
    ? PLUS_PROMO_CURRENT_PRICE_YEN
    : PLUS_PROMO_NEXT_PRICE_YEN;

export const formatYen = (value: number) => `¥${value.toLocaleString("ja-JP")}`;

export const PLUS_PROMO_BADGE_TEXT = `${PLUS_PROMO_DEADLINE_LABEL}の登録で月額${formatYen(PLUS_PROMO_CURRENT_PRICE_YEN)}のまま永久据え置き`;
export const PLUS_PROMO_PRICE_NOTE = `${PLUS_PROMO_DEADLINE_LABEL}に登録した方は月額${formatYen(PLUS_PROMO_CURRENT_PRICE_YEN)}のまま据え置きです。8月以降の新規登録は月額${formatYen(PLUS_PROMO_NEXT_PRICE_YEN)}になります。`;

