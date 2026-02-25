import { getItems } from "@/lib/items";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Image from "next/image";
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
    const items = getItems();
    const item = items.find((i) => i.id === id);

    if (!item) {
        return {
            title: "Item Not Found",
        };
    }

    const title = item.titleJa || item.title;

    // Construct image URL for OG
    const R2_DOMAIN = "https://pub-00b4caa7ca60422fa31c5d5d0d6772c3.r2.dev";
    let imageUrl = item.previewSrc;
    if (!imageUrl.startsWith("https://")) {
        imageUrl = `${R2_DOMAIN}/${item.previewSrc}`;
    }
    const absoluteImageUrl = new URL(imageUrl, 'https://self-training.pro-kinkin-sss.com').toString();

    return {
        title: `${title} | 自主トレ素材庫`,
        description: `${title}の自主トレ素材イラストです。リハビリ職のための高品質な指導用資料素材。`,
        openGraph: {
            title: `${title} | 自主トレ素材庫`,
            description: `${title}の自主トレ素材イラストです。`,
            images: [absoluteImageUrl],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${title} | 自主トレ素材庫`,
            description: `${title}の自主トレ素材イラストです。`,
            images: [absoluteImageUrl],
        },
    };
}



export default async function ItemPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const items = getItems();
    const item = items.find((i) => i.id === id);



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
    const R2_DOMAIN = "https://pub-00b4caa7ca60422fa31c5d5d0d6772c3.r2.dev";
    let imageUrl = item.previewSrc;
    if (!imageUrl.startsWith("https://")) {
        imageUrl = `${R2_DOMAIN}/${item.previewSrc}`;
    }

    const title = item.titleJa || item.title;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />
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
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold bg-teal-50 text-teal-600 capitalize">
                                        Free
                                    </span>
                                </div>
                                <h1 className="text-3xl font-black text-slate-900 mb-3 leading-tight">{title}</h1>
                                <p className="text-slate-400 text-sm font-medium">素材ID: {item.id}</p>
                            </div>

                            <div className="prose text-slate-600 mb-10 font-medium leading-relaxed">
                                <p>
                                    この自主トレ素材は、リハビリテーションの現場で患者様への指導用資料としてご利用いただけます。
                                    統一感のあるデザインで、分かりやすい資料作成をサポートします。
                                </p>
                            </div>

                            <div className="mt-auto space-y-6">
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                    <h3 className="font-bold text-slate-900 mb-2">ダウンロード（完全無料）</h3>
                                    <p className="text-sm text-slate-500 mb-6 font-medium">
                                        会員登録は不要です。すぐにダウンロードしてご利用いただけます。
                                    </p>
                                    <a
                                        href={item.fileHref}
                                        download
                                        className="flex items-center justify-center w-full py-4 px-6 bg-teal-500 hover:bg-teal-400 text-white font-bold rounded-full transition-all shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-[1.02] gap-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                        </svg>
                                        画像をダウンロード
                                    </a>
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
                </div>
            </main>
            <Footer />
        </div>
    );
}
