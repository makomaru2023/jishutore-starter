import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LineBanner } from "@/components/LineBanner";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "資料セット｜疾患別自主トレ資料セット｜自主トレ素材庫",
    description:
        "リハビリ・介護現場で使いやすい自主トレ説明資料セット。編集できるPPTX・印刷用PDF・イラスト素材入り。サイト内のStripe決済で購入し、すぐにダウンロードできます。",
};

const products = [
    {
        slug: "self-training-materials",
        name: "疾患別自主トレ資料セット",
        price: 980,
        description:
            "リハビリ・介護現場で使いやすい自主トレ説明資料をまとめたセットです。編集できるPPTX・印刷用PDF・イラスト素材が入っています。",
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
                    <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
                        {products.map((product) => (
                            <Link
                                key={product.slug}
                                href={`/products/${product.slug}`}
                                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-blue-200 hover:shadow-md"
                            >
                                <div className="relative mb-4 flex items-center justify-center rounded-xl bg-blue-50 py-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-14 w-14 text-blue-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                    </svg>
                                    <span className="absolute top-2 right-2 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700">
                                        準備中
                                    </span>
                                </div>
                                <h2 className="text-base font-black leading-snug text-slate-900 group-hover:text-blue-600">
                                    {product.name}
                                </h2>
                                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                                    {product.description}
                                </p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-xl font-black text-slate-900">
                                        ¥{product.price.toLocaleString()}
                                        <span className="ml-1 text-xs font-bold text-slate-400">買い切り</span>
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-sm font-bold text-blue-600">
                                        詳細を見る
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3.5 w-3.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6 21 12m0 0-7.5 6M21 12H3" />
                                        </svg>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                <LineBanner />
            </main>
            <Footer />
        </div>
    );
}
