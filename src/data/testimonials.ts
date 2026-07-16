/**
 * サイトに掲載する「お客様の声」。
 *
 * ★★ 絶対のルール ★★
 * 1. **実際に届いた回答だけを載せる。創作・要約による捏造は一切しない。**
 *    サンプルやダミーであっても、ここに書いた時点で本物として表示される。
 * 2. **購入者アンケートで掲載許諾を得たものだけを載せる。**
 *    出典＝購入完了ページのGoogleフォーム 設問11「この回答を、サイトの『お客様の声』
 *    として掲載してもよいですか？」／設問12「掲載する場合の表示名・職種」。
 *    - 設問11が「掲載しても良い」→ consent: "named"（設問12の表示名を出す）
 *    - 設問11が「匿名(職種)なら良い」→ consent: "anonymous"（職種だけ出す。表示名は出さない）
 *    - 設問11が「掲載しないでほしい」／未回答 → **載せない**
 * 3. 誤字の修正と、文意を変えない範囲の削除（…で示す）まではしてよい。
 *    言い回しを盛る・要約して強く言い換えるのはしない。
 * 4. 個人・勤務先が特定される情報は載せない（運営方針）。表示名は本名でなく
 *    ニックネームや職種＋年数にする。
 *
 * 0件のときは Testimonials コンポーネントが何も表示しない（セクションごと非表示）。
 */

export type TestimonialProduct = "plus" | "condition" | "posture";

export type Testimonial = {
    /** 一意のID（例: "2026-07-plus-01"） */
    id: string;
    /** どのLPに出すか */
    product: TestimonialProduct;
    /** 掲載許諾の種類。"named"=表示名を出す／"anonymous"=職種のみ */
    consent: "named" | "anonymous";
    /** consent="named" のときに出す表示名（例: "トロル"）。anonymous のときは undefined */
    displayName?: string;
    /** 職種・経験年数など（例: "PT・5年目"）。anonymous のときはこれだけを出す */
    role?: string;
    /** 本文（回答そのまま。誤字修正と文意を変えない削除のみ可） */
    body: string;
    /** アンケート回答を受け取った年月（例: "2026-07"） */
    collectedAt: string;
};

/**
 * ★実際に掲載許諾つきの回答が届くまでは空のまま。
 * 埋めるときは上のルールを必ず読むこと。
 */
export const TESTIMONIALS: Testimonial[] = [];

export function getTestimonials(product: TestimonialProduct): Testimonial[] {
    return TESTIMONIALS.filter((t) => t.product === product);
}
