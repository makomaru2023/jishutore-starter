import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LineBanner } from "@/components/LineBanner";
import { CheckoutButton } from "@/components/CheckoutButton";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "資料セット｜疾患別自主トレ資料セット｜自主トレ素材庫",
    description:
        "リハビリ・介護現場で使いやすい自主トレ説明資料セット。編集できるPPTX・印刷用PDF・イラスト素材入り。サイト内のStripe決済で購入し、すぐにダウンロードできます。",
};

const products = [
    {
        slug: "self-training-materials",
        productId: "self-training-materials-vol01",
        name: "疾患別自主トレ資料セット",
        price: 980,
        description:
            "リハビリ・介護現場で使いやすい自主トレ説明資料をまとめたセットです。編集できるPPTX・印刷用PDF・イラスト素材が入っています。",
        cardDescription:
            "リハビリ・介護現場で使いやすい自主トレ説明資料をまとめたセットです。編集できるPPTX・印刷用PDF・イラスト素材が入っています。",
        badges: ["PowerPoint編集可", "PDF版つき", "9本セット"],
        thumbnail: "/products/self-training-materials/thumbnail.jpg",
        checkoutReady: Boolean(process.env.STRIPE_PRICE_ID_SELF_TRAINING_SET),
    },
    {
        slug: "home-elderly-self-training",
        productId: "home-elderly-self-training",
        name: "姿勢別 自主トレ指導資料セット",
        price: 980,
        description:
            "訪問リハ・通所リハ・老健・デイサービスで使いやすい、姿勢別に整理した自主トレ指導資料セットです。",
        cardDescription:
            "自主トレメニューを、全身・上肢・下肢・座位・臥位・立位の6種類で収録。PowerPointで編集でき、PDFですぐ印刷できます。",
        badges: ["PowerPoint編集可", "PDF版つき", "6種類収録"],
        thumbnail: "/products/home-elderly-self-training/thumbnail.png",
        checkoutReady: Boolean(process.env.NEXT_PUBLIC_STRIPE_HOME_ELDERLY_SELF_TRAINING_PRICE_ID),
    },
];

export default function ProductsPage() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Header />
            <main className="flex-1">
                <section className="border-b border-slate-200 bg-white">
                    <div className="container mx-auto px-4 py-12 sm:py-16">
                        <div className="mx-auto max-w-2xl text-center">
                            <p className="mb-3 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-bold tracking-widest text-blue-600">
                                資料セット
                            </p>
                            <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                                患者さんにそのまま使える自主トレ資料セット
                            </h1>
                            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                                自主トレ素材庫のイラストを使って、リハビリ・介護現場で使いやすい説明資料をまとめました。
                                編集できるPPTXと印刷用PDFが入った買い切りの資料セットです。
                            </p>
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-4 py-12 sm:py-16">
                    <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
                        {products.map((product) => (
                            <article
                                key={product.slug}
                                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-blue-200 hover:shadow-md"
                            >
                                <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-xl bg-blue-50">
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
                                </div>
                                <h2 className="break-words text-base font-black leading-snug text-slate-900 group-hover:text-blue-600">
                                    {product.name}
                                </h2>
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
                                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                                    {product.cardDescription}
                                </p>
                                <div className="mt-4 flex items-center justify-between gap-3">
                                    <span className="text-xl font-black text-slate-900">
                                        ¥{product.price.toLocaleString()}
                                        <span className="ml-1 text-xs font-bold text-slate-400">買い切り</span>
                                    </span>
                                </div>
                                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                                    <Link
                                        href={`/products/${product.slug}`}
                                        className="inline-flex min-h-12 items-center justify-center gap-1 rounded-full border border-blue-200 px-4 py-3 text-center text-sm font-bold text-blue-700 transition-colors hover:bg-blue-50"
                                    >
                                        詳細を見る
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3.5 w-3.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6 21 12m0 0-7.5 6M21 12H3" />
                                        </svg>
                                    </Link>
                                    <CheckoutButton
                                        productId={product.productId}
                                        productName={product.name}
                                        price={product.price}
                                        label="購入する"
                                        disabled={!product.checkoutReady}
                                        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-center text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                                    />
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <LineBanner />
            </main>
            <Footer />
        </div>
    );
}
