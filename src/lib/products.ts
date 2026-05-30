// 姿勢別自主トレ資料セットの Stripe Price ID。
// 環境変数 STRIPE_PRICE_ID_POSTURE_SELF_TRAINING_SET から取得する。
// 未設定時は undefined となり、購入ボタンは disabled、決済APIは 503 を返す。
export const POSTURE_SELF_TRAINING_PRICE_ID =
    process.env.STRIPE_PRICE_ID_POSTURE_SELF_TRAINING_SET;
