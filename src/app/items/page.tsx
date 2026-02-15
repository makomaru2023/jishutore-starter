import { getItems } from "@/lib/items";
import { FilteredItemList } from "@/components/FilteredItemList";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default async function ItemsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
    const { category } = await searchParams;
    const allItems = getItems();

    let items = allItems;
    let title = "自主トレ素材一覧";
    let description = "全ての自主トレ素材を無料でご利用いただけます。";

    if (category === 'plain') {
        items = allItems.filter(item => item.category === 'plain');
        title = "自主トレ素材一覧（文字なし）";
        description = "文字が入っていない、シンプルなイラスト素材です。";
    } else if (category === 'text') {
        items = allItems.filter(item => item.category === 'text');
        title = "自主トレ素材一覧（文字あり）";
        description = "説明書きが入った、そのまますぐに使えるイラスト素材です。";
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8 text-center">
                    <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                        {title}
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600">
                        {description}
                    </p>
                </div>

                <FilteredItemList items={items} />
            </main>
            <Footer />
        </div>
    );
}
