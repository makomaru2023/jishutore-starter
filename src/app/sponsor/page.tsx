import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SponsorCtaButton } from "@/components/SponsorCtaButton";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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

const CheckIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={3}
        stroke="currentColor"
        className={className}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
);

const aboutPoints = [
    "リハビリ職・介護職向けの無料素材サイト",
    "自主トレイラストや説明資料を継続的に追加",
    "患者説明・家族指導・退院前指導に使いやすい構成",
    "資料作成に関心の高いユーザーが訪問",
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
    fit: string;
    plan: string;
};

const placements: PlacementCard[] = [
    {
        title: "トップページ下部",
        description: "自主トレ素材庫全体を訪れた方へ、応援スポンサーとして掲載できます。",
        fit: "応援スポンサー、個人事業主、小規模サービス、医療介護系メディア",
        plan: "応援スポンサー",
    },
    {
        title: "無料素材一覧ページ",
        description:
            "無料素材を探しているユーザーに向けて掲載できます。リハビリ・介護資料を作成している層に届きやすい掲載場所です。",
        fit: "リハ職向け教材、研修・セミナー、求人、資料作成支援サービス",
        plan: "ページスポンサー / プレミアムスポンサー",
    },
    {
        title: "素材詳細ページ下部",
        description:
            "個別素材を見ているユーザーに自然な形で紹介できます。特定の運動や場面に関心を持つユーザーへ届けやすい枠です。",
        fit: "福祉用具、自助具、疾患別教材、リハビリ研修、採用広報",
        plan: "ページスポンサー",
    },
    {
        title: "カテゴリページ",
        description: "転倒予防、上肢、下肢、ADL、介護予防など、テーマに合わせて掲載できます。",
        fit: "転倒予防サービス、福祉用具、介護予防教室、上肢機能訓練教材、求人・研修",
        plan: "カテゴリスポンサー",
    },
    {
        title: "資料セットページ",
        description:
            "資料作成や患者説明に関心が高いユーザーへ届けられます。教材、研修、求人、資料作成支援サービスと相性が良い掲載場所です。",
        fit: "リハ職向け教材、研修・セミナー、医療介護系求人、スライド・資料作成支援",
        plan: "プレミアムスポンサー",
    },
    {
        title: "note記事内",
        description:
            "記事テーマに合わせてスポンサーとして紹介できます。読み物コンテンツの中で自然にサービスを紹介したい場合に向いています。",
        fit: "研修告知、教材紹介、イベント告知、採用広報、サービス紹介",
        plan: "noteスポンサー / プレミアムスポンサー",
    },
];

type Plan = {
    name: string;
    price: string;
    placement: string;
    items: string[];
    href: string;
    highlight?: boolean;
};

const plans: Plan[] = [
    {
        name: "応援スポンサー",
        price: "月額 3,000円",
        placement: "トップページ下部・スポンサー一覧など",
        items: [
            "スポンサー名掲載",
            "100文字程度の紹介文",
            "公式サイトまたはSNSへのリンク",
        ],
        href: "/sponsor/detail-sponsor",
    },
    {
        name: "ページスポンサー",
        price: "月額 5,000円",
        placement: "無料素材一覧ページ・素材詳細ページ下部など",
        items: [
            "サービス名・会社名掲載",
            "150文字程度の紹介文",
            "公式サイトへのリンク",
            "バナー画像掲載可能",
        ],
        href: "/sponsor/page-sponsor",
    },
    {
        name: "カテゴリスポンサー",
        price: "月額 8,000円",
        placement: "カテゴリページ・関連素材ページ下部など",
        items: [
            "指定カテゴリページ下部に掲載",
            "カテゴリ閲覧ユーザーへ表示",
            "150文字程度の紹介文",
            "バナー画像掲載可能",
        ],
        href: "/sponsor/category-sponsor",
        highlight: true,
    },
    {
        name: "プレミアムスポンサー",
        price: "月額 10,000円",
        placement: "無料素材一覧ページの目立つ位置・資料セットページなど",
        items: [
            "主要導線付近に掲載",
            "200文字程度の紹介文",
            "バナー画像掲載可能",
            "noteまたはSNSでの紹介を相談可能",
        ],
        href: "/sponsor/premium-sponsor",
    },
    {
        name: "noteスポンサー",
        price: "1記事 3,000円",
        placement: "自主トレ素材庫のnote記事内",
        items: [
            "スポンサー名掲載",
            "100〜150文字程度の紹介文",
            "公式サイトまたはSNSへのリンク",
        ],
        href: "/sponsor/note-sponsor",
    },
];

const compatibleServices = [
    "リハビリ職向け教材",
    "介護職向けサービス",
    "医療介護系求人",
    "研修・セミナー",
    "福祉用具",
    "自助具",
    "訪問看護・訪問リハ関連サービス",
    "介護予防サービス",
    "医療介護系メディア",
    "個人の教材・note・講座",
];

const placeableItems = [
    "サービス名・事業者名",
    "紹介文",
    "リンクURL",
    "バナー画像",
    "必要に応じた簡易紹介文",
];

const restrictedItems = [
    "医療的に誤解を与える表現",
    "誇大広告",
    "公序良俗に反するもの",
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
        q: "個人でもスポンサーになれますか？",
        a: "はい。個人・小規模事業者さまもご相談いただけます。",
    },
    {
        q: "掲載期間はどれくらいですか？",
        a: "基本は1ヶ月単位を想定しています。",
    },
    {
        q: "広告効果は保証されますか？",
        a: "いいえ。広告効果を保証するものではありません。",
    },
    {
        q: "掲載内容の審査はありますか？",
        a: "はい。自主トレ素材庫の方向性に合うか確認させていただきます。",
    },
    {
        q: "掲載場所は相談できますか？",
        a: "はい。サービス内容や目的に応じて、掲載場所を相談できます。",
    },
];

export default function SponsorPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />
            <main className="flex-1 [&_p]:break-keep [&_p]:break-words [&_h1]:break-keep [&_h1]:break-words [&_h2]:break-keep [&_h2]:break-keep [&_h3]:break-keep [&_h3]:break-words [&_h4]:break-keep [&_h4]:break-words [&_li]:break-keep [&_li]:break-words">
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
                            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                                自主トレ素材庫の
                                <br className="sm:hidden" />
                                スポンサーを募集しています
                            </h1>
                            <p className="text-base sm:text-lg text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed text-left sm:text-center">
                                リハビリ・介護現場で使える無料素材を継続して届けるために、サイト運営を応援してくださるスポンサーさまを募集しています。
                            </p>
                            <p className="text-sm sm:text-base text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                                大規模な広告媒体ではありませんが、リハビリ・介護・医療福祉領域に関心の近い方へ届けやすい、成長中のニッチ媒体です。
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                                <SponsorCtaButton
                                    eventName="sponsor_menu_click"
                                    location="sponsor_hero"
                                    buttonText="スポンサー枠を見る"
                                    anchorHref="#plans"
                                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-500 hover:bg-blue-400 text-white font-black text-base transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                                >
                                    スポンサー枠を見る
                                    <ArrowIcon className="w-5 h-5" />
                                </SponsorCtaButton>
                                <SponsorCtaButton
                                    eventName="sponsor_menu_click"
                                    location="sponsor_hero_placement"
                                    buttonText="掲載場所を確認する"
                                    anchorHref="#placements"
                                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-base transition-all border border-slate-700 flex items-center justify-center gap-2"
                                >
                                    掲載場所を確認する
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

                {/* 2. 自主トレ素材庫とは */}
                <section className="py-16 sm:py-20 bg-slate-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                                    自主トレ素材庫とは
                                </h2>
                            </div>
                            <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 break-keep">
                                自主トレ素材庫は、リハビリ・介護現場で使える自主トレイラストや説明資料を配布しているサイトです。患者さんへの自主トレ指導、家族説明、退院前指導、通所リハ・訪問リハでの資料作成などに使える素材を公開しています。
                            </p>
                            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
                                <ul className="space-y-3">
                                    {aboutPoints.map((point) => (
                                        <li
                                            key={point}
                                            className="flex items-start gap-3 text-slate-700"
                                        >
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

                {/* 3. 3ヶ月間の運営データ */}
                <section id="performance" className="py-16 sm:py-20 bg-white scroll-mt-24">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">
                            <div className="text-center mb-8">
                                <p className="mb-2 inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-widest border border-blue-100">
                                    GROWTH DATA
                                </p>
                                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                                    3ヶ月間の運営データ
                                </h2>
                                <p className="text-sm sm:text-base text-slate-500 font-medium">
                                    2026年3月〜5月にかけて、掲載素材数とサイトの閲覧数がともに増加しています。
                                </p>
                            </div>

                            <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-8 break-keep max-w-3xl mx-auto">
                                2026年3月から5月にかけて、掲載素材数は213点から271点へ増加しました。それにあわせて、アクティブユーザー数・新規ユーザー数・表示回数も大きく伸びています。
                            </p>

                            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                                <div className="p-3 sm:p-5">
                                    <Image
                                        src="/images/sponsor-performance-2026-spring.png"
                                        alt="自主トレ素材庫 2026年3月から5月までの3ヶ月間の推移"
                                        width={1672}
                                        height={941}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1024px"
                                        className="w-full h-auto rounded-2xl"
                                    />
                                </div>
                            </div>

                            <p className="mt-4 text-xs sm:text-sm text-slate-500 text-center leading-relaxed">
                                ※数値はGoogle Analytics 4による参考値です。広告効果を保証するものではありません。
                            </p>

                            <div className="mt-8 rounded-2xl bg-blue-50/60 border border-blue-100 px-5 py-5 sm:px-6 sm:py-6 max-w-3xl mx-auto">
                                <p className="text-sm sm:text-base text-slate-700 leading-relaxed break-keep">
                                    自主トレ素材庫は、素材数を増やしながら少しずつ利用者が増えている成長中の媒体です。リハビリ・介護現場で資料を探している方に向けて、低価格で掲載を試せるスポンサー枠をご用意しています。
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. どんな人に届くのか */}
                <section className="py-16 sm:py-20 bg-slate-50">
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

                {/* 5. スポンサー掲載できる場所 */}
                <section id="placements" className="py-16 sm:py-20 bg-white scroll-mt-24">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                                スポンサー掲載できる場所
                            </h2>
                            <p className="text-sm sm:text-base text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed break-keep">
                                広告主さまの目的に合わせて、複数の掲載場所をご用意しています。無料素材を探している方に届けたい場合は素材一覧ページ、資料作成に関心が高い方へ届けたい場合は資料セットページなど、サービス内容に合わせて掲載場所を相談できます。
                            </p>
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                            {placements.map((p, i) => (
                                <div
                                    key={p.title}
                                    className="min-w-0 bg-blue-50/40 rounded-2xl p-6 border border-blue-100 hover:border-blue-200 hover:shadow-sm transition-all flex flex-col"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-black">
                                            {i + 1}
                                        </span>
                                        <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug min-w-0 break-keep">
                                            {p.title}
                                        </h3>
                                    </div>
                                    <p className="text-sm text-slate-700 leading-relaxed mb-4 flex-1 break-keep">
                                        {p.description}
                                    </p>
                                    <div className="space-y-2 pt-3 border-t border-blue-100">
                                        <div>
                                            <p className="text-[11px] font-bold tracking-wider text-blue-700 mb-1">
                                                向いている内容
                                            </p>
                                            <p className="text-xs text-slate-600 leading-relaxed break-keep">
                                                {p.fit}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-bold tracking-wider text-blue-700 mb-1">
                                                対応プラン
                                            </p>
                                            <p className="text-xs font-bold text-slate-800">
                                                {p.plan}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. スポンサー料金 + 7. 各スポンサー枠の詳細導線 */}
                <section id="plans" className="py-16 sm:py-20 bg-slate-50 scroll-mt-24">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                                スポンサー料金
                            </h2>
                            <p className="text-sm sm:text-base text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed break-keep">
                                まずは小さく試しやすい価格帯で、複数のスポンサー枠をご用意しています。掲載場所や内容は、サイトの状況に応じて個別にご相談となります。
                            </p>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-6xl mx-auto">
                            {plans.map((plan) => (
                                <div
                                    key={plan.name}
                                    className={`relative min-w-0 bg-white rounded-2xl border p-6 sm:p-7 flex flex-col ${
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
                                    <p className="text-2xl font-black text-blue-600 mb-4">
                                        {plan.price}
                                    </p>
                                    <div className="mb-4 px-3 py-2 rounded-lg bg-blue-50/60 border border-blue-100">
                                        <p className="text-[11px] font-bold tracking-wider text-blue-700 mb-0.5">
                                            掲載場所
                                        </p>
                                        <p className="text-xs text-slate-700 leading-snug break-keep">
                                            {plan.placement}
                                        </p>
                                    </div>
                                    <ul className="space-y-2 text-sm text-slate-700 mb-6 flex-1">
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

                        <div className="max-w-4xl mx-auto mt-10 px-5 py-5 sm:px-6 sm:py-6 bg-white border border-slate-200 rounded-2xl">
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                掲載位置や内容は、サイトの状況に応じて個別にご相談となります。
                                <br />
                                医療・介護・福祉領域と著しく関連性が低い広告、公序良俗に反する内容、誇大表現を含む内容は掲載をお断りする場合があります。
                            </p>
                        </div>
                    </div>
                </section>

                {/* 8. 相性の良いサービス */}
                <section className="py-16 sm:py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                                    相性の良いサービス
                                </h2>
                                <p className="text-sm sm:text-base text-slate-500 font-medium">
                                    リハビリ・介護・医療福祉領域に関わるサービスと相性が良いです。
                                </p>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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

                {/* 9. 掲載できる内容 + 10. 掲載できない可能性があるもの */}
                <section className="py-16 sm:py-20 bg-slate-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
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
                            <div>
                                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4">
                                    掲載できない可能性があるもの
                                </h2>
                                <p className="text-sm text-slate-600 leading-relaxed mb-4 break-keep">
                                    自主トレ素材庫は、医療・介護・リハビリ現場で使われることを想定したサイトです。そのため、以下のような内容は掲載をお断りする場合があります。
                                </p>
                                <div className="bg-white rounded-2xl border border-amber-100 p-6 sm:p-7">
                                    <ul className="space-y-3">
                                        {restrictedItems.map((item) => (
                                            <li
                                                key={item}
                                                className="flex items-start gap-2.5 text-slate-700 text-sm sm:text-base"
                                            >
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

                {/* 11. 掲載までの流れ */}
                <section className="py-16 sm:py-20 bg-white">
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
                                        <p className="text-sm text-slate-600 leading-relaxed break-keep">
                                            {step.body}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 12. FAQ */}
                <section className="py-16 sm:py-20 bg-slate-50">
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
                                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4 break-keep">
                                        {item.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 13. お問い合わせCTA */}
                <section className="py-16 sm:py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-blue-100 shadow-sm p-8 sm:p-10 text-center">
                            <h2 className="text-lg sm:text-2xl font-black text-slate-900 mb-4 leading-snug">
                                スポンサー掲載に
                                <br className="sm:hidden" />
                                興味のある方へ
                            </h2>
                            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-7 break-keep">
                                自主トレ素材庫の活動を応援してくださるスポンサーさまを募集しています。掲載場所やプランについて、まずはお気軽にご相談ください。
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                <SponsorCtaButton
                                    eventName="sponsor_contact_click"
                                    location="sponsor_final_cta"
                                    buttonText="スポンサー掲載について問い合わせる"
                                    href={CONTACT_MAILTO}
                                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 sm:px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-black text-sm sm:text-base transition-all shadow-md shadow-blue-600/20 whitespace-nowrap"
                                >
                                    スポンサー掲載について問い合わせる
                                    <ArrowIcon className="w-4 h-4" />
                                </SponsorCtaButton>
                                <Link
                                    href="/contact"
                                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 sm:px-8 py-4 rounded-full border border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:text-blue-600 font-bold text-sm sm:text-base transition-all whitespace-nowrap"
                                >
                                    お問い合わせフォーム
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
