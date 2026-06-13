import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-12">
                <div className="mx-auto max-w-3xl">
                    <h1 className="mb-8 text-3xl font-bold text-gray-900 text-center">よくあるご質問</h1>

                    {/* Top 3 Questions */}
                    <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
                            <h3 className="font-bold text-blue-600 mb-2 text-lg">Q. 本当にすべて無料ですか？</h3>
                            <p className="text-gray-700 text-sm">はい、すべての素材を無料でダウンロードしてご利用いただけます。会員登録も不要です。</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
                            <h3 className="font-bold text-blue-600 mb-2 text-lg">Q. 商用利用は可能ですか？</h3>
                            <p className="text-gray-700 text-sm">はい、可能です。院内資料はもちろん、有料セミナーの資料や、有料noteの挿絵などにもご利用いただけます。</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
                            <h3 className="font-bold text-blue-600 mb-2 text-lg">Q. クレジット表記は必須ですか？</h3>
                            <p className="text-gray-700 text-sm">いいえ、必須ではありません。ただ、表記していただけると運営者がとても喜びます（例：©自主トレ素材庫）。</p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* Section 1 */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-4">サービス全般について</h2>
                            <div className="space-y-4">
                                <details className="group bg-white rounded-lg shadow-sm">
                                    <summary className="flex cursor-pointer items-center justify-between p-6 font-medium text-gray-900">
                                        Q. どんな職種向けの素材ですか？
                                        <span className="ml-6 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </summary>
                                    <div className="px-6 pb-6 text-gray-600">
                                        <p>主に理学療法士（PT）、作業療法士（OT）、言語聴覚士（ST）、および介護職の方々が、患者様や利用者様への指導に使うことを想定して作成しています。</p>
                                    </div>
                                </details>
                                <details className="group bg-white rounded-lg shadow-sm">
                                    <summary className="flex cursor-pointer items-center justify-between p-6 font-medium text-gray-900">
                                        Q. スマホからでもダウンロードできますか？
                                        <span className="ml-6 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </summary>
                                    <div className="px-6 pb-6 text-gray-600">
                                        <p>はい、可能です。画像データ（PNG形式）として保存されますので、スマホの写真アプリ等で確認・利用できます。</p>
                                    </div>
                                </details>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-4">ライセンス・利用条件について</h2>
                            <div className="space-y-4">
                                <details className="group bg-white rounded-lg shadow-sm">
                                    <summary className="flex cursor-pointer items-center justify-between p-6 font-medium text-gray-900">
                                        Q. 学会発表や論文で使ってもいいですか？
                                        <span className="ml-6 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </summary>
                                    <div className="px-6 pb-6 text-gray-600">
                                        <p>はい、問題ありません。クレジット表記も不要ですので、スライドや誌面にそのまま掲載いただけます。</p>
                                    </div>
                                </details>
                                <details className="group bg-white rounded-lg shadow-sm">
                                    <summary className="flex cursor-pointer items-center justify-between p-6 font-medium text-gray-900">
                                        Q. 職場内で共有してもいいですか？
                                        <span className="ml-6 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </summary>
                                    <div className="px-6 pb-6 text-gray-600">
                                        <p>同一の事業所内（同じ病院のリハビリ科内など）であれば、共有サーバーに入れてチームで使用していただいて構いません。ただし、系列病院など別拠点への配布や、ネット上での不特定多数への公開はご遠慮ください。</p>
                                    </div>
                                </details>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
