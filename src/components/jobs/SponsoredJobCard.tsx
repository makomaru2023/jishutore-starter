"use client";

import Link from "next/link";
import { AdLabel } from "@/components/AdLabel";
import { JobCard } from "@/components/jobs/JobCard";
import type { JobPlacement } from "@/constants/jobs";
import type { Job } from "@/types/job";

/**
 * サイト内（素材ページ・報酬チェック・コラム等）に置く求人カード。
 * --------------------------------------------------------------
 * 求人一覧の JobCard に「求人広告」の明示を付けただけのもの。
 * 記事や素材の本文と広告を見分けられるようにするために分けている。
 *
 * ★今回はまだどのページにも設置していない（配信システムは作らない方針のため）。
 *   設置するときは、サーバーコンポーネント側で求人を選んで渡すだけでよい：
 *
 *     import { pickSponsoredJob } from "@/lib/jobs";
 *     const job = pickSponsoredJob({ professions: ["OT"], topics: ["adl"] });
 *     ...
 *     {job && <SponsoredJobCard job={job} placement="item_detail" />}
 *
 *   placement を設置場所ごとに変えると、GA4でどこのカードが効いたか比較できる。
 */
export function SponsoredJobCard({
    job,
    placement,
    className = "",
}: {
    job: Job;
    placement: JobPlacement;
    className?: string;
}) {
    return (
        <section className={`rounded-2xl border border-slate-200 bg-slate-50 p-4 ${className}`}>
            <div className="mb-3 flex items-center justify-between gap-3">
                <p className="flex items-center gap-2 text-xs font-black text-slate-500">
                    <AdLabel variant="job-ad" />
                    リハビリ職の求人
                </p>
                <Link href="/jobs/" className="text-xs font-black text-blue-700 hover:underline">
                    求人一覧
                </Link>
            </div>
            {/* 枠の見出しで「求人広告」と示しているので、カード側のラベルは出さない */}
            <JobCard job={job} placement={placement} showAdLabel={false} />
        </section>
    );
}
