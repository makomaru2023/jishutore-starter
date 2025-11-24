import { getItems } from "@/lib/items";
import { ItemCard } from "@/components/ItemCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Home() {
  const items = getItems();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            自主トレ素材庫.jp
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            現場ですぐに使える、統一感のある自主トレイラストを無料でダウンロード。
            PDFやWordに貼り付けるだけで、質の高い資料が作成できます。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
