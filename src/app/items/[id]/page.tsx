import { getItems, findItemById, getItemImageUrl } from "@/lib/items";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LineBanner } from "@/components/LineBanner";
import { ProductCta } from "@/components/ProductCta";
import { SponsorAdPlaceholder } from "@/components/SponsorAdPlaceholder";
import { MaterialDownloadButton } from "@/components/MaterialDownloadButton";
import { ItemDetailLineBanner } from "@/components/ItemDetailLineBanner";
import { PostDownloadLineToast } from "@/components/PostDownloadLineToast";
import Link from "next/link";
import { Metadata } from "next";

// Generate static params for all items to enable static export/SEO
export async function generateStaticParams() {
    const items = getItems();
    return items.map((item) => ({
        id: item.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const item = findItemById(id);

    if (!item) {
        return {
            title: "素材が見つかりません | 自主トレ素材庫",
        };
    }

    const title = item.titleJa || item.title;

    // Construct image URL for OG
    const imageUrl = getItemImageUrl(item.previewSrc);
    const absoluteImageUrl = new URL(imageUrl, 'https://jishutore-sozaiko.online').toString();

    // SEO-optimized title and description
    const pageTitle = `${title}のイラスト【無料・商用OK】｜自主トレ素材庫`;

    const metaDescription = item.description
        ? `${title}の自主トレイラストを無料ダウンロード。${item.description}リハビリ指導・患者配布資料にそのまま使えます。商用利用OK・登録不要。`
        : `${title}の自主トレイラストを無料ダウンロード。PT・OT・STの指導資料・患者配布用にそのまま使えます。商用利用OK・登録不要。`;

    return {
        title: pageTitle,
        description: metaDescription,
        openGraph: {
            title: pageTitle,
            description: metaDescription,
            images: [absoluteImageUrl],
        },
        twitter: {
            card: 'summary_large_image',
            title: pageTitle,
            description: metaDescription,
            images: [absoluteImageUrl],
        },
    };
}



export default async function ItemPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const items = getItems();
    const item = findItemById(id);



    if (!item) {
        // Find similar IDs for suggestions
        const similarItems = items
            .filter(i => i.id.includes(id.replace('-premium', '')) || id.includes(i.id))
            .slice(0, 5);

        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Item Not Found</h1>
                    <p className="text-gray-700 mb-2">Requested ID:</p>
                    <code className="block bg-gray-100 p-2 rounded mb-6 break-all">{id}</code>

                    {similarItems.length > 0 && (
                        <div className="mb-6 text-left">
                            <p className="font-semibold mb-2">Did you mean:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                {similarItems.map(similarItem => (
                                    <li key={similarItem.id}>
                                        <Link href={`/items/${similarItem.id}`} className="text-blue-600 hover:underline">
                                            {similarItem.id}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <Link href="/items" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Return to List
                    </Link>
                </div>
            </div>
        );
    }

    // Use direct R2 URL for better performance
    const imageUrl = getItemImageUrl(item.previewSrc);

    const title = item.titleJa || item.title;
    const isTextImage = item.category === "text";

    // Use unique descriptions from items.json, with fallbacks
    const descriptionText = item.description
        || "この自主トレ素材は、リハビリテーションの現場で患者様への指導用資料としてご利用いただけます。統一感のあるデザインで、分かりやすい資料作成をサポートします。";

    const exercisePointText = item.exercisePoint
        || `「${title}」のイラストは、正しい姿勢や動作を視覚的に伝えるのに適しています。対象者の状態に合わせて負荷や回数を調整し、無理のない範囲で実施するようご指導ください。`;

    const targetConditionText = item.targetCondition
        || "脳血管疾患、整形外科疾患、廃用症候群など、リハビリや予防体操が必要な方に広くご活用いただけます。身体機能評価を行った上で適用をご判断ください。";

    // JSON-LD structured data for SEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "name": `${title}の自主トレイラスト`,
        "description": descriptionText,
        "contentUrl": imageUrl,
        "license": "https://jishutore-sozaiko.online/license/",
        "acquireLicensePage": "https://jishutore-sozaiko.online/license/",
        "creditText": "自主トレ素材庫",
        "creator": {
            "@type": "Organization",
            "name": "自主トレ素材庫",
            "url": "https://jishutore-sozaiko.online"
        },
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <main className="container mx-auto px-4 py-12 flex-1">
                <div className="mx-auto max-w-5xl bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                    <div className="md:flex">
                        {/* Image Section with Watermark Protection */}
                        <div className="md:w-1/2 bg-slate-50 relative aspect-[4/3] md:aspect-auto flex items-center justify-center overflow-hidden p-6 md:p-10 border-r border-slate-100">
                            {/* 
                                Protection Mechanism:
                                1. The real image is set as a background image on a div.
                                2. A transparent spacer image is placed on top.
                                3. When user right-clicks/long-presses to save, they get the transparent spacer.
                                4. The watermark is an overlay div on top of the background but below the spacer (or part of the background structure).
                            */}
                            <div
                                className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                                style={{ backgroundImage: `url(${imageUrl})` }}
                            />

                            {/* Transparent Spacer for "Save Image" Protection */}
                            <img
                                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                alt={title}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-default z-10"
                                style={{ objectFit: 'contain' }}
                            />
                        </div>

                        {/* Content Section */}
                        <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
                            <div className="mb-6">
                                <div className="mb-4 flex flex-wrap items-center gap-2">
                                    <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold bg-teal-50 text-teal-600 capitalize">
                                        Free
                                    </span>
                                    <span className="inline-block rounded-full bg-slate-100 px-4 py-1.5 text-sm font-bold text-slate-600">
                                        {isTextImage ? "説明文付きPNG" : "文字なしPNG"}
                                    </span>
                                </div>
                                <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-3 leading-tight">{title}の自主トレイラスト</h1>
                                <p className="text-slate-400 text-sm font-medium">素材ID: {item.id}</p>
                            </div>

                            <div className="prose text-slate-600 mb-8 font-medium leading-relaxed max-w-none">
                                <p className="mb-6">
                                    {descriptionText}
                                </p>

                                {/* SEO and informational text blocks */}
                                <div className="bg-slate-50 p-5 md:p-6 rounded-2xl border border-slate-100 space-y-5">
                                    <div>
                                        <h2 className="text-sm font-bold text-teal-600 flex items-center gap-2 mb-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                            </svg>
                                            運動のポイント
                                        </h2>
                                        <p className="text-sm text-slate-700">{exercisePointText}</p>
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-bold text-teal-600 flex items-center gap-2 mb-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                            </svg>
                                            対象疾患・推奨される方
                                        </h2>
                                        <p className="text-sm text-slate-700">{targetConditionText}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto space-y-6">
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                    <h3 className="font-bold text-slate-900 mb-2">ダウンロード（完全無料）</h3>
                                    <p className="text-sm text-slate-500 mb-6 font-medium">
                                        会員登録は不要です。すぐにダウンロードしてご利用いただけます。
                                    </p>
                                    <div className="mb-6 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-600">
                                        <p>
                                            ファイル形式：<strong className="font-bold text-slate-800">PNG</strong>
                                        </p>
                                        {isTextImage && (
                                            <p className="mt-1 font-medium text-slate-700">
                                                画像内の文字は編集できません。
                                            </p>
                                        )}
                                    </div>
                                    <MaterialDownloadButton
                                        href={item.fileHref}
                                        materialName={title}
                                        materialSlug={item.id}
                                        materialType={item.tier}
                                        className="flex items-center justify-center w-full py-4 px-6 bg-teal-500 hover:bg-teal-400 text-white font-bold rounded-full transition-all shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-[1.02] gap-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                        </svg>
                                        PNG画像をダウンロード
                                    </MaterialDownloadButton>
                                </div>

                                {/* 新作通知＆配布資料7点セットのLINE導線（ダウンロードボタン直下） */}
                                <ItemDetailLineBanner />

                                {/* 有料商品（PowerPoint資料セット）への導線 */}
                                <ProductCta location="item_detail_cta" variant="inline" />

                                <Link href="/items" className="flex items-center justify-center gap-2 text-slate-500 hover:text-teal-500 font-bold transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                    </svg>
                                    素材一覧に戻る
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* 素材詳細ページ用スポンサー枠（フッターより上） */}
                    <div className="mt-16 max-w-5xl mx-auto">
                        <SponsorAdPlaceholder variant="compact" />
                    </div>

                    {/* LINE友だち追加バナー */}
                    <div className="mt-12 max-w-5xl mx-auto">
                        <LineBanner />
                    </div>
                </div>
            </main>
            <Footer />
            <PostDownloadLineToast />
        </div>
    );
}
