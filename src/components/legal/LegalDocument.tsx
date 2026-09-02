/**
 * 規約ページ（求人掲載規約・スポンサー掲載規約）の共通レイアウト部品。
 * --------------------------------------------------------------
 * ★条文をJSXで直接書くと、条番号のずれや見出しレベルの不揃いが出る。
 *   条文はデータ（LegalArticle[]）で持ち、描画はここに寄せる。
 *   条番号は配列の順序から自動採番するので、条を差し込んでも番号を直す必要がない。
 *
 * デザインは既存の法務ページ（/license・/privacy）に合わせた白カード＋青の見出し線。
 * 新しい配色やコンポーネントは足していない。
 */

import { LEGAL_DOCUMENT_DATES, formatLegalDate, type LegalDocumentKey } from "@/constants/legal";

/** 1つの条。body（段落）と items（箇条書き）はどちらも任意で、両方書いてもよい。 */
export interface LegalArticle {
    /** 条見出し（例：「サービス内容」）。「第○条」は自動で付く */
    heading: string;
    /** 段落。1要素＝1段落 */
    body?: string[];
    /** 箇条書き。段落のあとに出る */
    items?: string[];
    /** 箇条書きのあとに置く補足段落 */
    footnote?: string[];
}

export function LegalArticleList({ articles }: { articles: LegalArticle[] }) {
    return (
        <div className="space-y-9">
            {articles.map((article, index) => (
                <section key={article.heading}>
                    <h2 className="border-b-2 border-blue-600 pb-2 text-lg font-bold text-gray-900 sm:text-xl">
                        第{index + 1}条（{article.heading}）
                    </h2>
                    {article.body && article.body.length > 0 && (
                        <div className="mt-4 space-y-3">
                            {article.body.map((paragraph) => (
                                <p key={paragraph} className="text-sm leading-7 text-gray-700 sm:text-base">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    )}
                    {article.items && article.items.length > 0 && (
                        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-gray-700 sm:text-base">
                            {article.items.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    )}
                    {article.footnote && article.footnote.length > 0 && (
                        <div className="mt-4 space-y-3">
                            {article.footnote.map((paragraph) => (
                                <p key={paragraph} className="text-sm leading-7 text-gray-700 sm:text-base">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    )}
                </section>
            ))}
        </div>
    );
}

/**
 * 制定日・最終改定日の表示。
 * ★すべての重要規約の末尾に置く。日付は @/constants/legal から取るので、
 *   ページ側に日付を書かない。
 */
export function LegalDates({ document }: { document: LegalDocumentKey }) {
    const dates = LEGAL_DOCUMENT_DATES[document];
    return (
        <p className="mt-10 border-t border-gray-200 pt-6 text-right text-sm text-gray-500">
            制定日：{formatLegalDate(dates.establishedAt)}
            <br />
            最終改定日：{formatLegalDate(dates.revisedAt)}
        </p>
    );
}
