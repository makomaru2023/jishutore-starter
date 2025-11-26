import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function LicensePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-12">
                <div className="mx-auto max-w-4xl bg-white p-8 rounded-xl shadow-sm">
                    <h1 className="mb-8 text-3xl font-bold text-gray-900 text-center">利用規約・ライセンス</h1>

                    <div className="space-y-12 text-gray-700">
                        {/* 1. 共通事項 */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">1. 共通事項（全素材共通）</h2>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="font-bold text-lg mb-3">禁止事項</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>素材データそのものを再配布・転売すること（加工の有無を問わず）</li>
                                    <li>素材をメインとした商品（LINEスタンプ、グッズ等）を販売すること</li>
                                    <li>公序良俗に反する目的、反社会的勢力に関わる利用</li>
                                    <li>その他、当サイトが不適切と判断する利用</li>
                                </ul>
                                <h3 className="font-bold text-lg mt-6 mb-3">免責事項</h3>
                                <p>
                                    当サイトの素材を利用したことによるトラブルや損害について、当サイトは一切の責任を負いません。
                                    運動指導の際は、必ず専門職の判断のもと、対象者の身体機能に合わせて安全に実施してください。
                                </p>
                            </div>
                        </section>

                        {/* 2. 無料素材 */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">2. 無料素材（Freeプラン）</h2>
                            <div className="space-y-4">
                                <p>
                                    無料素材は、クリエイティブ・コモンズ・ライセンス<strong>「表示 4.0 国際 (CC BY 4.0)」</strong>の下で提供されています。
                                </p>
                                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                                    <h3 className="font-bold text-blue-900 mb-2">利用条件：クレジット表記が必要です</h3>
                                    <p className="text-sm mb-4">
                                        利用する際は、資料の隅などに以下のいずれかの表記を入れてください。
                                    </p>
                                    <div className="bg-white p-3 rounded border border-gray-200 text-sm font-mono text-gray-600">
                                        出典：自主トレ素材庫.jp<br />
                                        （https://self-training.pro-kinkin-sss.com）
                                    </div>
                                    <p className="text-sm mt-4">
                                        ※クレジット表記があれば、商用利用・改変・再配布（CC BY 4.0の条件下で）も可能です。
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 3. 有料素材 */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">3. 有料素材（Basic / Pro / Premium）</h2>
                            <div className="space-y-4">
                                <p>
                                    有料プランで購入された素材は、<strong>「自主トレ素材庫.jp 独自ライセンス」</strong>が適用されます。
                                </p>
                                <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                                    <h3 className="font-bold text-green-900 mb-2">利用条件：クレジット表記は不要です</h3>
                                    <p className="mb-4">
                                        購入者は、以下の用途で自由に利用できます。
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2 mb-4">
                                        <li>院内・施設内での掲示物、配布資料</li>
                                        <li>患者様・利用者様への個別指導資料</li>
                                        <li>学会発表、論文、勉強会のスライド資料</li>
                                        <li>Webサイト、SNS、ブログ、動画などへの掲載</li>
                                        <li>商用利用（有料セミナーの資料、有料noteの挿絵など）</li>
                                    </ul>
                                    <p className="text-sm font-bold text-red-600">
                                        ※ただし、「素材そのものの再配布・転売」は固く禁止します。
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
