// 姿勢別自主トレ資料セットの Stripe Price ID。
// 環境変数 STRIPE_PRICE_ID_POSTURE_SELF_TRAINING_SET から取得する。
// 未設定時は undefined となり、購入ボタンは disabled、決済APIは 503 を返す。
export const POSTURE_SELF_TRAINING_PRICE_ID =
    process.env.STRIPE_PRICE_ID_POSTURE_SELF_TRAINING_SET;

// 疾患別＋姿勢別 まとめ買いセットの Stripe Price ID。
// 環境変数 STRIPE_PRICE_ID_BUNDLE_SELF_TRAINING_SET から取得する。
// 未設定時は undefined。/products/ の Bundle セクションは未設定でも壊れずに
// 「準備中・LINE通知」表示に切り替わる。
export const BUNDLE_SELF_TRAINING_PRICE_ID =
    process.env.STRIPE_PRICE_ID_BUNDLE_SELF_TRAINING_SET;

// 伝わるプロンプト工房（スライド画像生成プロンプトメーカー）の Stripe Price ID。
// 環境変数 STRIPE_PRICE_ID_SLIDE_PROMPT_GENERATOR から取得する。
// 未設定時は undefined。商品LPの購入ボタンは disabled・サンクスページの分岐は
// 「準備中」表示にフォールバックする。
export const SLIDE_PROMPT_GENERATOR_PRICE_ID =
    process.env.STRIPE_PRICE_ID_SLIDE_PROMPT_GENERATOR;
