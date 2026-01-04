import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-12">
                <div className="mx-auto max-w-3xl bg-white p-8 rounded-xl shadow-sm">
                    <h1 className="mb-8 text-3xl font-bold text-gray-900">プライバシーポリシー</h1>

                    <div className="prose prose-blue max-w-none text-gray-600">
                        <p>
                            自主トレ素材庫、以下「当サイト」は、ユーザーの個人情報を適切に取り扱うため、以下のとおりプライバシーポリシー（以下「本ポリシー」）を定めます。
                        </p>

                        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. 取得する情報</h2>
                        <p>当サイトは、次の情報を取得する場合があります。</p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>お問い合わせフォーム等でご提供いただく氏名、メールアドレス、そのほかの連絡先情報</li>
                            <li>商品購入時に、決済代行サービス（Stripe）が取得するクレジットカード情報等の決済関連情報<br />※当サイト運営者は、クレジットカード番号等の機微な決済情報にはアクセスできません。</li>
                            <li>アクセス解析ツール（Google Analytics 4）により取得する Cookie 情報、端末情報、閲覧ページ等の利用状況情報</li>
                        </ul>

                        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. 利用目的</h2>
                        <p>取得した情報は、以下の目的の範囲内で利用します。</p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>デジタル素材の提供、ユーザーサポート、本人確認のため</li>
                            <li>不正利用の防止およびセキュリティ確保のため</li>
                            <li>コンテンツ改善・サービス品質向上のためのアクセス解析のため</li>
                            <li>法令の遵守および紛争が生じた場合の対応のため</li>
                        </ul>

                        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. 第三者提供・共同利用</h2>
                        <p>当サイトは、次の事業者のサービスを利用します。各社のプライバシーポリシーに基づきデータが処理される場合があります。</p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>Stripe, Inc.（決済処理）</li>
                            <li>Google LLC（Google Analytics 4）</li>
                            <li>ホスティング／CDN等のクラウド事業者</li>
                        </ul>
                        <p>法令に基づく場合などを除き、これら以外の第三者に個人情報を提供することはありません。</p>

                        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Cookie等の利用</h2>
                        <p>
                            当サイトでは、アクセス解析のために Cookie を使用します。<br />
                            ユーザーはブラウザの設定により Cookie の受け取りを拒否することができますが、その場合、一部の機能が正しく動作しない可能性があります。
                        </p>

                        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. 個人情報の管理</h2>
                        <p>
                            取得した情報は、利用目的の達成に必要な範囲で適切に管理し、不正アクセス・紛失・改ざん・漏えい等の防止に努めます。<br />
                            また、利用目的を達成し不要となった情報については、合理的な期間をおいて遅滞なく削除または匿名化します。
                        </p>

                        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. 法令等の遵守</h2>
                        <p>
                            当サイトは、個人情報の保護に関する法律および関連するガイドラインその他の規範を遵守します。
                        </p>

                        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">7. 開示・訂正・利用停止等の請求</h2>
                        <p>
                            ご本人から、当サイトが保有する個人情報の開示・訂正・削除・利用停止等のお申し出があった場合は、合理的な範囲で速やかに対応します。
                        </p>
                        <p className="mt-2">お問い合わせ窓口：<a href="mailto:smart.rehabili@gmail.com" className="text-blue-600 hover:underline">smart.rehabili@gmail.com</a></p>

                        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">8. 第三国移転</h2>
                        <p>
                            利用サービス提供事業者のサーバーが海外に設置されている場合があり、その際には各事業者のプライバシーポリシーに従い、適切な管理が行われます。
                        </p>

                        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">9. 免責</h2>
                        <p>
                            当サイトからリンクしている外部サイトにおける個人情報の取り扱いについては、当サイトは責任を負いません。<br />
                            リンク先のプライバシーポリシー等をご確認のうえご利用ください。
                        </p>

                        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">10. 本ポリシーの改定</h2>
                        <p>
                            本ポリシーの内容は、必要に応じて改定することがあります。<br />
                            重要な変更がある場合には、当サイト上での掲示等によりお知らせします。
                        </p>

                        <p className="mt-8 text-right text-sm text-gray-500">施行日：2025-10-19</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
