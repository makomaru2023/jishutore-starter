import { getItemsByTier } from "@/lib/items";
import { ItemCard } from "@/components/ItemCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function FreePage() {
    // Get all basic items
    const basicItems = getItemsByTier("basic");

    // Separate into plain (no text) and text categories
    // Note: Assuming 'plain' category is for no-text and others (or specific category) are for text.
    // Based on file structure seen in items.json, category is 'plain'. 
    // We need to check if there are other categories. 
    // If only 'plain' exists in basic, we might need to rely on filename or another property.
    // Let's assume for now we split by index if categories aren't distinct enough, 
    // OR we can try to find 'text' category items if they exist.

    // Looking at the file list from previous turns, there were 'basic/plain' and 'basic/text' folders.
    // The 'category' field in items.json seems to reflect this (e.g., "plain").
    // Let's filter by category.
    const plainItems = basicItems.filter(item => item.category === "plain");
    const textItems = basicItems.filter(item => item.category === "text");

    // Calculate rotation index (0-3) based on current month
    const currentMonth = new Date().getMonth(); // 0-11
    const cycleIndex = currentMonth % 4; // 0, 1, 2, 3

    // Select 5 items from each category based on the cycle
    // We use the cycleIndex to offset the slice
    const itemsPerCategory = 5;
    const start = cycleIndex * itemsPerCategory;

    // Ensure we wrap around if we run out of items (though we expect 40 items total, 20 per category for 4 months)
    const selectedPlain = plainItems.slice(start, start + itemsPerCategory);
    const selectedText = textItems.slice(start, start + itemsPerCategory);

    // If we don't have enough items for the cycle, we might show fewer or wrap around.
    // For safety, let's just take what we have if slice returns empty/partial.

    const displayItems = [...selectedPlain, ...selectedText];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8 text-center">
                    <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                        無料素材
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600">
                        無料素材のページは毎月更新される無料の自主トレ素材です。
                    </p>
                </div>

                {displayItems.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {displayItems.map((item) => (
                            <ItemCard key={item.id} item={{ ...item, tier: 'free' }} /> // Override tier to 'free' for display/logic if needed
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                        <p className="text-gray-500">
                            現在公開中の無料素材はありません。<br />
                            (Basicプランの素材が不足している可能性があります)
                        </p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
