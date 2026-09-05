/**
 * 求人広告枠（selectSponsoredJob）の分散と除外条件を確かめる検証スクリプト。
 * ================================================================
 * 実行：npx tsx scripts/check-sponsored-job.ts
 *
 * ★本番の data/jobs.ts は触らない。ここで作る架空求人はメモリ上だけで、
 *   サイトのビルド成果物にも sitemap にも入らない。
 * ★選び方の本体（src/lib/job-rotation.ts）をそのまま呼ぶ。
 *   候補集め（下書き・掲載終了・掲載サンプルの除外）は src/lib/jobs.ts が持っているので、
 *   同じ条件をここで組み立てて確かめる。
 *
 * 見るところ：
 *   - 候補0件 → null
 *   - 候補1件 → その1件
 *   - 候補複数 → seed によって先頭以外も選ばれる
 *   - 下書き（draft）・掲載終了（expired / 期限切れ）は候補に入らない
 *   - 本番デプロイでは掲載サンプル（isSample）が候補に入らない
 *   - 文脈（施設種別）に合う候補があれば、そちらの中から選ぶ
 */

import { countWorkplaceDisclosure } from "../src/constants/jobs";
import { selectSponsoredJob, type SponsoredJobOptions } from "../src/lib/job-rotation";
import type { Job } from "../src/types/job";

/**
 * src/lib/jobs.ts の getVisibleJobs → getPublishedJobs と同じ条件で候補を作る。
 * （あちらは data/jobs.ts を直接読むので、架空求人に差し替えられない）
 */
function todayInJst(): string {
    return new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

function buildCandidates(all: Job[], isProduction: boolean): Job[] {
    return all
        .filter((job) => {
            if (job.status === "draft") return false;
            if (job.isSample && isProduction) return false;
            if (job.status === "expired") return false;
            return job.expiresAt >= todayInJst();
        })
        .sort((a, b) => {
            const diff = countWorkplaceDisclosure(b) - countWorkplaceDisclosure(a);
            if (diff !== 0) return diff;
            return b.publishedAt.localeCompare(a.publishedAt);
        });
}

function pick(all: Job[], options?: SponsoredJobOptions, isProduction = false): Job | null {
    return selectSponsoredJob(buildCandidates(all, isProduction), options);
}

// --- 検証用の架空求人 --------------------------------------------------

function makeJob(over: Partial<Job> & Pick<Job, "id" | "slug">): Job {
    return {
        status: "published",
        publishedAt: "2026-09-01",
        expiresAt: "2099-12-01",
        isSample: true,
        title: "作業療法士（正職員）",
        profession: ["OT"],
        facilityName: `検証施設 ${over.id}`,
        facilityType: "roken",
        prefecture: "香川県",
        city: "高松市",
        address: "香川県高松市検証町1-1",
        employmentType: "full-time",
        salary: "月給 240,000円",
        workHours: "8:30〜17:30",
        holidays: "4週8休",
        jobDescription: "検証用のダミーです。",
        requirements: "検証用のダミーです。",
        officialRecruitUrl: "https://example.com/recruit/",
        ...over,
    } as Job;
}

let failed = 0;
function check(label: string, ok: boolean, detail = "") {
    console.log(`${ok ? "  OK  " : " FAIL "} ${label}${detail ? `  … ${detail}` : ""}`);
    if (!ok) failed += 1;
}

// 1) 0件
check("候補0件 → null", pick([]) === null);

// 2) 下書き・掲載終了だけ → null
const onlyHidden = [
    makeJob({ id: "d1", slug: "d1", status: "draft" }),
    makeJob({ id: "e1", slug: "e1", status: "expired" }),
    makeJob({ id: "e2", slug: "e2", expiresAt: "2020-01-01" }),
];
check("下書き・掲載終了・期限切れだけ → null", pick(onlyHidden, { seed: "x" }) === null);

// 3) 1件
const one = [makeJob({ id: "a", slug: "a" })];
check("候補1件 → その1件", pick(one, { seed: "seed-1" })?.id === "a");

// 4) 本番では掲載サンプルを出さない
check("本番デプロイでは isSample を出さない", pick(one, { seed: "s" }, true) === null);

// 5) 複数件 → 先頭以外も選ばれる
const many = ["a", "b", "c", "d"].map((id) => makeJob({ id, slug: id }));
const seeds = Array.from({ length: 200 }, (_, i) => `item:sample-${i}`);
const counts = new Map<string, number>();
for (const seed of seeds) {
    const job = pick(many, { seed });
    counts.set(job!.id, (counts.get(job!.id) ?? 0) + 1);
}
const distribution = [...counts.entries()].sort().map(([id, n]) => `${id}:${n}`).join(" / ");
check("候補4件を200ページに割り当て → 4件すべて選ばれる", counts.size === 4, distribution);
check(
    "偏りが極端でない（どの求人も200ページ中20件以上）",
    [...counts.values()].every((n) => n >= 20),
    distribution,
);

// 6) 同じ seed なら毎回同じ（ちらつき・hydration不一致の防止）
check(
    "同じ seed は常に同じ求人",
    pick(many, { seed: "item:fixed" })?.id === pick(many, { seed: "item:fixed" })?.id,
);

// 7) seed 無し → 先頭（従来どおりの固定表示）
check("seed を渡さなければ先頭", pick(many)?.id === "a");

// 8) 文脈一致：合う候補があればその中から選ぶ
const mixed = [
    makeJob({ id: "roken-1", slug: "roken-1", targeting: { targetFacilityTypes: ["roken"] } }),
    makeJob({ id: "roken-2", slug: "roken-2", targeting: { targetFacilityTypes: ["roken"] } }),
    makeJob({
        id: "kaifuku-1",
        slug: "kaifuku-1",
        facilityType: "kaifukuki-hospital",
        targeting: { targetFacilityTypes: ["kaifukuki-hospital"] },
    }),
];
const matchedIds = new Set(seeds.map((seed) => pick(mixed, { seed, facilityTypes: ["roken"] })!.id));
check(
    "施設種別で絞ると、その施設種別の求人だけが出る",
    [...matchedIds].every((id) => id.startsWith("roken-")) && matchedIds.size === 2,
    [...matchedIds].sort().join(" / "),
);

// 9) 文脈に合う候補が0件 → 候補全体から選ぶ（枠が空にならない）
const noMatch = new Set(
    seeds.slice(0, 50).map((seed) => pick(mixed, { seed, facilityTypes: ["tokuyo"] })!.id),
);
check("文脈に合う求人が無くても枠は空にしない", noMatch.size >= 1, [...noMatch].sort().join(" / "));

console.log(failed === 0 ? "\n全項目OK" : `\n${failed}件NG`);
process.exit(failed === 0 ? 0 : 1);
