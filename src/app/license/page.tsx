import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function LicensePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="mx-auto max-w-3xl bg-white p-8 rounded-lg shadow-sm">
                    <h1 className="mb-8 text-3xl font-bold text-gray-900">利用規約・ライセンス</h1>

                    <div className="space-y-8 text-gray-700">
                        <section>
                            <h2 className="mb-4 text-xl font-semibold text-gray-900 border-b pb-2">1. 利用許諾</h2>
                            <p className="mb-4">
                                当サイトで配布している素材は、規約の範囲内であれば、個人、法人、商用、非商用問わず無料でご利用いただけます。
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>リハビリテーション資料への利用</li>
                                <li>患者様・利用者様への配布資料</li>
                                <li>院内・施設内の掲示物</li>
                                <li>学会発表・論文での使用</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 text-xl font-semibold text-gray-900 border-b pb-2">2. 禁止事項</h2>
                            <p className="mb-4">
                                以下の行為は禁止されています。
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>素材そのものの再配布・販売（LINEスタンプ等含む）</li>
                                <li>公序良俗に反する目的での利用</li>
                                <li>反社会的勢力や違法行為に関わる利用</li>
                                <li>素材のイメージを著しく損なうような利用</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 text-xl font-semibold text-gray-900 border-b pb-2">3. 著作権</h2>
                            <p>
                                当サイトの素材は無料でお使いいただけますが、著作権は放棄しておりません。全ての素材の著作権は「自主トレ素材庫.jp」に帰属します。
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-xl font-semibold text-gray-900 border-b pb-2">4. 免責事項</h2>
                            <p>
                                素材を利用することによって発生したトラブルや損害について、当サイトは一切の責任を負いかねます。自主トレの指導等は、専門家の判断のもと適切に行ってください。
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
