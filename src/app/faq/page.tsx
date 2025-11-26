'use client';

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function FAQPage() {
    {
        title: "ダウンロード・技術的なこと",
            items: [
                {
                    question: "ダウンロード方法がわかりません。",
                    answer: (
                        <>
                            決済完了後に表示される「ダウンロードボタン」から、すぐにファイルを取得できます。<br />
                            また、購入時に入力いただいたメールアドレス宛にもダウンロード情報が送信されます（※環境により異なります）。<br />
                            - スマートフォンの場合：通信環境の良い場所でWi-Fi接続を推奨します。<br />
                            - PCの場合：ダウンロードフォルダの保存先をご確認ください。
                        </>
                    )
                },
                {
                    question: "ファイルが開けません／画像が表示されません。",
                    answer: (
                        <>
                            以下の点をご確認ください。<br />
                            - Zip形式の場合：解凍ソフトで展開できているか<br />
                            - 画像形式：WebP / PNG などに対応したビューア・ブラウザをお使いか<br />
                            - スマホの場合：ストレージ容量に余裕があるか<br /><br />
                            それでも解決しない場合は、<br />
                            「ご利用端末（例：iPhone 15 / Windows 10）」「ブラウザ名」「エラーの状況」などを添えてお問い合わせください。
                        </>
                    )
                },
                {
                    question: "推奨環境はありますか？",
                    answer: (
                        <>
                            以下の環境を推奨しています。<br />
                            - 最新版の Google Chrome / Safari / Microsoft Edge などのWebブラウザ<br />
                            - スマートフォン：iOS / Android の最新版付近<br />
                            - PC：Windows / macOS のサポート対象バージョン<br /><br />
                            古いOSやブラウザでは、表示崩れやダウンロードエラーが発生する場合があります。
                        </>
                    )
                }
            ]
    },
    {
        title: "医療・安全面について",
            items: [
                {
                    question: "掲載されている運動は、誰が行っても大丈夫ですか？",
                    answer: (
                        <>
                            いいえ。自主トレ素材庫.jpの資料は、あくまで「説明用イラスト・資料」です。<br />
                            実際の運動を行うかどうか、運動の強度・回数などは、<strong>必ず主治医・担当セラピストの指示に従ってください。</strong><br /><br />
                            持病や痛み、手術直後など、運動に制限が必要なケースもあります。<br />
                            安全のため、自己判断で新しい運動を始めることはお控えください。
                        </>
                    )
                },
                {
                    question: "個別のリハビリ相談や医学的なアドバイスはしてもらえますか？",
                    answer: (
                        <>
                            申し訳ありませんが、個別の診断・治療・リハビリ計画の立案など、医療行為に該当するご相談にはお答えできません。<br />
                            具体的な症状や不安がある場合は、必ず主治医や担当セラピストにご相談ください。
                        </>
                    )
                }
            ]
    },
    {
        title: "その他",
            items: [
                {
                    question: "掲載してほしい自主トレやイラストをリクエストできますか？",
                    answer: (
                        <>
                            可能な範囲でお受けします。<br />
                            「こんな姿勢バージョンがほしい」「○○疾患向けの自主トレがほしい」などのご要望がありましたら、お問い合わせフォームからお送りください。<br />
                            すべてを採用できるわけではありませんが、今後の制作の参考にさせていただきます。
                        </>
                    )
                },
                {
                    question: "施設オリジナルの資料を作ってほしいのですが、個別依頼はできますか？",
                    answer: (
                        <>
                            現時点では「サイト掲載素材の提供」が中心ですが、個別の制作依頼についてもご相談は可能です。<br />
                            ご予算感・用途・納期などを添えてお問い合わせください。対応可能な場合は、別途お見積もりさせていただきます。
                        </>
                    )
                },
                {
                    question: "問い合わせはどこからできますか？",
                    answer: (
                        <>
                            サイト内の「お問い合わせ」ページ、またはフッターに記載のメールアドレスからご連絡いただけます。<br />
                            「よくある質問を読んだけれど解決しなかった点」や「購入済み商品のトラブル」なども、お気軽にお知らせください。
                        </>
                    )
                }
            ]
    }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-16">
                <div className="mx-auto max-w-3xl">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Q & A</span>
                        <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">よくあるご質問</h1>
                        <div className="mt-4 h-1 w-20 bg-blue-200 mx-auto rounded-full"></div>
                    </div>

                    <div className="space-y-12">
                        {faqCategories.map((category, catIndex) => (
                            <div key={catIndex}>
                                <h2 className="text-xl font-bold text-gray-900 mb-6 border-l-4 border-blue-600 pl-4">
                                    {category.title}
                                </h2>
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10">
                                    {category.items.map((faq, index) => (
                                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
