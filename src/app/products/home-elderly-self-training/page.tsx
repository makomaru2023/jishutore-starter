import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LineBanner } from "@/components/LineBanner";
import { CheckoutButton } from "@/components/CheckoutButton";

const PRODUCT_ID = "home-elderly-self-training";
const PRODUCT_NAME = "在宅高齢者向け 自主トレ指導資料セット";
const PRICE = 980;
const CHECKOUT_READY = Boolean(
    process.env.NEXT_PUBLIC_STRIPE_HOME_ELDERLY_SELF_TRAINING_PRICE_ID
);

const JP_TEXT = "break-words [overflow-wrap:anywhere] text-pretty";

export const metadata: Metadata = {
    title: "在宅高齢者向け 自主トレ指導資料セット | 自主トレ素材庫",
    description:
        "訪問リハ・通所リハ・老健・デイサービスで使える、在宅高齢者向けの自主トレ指導資料セット。PowerPointで編集でき、PDFですぐ印刷できます。",
    alternates: {
        canonical:
            "https://jishutore-sozaiko.online/products/home-elderly-self-training/",
    },
};

const HERO_BADGES = ["980円・買い切り", "PowerPoint編集可", "PDF版つき", "6種類収録"];

const PAIN_POINTS = [
    "利用者さんごとに自主トレ資料を毎回作っている",
    "口頭説明だけでは家で継続してもらいにくい",
    "家族や介護職にも運動内容を共有したい",
    "既存資料を少し直して使える形にしたい",
    "印刷してそのまま渡せる資料がほしい",
];

const CONTENTS = [
    ["全身 自主トレメニュー", "全身をバランスよく動かしたい方向け"],
    ["上肢 自主トレメニュー", "肩・腕・手の運動を中心にしたい方向け"],
    ["下肢 自主トレメニュー", "立ち上がり・歩行・移動能力を意識したい方向け"],
    ["座位 自主トレメニュー", "座ったまま安全に運動したい方向け"],
    ["臥位 自主トレメニュー", "ベッド上で運動したい方向け"],
    ["立位 自主トレメニュー", "立位バランスや下肢筋力を意識したい方向け"],
];

const CAN_DO = [
    "PowerPoint上で文言や運動内容を編集できる",
    "利用者さんの状態に合わせて資料を調整できる",
    "PDF版を印刷してそのまま配布できる",
    "家族説明や介護職への共有にも使いやすい",
    "自主トレ資料をゼロから作る時間を減らせる",
];

const RECOMMENDED = [
    "訪問リハで自主トレ資料を毎回作っているリハビリ職",
    "通所リハ・デイサービスで自主トレ指導を行うスタッフ",
    "老健・介護施設で利用者向けの運動資料を整えたい方",
    "家族説明用に分かりやすい自主トレ資料を準備したい方",
    "PowerPointで修正できる資料がほしい方",
];

const CHECKOUT_CLASS =
    "flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-4 text-base font-black text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

function SectionHeading({ title, kicker }: { title: string; kicker?: string }) {
    return (
        <div className="mb-8 text-center sm:mb-10">
            {kicker && (
                <p className="mb-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-black tracking-widest text-blue-600">
                    {kicker}
                </p>
            )}
            <h2 className={`text-2xl font-black leading-snug text-slate-900 sm:text-3xl ${JP_TEXT}`}>
                {title}
            </h2>
        </div>
    );
}

function CheckList({ items }: { items: string[] }) {
    return (
        <ul className="grid gap-3 sm:grid-cols-2">
            {items.map((item) => (
                <li
                    key={item}
                    className={`flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm leading-relaxed text-slate-700 shadow-sm ${JP_TEXT}`}
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

function ProductCheckoutButton({ label = "980円で購入する" }: { label?: string }) {
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

export default function HomeElderlySelfTrainingPage() {
    return (
        <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
            <Header />
            <main className="flex-1">
                <section className="bg-gradient-to-b from-blue-50 via-white to-white py-12 sm:py-16">
                    <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_390px] lg:px-8">
                        <div>
                            <p className="mb-4 inline-block rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs font-black tracking-widest text-blue-700 shadow-sm">
                                在宅高齢者向け 自主トレ指導資料セット
                            </p>
                            <h1 className={`text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl ${JP_TEXT}`}>
                                在宅高齢者への自主トレ指導、
                                <br className="hidden sm:block" />
                                毎回ゼロから作っていませんか？
                            </h1>
                            <p className={`mt-5 max-w-3xl text-sm font-medium leading-relaxed text-slate-600 sm:text-base ${JP_TEXT}`}>
                                訪問リハ・通所リハ・老健・デイサービスで使いやすい、自主トレメニューのPowerPoint・PDF資料セットです。
                                全身・上肢・下肢・座位・臥位・立位の6種類を収録。
                                利用者さんの状態に合わせて編集・印刷できます。
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
                                    className="inline-flex min-h-14 w-full items-center justify-center rounded-full border-2 border-blue-200 bg-white px-7 py-4 text-base font-bold text-blue-700 transition-colors hover:bg-blue-50 sm:w-auto"
                                >
                                    商品内容を見る
                                </a>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm">
                            <Image
                                src="/products/home-elderly-self-training/thumbnail.png"
                                alt="在宅高齢者向け 自主トレ指導資料セットのサムネイル"
                                width={1792}
                                height={1024}
                                className="h-auto w-full"
                                priority
                            />
                        </div>
                    </div>
                </section>

                <section className="bg-slate-50 py-14 sm:py-20">
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading title="こんな資料作成の負担を減らせます" />
                        <CheckList items={PAIN_POINTS} />
                    </div>
                </section>

                <section id="contents" className="scroll-mt-24 bg-white py-14 sm:py-20">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading kicker="収録内容" title="6種類の自主トレメニューを収録" />
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {CONTENTS.map(([title, description], index) => (
                                <article key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <div className="mb-3 flex items-center gap-3">
                                        <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-black text-blue-600">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <h3 className={`font-black text-slate-900 ${JP_TEXT}`}>{title}</h3>
                                    </div>
                                    <p className={`text-sm leading-relaxed text-slate-600 ${JP_TEXT}`}>
                                        {description}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-slate-50 py-14 sm:py-20">
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading title="この資料でできること" />
                        <CheckList items={CAN_DO} />
                    </div>
                </section>

                <section className="bg-white py-14 sm:py-20">
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading title="こんな方におすすめ" />
                        <CheckList items={RECOMMENDED} />
                    </div>
                </section>

                <section className="bg-slate-50 py-14 sm:py-20">
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-7">
                            <h2 className="text-lg font-black text-amber-900">注意事項</h2>
                            <div className={`mt-3 space-y-3 text-sm leading-relaxed text-amber-900 sm:text-base ${JP_TEXT}`}>
                                <p>本資料は、リハビリ専門職・医療介護職が利用者さんの状態に合わせて編集・活用することを想定した資料です。</p>
                                <p>実施する運動内容や負荷量は、利用者さんの疾患・身体状況・生活環境に応じてご判断ください。</p>
                                <p>痛み・息切れ・強い疲労・ふらつきなどがある場合は、無理に実施しないようご説明ください。</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-gradient-to-b from-white to-blue-50 py-16 sm:py-24">
                    <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                        <h2 className={`text-2xl font-black leading-snug text-slate-900 sm:text-3xl ${JP_TEXT}`}>
                            自主トレ指導資料を、今日から使える形で準備しませんか？
                        </h2>
                        <p className={`mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base ${JP_TEXT}`}>
                            PowerPointで編集でき、PDFですぐ印刷できる自主トレ指導資料セットです。
                        </p>
                        <div className="mx-auto mt-8 max-w-md">
                            <ProductCheckoutButton />
                        </div>
                    </div>
                </section>

                <LineBanner />
            </main>
            <Footer />
        </div>
    );
}
