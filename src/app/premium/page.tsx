import { getItemsByTier } from "@/lib/items";
import { ItemCard } from "@/components/ItemCard";
import { FilteredItemList } from "@/components/FilteredItemList";
import { Header } from "@/components/Header";

export default function PremiumPage() {
    const items = getItemsByTier("premium");

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8 text-center">
                    <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                        Premium プラン素材
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600">
                        全ての自主トレ素材をご利用いただけます。
                    </p>
                </div>

                <FilteredItemList items={items} />
            </main>

            <footer className="bg-white py-8 mt-12 border-t">
                <div className="container mx-auto px-4 text-center text-gray-500">
                    <p>© {new Date().getFullYear()} 自主トレ素材庫 All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
