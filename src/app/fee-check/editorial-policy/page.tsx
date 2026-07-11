import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const PAGE_URL = "https://jishutore-sozaiko.online/fee-check/editorial-policy/";

export const metadata: Metadata = {
    title: "診療・介護報酬チェックの編集方針・確認方法｜自主トレ素材庫",
    description:
        "自主トレ素材庫の診療・介護報酬チェックで、単位数・算定要件・記録・自己点検ポイントを作成、確認、更新する方法を公開しています。",
    alternates: { canonical: PAGE_URL },
};

const sections = [
    {
        title: "作成・公開責任",
        body: [
            "診療・介護報酬チェックは、自主トレ素材庫が企画・作成・公開しています。サイト運営者は作業療法士です。",
            "内容の整理に情報処理支援ツールを使用する場合がありますが、根拠として採用する情報は、各項目に掲載した厚生労働省等の一次資料を基準とします。",
        ],
    },
    {
        title: "確認する資料",
        body: [
            "告示、通知、留意事項、疑義解釈、官報掲載事項の訂正など、厚生労働省・関係機関が公開する一次資料を確認します。解説サイトだけを根拠として単位数・点数・算定要件を確定しません。",
            "各チェック項目には、確認に使った資料名、URL、該当ページ、最終確認日を可能な範囲で掲載します。",
        ],
    },
    {
        title: "更新方法",
        body: [
            "診療報酬・介護報酬の改定、疑義解釈、事務連絡、官報訂正を定期的に確認し、影響する項目を更新します。更新した項目には確認日を表示します。",
            "一次資料同士に差異がある場合や、根拠を確定できない場合は、断定を避けて要確認として管理します。",
        ],
    },
    {
        title: "掲載範囲と注意事項",
        body: [
            "本ツールは、算定要件の確認と事業所内の自己点検を支援するための情報です。個別事例の算定可否、請求の適否、行政機関による判断を保証するものではありません。",
            "実際の請求では最新の原本を確認し、必要に応じて保険者、地方厚生局、関係機関へお問い合わせください。",
        ],
    },
] as const;

export default function FeeCheckEditorialPolicyPage() {
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "報酬チェック", item: "https://jishutore-sozaiko.online/fee-check/" },
            { "@type": "ListItem", position: 2, name: "編集方針・確認方法", item: PAGE_URL },
        ],
    };

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Header />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
            <main className="flex-1">
                <div className="container mx-auto px-4 py-10 sm:py-14">
                    <article className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                        <nav aria-label="パンくずリスト" className="text-sm font-bold text-slate-500">
                            <Link href="/fee-check/" className="text-blue-700 hover:underline">報酬チェック</Link>
                            <span className="mx-2">/</span>
                            <span>編集方針・確認方法</span>
                        </nav>
                        <p className="mt-7 text-xs font-black tracking-widest text-blue-700">EDITORIAL POLICY</p>
                        <h1 className="mt-2 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
                            診療・介護報酬チェックの編集方針・確認方法
                        </h1>
                        <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                            報酬情報を安心して確認できるよう、作成者、根拠資料、更新方法、掲載範囲を公開します。
                        </p>

                        <div className="mt-8 space-y-7">
                            {sections.map((section) => (
                                <section key={section.title} className="border-t border-slate-200 pt-6">
                                    <h2 className="text-xl font-black text-slate-950">{section.title}</h2>
                                    <div className="mt-3 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
                                        {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                                    </div>
                                </section>
                            ))}
                        </div>

                        <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
                            <h2 className="font-black text-slate-950">誤り・更新情報のご連絡</h2>
                            <p className="mt-2 text-sm leading-7 text-slate-700">
                                掲載内容の誤りや、新しい通知・訂正情報にお気づきの場合は、根拠資料のURLと該当箇所を添えてお知らせください。
                            </p>
                            <Link href="/contact/" className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-blue-700 px-5 py-2.5 text-sm font-black text-white hover:bg-blue-800">
                                お問い合わせ
                            </Link>
                        </div>
                    </article>
                </div>
            </main>
            <Footer />
        </div>
    );
}
