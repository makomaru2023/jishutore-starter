import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SponsorCtaButton } from "@/components/SponsorCtaButton";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "広告掲載・スポンサー募集｜自主トレ素材庫",
    description:
        "自主トレ素材庫では、リハビリ・介護・医療・福祉領域の事業者様向けに広告掲載・スポンサー掲載を募集しています。研修、採用、教材、福祉用具、介護予防サービスなどの告知にご活用ください。",
    alternates: {
        canonical: "/sponsor",
    },
};

const CONTACT_MAILTO =
    "mailto:smart.rehabili@gmail.com?subject=" +
    encodeURIComponent("自主トレ素材庫 広告掲載について");

const ArrowIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className={className}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
        />
    </svg>
);

const features = [
    "リハビリ・介護現場で使える自主トレイラスト素材を配布",
    "患者説明、配布資料、施設内資料、介護予防教室などで使いやすい内容",
    "理学療法士・作業療法士・言語聴覚士・介護職などに届く可能性がある",
    "無料素材を入口に、LINE登録や資料販売にも展開中",
    "今後、素材数・資料コンテンツ・検索流入を増やしていく予定",
];

const adFits = [
    {
        title: "リハビリ職向け研修・セミナー",
        body: "臨床、評価、介護予防、訪問リハ、認知症ケアなどの研修告知に。",
    },
    {
        title: "医療・介護・福祉領域の採用広報",
        body: "訪問看護、訪問リハ、デイケア、老健、病院、介護施設などの求人告知に。",
    },
    {
        title: "福祉用具・介護用品・自助具",
        body: "利用者支援や在宅生活に関わる商品・サービスの紹介に。",
    },
    {
        title: "PT・OT・ST向け教材・書籍・サービス",
        body: "専門職向けの学習教材、書籍、オンラインサービスの認知拡大に。",
    },
    {
        title: "自費リハビリ・介護予防サービス",
        body: "地域のリハビリ関連サービスや予防事業の紹介に。",
    },
];

type Plan = {
    name: string;
    price: string;
    items: string[];
    target: string;
    highlight?: boolean;
};

const plans: Plan[] = [
    {
        name: "応援スポンサー",
        price: "月額 3,000円",
        items: [
            "スポンサー一覧ページに掲載",
            "サービス名・会社名掲載",
            "100文字程度の紹介文掲載",
            "公式サイトへのリンク掲載",
        ],
        target: "まずは小さく応援掲載を試したい事業者様",
    },
    {
        name: "ページスポンサー",
        price: "月額 5,000円",
        items: [
            "指定したページ下部に掲載",
            "サービス名・会社名掲載",
            "150文字程度の紹介文掲載",
            "公式サイトへのリンク掲載",
            "バナー画像掲載可能",
        ],
        target: "特定ページの読者に継続的に認知を取りたい事業者様",
    },
    {
        name: "カテゴリスポンサー",
        price: "月額 8,000円",
        items: [
            "指定カテゴリページ下部に掲載",
            "カテゴリ閲覧ユーザーに集中的に表示",
            "サービス名・会社名掲載",
            "150文字程度の紹介文掲載",
            "公式サイトへのリンク掲載",
            "バナー画像掲載可能",
        ],
        target: "リハビリ職・介護職の特定領域に絞って届けたい事業者様",
        highlight: true,
    },
    {
        name: "プレミアムスポンサー",
        price: "月額 10,000円",
        items: [
            "トップページまたは主要導線付近に掲載",
            "/items または /premium 下部に掲載",
            "200文字程度の紹介文掲載",
            "バナー画像掲載可能",
            "noteまたはSNSでの紹介を相談可能",
        ],
        target: "研修告知、採用広報、サービス認知をしっかり行いたい事業者様",
    },
];

const placementSpots = [
    "トップページ下部",
    "/items ページ（素材一覧）下部",
    "素材詳細ページ下部",
    "カテゴリページ下部",
    "note記事内",
];

const placeableItems = [
    "サービス名",
    "会社名・団体名",
    "公式サイトURL",
    "紹介文",
    "バナー画像",
    "採用ページURL",
    "セミナー告知ページURL",
    "キャンペーンページURL",
];

const flowSteps = [
    {
        title: "お問い合わせ",
        body: "広告掲載を希望する内容をメールでご連絡ください。",
    },
    {
        title: "内容確認",
        body: "掲載内容が自主トレ素材庫の読者層と合うか確認します。",
    },
    {
        title: "掲載内容の調整",
        body: "紹介文、リンク先、バナー画像などを確認します。",
    },
    {
        title: "掲載開始",
        body: "掲載開始日、掲載期間、掲載位置を決定して公開します。",
    },
    {
        title: "継続・終了の確認",
        body: "掲載期間終了前に継続可否をご確認します。",
    },
];

const faqs = [
    {
        q: "個人事業でも掲載できますか？",
        a: "リハビリ・介護・医療・福祉領域に関連する内容であれば、個人事業主様でもご相談可能です。",
    },
    {
        q: "求人広告は掲載できますか？",
        a: "訪問看護、訪問リハ、介護施設、医療機関など、リハビリ職・介護職向けの採用広報は相性がよいと考えています。",
    },
    {
        q: "バナー画像がなくても掲載できますか？",
        a: "テキストのみの掲載も可能です。必要に応じて、簡単な掲載文の調整も相談できます。",
    },
    {
        q: "掲載できない内容はありますか？",
        a: "医療・介護・福祉領域と関連性が低いもの、誇大表現を含むもの、利用者に不利益を与える可能性があるものは掲載をお断りする場合があります。",
    },
    {
        q: "まずは相談だけでも可能ですか？",
        a: "可能です。掲載内容や料金について、まずはお気軽にご相談ください。",
    },
];

export default function SponsorPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero */}
                <section className="bg-slate-900 pt-16 pb-24 relative overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
                    </div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="mx-auto max-w-3xl text-center space-y-6">
                            <p className="inline-block px-4 py-1.5 rounded-full bg-slate-800 text-blue-300 font-bold text-sm tracking-widest border border-slate-700">
                                広告掲載・スポンサー募集
                            </p>
                            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                                リハビリ・介護現場に届く
                                <br className="hidden sm:block" />
                                広告掲載を募集しています
                            </h1>
                            <p className="text-base sm:text-lg text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed text-left sm:text-center">
                                リハビリ・介護・医療・福祉領域に関連するサービス、研修、採用情報、教材などを紹介したい事業者様向けに、広告掲載・スポンサー掲載を募集しています。
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                                <SponsorCtaButton
                                    eventName="sponsor_contact_click"
                                    location="sponsor_hero"
                                    buttonText="掲載について問い合わせる"
                                    href={CONTACT_MAILTO}
                                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-500 hover:bg-blue-400 text-white font-black text-base transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                                >
                                    掲載について問い合わせる
                                    <ArrowIcon className="w-5 h-5" />
                                </SponsorCtaButton>
                                <SponsorCtaButton
                                    eventName="sponsor_menu_click"
                                    location="sponsor_hero"
                                    buttonText="掲載メニューを見る"
                                    anchorHref="#menu"
                                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-base transition-all border border-slate-700 flex items-center justify-center gap-2"
                                >
                                    掲載メニューを見る
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                        />
                                    </svg>
                                </SponsorCtaButton>
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute bottom-0 left-0 right-0 h-12 bg-slate-50"
                        style={{
                            clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)",
                        }}
                    />
                </section>

                {/* About */}
                <section className="py-16 sm:py-20 bg-slate-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-10">
                                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                                    自主トレ素材庫について
                                </h2>
                                <p className="text-slate-500 font-medium text-sm sm:text-base">
                                    リハビリ・介護現場に向けて、無料イラスト素材を配布しているサイトです。
                                </p>
                            </div>
                            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
                                <ul className="space-y-3">
                                    {features.map((feat) => (
                                        <li
                                            key={feat}
                                            className="flex items-start gap-3 text-slate-700 leading-relaxed"
                                        >
                                            <span className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={3}
                                                    stroke="currentColor"
                                                    className="w-3 h-3"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="m4.5 12.75 6 6 9-13.5"
                                                    />
                                                </svg>
                                            </span>
                                            <span className="font-medium">{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Ad fits */}
                <section className="py-16 sm:py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                                このようなサービスと相性があります
                            </h2>
                            <p className="text-slate-500 font-medium text-sm sm:text-base">
                                リハビリ・介護現場に届きやすい広告ジャンルの例です。
                            </p>
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                            {adFits.map((item) => (
                                <div
                                    key={item.title}
                                    className="min-w-0 bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-200 hover:shadow-sm transition-all"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="font-black text-slate-900 mb-2 leading-snug">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed break-keep break-words">
                                        {item.body}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Menu */}
                <section id="menu" className="py-16 sm:py-20 bg-slate-50 scroll-mt-24">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                                掲載メニュー
                            </h2>
                            <p className="text-slate-500 font-medium text-sm sm:text-base">
                                4つの掲載プランをご用意しています。
                            </p>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
                            {plans.map((plan) => (
                                <div
                                    key={plan.name}
                                    className={`relative bg-white rounded-2xl border p-6 sm:p-7 flex flex-col ${
                                        plan.highlight
                                            ? "border-blue-300 shadow-md"
                                            : "border-slate-200"
                                    }`}
                                >
                                    {plan.highlight && (
                                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold tracking-wide">
                                            おすすめ
                                        </span>
                                    )}
                                    <h3 className="text-lg font-black text-slate-900 mb-2">
                                        {plan.name}
                                    </h3>
                                    <p className="text-2xl font-black text-blue-600 mb-5">
                                        {plan.price}
                                    </p>
                                    <ul className="space-y-2 text-sm text-slate-700 mb-6 flex-1">
                                        {plan.items.map((it) => (
                                            <li key={it} className="flex items-start gap-2">
                                                <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={3}
                                                        stroke="currentColor"
                                                        className="w-2.5 h-2.5"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="m4.5 12.75 6 6 9-13.5"
                                                        />
                                                    </svg>
                                                </span>
                                                <span className="leading-relaxed">{it}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="pt-4 border-t border-slate-100">
                                        <p className="text-xs font-bold text-slate-500 mb-1">
                                            おすすめ対象
                                        </p>
                                        <p className="text-sm text-slate-700 leading-relaxed">
                                            {plan.target}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="max-w-4xl mx-auto mt-10 px-5 py-5 sm:px-6 sm:py-6 bg-blue-50/60 border border-blue-100 rounded-2xl">
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                掲載位置や内容は、サイトの状況に応じて個別にご相談となります。
                                <br />
                                医療・介護・福祉領域と著しく関連性が低い広告、公序良俗に反する内容、誇大表現を含む内容は掲載をお断りする場合があります。
                            </p>
                        </div>
                    </div>
                </section>

                {/* Placement spots */}
                <section className="py-16 sm:py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4">
                                    主な掲載場所
                                </h2>
                                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-7">
                                    <ul className="space-y-3">
                                        {placementSpots.map((spot) => (
                                            <li
                                                key={spot}
                                                className="flex items-center gap-2.5 text-slate-700 font-medium text-sm sm:text-base"
                                            >
                                                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                {spot}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4">
                                    掲載できる情報
                                </h2>
                                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-7">
                                    <ul className="grid gap-3 sm:grid-cols-2">
                                        {placeableItems.map((item) => (
                                            <li
                                                key={item}
                                                className="flex items-center gap-2.5 text-slate-700 font-medium text-sm sm:text-base"
                                            >
                                                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Flow */}
                <section className="py-16 sm:py-20 bg-slate-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                                掲載までの流れ
                            </h2>
                        </div>
                        <div className="max-w-3xl mx-auto space-y-4">
                            {flowSteps.map((step, i) => (
                                <div
                                    key={step.title}
                                    className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 flex gap-4 sm:gap-5"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 text-white font-black text-base sm:text-lg flex items-center justify-center">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-black text-slate-900 mb-1 text-base sm:text-lg">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            {step.body}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-16 sm:py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                                よくある質問
                            </h2>
                        </div>
                        <div className="max-w-3xl mx-auto space-y-3">
                            {faqs.map((item, i) => (
                                <details
                                    key={item.q}
                                    className="group bg-white rounded-xl border border-slate-200 overflow-hidden"
                                >
                                    <summary className="flex cursor-pointer items-center justify-between p-5 sm:p-6 font-bold text-slate-900 list-none">
                                        <span className="flex items-start gap-3">
                                            <span className="text-blue-600 font-black flex-shrink-0">
                                                Q{i + 1}.
                                            </span>
                                            <span className="leading-snug">{item.q}</span>
                                        </span>
                                        <span className="ml-4 flex-shrink-0 text-slate-400 group-open:rotate-180 transition-transform">
                                            <svg
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </span>
                                    </summary>
                                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                                        {item.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-16 sm:py-20 bg-slate-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-blue-100 shadow-sm p-8 sm:p-10 text-center">
                            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 leading-snug">
                                広告掲載・スポンサー掲載のご相談はこちら
                            </h2>
                            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-7">
                                自主トレ素材庫では、リハビリ・介護現場に役立つサービスや取り組みを紹介できるスポンサー様を募集しています。
                                <br className="hidden sm:block" />
                                研修、採用、教材、福祉用具、介護予防サービスなどの告知にご活用ください。
                            </p>
                            <SponsorCtaButton
                                eventName="sponsor_contact_click"
                                location="sponsor_final_cta"
                                buttonText="掲載について問い合わせる"
                                href={CONTACT_MAILTO}
                                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-black text-base transition-all shadow-md shadow-blue-600/20"
                            >
                                掲載について問い合わせる
                                <ArrowIcon className="w-4 h-4" />
                            </SponsorCtaButton>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
