import { Header } from "@/components/Header";
import { PricingCard } from "@/components/PricingCard";
import { Footer } from "@/components/Footer";

export default function PricingPage() {
    const plans = [
        {
            name: "Basic",
            price: "¥980",
            description: "無料40点を一気に使える基本パック",
            features: [
                "無料素材40点",
                "基本的な自主トレイラスト",
                "商用利用可能"
            ],
            priceId: "price_1SVwPdFoWwVKxcZhmtNyRVOZ",
            highlighted: false
        },
        {
            name: "Pro",
            price: "¥1,980",
            description: "Basicの40点＋別種60点で合計100点の実用パック",
            features: [
                "Basic素材40点",
                "Pro限定素材60点",
                "合計100点の素材",
                "商用利用可能",
                "優先サポート"
            ],
            priceId: "price_1SVwPdFoWwVKxcZhic27pdaX",
            highlighted: true
        },
        {
            name: "Premium",
            price: "¥2,980",
            description: "200点＋以降の新作優先追加の最上位パック",
            features: [
                "全素材200点以上",
                "新作素材の優先アクセス",
                "定期的な素材追加",
                "商用利用可能",
                "優先サポート",
                "特別リクエスト対応"
            ],
            priceId: "price_1SVwPeFoWwVKxcZhjMyJG3W1",
            highlighted: false
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-16">
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
                        プランと料金
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600">
                        ご購入の前に、利用規約とライセンス内容をご確認のうえお進めください。
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-6xl mx-auto">
                    {plans.map((plan) => (
                        <PricingCard key={plan.name} plan={plan} />
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="mx-auto max-w-3xl rounded-lg bg-blue-50 p-6">
                        <h2 className="mb-3 text-xl font-semibold text-gray-900">
                            ご購入前の注意事項
                        </h2>
                        <ul className="space-y-2 text-left text-gray-700">
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>お支払いは一回限りの買い切り型です。</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>購入後は<a href="/license" className="text-blue-600 hover:underline">利用規約</a>に従ってご利用ください。</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>決済完了後、素材のダウンロードリンクをメールでお送りします。</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
