import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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
