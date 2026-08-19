import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "特定商取引法に基づく表記｜自主トレ素材庫",
    description: "自主トレ素材庫の特定商取引法に基づく表記です。自主トレ素材庫Plusと買い切り商品の販売事業者、連絡先、販売価格、支払方法、デジタルコンテンツの引渡し時期、継続課金サービスの更新・解約、返品・キャンセル条件、動作環境などを掲載しています。購入前にご確認ください。",
};

export default function TokushohoPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-12">
                <div className="mx-auto max-w-3xl bg-white p-8 rounded-xl shadow-sm">
                    <h1 className="mb-8 text-3xl font-bold text-gray-900">特定商取引法に基づく表記</h1>

                    <div className="space-y-8 text-gray-600">
                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">販売事業者名</h2>
                            <p>請求時に開示</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">運営責任者</h2>
                            <p>請求時に開示</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">所在地</h2>
                            <p>請求時に開示</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">連絡先</h2>
                            <p>smart.rehabili@gmail.com</p>
                            <p className="text-sm mt-1 text-gray-500">（氏名・住所・電話番号は、ご購入検討者からのご請求があった場合、遅滞なく開示いたします）</p>
                        </section>

                        <hr className="border-gray-200" />

                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">屋号</h2>
                            <p>SmartReha（スマートリハ）</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">URL</h2>
                            <p>https://jishutore-sozaiko.online</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">販売価格</h2>
                            <p>各商品ページに税込価格を表示（消費税は内税として表示）</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">商品代金以外の必要料金</h2>
                            <p>ウェブページの閲覧やデジタルコンテンツのダウンロード等に必要となるインターネット接続料金・通信料等は、お客様のご負担となります。</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">お支払い方法</h2>
                            <p>クレジットカード決済（Stripe）</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">お支払い時期</h2>
                            <p>
                                【買い切り商品】ご注文確定時にクレジットカードでの決済が完了します。<br />
                                【自主トレ素材庫Plus（月払い）】初回はご登録時に決済され、以降はご登録日を基準に1か月ごとに自動で決済されます。<br />
                                【自主トレ素材庫Plus（年払い）】初回はご登録時に決済され、以降はご登録日を基準に1年ごとに自動で決済されます。
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">引渡し時期</h2>
                            <p>決済完了後、即時にダウンロード・ご利用可能です。</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">継続課金サービスの解約</h2>
                            <p>
                                自主トレ素材庫Plus（月払い・年払いとも）は、会員ページの「プラン管理」からいつでも解約できます。<br />
                                解約後も次回請求日（年払いの場合は次回更新日）まではご利用いただけます。期間途中の解約による日割り返金は行っておりません。
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">返品・キャンセル</h2>
                            <p>
                                デジタルコンテンツという商品の性質上、購入後の返品・キャンセルには応じておりません。<br />
                                ただし、重複決済やデータの破損など、当サイトの不備に起因する不具合が確認された場合には、個別に対応いたしますので、上記連絡先までご連絡ください。
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">動作環境</h2>
                            <p>PC／スマートフォンの最新バージョンの Web ブラウザでのご利用を推奨します。</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">表現および商品に関する注意書き</h2>
                            <p>
                                本コンテンツに記載されたトレーニング等の効果には個人差があり、特定の効果・成果を保証するものではありません。<br />
                                運動の実施にあたっては、利用者の体調や主治医・リハビリ専門職の指示に従ってください。
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
