import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function TokushohoPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="mx-auto max-w-3xl bg-white p-8 rounded-lg shadow-sm">
                    <h1 className="mb-8 text-3xl font-bold text-gray-900">特定商取引法に基づく表記</h1>

                    <div className="space-y-6 text-gray-700">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b pb-6">
                            <div className="font-semibold text-gray-900">販売事業者名</div>
                            <div className="md:col-span-2">Smart Reha</div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b pb-6">
                            <div className="font-semibold text-gray-900">代表責任者</div>
                            <div className="md:col-span-2">請求があったら遅滞なく開示します</div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b pb-6">
                            <div className="font-semibold text-gray-900">所在地</div>
                            <div className="md:col-span-2">
                                請求があったら遅滞なく開示します
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b pb-6">
                            <div className="font-semibold text-gray-900">電話番号</div>
                            <div className="md:col-span-2">
                                請求があったら遅滞なく開示します
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b pb-6">
                            <div className="font-semibold text-gray-900">メールアドレス</div>
                            <div className="md:col-span-2">smart.rehabili@gmail.com</div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b pb-6">
                            <div className="font-semibold text-gray-900">販売価格</div>
                            <div className="md:col-span-2">各プランのページに記載（表示価格は税込）</div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b pb-6">
                            <div className="font-semibold text-gray-900">商品代金以外の必要料金</div>
                            <div className="md:col-span-2">インターネット接続料金、通信料金等はお客様のご負担となります。</div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b pb-6">
                            <div className="font-semibold text-gray-900">お支払い方法</div>
                            <div className="md:col-span-2">クレジットカード決済（Stripe）</div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b pb-6">
                            <div className="font-semibold text-gray-900">商品の引き渡し時期</div>
                            <div className="md:col-span-2">決済完了後、直ちにご利用いただけます。</div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b pb-6">
                            <div className="font-semibold text-gray-900">返品・交換・キャンセル等</div>
                            <div className="md:col-span-2">デジタルコンテンツの性質上、購入後の返品・キャンセルはお受けできません。</div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
