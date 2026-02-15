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
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="mx-auto max-w-4xl bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="md:flex">
                        {/* Image Section with Watermark Protection */}
                        <div className="md:w-1/2 bg-gray-100 relative aspect-[4/3] md:aspect-auto flex items-center justify-center overflow-hidden">
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
                        <div className="p-8 md:w-1/2 flex flex-col">
                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize mb-2">
                                    Free
                                </span>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
                                <p className="text-gray-500 text-sm">ID: {item.id}</p>
                            </div>

                            <div className="prose text-gray-600 mb-8">
                                <p>
                                    この自主トレ素材は、リハビリテーションの現場で患者様への指導用資料としてご利用いただけます。
                                    統一感のあるデザインで、分かりやすい資料作成をサポートします。
                                </p>
                            </div>

                            <div className="mt-auto space-y-4">
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h3 className="font-semibold text-gray-900 mb-2">ダウンロードについて</h3>
                                    <p className="text-sm text-green-700 mb-4 font-bold">
                                        無料でダウンロード可能です。
                                    </p>
                                    <a
                                        href={item.fileHref}
                                        download
                                        className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold rounded-lg transition-colors"
                                    >
                                        画像をダウンロード
                                    </a>
                                </div>
                                <Link href="/items" className="block text-center text-gray-500 hover:text-gray-900 text-sm">
                                    一覧に戻る
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
