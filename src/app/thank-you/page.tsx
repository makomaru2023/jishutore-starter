import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PurchaseTracker } from "./PurchaseTracker";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "ご購入ありがとうございます｜自主トレ素材庫",
    description: "自主トレ資料セットのダウンロードページです。",
    robots: { index: false, follow: false },
};

const PRODUCT_ID = "self-training-materials-vol01";
const PRODUCT_NAME = "疾患別自主トレ資料セット";
const PRICE = 980;
const DOWNLOAD_PATH = "/products/jishutore-materials-vol01.zip";

export default async function ThankYouPage({
    searchParams,
}: {
    searchParams: Promise<{ session_id?: string; product?: string }>;
}) {
    const { session_id } = await searchParams;

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Header />
            <PurchaseTracker
                sessionId={session_id}
                productId={PRODUCT_ID}
                productName={PRODUCT_NAME}
                value={PRICE}
            />
            <main className="flex-1">
                <div className="container mx-auto max-w-2xl px-4 py-12 sm:py-16">
                    <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-9">
                        <div className="mb-5 flex justify-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-7 w-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                            </div>
                        </div>

                        <h1 className="text-center text-2xl font-black tracking-tight text-slate-900">
                            ご購入ありがとうございます
                        </h1>
                        <p className="mt-4 text-center text-sm leading-relaxed text-slate-600">
                            自主トレ資料セットをご購入いただきありがとうございます。
                            <br />
                            以下のボタンから資料セットをダウンロードしてください。
                        </p>

                        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
                            <p className="mb-2 text-sm font-bold text-slate-700">ダウンロード内容</p>
                            <ul className="space-y-1.5">
                                {[
                                    "編集できるPPTX資料",
                                    "印刷用PDF",
                                    "使い方テキスト",
                                    "利用規約テキスト",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-6">
                            <a
                                href={DOWNLOAD_PATH}
                                download
                                className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-4 text-base font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/30"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                資料セットをダウンロードする
                            </a>
                        </div>

                        <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-4">
                            <p className="text-xs leading-relaxed text-amber-800">
                                ダウンロードURLの共有、資料データそのものの再配布はご遠慮ください。
                                患者さんへの説明、家族説明、施設内資料作成にはご利用いただけます。
                            </p>
                        </div>

                        <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:justify-center">
                            <Link
                                href="/"
                                className="rounded-full border border-slate-200 px-5 py-2.5 text-center text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50"
                            >
                                トップページへ戻る
                            </Link>
                            <Link
                                href="/products"
                                className="rounded-full border border-slate-200 px-5 py-2.5 text-center text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50"
                            >
                                資料セットページへ戻る
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
