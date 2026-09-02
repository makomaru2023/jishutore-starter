import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TrackedB2bContactLink } from "@/components/TrackedB2bContactLink";
import { LegalDates } from "@/components/legal/LegalDocument";
import { TERMS_CHANGE_CLAUSE } from "@/constants/legal";

export const metadata: Metadata = {
    title: "利用規約・ライセンス｜自主トレ素材庫",
    description:
        "自主トレ素材庫の利用規約とライセンスです。無料素材の利用条件（商用利用可・クレジット表記不要）、禁止事項、有料資料セットと自主トレ素材庫Plusの利用範囲、施設・法人でのご利用、医療情報の取扱いについての注意、サービスごとの責任の範囲を記載しています。",
    alternates: { canonical: "https://jishutore-sozaiko.online/license/" },
};

/**
 * 利用規約・ライセンス。
 * ================================================================
 * ★免責の書き方について（2026-09-02 改定）
 *   改定前は「当サイトは一切の責任を負いません」と書いていた。
 *   無料素材はともかく、有料商品・Plus は消費者向けの有償サービスであり、
 *   消費者契約法第8条は事業者の損害賠償責任を全部免除する条項を無効としている。
 *   全面免責の条項は、書いても効かないうえに、書いてあること自体が
 *   利用者に不利な誤解を与える。
 *   → 「故意または重大な過失による場合を除き、法令上許容される範囲で責任を負う」
 *      という形に統一し、サービスごとに責任の輪郭を書き分けた（セクション5）。
 *
 * ★セクション5をサービス別にしている理由
 *   無料素材／有料商品・Plus／診療・介護報酬チェック／求人／スポンサー／外部リンクは、
 *   当サイトが負っている約束の量がそれぞれ違う。同じ免責文を機械的に並べると、
 *   有償で提供しているものまで無料配布と同じ扱いに見えてしまう。
 */
export default function LicensePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-12">
                <div className="mx-auto max-w-4xl bg-white p-8 rounded-xl shadow-sm">
                    <h1 className="mb-8 text-3xl font-bold text-gray-900 text-center">利用規約・ライセンス</h1>

                    <div className="space-y-12 text-gray-700">
                        {/* 1. 共通事項 */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">1. 共通事項（全素材共通）</h2>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="font-bold text-lg mb-3">禁止事項</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>素材データそのものを再配布・転売すること（加工の有無を問わず）</li>
                                    <li>素材をメインとした商品（LINEスタンプ、グッズ等）を販売すること</li>
                                    <li>公序良俗に反する目的、反社会的勢力に関わる利用</li>
                                    <li>その他、当サイトが不適切と判断する利用</li>
                                </ul>
                                <h3 className="font-bold text-lg mt-6 mb-3">運動指導にあたっての注意</h3>
                                <p className="leading-7">
                                    当サイトの素材は、リハビリテーション専門職・介護職の方が、指導や説明の補助として用いることを想定して作成しています。診断や治療そのものではなく、個別の医学的判断に代わるものではありません。
                                </p>
                                <ul className="mt-3 list-disc pl-5 space-y-2">
                                    <li>運動の適応・禁忌は、疾患、術式、経過、合併症、身体機能によって異なります。対象者ごとにご判断ください。</li>
                                    <li>主治医、リハビリテーション専門職その他の担当する専門職の指示がある場合は、その指示を優先してください。</li>
                                    <li>実施中または実施後に、痛み、しびれ、めまい、動悸、息切れ、強い疲労などが現れた場合は、中止して医療機関にご相談ください。</li>
                                    <li>回数・負荷・実施頻度は、対象者の状態に合わせて調整してください。素材に記載した回数はめやすです。</li>
                                </ul>
                            </div>
                        </section>

                        {/* 2. 有料資料セット（資料セット） */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">2. 有料資料セット（資料セット商品）</h2>
                            <div className="space-y-4">
                                <p className="rounded-lg border border-amber-100 bg-amber-50 p-4 text-sm">
                                    資料セット（疾患別・姿勢別）の個別販売は終了し、現在は
                                    <Link href="/products/jishutore-plus" className="text-blue-600 hover:underline mx-0.5">自主トレ素材庫Plus</Link>
                                    に収録されています。Plusの会員ページからダウンロードしたファイルにも、本セクションと同じ利用条件・禁止事項が適用されます。
                                    過去に個別購入いただいた方は、引き続き同条件でご利用いただけます。
                                </p>
                                <p>
                                    <Link href="/products" className="text-blue-600 hover:underline">資料セット</Link>
                                    （疾患別自主トレ資料セット 等）でご購入いただいた PPTX・PDF・素材ファイルは、購入者ご本人による次の用途でのみご利用いただけます。
                                </p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>患者さん・利用者さんへの自主トレ指導／家族説明／退院前指導</li>
                                    <li>所属する医療・介護施設内での資料作成および勉強会資料</li>
                                    <li>編集（文言・写真・配色等の調整）を加えてご利用いただくこと</li>
                                </ul>
                                <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                                    <h3 className="font-bold text-red-900 mb-2">禁止事項（有料資料セット）</h3>
                                    <ul className="list-disc pl-5 space-y-2 text-red-900">
                                        <li>ZIP・PPTX・PDF・素材ファイルそのものの再配布・転売・共有（加工の有無を問わず）</li>
                                        <li>ダウンロード URL の SNS 等での共有・公開</li>
                                        <li>購入者以外への複製・データ受け渡し</li>
                                        <li>素材や資料をそのまま販売・配布する行為</li>
                                    </ul>
                                </div>
                                {/* ★改定前は「過去に個別購入いただいた資料にも、上記の利用範囲・禁止事項が適用されます」と
                                    書いていた。購入時に無かった条件を後から遡って当てはめる読み方ができるため、
                                    購入時点の条件が基準であることを明記する形に直した（2026-09-02）。 */}
                                <p className="text-sm text-gray-600 leading-7">
                                    過去に個別購入いただいた資料については、ご購入時点の利用条件が適用されます。本規約を改定した場合でも、改定後の条件が、ご購入時の条件より購入者に不利な形で遡って適用されることはありません。上記の利用範囲・禁止事項は、購入時からの一貫した内容として掲載しているものです。
                                </p>
                            </div>
                        </section>

                        {/* 3. 利用条件 */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">3. 利用条件（無料素材）</h2>
                            <div className="space-y-4">
                                <p>
                                    当サイトで配布している素材は、<strong>規約の範囲内であれば、個人、法人、商用、非商用問わず無料で</strong>ご利用いただけます。
                                </p>
                                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                                    <h3 className="font-bold text-blue-900 mb-2">クレジット表記について</h3>
                                    <p className="mb-4">
                                        クレジット表記や事前連絡は<strong>不要</strong>です。<br />
                                        （もちろん、記載していただけると運営者が喜びます！）
                                    </p>

                                    <h3 className="font-bold text-blue-900 mb-2 mt-6">利用可能範囲の例</h3>
                                    <ul className="list-disc pl-5 space-y-2 mb-4">
                                        <li>院内・施設内での掲示物、配布資料</li>
                                        <li>患者様・利用者様への個別指導資料</li>
                                        <li>学会発表、論文、勉強会のスライド資料</li>
                                        <li>Webサイト、SNS、ブログ、動画などへの掲載</li>
                                        <li>商用利用（有料セミナーの資料、有料noteの挿絵など）</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* 4. 施設・法人での利用 */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                                4. 施設・法人でのご利用について
                            </h2>
                            <div className="space-y-4">
                                <p>
                                    無料素材は、施設内での掲示・配布を含め、セクション3の利用条件の範囲内であれば、法人・商用でも無料でご利用いただけます。
                                </p>
                                <p>
                                    有料商品（資料セット・自主トレ素材庫Plus）は、現行どおり購入者ご本人によるご利用に限ります。
                                </p>
                                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                                    <p>
                                        施設・チームでの複数名利用や請求書払いによる提供は現在準備中です。
                                        ご希望の場合は、ご要望・ご相談をお聞かせください。
                                    </p>
                                    <TrackedB2bContactLink
                                        href="/contact"
                                        placement="license_page"
                                        className="mt-4 inline-flex font-semibold text-blue-700 hover:text-blue-900 hover:underline"
                                    >
                                        施設・法人利用について相談する &rarr;
                                    </TrackedB2bContactLink>
                                </div>
                            </div>
                        </section>

                        {/* 5. 責任の範囲（サービス別） */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                                5. 責任の範囲
                            </h2>
                            <div className="space-y-6">
                                <p className="leading-7">
                                    当サイトは、当サイトの故意または重大な過失による場合を除き、当サイトの提供するコンテンツ・サービスの利用に関して生じた損害について、法令上許容される範囲で責任を負います。当サイトに責任がある場合であっても、賠償の範囲は、通常生じうる直接的かつ現実の損害に限られ、逸失利益・事業機会の喪失など特別の事情から生じた損害は含まないものとします。ただし、当サイトの故意または重大な過失による場合はこの限りではありません。
                                </p>
                                <p className="leading-7">
                                    利用者が消費者契約法上の消費者にあたる場合、同法その他の強行法規に反する限度では、上記の制限は適用されません。
                                </p>

                                <div className="space-y-5 rounded-lg border border-gray-200 bg-gray-50 p-6">
                                    <div>
                                        <h3 className="font-bold text-gray-900">無料素材</h3>
                                        <p className="mt-2 text-sm leading-7">
                                            無料素材は、現状のまま提供します。当サイトは、素材が特定の目的に適合すること、および誤りがないことを保証するものではありません。素材に誤りを見つけられた場合は、お問い合わせよりご連絡ください。確認のうえ、修正または取り下げを行います。
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">有料商品・自主トレ素材庫Plus</h3>
                                        <p className="mt-2 text-sm leading-7">
                                            当サイトは、ご購入いただいた商品を、商品ページに記載した内容で提供します。ダウンロードできない、ファイルが破損しているなど、提供内容に不備があった場合は、修正版の提供、再ダウンロードのご案内、または返金により対応します。詳しくは
                                            <Link href="/tokushoho/" className="mx-0.5 font-bold text-blue-700 hover:underline">
                                                特定商取引法に基づく表記
                                            </Link>
                                            をご覧ください。サーバー障害等により一時的にご利用いただけない期間が生じた場合は、その状況に応じて対応します。
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">診療・介護報酬チェック</h3>
                                        <p className="mt-2 text-sm leading-7">
                                            診療・介護報酬に関する情報は、厚生労働省等の一次資料をもとに、自己点検の支援を目的として整理したものです。掲載時点および各項目に表示した最終確認日時点の内容であり、制度改正、疑義解釈の発出、告示の訂正等により変更されることがあります。個別の事例における算定の可否、請求の適否、行政機関の判断を保証するものではありません。実際の請求にあたっては、必ず最新の原本をご確認ください。編集方針は
                                            <Link href="/fee-check/editorial-policy/" className="mx-0.5 font-bold text-blue-700 hover:underline">
                                                診療・介護報酬チェックの編集方針・確認方法
                                            </Link>
                                            に掲載しています。
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">求人情報</h3>
                                        <p className="mt-2 text-sm leading-7">
                                            求人情報は、掲載施設・法人から提供された内容をもとに掲載しています。当サイトは求人情報の掲載のみを行い、応募の受付・仲介・職業紹介は行いません。掲載内容の正確性については掲載事業者が責任を負います。当サイトは掲載前に内容の確認を行いますが、求人内容を全面的に保証するものではありません。採用選考および労働条件は、掲載事業者と応募者との間で決定されます。詳しくは
                                            <Link href="/jobs/terms/" className="mx-0.5 font-bold text-blue-700 hover:underline">
                                                求人掲載規約
                                            </Link>
                                            をご覧ください。
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">スポンサー広告</h3>
                                        <p className="mt-2 text-sm leading-7">
                                            対価をいただいて掲載する広告には、「PR」「広告」「スポンサー」など、広告であることが分かる表示を付けています。広告の内容および広告主の商品・サービスについての責任は、広告主が負います。当サイトは掲載基準に基づく審査を行いますが、広告内容の適法性や表示の正確性を保証するものではありません。広告主との取引によって生じた紛争は、広告主と当該相手方との間で解決していただきます。掲載基準は
                                            <Link href="/sponsor/terms/" className="mx-0.5 font-bold text-blue-700 hover:underline">
                                                スポンサー掲載規約・広告掲載基準
                                            </Link>
                                            に掲載しています。
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">外部サイトへのリンク</h3>
                                        <p className="mt-2 text-sm leading-7">
                                            当サイトからリンクしている外部サイトの内容は、各サイトの運営者が管理しています。当サイトは、リンク先の内容について管理する立場になく、その内容についての責任を負いません。リンク先に明らかな問題を確認した場合は、リンクを取り下げます。
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 6. 規約の変更 */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                                6. 本規約の変更
                            </h2>
                            <div className="space-y-3">
                                {TERMS_CHANGE_CLAUSE.map((paragraph) => (
                                    <p key={paragraph} className="leading-7">
                                        {paragraph}
                                    </p>
                                ))}
                                <p className="leading-7">
                                    すでにご購入いただいた商品については、ご購入時点の利用条件が適用されます（セクション2）。
                                </p>
                            </div>
                        </section>

                        <LegalDates document="license" />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
