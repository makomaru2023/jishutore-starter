import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-16">
                <div className="mx-auto max-w-3xl bg-white p-8 rounded-xl shadow-sm">
                    <h1 className="mb-8 text-3xl font-bold text-gray-900 text-center">運営者について</h1>

                    <div className="space-y-8 text-gray-700 leading-relaxed">
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-4">ご挨拶</h2>
                            <p>
                                はじめまして。「自主トレ素材庫」を運営しております、作業療法士のトロルと申します。
                            </p>
                            <p className="mt-4">
                                私はこれまで、回復期リハビリテーション病院や訪問リハビリの現場で、多くの患者様のリハビリに携わってきました。
                                その中で常に感じていたのが、<strong>「自主トレ指導の資料作りにかかる負担」</strong>です。
                            </p>
                            <p className="mt-4">
                                「もっと分かりやすい絵があれば」「毎回手書きするのは大変」「ネットの画像は著作権が心配」……。
                                同じような悩みを持つセラピストの力になりたいと思い、このサイトを立ち上げました。
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-4">運営者プロフィール</h2>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <dt className="font-bold text-gray-900">氏名</dt>
                                    <dd className="sm:col-span-2">トロル</dd>

                                    <dt className="font-bold text-gray-900">保有資格</dt>
                                    <dd className="sm:col-span-2">作業療法士（OT）</dd>

                                    <dt className="font-bold text-gray-900">経歴</dt>
                                    <dd className="sm:col-span-2">
                                        作業療法士として病院（回復期・維持期）、訪問看護ステーション等に勤務。<br />
                                        臨床業務の傍ら、リハビリ職向けのWebメディア運営やイラスト制作を行う。
                                    </dd>
                                </dl>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-4">サイトへの想い</h2>
                            <p>
                                リハビリの主役は、患者様ご自身です。
                                セラピストがいない時間にも、正しいフォームで、意欲的に自主トレに取り組んでいただくこと。
                                それが回復への近道だと信じています。
                            </p>
                            <p className="mt-4">
                                このサイトの素材が、セラピストの皆様の業務負担を減らし、
                                その分、患者様と向き合う時間や、より良いリハビリを提供する時間に繋がれば幸いです。
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
