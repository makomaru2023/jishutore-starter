import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LegalDates } from "@/components/legal/LegalDocument";

const CONTACT_EMAIL = "smart.rehabili@gmail.com";

export const metadata: Metadata = {
    title: "プライバシーポリシー｜自主トレ素材庫",
    description:
        "自主トレ素材庫における個人情報の取扱いについて定めたプライバシーポリシーです。取得する情報と利用目的、Google Analytics 4によるアクセス解析とCookie、Stripeによる決済、Plus会員のログイン、お問い合わせ、求人掲載・スポンサー掲載でお預かりする情報、外部サービスへの委託、開示・訂正・利用停止等のご請求方法を記載しています。",
    alternates: { canonical: "https://jishutore-sozaiko.online/privacy/" },
};

/**
 * プライバシーポリシー。
 * ================================================================
 * ★ここに書いてよいのは「リポジトリから実在を確認できるサービス」だけ。
 *   2026-09-02 時点で確認したもの：
 *     - Stripe（決済／サブスクリプション）        src/lib/stripe.ts・api/checkout・api/webhook
 *     - Google Analytics 4（G-TDY9RZPYWX）        src/app/layout.tsx・src/lib/analytics.ts
 *     - Resend（メール送信）                      src/lib/email.ts（RESEND_API_KEY）
 *     - Cloudflare R2（素材ファイルの保管・配信） src/lib/r2.ts（S3互換API）
 *     - Vercel（ホスティング）                    VERCEL_ENV / .vercel/
 *     - Googleフォーム（利用者アンケート）        src/constants/survey.ts
 *     - LINE公式アカウント（外部リンク）          lin.ee/79a5bNt
 *   使っていないサービスを「一般的に書かれているから」という理由で足さないこと。
 *   逆に、新しい外部サービスを導入したらこのページも直すこと。
 *
 * ★運営者の氏名・住所・電話番号は書かない（副業のため対外的には屋号で運営）。
 *   開示が必要な場合は、請求に応じて法令に従い対応する形にしてある。
 *   特定商取引法に基づく事業者情報の開示請求は /tokushoho/ に導線がある。
 *
 * ★海外移転について「海外サーバー＝外国にある第三者への提供」と断定しない。
 *   委託にあたるのか第三者提供にあたるのかは、各社との契約形態による。
 *   確認できていないことは、確認できている範囲の書き方にとどめる。
 */
export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-12">
                <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-sm sm:p-8">
                    <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">プライバシーポリシー</h1>

                    <div className="max-w-none text-gray-700">
                        <p className="leading-7">
                            自主トレ素材庫（以下「当サイト」）は、リハビリテーション・介護に携わる方に向けて、自主トレ素材の配布、有料コンテンツの販売、診療・介護報酬に関する情報の提供、求人情報の掲載、広告掲載を行っています。当サイトは、これらのサービスの提供にあたって取得する個人情報を適切に取り扱うため、以下のとおりプライバシーポリシー（以下「本ポリシー」）を定めます。
                        </p>

                        <h2 className="mb-3 mt-8 text-xl font-bold text-gray-900">1. 取得する情報</h2>
                        <p className="leading-7">当サイトは、ご利用の場面に応じて、次の情報を取得する場合があります。</p>

                        <h3 className="mb-2 mt-5 font-bold text-gray-900">(1) お問い合わせ</h3>
                        <ul className="mb-4 list-disc space-y-1.5 pl-6 leading-7">
                            <li>お名前、メールアドレス、お問い合わせの内容</li>
                            <li>施設・法人としてご相談いただく場合は、施設名・法人名、ご担当者名、職種、電話番号</li>
                        </ul>
                        <p className="leading-7">
                            お問い合わせはメールでお受けしています。当サイトにお問い合わせフォームを設置した場合も、取得する項目は上記の範囲にとどめます。
                        </p>

                        <h3 className="mb-2 mt-5 font-bold text-gray-900">(2) 有料コンテンツのご購入・自主トレ素材庫Plus</h3>
                        <ul className="mb-4 list-disc space-y-1.5 pl-6 leading-7">
                            <li>メールアドレス、購入いただいた商品、購入日時、決済状況、サブスクリプションの契約状況</li>
                            <li>ログイン状態を保持するための Cookie（当サイトが発行するもの）</li>
                        </ul>
                        <p className="leading-7">
                            クレジットカード番号・有効期限・セキュリティコードは、決済代行サービスである Stripe, Inc. が取得・保持します。当サイトの運営者がこれらの情報にアクセスすることはできません。
                        </p>

                        <h3 className="mb-2 mt-5 font-bold text-gray-900">(3) アクセス解析</h3>
                        <ul className="mb-4 list-disc space-y-1.5 pl-6 leading-7">
                            <li>閲覧したページ、閲覧日時、滞在時間、参照元、クリックした導線の種別</li>
                            <li>ブラウザの種類、OS、画面サイズ、おおよその地域、IPアドレス</li>
                            <li>Google Analytics 4 が発行する Cookie に含まれる識別子</li>
                        </ul>

                        <h3 className="mb-2 mt-5 font-bold text-gray-900">(4) 求人掲載</h3>
                        <ul className="mb-4 list-disc space-y-1.5 pl-6 leading-7">
                            <li>掲載を申し込まれた施設・法人の名称、ご担当者のお名前、メールアドレス、電話番号</li>
                            <li>掲載する求人情報の内容（掲載を前提としてご提供いただくもの）</li>
                        </ul>
                        <p className="leading-7">
                            当サイトは求人情報の掲載のみを行い、応募の受付・仲介・職業紹介は行いません。求職者の応募書類や連絡先を当サイトがお預かりすることはありません。応募は、掲載施設の公式採用窓口へ直接行われます。
                        </p>

                        <h3 className="mb-2 mt-5 font-bold text-gray-900">(5) スポンサー・広告掲載</h3>
                        <ul className="mb-4 list-disc space-y-1.5 pl-6 leading-7">
                            <li>広告主の事業者名、ご担当者のお名前、メールアドレス、電話番号</li>
                            <li>掲載する広告素材、リンク先URL</li>
                            <li>広告枠・求人枠の表示回数、クリック数（Google Analytics 4 で計測する統計情報）</li>
                        </ul>
                        <p className="leading-7">
                            広告および求人の表示回数・クリック数は、個人を特定しない統計情報として集計し、掲載主へのご報告に使用します。個々の閲覧者を識別できる形で広告主へ提供することはありません。
                        </p>

                        <h3 className="mb-2 mt-5 font-bold text-gray-900">(6) 利用者アンケート</h3>
                        <p className="mb-4 leading-7">
                            利用者アンケートは Google フォームで実施しています。回答は匿名で、氏名・メールアドレスの入力を必須としていません。回答内容は Google LLC のサーバーに保存されます。
                        </p>

                        <h3 className="mb-2 mt-5 font-bold text-gray-900">(7) LINE公式アカウント</h3>
                        <p className="mb-4 leading-7">
                            当サイトから LINE 公式アカウントへのリンクを設置しています。友だち追加後の情報の取扱いは、LINEヤフー株式会社および当サイトが LINE 公式アカウント上で取得する情報の範囲によります。当サイトは、LINE 上でお受けしたお問い合わせへの対応と、素材・お知らせの配信のために情報を利用します。当サイトのウェブサイト上の行動と LINE 上の情報を、個人単位で結びつけることはしていません。
                        </p>

                        <h2 className="mb-3 mt-8 text-xl font-bold text-gray-900">2. 利用目的</h2>
                        <p className="leading-7">取得した情報は、次の目的の範囲内で利用します。</p>
                        <ul className="mb-4 list-disc space-y-1.5 pl-6 leading-7">
                            <li>素材・コンテンツの提供、ダウンロードの提供、会員向け機能の提供</li>
                            <li>有料コンテンツの販売、決済、契約状況の管理、購入者へのご連絡</li>
                            <li>お問い合わせ、ご相談、不具合のご連絡への対応</li>
                            <li>求人掲載・広告掲載の申込受付、掲載内容の確認、請求、掲載後のご報告</li>
                            <li>サイトの利用状況の把握とコンテンツの改善のためのアクセス解析</li>
                            <li>不正利用の防止およびセキュリティの確保</li>
                            <li>法令の遵守、および紛争が生じた場合の対応</li>
                        </ul>
                        <p className="leading-7">
                            上記の目的を超えて利用する必要が生じた場合は、あらかじめご本人の同意を得るか、本ポリシーを改定してお知らせします。
                        </p>

                        <h2 className="mb-3 mt-8 text-xl font-bold text-gray-900">3. アクセス解析とCookie</h2>
                        <p className="leading-7">
                            当サイトは、サイトの利用状況を把握するために Google LLC が提供する Google Analytics 4（測定ID：G-TDY9RZPYWX）を使用しています。Google Analytics 4 は Cookie を使用して、閲覧されたページや導線のクリックなどの情報を収集します。収集される情報に、お名前・メールアドレスなど個人を直接特定する情報は含まれません。
                        </p>
                        <p className="mt-3 leading-7">
                            当サイトが使用する Cookie は、次のとおりです。
                        </p>
                        <ul className="mb-4 mt-3 list-disc space-y-1.5 pl-6 leading-7">
                            <li>アクセス解析のための Cookie（Google Analytics 4 が発行）</li>
                            <li>会員機能のログイン状態を保持するための Cookie（当サイトが発行）</li>
                            <li>ご案内の表示を繰り返さないための記録（ブラウザのローカルストレージ。サーバーへは送信されません）</li>
                        </ul>
                        <p className="leading-7">
                            Cookie の受け取りは、ブラウザの設定により拒否できます。その場合、会員機能のログインなど一部の機能が正しく動作しないことがあります。Google Analytics による計測の停止をご希望の場合は、Google が提供するオプトアウトアドオンをご利用いただけます。
                        </p>
                        <p className="mt-3 leading-7">
                            Google Analytics の利用規約およびGoogleのプライバシーポリシーについては、Google のサイトをご確認ください。
                        </p>

                        <h2 className="mb-3 mt-8 text-xl font-bold text-gray-900">4. 決済処理</h2>
                        <p className="leading-7">
                            有料コンテンツおよび自主トレ素材庫Plusの決済は、Stripe, Inc. が提供する決済サービスを通じて行われます。クレジットカード情報の入力は Stripe の画面で行われ、カード番号等は Stripe が取得・保持します。当サイトが受け取るのは、決済が完了したかどうか、購入された商品、メールアドレス、契約状況といった、提供と請求に必要な範囲の情報です。
                        </p>

                        <h2 className="mb-3 mt-8 text-xl font-bold text-gray-900">5. 外部サービスへの委託</h2>
                        <p className="leading-7">
                            当サイトは、サービスの提供のために、次の事業者のサービスを利用しています。利用にあたっては、必要な範囲で情報の取扱いを委託し、または各社が定める条件に従って情報が処理されます。
                        </p>
                        <div className="my-4 overflow-x-auto">
                            <table className="w-full min-w-[520px] border-collapse text-sm">
                                <thead>
                                    <tr className="border-b border-gray-300 text-left">
                                        <th className="py-2 pr-4 font-bold text-gray-900">事業者</th>
                                        <th className="py-2 pr-4 font-bold text-gray-900">用途</th>
                                        <th className="py-2 font-bold text-gray-900">扱われる情報</th>
                                    </tr>
                                </thead>
                                <tbody className="align-top">
                                    <tr className="border-b border-gray-100">
                                        <td className="py-2.5 pr-4">Stripe, Inc.</td>
                                        <td className="py-2.5 pr-4">決済・サブスクリプション管理</td>
                                        <td className="py-2.5">メールアドレス、決済情報</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-2.5 pr-4">Google LLC</td>
                                        <td className="py-2.5 pr-4">アクセス解析、アンケートフォーム</td>
                                        <td className="py-2.5">利用状況情報、Cookie情報、アンケート回答</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-2.5 pr-4">Vercel Inc.</td>
                                        <td className="py-2.5 pr-4">ウェブサイトのホスティング</td>
                                        <td className="py-2.5">アクセスログ、通信内容</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-2.5 pr-4">Cloudflare, Inc.</td>
                                        <td className="py-2.5 pr-4">素材ファイルの保管・配信</td>
                                        <td className="py-2.5">アクセスログ</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-2.5 pr-4">Resend, Inc.</td>
                                        <td className="py-2.5 pr-4">会員向けメールの送信</td>
                                        <td className="py-2.5">メールアドレス、メール本文</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2.5 pr-4">LINEヤフー株式会社</td>
                                        <td className="py-2.5 pr-4">LINE公式アカウントの運用</td>
                                        <td className="py-2.5">LINE上でやり取りした内容</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="leading-7">
                            当サイトは、委託先に対し、委託した業務の遂行に必要な範囲を超えて情報を利用させないよう努めます。
                        </p>

                        <h2 className="mb-3 mt-8 text-xl font-bold text-gray-900">6. 第三者提供</h2>
                        <p className="leading-7">
                            当サイトは、次の場合を除き、ご本人の同意なく個人情報を第三者に提供しません。
                        </p>
                        <ul className="mb-4 list-disc space-y-1.5 pl-6 leading-7">
                            <li>法令に基づく場合</li>
                            <li>人の生命、身体または財産の保護のために必要で、ご本人の同意を得ることが困難な場合</li>
                            <li>第5条のとおり、利用目的の達成に必要な範囲で取扱いを委託する場合</li>
                        </ul>
                        <p className="leading-7">
                            求人掲載・広告掲載に関して掲載主へお伝えするのは、表示回数・クリック数などの統計情報です。個々の閲覧者を識別できる情報を掲載主へ提供することはありません。
                        </p>

                        <h2 className="mb-3 mt-8 text-xl font-bold text-gray-900">7. 外国にある事業者への情報の移転</h2>
                        <p className="leading-7">
                            第5条に挙げた事業者のうち、日本国外に本拠を置く事業者のサーバーで情報が処理される場合があります。この場合、当サイトは、当該事業者が公表する個人情報の取扱いに関する方針および当サイトとの間の条件に従って情報が取り扱われるものとして、必要な範囲での取扱いを委託しています。
                        </p>
                        <p className="mt-3 leading-7">
                            各事業者の所在国、および当該国の個人情報保護制度に関する情報については、当サイトが把握している範囲でお答えします。第10条の窓口までお問い合わせください。
                        </p>

                        <h2 className="mb-3 mt-8 text-xl font-bold text-gray-900">8. 安全管理措置</h2>
                        <p className="leading-7">
                            当サイトは、取得した情報を、利用目的の達成に必要な範囲で適切に管理し、不正アクセス・紛失・改ざん・漏えいの防止に努めます。具体的には、次の措置を講じています。
                        </p>
                        <ul className="mb-4 list-disc space-y-1.5 pl-6 leading-7">
                            <li>通信の暗号化（HTTPS）</li>
                            <li>決済情報を当サイト側で保持しない設計（Stripeへの委託）</li>
                            <li>認証情報・APIキーを環境変数で管理し、公開リポジトリに含めないこと</li>
                            <li>会員向けファイルへのアクセスを、ログイン状態の確認を経た経路に限定すること</li>
                        </ul>
                        <p className="leading-7">
                            利用目的を達成し保有する必要がなくなった情報は、合理的な期間内に削除または匿名化します。
                        </p>

                        <h2 className="mb-3 mt-8 text-xl font-bold text-gray-900">9. 開示・訂正・利用停止等のご請求</h2>
                        <p className="leading-7">
                            ご本人またはその代理人から、当サイトが保有する保有個人データについて、利用目的の通知、開示、内容の訂正・追加・削除、利用の停止・消去、第三者提供の停止のお申し出があった場合は、法令に従い、ご本人であることを確認したうえで対応します。
                        </p>
                        <p className="mt-3 leading-7">
                            ご請求は、第10条の窓口へメールでお送りください。その際、対象となる情報（お問い合わせ日時、ご購入時のメールアドレスなど）をお知らせいただくと、確認がすみやかに進みます。当サイトは、ご請求の内容を確認のうえ、法令に従い対応します。
                        </p>

                        <h2 className="mb-3 mt-8 text-xl font-bold text-gray-900">10. お問い合わせ窓口</h2>
                        <p className="leading-7">
                            本ポリシーおよび個人情報の取扱いに関するお問い合わせ窓口は、次のとおりです。
                        </p>
                        <div className="my-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
                            <dl className="space-y-2 text-sm leading-7">
                                <div className="sm:flex sm:gap-4">
                                    <dt className="font-bold text-gray-900 sm:w-32 sm:shrink-0">運営</dt>
                                    <dd>SmartReha（スマートリハ）</dd>
                                </div>
                                <div className="sm:flex sm:gap-4">
                                    <dt className="font-bold text-gray-900 sm:w-32 sm:shrink-0">連絡先</dt>
                                    <dd>
                                        <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-blue-700 hover:underline">
                                            {CONTACT_EMAIL}
                                        </a>
                                    </dd>
                                </div>
                                <div className="sm:flex sm:gap-4">
                                    <dt className="font-bold text-gray-900 sm:w-32 sm:shrink-0">事業者情報</dt>
                                    <dd>
                                        当サイトは個人により運営しています。事業者の氏名・住所・電話番号については、法令に基づく請求その他所定の方法によるお申し出があった場合、法令に従い対応します。特定商取引法に基づく事業者情報の開示については
                                        <Link href="/tokushoho/" className="mx-0.5 font-bold text-blue-700 hover:underline">
                                            特定商取引法に基づく表記
                                        </Link>
                                        のページをご覧ください。
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <h2 className="mb-3 mt-8 text-xl font-bold text-gray-900">11. 外部サイトへのリンク</h2>
                        <p className="leading-7">
                            当サイトには、他の事業者が運営するウェブサイトへのリンク（求人掲載施設の公式採用ページ、広告主のサイト、根拠資料へのリンクなどを含みます）が含まれます。リンク先における個人情報の取扱いは、各サイトの運営者が定めるプライバシーポリシーによります。当サイトは、リンク先の個人情報の取扱いについて管理する立場にありません。リンク先をご利用の際は、各サイトのプライバシーポリシーをご確認ください。
                        </p>

                        <h2 className="mb-3 mt-8 text-xl font-bold text-gray-900">12. 本ポリシーの変更</h2>
                        <p className="leading-7">
                            当サイトは、法令の改正、取り扱う情報の変更、利用する外部サービスの変更に伴い、本ポリシーを変更することがあります。変更した場合は、変更後の内容を本ページに掲載します。取得する情報や利用目的に関わる重要な変更を行う場合は、変更後の内容と適用開始日を、適用開始日までに本ページその他の適切な方法によりお知らせします。
                        </p>

                        <LegalDates document="privacy" />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
