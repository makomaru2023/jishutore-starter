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
/**
 * 先行価格の終了後（8月1日〜）に新規登録へ適用する月額。
 * ★980円が正。2026-07-25のメール・LINE・Threads告知で「8月1日からの新規登録は
 *   月額980円」と明言済み。7月中旬まで680円の計画だったが、買い切り3商品（各980円）を
 *   Plusへ収録する「全部入り」化に伴い7/21頃に980円へ変更された。
 *   既定値を変えるときは告知済みの金額と必ず突き合わせること。
 */
export const PLUS_PROMO_NEXT_PRICE_YEN = parsePrice(
    process.env.NEXT_PUBLIC_PLUS_PROMO_NEXT_PRICE_YEN,
    980,
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

