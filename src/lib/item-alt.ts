import type { Item } from "@/types";

/**
 * 素材画像の alt テキストを1か所で作る。
 * --------------------------------------------------------------
 * ★2026-09-04：Search Consoleの画像検索（8月）で 9,958表示・65クリック・CTR 0.65%
 *   だったことへの対応。最も表示されていたのはカテゴリ一覧ページ
 *   （/items/seated-exercises/ は1,130表示・0クリック）だが、
 *   ItemCard の alt が英語の title（"Door Way Stretch"）のままだった。
 *   検索されているのは「座ってできる体操 高齢者 イラスト」のような日本語クエリで、
 *   alt と一致していなかった。
 *
 * ★同じ運動に「文字なし」「説明文つき」の2枚があるので、alt も必ず出し分ける。
 *   同一 alt だと画像検索で重複扱いになりやすい。
 *
 * ★description の1文目だけを添える（中央値28字）。
 *   キーワードを並べるのではなく、画像の中身を説明することを優先する。
 *   長い alt は読み上げにも検索にも不利なので、40字を超える文は落とす。
 *
 * ★alt を変える箇所が増えたら、必ずこの関数を通すこと
 *   （同じ画像URLにページごとに違う alt が付くのを避けるため）。
 *
 * ★titleJa の説明文つき版には「【文字あり】」が入っているので取り除く。
 *   残すと「…【文字あり】のイラスト（説明文つき）」と二重になる。
 */
export function getItemImageAlt(item: Item): string {
    const name = (item.titleJa || item.title).replace(/【[^】]*】/g, "").trim();
    const variant = item.category === "text" ? "説明文つき" : "文字なし";
    const firstSentence = (item.description ?? "").split("。")[0].trim();
    const detail = firstSentence && firstSentence.length <= 40 ? `｜${firstSentence}` : "";
    return `${name}のイラスト（${variant}）${detail}`;
}
