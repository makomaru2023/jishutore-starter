import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JobCard } from "@/components/jobs/JobCard";
import { getExpiredJobs, getPublishedJobs } from "@/lib/jobs";
import { JOB_OPERATOR_NAME } from "@/constants/jobs";

const SITE_URL = "https://jishutore-sozaiko.online";
const PAGE_URL = `${SITE_URL}/jobs/`;

const TITLE = "リハビリ職の求人情報｜PT・OT・ST｜自主トレ素材庫";
const DESCRIPTION =
    "PT・OT・STを中心としたリハビリ職の求人情報を掲載しています。給与・休日・仕事内容に加えて、リハビリ職員数や1日の単位数など、働くうえで知りたい職場情報も掲載。応募は各施設・法人の公式採用窓口へ直接お願いします。";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: PAGE_URL },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: PAGE_URL,
        siteName: "自主トレ素材庫",
        locale: "ja_JP",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: TITLE,
        description: DESCRIPTION,
    },
};

export default function JobsPage() {
    const publishedJobs = getPublishedJobs();
    const expiredJobs = getExpiredJobs();

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "ホーム", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "求人情報", item: PAGE_URL },
        ],
    };

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Header />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <main className="jp-wrap flex-1">
                <div className="container mx-auto px-4 py-8 sm:py-12">
                    <div className="mx-auto max-w-3xl">
                        <nav className="text-sm font-bold text-slate-500">
                            <Link href="/" className="text-blue-700 hover:underline">
                                ホーム
                            </Link>
                            <span className="mx-2">/</span>
                            <span>求人情報</span>
                        </nav>

                        <header className="mt-5">
                            <h1 className="jp-heading text-2xl font-black leading-relaxed text-slate-950 sm:text-3xl">
                                リハビリ職の求人情報
                            </h1>
                            <p className="jp-text mt-4 text-sm font-bold leading-7 text-slate-600 sm:text-base">
                                {/* 略称は行またぎで割らない。放っておくと「PT・OT・」で行が終わる。 */}
                                <span className="whitespace-nowrap">PT・OT・ST</span>
                                を中心に、リハビリ職の求人情報を掲載しています。応募・お問い合わせは、各求人ページから施設・法人の公式採用窓口へ直接行ってください。
                            </p>
                            {/* 有償掲載であることの開示。カードごとの「PR」バッジだけでは
                                「何が有償なのか」「順番は金で買えるのか」が伝わらないため、
                                一覧の入口で明文化する（景表法のステマ規制）。 */}
                            <div className="jp-text mt-3 rounded-xl border border-slate-200 bg-white p-4 text-xs leading-6 text-slate-500">
                                {/* 掲載が0件のときは出さない。求人が1件も無い画面で
                                    「このページの求人は…掲載順は…」と書くと、存在しない求人の話になる。 */}
                                {publishedJobs.length > 0 && (
                                    <p className="mb-2">
                                        このページの求人は、掲載料をいただいて掲載している求人広告です。掲載順は、職場情報の開示項目数と掲載日で決まります。掲載料の多寡によって順番が変わることはありません。
                                    </p>
                                )}
                                <p>
                                    自主トレ素材庫では、応募の受付・仲介・人材紹介は行っていません。掲載内容は各施設・法人から提供されたものです。条件の詳細や最新の募集状況は、必ず施設の公式採用ページでご確認ください。
                                </p>
                            </div>
                        </header>

                        {publishedJobs.length > 0 ? (
                            <section className="mt-8">
                                <div className="flex flex-wrap items-baseline justify-between gap-2">
                                    <p className="text-sm font-black text-slate-500">
                                        掲載中の求人 {publishedJobs.length}件
                                    </p>
                                    {/* 並びの根拠を求職者にも明示する。「なぜこの順番なのか」が分かるほうが一覧を信用してもらえる。 */}
                                    <p className="text-xs font-bold text-slate-500">
                                        職場情報を多く公開している求人から順に表示しています
                                    </p>
                                </div>
                                <div className="mt-4 space-y-4">
                                    {publishedJobs.map((job) => (
                                        <JobCard key={job.id} job={job} placement="jobs_list" />
                                    ))}
                                </div>
                            </section>
                        ) : (
                            /* 掲載0件のときの空状態。サービス開始直後はここが表示される。 */
                            <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center">
                                <p className="jp-heading text-lg font-black text-slate-950">
                                    現在掲載準備中です
                                </p>
                                <p className="jp-text mx-auto mt-3 max-w-md text-sm font-bold leading-7 text-slate-600">
                                    リハビリ職向けの求人掲載を準備しています。掲載が始まりましたら、このページに求人情報を公開します。
                                </p>
                                <Link
                                    href="/items"
                                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-black text-blue-700 hover:underline"
                                >
                                    無料の自主トレ素材を見る →
                                </Link>
                            </section>
                        )}

                        {expiredJobs.length > 0 && (
                            <section className="mt-10">
                                <h2 className="text-sm font-black text-slate-500">掲載を終了した求人</h2>
                                <div className="mt-4 space-y-4">
                                    {expiredJobs.map((job) => (
                                        <JobCard key={job.id} job={job} placement="jobs_list" isExpired />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 採用担当者向けの導線。求人が0件でも成立するよう、常に出す。 */}
                        <section className="mt-12 rounded-2xl border border-blue-200 bg-blue-50/70 p-6 sm:p-8">
                            <p className="text-xs font-black tracking-widest text-blue-700">FOR RECRUITERS</p>
                            <h2 className="jp-heading mt-2 text-lg font-black leading-snug text-slate-950 sm:text-xl">
                                求人を掲載したい施設・法人の方へ
                            </h2>
                            <p className="jp-text mt-3 text-sm font-bold leading-7 text-slate-700">
                                自主トレ素材庫は、自主トレ素材や診療・介護報酬チェックを日常業務で利用しているリハビリ専門職が訪れるサイトです。転職サイトを探している人だけでなく、普段の臨床のためにサイトを使っている方へ求人情報を届けられます。
                            </p>
                            <Link
                                href="/jobs/posting/"
                                className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-blue-700 px-6 py-3 text-sm font-black text-white transition-colors hover:bg-blue-800"
                            >
                                求人掲載について見る
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2.5}
                                    stroke="currentColor"
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                            <p className="mt-4 text-xs font-bold text-slate-500">
                                運営：{JOB_OPERATOR_NAME}
                            </p>
                            {/* 掲載条件は申込前に読めるところに置く。CTAと同じブロック内に出す。 */}
                            <p className="mt-2 text-xs font-bold text-slate-500">
                                掲載の条件は{" "}
                                <Link href="/jobs/terms/" className="text-blue-700 hover:underline">
                                    求人掲載規約
                                </Link>{" "}
                                をご確認ください。
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
