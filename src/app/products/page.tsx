import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LineBanner } from "@/components/LineBanner";
import { CheckoutButton } from "@/components/CheckoutButton";
import { SponsorAdPlaceholder } from "@/components/SponsorAdPlaceholder";
import { ProductSelectLink } from "@/components/ProductSelectLink";
import {
    POSTURE_SELF_TRAINING_PRICE_ID,
    BUNDLE_SELF_TRAINING_PRICE_ID,
    SLIDE_PROMPT_GENERATOR_PRICE_ID,
} from "@/lib/products";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "資料セット｜疾患別／姿勢別の選び方｜自主トレ素材庫",
    description:
        "退院前指導・訪問リハ・通所リハで使いやすい、編集可能なPowerPoint資料と印刷用PDFを用意。疾患名から選ぶ資料と、今できる姿勢から選ぶ資料の違いと選び方を比較できます。",
};

const CONDITION_HREF = "/products/self-training-materials/";
const POSTURE_HREF = "/products/home-elderly-self-training/";

const products = [
    {
        slug: "self-training-materials",
        productId: "self-training-materials-vol01",
        name: "疾患別自主トレ資料セット",
        price: 980,
        description:
            "脳卒中・腰痛・膝OA・術後など、疾患ごとの自主トレ説明を時短したい方向け。退院前指導・訪問リハ・家族説明に使いやすい9疾患セットです。",
        badges: ["疾患名から選ぶ", "9疾患収録", "退院前指導向け", "訪問リハ向け", "PPTX編集可", "PDF版つき"],
        thumbnail: "/products/self-training-materials/thumbnail.jpg",
        checkoutReady: Boolean(process.env.STRIPE_PRICE_ID_SELF_TRAINING_SET),
        accent: "疾患名から選ぶ",
    },
    {
        slug: "home-elderly-self-training",
        productId: "home-elderly-self-training",
        name: "姿勢別自主トレ指導資料セット",
        price: 980,
        description:
            "座位・立位・臥位など、利用者さんの「今できる姿勢」から運動を選びたい方向け。訪問リハ・通所リハ・在宅高齢者の指導に使いやすい資料セットです。",
        badges: ["姿勢から選ぶ", "座位・立位・臥位", "在宅高齢者向け", "通所リハ向け", "PPTX編集可", "PDF版つき"],
        thumbnail: "/products/home-elderly-self-training/thumbnail.png",
        checkoutReady: Boolean(POSTURE_SELF_TRAINING_PRICE_ID),
        accent: "姿勢から選ぶ",
    },
];

const compareCards = [
    {
        heading: "疾患名から選びたい方へ",
        description:
            "脳卒中・腰痛・膝OA・術後など、疾患ごとの自主トレ説明を整理したいときに使いやすい資料セットです。",
        scenarios: [
            "退院前指導",
            "訪問リハ",
            "家族説明",
            "疾患別の注意点を説明したいとき",
        ],
        ctaLabel: "疾患別セットを見る",
        href: CONDITION_HREF,
        itemName: "疾患別自主トレ資料セット",
    },
    {
        heading: "今できる姿勢から選びたい方へ",
        description:
            "座位・立位・臥位など、対象者の体力や転倒リスクに合わせて運動を選びたいときに使いやすい資料セットです。",
        scenarios: [
            "訪問リハ",
            "通所リハ",
            "在宅高齢者の自主トレ指導",
            "ベッド上・座位・立位で使い分けたいとき",
        ],
        ctaLabel: "姿勢別セットを見る",
        href: POSTURE_HREF,
        itemName: "姿勢別自主トレ指導資料セット",
    },
];

type CompareRow = { item: string; condition: string; posture: string };
const compareRows: CompareRow[] = [
    {
        item: "選び方",
        condition: "疾患名から選ぶ",
        posture: "今できる姿勢から選ぶ",
    },
    {
        item: "向いている場面",
        condition: "疾患ごとの注意点や運動内容を説明したいとき",
        posture: "体力・転倒リスク・動作能力に合わせたいとき",
    },
    {
        item: "主な対象",
        condition: "脳卒中・腰痛・膝OA・術後 など",
        posture: "在宅高齢者・訪問リハ利用者・通所リハ利用者 など",
    },
    {
        item: "使いやすいシーン",
        condition: "退院前指導／訪問リハ／疾患別の家族説明",
        posture: "訪問リハ／通所リハ／集団体操／ベッド上自主トレ",
    },
    {
        item: "商品の役割",
        condition: "疾患ごとの自主トレ説明を時短する資料",
        posture: "能力や安全性に合わせて運動を選ぶ資料",
    },
];

const bundleCheckoutReady = Boolean(BUNDLE_SELF_TRAINING_PRICE_ID);
const slidePromptCheckoutReady = Boolean(SLIDE_PROMPT_GENERATOR_PRICE_ID);

export default function ProductsPage() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Header />
            <main className="flex-1 [&_p]:break-keep [&_h1]:break-keep [&_h2]:break-keep [&_h3]:break-keep">
                {/* 1. Hero */}
                <section className="border-b border-slate-200 bg-gradient-to-b from-blue-50/60 via-white to-white">
                    <div className="container mx-auto px-4 py-12 sm:py-16">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="mb-3 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold tracking-widest text-blue-700 border border-blue-100">
                                資料セット 選び方ガイド
                            </p>
                            <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl break-keep">
                                患者さんに渡せる自主トレ資料セット
                            </h1>
                            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base break-keep">
                                退院前指導・訪問リハ・通所リハで使いやすい、編集可能なPowerPoint資料と印刷用PDFをまとめました。<strong className="text-slate-800">疾患名から選ぶ資料</strong>と<strong className="text-slate-800">今できる姿勢から選ぶ資料</strong>を、用途に合わせて使い分けできます。
                            </p>
                            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                                <Link
                                    href="#compare"
                                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-500"
                                >
                                    どちらを選べばいいか見る
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3.5 w-3.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </Link>
                                <Link
                                    href="#bundle"
                                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-6 py-3 text-sm font-bold text-amber-800 transition-colors hover:bg-amber-100"
                                >
                                    <span className="text-[11px] font-black tracking-wider text-amber-700">★お得</span>
                                    2点セット 1,480円
                                </Link>
                                <Link
                                    href="#products"
                                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition-colors hover:border-blue-200 hover:text-blue-700"
                                >
                                    商品一覧を見る
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. どちらを選べばいい？ */}
                <section id="compare" className="bg-white py-14 sm:py-20 scroll-mt-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-3xl text-center mb-10">
                            <h2 className="text-xl sm:text-3xl font-black text-slate-900 mb-3 break-keep">
                                どちらの資料セットを選べばいい？
                            </h2>
                            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                                疾患名から資料を選びたい方は<strong className="text-slate-800">「疾患別セット」</strong>。座位・立位・臥位など、今できる姿勢から運動を選びたい方は<strong className="text-slate-800">「姿勢別セット」</strong>がおすすめです。
                            </p>
                        </div>
                        <div className="mx-auto grid grid-cols-1 max-w-5xl gap-5 sm:grid-cols-2">
                            {compareCards.map((c) => (
                                <div
                                    key={c.heading}
                                    className="flex min-w-0 flex-col rounded-3xl border border-blue-100 bg-blue-50/30 p-6 sm:p-7"
                                >
                                    <h3 className="mb-3 text-base sm:text-lg font-black text-slate-900 leading-snug break-keep">
                                        {c.heading}
                                    </h3>
                                    <p className="mb-4 text-sm leading-relaxed text-slate-600">
                                        {c.description}
                                    </p>
                                    <div className="mb-5 flex-1">
                                        <p className="mb-2 text-[11px] font-bold tracking-widest text-blue-700">
                                            向いている場面
                                        </p>
                                        <ul className="space-y-1.5">
                                            {c.scenarios.map((s) => (
                                                <li key={s} className="flex items-start gap-2 text-sm text-slate-700">
                                                    <span className="mt-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="h-2.5 w-2.5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                        </svg>
                                                    </span>
                                                    <span className="leading-relaxed min-w-0 break-keep">{s}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <ProductSelectLink
                                        href={c.href}
                                        itemName={c.itemName}
                                        location="products_compare"
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm shadow-blue-600/20 transition-all hover:bg-blue-500"
                                    >
                                        {c.ctaLabel}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3.5 w-3.5 flex-shrink-0">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6 21 12m0 0-7.5 6M21 12H3" />
                                        </svg>
                                    </ProductSelectLink>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. 比較表 */}
                <section id="compare-table" className="bg-slate-50 py-14 sm:py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-xl sm:text-3xl font-black text-slate-900 mb-3 break-keep">
                                疾患別セットと姿勢別セットの違い
                            </h2>
                        </div>

                        {/* スマホ・小タブレット（〜767px）：2カード積み */}
                        <div className="grid gap-5 md:hidden">
                            {[
                                {
                                    name: "疾患別自主トレ資料セット",
                                    rows: compareRows.map((r) => ({ item: r.item, value: r.condition })),
                                    href: CONDITION_HREF,
                                    itemName: "疾患別自主トレ資料セット",
                                },
                                {
                                    name: "姿勢別自主トレ指導資料セット",
                                    rows: compareRows.map((r) => ({ item: r.item, value: r.posture })),
                                    href: POSTURE_HREF,
                                    itemName: "姿勢別自主トレ指導資料セット",
                                },
                            ].map((c) => (
                                <div key={c.name} className="rounded-2xl border border-slate-200 bg-white p-5">
                                    <h3 className="mb-4 text-sm font-black leading-snug text-slate-900 break-keep">
                                        {c.name}
                                    </h3>
                                    <dl className="space-y-3">
                                        {c.rows.map((row) => (
                                            <div key={row.item} className="border-b border-slate-100 pb-2 last:border-b-0">
                                                <dt className="text-[11px] font-bold tracking-widest text-blue-700">
                                                    {row.item}
                                                </dt>
                                                <dd className="mt-0.5 text-sm text-slate-700 leading-relaxed break-keep">
                                                    {row.value}
                                                </dd>
                                            </div>
                                        ))}
                                    </dl>
                                    <ProductSelectLink
                                        href={c.href}
                                        itemName={c.itemName}
                                        location="products_compare"
                                        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-blue-500 bg-white px-5 py-2.5 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                                    >
                                        詳しく見る
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3.5 w-3.5 flex-shrink-0">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6 21 12m0 0-7.5 6M21 12H3" />
                                        </svg>
                                    </ProductSelectLink>
                                </div>
                            ))}
                        </div>

                        {/* PC（md以上）：横並びテーブル */}
                        <div className="hidden md:block max-w-5xl mx-auto">
                            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                                <table className="w-full text-sm">
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            <th className="w-1/5 p-4 text-left text-xs font-bold tracking-widest text-slate-500"></th>
                                            <th className="p-4 text-left text-sm font-black text-blue-700 break-keep">
                                                疾患別自主トレ資料セット
                                            </th>
                                            <th className="p-4 text-left text-sm font-black text-blue-700 break-keep">
                                                姿勢別自主トレ指導資料セット
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {compareRows.map((row, i) => (
                                            <tr key={row.item} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/40"}>
                                                <td className="p-4 align-top font-bold text-slate-600 text-xs tracking-wider whitespace-nowrap">
                                                    {row.item}
                                                </td>
                                                <td className="p-4 align-top text-slate-700 leading-relaxed break-keep">
                                                    {row.condition}
                                                </td>
                                                <td className="p-4 align-top text-slate-700 leading-relaxed break-keep">
                                                    {row.posture}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="grid grid-cols-2 gap-3 border-t border-slate-200 bg-slate-50 p-4">
                                    <ProductSelectLink
                                        href={CONDITION_HREF}
                                        itemName="疾患別自主トレ資料セット"
                                        location="products_compare"
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-500"
                                    >
                                        疾患別セットを見る
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3.5 w-3.5 flex-shrink-0">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6 21 12m0 0-7.5 6M21 12H3" />
                                        </svg>
                                    </ProductSelectLink>
                                    <ProductSelectLink
                                        href={POSTURE_HREF}
                                        itemName="姿勢別自主トレ指導資料セット"
                                        location="products_compare"
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-500"
                                    >
                                        姿勢別セットを見る
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3.5 w-3.5 flex-shrink-0">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6 21 12m0 0-7.5 6M21 12H3" />
                                        </svg>
                                    </ProductSelectLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3.5 まとめ買いセット プロモバナー（比較→商品の間に「迷ったら」訴求） */}
                <section className="bg-white py-8 sm:py-10">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-4xl">
                            <Link
                                href="#bundle"
                                className="group block rounded-3xl border border-amber-200 bg-gradient-to-r from-amber-50 via-amber-50/60 to-white p-5 transition-all hover:border-amber-300 hover:shadow-md sm:p-7"
                            >
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                                    <div className="min-w-0 flex-1">
                                        <p className="mb-1 inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-black tracking-widest text-amber-800">
                                            ★ 迷う方におすすめ
                                        </p>
                                        <h3 className="text-base font-black leading-snug text-slate-900 sm:text-lg break-keep">
                                            両方使うなら、2点まとめ買いセットがお得です
                                        </h3>
                                        <p className="mt-1.5 text-sm leading-relaxed text-slate-600 break-keep">
                                            退院前指導は疾患別、在宅高齢者の指導は姿勢別…と<strong className="text-slate-800">場面に応じて使い分けたい方</strong>へ。
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0 text-center sm:text-right">
                                        <p className="text-xs font-bold text-slate-500">
                                            通常 <span className="line-through">1,960円</span>
                                        </p>
                                        <p className="flex items-baseline justify-center gap-1 sm:justify-end">
                                            <span className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">1,480</span>
                                            <span className="text-sm font-bold text-slate-700">円</span>
                                        </p>
                                        <p className="text-[11px] font-black text-amber-700">
                                            480円お得・買い切り
                                        </p>
                                        <span className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-amber-700 group-hover:text-amber-800">
                                            セット詳細を見る
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 4. 商品カード */}
                <section id="products" className="bg-white py-14 sm:py-20 scroll-mt-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-xl sm:text-3xl font-black text-slate-900 mb-3 break-keep">
                                資料セット
                            </h2>
                            <p className="text-sm text-slate-500 font-medium">
                                どちらも 980円・買い切り
                            </p>
                        </div>
                        <div className="mx-auto grid grid-cols-1 max-w-5xl gap-6 sm:grid-cols-2">
                            {products.map((product) => (
                                <article
                                    key={product.slug}
                                    className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-blue-200 hover:shadow-md"
                                >
                                    <Link
                                        href={`/products/${product.slug}`}
                                        aria-label={`${product.name}の詳細ページを見る`}
                                        className="relative mb-4 block aspect-video w-full overflow-hidden rounded-xl bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    >
                                        {product.thumbnail ? (
                                            <Image
                                                src={product.thumbnail}
                                                alt={`${product.name} サムネイル`}
                                                fill
                                                sizes="(min-width: 640px) 50vw, 100vw"
                                                className="object-cover transition-transform group-hover:scale-105"
                                                priority
                                            />
                                        ) : null}
                                    </Link>
                                    <p className="mb-1 inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold tracking-wider text-blue-700 self-start">
                                        {product.accent}
                                    </p>
                                    <h3 className="text-base font-black leading-snug text-slate-900 group-hover:text-blue-600 break-keep">
                                        {product.name}
                                    </h3>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {product.badges.map((badge) => (
                                            <span
                                                key={badge}
                                                className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700"
                                            >
                                                {badge}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 break-keep">
                                        {product.description}
                                    </p>
                                    <div className="mt-4 flex items-center justify-between gap-3">
                                        <span className="text-xl font-black text-slate-900 whitespace-nowrap">
                                            ¥{product.price.toLocaleString()}
                                            <span className="ml-1 text-xs font-bold text-slate-400">買い切り</span>
                                        </span>
                                    </div>
                                    <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                        <Link
                                            href={`/products/${product.slug}`}
                                            className="inline-flex min-h-12 items-center justify-center gap-1 rounded-full border border-blue-200 px-4 py-3 text-center text-sm font-bold text-blue-700 transition-colors hover:bg-blue-50"
                                        >
                                            詳細を見る
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3.5 w-3.5 flex-shrink-0">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6 21 12m0 0-7.5 6M21 12H3" />
                                            </svg>
                                        </Link>
                                        <CheckoutButton
                                            productId={product.productId}
                                            productName={product.name}
                                            price={product.price}
                                            label="980円で購入する"
                                            disabled={!product.checkoutReady}
                                            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-center text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                                        />
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. まとめ買いセット */}
                <section id="bundle" className="bg-slate-50 py-14 sm:py-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-4xl">
                            <div className="text-center mb-8">
                                <p className="mb-3 inline-block rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold tracking-widest text-amber-700 border border-amber-100">
                                    お得なセット
                                </p>
                                <h2 className="text-xl sm:text-3xl font-black text-slate-900 mb-3 break-keep">
                                    迷う方は、2点セットもおすすめです
                                </h2>
                            </div>
                            <div className="rounded-3xl border border-blue-100 bg-white p-6 sm:p-10 shadow-sm">
                                <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="mb-2 text-lg font-black leading-snug text-slate-900 sm:text-xl break-keep">
                                            疾患別＋姿勢別 まとめ買いセット
                                        </h3>
                                        <p className="text-sm leading-relaxed text-slate-600 break-keep">
                                            疾患名から選ぶ資料と、今できる姿勢から選ぶ資料をまとめて使えるセットです。退院前指導・訪問リハ・通所リハで、自主トレ資料をより選びやすくなります。
                                        </p>
                                        <ul className="mt-4 space-y-1.5 text-sm text-slate-700">
                                            {[
                                                "疾患別9セット＋姿勢別6種を両方カバー",
                                                "場面に応じて「疾患から」or「姿勢から」を選べる",
                                                "PowerPoint編集OK・PDF印刷用つき",
                                            ].map((it) => (
                                                <li key={it} className="flex items-start gap-2">
                                                    <span className="mt-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="h-2.5 w-2.5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                        </svg>
                                                    </span>
                                                    <span className="leading-relaxed min-w-0 break-keep">{it}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="md:w-64 md:flex-shrink-0">
                                        <div className="rounded-2xl bg-blue-50/60 border border-blue-100 px-4 py-5 text-center">
                                            <p className="text-xs font-bold text-slate-500">
                                                通常 <span className="line-through">1,960円</span>
                                            </p>
                                            <p className="mt-1 flex items-baseline justify-center gap-1">
                                                <span className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">1,480</span>
                                                <span className="text-sm font-bold text-slate-700">円</span>
                                            </p>
                                            <p className="text-[11px] font-bold text-amber-700 mt-1">
                                                480円お得・買い切り
                                            </p>
                                            {bundleCheckoutReady ? (
                                                <div className="mt-4">
                                                    <CheckoutButton
                                                        productId="bundle-self-training-set"
                                                        productName="疾患別＋姿勢別 まとめ買いセット"
                                                        price={1480}
                                                        label="2点セットを購入する"
                                                        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-center text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="mt-4">
                                                    <Link
                                                        href="/#line"
                                                        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-slate-900 text-white px-4 py-3 text-sm font-bold transition-colors hover:bg-slate-800"
                                                    >
                                                        LINEで販売開始を受け取る
                                                    </Link>
                                                    <p className="mt-2 text-[11px] leading-relaxed text-slate-500 break-keep">
                                                        セット販売は準備中です。販売開始はLINEでお知らせします。
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5.5 制作ツール（プロンプト工房）
                    公開条件: STRIPE_PRICE_ID_SLIDE_PROMPT_GENERATOR が設定されたら自動的に公開される。
                    未設定時は /products カタログから完全に非表示（LP自体は直URLで参照可、noindex 設定済み）。 */}
                {slidePromptCheckoutReady && (
                <section id="tools" className="bg-white py-14 sm:py-20 scroll-mt-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-4xl">
                            <div className="text-center mb-8">
                                <p className="mb-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-[11px] font-black tracking-widest text-blue-700 border border-blue-100">
                                    制作ツール
                                </p>
                                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 break-keep">
                                    自分で資料を作る方には、プロンプト工房も
                                </h2>
                                <p className="text-sm sm:text-base text-slate-600 leading-relaxed break-keep">
                                    既製の資料セットではなく、ChatGPT で自分の現場にあわせた資料を作りたい方向けの購入者専用ツールです。
                                </p>
                            </div>
                            <div className="rounded-3xl border border-blue-100 bg-white p-6 sm:p-8 shadow-sm">
                                <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
                                    <div className="min-w-0 flex-1">
                                        <p className="mb-2 inline-block rounded-full bg-sky-50 px-2.5 py-0.5 text-[11px] font-bold tracking-wider text-sky-700 border border-sky-100">
                                            Webツール（ブラウザで完結）
                                        </p>
                                        <h3 className="mb-2 text-lg font-black leading-snug text-slate-900 sm:text-xl break-keep">
                                            伝わるプロンプト工房
                                        </h3>
                                        <p className="text-sm leading-relaxed text-slate-600 break-keep">
                                            用途・テーマ・枚数を選ぶだけで、ChatGPT にそのまま貼り付けられるスライド画像生成プロンプトが完成します。家族説明・勉強会・利用者説明・退院前指導の資料づくりに。
                                        </p>
                                        <ul className="mt-4 space-y-1.5 text-sm text-slate-700">
                                            {[
                                                "ChatGPT 直貼り対応のプロンプトを自動生成",
                                                "家族説明・勉強会・利用者説明など用途別テンプレ",
                                                "チェック式UIで誰でもすぐ使える",
                                                "永久アクセス・買い切り",
                                            ].map((it) => (
                                                <li key={it} className="flex items-start gap-2">
                                                    <span className="mt-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="h-2.5 w-2.5" aria-hidden="true">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                        </svg>
                                                    </span>
                                                    <span className="leading-relaxed min-w-0 break-keep">{it}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="md:w-64 md:flex-shrink-0">
                                        <div className="rounded-2xl bg-blue-50/60 border border-blue-100 px-4 py-5 text-center">
                                            <p className="text-xs font-bold text-slate-500">
                                                買い切り・永久アクセス
                                            </p>
                                            <p className="mt-1 flex items-baseline justify-center gap-1">
                                                <span className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">980</span>
                                                <span className="text-sm font-bold text-slate-700">円</span>
                                            </p>
                                            <p className="text-[11px] font-bold text-blue-700 mt-1">
                                                追加課金なし
                                            </p>
                                            <div className="mt-4 grid gap-2">
                                                <CheckoutButton
                                                    productId="slide-prompt-generator"
                                                    productName="伝わるプロンプト工房"
                                                    price={980}
                                                    label="980円で購入する"
                                                    disabled={!slidePromptCheckoutReady}
                                                    className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-center text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                                                />
                                                <Link
                                                    href="/products/slide-prompt-generator"
                                                    className="flex min-h-10 w-full items-center justify-center gap-1 rounded-full border border-blue-200 px-4 py-2 text-xs font-bold text-blue-700 transition-colors hover:bg-blue-50"
                                                >
                                                    詳細を見る
                                                </Link>
                                            </div>
                                            {!slidePromptCheckoutReady && (
                                                <p className="mt-2 text-[11px] leading-relaxed text-slate-500 break-keep">
                                                    現在販売準備中です。
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                )}

                {/* 6. LINE 無料特典（購入前サンプル位置づけ） */}
                <section className="bg-white py-14 sm:py-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-3xl text-center mb-6">
                            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 break-keep">
                                購入前に雰囲気を確認したい方へ
                            </h2>
                            <p className="text-sm sm:text-base text-slate-600 leading-relaxed break-keep">
                                有料資料の一部サンプルと、自主トレ継続に役立つ補助シートをLINEで配布しています。すべての資料を編集して使いたい方は、有料版をご利用ください。
                            </p>
                        </div>
                        <div className="mx-auto max-w-5xl">
                            <LineBanner />
                        </div>
                    </div>
                </section>

                {/* スポンサー枠（フッター上） */}
                <section className="container mx-auto px-4 py-10">
                    <div className="max-w-5xl mx-auto">
                        <SponsorAdPlaceholder variant="compact" />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
