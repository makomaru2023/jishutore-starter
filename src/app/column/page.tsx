import type { Metadata } from "next";
import Link from "next/link";
import { ColumnCard } from "@/components/column/ColumnCard";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
    columnCategoryLabels,
    getColumnArticles,
    type ColumnCategory,
} from "@/lib/column";

const ALL = "all";
const PAGE_URL = "https://jishutore-sozaiko.online/column/";

export const metadata: Metadata = {
    title: "コラム｜加算と記録の実務、改定ウォッチ｜自主トレ素材庫",
    description:
        "リハビリ専門職向けのコラムです。加算の算定の流れと記録の残し方、毎月の報酬改定・疑義解釈ウォッチ、資料づくりのコツを、作業療法士が一次資料を確認しながら書いています。",
    alternates: {
        canonical: PAGE_URL,
    },
    openGraph: {
        title: "コラム｜加算と記録の実務、改定ウォッチ｜自主トレ素材庫",
        description:
            "加算の算定の流れと記録、毎月の報酬改定・疑義解釈ウォッチ、資料づくりのコツをまとめています。",
        url: PAGE_URL,
        siteName: "自主トレ素材庫",
        type: "website",
    },
};

export default async function ColumnIndexPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string }>;
}) {
    const { category = ALL } = await searchParams;
    const articles = getColumnArticles();
    const isKnownCategory = (value: string): value is ColumnCategory =>
        Object.prototype.hasOwnProperty.call(columnCategoryLabels, value);
    const activeCategory = isKnownCategory(category) ? category : ALL;
    const visibleArticles =
        activeCategory === ALL
            ? articles
            : articles.filter((article) => article.category === activeCategory);

    // 記事が0本のカテゴリはタブに出さない（押しても空になるため）。
    const availableCategories = (Object.keys(columnCategoryLabels) as ColumnCategory[]).filter(
        (value) => articles.some((article) => article.category === value),
    );

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "ホーム", item: "https://jishutore-sozaiko.online/" },
            { "@type": "ListItem", position: 2, name: "コラム", item: PAGE_URL },
        ],
    };

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Header />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <main className="flex-1">
                <section className="border-b border-blue-100 bg-white py-10 sm:py-14">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-5xl">
                            <p className="text-sm font-black tracking-[0.35em] text-blue-700">COLUMN</p>
                            <span className="mt-3 block h-px w-12 bg-blue-200" aria-hidden="true" />
                            <h1 className="jp-heading mt-4 text-3xl font-black leading-relaxed text-slate-950 sm:text-4xl">
                                加算と記録の実務を、現場の手順で書いています
                            </h1>
                            <p className="jp-text mt-4 max-w-3xl text-sm leading-8 text-slate-600 sm:text-base">
                                作業療法士が、厚生労働省の告示・通知・疑義解釈を確認しながら書いているコラムです。
                                算定の流れと記録の残し方、毎月の改定ウォッチ、資料づくりのコツを扱います。
                                単位数などの数字は、根拠リンクつきの
                                <Link href="/fee-check/" className="mx-1 text-blue-700 hover:underline">
                                    報酬チェック
                                </Link>
                                側にまとめています。
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-8 sm:py-12">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-5xl">
                            <nav aria-label="カテゴリで絞り込む" className="flex flex-wrap gap-2">
                                <CategoryTab href="/column/" label="すべて" isActive={activeCategory === ALL} />
                                {availableCategories.map((value) => (
                                    <CategoryTab
                                        key={value}
                                        href={`/column/?category=${value}`}
                                        label={columnCategoryLabels[value]}
                                        isActive={activeCategory === value}
                                    />
                                ))}
                            </nav>

                            <p className="mt-4 text-sm font-bold text-slate-500">
                                <span className="text-slate-900">{visibleArticles.length}</span>件の記事
                            </p>

                            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                {visibleArticles.map((article) => (
                                    <ColumnCard key={article.slug} article={article} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

function CategoryTab({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
    return (
        <Link
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`inline-flex min-h-10 items-center rounded-full border px-4 py-2 text-sm font-black transition ${
                isActive
                    ? "border-blue-700 bg-blue-700 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700"
            }`}
        >
            {label}
        </Link>
    );
}
