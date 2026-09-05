/**
 * サイト内の求人広告枠に出す1件を選ぶロジック。
 * ================================================================
 * ★求人データ（@/data/jobs）を import しない純粋な関数だけを置く。
 *   データを持たないので、検証スクリプト（scripts/check-sponsored-job.ts）から
 *   架空の求人を渡して、0件・1件・複数件・文脈一致・分散をそのまま試せる。
 *   ★ロジックを写した検査は、写し忘れた瞬間に嘘になる。だから実物を呼ぶ。
 *
 * 実際に候補（掲載中の求人）を集めるのは @/lib/jobs の pickSponsoredJob。
 */

import type { Job, JobFacilityType, JobProfession } from "@/types/job";

export interface SponsoredJobOptions {
    /**
     * 分散のたね。設置ページを一意に表す文字列（素材ID・報酬チェック項目IDなど）。
     * 省略すると候補の先頭が返る（＝従来どおりの固定表示）。
     */
    seed?: string;
    professions?: JobProfession[];
    facilityTypes?: JobFacilityType[];
    topics?: string[];
}

/**
 * ページ単位で安定して分散させるための32bitハッシュ（FNV-1a）。
 * --------------------------------------------------------------
 * ★Math.random() を使わない理由：
 *   このサイトの素材詳細・報酬チェック詳細は静的生成なので、
 *   乱数はビルド時に1回だけ引かれ、次のデプロイまで固定される。
 *   「ランダムに見えて実際は固定」という、いちばん分かりにくい状態になる。
 * ★日時を読むのも使わない：静的生成の結果はビルド時刻で固定され、
 *   ページを再生成しない限り翌日になっても変わらない。
 *   → 入力（ページのキー）だけで決まる関数にして、
 *      同じページなら何度ビルドしても同じ求人が出るようにする。
 *      ＝ hydration不一致も、広告のちらつきも起きない。
 */
export function hashSeed(seed: string): number {
    let hash = 0x811c9dc5;
    for (let i = 0; i < seed.length; i += 1) {
        hash ^= seed.charCodeAt(i);
        hash = Math.imul(hash, 0x01000193) >>> 0;
    }
    return hash >>> 0;
}

/** options の条件に合う求人だけを残す。条件が無いときは全件そのまま。 */
function filterByTargeting(candidates: Job[], options: SponsoredJobOptions): Job[] {
    const { professions, facilityTypes, topics } = options;
    const hasFilter = Boolean(professions?.length || facilityTypes?.length || topics?.length);
    if (!hasFilter) return candidates;

    return candidates.filter((job) => {
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
}

/**
 * 掲載中の求人（candidates）から、広告枠に出す1件を選ぶ。
 * ================================================================
 * 【選び方】
 *   1. options の条件（職種・施設種別・トピック）に合う求人を優先する
 *   2. 合う求人が複数あるときは、seed から決まる位置の1件を返す
 *      → ページごとに違う求人が出て、先頭1件に偏らない
 *   3. 条件に合う求人が無ければ、候補全体から同じやり方で1件返す（枠を空にしない）
 *
 * ⚠【この方式の限界】
 *   分散するのは「ページ」であって「表示回数」ではない。
 *   人気ページに割り当たった求人ほど多く表示されるので、
 *   実際の表示回数が均等になることは保証しない。
 *   均等配分が必要になったら、job_impression の実測を見てから
 *   重み付け（掲載開始の新しい順・表示回数の少ない順）を足すこと。
 *   ★求人一覧（/jobs/）の並び順＝職場情報の開示率順は、ここでは変えない。
 *     一覧は求職者のための順序、この関数は広告枠の選び方で、目的が違う。
 */
export function selectSponsoredJob(
    candidates: Job[],
    options: SponsoredJobOptions = {},
): Job | null {
    if (candidates.length === 0) return null;

    const matched = filterByTargeting(candidates, options);
    const pool = matched.length > 0 ? matched : candidates;

    if (pool.length === 1) return pool[0];
    if (!options.seed) return pool[0];

    return pool[hashSeed(options.seed) % pool.length];
}
