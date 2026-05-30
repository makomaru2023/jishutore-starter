import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LineBanner } from "@/components/LineBanner";
import { CheckoutButton } from "@/components/CheckoutButton";
import { WatermarkPreviewSection, type PreviewItem } from "@/components/WatermarkPreviewSection";
import { POSTURE_SELF_TRAINING_PRICE_ID } from "@/lib/products";

const PRODUCT_ID = "home-elderly-self-training";
const PRODUCT_NAME = "姿勢別自主トレPowerPointセット";
const PRICE = 980;
const CHECKOUT_READY = Boolean(POSTURE_SELF_TRAINING_PRICE_ID);

// 本文用：英単語（PowerPoint/PDF/Stripe など）は途中で切らず、日本語は自然に折り返す。
const JP_TEXT = "jp-text";
// 見出し用：行のバランスを取りつつ、英単語の途中切れを防ぐ。
const JP_HEADING = "jp-heading";

export const metadata: Metadata = {
    title: "今できる姿勢から選べる 姿勢別自主トレPowerPointセット｜自主トレ素材庫",
    description:
        "座位・立位・臥位など、対象者の「今できる姿勢」から選べる自主トレ資料セット。訪問リハ・通所リハ・退院前指導で使いやすいPowerPoint資料です。編集OK・印刷配布OK。",
    alternates: {
        canonical:
            "https://jishutore-sozaiko.online/products/home-elderly-self-training/",
    },
    openGraph: {
        title: "今できる姿勢から選べる 姿勢別自主トレPowerPointセット",
        description:
            "疾患名ではなく、座位・立位・臥位など対象者の「今できる姿勢」から自主トレを選びやすくするPowerPoint資料セットです。",
        url: "https://jishutore-sozaiko.online/products/home-elderly-self-training/",
        siteName: "自主トレ素材庫",
        images: [
            {
                url: "/products/home-elderly-self-training/thumbnail.png",
                width: 1792,
                height: 1024,
                alt: "姿勢別自主トレPowerPointセット",
            },
        ],
        locale: "ja_JP",
        type: "website",
    },
};

const HERO_BADGES = [
    "今できる姿勢から選べる",
    "座位・立位・臥位に対応",
    "訪問リハ・通所リハ向け",
    "PowerPoint編集OK",
    "PDF印刷OK",
    "買い切り",
];

const PAIN_POINTS = [
    "立位が不安定で、まず座位運動から始めたい",
    "ベッド上でできる自主トレを渡したい",
    "疾患名よりも、その人の体力や動作能力に合わせて選びたい",
    "訪問先の環境に合わせて運動を調整したい",
    "通所リハで座位・立位の体操を使い分けたい",
    "転倒リスクがある方に、無理のない運動を提案したい",
    "無料素材を探して、姿勢ごとに資料を作るのが大変",
];

const CONTENTS = [
    {
        title: "全身で使える自主トレ",
        description:
            "全身をバランスよく動かしたい方へ。ウォーミングアップや集団体操にも使いやすい運動を整理しています。",
    },
    {
        title: "上肢の自主トレ",
        description:
            "肩・肘・手指など、上肢機能に関わる運動を、実施しやすい姿勢と合わせて選びやすくしています。",
    },
    {
        title: "下肢の自主トレ",
        description:
            "立ち上がり・歩行・バランスにつながる下肢運動を、対象者の能力に合わせて使いやすく整理しています。",
    },
    {
        title: "座位でできる自主トレ",
        description:
            "立位が不安定な方や、まず安全に運動を始めたい方へ。椅子座位で行いやすい下肢・体幹・上肢運動をまとめています。",
    },
    {
        title: "臥位でできる自主トレ",
        description:
            "ベッド上中心の方、体力が低い方、起き上がり前に運動したい方へ。負担の少ない姿勢で行える基礎運動を収録しています。",
    },
    {
        title: "立位でできる自主トレ",
        description:
            "歩行・立ち上がり・バランスにつなげたい方へ。支持物を使いながら、下肢筋力や立位バランスを促す運動を収録しています。",
    },
];

const USE_SCENES = [
    ["訪問リハ", "自宅環境や本人の体力に合わせて、座位・立位・臥位の中から運動を選べます。"],
    ["通所リハ", "座位体操と立位体操を使い分け、能力差に合わせた説明資料として使えます。"],
    ["退院前指導", "退院後の生活を想定し、無理なく続けられる姿勢から自主トレを提案できます。"],
    ["家族説明", "家族が見守りやすい運動を、姿勢ごとに整理して説明できます。"],
    ["集団体操", "座位中心の日、立位を入れる日など、参加者の状態に合わせて調整できます。"],
    ["ベッド上自主トレ", "離床前や体力が低い方にも、臥位でできる運動を選びやすくなります。"],
    ["転倒予防指導", "立位が不安定な方には座位から始めるなど、安全性を優先して提案できます。"],
    ["在宅高齢者の運動習慣づくり", "生活環境や体力に合わせ、続けやすい自主トレ資料として渡せます。"],
];

const RECOMMENDED = [
    "疾患別資料だけでは運動選択が難しいと感じている",
    "座位・立位・臥位で資料を使い分けたい",
    "在宅高齢者向けに安全な自主トレを渡したい",
    "通所リハで体操メニューを整理したい",
    "訪問先でその人に合わせて資料を編集したい",
    "転倒リスクや体力に合わせて運動を提案したい",
    "無料素材を貼り合わせる時間を減らしたい",
];

// 透かし入りプレビュー候補。実在する画像だけが自動的に表示される（404は出ない）。
// samples/ の既存画像は現状で表示され、previews/ の webp は用意でき次第そのまま表示される。
const PREVIEW_ITEMS: PreviewItem[] = [
    {
        title: "座位でできる自主トレ",
        caption: "立位が不安定な方にも使いやすい例",
        src: "/products/home-elderly-self-training/samples/sample-sitting.png",
    },
    {
        title: "立位でできる自主トレ",
        caption: "支持物を使った運動例",
        src: "/products/home-elderly-self-training/samples/sample-standing.png",
    },
    {
        title: "全身体操",
        caption: "通所リハでも使いやすい例",
        src: "/products/home-elderly-self-training/samples/sample-full-body.png",
    },
    {
        title: "臥位でできる自主トレ",
        caption: "ベッド上で行いやすい例",
        src: "/products/home-elderly-self-training/previews/supine-01.webp",
    },
    {
        title: "上肢の自主トレ",
        caption: "肩・肘・手指の運動例",
        src: "/products/home-elderly-self-training/previews/upper-limb-01.webp",
    },
    {
        title: "下肢の自主トレ",
        caption: "立ち上がり・歩行につながる運動例",
        src: "/products/home-elderly-self-training/previews/lower-limb-01.webp",
    },
];

const FAQS = [
    {
        q: "疾患別セットと何が違いますか？",
        a: "疾患別セットは、脳卒中・腰痛・膝OAなど疾患名から資料を選ぶ商品です。姿勢別セットは、座位・立位・臥位など、その方が安全に行える姿勢から運動を選びたいときに使いやすい資料です。",
    },
    {
        q: "どんな対象者に向いていますか？",
        a: "在宅高齢者、退院前の方、訪問リハ利用者、通所リハ利用者など、体力やバランス能力に合わせて運動を調整したい方に使いやすい構成です。",
    },
    {
        q: "立位が不安定な方にも使えますか？",
        a: "はい。座位や臥位で行える運動も含めて構成しているため、立位が不安定な方には座位・臥位中心に編集して使えます。",
    },
    {
        q: "集団体操にも使えますか？",
        a: "はい。座位体操や立位体操として活用できます。ただし、参加者の状態に合わせて内容や回数を調整してください。",
    },
    {
        q: "疾患別セットと一緒に使えますか？",
        a: "はい。疾患別セットで疾患ごとの注意点を確認し、姿勢別セットでその方が実施しやすい運動を選ぶ、という使い分けができます。",
    },
    {
        q: "内容を編集してもいいですか？",
        a: "はい。対象者の状態や施設の方針に合わせて、文言・回数・注意点などを編集して使用できます。",
    },
    {
        q: "患者さんやご家族に印刷して渡してもいいですか？",
        a: "はい。臨床・介護現場での説明資料として、印刷配布していただけます。",
    },
    {
        q: "返金はできますか？",
        a: "デジタル商品の性質上、原則として購入後の返金はできません。ただし、ファイルが開けないなど明らかな不具合がある場合はお問い合わせください。",
    },
];

const CHECKOUT_CLASS =
    "flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-4 text-center text-base font-black text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

function SectionHeading({
    title,
    kicker,
    description,
}: {
    title: string;
    kicker?: string;
    description?: string;
}) {
    return (
        <div className="mb-8 text-center sm:mb-10">
            {kicker && (
                <p className="mb-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-black tracking-widest text-blue-600">
                    {kicker}
                </p>
            )}
            <h2 className={`text-2xl font-black leading-snug text-slate-900 sm:text-3xl ${JP_HEADING}`}>
                {title}
            </h2>
            {description && (
                <p className={`mx-auto mt-4 max-w-3xl text-sm font-medium leading-relaxed text-slate-600 sm:text-base ${JP_TEXT}`}>
                    {description}
                </p>
            )}
        </div>
    );
}

function CheckList({ items }: { items: string[] }) {
    return (
        <ul className="grid gap-3 sm:grid-cols-2">
            {items.map((item) => (
                <li
                    key={item}
                    className={`flex max-w-full items-start gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm leading-relaxed text-slate-700 shadow-sm ${JP_TEXT}`}
                >
                    <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3.5 w-3.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

function ProductCheckoutButton({
    label = "980円で購入する",
}: {
    label?: string;
}) {
    return (
        <CheckoutButton
            productId={PRODUCT_ID}
            productName={PRODUCT_NAME}
            price={PRICE}
            label={label}
            disabled={!CHECKOUT_READY}
            className={CHECKOUT_CLASS}
        />
    );
}

function ComparisonSection() {
    const rows = [
        ["選び方", "疾患名から選ぶ", "今できる姿勢から選ぶ"],
        ["向いている場面", "疾患ごとの注意点や説明を整理したいとき", "体力・転倒リスク・動作能力に合わせたいとき"],
        ["主な対象", "脳卒中、腰痛、膝OA、術後など", "在宅高齢者、訪問リハ、通所リハ利用者など"],
        ["使いやすい場面", "退院前指導、疾患別の家族説明", "訪問リハ、通所リハ、集団体操、ベッド上自主トレ"],
        ["商品の役割", "疾患ごとの説明を時短する資料", "能力や安全性に合わせて運動を選ぶ資料"],
    ];

    return (
        <section className="bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    kicker="COMPARE"
                    title="疾患別セットとの違い"
                    description="疾患別セットは、疾患ごとの説明に強い資料です。姿勢別セットは、対象者の能力や安全性に合わせて運動を選びたいときに使いやすい資料です。"
                />

                <div className="grid gap-4 md:hidden">
                    {rows.map(([label, disease, posture]) => (
                        <article key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <h3 className="text-sm font-black text-slate-900">{label}</h3>
                            <div className="mt-4 grid gap-3">
                                <div className="rounded-xl bg-slate-50 p-4">
                                    <p className="text-xs font-black text-slate-500">疾患別自主トレ資料セット</p>
                                    <p className={`mt-1 text-sm font-bold leading-relaxed text-slate-700 ${JP_TEXT}`}>{disease}</p>
                                </div>
                                <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                                    <p className="text-xs font-black text-blue-600">姿勢別自主トレ資料セット</p>
                                    <p className={`mt-1 text-sm font-bold leading-relaxed text-blue-900 ${JP_TEXT}`}>{posture}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:block">
                    <table className="w-full table-fixed border-collapse text-left">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="w-1/5 px-5 py-4 text-sm font-black text-slate-500">比較項目</th>
                                <th className="px-5 py-4 text-sm font-black text-slate-700">疾患別自主トレ資料セット</th>
                                <th className="bg-blue-50 px-5 py-4 text-sm font-black text-blue-700">姿勢別自主トレ資料セット</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map(([label, disease, posture]) => (
                                <tr key={label} className="border-t border-slate-100">
                                    <th className="px-5 py-4 text-sm font-black text-slate-900">{label}</th>
                                    <td className={`px-5 py-4 text-sm leading-relaxed text-slate-600 ${JP_TEXT}`}>{disease}</td>
                                    <td className={`bg-blue-50/50 px-5 py-4 text-sm font-bold leading-relaxed text-blue-900 ${JP_TEXT}`}>{posture}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

function FreeMaterialComparison() {
    const rows = [
        ["形式", "イラスト単体", "姿勢別に構成済み"],
        ["使い方", "自分で資料に貼る", "必要なページを編集・印刷"],
        ["説明文", "説明文や注意点は自分で作る", "説明文や注意点つき"],
        ["運動選択", "運動を自分で選ぶ", "座位・立位・臥位から選べる"],
        ["向いている人", "素材だけ欲しい人向け", "患者説明まで時短したい人向け"],
    ];

    return (
        <section className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    kicker="FREE MATERIALS"
                    title="無料素材との違い"
                    description="無料素材は、必要なイラストを自分で選んで資料を作りたい方向けです。姿勢別自主トレ資料セットは、説明の流れや運動メニューまで整えた資料です。"
                />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    {rows.map(([label, free, product]) => (
                        <article key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <h3 className="text-sm font-black text-slate-900">{label}</h3>
                            <div className="mt-4 space-y-3">
                                <p className={`rounded-xl bg-slate-50 p-3 text-sm leading-relaxed text-slate-600 ${JP_TEXT}`}>
                                    <span className="block text-xs font-black text-slate-400">無料素材</span>
                                    {free}
                                </p>
                                <p className={`rounded-xl border border-blue-100 bg-blue-50 p-3 text-sm font-bold leading-relaxed text-blue-900 ${JP_TEXT}`}>
                                    <span className="block text-xs font-black text-blue-500">姿勢別PowerPoint資料</span>
                                    {product}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function HomeElderlySelfTrainingPage() {
    return (
        <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
            <Header />
            <main className="flex-1">
                <section className="bg-gradient-to-b from-blue-50 via-white to-white py-12 sm:py-16 lg:py-20">
                    <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_440px] lg:px-8">
                        <div>
                            <p className="mb-4 inline-block rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs font-black tracking-widest text-blue-700 shadow-sm">
                                姿勢別自主トレPowerPointセット
                            </p>
                            <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl">
                                <span className="hidden sm:inline">
                                    疾患名だけでは、
                                    <br />
                                    自主トレを選びにくいことはありませんか？
                                </span>
                                <span className="sm:hidden">
                                    疾患名だけでは、
                                    <br />
                                    自主トレを
                                    <br />
                                    選びにくいことは
                                    <br />
                                    ありませんか？
                                </span>
                            </h1>
                            <p className={`mt-5 max-w-3xl text-sm font-medium leading-relaxed text-slate-600 sm:text-base ${JP_TEXT}`}>
                                座位・立位・臥位など、患者さんの「今できる姿勢」から選べる自主トレ資料セットです。
                                退院前指導・訪問リハ・通所リハで、転倒リスクや体力に合わせて運動を提案しやすくなります。
                            </p>
                            <div className="mt-5 flex flex-wrap gap-2">
                                {HERO_BADGES.map((badge) => (
                                    <span
                                        key={badge}
                                        className="rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-bold text-blue-700 shadow-sm"
                                    >
                                        {badge}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                                <div className="w-full sm:w-auto">
                                    <ProductCheckoutButton />
                                </div>
                                <a
                                    href="#contents"
                                    className="inline-flex min-h-14 w-full items-center justify-center rounded-full border-2 border-blue-200 bg-white px-7 py-4 text-center text-base font-bold text-blue-700 transition-colors hover:bg-blue-50 sm:w-auto"
                                >
                                    収録内容を見る
                                </a>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm">
                            <Image
                                src="/products/home-elderly-self-training/thumbnail.png"
                                alt="今できる姿勢から選べる 姿勢別自主トレPowerPointセットのサムネイル"
                                width={1792}
                                height={1024}
                                className="h-auto w-full max-w-full"
                                priority
                            />
                        </div>
                    </div>
                </section>

                <section className="bg-slate-50 py-14 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading
                            title="疾患別だけでは、運動を選びにくい場面があります"
                            description="疾患名が同じでも、立位でできる人、座位から始めたい人、ベッド上中心の人では、渡す自主トレ資料は変わります。姿勢別に整理された資料があると、対象者の体力・バランス能力・生活環境に合わせて運動を選びやすくなります。"
                        />
                        <CheckList items={PAIN_POINTS} />
                    </div>
                </section>

                <section className="bg-white py-14 sm:py-20">
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                        <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6 text-center shadow-sm sm:p-10">
                            <p className="mb-3 text-xs font-black tracking-widest text-blue-600">SOLUTION</p>
                            <h2 className={`text-2xl font-black leading-snug text-slate-900 sm:text-3xl ${JP_HEADING}`}>
                                このセットは、能力・姿勢に合わせて運動を選ぶための資料です
                            </h2>
                            <p className={`mx-auto mt-5 max-w-3xl text-sm font-medium leading-relaxed text-slate-700 sm:text-base ${JP_TEXT}`}>
                                疾患名から選ぶだけではなく、対象者が安全に行える姿勢から自主トレを選べるように、
                                座位・立位・臥位などの実施姿勢ごとに資料を整理しました。
                                必要なページだけを残して、回数や注意点を編集すれば、患者さんやご家族に渡せる資料として使えます。
                            </p>
                            <p className="mx-auto mt-6 inline-flex rounded-full bg-white px-5 py-3 text-base font-black text-blue-700 shadow-sm">
                                疾患ではなく、今できる姿勢から選べる。
                            </p>
                        </div>
                    </div>
                </section>

                <ComparisonSection />
                <FreeMaterialComparison />

                <section id="contents" className="scroll-mt-24 bg-white py-14 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading
                            kicker="CONTENTS"
                            title="収録内容"
                            description="座位・立位・臥位など、実施姿勢ごとに使いやすく整理しています。実際の商品は6種類収録です。"
                        />
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {CONTENTS.map((content, index) => (
                                <article key={content.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <div className="mb-3 flex items-center gap-3">
                                        <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-black text-blue-600">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <h3 className={`font-black text-slate-900 ${JP_HEADING}`}>{content.title}</h3>
                                    </div>
                                    <p className={`text-sm leading-relaxed text-slate-600 ${JP_TEXT}`}>
                                        {content.description}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-slate-50 py-14 sm:py-20">
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading kicker="HOW TO USE" title="使い方はかんたんです" />
                        <div className="grid gap-4 md:grid-cols-3">
                            {[
                                ["1", "対象者が安全に行える姿勢を選ぶ"],
                                ["2", "必要な運動ページだけ残す"],
                                ["3", "回数・注意点を編集して印刷する"],
                            ].map(([step, text]) => (
                                <article key={step} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
                                        {step}
                                    </span>
                                    <h3 className={`mt-4 text-lg font-black leading-snug text-slate-900 ${JP_HEADING}`}>{text}</h3>
                                </article>
                            ))}
                        </div>
                        <p className={`mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-slate-600 ${JP_TEXT}`}>
                            疾患名だけで選ぶのではなく、立位の安定性、体力、理解度、生活環境に合わせて資料を調整できます。
                        </p>
                    </div>
                </section>

                <section className="bg-white py-14 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading kicker="SCENE" title="こんな場面で使えます" />
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {USE_SCENES.map(([title, description]) => (
                                <article key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <h3 className="text-base font-black text-slate-900">{title}</h3>
                                    <p className={`mt-2 text-sm leading-relaxed text-slate-600 ${JP_TEXT}`}>{description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-slate-50 py-14 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading title="こんなリハ職におすすめです" />
                        <CheckList items={RECOMMENDED} />
                    </div>
                </section>

                <WatermarkPreviewSection
                    id="preview"
                    kicker="SAMPLE"
                    heading="座位・立位・臥位の資料イメージを確認できます"
                    intro="どのような姿勢・場面で使える資料なのかイメージしやすいよう、一部ページを掲載しています。"
                    subcopy="対象者の「今できる姿勢」に合わせて使えるよう、実施姿勢ごとに資料を整理しています。購入後のファイルには透かしは入りません。"
                    items={PREVIEW_ITEMS}
                    background="white"
                    columns={3}
                />

                <section className="bg-slate-50 py-14 sm:py-20">
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-7">
                            <h2 className="text-lg font-black text-amber-900">購入前にご確認ください</h2>
                            <p className={`mt-3 text-sm leading-relaxed text-amber-900 sm:text-base ${JP_TEXT}`}>
                                この資料は、すべての対象者にそのまま使える医療プロトコルではありません。
                                対象者の状態、医師の指示、疼痛、禁忌、転倒リスク、術後時期に合わせて、専門職の判断で編集してご使用ください。
                            </p>
                        </div>
                    </div>
                </section>

                <section className="bg-white py-14 sm:py-20">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                        <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6 text-center shadow-sm sm:p-10">
                            <p className="text-xs font-black tracking-widest text-blue-600">PRICE</p>
                            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-5xl">980円</h2>
                            <p className="mt-2 text-sm font-bold text-slate-600">税込・買い切り</p>
                            <div className="mt-5 flex flex-wrap justify-center gap-2">
                                {["PowerPoint形式", "PDF印刷用", "編集OK", "印刷配布OK", "追加料金なし"].map((item) => (
                                    <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-blue-700 shadow-sm">
                                        {item}
                                    </span>
                                ))}
                            </div>
                            <p className={`mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 ${JP_TEXT}`}>
                                訪問リハ、通所リハ、退院前指導で繰り返し使える、姿勢別の自主トレ資料セットです。
                            </p>
                            <div className="mx-auto mt-7 max-w-md">
                                <ProductCheckoutButton />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-slate-50 py-14 sm:py-20">
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading kicker="FLOW" title="購入後の流れ" />
                        <div className="grid gap-4 md:grid-cols-3">
                            {[
                                ["1", "サイト内でStripe決済"],
                                ["2", "決済完了後、ダウンロードページへ移動"],
                                ["3", "PowerPoint資料・PDF資料をダウンロードして使用"],
                            ].map(([step, text]) => (
                                <article key={step} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <span className="text-sm font-black text-blue-600">STEP {step}</span>
                                    <h3 className={`mt-2 text-base font-black leading-snug text-slate-900 ${JP_HEADING}`}>{text}</h3>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-white py-14 sm:py-20">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading kicker="FAQ" title="よくある質問" />
                        <div className="space-y-3">
                            {FAQS.map((faq) => (
                                <details key={faq.q} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <summary className={`cursor-pointer list-none text-base font-black leading-snug text-slate-900 ${JP_HEADING}`}>
                                        {faq.q}
                                    </summary>
                                    <p className={`mt-3 text-sm leading-relaxed text-slate-600 ${JP_TEXT}`}>{faq.a}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-blue-50 py-14 sm:py-20">
                    <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        <h2 className={`text-2xl font-black leading-snug text-slate-900 sm:text-3xl ${JP_HEADING}`}>
                            購入前に雰囲気を確認したい方へ
                        </h2>
                        <p className={`mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base ${JP_TEXT}`}>
                            LINE登録で、自主トレ継続に役立つ補助シートや一部サンプルを無料配布しています。
                            有料版では、姿勢別に整理されたPowerPoint資料を編集可能な形で使用できます。
                        </p>
                        <div className="mx-auto mt-7 max-w-md">
                            <Link
                                href="/#line"
                                className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-green-500 px-7 py-4 text-center text-base font-black text-white shadow-lg shadow-green-500/20 transition-colors hover:bg-green-400 sm:w-auto"
                            >
                                LINEで無料サンプルを受け取る
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="bg-gradient-to-b from-white to-blue-50 py-16 sm:py-24">
                    <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                        <h2 className={`text-2xl font-black leading-snug text-slate-900 sm:text-3xl ${JP_HEADING}`}>
                            対象者に合わせた自主トレ資料を、ゼロから作らない。
                        </h2>
                        <p className={`mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base ${JP_TEXT}`}>
                            立位でできる方、座位から始めたい方、ベッド上中心の方。
                            対象者の「今できる姿勢」に合わせて、必要な自主トレ資料を選び、編集して渡せます。
                        </p>
                        <div className="mx-auto mt-8 max-w-md">
                            <ProductCheckoutButton />
                        </div>
                    </div>
                </section>

                <LineBanner />
            </main>
            <Footer showNoteLink={false} />
        </div>
    );
}
