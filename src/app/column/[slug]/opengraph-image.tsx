/**
 * コラム記事1本ごとのOGP画像。
 *
 * noteは共通のOG画像しか出ないので、記事ごとにタイトル・カテゴリ・確認日の入った
 * カードが出るだけでシェア時の見え方が変わる。ここが「一段上」に効く数少ない場所。
 *
 * ★フォントを読み込んでいないため、Vercel既定のsans-serifで描画される。
 * 日本語は等幅に近い扱いになるので、タイトルの折返しは文字数で自前に決める。
 */

import { ImageResponse } from "next/og";
import { columnCategoryLabels, getColumnArticle, getColumnArticles } from "@/lib/column";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
    return getColumnArticles().map((article) => ({ slug: article.slug }));
}

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = getColumnArticle(slug);
    return [
        {
            id: "og",
            size,
            contentType,
            alt: article ? article.title : "コラム｜自主トレ素材庫",
        },
    ];
}

export default async function ColumnOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = getColumnArticle(slug);

    const categoryLabel = article ? columnCategoryLabels[article.category] : "コラム";
    const title = article?.title ?? "コラム";
    const dateLabel = article ? `${article.updatedAt} 時点` : "";
    // 折返しはSatoriに任せる（自前で文字数で割ると全角・半角の幅差でズレる）。
    // 長いタイトルだけ字を落として3行に収める。
    const fontSize = title.length > 26 ? 54 : title.length > 20 ? 62 : 70;

    return new ImageResponse(
        (
            <div
                style={{
                    background: "linear-gradient(135deg, #eff6ff 0%, #ffffff 52%, #e0e7ff 100%)",
                    color: "#0f172a",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "space-between",
                    padding: "60px 72px",
                    width: "100%",
                }}
            >
                <div style={{ alignItems: "center", display: "flex", gap: 18 }}>
                    <div
                        style={{
                            color: "#1d4ed8",
                            display: "flex",
                            fontSize: 24,
                            fontWeight: 800,
                            letterSpacing: "6px",
                        }}
                    >
                        COLUMN
                    </div>
                    <div style={{ backgroundColor: "#bfdbfe", display: "flex", height: 2, width: 44 }} />
                    <div
                        style={{
                            backgroundColor: "#ffffff",
                            border: "2px solid #bfdbfe",
                            borderRadius: 999,
                            color: "#1e3a8a",
                            display: "flex",
                            fontSize: 22,
                            fontWeight: 700,
                            padding: "8px 20px",
                        }}
                    >
                        {categoryLabel}
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        fontSize,
                        fontWeight: 900,
                        letterSpacing: "-1px",
                        lineHeight: 1.35,
                        maxWidth: 1000,
                    }}
                >
                    {title}
                </div>

                <div
                    style={{
                        alignItems: "center",
                        backgroundColor: "#172554",
                        borderRadius: 20,
                        color: "#ffffff",
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "20px 28px",
                    }}
                >
                    {/* ★区切りに「｜」を使わないこと。既定フォントに無く豆腐（⊠）になる。 */}
                    <div style={{ alignItems: "center", display: "flex", gap: 16 }}>
                        <div style={{ display: "flex", fontSize: 24, fontWeight: 800 }}>自主トレ素材庫</div>
                        <div style={{ backgroundColor: "#3b5bab", display: "flex", height: 22, width: 2 }} />
                        <div style={{ display: "flex", fontSize: 24, fontWeight: 800 }}>作業療法士・トロル</div>
                    </div>
                    <div style={{ color: "#bfdbfe", display: "flex", fontSize: 21, fontWeight: 700 }}>
                        {dateLabel ? `一次資料で確認：${dateLabel}` : "一次資料で確認しています"}
                    </div>
                </div>
            </div>
        ),
        size,
    );
}
