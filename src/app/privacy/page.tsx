import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="mx-auto max-w-3xl bg-white p-8 rounded-lg shadow-sm">
                    <h1 className="mb-8 text-3xl font-bold text-gray-900">プライバシーポリシー</h1>

                    <div className="space-y-8 text-gray-700">
                        <section>
                            <h2 className="mb-4 text-xl font-semibold text-gray-900 border-b pb-2">1. 個人情報の収集について</h2>
                            <p>
                                当サイトでは、商品のご購入やお問い合わせの際に、お名前やメールアドレス等の個人情報をご入力いただく場合がございます。
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-xl font-semibold text-gray-900 border-b pb-2">2. 個人情報の利用目的</h2>
                            <p className="mb-4">
                                取得した個人情報は、以下の目的で利用いたします。
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>商品の提供およびダウンロードリンクの送付</li>
                                <li>お問い合わせへの回答</li>
                                <li>重要なお知らせやサービスに関するご案内</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 text-xl font-semibold text-gray-900 border-b pb-2">3. 個人情報の第三者提供</h2>
                            <p>
                                当サイトは、法令に基づく場合を除き、あらかじめご本人の同意を得ることなく、個人情報を第三者に提供することはございません。
                                ただし、決済処理のために決済代行会社（Stripe）へ必要な情報を提供いたします。
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-xl font-semibold text-gray-900 border-b pb-2">4. 個人情報の管理</h2>
                            <p>
                                当サイトは、個人情報の漏洩、滅失、毀損等を防止するために、適切なセキュリティ対策を実施し、個人情報を厳重に管理いたします。
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-xl font-semibold text-gray-900 border-b pb-2">5. お問い合わせ窓口</h2>
                            <p>
                                本ポリシーに関するお問い合わせは、以下のメールアドレスまでお願いいたします。<br />
                                smart.rehabili@gmail.com
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
