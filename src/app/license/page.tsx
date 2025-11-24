import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function LicensePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-12">
                <div className="mx-auto max-w-3xl bg-white p-8 rounded-xl shadow-sm">
                    <h1 className="mb-8 text-3xl font-bold text-gray-900">利用規約・ガイドライン</h1>

                    <div className="prose prose-blue max-w-none text-gray-600">
                        <p>
                            自主トレ素材庫.jp、以下「本サイト」で配布する素材の利用条件は、以下のとおりです。<br />
                            本ページの内容は、「利用規約」とあわせて適用されます。
                        </p>

                        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">無料素材（CC BY 4.0）</h2>
                        <p>
                            本サイトの無料素材は、クリエイティブ・コモンズ・ライセンス「表示 4.0 国際（CC BY 4.0）」のもとで提供されます。
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>商用・非商用を問わず利用可能</li>
                            <li>画像の加工・編集・一部切り出し等も可能</li>
                            <li>クレジット表記が必須</li>
                        </ul>

                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                            <p className="font-bold mb-2">クレジット表記例：</p>
                            <p>「出典：自主トレ素材庫.jp」</p>
                            <p className="text-sm mt-2 text-gray-500">可能であれば、上記に加えて URL（https://self-training.pro-kinkin-sss.com）も併記してください。</p>
                        </div>

                        <p>
                            CC BY 4.0 ライセンスの詳細：<br />
                            <a href="https://creativecommons.org/licenses/by/4.0/deed.ja" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                https://creativecommons.org/licenses/by/4.0/deed.ja
                            </a>
                        </p>

                        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">有料素材（SmartReha独自ライセンス）</h2>
                        <p>
                            有料素材は、自主トレ素材庫.jp独自の商用利用ライセンスで提供されます。買い切り制であり、購入者は以下の範囲で継続的に利用できます。
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>商用利用可（院内資料・患者配布物・講習会資料・SNS投稿・Web教材など）</li>
                            <li>クレジット表記は不要</li>
                            <li>本素材データそのものの再配布・再販売・貸与は禁止</li>
                            <li>購入者本人、または同一の医療機関・事業所内の職員による共有利用に限る</li>
                        </ul>

                        <p className="mb-4">
                            デジタル商品の性質上、ダウンロード完了後の返品・返金には応じられません。<br />
                            ただし、決済の重複やデータ破損など、当サイトに起因する不具合が確認された場合は、
                            合理的な範囲で返金または再配布等の対応を行います。<a href="mailto:smart.rehabili@gmail.com" className="text-blue-600 hover:underline">smart.rehabili@gmail.com</a> までご連絡ください。
                        </p>

                        <p className="text-sm text-gray-500">
                            ※個別のライセンス条件が商品ページに記載されている場合は、そちらが優先されます。
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
