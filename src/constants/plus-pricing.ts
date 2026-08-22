import { PLUS_SIGNUP_PAUSED } from "@/constants/plus-availability";

const parsePrice = (value: string | undefined, fallback: number) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

/**
 * 先行価格キャンペーンの告知を出すか。
 * ★2026-08-22：新規受付を止めている間は必ず false。
 *   受付停止中に「◯日までの登録で据え置き」と出ると案内が食い違うため。
 */
export const PLUS_PROMO_IS_ACTIVE =
    !PLUS_SIGNUP_PAUSED && process.env.NEXT_PUBLIC_PLUS_PROMO_ACTIVE !== "false";
export const PLUS_PROMO_DEADLINE_LABEL =
    process.env.NEXT_PUBLIC_PLUS_PROMO_DEADLINE_LABEL || "7月31日まで";
export const PLUS_PROMO_DEADLINE_ISO =
    process.env.NEXT_PUBLIC_PLUS_PROMO_DEADLINE_ISO?.trim() ||
    "2026-07-31T23:59:59.999+09:00";
export const PLUS_PROMO_CURRENT_PRICE_YEN = parsePrice(
    process.env.NEXT_PUBLIC_PLUS_PROMO_CURRENT_PRICE_YEN,
    500,
);
/**
 * 新規登録へ適用する月額。
 * ★500円が正（2026-08-08にユーザー判断で決定・以後の値上げ予定なし）。
 *
 * 経緯：7/25の告知で「8月1日からの新規登録は980円」と明言し8/1に切替えたが、
 *   7月の唯一の契約者が解約し会員0となったため8/8に500円へ戻した。
 *   素材ライブラリは「必要な分を取ったら終わり」で継続課金と相性が悪く、
 *   単価は買い切りの施設パック側で取る方針に変えたのが背景。
 * ★これに伴い、段階値上げ（200点で¥780・300点で¥980）の計画は撤回済み。
 *   980へ戻す提案をする前に、必ずユーザーに経緯を確認すること。
 * ※Vercelに NEXT_PUBLIC_PLUS_PROMO_NEXT_PRICE_YEN がある場合はそちらが優先される。
 */
export const PLUS_PROMO_NEXT_PRICE_YEN = parsePrice(
    process.env.NEXT_PUBLIC_PLUS_PROMO_NEXT_PRICE_YEN,
    500,
);

export const formatYen = (value: number) => `¥${value.toLocaleString("ja-JP")}`;

/**
 * 年払いプラン（2026-08-01 の¥980切り替えと同時に開始）。
 *
 * ★2026-08-08 に一旦停止。月額500円では年額¥9,800が月払い1年分（¥6,000）を上回り、
 *   「¥0お得」という壊れた文言が出るため。停止は Vercel 側で行う：
 *   NEXT_PUBLIC_PLUS_YEARLY_ACTIVE=false、または STRIPE_PRICE_ID_PLUS_CURRENT_YEARLY を外す。
 *   再開するなら年額を月額×10（¥5,000前後）に引き直してから。
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
 * キャンペーン中は終了後価格、終了後は現在価格を使う。
 * ★以下の定数群は年払いが有効なときだけ表示に使われる。2026-08-08 の停止中は未使用。
 *   月額500円のまま年払いを再開すると差額が負になり「¥0お得」と出るので、
 *   再開時は必ず年額を引き直すこと（上の年払いブロックのコメント参照）。
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
