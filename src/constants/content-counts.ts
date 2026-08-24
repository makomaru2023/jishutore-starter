import items from "../../data/items.json";

/** items.json の実数。集計・検証など、内部で正確な件数が要る場面だけで使う。 */
export const FREE_MATERIAL_COUNT = items.length;

/**
 * 公開コピー（トップ・一覧・LP・メタ情報）に出す素材数の表記。
 *
 * ★2026-08-24：実数（507点）ではなく「500点以上」と丸めて出す方針にした。
 *   バッチを追加するたびに全ページの数字が動くと、告知文・バナー画像・
 *   外部サイトへの掲載依頼と食い違うため。100点単位で切り下げるので、
 *   600点を超えた時点で表記も自動で「600点以上」に変わる。
 *
 * 「点」まで含んだ文字列なので、使う側で `点` を足さないこと。
 */
export const FREE_MATERIAL_COUNT_LABEL = `${Math.floor(FREE_MATERIAL_COUNT / 100) * 100}点以上`;
