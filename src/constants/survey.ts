/**
 * 利用者アンケート（Googleフォーム）の設定。
 * --------------------------------------------------------------
 * ★フォームを差し替えるときは、このファイルの URL だけを直す。
 *   サイト内の全導線（DL後トースト／報酬チェック下部／フッター／バナー）が
 *   ここを参照しているので、他のファイルを触る必要はない。
 *
 * アンケートを終了するときは、各設置箇所のコンポーネントを外すか、
 * SURVEY_ENABLED を false にする（フッターリンクも含めて全部消える）。
 */

/** 導線を出すかどうか。アンケート終了時は false にする。 */
export const SURVEY_ENABLED = true;

/**
 * 回答用フォームの正式URL。
 * ★短縮URL（https://forms.gle/TnUUAu8dWd1pPhxk6）ではなくこちらを使う理由：
 *   forms.gle はリダイレクトの過程でクエリ文字列が落ちるため、UTMが付かない。
 */
export const USER_SURVEY_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSfaIuQhY4wp18VgW5gbBVEb3GnYMAhuldFur9Imj_DdW1IGcg/viewform";

/** LINE配信やSNSに貼るときの短縮URL（サイト内導線では使わない）。 */
export const USER_SURVEY_SHORT_URL = "https://forms.gle/TnUUAu8dWd1pPhxk6";

/**
 * 設置場所。GA4の placement パラメータと utm_content に同じ文字列を使う。
 * ここを増やすときは GA4 側の見方（placement別CTR）も合わせて更新する。
 */
export type SurveyPlacement =
    | "material_download"
    | "fee_check"
    | "footer"
    | "engagement_banner";

/**
 * 設置場所つきの回答URLを組み立てる。
 * ⚠ UTMはGoogleフォームの回答には記録されない（フォーム側にその機能がない）。
 *    設置場所別の効果は GA4 の survey_click（placement）で見る。
 *    UTMを付けておくのは、将来アンケートを自前ページ経由にしたときのため。
 */
export function buildSurveyUrl(placement: SurveyPlacement): string {
    const params = new URLSearchParams({
        utm_source: "jishutore-sozaiko",
        utm_medium: "survey",
        utm_campaign: "user_survey",
        utm_content: placement,
    });
    return `${USER_SURVEY_FORM_URL}?${params.toString()}`;
}
