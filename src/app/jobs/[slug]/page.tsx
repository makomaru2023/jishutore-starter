import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JobApplyButton } from "@/components/jobs/JobApplyButton";
import { JobCard } from "@/components/jobs/JobCard";
import { JobDetailTracker } from "@/components/jobs/JobDetailTracker";
import { WorkplaceDisclosureBadge } from "@/components/jobs/WorkplaceDisclosureBadge";
import {
    JOB_OPERATOR_NAME,
    jobEmploymentTypeLabels,
    jobFacilityTypeLabels,
    jobProfessionLabels,
    jobProfessionShortLabels,
} from "@/constants/jobs";
import {
    buildJobBreadcrumbJsonLd,
    buildJobMetaDescription,
    buildJobPostingJsonLd,
    getConditionRows,
    getJobBySlug,
    getPublishedJobs,
    getRecruiterRows,
    getVisibleJobs,
    getWorkplaceRows,
    isJobExpired,
    type JobDetailRow,
} from "@/lib/jobs";

const SITE_URL = "https://jishutore-sozaiko.online";

export async function generateStaticParams() {
    return getVisibleJobs().map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const job = getJobBySlug(slug);
    if (!job) {
        return { title: "求人が見つかりません｜自主トレ素材庫" };
    }

    const professions = job.profession.map((p) => jobProfessionShortLabels[p]).join("・");
    const title = `${professions}｜${job.facilityName}（${job.prefecture}${job.city}）の求人｜自主トレ素材庫`;
    const pageUrl = `${SITE_URL}/jobs/${job.slug}/`;
    const description = buildJobMetaDescription(job);

    // 掲載サンプルと掲載終了した求人は検索結果に出さない。
    // 終了求人の扱いはGoogleのガイドラインに沿って、構造化データも併せて出さない。
    const shouldIndex = !job.isSample && !isJobExpired(job);

    return {
        title,
        description,
        alternates: { canonical: pageUrl },
        robots: shouldIndex ? undefined : { index: false, follow: true },
        openGraph: {
            title,
            description,
            url: pageUrl,
            siteName: "自主トレ素材庫",
            locale: "ja_JP",
            type: "website",
        },
        twitter: { card: "summary_large_image", title, description },
    };
}

/** ラベル＋値の定義リスト。値のある行だけ渡ってくる。 */
function DetailRows({ rows }: { rows: JobDetailRow[] }) {
    return (
        <dl className="divide-y divide-slate-100">
            {rows.map((row) => (
                <div key={row.label} className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-4">
                    <dt className="shrink-0 text-xs font-black text-slate-500 sm:w-44 sm:pt-0.5 sm:text-sm">
                        {row.label}
                    </dt>
                    <dd className="jp-text min-w-0 text-sm font-bold leading-7 text-slate-800">
                        {row.value}
                    </dd>
                </div>
            ))}
        </dl>
    );
}

function Section({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
            <h2 className="jp-heading text-base font-black text-slate-950 sm:text-lg">{title}</h2>
            <div className="mt-3">{children}</div>
        </section>
    );
}

export default async function JobDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const job = getJobBySlug(slug);
    if (!job) notFound();

    const expired = isJobExpired(job);
    const conditionRows = getConditionRows(job);
    const workplaceRows = getWorkplaceRows(job);
    const recruiterRows = getRecruiterRows(job);
    const jobPostingJsonLd = buildJobPostingJsonLd(job);
    const breadcrumbJsonLd = buildJobBreadcrumbJsonLd(job);
    const otherJobs = getPublishedJobs()
        .filter((entry) => entry.id !== job.id)
        .slice(0, 2);

    /** 1〜7の基本情報。この順番は求人票として見慣れた並びに合わせている。 */
    const summaryRows: { label: string; value: React.ReactNode }[] = [
        { label: "募集職種", value: job.profession.map((p) => jobProfessionLabels[p]).join("／") },
        { label: "施設名", value: job.corporationName ? `${job.facilityName}（${job.corporationName}）` : job.facilityName },
        { label: "勤務地", value: job.address },
        {
            label: "給与",
            // 金額は「300,000／円」と割れると読みにくいので break-keep。
            // 補足文は長いので、普通に折り返させる（keep-all を掛けると禁則が崩れる）。
            value: (
                <>
                    <span className="break-keep">{job.salary}</span>
                    {job.salaryNote && <span className="mt-1 block">{job.salaryNote}</span>}
                </>
            ),
        },
        { label: "雇用形態", value: jobEmploymentTypeLabels[job.employmentType] },
        { label: "勤務時間", value: job.workHours },
        { label: "休日・休暇", value: job.holidays },
    ];

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Header />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        jobPostingJsonLd ? [breadcrumbJsonLd, jobPostingJsonLd] : [breadcrumbJsonLd],
                    ),
                }}
            />
            <JobDetailTracker job={job} />
            <main className="jp-wrap flex-1">
                <div className="container mx-auto px-4 py-8 sm:py-12">
                    <div className="mx-auto max-w-3xl">
                        <nav className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500">
                            <Link href="/" className="text-blue-700 hover:underline">
                                ホーム
                            </Link>
                            <span>/</span>
                            <Link href="/jobs/" className="text-blue-700 hover:underline">
                                求人情報
                            </Link>
                        </nav>

                        {job.isSample && (
                            <p className="jp-text mt-5 rounded-xl border-2 border-amber-400 bg-amber-50 p-4 text-sm font-black leading-6 text-amber-900">
                                これは掲載サンプルです。実在しない架空の施設・求人であり、応募はできません。掲載イメージを確認するためのページです。
                            </p>
                        )}

                        {expired && (
                            <p className="jp-text mt-5 rounded-xl border border-slate-300 bg-slate-100 p-4 text-sm font-black leading-6 text-slate-700">
                                この求人は掲載を終了しました（掲載期間：{job.publishedAt}〜{job.expiresAt}）。現在の募集状況は、施設の公式採用ページでご確認ください。
                            </p>
                        )}

                        <header className="mt-5">
                            <div className="flex flex-wrap items-center gap-1.5">
                                {job.profession.map((profession) => (
                                    <span
                                        key={profession}
                                        className="rounded-md bg-blue-600 px-2.5 py-1 text-xs font-black text-white"
                                    >
                                        {jobProfessionShortLabels[profession]}
                                    </span>
                                ))}
                                <span className="rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-bold text-slate-600">
                                    {jobEmploymentTypeLabels[job.employmentType]}
                                </span>
                                <span className="rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-bold text-slate-600">
                                    {jobFacilityTypeLabels[job.facilityType]}
                                </span>
                            </div>
                            {/* 施設名は「○○リハビリテーション病院」のように長くなりがち。スマホで text-2xl のままだと1行に収まらず「病／院」で割れるため、モバイルだけ1段階小さくする。 */}
                            <h1 className="jp-heading mt-4 text-xl font-black leading-relaxed text-slate-950 sm:text-3xl">
                                {job.facilityName}
                                <span className="mt-1 block text-lg font-black text-slate-700 sm:text-xl">
                                    {job.title}
                                </span>
                            </h1>
                            <p className="mt-3 text-sm font-bold text-slate-500">
                                {job.prefecture}{job.city}
                                <span className="mx-2 text-slate-300">|</span>
                                掲載期間 {job.publishedAt}〜{job.expiresAt}
                            </p>
                        </header>

                        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
                            <h2 className="jp-heading text-base font-black text-slate-950 sm:text-lg">
                                募集内容
                            </h2>
                            <div className="mt-3">
                                <dl className="divide-y divide-slate-100">
                                    {summaryRows.map((row) => (
                                        <div
                                            key={row.label}
                                            className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-4"
                                        >
                                            <dt className="shrink-0 text-xs font-black text-slate-500 sm:w-44 sm:pt-0.5 sm:text-sm">
                                                {row.label}
                                            </dt>
                                            <dd className="jp-text min-w-0 text-sm font-bold leading-7 text-slate-800">
                                                {row.value}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </section>

                        {!expired && !job.isSample && (
                            <div className="mt-6">
                                <JobApplyButton job={job} href={job.officialRecruitUrl}>
                                    施設の公式採用ページを見る
                                </JobApplyButton>
                            </div>
                        )}

                        <Section title="仕事内容">
                            <p className="jp-text whitespace-pre-line text-sm font-bold leading-7 text-slate-800">
                                {job.jobDescription}
                            </p>
                        </Section>

                        <Section title="応募資格">
                            <p className="jp-text whitespace-pre-line text-sm font-bold leading-7 text-slate-800">
                                {job.requirements}
                            </p>
                        </Section>

                        {job.benefits && (
                            <Section title="福利厚生">
                                <p className="jp-text whitespace-pre-line text-sm font-bold leading-7 text-slate-800">
                                    {job.benefits}
                                </p>
                            </Section>
                        )}

                        {conditionRows.length > 0 && (
                            <Section title="そのほかの条件">
                                <DetailRows rows={conditionRows} />
                            </Section>
                        )}

                        {/* この求人サイトの中心。施設が答えられた項目だけが並ぶ。 */}
                        {workplaceRows.length > 0 && (
                            <section className="mt-8 rounded-2xl border-2 border-blue-200 bg-white p-5 sm:p-7">
                                <p className="text-xs font-black tracking-widest text-blue-700">
                                    WORKPLACE
                                </p>
                                <h2 className="jp-heading mt-1 text-base font-black text-slate-950 sm:text-lg">
                                    リハ職が知りたい職場情報
                                </h2>
                                <div className="mt-3">
                                    <WorkplaceDisclosureBadge job={job} size="md" />
                                </div>
                                <p className="jp-text mt-3 text-xs font-bold leading-6 text-slate-500">
                                    施設から提供された範囲で掲載しています。回答のなかった項目は表示していません。
                                </p>
                                <div className="mt-3">
                                    <DetailRows rows={workplaceRows} />
                                </div>
                            </section>
                        )}

                        <Section title="募集主・お問い合わせ先">
                            <DetailRows rows={recruiterRows} />
                        </Section>

                        {/* 12. 施設・法人公式採用ページへのCTA */}
                        <section className="mt-8 rounded-2xl border border-blue-200 bg-blue-50/70 p-6 text-center sm:p-8">
                            <h2 className="jp-heading text-lg font-black leading-snug text-slate-950 sm:text-xl">
                                この求人に応募する
                            </h2>
                            <p className="jp-text mx-auto mt-3 max-w-lg text-sm font-bold leading-7 text-slate-700">
                                応募・お問い合わせは、施設・法人の公式採用ページから直接お願いします。自主トレ素材庫では応募の受付・仲介は行っていません。
                            </p>
                            {expired || job.isSample ? (
                                <p className="mt-5 text-sm font-black text-slate-500">
                                    {job.isSample? "掲載サンプルのため、応募先へのリンクはありません。": "この求人は掲載を終了しました。"}
                                </p>
                            ) : (
                                <div className="mt-6">
                                    <JobApplyButton job={job} href={job.officialRecruitUrl}>
                                        施設の公式採用ページを見る
                                    </JobApplyButton>
                                </div>
                            )}
                        </section>

                        <p className="jp-text mt-8 rounded-xl border border-slate-200 bg-white p-4 text-xs leading-6 text-slate-500 sm:p-5">
                            この求人情報は、掲載施設・法人から提供された内容をもとに{JOB_OPERATOR_NAME}が掲載しているものです。自主トレ素材庫は求人情報の掲載のみを行い、応募の受付・仲介・人材紹介・職業紹介は行っていません。採用の可否や労働条件の最終的な内容は、施設・法人と応募者の間で確認・決定されます。掲載後に募集内容が変更・終了している場合があります。応募前に必ず公式採用ページで最新の情報をご確認ください。記載内容に誤りを見つけられた場合は、
                            <Link href="/contact" className="font-black text-blue-700 hover:underline">
                                お問い合わせ
                            </Link>
                            よりご連絡ください。
                        </p>

                        {otherJobs.length > 0 && (
                            <section className="mt-10">
                                <h2 className="jp-heading text-base font-black text-slate-950">
                                    ほかの求人
                                </h2>
                                <div className="mt-4 space-y-4">
                                    {otherJobs.map((entry) => (
                                        <JobCard key={entry.id} job={entry} placement="job_detail" />
                                    ))}
                                </div>
                            </section>
                        )}

                        <Link
                            href="/jobs/"
                            className="mt-8 inline-block text-sm font-black text-blue-700 hover:underline"
                        >
                            ← 求人一覧に戻る
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
