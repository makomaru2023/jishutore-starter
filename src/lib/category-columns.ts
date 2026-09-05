/**
 * 用途カテゴリ（/items/<slug>/）から関連コラムへ進む導線のデータ作り。
 * ================================================================
 * ★このモジュールはサーバー側でだけ使う（@/lib/column を経由して
 *   記事本体と fee-check のデータを巻き込むため）。
 *
 * ★記事名はカテゴリ設定に書かない。ここで現在のタイトルを引く。
 *   コラムのタイトルは改題することがあり（9/5に91本を一括で直した）、
 *   カテゴリ側に書き写すと古い名前が残る。
 *
 * ★存在しない／未公開の slug が書かれていたらビルドを落とす。
 *   下書き（src/lib/column.ts の articles に未登録の記事）はURLが無いので、
 *   リンクすると404になる。公開前に気づけるようにしておく。
 */

import { getColumnArticle, getColumnUrl } from "@/lib/column";

export interface CategoryColumnLink {
    slug: string;
    /** 現在の記事タイトル（@/lib/column から引いた実物） */
    title: string;
    href: string;
    /** 「この記事でわかること」の1つ目。1行の説明として出す */
    summary: string;
}

export function resolveCategoryColumns(
    categorySlug: string,
    columnSlugs: readonly string[],
): CategoryColumnLink[] {
    return columnSlugs.map((slug) => {
        const article = getColumnArticle(slug);
        if (!article) {
            throw new Error(
                `[category-columns] 用途カテゴリ "${categorySlug}" の relatedColumns に、` +
                `公開されていないコラム "${slug}" が指定されています。` +
                `src/lib/column.ts の articles に登録済みの slug だけを書いてください。`,
            );
        }
        return {
            slug,
            title: article.title,
            href: getColumnUrl(slug),
            summary: article.takeaways[0] ?? article.description,
        };
    });
}
