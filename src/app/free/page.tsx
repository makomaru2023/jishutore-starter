import { getItemsByTier } from "@/lib/items";
import { ItemCard } from "@/components/ItemCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function FreePage() {
    // For now, we'll fetch items with tier "free". 
    // If no items are found (since we haven't updated JSON yet), it will be empty.
    // We will update JSON in the next step.
    const items = getItemsByTier("free");

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8 text-center">
                    <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                        無料素材
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600">
                        毎月更新される無料の自主トレ素材です。<br />
                        文字なし5点、文字あり5点の計10点を4ヶ月サイクルで更新しています。
                    </p>
                </div>

                {items.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {items.map((item) => (
                            <ItemCard key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                        <p className="text-gray-500">現在公開中の無料素材はありません。</p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
