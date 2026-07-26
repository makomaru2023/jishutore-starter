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

/**
 * 年払いプラン（2026-08-01 の¥980切り替えと同時に開始）。
 *
 * 表示は「開始日時を過ぎたら自動でON」。手動でのフラグ切り替えは不要。
 * ただし年額の Stripe 価格ID（STRIPE_PRICE_ID_PLUS_CURRENT_YEARLY）が
 * 未設定の間は開始日を過ぎても表示しない ＝ 押すと503になるボタンを出さない。
 * 実際の判定は shouldShowPlusYearly()（@/lib/plus-yearly）で行う。
 */
export const PLUS_YEARLY_START_ISO =
    process.env.NEXT_PUBLIC_PLUS_YEARLY_START_ISO?.trim() || "2026-08-01T00:00:00+09:00";

/**
 * 表示タイミングの手動オーバーライド（通常は未設定でよい）。
 *   "true"  … 開始日を待たず即表示（動作確認用）
 *   "false" … 開始日を過ぎても表示しない（緊急停止）
 */
const PLUS_YEARLY_OVERRIDE = process.env.NEXT_PUBLIC_PLUS_YEARLY_ACTIVE?.trim();
export const PLUS_YEARLY_FORCE_ON = PLUS_YEARLY_OVERRIDE === "true";
export const PLUS_YEARLY_FORCE_OFF = PLUS_YEARLY_OVERRIDE === "false";
export const PLUS_YEARLY_PRICE_YEN = parsePrice(
    process.env.NEXT_PUBLIC_PLUS_YEARLY_PRICE_YEN,
    9800,
);

/**
 * 年払いの「お得さ」を出すときの比較元になる月額。
 * キャンペーン中は終了後価格（¥980）、終了後は現在価格を使う。
 * 年払いはキャンペーン終了と同時に出す前提なので、どちらでも¥980になる。
 */
export const PLUS_YEARLY_BASE_MONTHLY_YEN = PLUS_PROMO_IS_ACTIVE
    ? PLUS_PROMO_NEXT_PRICE_YEN
    : PLUS_PROMO_CURRENT_PRICE_YEN;
/** 月払いで1年払った場合の総額（¥980 × 12 = ¥11,760）。 */
export const PLUS_YEARLY_LIST_YEN = PLUS_YEARLY_BASE_MONTHLY_YEN * 12;
/** 年払いにした場合の差額（¥1,960）。 */
export const PLUS_YEARLY_SAVING_YEN = Math.max(PLUS_YEARLY_LIST_YEN - PLUS_YEARLY_PRICE_YEN, 0);
/** 差額が月額の何か月分か（切り捨て。¥1,960 なら 2か月分）。 */
export const PLUS_YEARLY_SAVING_MONTHS = Math.floor(
    PLUS_YEARLY_SAVING_YEN / PLUS_YEARLY_BASE_MONTHLY_YEN,
);
/** 年払いを月割りした実質月額（¥817）。 */
export const PLUS_YEARLY_MONTHLY_EQUIVALENT_YEN = Math.round(PLUS_YEARLY_PRICE_YEN / 12);

export const PLUS_YEARLY_SAVING_LABEL =
    PLUS_YEARLY_SAVING_MONTHS > 0
        ? `${PLUS_YEARLY_SAVING_MONTHS}か月分お得`
        : `${formatYen(PLUS_YEARLY_SAVING_YEN)}お得`;
export const PLUS_YEARLY_NOTE = `年払い${formatYen(PLUS_YEARLY_PRICE_YEN)}は、月払い1年分${formatYen(PLUS_YEARLY_LIST_YEN)}より${formatYen(PLUS_YEARLY_SAVING_YEN)}（${PLUS_YEARLY_SAVING_LABEL}）安く、実質月額${formatYen(PLUS_YEARLY_MONTHLY_EQUIVALENT_YEN)}です。`;

export const PLUS_PROMO_BADGE_TEXT = `${PLUS_PROMO_DEADLINE_LABEL}の登録で月額${formatYen(PLUS_PROMO_CURRENT_PRICE_YEN)}のまま永久据え置き`;
export const PLUS_PROMO_PRICE_NOTE = `${PLUS_PROMO_DEADLINE_LABEL}に登録した方は月額${formatYen(PLUS_PROMO_CURRENT_PRICE_YEN)}のまま据え置きです。8月以降の新規登録は月額${formatYen(PLUS_PROMO_NEXT_PRICE_YEN)}になります。`;
