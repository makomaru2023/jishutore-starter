import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutButton } from "@/components/CheckoutButton";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LineBanner } from "@/components/LineBanner";
import { PlusSubscribeButton } from "@/components/plus/PlusSubscribeButton";
import { PLUS_SLIDE_COUNT } from "@/constants/plus";
import { PLUS_CURRENT_PRICE } from "@/lib/plus-subscription";
import { SLIDE_PROMPT_GENERATOR_PRICE_ID } from "@/lib/products";

export const metadata: Metadata = {
    title: "有料コンテンツ一覧｜自主トレ素材庫",
    description:
        "自主トレ素材庫Plus、疾患別自主トレ資料、伝わるプロンプト工房を目的別に選べる一覧ページです。継続課金と買い切りを比較せず、使いたい目的から探せます。",
    alternates: {
        canonical: "https://jishutore-sozaiko.online/products/",
    },
};

const LINE_URL = "https://lin.ee/79a5bNt";
const ONE_TIME_LABEL = "買い切り・¥980";

const purposeLinks = [
    {
        purpose: "毎月新しい素材を使いたい",
        label: "Plusを見る",
        href: "#plus",
    },
    {
        purpose: "特定の疾患の資料が今すぐ欲しい",
        label: "疾患別資料を見る",
        href: "#self-training-materials",
    },
    {
        purpose: "患者さんに伝わる指導文を作りたい",
        label: "プロンプト工房を見る",
        href: "#slide-prompt-generator",
    },
] as const;

type OneTimeProduct = {
    id: string;
    name: string;
    href: string;
    productId: string;
    target: string;
    summary: string;
    points: string[];
    checkoutReady: boolean;
};

const oneTimeProducts: OneTimeProduct[] = [
    {
        id: "self-training-materials",
        name: "疾患別自主トレ資料",
        href: "/products/self-training-materials/",
        productId: "self-training-materials-vol01",
        target: "疾患名から自主トレ資料を選びたい方向け",
        summary:
            "脳卒中・腰痛・膝OA・術後など、疾患ごとの説明資料をPowerPointとPDFで使えます。",
        points: ["9疾患収録", "PowerPoint編集可", "PDF版つき"],
        checkoutReady: Boolean(process.env.STRIPE_PRICE_ID_SELF_TRAINING_SET),
    },
    {
        id: "slide-prompt-generator",
        name: "伝わるプロンプト工房",
        href: "/products/slide-prompt-generator/",
        productId: "slide-prompt-generator",
        target: "患者さん向けの指導文や説明文を作りたい方向け",
        summary:
            "用途・テーマ・枚数を選び、ChatGPTに貼り付けやすい資料作成プロンプトを作れます。",
        points: ["ブラウザで完結", "用途別テンプレ", "永久アクセス"],
        checkoutReady: Boolean(SLIDE_PROMPT_GENERATOR_PRICE_ID),
    },
];

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6 21 12m0 0-7.5 6M21 12H3" />
        </svg>
    );
}

function OneTimeProductCard({ product }: { product: OneTimeProduct }) {
    return (
        <article
            id={product.id}
            className="flex scroll-mt-24 flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
            <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
                    {ONE_TIME_LABEL}
                </span>
            </div>
            <h3 className="text-lg font-black leading-snug text-slate-950 sm:text-xl">
                {product.name}
            </h3>
            <p className="mt-2 text-sm font-bold leading-6 text-slate-700">
                {product.target}
            </p>
            <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                {product.summary}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
                {product.points.map((point) => (
                    <li key={point} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600">
                        {point}
                    </li>
                ))}
            </ul>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
                <Link
                    href={product.href}
                    className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full border border-blue-200 bg-white px-4 py-3 text-sm font-black text-blue-700 transition hover:bg-blue-50"
                >
                    詳細を見る
                    <ArrowIcon className="h-3.5 w-3.5" />
                </Link>
                <CheckoutButton
                    productId={product.productId}
                    productName={product.name}
                    price={980}
                    label="購入する"
                    disabled={!product.checkoutReady}
                    className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-700 px-4 py-3 text-sm font-black text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                />
            </div>
        </article>
    );
}

export default function ProductsPage() {
    const plusCheckoutReady = Boolean(PLUS_CURRENT_PRICE);

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Header />
            <main className="flex-1 [&_h1]:break-keep [&_h2]:break-keep [&_h3]:break-keep [&_p]:break-keep">
                <section className="border-b border-slate-200 bg-white">
                    <div className="container mx-auto px-4 py-12 sm:py-16">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-xs font-black tracking-widest text-blue-700">有料コンテンツ</p>
                            <h1 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
                                有料コンテンツ一覧
                            </h1>
                            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                                毎月使う素材、今すぐ使う資料、指導文づくり。
                                目的に合わせて選べます。
                            </p>
                        </div>
                    </div>
                </section>

                <section className="border-b border-slate-200 bg-slate-50 py-8 sm:py-10">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-5xl">
                            <h2 className="text-lg font-black text-slate-950">目的から選ぶ</h2>
                            <div className="mt-4 grid gap-3 md:grid-cols-3">
                                {purposeLinks.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="flex min-h-28 flex-col justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:bg-blue-50"
                                    >
                                        <span className="text-sm font-black leading-6 text-slate-900">
                                            {item.purpose}
                                        </span>
                                        <span className="mt-3 inline-flex items-center gap-1 text-sm font-black text-blue-700">
                                            {item.label}
                                            <ArrowIcon className="h-3.5 w-3.5" />
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section id="plus" className="scroll-mt-24 bg-white py-12 sm:py-16">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto grid max-w-5xl gap-6 rounded-lg border border-blue-200 bg-blue-50 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center">
                            <div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="rounded-full bg-blue-700 px-3 py-1 text-xs font-black text-white">
                                        継続課金
                                    </span>
                                    <span className="rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-black text-blue-800">
                                        現在の申込価格で決済
                                    </span>
                                </div>
                                <h2 className="mt-4 text-2xl font-black text-slate-950 sm:text-3xl">
                                    自主トレ素材庫Plus
                                </h2>
                                <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
                                    {PLUS_SLIDE_COUNT}点のPowerPointスライドから必要なページを選び、
                                    説明文や注意点を編集して使える月額サービスです。
                                    新しい素材や報酬チェックも継続して追加します。
                                </p>
                                <p className="mt-3 text-xs leading-6 text-slate-500">
                                    価格はStripeの現在設定に従います。キャンペーン価格の切り替え時も、
                                    決済導線側の設定を優先します。
                                </p>
                            </div>
                            <div className="rounded-lg border border-blue-200 bg-white p-4">
                                <p className="text-xs font-black tracking-widest text-blue-700">収録数</p>
                                <p className="mt-1 text-3xl font-black text-slate-950">{PLUS_SLIDE_COUNT}点</p>
                                <p className="mt-1 text-xs font-bold text-slate-500">毎月追加中</p>
                                <div className="mt-4 grid gap-2">
                                    {plusCheckoutReady ? (
                                        <PlusSubscribeButton
                                            label="申し込みページへ進む"
                                            className="inline-flex w-full items-center justify-center rounded-full bg-blue-700 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-blue-800"
                                        />
                                    ) : (
                                        <span className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-black text-slate-400">
                                            準備中
                                        </span>
                                    )}
                                    <Link
                                        href="/products/jishutore-plus/"
                                        className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-blue-200 bg-white px-5 py-2.5 text-sm font-black text-blue-700 transition hover:bg-blue-50"
                                    >
                                        詳細を見る
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-slate-50 py-12 sm:py-16">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-5xl">
                            <div className="mb-6">
                                <p className="text-xs font-black tracking-widest text-blue-700">買い切り</p>
                                <h2 className="mt-2 text-2xl font-black text-slate-950">
                                    必要なものだけ購入する
                                </h2>
                                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                                    追加課金なしで使える単品コンテンツです。
                                    資料そのものが欲しい場合と、指導文づくりを助けたい場合で選べます。
                                </p>
                            </div>
                            <div className="grid gap-5 md:grid-cols-2">
                                {oneTimeProducts.map((product) => (
                                    <OneTimeProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white py-12 sm:py-16">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-5xl">
                            <div className="mb-5 text-center">
                                <h2 className="text-2xl font-black text-slate-950">どれが合うかわからない方へ</h2>
                                <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                                    新作やアップデートのお知らせはLINEで受け取れます。
                                    迷う場合は、まず無料特典から雰囲気を確認できます。
                                </p>
                                <a
                                    href={LINE_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-black text-white transition hover:bg-slate-800"
                                >
                                    LINEで案内を受け取る
                                </a>
                            </div>
                            <LineBanner />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
