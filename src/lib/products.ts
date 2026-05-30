// 姿勢別自主トレ資料セットの Stripe Price ID。
// 環境変数 STRIPE_PRICE_ID_POSTURE_SELF_TRAINING_SET を優先し、未設定時は埋め込み値にフォールバックする。
// Price ID（price_xxx）は公開情報のためソースに埋め込んでも問題ない。
export const POSTURE_SELF_TRAINING_PRICE_ID =
    process.env.STRIPE_PRICE_ID_POSTURE_SELF_TRAINING_SET ||
    "price_1Tc4oyFoWwVKxcZhyLfVEhI7";
