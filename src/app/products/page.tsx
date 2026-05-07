import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LineBanner } from "@/components/LineBanner";
import { products } from "@/lib/products";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "商品一覧｜PT・OT・ST向け 自主トレ資料・ツール｜自主トレ素材庫",
    description:
        "リハビリ職（PT・OT・ST）向けの有料商品一覧。自主トレ説明資料スライドやAIイラスト生成ツールなど、現場の資料作成を時短する商品をnoteで販売しています。",
};

function formatDate(iso: string): string {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

export default function ProductsPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero */}
                <section className="bg-slate-900 pt-16 pb-20 relative overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-10 left-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-10 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl" />
                    </div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="mx-auto max-w-3xl text-center space-y-5">
                            <p className="inline-block px-4 py-1.5 rounded-full bg-slate-800 text-teal-400 font-bold text-sm tracking-widest border border-slate-700">
                                PRODUCTS
                            </p>
                            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
                                商品一覧
                            </h1>
                            <p className="text-base sm:text-lg text-slate-300 font-medium max-w-2xl mx-auto">
                                リハビリ現場の資料作成を時短する、
                                <br className="hidden sm:block" />
                                スライド資料・AIツールなどをnoteで販売しています。
                            </p>
                        </div>
                    </div>
                    <div
                        className="absolute bottom-0 left-0 right-0 h-12 bg-slate-50"
                        style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)" }}
                    />
                </section>

                {/* Product list */}
                <section className="py-16 sm:py-20">
                    <div className="container mx-auto px-4">
                        {products.length === 0 ? (
                            <p className="text-center text-slate-500 py-20">
                                現在公開中の商品はありません。
                            </p>
                        ) : (
                            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                                {products.map((product) => (
                                    <li key={product.id}>
                                        <a
                                            href={product.noteUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex flex-col h-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                                        >
                                            {/* Cover image */}
                                            <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={product.ogImage}
                                                    alt={product.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    loading="lazy"
                                                />
                                                {product.badges && product.badges.length > 0 && (
                                                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                                                        {product.badges.map((badge) => (
                                                            <span
                                                                key={badge}
                                                                className="px-3 py-1 rounded-full bg-teal-500 text-white text-xs font-black shadow"
                                                            >
                                                                {badge}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Body */}
                                            <div className="flex flex-col flex-1 p-6 gap-3">
                                                <p className="text-xs font-bold text-slate-500 tracking-wide">
                                                    対象：{product.audience}
                                                </p>
                                                <h2 className="text-lg font-black text-slate-900 leading-snug group-hover:text-teal-600 transition-colors">
                                                    {product.title}
                                                </h2>
                                                {product.subtitle && (
                                                    <p className="text-sm font-bold text-slate-700">
                                                        {product.subtitle}
                                                    </p>
                                                )}
                                                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                                                    {product.description}
                                                </p>

                                                {product.tags && product.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                                        {product.tags.map((tag) => (
                                                            <span
                                                                key={tag}
                                                                className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                <div className="mt-auto pt-4 flex items-center justify-between gap-3 border-t border-slate-100">
                                                    <div className="min-w-0">
                                                        <p className="text-xl font-black text-slate-900 whitespace-nowrap">
                                                            {product.priceLabel ?? `¥${product.price.toLocaleString()}`}
                                                        </p>
                                                        <p className="text-xs text-slate-500 mt-0.5 whitespace-nowrap">
                                                            公開：{formatDate(product.publishedAt)}
                                                        </p>
                                                    </div>
                                                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-black whitespace-nowrap shrink-0 group-hover:bg-teal-500 transition-colors">
                                                        noteで見る
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={2.5}
                                                            stroke="currentColor"
                                                            className="w-3.5 h-3.5"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                                            />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Note: 今後の追加について */}
                        <div className="mt-16 max-w-3xl mx-auto text-center px-6 py-8 bg-white rounded-2xl border border-slate-200">
                            <p className="text-sm text-slate-600 leading-relaxed">
                                新しい商品を公開した際は、こちらのページに随時追加していきます。
                                <br />
                                最新情報は
                                <a
                                    href="https://note.com/jisyutore"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-teal-600 font-bold hover:underline mx-1"
                                >
                                    note
                                </a>
                                や
                                <a
                                    href="/#line"
                                    className="text-green-600 font-bold hover:underline mx-1"
                                >
                                    LINE
                                </a>
                                でもお知らせします。
                            </p>
                        </div>
                    </div>
                </section>

                <LineBanner />
            </main>
            <Footer />
        </div>
    );
}
