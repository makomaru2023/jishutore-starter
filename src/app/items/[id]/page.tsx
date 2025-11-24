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

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const items = getItems();
    const item = items.find((i) => i.id === params.id);

    if (!item) {
        return {
            title: "Item Not Found",
        };
    }

    const title = item.titleJa || item.title;
    return {
        title: `${title} | 自主トレ素材庫.jp`,
        description: `${title}の自主トレ素材イラストです。リハビリ職のための高品質な指導用資料素材。`,
    };
}

export default function ItemPage({ params }: { params: { id: string } }) {
    const items = getItems();
    const item = items.find((i) => i.id === params.id);

    if (!item) {
        return <div>Item not found</div>;
    }

    // Transform URL logic (same as ItemCard)
    let imageUrl = item.previewSrc;
    if (item.previewSrc.startsWith("https://")) {
        imageUrl = `/api/image?key=${encodeURIComponent(
            item.previewSrc.replace(
                "https://pub-00b4caa7ca60422fa31c5d50d6772c3.r2.dev/",
                ""
            )
        )}`;
    } else {
        imageUrl = `/api/image?key=${encodeURIComponent(item.previewSrc)}`;
    }

    const title = item.titleJa || item.title;

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="mx-auto max-w-4xl bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="md:flex">
                        {/* Image Section with Watermark */}
                        <div className="md:w-1/2 bg-gray-100 relative aspect-[4/3] md:aspect-auto">
                            <Image
                                src={imageUrl}
                                alt={title}
                                fill
                                className="object-contain p-8"
                            />
                            {/* CSS Watermark Overlay */}
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 flex flex-wrap content-center justify-center opacity-20 rotate-[-45deg] scale-150">
                                    {Array.from({ length: 20 }).map((_, i) => (
                                        <div key={i} className="m-8 text-4xl font-bold text-gray-900 whitespace-nowrap select-none">
                                            SAMPLE
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-8 md:w-1/2 flex flex-col">
                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize mb-2">
                                    {item.tier}
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
                                    <p className="text-sm text-gray-600 mb-4">
                                        この素材をダウンロードするには、プランの購入が必要です。
                                        購入後は制限なくダウンロードいただけます。
                                    </p>
                                    <Link
                                        href="/pricing"
                                        className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold rounded-lg transition-colors"
                                    >
                                        料金プランを見る
                                    </Link>
                                </div>
                                <Link href="/basic" className="block text-center text-gray-500 hover:text-gray-900 text-sm">
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
