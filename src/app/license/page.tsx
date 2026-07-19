import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TrackedB2bContactLink } from "@/components/TrackedB2bContactLink";

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

                        {/* 2. 有料資料セット（資料セット） */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">2. 有料資料セット（資料セット商品）</h2>
                            <div className="space-y-4">
                                <p>
                                    <Link href="/products" className="text-blue-600 hover:underline">資料セット</Link>
                                    （疾患別自主トレ資料セット 等）でご購入いただいた PPTX・PDF・素材ファイルは、購入者ご本人による次の用途でのみご利用いただけます。
                                </p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>患者さん・利用者さんへの自主トレ指導／家族説明／退院前指導</li>
                                    <li>所属する医療・介護施設内での資料作成および勉強会資料</li>
                                    <li>編集（文言・写真・配色等の調整）を加えてご利用いただくこと</li>
                                </ul>
                                <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                                    <h3 className="font-bold text-red-900 mb-2">禁止事項（有料資料セット）</h3>
                                    <ul className="list-disc pl-5 space-y-2 text-red-900">
                                        <li>ZIP・PPTX・PDF・素材ファイルそのものの再配布・転売・共有（加工の有無を問わず）</li>
                                        <li>ダウンロード URL の SNS 等での共有・公開</li>
                                        <li>購入者以外への複製・データ受け渡し</li>
                                        <li>素材や資料をそのまま販売・配布する行為</li>
                                    </ul>
                                </div>
                                <p className="text-sm text-gray-600">
                                    商品ページに記載の利用範囲・禁止事項も併せてご確認ください：
                                    <Link href="/products/self-training-materials" className="text-blue-600 hover:underline ml-1">疾患別自主トレ資料セット</Link>
                                </p>
                            </div>
                        </section>

                        {/* 3. 利用条件 */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">3. 利用条件（無料素材）</h2>
                            <div className="space-y-4">
                                <p>
                                    当サイトで配布している素材は、<strong>規約の範囲内であれば、個人、法人、商用、非商用問わず無料で</strong>ご利用いただけます。
                                </p>
                                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                                    <h3 className="font-bold text-blue-900 mb-2">クレジット表記について</h3>
                                    <p className="mb-4">
                                        クレジット表記や事前連絡は<strong>不要</strong>です。<br />
                                        （もちろん、記載していただけると運営者が喜びます！）
                                    </p>

                                    <h3 className="font-bold text-blue-900 mb-2 mt-6">利用可能範囲の例</h3>
                                    <ul className="list-disc pl-5 space-y-2 mb-4">
                                        <li>院内・施設内での掲示物、配布資料</li>
                                        <li>患者様・利用者様への個別指導資料</li>
                                        <li>学会発表、論文、勉強会のスライド資料</li>
                                        <li>Webサイト、SNS、ブログ、動画などへの掲載</li>
                                        <li>商用利用（有料セミナーの資料、有料noteの挿絵など）</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* 4. 施設・法人での利用 */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                                4. 施設・法人でのご利用について
                            </h2>
                            <div className="space-y-4">
                                <p>
                                    無料素材は、施設内での掲示・配布を含め、セクション3の利用条件の範囲内であれば、法人・商用でも無料でご利用いただけます。
                                </p>
                                <p>
                                    有料商品（資料セット・自主トレ素材庫Plus）は、現行どおり購入者ご本人によるご利用に限ります。
                                </p>
                                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                                    <p>
                                        施設・チームでの複数名利用や請求書払いによる提供は現在準備中です。
                                        ご希望の場合は、ご要望・ご相談をお聞かせください。
                                    </p>
                                    <TrackedB2bContactLink
                                        href="/contact"
                                        placement="license_page"
                                        className="mt-4 inline-flex font-semibold text-blue-700 hover:text-blue-900 hover:underline"
                                    >
                                        施設・法人利用について相談する &rarr;
                                    </TrackedB2bContactLink>
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
