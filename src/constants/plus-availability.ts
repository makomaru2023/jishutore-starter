/**
 * 自主トレ素材庫Plus の「新規受付」を止めるための単一フラグ。
 *
 * ★2026-08-22：実質の契約者が1名だけ（他はテスト決済と解約者）だったため、
 *   来訪者を増やしてB2Bへ舵を切ることにした。Plusは一旦保留にする。
 *   ・ナビからPlusを外す／申込CTAを外す／新規決済を止める
 *   ・LPは「新規受付停止中」の案内だけに差し替え、noindex にする
 *   ・★既存会員のページ（/plus/library・/plus/fee-hub・/member/*）は維持する
 *
 * 再開するときは、この定数を false にするか、Vercel の環境変数に
 * NEXT_PUBLIC_PLUS_SIGNUP_PAUSED=false を入れる（コード変更なしで戻せる）。
 *
 * ⚠ 料金まわり（plus-pricing.ts）には手を入れていない。
 *   再開時はまず料金を決めてから、このフラグを外すこと。
 */
export const PLUS_SIGNUP_PAUSED = process.env.NEXT_PUBLIC_PLUS_SIGNUP_PAUSED !== "false";

/** 受付停止中の案内文（見出し）。文言はここだけを直す。 */
export const PLUS_PAUSED_HEADING = "自主トレ素材庫Plusは、新規受付を停止しています";

/** 受付停止中の案内文（本文）。 */
export const PLUS_PAUSED_BODY =
    "内容の見直しのため、現在は新しいお申し込みを受け付けていません。再開時期が決まりましたら、LINEとサイトでお知らせします。";

/** 既存会員向けの一文。会員ページは今までどおり使える。 */
export const PLUS_PAUSED_MEMBER_NOTE =
    "ご契約中の方は、これまでどおり会員ページをご利用いただけます。";
