import { getItems, findItemById, getItemImageUrl } from "@/lib/items";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LineBanner } from "@/components/LineBanner";
import { MaterialDownloadButton } from "@/components/MaterialDownloadButton";
import { ItemDetailPlusCta } from "@/components/ItemDetailPlusCta";
import { PostDownloadLineToast } from "@/components/PostDownloadLineToast";
import { getCategoriesForItem } from "@/lib/seoCategoryMatching";
import { findPlusForFreeItem } from "@/lib/plus-match";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

function normalizeLegacyItemId(id: string): string {
    return id
        .normalize("NFKC")
        .toLowerCase()
        .replace(/[’']/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

// Generate static params for all items to enable static export/SEO
export async function generateStaticParams() {
    const items = getItems();
    return items.map((item) => ({
        id: item.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const item = findItemById(id) ?? findItemById(normalizeLegacyItemId(id));

    if (!item) {
        return {
            title: "素材が見つかりません | 自主トレ素材庫",
        };
    }

    const title = item.titleJa || item.title;

    // Construct image URL for OG
    const imageUrl = getItemImageUrl(item.previewSrc);
    const absoluteImageUrl = new URL(imageUrl, 'https://jishutore-sozaiko.online').toString();

    // 文字あり版は titleJa に既に【文字あり】が入っているため、検索結果用の
    // タイトルからは外して組み直す（重ねると全角34字超で末尾が切られる）。
    // 文字あり/文字なしはほぼ同内容の2ページなので、検索結果で選べるよう
    // 「説明文つき」かどうかで見出しを分ける。
    const isTextVariant = item.id.endsWith("-premium-text");
    const baseTitle = title.replace(/【文字あり】/g, "").trim();

    // 「無料」は検索語に含まれることが多いので、切られない前方に置く。
    const pageTitle = isTextVariant
        ? `${baseTitle}のイラスト｜無料・説明文つき｜自主トレ素材庫`
        : `${baseTitle}のイラスト｜無料・商用OK｜自主トレ素材庫`;

    // 説明文は前半80字ほどしか表示されないため、差別化要素を先頭に置く。
    const leadDescription = isTextVariant
        ? `${baseTitle}の自主トレイラスト（回数・ポイントの説明文つき）を無料ダウンロード。印刷してそのまま患者さんにお渡しできます。`
        : `${baseTitle}の自主トレイラストを無料ダウンロード。商用OK・登録不要のPNGです。`;

    const metaDescription = item.description
        ? `${leadDescription}${item.description}`
        : `${leadDescription}PT・OT・STの指導資料・患者配布用にそのままお使いいただけます。`;

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
        alternates: {
            canonical: `https://jishutore-sozaiko.online/items/${item.id}/`,
        },
    };
}



export default async function ItemPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = findItemById(id);

    if (!item) {
        const legacyItem = findItemById(normalizeLegacyItemId(id));
        if (legacyItem) {
            permanentRedirect(`/items/${legacyItem.id}/`);
        }
        notFound();
    }

    // Use direct R2 URL for better performance
    const imageUrl = getItemImageUrl(item.previewSrc);

    const title = item.titleJa || item.title;
    const isTextImage = item.category === "text";
    const pairedItemId = isTextImage
        ? item.id.endsWith("-text")
            ? item.id.slice(0, -"-text".length)
            : undefined
        : `${item.id}-text`;
    const pairedCandidate = pairedItemId ? findItemById(pairedItemId) : undefined;
    const pairedItem = pairedCandidate && pairedCandidate.category !== item.category
        ? pairedCandidate
        : undefined;
    const pairedTitle = pairedItem ? pairedItem.titleJa || pairedItem.title : "";
    const pairedImageUrl = pairedItem ? getItemImageUrl(pairedItem.previewSrc) : "";

    // Use unique descriptions from items.json, with fallbacks
    const descriptionText = item.description
        || "この自主トレ素材は、リハビリテーションの現場で患者様への指導用資料としてご利用いただけます。統一感のあるデザインで、分かりやすい資料作成をサポートします。";

    const exercisePointText = item.exercisePoint
        || `「${title}」のイラストは、正しい姿勢や動作を視覚的に伝えるのに適しています。対象者の状態に合わせて負荷や回数を調整し、無理のない範囲で実施するようご指導ください。`;

    const targetConditionText = item.targetCondition
        || "脳血管疾患、整形外科疾患、廃用症候群など、リハビリや予防体操が必要な方に広くご活用いただけます。身体機能評価を行った上で適用をご判断ください。";

    // 素材が属する部位・用途カテゴリ（/items/<slug>/ への内部リンクに使う）
    const itemCategories = getCategoriesForItem(item);
    const primaryCategory = itemCategories[0];

    // この素材に対応するPlusスライド。無料PNG → 編集できるスライドの文脈連動CTAに使う。
    const plusMatch = findPlusForFreeItem(item.id);
    const plusPreview = plusMatch
        ? {
            src: `/plus/previews/${plusMatch.id}.webp`,
            title: plusMatch.title,
        }
        : undefined;
    // CTA見出し用に【文字あり】等のタグを除いた表示名（例: 杖歩き）
    const ctaTitle = title.replace(/【[^】]*】/g, "").trim() || title;

    // JSON-LD structured data for SEO
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "ImageObject",
            "name": `${title}の自主トレイラスト`,
            "description": descriptionText,
            "contentUrl": imageUrl,
            "license": "https://jishutore-sozaiko.online/license/",
            "acquireLicensePage": "https://jishutore-sozaiko.online/license/",
            "creditText": "自主トレ素材庫",
            "keywords": [title, ...itemCategories.map((c) => c.breadcrumb)].join(", "),
            "creator": {
                "@type": "Organization",
                "name": "自主トレ素材庫",
                "url": "https://jishutore-sozaiko.online"
            },
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "ホーム",
                    "item": "https://jishutore-sozaiko.online/",
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "無料素材",
                    "item": "https://jishutore-sozaiko.online/items/",
                },
                ...(primaryCategory
                    ? [{
                        "@type": "ListItem",
                        "position": 3,
                        "name": primaryCategory.breadcrumb,
                        "item": `https://jishutore-sozaiko.online/items/${primaryCategory.slug}/`,
                    }]
                    : []),
                {
                    "@type": "ListItem",
                    "position": primaryCategory ? 4 : 3,
                    "name": title,
                    "item": `https://jishutore-sozaiko.online/items/${item.id}/`,
                },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <main className="container mx-auto px-4 py-12 flex-1">
                <nav
                    aria-label="パンくずリスト"
                    className="mx-auto mb-6 max-w-6xl text-sm text-slate-500"
                >
                    <Link
                        href="/"
                        className="transition-colors hover:text-blue-700"
                    >
                        ホーム
                    </Link>
                    <span className="mx-2" aria-hidden="true">
                        /
                    </span>
                    <Link
                        href="/items/"
                        className="transition-colors hover:text-blue-700"
                    >
                        無料素材
                    </Link>
                    {primaryCategory && (
                        <>
                            <span className="mx-2" aria-hidden="true">
                                /
                            </span>
                            <Link
                                href={`/items/${primaryCategory.slug}/`}
                                className="transition-colors hover:text-blue-700"
                            >
                                {primaryCategory.breadcrumb}
                            </Link>
                        </>
                    )}
                    <span className="mx-2" aria-hidden="true">
                        /
                    </span>
                    <span className="text-slate-700">{title}</span>
                </nav>

                <div className="mx-auto max-w-6xl bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                    <div className="md:flex">
                        {/* Image Section with Watermark Protection */}
                        {/* PCでは上ぞろえ（md:self-start）で画像を上部に固定。以前は本文カラムに合わせて縦に引き伸ばされ、画像が中央＝下に沈んでいた。 */}
                        <div className="md:w-1/2 bg-slate-50 relative aspect-[4/3] md:aspect-video overflow-hidden p-6 md:p-10 md:self-start">
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
                        <div className="p-8 md:p-12 md:w-1/2 flex flex-col">
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

                            <p className="mb-8 font-medium leading-relaxed text-slate-600">
                                {descriptionText}
                            </p>

                            <div className="space-y-6">
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

                                {pairedItem && (
                                    <Link
                                        href={`/items/${pairedItem.id}`}
                                        className="group flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 p-3 transition hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm"
                                    >
                                        <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-white">
                                            <Image
                                                src={pairedImageUrl}
                                                alt=""
                                                fill
                                                sizes="80px"
                                                className="object-contain p-1.5"
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="break-keep text-xs font-bold leading-relaxed text-blue-700">
                                                {isTextImage
                                                    ? "この素材には文字なし版（自由に文字を入れられる）もあります"
                                                    : "この素材には文字あり版（運動名・説明つき）もあります"}
                                            </p>
                                            <p className="mt-1 line-clamp-2 break-keep text-sm font-bold text-slate-900 transition-colors group-hover:text-blue-700">
                                                {pairedTitle}
                                            </p>
                                        </div>
                                        <svg
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2.5}
                                            stroke="currentColor"
                                            className="h-5 w-5 shrink-0 text-blue-500 transition-transform group-hover:translate-x-0.5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
                                        </svg>
                                    </Link>
                                )}

                                {/* 主役の有料導線：この素材の編集できるスライド版（Plus）。買い切りはカード内に副導線として1行だけ添える */}
                                <ItemDetailPlusCta
                                    itemTitle={ctaTitle}
                                    itemSlug={item.id}
                                    plusReps={plusMatch?.reps}
                                    plusPreview={plusPreview}
                                />

                                {/* 運動のポイント・対象疾患（SEO・詳細情報）はダウンロード導線の下に配置。「画像→DL」を最短にするため本文上部から移動 */}
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

                                <Link href="/items" className="flex items-center justify-center gap-2 text-slate-500 hover:text-teal-500 font-bold transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                    </svg>
                                    素材一覧に戻る
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* 素材情報：部位カテゴリ・難易度・形式・利用条件（AI・検索向けのテキスト情報） */}
                    <section className="border-t border-slate-100 px-8 py-8 md:px-12">
                        <h2 className="mb-5 text-lg font-black text-slate-900">この素材の情報</h2>
                        <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                            {itemCategories.length > 0 && (
                                <div className="sm:col-span-2">
                                    <dt className="mb-2 text-xs font-bold tracking-wider text-slate-400">
                                        部位・用途カテゴリ
                                    </dt>
                                    <dd className="flex flex-wrap gap-2">
                                        {itemCategories.map((category) => (
                                            <Link
                                                key={category.slug}
                                                href={`/items/${category.slug}/`}
                                                className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700"
                                            >
                                                {category.breadcrumb}
                                            </Link>
                                        ))}
                                    </dd>
                                </div>
                            )}
                            {item.difficulty && (
                                <div>
                                    <dt className="mb-1 text-xs font-bold tracking-wider text-slate-400">
                                        難易度のめやす
                                    </dt>
                                    <dd className="text-sm font-medium leading-relaxed text-slate-700">
                                        {item.difficulty}
                                    </dd>
                                </div>
                            )}
                            <div>
                                <dt className="mb-1 text-xs font-bold tracking-wider text-slate-400">
                                    ファイル形式
                                </dt>
                                <dd className="text-sm font-medium leading-relaxed text-slate-700">
                                    PNG画像（{isTextImage ? "運動名・説明文入り。画像内の文字は編集できません" : "文字なし。資料に貼って自由に説明を追加できます"}）
                                </dd>
                            </div>
                            <div className="sm:col-span-2">
                                <dt className="mb-1 text-xs font-bold tracking-wider text-slate-400">
                                    利用条件
                                </dt>
                                <dd className="text-sm font-medium leading-relaxed text-slate-700 break-keep">
                                    無料・商用利用OK・クレジット表記不要・会員登録不要。医療機関・介護施設での患者指導資料、退院前指導、訪問リハビリ・通所リハビリの配布資料にそのまま使えます。素材データそのものの再配布・転売はできません。詳しくは
                                    <Link href="/license/" className="mx-0.5 font-bold text-teal-700 underline decoration-teal-300 underline-offset-2 hover:text-teal-500">
                                        利用規約・ガイドライン
                                    </Link>
                                    をご確認ください。
                                </dd>
                            </div>
                        </dl>
                    </section>
                </div>

                {/* 素材詳細ページの唯一のナーチャ導線：LINE（配布資料7点セット・新作通知） */}
                <div className="mt-8 max-w-5xl mx-auto">
                    <LineBanner />
                </div>
            </main>
            <Footer />
            <PostDownloadLineToast />
        </div>
    );
}
