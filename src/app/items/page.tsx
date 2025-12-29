import { getItems } from "@/lib/items";
import { FilteredItemList } from "@/components/FilteredItemList";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function ItemsPage() {
    const items = getItems();

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8 text-center">
                    <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                        自主トレ素材一覧
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600">
                        全ての自主トレ素材を無料でご利用いただけます。
                    </p>
                </div>

                <FilteredItemList items={items} />
            </main>
            <Footer />
        </div>
    );
}
