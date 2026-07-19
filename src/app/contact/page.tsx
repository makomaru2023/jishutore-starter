import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TrackedB2bContactLink } from "@/components/TrackedB2bContactLink";

const B2B_CONTACT_SUBJECT = "【施設利用のご相談】";
const B2B_CONTACT_BODY = `・施設名：
・施設種別（通所介護・訪問看護ST・病院・クリニック等）：
・リハ職／機能訓練指導員のおおよその人数：
・ご利用を検討中の内容（自主トレ資料・報酬チェック など）：
・ご質問・ご要望：`;
const B2B_CONTACT_MAILTO = `mailto:smart.rehabili@gmail.com?subject=${encodeURIComponent(B2B_CONTACT_SUBJECT)}&body=${encodeURIComponent(B2B_CONTACT_BODY)}`;

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-16">
                <div className="mx-auto max-w-2xl">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">お問い合わせ</h1>
                        <p className="text-gray-600">
                            ご質問やご要望がございましたら、お気軽にお問い合わせください。<br />
                            内容を確認次第、担当者よりご連絡させていただきます。
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                        <div className="text-center space-y-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-2">メールでのお問い合わせ</h2>
                                <p className="text-gray-600 mb-4">以下のメールアドレスまで直接ご連絡ください。</p>
                                <a
                                    href="mailto:smart.rehabili@gmail.com"
                                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                                >
                                    smart.rehabili@gmail.com
                                </a>
                            </div>

                            <div className="pt-6 border-t border-gray-100">
                                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                    施設・法人でのご利用を検討中の方へ
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    施設・チームでの複数名利用や請求書払いについて、ご要望・ご相談を受け付けています。
                                    施設向けの提供形態は現在準備中です。
                                </p>
                                <TrackedB2bContactLink
                                    href={B2B_CONTACT_MAILTO}
                                    placement="contact_page"
                                    className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                                >
                                    施設・法人利用について相談する
                                </TrackedB2bContactLink>
                            </div>

                            <div className="pt-6 border-t border-gray-100">
                                <h2 className="text-lg font-semibold text-gray-900 mb-2">よくあるご質問</h2>
                                <p className="text-gray-600 mb-4">
                                    お問い合わせの前に、よくあるご質問をご確認いただくと解決する場合がございます。
                                </p>
                                <a
                                    href="/faq"
                                    className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                                >
                                    よくあるご質問を見る &rarr;
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
