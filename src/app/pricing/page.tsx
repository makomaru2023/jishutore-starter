import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PricingCard } from "@/components/PricingCard";

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="py-20 sm:py-32">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            料金プラン
                        </h1>
                        <p className="mt-4 text-lg text-gray-600">
                            すべてのプランは「買い切り」です。<br />
                            月額費用は一切かかりません。
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
                        {/* Basic Plan */}
                        <PricingCard
                            title="Basic"
                            price="500"
                            description="まずはここから。基本的な自主トレ素材セット。"
                            features={[
                                "基本的な自主トレ素材 40点",
                                "整形外科疾患の基本運動",
                                "買い切り（追加費用なし）",
                                "商用利用OK",
                                "クレジット表記不要"
                            ]}
                            priceId="price_1SVwPdFoWwVKxcZhmtNyRVOZ"
                            buttonText="Basicプランを購入"
                            recommended={false}
                        />

                        {/* Pro Plan */}
                        <PricingCard
                            title="Pro"
                            price="980"
                            description="臨床でよく使う、実用的な素材を追加したセット。"
                            features={[
                                "Basicの内容すべて",
                                "+ 実用的な応用動作 20点",
                                "合計 60点の素材セット",
                                "買い切り（追加費用なし）",
                                "商用利用OK",
                                "クレジット表記不要"
                            ]}
                            priceId="price_1SVwPdFoWwVKxcZhic27pdaX"
                            buttonText="Proプランを購入"
                            recommended={true}
                        />

                        {/* Premium Plan */}
                        <PricingCard
                            title="Premium"
                            price="2,980"
                            description="全素材が手に入る、最もお得なコンプリートセット。"
                            features={[
                                "現在公開中の全素材（200点以上）",
                                "今後追加される新作も利用可能",
                                "特殊な疾患・生活指導素材も含む",
                                "買い切り（追加費用なし）",
                                "商用利用OK",
                                "クレジット表記不要"
                            ]}
                            priceId="price_1SVwPeFoWwVKxcZhjMyJG3W1"
                            buttonText="Premiumプランを購入"
                            recommended={false}
                        />
                    </div>

                    {/* Comparison Table Section */}
                    <div className="mt-24 max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="px-6 py-8 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-center text-gray-900">プラン比較</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-600">
                                <thead className="bg-gray-50 text-gray-900 font-bold">
                                    <tr>
                                        <th className="px-6 py-4">機能・内容</th>
                                        <th className="px-6 py-4 text-center">Free</th>
                                        <th className="px-6 py-4 text-center">Basic</th>
                                        <th className="px-6 py-4 text-center text-blue-600">Pro</th>
                                        <th className="px-6 py-4 text-center text-blue-600">Premium</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 font-medium">価格（税込）</td>
                                        <td className="px-6 py-4 text-center">0円</td>
                                        <td className="px-6 py-4 text-center">500円</td>
                                        <td className="px-6 py-4 text-center font-bold">980円</td>
                                        <td className="px-6 py-4 text-center font-bold">2,980円</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-medium">支払い方法</td>
                                        <td className="px-6 py-4 text-center">-</td>
                                        <td className="px-6 py-4 text-center">買い切り</td>
                                        <td className="px-6 py-4 text-center">買い切り</td>
                                        <td className="px-6 py-4 text-center">買い切り</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-medium">素材点数</td>
                                        <td className="px-6 py-4 text-center">約10点<br /><span className="text-xs text-gray-400">（月替わり）</span></td>
                                        <td className="px-6 py-4 text-center">40点</td>
                                        <td className="px-6 py-4 text-center">60点</td>
                                        <td className="px-6 py-4 text-center">200点以上</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-medium">クレジット表記</td>
                                        <td className="px-6 py-4 text-center text-red-500 font-bold">必須</td>
                                        <td className="px-6 py-4 text-center text-green-600 font-bold">不要</td>
                                        <td className="px-6 py-4 text-center text-green-600 font-bold">不要</td>
                                        <td className="px-6 py-4 text-center text-green-600 font-bold">不要</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-medium">商用利用</td>
                                        <td className="px-6 py-4 text-center">OK</td>
                                        <td className="px-6 py-4 text-center">OK</td>
                                        <td className="px-6 py-4 text-center">OK</td>
                                        <td className="px-6 py-4 text-center">OK</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
