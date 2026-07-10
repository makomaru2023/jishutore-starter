import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function ItemNotFound() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Header />
            <main className="flex flex-1 items-center justify-center px-4 py-16">
                <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                    <p className="text-sm font-black tracking-widest text-teal-600">404</p>
                    <h1 className="mt-3 text-2xl font-black text-slate-950">素材が見つかりませんでした</h1>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                        URLが変更されたか、素材が整理された可能性があります。
                        素材一覧から、名称や部位で検索してください。
                    </p>
                    <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                        <Link
                            href="/items/"
                            className="inline-flex min-h-12 items-center justify-center rounded-full bg-teal-500 px-6 py-3 text-sm font-black text-white transition hover:bg-teal-400"
                        >
                            素材一覧で探す
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
                        >
                            トップへ戻る
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
