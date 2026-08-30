/**
 * 求人（/jobs/）のサーバー側ヘルパー。
 * --------------------------------------------------------------
 * ★このモジュールはクライアントコンポーネントから import しないこと。
 *   求人データ本体（@/data/jobs）を巻き込むため。
 *   ラベルや設定が必要なときは @/constants/jobs を使い、
 *   求人そのものはサーバー側から props で渡す。
 *   （lib/column.ts・lib/fee-check.ts と同じ約束）
 */

import { jobs } from "@/data/jobs";
import {
    countWorkplaceDisclosure,
    jobEmploymentTypeSchemaValues,
    jobFacilityTypeLabels,
    jobProfessionLabels,
} from "@/constants/jobs";
import type { Job, JobFacilityType, JobProfession } from "@/types/job";

const SITE_URL = "https://jishutore-sozaiko.online";

/**
 * 掲載サンプル（架空求人）を表示してよい環境か。
 * ★本番デプロイでは false。実在の求人と誤認されないための安全弁。
 *   ローカルの npm run dev と Vercel のプレビュー環境でだけ表示される。
 */
function canShowSampleJobs(): boolean {
    return process.env.VERCEL_ENV !== "production";
}

/** 日本時間の今日（YYYY-MM-DD）。 */
function todayInJst(): string {
    return new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

/**
 * expiresAt を過ぎているか。
 * ⚠ ページは静的生成なので、この判定はビルド時点で固定される。
 *   掲載終了を確実に反映させたいときは、data/jobs.ts の status を
 *   "expired" にして再デプロイすること（そちらが常に優先される）。
 */
export function isJobExpired(job: Job): boolean {
    if (job.status === "expired") return true;
    return job.expiresAt < todayInJst();
}

/** /jobs/<slug>/ のURL。 */
export function getJobUrl(slug: string): string {
    return `/jobs/${slug}/`;
}

/**
 * サイトに存在してよい求人（詳細ページを持つもの）。
 * draft は含めない。掲載終了したものは「掲載終了」表示で残す。
 */
export function getVisibleJobs(): Job[] {
    return jobs.filter((job) => {
        if (job.status === "draft") return false;
        if (job.isSample && !canShowSampleJobs()) return false;
        return true;
    });
}

/**
 * /jobs/ の一覧に出す求人（掲載中のみ）。
 * ================================================================
 * 並び順：①職場情報10項目の開示率が高い順 → ②新着順
 *
 * ★なぜ開示率で並べるのか
 *   求人票では分からない職場情報（1日の単位数・残業の実態・教育体制）を
 *   出してくれた施設ほど上に出す。求職者にとって「一覧の上ほど読む価値がある」
 *   状態を保つための順序であり、この媒体の中心にある約束。
 *   施設にとっては「埋めれば上位に出る」という分かりやすい動機になる。
 *
 * ★将来、有料の「上位表示オプション」を足すときはここに1段だけ差し込む：
 *     ① 上位表示オプション（有料）
 *        ただし isWorkplaceFullyDisclosed(job) が true の求人だけ
 *     ② 開示率の高い順  ← いまここが先頭
 *     ③ 新着順
 *   購入資格を10/10で縛るので、金を払っただけの情報の薄い求人が
 *   上位に来ることはない。あわせてカードに「PR」表示を付けること
 *   （景表法のステマ規制。広告であることの明示が必要）。
 */
export function getPublishedJobs(): Job[] {
    return getVisibleJobs()
        .filter((job) => !isJobExpired(job))
        .sort((a, b) => {
            const disclosureDiff = countWorkplaceDisclosure(b) - countWorkplaceDisclosure(a);
            if (disclosureDiff !== 0) return disclosureDiff;
            return b.publishedAt.localeCompare(a.publishedAt);
        });
}

/** 掲載終了した求人（一覧の下に控えめに出す）。 */
export function getExpiredJobs(): Job[] {
    return getVisibleJobs()
        .filter((job) => isJobExpired(job))
        .sort((a, b) => b.expiresAt.localeCompare(a.expiresAt));
}

export function getJobBySlug(slug: string): Job | undefined {
    return getVisibleJobs().find((job) => job.slug === slug);
}

/**
 * sitemap に載せる求人。
 * 掲載サンプルと掲載終了分は載せない
 * （終了求人を検索結果に残さないための、Googleのガイドラインに沿った扱い）。
 */
export function getSitemapJobs(): Job[] {
    return jobs.filter(
        (job) => job.status === "published" && !job.isSample && !isJobExpired(job),
    );
}

/**
 * 将来のコンテキスト連動配信で使う、1件だけ選ぶヘルパー。
 * ★今回は配信システムを作らないので、素材ページ等への設置はしていない。
 *   設置するときはサーバーコンポーネントでこれを呼び、
 *   返ってきた求人を <SponsoredJobCard job={job} placement="item_detail" /> に渡す。
 */
export function pickSponsoredJob(options?: {
    professions?: JobProfession[];
    facilityTypes?: JobFacilityType[];
    topics?: string[];
}): Job | null {
    const candidates = getPublishedJobs();
    if (candidates.length === 0) return null;
    if (!options) return candidates[0];

    const { professions, facilityTypes, topics } = options;
    const matched = candidates.filter((job) => {
        const t = job.targeting;
        if (!t) return false;
        if (professions?.length && !t.targetProfessions?.some((p) => professions.includes(p))) {
            return false;
        }
        if (
            facilityTypes?.length &&
            !t.targetFacilityTypes?.some((f) => facilityTypes.includes(f))
        ) {
            return false;
        }
        if (topics?.length && !t.targetTopics?.some((topic) => topics.includes(topic))) {
            return false;
        }
        return true;
    });

    return matched[0] ?? candidates[0];
}

// ---------------------------------------------------------------
// 詳細ページの表示用データ
// ---------------------------------------------------------------

export interface JobDetailRow {
    label: string;
    value: string;
}

/** 値のある行だけを残す。 */
function compact(rows: (JobDetailRow | null)[]): JobDetailRow[] {
    return rows.filter((row): row is JobDetailRow => row !== null && row.value.trim() !== "");
}

function row(label: string, value: string | undefined): JobDetailRow | null {
    return value ? { label, value } : null;
}

/**
 * 「リハ職が知りたい職場情報」。
 * 施設が答えられなかった項目は行ごと出さない。
 */
export function getWorkplaceRows(job: Job): JobDetailRow[] {
    const w = job.workplace;
    if (!w) return [];

    const staffing = [
        w.ptCount !== undefined ? `PT ${w.ptCount}名` : null,
        w.otCount !== undefined ? `OT ${w.otCount}名` : null,
        w.stCount !== undefined ? `ST ${w.stCount}名` : null,
    ]
        .filter(Boolean)
        .join("／");

    return compact([
        row("リハビリ職員数", staffing || undefined),
        row("平均経験年数", w.averageExperience),
        row("1日の担当人数", w.dailyPatientCount),
        row("1日の単位数", w.dailyUnits),
        row("残業", w.overtime),
        row("教育・新人指導", w.educationSystem),
        row("カンファレンス・症例検討", w.conferenceFrequency),
        row("学会・研修の支援", w.trainingSupport),
        row("育児との両立支援", w.childcareSupport),
        row("男性の育児休業", w.maleParentalLeave),
        row("主な機器・設備", w.equipment),
        row("リハビリ室", w.rehabRoom),
        row("1日の流れ", w.dailySchedule),
    ]);
}

/**
 * 募集条件（職業安定法の明示事項をひととおり並べる）。
 * 賃金・就業場所・業務内容は必須なので必ず出る。
 */
export function getConditionRows(job: Job): JobDetailRow[] {
    return compact([
        row("契約期間", job.contractPeriod),
        row("契約更新の基準", job.contractRenewal),
        row("試用期間", job.trialPeriod),
        row("業務の変更の範囲", job.jobScopeOfChange),
        row("就業場所の変更の範囲", job.workplaceScopeOfChange),
        row("加入保険", job.insurance),
        row("受動喫煙防止措置", job.smokingPolicy),
    ]);
}

/** 募集主の情報（職業安定法で募集広告に必要な、募集主・所在地・連絡先）。 */
export function getRecruiterRows(job: Job): JobDetailRow[] {
    return compact([
        row("募集主", job.facilityName),
        row("運営法人", job.corporationName),
        row("所在地", job.address),
        row("施設種別", jobFacilityTypeLabels[job.facilityType]),
        row("連絡先・採用窓口", job.contact),
    ]);
}

// ---------------------------------------------------------------
// 構造化データ
// ---------------------------------------------------------------

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

/** JobPosting.description は HTML 形式が求められるので、段落に組み立てる。 */
function buildJobDescriptionHtml(job: Job): string {
    const blocks: string[] = [
        `<p>${escapeHtml(job.jobDescription)}</p>`,
        `<p><strong>応募資格</strong><br>${escapeHtml(job.requirements)}</p>`,
        `<p><strong>勤務時間</strong><br>${escapeHtml(job.workHours)}</p>`,
        `<p><strong>休日・休暇</strong><br>${escapeHtml(job.holidays)}</p>`,
    ];
    if (job.salaryNote) {
        blocks.push(`<p><strong>賃金の補足</strong><br>${escapeHtml(job.salaryNote)}</p>`);
    }
    if (job.benefits) {
        blocks.push(`<p><strong>福利厚生</strong><br>${escapeHtml(job.benefits)}</p>`);
    }
    return blocks.join("");
}

/** 都道府県・市区町村を除いた番地部分。addressLocality との重複を避ける。 */
function getStreetAddress(job: Job): string {
    const prefix = `${job.prefecture}${job.city}`;
    return job.address.startsWith(prefix)
        ? job.address.slice(prefix.length) || job.address
        : job.address;
}

/**
 * JobPosting 構造化データ。
 * --------------------------------------------------------------
 * 仕様：https://developers.google.com/search/docs/appearance/structured-data/job-posting
 * 必須：title / description / datePosted / hiringOrganization / jobLocation
 * 推奨：validThrough / employmentType / baseSalary / identifier / directApply
 *
 * ★null を返す条件（構造化データを出してはいけない求人）
 *   - 掲載サンプル（架空求人）… 検索結果に偽の求人を出さないため
 *   - 掲載終了 … Googleのガイドラインで、終了した求人は
 *                「validThrough を過去日にする」「404/410 を返す」
 *                「構造化データを削除する」のいずれかが求められている。
 *                本サイトはページを残して案内を出すので、3つめを選んでいる。
 */
export function buildJobPostingJsonLd(job: Job): Record<string, unknown> | null {
    if (job.isSample) return null;
    if (isJobExpired(job)) return null;

    const jsonLd: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: job.title,
        description: buildJobDescriptionHtml(job),
        datePosted: job.publishedAt,
        validThrough: `${job.expiresAt}T23:59:59+09:00`,
        employmentType: jobEmploymentTypeSchemaValues[job.employmentType],
        identifier: {
            "@type": "PropertyValue",
            name: job.corporationName ?? job.facilityName,
            value: job.id,
        },
        hiringOrganization: {
            "@type": "Organization",
            name: job.corporationName ?? job.facilityName,
            sameAs: job.officialRecruitUrl,
        },
        jobLocation: {
            "@type": "Place",
            address: {
                "@type": "PostalAddress",
                streetAddress: getStreetAddress(job),
                addressLocality: job.city,
                addressRegion: job.prefecture,
                addressCountry: "JP",
            },
        },
        // 応募は施設・法人の公式採用ページで行うため、本サイト上では完結しない。
        directApply: false,
    };

    if (job.baseSalary) {
        const { unitText, minValue, maxValue, value } = job.baseSalary;
        jsonLd.baseSalary = {
            "@type": "MonetaryAmount",
            currency: "JPY",
            value: {
                "@type": "QuantitativeValue",
                ...(value !== undefined ? { value } : {}),
                ...(minValue !== undefined ? { minValue } : {}),
                ...(maxValue !== undefined ? { maxValue } : {}),
                unitText,
            },
        };
    }

    return jsonLd;
}

/** 求人詳細ページのパンくず構造化データ。 */
export function buildJobBreadcrumbJsonLd(job: Job): Record<string, unknown> {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "ホーム", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "求人情報", item: `${SITE_URL}/jobs/` },
            {
                "@type": "ListItem",
                position: 3,
                name: `${job.facilityName}　${job.title}`,
                item: `${SITE_URL}${getJobUrl(job.slug)}`,
            },
        ],
    };
}

/** 詳細ページの meta description。募集条件の要点を1文にまとめる。 */
export function buildJobMetaDescription(job: Job): string {
    const professions = job.profession.map((p) => jobProfessionLabels[p]).join("・");
    return [
        `${job.prefecture}${job.city}の${jobFacilityTypeLabels[job.facilityType]}「${job.facilityName}」による${professions}の求人情報。`,
        `${job.salary}、${job.holidays.split("／")[0]}。`,
        `${job.jobDescription.slice(0, 60)}`,
        "応募は施設の公式採用ページから直接お願いします。",
    ].join("");
}
