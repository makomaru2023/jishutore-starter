// 商品一覧ページに表示する有料note商品のデータ。
// 新しい商品を追加する場合は、配列の先頭に追記してください（新着順で表示されます）。

export type Product = {
    id: string;
    title: string;
    subtitle?: string;
    description: string;
    price: number;
    priceLabel?: string;
    noteUrl: string;
    ogImage: string;
    publishedAt: string;
    audience: string;
    badges?: string[];
    tags?: string[];
};

export const products: Product[] = [
    {
        id: "n8334f145dd2a",
        title: "自主トレの説明資料、毎回ゼロから作ってませんか？",
        subtitle: "スライド9点 ＋ イラスト自動生成ツール使い放題パス",
        description:
            "リハビリ職（PT・OT・ST）のための、患者向け自主トレ説明資料セット。すぐに使えるスライド9点と、AIイラスト自動生成ツールがセットになった、資料作成を時短する一式パスです。",
        price: 980,
        priceLabel: "¥980",
        noteUrl: "https://note.com/jisyutore/n/n8334f145dd2a",
        ogImage:
            "https://assets.st-note.com/production/uploads/images/273080421/rectangle_large_type_2_53f5149f160b2e82879615669653311b.png?width=1280",
        publishedAt: "2026-05-05",
        audience: "リハビリ職（PT・OT・ST）",
        badges: ["新着", "残り10部"],
        tags: ["スライド9点", "AIプロンプト使い放題", "自主トレ説明"],
    },
];
