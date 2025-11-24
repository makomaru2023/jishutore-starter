'use client';

import { useState } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface FAQItemProps {
    question: string;
    answer: React.ReactNode;
}

function FAQItem({ question, answer }: FAQItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between py-6 text-left focus:outline-none"
            >
                <div className="flex items-center gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
                        Q
                    </span>
                    <span className="text-lg font-medium text-gray-900">{question}</span>
                </div>
                <svg
                    className={`h-6 w-6 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="pb-6 pl-12 pr-4 text-gray-600">
                    {answer}
                </div>
            </div>
        </div>
    );
}

export default function FAQPage() {
    const faqCategories = [
        {
            title: "サービス全般",
            items: [
                {
                    question: "自主トレ素材庫.jp ってどんなサービスですか？",
                    answer: (
                        <>
                            自主トレ素材庫.jpは、リハビリ専門職が監修した「自主トレ説明用イラスト・資料」をダウンロード形式で提供するサイトです。<br />
                            病院・施設のリハビリスタッフや、在宅・通所サービスの職員、ご家族などが、利用者さんの自主トレ指導や説明資料づくりにご活用いただけます。
                        </>
                    )
                },
                {
                    question: "誰でも利用できますか？リハビリ専門職でなくても大丈夫ですか？",
                    answer: (
                        <>
                            はい、ご利用いただけます。<br />
                            リハビリ専門職（PT・OT・ST・トレーナーなど）はもちろん、介護職、ご家族、ご本人さまによるご利用も想定しています。<br />
                            ただし、実際の運動内容については、必ず主治医や担当セラピストの指示・許可に従ってください。
                        </>
                    )
                },
                {
                    question: "会員登録は必要ですか？",
                    answer: (
                        <>
                            現在は、素材のダウンロードに会員登録は不要です（※仕様変更の際はサイト上でお知らせします）。<br />
                            有料素材の購入時には、決済の都合上、お名前・メールアドレスなどの入力をお願いしています。
                        </>
                    )
                }
            ]
        },
        {
            title: "ライセンス・利用範囲について",
            items: [
                {
                    question: "無料素材と有料素材の違いは何ですか？",
                    answer: (
                        <>
                            主な違いは以下のとおりです。<br /><br />
                            <strong>無料素材</strong><br />
                            - クリエイティブ・コモンズ・ライセンス「CC BY 4.0」で提供<br />
                            - クレジット表記（出典元の明記）が必要<br /><br />
                            <strong>有料素材</strong><br />
                            - 自主トレ素材庫.jp 独自の商用利用ライセンス<br />
                            - クレジット表記は不要<br />
                            - 院内資料・配布用プリント・Web教材など、幅広い商用利用が可能<br />
                            （ただし、素材そのものの再配布・再販売は禁止）<br /><br />
                            詳しくは<a href="/license" className="text-blue-600 hover:underline">「ライセンス」ページ</a>をご確認ください。
                        </>
                    )
                },
                {
                    question: "商用利用はできますか？",
                    answer: (
                        <>
                            はい、<strong>有料素材は商用利用可能</strong>です。<br />
                            たとえば、以下のような用途でご利用いただけます。<br />
                            - 病院・施設で配布する自主トレプリント<br />
                            - 通所・訪問リハでの個別指導資料<br />
                            - 研修会・講習会のスライド資料<br />
                            - Webサイトやブログ、SNS投稿の画像 など<br /><br />
                            ただし、「素材データそのものを商品として販売する」ことはできません。<br />
                            （例：イラストだけを集めたデータ集として再販売する、他の素材サイトで転売する 等）
                        </>
                    )
                },
                {
                    question: "無料素材を使うときのクレジット表記はどう書けばいいですか？",
                    answer: (
                        <>
                            以下のような表記をお願いしています。<br /><br />
                            <div className="bg-gray-50 p-3 rounded text-sm">
                                出典：自主トレ素材庫.jp<br />
                                または<br />
                                出典：自主トレ素材庫.jp（https://self-training.pro-kinkin-sss.com）
                            </div><br />
                            スペースに余裕がない場合は、サイト名のみの記載でも構いません。
                        </>
                    )
                },
                {
                    question: "素材を加工・編集して使ってもいいですか？",
                    answer: (
                        <>
                            はい、以下の範囲で加工・編集していただけます。<br />
                            - サイズ変更・トリミング<br />
                            - 色味の調整、配置の変更<br />
                            - テキストの追加（回数や注意事項など）<br /><br />
                            ただし、<strong>加工の有無に関わらず</strong>、<br />
                            - 素材そのものを再配布・再販売する行為<br />
                            - 素材をほぼそのまま転載した形での販売<br />
                            はご遠慮ください。
                        </>
                    )
                },
                {
                    question: "自分の施設のスタッフ内で共有してもいいですか？",
                    answer: (
                        <>
                            はい、<strong>同一の医療機関・事業所内であれば共有利用していただいて構いません。</strong><br />
                            たとえば、同じ病院内のリハビリテーション科スタッフや、同じ事業所の介護職員との共有は問題ありません。<br /><br />
                            一方で、<strong>別法人・別事業所のスタッフにデータを配布することはお控えください。</strong><br />
                            その場合は、各事業所でのご購入をご検討ください。
                        </>
                    )
                },
                {
                    question: "患者さん本人やご家族に、データをそのまま渡してもいいですか？",
                    answer: (
                        <>
                            個別対応として、<strong>担当している利用者さんとそのご家族に限定して配布する場合</strong>は問題ありません。<br />
                            ただし、「誰でもダウンロードできる形でインターネット上に再公開する」といった行為はご遠慮ください。
                        </>
                    )
                },
                {
                    question: "YouTubeやオンライン講座のスライドに使っても大丈夫ですか？",
                    answer: (
                        <>
                            はい、ご利用いただけます。<br />
                            有料素材であればクレジット表記は任意、無料素材の場合はクレジット表記をお願いいたします。<br />
                            ただし、スライドデータそのものを「イラスト素材集」として再配布・転売することはお控えください。
                        </>
                    )
                }
            ]
        },
        {
            title: "購入・お支払いについて",
            items: [
                {
                    question: "どのような支払い方法が使えますか？",
                    answer: (
                        <>
                            現在は、クレジットカード決済（Stripe）に対応しています。<br />
                            利用可能なブランドは、主要な国際ブランド（Visa / MasterCard / JCB 等）です。<br />
                            ※今後、支払い方法を追加・変更する場合は、サイト上でお知らせします。
                        </>
                    )
                },
                {
                    question: "領収書や明細は発行されますか？",
                    answer: (
                        <>
                            決済完了後、Stripeより送信されるメール、またはご利用のカード会社のご利用明細が領収書としてご利用いただけます。<br />
                            別形式の領収書をご希望の場合は、お問い合わせフォームまたはメールにてご相談ください。
                        </>
                    )
                },
                {
                    question: "返品・返金はできますか？",
                    answer: (
                        <>
                            デジタルコンテンツという商品の性質上、<strong>購入後の返品・返金は原則としてお受けしておりません。</strong><br />
                            ただし、<br />
                            - 決済の二重請求が発生した<br />
                            - ダウンロードデータに破損があった<br />
                            - その他、当サイト側の不備が明らかな場合<br /><br />
                            などには、個別に対応させていただきます。<br />
                            お手数ですが、購入時の情報を添えてお問い合わせください。
                        </>
                    )
                }
            ]
        },
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
