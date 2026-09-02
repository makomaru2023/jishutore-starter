import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LegalDates } from "@/components/legal/LegalDocument";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "特定商取引法に基づく表記｜自主トレ素材庫",
    description: "自主トレ素材庫の特定商取引法に基づく表記です。自主トレ素材庫Plusと買い切り商品の販売事業者、連絡先、販売価格、支払方法、デジタルコンテンツの引渡し時期、継続課金サービスの更新・解約、返品・キャンセル条件、動作環境などを掲載しています。販売事業者情報の開示請求も受け付けています。購入前にご確認ください。",
    alternates: { canonical: "https://jishutore-sozaiko.online/tokushoho/" },
};

const CONTACT_EMAIL = "smart.rehabili@gmail.com";

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
                            <p>{CONTACT_EMAIL}</p>
                            {/* 販売事業者の氏名・住所・電話番号は「請求があれば開示」の形を採っている。
                                その形が成り立つには、請求のしかたが読めばわかる必要がある。
                                ★ボタンは置かない。法務ページから請求を誘う導線にはしない。
                                  義務はボタンの有無で変わらないので、方法を1文書けば足りる。
                                ★「○営業日以内」など、守れるか分からない期限は書かないこと。 */}
                            <p className="text-sm mt-2 leading-7 text-gray-600">
                                販売事業者の氏名・住所・電話番号は、ご購入をご検討中の方またはご購入者からご請求があった場合、遅滞なく開示いたします。
                                上記のメールアドレス宛に、件名を「販売事業者情報の開示請求」としてご連絡ください。内容を確認のうえ、法令に従い対応します。
                            </p>
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

                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">本表記の変更</h2>
                            <p>
                                本表記の内容は、法令の改正、販売する商品・価格・提供条件の変更に伴い、変更することがあります。変更した場合は、変更後の内容を本ページに掲載します。<br />
                                販売価格・提供条件の変更は、変更後にお申し込みいただくご注文から適用します。すでに成立したご注文には適用しません。
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">関連するページ</h2>
                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold">
                                <Link href="/license/" className="text-blue-700 hover:underline">利用規約・ライセンス</Link>
                                <Link href="/privacy/" className="text-blue-700 hover:underline">プライバシーポリシー</Link>
                                <Link href="/faq/" className="text-blue-700 hover:underline">よくあるご質問</Link>
                            </div>
                        </section>

                        <LegalDates document="tokushoho" />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
