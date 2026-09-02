import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JobPostingCtaButton } from "@/components/jobs/JobPostingCtaButton";
import { FREE_MATERIAL_COUNT_LABEL } from "@/constants/content-counts";
import { FEE_CHECK_ITEM_COUNT } from "@/constants/public-counts";
import {
    JOB_POSTING_LP_INDEXABLE,
    JOB_WORKPLACE_DISCLOSURE_ITEMS,
    JOB_WORKPLACE_DISCLOSURE_TOTAL,
    formatJobYen,
    formatMeasurementNote,
    formatMonthlyActiveUsers,
    JOB_CONTACT_EMAIL,
    JOB_MEDIA_LAUNCH,
    JOB_MEDIA_SURVEY,
    JOB_OPERATOR_NAME,
    JOB_POSTING_BETA,
} from "@/constants/jobs";

const SITE_URL = "https://jishutore-sozaiko.online";
const PAGE_URL = `${SITE_URL}/jobs/posting/`;

const priceLabel = formatJobYen(JOB_POSTING_BETA.priceYen);

const TITLE = `リハビリ職向け求人掲載β版｜${JOB_POSTING_BETA.durationDays}日間${priceLabel}｜自主トレ素材庫`;
const DESCRIPTION = `PT・OT・STに、日常業務の中で届く求人広告。自主トレ素材庫は、自主トレ素材や診療・介護報酬チェックを利用するリハビリ専門職向けWebサイトです。求人掲載β版は${JOB_POSTING_BETA.durationDays}日間${priceLabel}（税込）、採用成功報酬なし。先着${JOB_POSTING_BETA.slotLimit}施設で受付中。`;

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: PAGE_URL },
    // 媒体データを8月実績に差し替えるまでは検索結果に出さない。
    // ページ自体は表示されるので、サイト内の導線も営業でのURL共有も使える。
    robots: JOB_POSTING_LP_INDEXABLE ? undefined : { index: false, follow: true },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: PAGE_URL,
        siteName: "自主トレ素材庫",
        locale: "ja_JP",
        type: "website",
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const CheckIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={3}
        stroke="currentColor"
        className="h-3 w-3"
        aria-hidden="true"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
);

/**
 * 「PT・OT・ST」は行またぎで割らない。
 * 中黒（・）は折り返し可能な位置なので、放っておくと「PT・OT・」で行が終わり、
 * 短い行が取り残される。ひとかたまりの略称として扱う。
 */
const PtOtSt = () => <span className="whitespace-nowrap">PT・OT・ST</span>;

/** 媒体概要。数字はすべて定数から引くので、更新はconstants側だけで済む。 */
const mediaFacts: { label: string; value: React.ReactNode; note?: string }[] = [
    {
        label: "対象読者",
        value: (
            <>
                <PtOtSt />
                などリハビリ職を主対象とした専門サイト
            </>
        ),
    },
    {
        label: "無料自主トレ素材",
        value: FREE_MATERIAL_COUNT_LABEL,
    },
    {
        label: "診療・介護報酬チェック",
        value: `${FEE_CHECK_ITEM_COUNT}項目`,
    },
    {
        label: "月間ユーザー数",
        value: formatMonthlyActiveUsers(),
        note: formatMeasurementNote(),
    },
    {
        label: "運営開始",
        value: JOB_MEDIA_LAUNCH,
    },
    {
        label: "アクセス",
        value: "国内からのアクセスが中心",
    },
];

const features: { number: string; title: string; body: string }[] = [
    {
        number: "01",
        title: "リハビリ職向けの専門サイト",
        body: "PT・OT・STを中心とした、リハビリ関連ユーザー向けのWebサイトです。読者層がリハビリ領域に絞られているため、募集職種と読者が最初から重なります。",
    },
    {
        number: "02",
        title: "日常業務の中で求人情報に接触",
        body: "転職サイトを探している人だけではありません。患者さんに渡す自主トレ資料を作っている人、算定要件を確認している人へ求人を届けられます。転職活動を始めていない層にも接触できるのが、一般の求人サイトとの違いです。",
    },
    {
        number: "03",
        title: "採用成功報酬なし",
        body: `採用人数による追加料金は設定していません。${JOB_POSTING_BETA.durationDays}日間${priceLabel}（税込）の掲載料金のみです。`,
    },
];

const planIncludes = [
    "求人詳細ページ 1件",
    "求人一覧ページへの掲載",
    "自主トレ素材庫内での求人カード表示",
    "施設公式採用ページへのリンク",
    `掲載期間 ${JOB_POSTING_BETA.durationDays}日間`,
    "掲載期間中の軽微な内容修正",
    "掲載終了後の表示回数・クリック数レポート",
    "採用成功報酬なし",
];

const steps: { step: string; title: string; body: string }[] = [
    {
        step: "STEP 1",
        title: "掲載申込み",
        body: "このページの申込みボタンから、施設名・ご担当者名・ご連絡先をお送りください。",
    },
    {
        step: "STEP 2",
        title: "求人情報の確認・原稿提出",
        body: "掲載項目をお送りしますので、基本情報（募集職種・業務内容・就業場所）、勤務条件（契約期間・勤務時間・休日・時間外労働）、給与・待遇の順にご記入ください。労働条件の明示に必要な項目は雛形に含めています。リハビリ職員数や1日の単位数などの職場情報は、答えられる範囲で構いません。",
    },
    {
        step: "STEP 3",
        title: "掲載内容確認・請求案内",
        body: "こちらで掲載内容を確認し、掲載ページの下書きと請求のご案内をお送りします。",
    },
    {
        step: "STEP 4",
        title: "入金確認",
        body: "銀行振込にてお支払いください。入金を確認しましたらご連絡します。",
    },
    {
        step: "STEP 5",
        title: "求人掲載開始",
        body: `${JOB_POSTING_BETA.leadTime}に掲載を開始します。掲載開始のご連絡とURLをお送りします。`,
    },
];

const faqs: { q: string; a: string }[] = [
    {
        q: "応募者とのやり取りはどうなりますか？",
        a: "自主トレ素材庫では応募の受付・仲介を行いません。求人ページから施設・法人の公式採用ページへ直接遷移する形です。応募者とのやり取りは、これまでどおり貴施設の採用窓口で完結します。",
    },
    {
        q: "公式採用ページがない場合は掲載できますか？",
        a: "採用に関する問い合わせ先（電話番号・メールアドレス・応募フォーム等）があれば掲載できます。お申し込みの際にご相談ください。",
    },
    {
        q: "掲載中に募集内容が変わった場合は？",
        a: "ご連絡ください。掲載期間中の内容修正は料金に含まれています。募集内容の変更・募集終了・採用決定など掲載内容に影響する事実が生じたときのご連絡は、求人掲載規約に定める掲載事業者の義務としています。募集が終了した求人が残っていると、求職者が実在しない募集に応募することになるためです。ご連絡いただければ速やかに掲載を終了します（採用決定による途中終了の場合、残期間分の返金はありません）。",
    },
    {
        q: "採用できなかった場合はどうなりますか？",
        a: "掲載料金のみのため、追加費用は発生しません。なお、採用に至ることを保証するものではありません。掲載期間終了後に、表示回数・クリック数のレポートをお送りします。",
    },
];

export default function JobPostingPage() {
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "ホーム", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "求人情報", item: `${SITE_URL}/jobs/` },
            { "@type": "ListItem", position: 3, name: "求人掲載について", item: PAGE_URL },
        ],
    };

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Header />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <main className="jp-wrap flex-1">
                {/* ---------- ファーストビュー ---------- */}
                <section className="border-b border-slate-200 bg-gradient-to-b from-blue-50 to-white">
                    <div className="container mx-auto px-4 py-14 sm:py-20">
                        <div className="mx-auto max-w-3xl">
                            <p className="inline-block rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-black tracking-widest text-blue-700">
                                求人掲載β版 / 先着{JOB_POSTING_BETA.slotLimit}施設
                            </p>
                            {/* 「日常業務」が行またぎで割れないよう break-keep を効かせ、句点で改行を固定する（日本語の見出しは自動折り返しに任せない）。 */}
                            <h1 className="jp-heading mt-5 break-keep text-3xl font-black leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
                                PT・OT・STに、
                                <br />
                                日常業務の中で{/* スマホでは3行になる。「求人広告」が割れないよう、意味の切れ目でこちらから改行位置を決める。 */}
                                <br className="sm:hidden" />
                                届く求人広告。
                            </h1>
                            <p className="jp-text mt-6 text-sm font-bold leading-8 text-slate-700 sm:text-base">
                                自主トレ素材庫は、自主トレ素材や診療・介護報酬チェックなどを利用するリハビリ専門職向けWebサイトです。求人検索をしている人だけでなく、日々の業務のために自主トレ素材庫を利用しているリハ職へ求人情報を届けます。
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                                <JobPostingCtaButton placement="jobs_posting_hero">
                                    求人掲載について申し込む
                                </JobPostingCtaButton>
                                <Link
                                    href="#pricing"
                                    className="inline-flex w-full items-center justify-center rounded-full border-2 border-slate-300 px-8 py-4 text-base font-black text-slate-700 transition-colors hover:bg-slate-50 sm:w-auto"
                                >
                                    料金を見る
                                </Link>
                            </div>

                            <p className="mt-6 text-sm font-bold text-slate-600">
                                {JOB_POSTING_BETA.durationDays}日間 {priceLabel}（税込）／採用成功報酬なし
                            </p>
                            <p className="mt-2 text-xs font-bold text-slate-500">
                                運営：{JOB_OPERATOR_NAME}
                            </p>
                            {/* 申込の直下に掲載条件への導線を置く。CTAより先に読める位置に出す。 */}
                            <p className="mt-2 text-xs font-bold text-slate-500">
                                お申し込みの前に{" "}
                                <Link href="/jobs/terms/" className="text-blue-700 underline hover:text-blue-800">
                                    求人掲載規約
                                </Link>{" "}
                                をご確認ください。
                            </p>
                        </div>
                    </div>
                </section>

                {/* ---------- 媒体概要 ---------- */}
                <section className="py-14 sm:py-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-3xl">
                            <p className="text-xs font-black tracking-widest text-blue-700">MEDIA</p>
                            <h2 className="jp-heading mt-2 text-2xl font-black leading-snug text-slate-950 sm:text-3xl">
                                自主トレ素材庫について
                            </h2>
                            <p className="jp-text mt-4 text-sm font-bold leading-8 text-slate-700 sm:text-base">
                                患者さんに渡す自主トレ資料のイラストを探すとき、算定要件を確認したいとき。リハビリ専門職が日常業務の中で開くサイトです。
                            </p>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                {mediaFacts.map((fact) => (
                                    <div
                                        key={fact.label}
                                        className="min-w-0 rounded-2xl border border-slate-200 bg-white px-5 py-4"
                                    >
                                        <p className="text-[11px] font-black tracking-widest text-blue-600">
                                            {fact.label}
                                        </p>
                                        <p className="jp-text mt-1 text-sm font-black leading-snug text-slate-900 sm:text-base">
                                            {fact.value}
                                        </p>
                                        {fact.note && (
                                            <p className="mt-1 text-[11px] font-bold text-slate-400">
                                                {fact.note}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/*
                              利用者アンケートの集計値。
                              ★回答数が十分に集まるまでは JOB_MEDIA_SURVEY が null なので、
                                このブロックごと表示されない。断定的な比率を出さないための作り。
                            */}
                            {JOB_MEDIA_SURVEY && (
                                <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50/70 p-5 sm:p-6">
                                    <p className="text-[11px] font-black tracking-widest text-blue-700">
                                        利用者アンケート
                                    </p>
                                    <p className="jp-text mt-2 text-base font-black leading-snug text-slate-900 sm:text-lg">
                                        回答者の{JOB_MEDIA_SURVEY.rehabProfessionalPercent}%がPT・OT・ST
                                    </p>
                                    <p className="mt-1 text-xs font-bold text-slate-500">
                                        n={JOB_MEDIA_SURVEY.responseCount}／{JOB_MEDIA_SURVEY.period}・自社調べ
                                    </p>
                                </div>
                            )}

                            <p className="jp-text mt-6 text-xs leading-6 text-slate-500">
                                ※数値はGoogle Analytics 4による参考値です。掲載による採用成果・応募数を保証するものではありません。
                            </p>
                        </div>
                    </div>
                </section>

                {/* ---------- 掲載する特徴 ---------- */}
                <section className="border-y border-slate-200 bg-slate-50 py-14 sm:py-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-3xl">
                            <p className="text-xs font-black tracking-widest text-blue-700">FEATURES</p>
                            <h2 className="jp-heading mt-2 text-2xl font-black leading-snug text-slate-950 sm:text-3xl">
                                自主トレ素材庫に、求人を掲載する特徴
                            </h2>

                            <div className="mt-8 space-y-4">
                                {features.map((feature) => (
                                    <div
                                        key={feature.number}
                                        className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7"
                                    >
                                        <div className="flex items-start gap-4">
                                            <span className="mt-0.5 shrink-0 text-2xl font-black text-blue-200 sm:text-3xl">
                                                {feature.number}
                                            </span>
                                            <div className="min-w-0">
                                                <h3 className="jp-heading text-base font-black leading-snug text-slate-950 sm:text-lg">
                                                    {feature.title}
                                                </h3>
                                                <p className="jp-text mt-2 text-sm font-bold leading-7 text-slate-700">
                                                    {feature.body}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---------- 掲載イメージ ---------- */}
                <section className="py-14 sm:py-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-3xl">
                            <p className="text-xs font-black tracking-widest text-blue-700">SAMPLE</p>
                            <h2 className="jp-heading mt-2 text-2xl font-black leading-snug text-slate-950 sm:text-3xl">
                                掲載イメージ
                            </h2>
                            <p className="jp-text mt-4 text-sm font-bold leading-8 text-slate-700">
                                掲載した求人は、次の3か所に表示されます。
                            </p>

                            <div className="mt-8 space-y-6">
                                {/* 1. 求人一覧 */}
                                <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
                                    <h3 className="jp-heading text-base font-black text-slate-950 sm:text-lg">
                                        1. 求人一覧ページ
                                    </h3>
                                    <p className="jp-text mt-2 text-sm font-bold leading-7 text-slate-600">
                                        求人カードとして表示されます。職種・施設名・勤務地・施設種別・雇用形態・給与・休日が一目で分かる形です。
                                    </p>
                                    {/* 実データではない表示見本。偽の実績値は載せない。 */}
                                    <div
                                        className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-2 sm:p-3"
                                        aria-label="求人カードの表示見本"
                                    >
                                        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                                            <div className="flex flex-wrap items-center gap-1.5">
                                                <span className="rounded-md bg-blue-600 px-2 py-0.5 text-xs font-black text-white">
                                                    OT
                                                </span>
                                                <span className="rounded-md border border-slate-300 px-2 py-0.5 text-xs font-bold text-slate-600">
                                                    正職員
                                                </span>
                                            </div>
                                            <p className="jp-heading mt-3 text-base font-black leading-snug text-slate-950 sm:text-lg">
                                                ○○リハビリテーション病院
                                            </p>
                                            <p className="mt-1 text-xs font-bold text-slate-500">
                                                医療法人○○会
                                            </p>
                                            <p className="mt-2 text-sm font-bold text-slate-700">
                                                作業療法士（正職員）
                                            </p>
                                            <p className="mt-2 text-sm font-bold text-slate-600">
                                                ○○県○○市
                                                <span className="mx-1.5 text-slate-300">|</span>
                                                回復期リハビリテーション病院
                                            </p>
                                            <dl className="mt-4 space-y-1.5 border-t border-slate-100 pt-4">
                                                <div className="flex gap-3">
                                                    <dt className="w-16 shrink-0 text-xs font-black text-slate-400">
                                                        給与
                                                    </dt>
                                                    <dd className="text-sm font-bold text-slate-800">
                                                        月給 240,000〜300,000円
                                                    </dd>
                                                </div>
                                                <div className="flex gap-3">
                                                    <dt className="w-16 shrink-0 text-xs font-black text-slate-400">
                                                        休日
                                                    </dt>
                                                    <dd className="text-sm font-bold text-slate-800">
                                                        年間休日120日
                                                    </dd>
                                                </div>
                                            </dl>
                                            <span className="mt-4 inline-block text-sm font-black text-blue-700">
                                                求人詳細を見る →
                                            </span>
                                        </div>
                                        <p className="mt-2 text-center text-[11px] font-bold text-slate-400">
                                            ※表示見本です。実在の施設ではありません。
                                        </p>
                                    </div>
                                </div>

                                {/* 2. 求人詳細 */}
                                <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
                                    <h3 className="jp-heading text-base font-black text-slate-950 sm:text-lg">
                                        2. 求人詳細ページ
                                    </h3>
                                    <p className="jp-text mt-2 text-sm font-bold leading-7 text-slate-600">
                                        給与・勤務時間・休日・仕事内容・応募資格・福利厚生に加えて、
                                        <strong className="text-slate-900">
                                            リハ職が実際に知りたい職場情報
                                        </strong>
                                        を掲載できます。ここが一般の求人票との違いです。
                                    </p>
                                    {/* 項目は定義（@/constants/jobs）から出す。10項目を増減してもこのページが自動で追従する。 */}
                                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                                        {JOB_WORKPLACE_DISCLOSURE_ITEMS.map((item) => (
                                            <div
                                                key={item.label}
                                                className="flex items-start gap-2 rounded-lg bg-slate-50 px-3 py-2"
                                            >
                                                <span
                                                    className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white"
                                                    aria-hidden="true"
                                                >
                                                    <CheckIcon />
                                                </span>
                                                <div className="min-w-0">
                                                    <p className="jp-text text-sm font-bold text-slate-800">
                                                        {item.label}
                                                    </p>
                                                    <p className="jp-text mt-0.5 text-xs font-bold leading-5 text-slate-500">
                                                        {item.hint}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="jp-text mt-3 text-xs leading-6 text-slate-500">
                                        すべてにお答えいただく必要はありません。回答のなかった項目は表示されません。
                                    </p>
                                </div>

                                {/* 3. サイト内 */}
                                <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
                                    <h3 className="jp-heading text-base font-black text-slate-950 sm:text-lg">
                                        3. 自主トレ素材庫内での求人カード表示
                                    </h3>
                                    <p className="jp-text mt-2 text-sm font-bold leading-7 text-slate-600">
                                        自主トレ素材ページや診療・介護報酬チェックなど、リハ職が日常業務で開いているページにも、求人カードを表示できます。求人ページを探しに来た人だけでなく、普段どおりサイトを使っているリハ職の目に触れる形です。
                                    </p>
                                    <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                                        <p className="text-xs font-bold text-slate-500">
                                            例）自主トレ素材の詳細ページ
                                        </p>
                                        <div className="mt-2 space-y-2">
                                            <div className="h-3 w-3/4 rounded bg-slate-200" />
                                            <div className="h-3 w-full rounded bg-slate-200" />
                                            <div className="h-3 w-2/3 rounded bg-slate-200" />
                                        </div>
                                        <div className="mt-3 rounded-lg border border-slate-300 bg-white p-3">
                                            <p className="flex items-center gap-2 text-[11px] font-black text-slate-500">
                                                <span className="rounded border border-slate-300 px-1.5 py-0.5 text-[10px] tracking-widest">
                                                    PR
                                                </span>
                                                リハビリ職の求人
                                            </p>
                                            <p className="mt-2 text-sm font-black text-slate-900">
                                                ○○リハビリテーション病院／作業療法士
                                            </p>
                                            <p className="mt-1 text-xs font-bold text-slate-500">
                                                ○○県○○市・回復期・正職員
                                            </p>
                                        </div>
                                        <div className="mt-3 space-y-2">
                                            <div className="h-3 w-full rounded bg-slate-200" />
                                            <div className="h-3 w-1/2 rounded bg-slate-200" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---------- 掲載順のルール ---------- */}
                {/* この媒体の中心にある約束。採用担当者に対しては
                    「埋めれば上位に出る」という動機として、
                    求職者に対しては「上ほど読む価値がある」という保証として働く。 */}
                <section className="border-t border-slate-200 bg-slate-50 py-14 sm:py-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-3xl">
                            <p className="text-xs font-black tracking-widest text-blue-700">RANKING</p>
                            <h2 className="jp-heading mt-2 text-2xl font-black leading-snug text-slate-950 sm:text-3xl">
                                職場情報を公開するほど、
                                <br className="hidden sm:block" />
                                上位に表示されます
                            </h2>
                            <p className="jp-text mt-4 text-sm font-bold leading-8 text-slate-700 sm:text-base">
                                求人一覧は、掲載順や新着順ではなく、
                                <strong className="text-slate-900">
                                    上の{JOB_WORKPLACE_DISCLOSURE_TOTAL}項目をいくつ公開しているか
                                </strong>
                                の多い順に並びます。求人ページには「職場情報 {JOB_WORKPLACE_DISCLOSURE_TOTAL}/{JOB_WORKPLACE_DISCLOSURE_TOTAL} 公開」のように公開数が表示されます。
                            </p>

                            <div className="mt-8 space-y-2">
                                {[
                                    { rank: 1, count: JOB_WORKPLACE_DISCLOSURE_TOTAL, label: "すべて公開した求人" },
                                    { rank: 2, count: 6, label: "一部を公開した求人" },
                                    { rank: 3, count: 0, label: "公開していない求人" },
                                ].map((row) => {
                                    const isTop = row.count === JOB_WORKPLACE_DISCLOSURE_TOTAL;
                                    return (
                                        <div
                                            key={row.rank}
                                            className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
                                                isTop
                                                    ? "border-blue-600 bg-white"
                                                    : "border-slate-200 bg-white/60"
                                            }`}
                                        >
                                            <span
                                                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                                                    isTop ? "bg-blue-700 text-white" : "bg-slate-200 text-slate-600"
                                                }`}
                                            >
                                                {row.rank}
                                            </span>
                                            <span
                                                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-black ${
                                                    isTop
                                                        ? "bg-blue-700 text-white"
                                                        : "border border-slate-300 text-slate-500"
                                                }`}
                                            >
                                                {row.count}/{JOB_WORKPLACE_DISCLOSURE_TOTAL}
                                            </span>
                                            <span className="jp-text min-w-0 text-sm font-bold text-slate-700">
                                                {row.label}
                                            </span>
                                        </div>
                                    );})}
                            </div>

                            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                                <h3 className="jp-heading text-base font-black text-slate-950">
                                    施設の規模や種別で不利になりません
                                </h3>
                                <p className="jp-text mt-2 text-sm font-bold leading-7 text-slate-700">
                                    {JOB_WORKPLACE_DISCLOSURE_TOTAL}項目は、病院・老健・訪問・通所のどこでも答えられるものだけを選んでいます。リハビリ職が1名の事業所でも「1名」と書けば公開済みです。訪問であれば単位数のかわりに訪問件数、リハビリ室のかわりに使用機器で構いません。
                                </p>
                                <p className="jp-text mt-3 text-sm font-bold leading-7 text-slate-700">
                                    数字を大きく見せる必要はありません。実態のとおりに書いていただくことが、入職後のミスマッチを防ぎます。
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---------- 料金 ---------- */}
                <section id="pricing" className="scroll-mt-20 border-y border-slate-200 bg-slate-50 py-14 sm:py-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-3xl">
                            <p className="text-xs font-black tracking-widest text-blue-700">PRICE</p>
                            <h2 className="jp-heading mt-2 text-2xl font-black leading-snug text-slate-950 sm:text-3xl">
                                β版の料金
                            </h2>

                            <div className="mt-8 overflow-hidden rounded-2xl border-2 border-blue-600 bg-white">
                                <div className="bg-blue-600 px-6 py-3">
                                    <p className="text-sm font-black text-white">
                                        求人掲載β版 ／ 先着{JOB_POSTING_BETA.slotLimit}施設
                                    </p>
                                </div>
                                <div className="p-6 sm:p-8">
                                    <p className="flex flex-wrap items-baseline gap-2">
                                        <span className="text-sm font-black text-slate-500">
                                            {JOB_POSTING_BETA.durationDays}日間
                                        </span>
                                        <span className="text-4xl font-black text-slate-950 sm:text-5xl">
                                            {priceLabel}
                                        </span>
                                        <span className="text-sm font-black text-slate-500">（税込）</span>
                                    </p>
                                    <p className="mt-2 text-sm font-black text-blue-700">
                                        採用成功報酬なし
                                    </p>

                                    <ul className="mt-6 space-y-2.5 border-t border-slate-100 pt-6">
                                        {planIncludes.map((label) => (
                                            <li key={label} className="flex items-start gap-2.5">
                                                <span
                                                    className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white"
                                                    aria-hidden="true"
                                                >
                                                    <CheckIcon />
                                                </span>
                                                <span className="jp-text min-w-0 text-sm font-bold leading-7 text-slate-800">
                                                    {label}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-8">
                                        <JobPostingCtaButton placement="jobs_posting_pricing">
                                            求人掲載を申し込む
                                        </JobPostingCtaButton>
                                    </div>

                                    <p className="jp-text mt-5 text-xs leading-6 text-slate-500">
                                        ※β版終了後は、媒体規模・掲載実績等に応じて料金を変更する場合があります。料金の改定は、改定日以降に申し込まれた掲載に適用します。
                                        <br />
                                        ※掲載による採用成果・応募数・閲覧数を保証するものではありません。
                                        <br />
                                        ※掲載条件・掲載の停止・キャンセル・返金の取り扱いは{" "}
                                        <Link href="/jobs/terms/" className="font-black text-blue-700 underline">
                                            求人掲載規約
                                        </Link>{" "}
                                        によります。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---------- 掲載までの流れ ---------- */}
                <section className="py-14 sm:py-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-3xl">
                            <p className="text-xs font-black tracking-widest text-blue-700">FLOW</p>
                            <h2 className="jp-heading mt-2 text-2xl font-black leading-snug text-slate-950 sm:text-3xl">
                                掲載までの流れ
                            </h2>

                            <ol className="mt-8 space-y-4">
                                {steps.map((step) => (
                                    <li
                                        key={step.step}
                                        className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
                                    >
                                        <p className="text-[11px] font-black tracking-widest text-blue-600">
                                            {step.step}
                                        </p>
                                        <h3 className="jp-heading mt-1 text-base font-black text-slate-950">
                                            {step.title}
                                        </h3>
                                        <p className="jp-text mt-2 text-sm font-bold leading-7 text-slate-700">
                                            {step.body}
                                        </p>
                                    </li>
                                ))}
                            </ol>

                            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                                <h3 className="jp-heading text-base font-black text-slate-950">
                                    お支払い方法
                                </h3>
                                <p className="jp-text mt-2 text-sm font-bold leading-7 text-slate-700">
                                    銀行振込でお願いしています（請求書を発行します）。クレジットカード決済をご希望の場合は、お申し込みの際にご相談ください。お申し込み・請求・入金確認・掲載開始まで、担当者が個別に対応します。
                                </p>
                                <p className="jp-text mt-3 text-xs leading-6 text-slate-500">
                                    ※請求書の発行に必要な正式な事業者情報は、お取引の際に個別にご提示します。
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---------- よくあるご質問 ---------- */}
                <section className="border-t border-slate-200 bg-slate-50 py-14 sm:py-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-3xl">
                            <p className="text-xs font-black tracking-widest text-blue-700">FAQ</p>
                            <h2 className="jp-heading mt-2 text-2xl font-black leading-snug text-slate-950 sm:text-3xl">
                                よくあるご質問
                            </h2>
                            <div className="mt-8 space-y-3">
                                {faqs.map((faq) => (
                                    <div
                                        key={faq.q}
                                        className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
                                    >
                                        <h3 className="jp-heading text-sm font-black leading-snug text-slate-950 sm:text-base">
                                            Q. {faq.q}
                                        </h3>
                                        <p className="jp-text mt-2 text-sm font-bold leading-7 text-slate-700">
                                            {faq.a}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---------- 最下部CTA ---------- */}
                <section className="bg-slate-900 py-14 sm:py-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="jp-heading text-2xl font-black leading-snug text-white sm:text-3xl">
                                まず1件、試しに掲載してみませんか
                            </h2>
                            <p className="jp-text mx-auto mt-4 max-w-xl text-sm font-bold leading-8 text-slate-300">
                                {JOB_POSTING_BETA.durationDays}日間 {priceLabel}（税込）、採用成功報酬はありません。先着{JOB_POSTING_BETA.slotLimit}施設で受け付けています。
                            </p>
                            <div className="mt-8 flex justify-center">
                                <JobPostingCtaButton placement="jobs_posting_footer">
                                    求人掲載を申し込む
                                </JobPostingCtaButton>
                            </div>
                            <p className="mt-6 text-xs font-bold leading-6 text-slate-400">
                                ご不明な点は{" "}
                                <a
                                    href={`mailto:${JOB_CONTACT_EMAIL}`}
                                    className="font-black text-slate-200 underline"
                                >
                                    {JOB_CONTACT_EMAIL}
                                </a>{" "}
                                までお問い合わせください。
                                <br />
                                自主トレ素材庫は{JOB_OPERATOR_NAME}が運営しています。
                                <br />
                                お申し込みの前に{" "}
                                <Link href="/jobs/terms/" className="font-black text-slate-200 underline">
                                    求人掲載規約
                                </Link>{" "}
                                をご確認ください。
                            </p>
                            <Link
                                href="/jobs/"
                                className="mt-6 inline-block text-sm font-black text-slate-300 hover:text-white hover:underline"
                            >
                                掲載中の求人一覧を見る →
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
