import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SponsorCtaButton } from "@/components/SponsorCtaButton";
import { FREE_MATERIAL_COUNT_LABEL } from "@/constants/content-counts";
import {
    COLUMN_ARTICLE_COUNT,
    FEE_CHECK_DOMAIN_COUNT,
    FEE_CHECK_ITEM_COUNT,
} from "@/constants/public-counts";
import {
    MEDIA_LAUNCH,
    MEDIA_LEGACY_CHART,
    MONTHLY_USERS,
    formatMeasurementNote,
    formatMonthlyActiveUsers,
} from "@/constants/media-stats";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "広告掲載・スポンサー募集｜月3,000円からリハビリ・介護職に届く｜自主トレ素材庫",
    description:
        "月3,000円から、リハビリ・介護現場のユーザーに広告を掲載できます。自主トレ素材庫は、自主トレ素材・診療／介護報酬チェック・コラムを、リハビリ職や介護職が日常業務の中で使う専門サイトです。研修・教材・採用・福祉用具・介護サービスの掲載に。",
    alternates: { canonical: "/sponsor" },
};

const CONTACT_MAILTO =
    "mailto:smart.rehabili@gmail.com?subject=" +
    encodeURIComponent("自主トレ素材庫 広告掲載について");

const ArrowIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
);

const CheckIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
);

const aboutPoints = [
    `患者さんに渡す自主トレイラスト（${FREE_MATERIAL_COUNT_LABEL}・無料）`,
    `診療報酬・介護報酬の算定要件をまとめた報酬チェック（${FEE_CHECK_DOMAIN_COUNT}分野${FEE_CHECK_ITEM_COUNT}項目・毎月更新）`,
    `加算の実務や自主トレの渡し方を扱うコラム（${COLUMN_ARTICLE_COUNT}本）`,
    "資料づくりのときも、算定を確認したいときも開く。日常業務の中で使われる専門サイトです",
];

/**
 * 現在の媒体状況。
 * ★2026-09-05：数字は @/constants/media-stats（求人LPと共通の定義）だけを見る。
 *   期間の分からない「直近3か月 Google検索クリック235回／表示2,084回」は、
 *   いつの3か月なのかを確認できなかったので、ここから外した。
 *   確かな最新値が出せる指標だけを載せる。
 */
const mediaStatus: { label: string; value: string; note?: string }[] = [
    {
        label: MONTHLY_USERS.metric,
        value: formatMonthlyActiveUsers(),
        note: formatMeasurementNote(),
    },
    { label: "無料自主トレ素材", value: FREE_MATERIAL_COUNT_LABEL },
    {
        label: "診療・介護報酬チェック",
        value: `${FEE_CHECK_DOMAIN_COUNT}分野 ${FEE_CHECK_ITEM_COUNT}項目`,
        note: "月次で改定・出典を点検",
    },
    { label: "コラム", value: `${COLUMN_ARTICLE_COUNT}本` },
    { label: "運営開始", value: MEDIA_LAUNCH },
    { label: "主な読者", value: "理学療法士・作業療法士・言語聴覚士・介護職・医療介護関係者" },
    { label: "主な用途", value: "患者説明・退院前指導・訪問リハ・通所リハ・家族説明・算定要件の確認" },
    { label: "アクセス", value: "国内からのアクセスが中心" },
];

const targetUsers = [
    "理学療法士",
    "作業療法士",
    "言語聴覚士",
    "介護職",
    "訪問リハ・通所リハ関係者",
    "医療介護系の資料作成者",
    "介護予防教室の資料作成者",
    "家族説明資料を作る方",
];

type PlacementCard = {
    title: string;
    description: string;
};

const placements: PlacementCard[] = [
    { title: "トップページ", description: "サイト訪問者が最初に見る導線付近で、サービスや研修を紹介できます。" },
    { title: "無料素材一覧ページ（/items/）", description: "自主トレ素材を探しているリハビリ職・介護職へ、素材検索の流れの中で訴求できます。" },
    { title: "素材一覧内スポンサー枠", description: "無料素材カードの間にスポンサー枠として表示し、自然に広告を見てもらえます。" },
    { title: "素材詳細ページ下部", description: "個別素材を確認したユーザーへ、関連サービスや教材を紹介できます。" },
    { title: "商品ページ周辺", description: "資料作成や自主トレ指導に関心が高いユーザーへ訴求できます。" },
    { title: "サイト内記事・SNS紹介（相談可）", description: "プレミアムスポンサー枠などで、サイト内記事やSNSでの紹介も相談可能です。" },
];

type Plan = {
    name: string;
    price: string;
    role: string;
    placement: string;
    items: string[];
    fit: string;
    href: string;
    highlight?: boolean;
};

const plans: Plan[] = [
    {
        name: "応援スポンサー",
        price: "月額 3,000円",
        role: "まずは小さく掲載したい方向け",
        placement: "スポンサー一覧またはサイト下部",
        items: [
            "サービス名または個人名",
            "短い紹介文（100文字程度）",
            "公式サイトまたはSNSへのリンク",
        ],
        fit: "個人の教材・講座・セミナー紹介、まずは低価格で試したい方",
        href: "/sponsor/detail-sponsor",
    },
    {
        name: "素材ページスポンサー",
        price: "月額 5,000円",
        role: "無料素材を探しているリハ職・介護職に届けたい方向け",
        placement: "/items/ 上部・中盤・素材一覧内・素材詳細ページ下部・関連ページ下部",
        items: [
            "サービス名または会社名",
            "紹介文（150文字程度）",
            "公式サイトへのリンク",
            "バナー画像",
        ],
        fit: "教材・研修・福祉用具・介護用品など、リハビリ・介護職向けサービスの紹介",
        href: "/sponsor/page-sponsor",
        highlight: true,
    },
    {
        name: "プレミアムスポンサー",
        price: "月額 10,000円",
        role: "主要導線でしっかり目立たせたい方向け",
        placement: "トップページ・/items/ 上部・素材一覧内・商品ページ周辺・必要に応じてサイト内記事やSNS紹介も相談可",
        items: [
            "目立つ位置のバナー画像",
            "紹介文（200文字程度）",
            "公式サイトへのリンク",
            "掲載位置の優先相談",
            "サイト内記事・SNS紹介の相談可",
        ],
        fit: "研修・セミナーをしっかり告知、採用・サービス認知をしっかり広げたい方",
        href: "/sponsor/premium-sponsor",
    },
];

const compatibleServices = [
    "リハビリ職向け教材",
    "介護職向け教材",
    "研修・セミナー",
    "医療・介護系求人",
    "福祉用具・自助具",
    "介護用品",
    "訪問看護・訪問リハ関連サービス",
    "個人の教材・講座・セミナー",
    "医療・介護系Webサービス",
];

const placeableItems = [
    "サービス名・事業者名",
    "紹介文",
    "リンクURL",
    "バナー画像",
    "必要に応じた簡易紹介文",
];

/**
 * 掲載をお断りする内容の要点。
 * ★正式な基準は /sponsor/terms/（スポンサー掲載規約・広告掲載基準）にある。
 *   ここはその要約なので、条文を直したらこちらの表現も合わせること。
 */
const restrictedItems = [
    "「絶対に治る」「必ず改善」「100％」など、効果を断定する医療・健康関連の表現",
    "承認を受けていない効能効果の表示、施術前後の写真や体験談による効果の訴求",
    "根拠を示せない「No.1」「満足度○％」などの表示、誇大広告",
    "法令に違反する商品・サービス、許認可のない事業に関する広告",
    "公序良俗に反するもの、差別的な内容",
    "リハビリ・介護領域と大きく関係のないもの",
    "自主トレ素材庫の方向性と合わないと判断したもの",
];

const flowSteps = [
    { title: "お問い合わせ", body: "希望プラン・掲載内容のイメージをメールでご連絡ください。" },
    { title: "掲載希望プランの確認", body: "目的に合わせて適したプランをご提案します。" },
    { title: "掲載内容の確認", body: "紹介文・リンク先・バナー画像などを一緒に整えます。" },
    { title: "お支払い", body: "ご請求・お振込みを確認します。" },
    { title: "掲載開始", body: "掲載開始日・掲載期間・掲載位置を決定し、公開します。" },
];

const faqs = [
    {
        q: "どんなサービスが掲載できますか？",
        a: "リハビリ職・介護職・医療福祉関係者に関連する教材、研修、採用、福祉用具、介護用品、Webサービスなどが掲載できます。内容によっては掲載をお断りする場合があります。",
    },
    {
        q: "掲載位置は選べますか？",
        a: "プランに応じて掲載位置を相談できます。サイト全体の見やすさを保つため、最終的な掲載位置は調整させていただく場合があります。",
    },
    {
        q: "広告効果は保証されますか？",
        a: "広告効果やクリック数、申込み数を保証するものではありません。掲載データは参考値としてご確認ください。",
    },
    {
        q: "個人でも掲載できますか？",
        a: "はい。教材、講座、セミナー、専門職向けサービスなど、読者層と相性がよい内容であれば個人の方もご相談いただけます。",
    },
    {
        q: "画像バナーがなくても掲載できますか？",
        a: "はい。テキスト中心の掲載も可能です。必要に応じて簡単な掲載文の調整も相談できます。",
    },
    {
        q: "医療・健康に関する広告は掲載できますか？",
        a: "掲載できますが、掲載基準があります。「絶対に治る」「必ず改善」「100％」といった効果を断定する表現、承認を受けていない効能効果の表示、施術前後の写真や体験談による効果の訴求は、そのままでは掲載できません。入稿いただいた原稿であっても、基準に照らして修正をお願いしたり、掲載をお断りしたりすることがあります。詳しくはスポンサー掲載規約・広告掲載基準をご確認ください。",
    },
    {
        q: "広告であることは表示されますか？",
        a: "はい。対価をいただいて掲載するものには「PR」「広告」「スポンサー」など、広告だと分かる表示を付けます。記事や素材の本文と見分けがつかない形での掲載はお受けしていません。",
    },
];

export default function SponsorPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />
            <main className="flex-1 [&_p]:break-keep [&_p]:break-words [&_h1]:break-keep [&_h1]:break-words [&_h2]:break-keep [&_h2]:break-words [&_h3]:break-keep [&_h3]:break-words [&_li]:break-keep [&_li]:break-words">
                {/* 1. ファーストビュー */}
                <section className="bg-slate-900 pt-16 pb-24 relative overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
                    </div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="mx-auto max-w-3xl text-center space-y-6">
                            <p className="inline-block px-4 py-1.5 rounded-full bg-slate-800 text-blue-300 font-bold text-sm tracking-widest border border-slate-700">
                                スポンサー募集
                            </p>
                            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight break-keep">
                                月3,000円から、
                                <br />
                                リハビリ・介護現場のユーザーに
                                <br className="sm:hidden" />
                                広告を掲載できます
                            </h1>
                            <p className="text-base sm:text-lg text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed text-left sm:text-center">
                                自主トレ素材庫は、自主トレ素材・診療／介護報酬チェック・コラムを、リハビリ職や介護職が日常業務の中で使う専門サイトです。{FREE_MATERIAL_COUNT_LABEL}の無料素材と{FEE_CHECK_ITEM_COUNT}項目の報酬チェックを掲載しています。研修・教材・福祉用具・介護サービスを、関心の近いユーザーへ届けられます。
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                                <SponsorCtaButton
                                    eventName="sponsor_contact_click"
                                    location="sponsor_hero"
                                    buttonText="広告掲載について相談する"
                                    href={CONTACT_MAILTO}
                                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-500 hover:bg-blue-400 text-white font-black text-base transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                                >
                                    広告掲載について相談する
                                    <ArrowIcon className="w-5 h-5" />
                                </SponsorCtaButton>
                                <SponsorCtaButton
                                    eventName="sponsor_menu_click"
                                    location="sponsor_hero"
                                    buttonText="掲載プランを見る"
                                    anchorHref="#plans"
                                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-base transition-all border border-slate-700 flex items-center justify-center gap-2"
                                >
                                    掲載プランを見る
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </SponsorCtaButton>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-slate-50" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)" }} />
                </section>

                {/* 2. 自主トレ素材庫とは */}
                <section className="py-16 sm:py-20 bg-slate-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                                    自主トレ素材庫とは
                                </h2>
                            </div>
                            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
                                <ul className="space-y-3">
                                    {aboutPoints.map((point) => (
                                        <li key={point} className="flex items-start gap-3 text-slate-700">
                                            <span className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                                <CheckIcon />
                                            </span>
                                            <span className="font-medium leading-relaxed min-w-0 break-keep">
                                                {point}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. 立ち上げ期の推移（過去の参考資料）
                    ★2026-09-05：見出しを「3ヶ月間の運営データ」から変えた。
                      2026年3月〜5月の図で、現在の実績ではない。
                      最新の数字は次の「現在の媒体状況」が担当する。 */}
                <section id="performance" className="py-16 sm:py-20 bg-white scroll-mt-24">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">
                            <div className="text-center mb-8">
                                <p className="mb-2 inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold tracking-widest border border-slate-200">
                                    ARCHIVE
                                </p>
                                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                                    立ち上げ期の推移（{MEDIA_LEGACY_CHART.period}）
                                </h2>
                                <p className="text-sm sm:text-base text-slate-500 font-medium break-keep">
                                    過去の参考資料として残している図です。現在の実績ではありません。
                                </p>
                            </div>

                            <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-8 break-keep max-w-3xl mx-auto">
                                自主トレ素材庫は、リハビリ職・介護職が素材や資料を探すとき、算定要件を確認したいときに開くサイトです。立ち上げからの数か月で、掲載素材数と閲覧数がともに増えました。最新の数字は次の「現在の媒体状況」をご覧ください。
                            </p>

                            <figure className="max-w-full rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                                <figcaption className="border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-center text-xs font-bold text-slate-600 sm:text-sm">
                                    {MEDIA_LEGACY_CHART.period}の推移（過去の参考資料）
                                </figcaption>
                                <div className="p-3 sm:p-5">
                                    <Image
                                        src={MEDIA_LEGACY_CHART.src}
                                        alt={MEDIA_LEGACY_CHART.alt}
                                        width={MEDIA_LEGACY_CHART.width}
                                        height={MEDIA_LEGACY_CHART.height}
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1024px"
                                        className="block w-full h-auto rounded-2xl"
                                    />
                                </div>
                            </figure>

                            <p className="mt-4 text-xs sm:text-sm text-slate-500 text-center leading-relaxed break-keep">
                                ※この図は{MEDIA_LEGACY_CHART.period}時点のものです。<strong className="text-slate-700">現在の掲載素材数は{FREE_MATERIAL_COUNT_LABEL}です</strong>。
                                <br className="hidden sm:block" />
                                数値はGoogle Analytics 4による参考値です。広告効果を保証するものではありません。
                            </p>
                        </div>
                    </div>
                </section>

                {/* 4. 現在の媒体状況 */}
                <section className="py-16 sm:py-20 bg-slate-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                                    現在の媒体状況
                                </h2>
                                <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto break-keep">
                                    自主トレ素材庫は、自主トレ素材・診療／介護報酬チェック・コラムを、リハビリ職や介護職が日常業務の中で使う専門サイトです。
                                </p>
                            </div>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {mediaStatus.map((row) => (
                                    <div
                                        key={row.label}
                                        className="min-w-0 rounded-2xl border border-slate-200 bg-white px-5 py-4 sm:px-6 sm:py-5"
                                    >
                                        <p className="mb-1 text-[11px] font-bold tracking-widest text-blue-600">
                                            {row.label}
                                        </p>
                                        <p className="text-sm font-bold leading-snug text-slate-900 sm:text-base break-keep">
                                            {row.value}
                                        </p>
                                        {row.note && (
                                            <p className="mt-1 text-[11px] font-bold text-slate-400 break-keep">
                                                {row.note}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {/* ★2,926人は「サイト全体の利用者数」。
                                全員がリハビリ職・転職希望者・広告を見た人ではない。ここで必ず断る。 */}
                            <p className="mt-5 text-xs sm:text-sm text-slate-500 leading-relaxed break-keep max-w-3xl mx-auto text-center">
                                ※{MONTHLY_USERS.metric}は{MONTHLY_USERS.caution}
                                <br className="hidden sm:block" />
                                ※読者層の内訳（職種・地域の比率）は、回答数が十分に集まるまで公開していません。
                                <br className="hidden sm:block" />
                                ※数値は{MONTHLY_USERS.source}による参考値です。広告の表示回数・クリック数・広告効果を保証するものではありません。
                            </p>
                        </div>
                    </div>
                </section>

                {/* 5. どんな人に届くのか */}
                <section className="py-16 sm:py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                                    リハビリ・介護現場に近い
                                    <br className="sm:hidden" />
                                    ユーザーへ届けられます
                                </h2>
                            </div>
                            <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-8 break-keep max-w-3xl mx-auto text-left sm:text-center">
                                自主トレ素材庫を訪れる方は、主にリハビリ・介護現場で使える素材や資料を探している方です。一般的な大規模広告とは異なり、リハビリ・介護・医療福祉領域に関心の近いユーザーへ届けやすいのが特徴です。
                            </p>
                            <div className="flex flex-wrap justify-center gap-3">
                                {targetUsers.map((user) => (
                                    <span
                                        key={user}
                                        className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm"
                                    >
                                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500" />
                                        {user}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. 掲載できる場所 + 7. 掲載イメージ */}
                <section id="placements" className="py-16 sm:py-20 bg-slate-50 scroll-mt-24">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                                掲載できる場所・掲載イメージ
                            </h2>
                            <p className="text-sm sm:text-base text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed break-keep">
                                広告主さまの目的に合わせて、複数の掲載場所をご用意しています。サイト内記事やSNSでの紹介（プレミアムスポンサー枠）もご相談可能です。
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                            {placements.map((p, i) => (
                                <div key={p.title} className="min-w-0 bg-white rounded-2xl p-6 border border-blue-100 hover:border-blue-200 hover:shadow-sm transition-all flex flex-col">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-black">
                                            {i + 1}
                                        </span>
                                        <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug min-w-0 break-keep">
                                            {p.title}
                                        </h3>
                                    </div>
                                    <p className="text-sm text-slate-700 leading-relaxed break-keep">
                                        {p.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-8 max-w-3xl mx-auto text-xs sm:text-sm text-slate-500 leading-relaxed break-keep px-5 py-4 rounded-2xl bg-white border border-slate-200">
                            掲載位置は、プラン内容・掲載内容・サイト全体の見やすさに合わせて調整します。同一ページに過度な広告が並ばないよう、掲載数を制限する場合があります。
                            <br />
                            {/* ★売っていない面を、売っている面と同じ場所にはっきり書く。
                                報酬チェック・コラムへの広告枠は用意していない（作っていない機能を約束しない）。 */}
                            現在ご用意しているのは、上の掲載場所です。報酬チェック（/fee-check/）とコラム（/column/）のページには広告枠を設けていません。
                        </p>
                    </div>
                </section>

                {/* 8. スポンサー料金（3プラン） */}
                <section id="plans" className="py-16 sm:py-20 bg-white scroll-mt-24">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                                スポンサー料金
                            </h2>
                            <p className="text-sm sm:text-base text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed break-keep">
                                まずは小さく試しやすい価格帯で、3つのプランをご用意しています。掲載場所や内容は、サイトの状況に応じて個別にご相談となります。
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 max-w-6xl mx-auto">
                            {plans.map((plan) => (
                                <div
                                    key={plan.name}
                                    className={`relative min-w-0 bg-white rounded-2xl border p-6 sm:p-7 flex flex-col ${
                                        plan.highlight ? "border-blue-300 shadow-md" : "border-slate-200"
                                    }`}
                                >
                                    {plan.highlight && (
                                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold tracking-wide">
                                            おすすめ
                                        </span>
                                    )}
                                    <h3 className="text-lg font-black text-slate-900 mb-2 break-keep">
                                        {plan.name}
                                    </h3>
                                    <p className="text-xl sm:text-2xl font-black text-blue-600 mb-3 break-keep">
                                        {plan.price}
                                    </p>
                                    <p className="text-xs font-bold text-slate-600 mb-4 break-keep">
                                        {plan.role}
                                    </p>
                                    <div className="mb-4 px-3 py-2 rounded-lg bg-blue-50/60 border border-blue-100">
                                        <p className="text-[11px] font-bold tracking-wider text-blue-700 mb-0.5">
                                            掲載場所
                                        </p>
                                        <p className="text-xs text-slate-700 leading-snug break-keep">
                                            {plan.placement}
                                        </p>
                                    </div>
                                    <ul className="space-y-2 text-sm text-slate-700 mb-4 flex-1">
                                        {plan.items.map((it) => (
                                            <li key={it} className="flex items-start gap-2">
                                                <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                                    <CheckIcon className="w-2.5 h-2.5" />
                                                </span>
                                                <span className="leading-relaxed min-w-0 break-keep">
                                                    {it}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="pt-3 border-t border-slate-100 mb-4">
                                        <p className="text-[11px] font-bold tracking-wider text-slate-500 mb-1">
                                            向いている人
                                        </p>
                                        <p className="text-xs text-slate-700 leading-relaxed break-keep">
                                            {plan.fit}
                                        </p>
                                    </div>
                                    <Link
                                        href={plan.href}
                                        className="inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-blue-200 bg-white px-4 py-2.5 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                                    >
                                        詳細を見る
                                        <ArrowIcon className="h-3.5 w-3.5" />
                                    </Link>
                                </div>
                            ))}
                        </div>

                        <div className="max-w-4xl mx-auto mt-10 px-5 py-5 sm:px-6 sm:py-6 bg-slate-50 border border-slate-200 rounded-2xl">
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                掲載位置や内容は、サイトの状況に応じて個別にご相談となります。
                                <br />
                                医療・介護・福祉領域と著しく関連性が低い広告、公序良俗に反する内容、誇大表現を含む内容は掲載をお断りする場合があります。
                            </p>
                        </div>

                        {/* ★求人は別商品。料金・掲載期間・内容がスポンサー枠と違うので、
                            同じ料金表の中で混同されないよう、専用LPへ分けて案内する。 */}
                        <div className="max-w-4xl mx-auto mt-6 px-5 py-5 sm:px-6 sm:py-6 bg-white border border-blue-200 rounded-2xl">
                            <h3 className="text-base font-black text-slate-900 mb-2 break-keep">
                                リハビリ職の採用でお探しの方へ
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed break-keep">
                                求人の掲載は、上のスポンサー枠とは別の商品です。掲載期間・料金・掲載内容が異なり、求人専用のページ（求人詳細ページ・求人一覧）に掲載します。
                            </p>
                            <Link
                                href="/jobs/posting/"
                                className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-full border border-blue-200 bg-white px-5 py-2.5 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                            >
                                求人掲載について見る
                                <ArrowIcon className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 9. 相性の良い掲載内容 */}
                <section className="py-16 sm:py-20 bg-slate-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                                    相性の良い掲載内容
                                </h2>
                                <p className="text-sm sm:text-base text-slate-500 font-medium">
                                    リハビリ・介護・医療福祉領域に関わるサービスと相性が良いです。
                                </p>
                            </div>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {compatibleServices.map((s) => (
                                    <div
                                        key={s}
                                        className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 flex items-center gap-2.5"
                                    >
                                        <span className="flex-shrink-0 inline-block w-1.5 h-1.5 rounded-full bg-blue-500" />
                                        {s}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 10. 掲載できる内容 + 11. 掲載できない可能性があるもの */}
                <section className="py-16 sm:py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-8 md:grid-cols-2">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4">
                                    掲載できる内容
                                </h2>
                                <p className="text-sm text-slate-600 leading-relaxed mb-4 break-keep">
                                    スポンサー枠では、以下の内容を掲載できます。
                                </p>
                                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7">
                                    <ul className="space-y-3">
                                        {placeableItems.map((item) => (
                                            <li key={item} className="flex items-center gap-2.5 text-slate-700 font-medium text-sm sm:text-base">
                                                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4">
                                    掲載できない可能性があるもの
                                </h2>
                                <p className="text-sm text-slate-600 leading-relaxed mb-4 break-keep">
                                    自主トレ素材庫は、医療・介護・リハビリ現場で使われることを想定したサイトです。そのため、以下のような内容は掲載をお断りする場合があります。詳しい基準は{" "}
                                    <Link href="/sponsor/terms/" className="font-bold text-blue-600 underline hover:text-blue-500">
                                        スポンサー掲載規約・広告掲載基準
                                    </Link>{" "}
                                    をご覧ください。
                                </p>
                                <div className="bg-white rounded-2xl border border-amber-100 p-6 sm:p-7">
                                    <ul className="space-y-3">
                                        {restrictedItems.map((item) => (
                                            <li key={item} className="flex items-start gap-2.5 text-slate-700 text-sm sm:text-base">
                                                <span className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-amber-500" />
                                                <span className="leading-relaxed break-keep min-w-0">
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 12. 掲載までの流れ */}
                <section className="py-16 sm:py-20 bg-slate-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                                掲載までの流れ
                            </h2>
                        </div>
                        <div className="max-w-3xl mx-auto space-y-4">
                            {flowSteps.map((step, i) => (
                                <div key={step.title} className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 flex gap-4 sm:gap-5">
                                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 text-white font-black text-base sm:text-lg flex items-center justify-center">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-black text-slate-900 mb-1 text-base sm:text-lg">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-slate-600 leading-relaxed break-keep">
                                            {step.body}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 13. FAQ */}
                <section className="py-16 sm:py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                                よくある質問
                            </h2>
                        </div>
                        <div className="max-w-3xl mx-auto space-y-3">
                            {faqs.map((item, i) => (
                                <details key={item.q} className="group bg-white rounded-xl border border-slate-200 overflow-hidden">
                                    <summary className="flex cursor-pointer items-center justify-between p-5 sm:p-6 font-bold text-slate-900 list-none text-sm sm:text-base">
                                        <span className="flex items-start gap-3 min-w-0 flex-1">
                                            <span className="text-blue-600 font-black flex-shrink-0">
                                                Q{i + 1}.
                                            </span>
                                            <span className="leading-snug min-w-0 break-keep">
                                                {item.q}
                                            </span>
                                        </span>
                                        <span className="ml-4 flex-shrink-0 text-slate-400 group-open:rotate-180 transition-transform">
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </summary>
                                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4 break-keep">
                                        {item.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 14. お問い合わせCTA */}
                <section className="py-16 sm:py-20 bg-slate-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-blue-100 shadow-sm p-8 sm:p-10 text-center">
                            <h2 className="text-lg sm:text-2xl font-black text-slate-900 mb-4 leading-snug">
                                スポンサー掲載に
                                <br className="sm:hidden" />
                                興味のある方へ
                            </h2>
                            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-7 break-keep">
                                自主トレ素材庫の活動と相性のよいサービスを、リハビリ職・介護職へ届けてみませんか？掲載場所やプランについて、まずはお気軽にご相談ください。
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                <SponsorCtaButton
                                    eventName="sponsor_contact_click"
                                    location="sponsor_final_cta"
                                    buttonText="広告掲載について相談する"
                                    href={CONTACT_MAILTO}
                                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 sm:px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-black text-sm sm:text-base transition-all shadow-md shadow-blue-600/20 whitespace-nowrap"
                                >
                                    広告掲載について相談する
                                    <ArrowIcon className="w-4 h-4" />
                                </SponsorCtaButton>
                                <Link
                                    href="/contact"
                                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 sm:px-8 py-4 rounded-full border border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:text-blue-600 font-bold text-sm sm:text-base transition-all whitespace-nowrap"
                                >
                                    お問い合わせフォーム
                                </Link>
                            </div>
                            <p className="mt-6 text-xs text-slate-500 leading-relaxed">
                                お申し込みの前に{" "}
                                <Link href="/sponsor/terms/" className="font-bold text-blue-600 underline hover:text-blue-500">
                                    スポンサー掲載規約・広告掲載基準
                                </Link>{" "}
                                をご確認ください。
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
