"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { trackJobClick, trackJobImpression } from "@/lib/analytics";
import {
    jobEmploymentTypeLabels,
    jobFacilityTypeLabels,
    jobProfessionShortLabels,
    type JobPlacement,
} from "@/constants/jobs";
import { AdLabel } from "@/components/AdLabel";
import { WorkplaceDisclosureBadge } from "@/components/jobs/WorkplaceDisclosureBadge";
import type { Job } from "@/types/job";

/**
 * 求人カード。求人一覧と、将来の素材ページ等への設置で共通して使う。
 * --------------------------------------------------------------
 * ★求人データは import しない（type だけ。実行時には消える）。
 *   表示する求人はサーバーコンポーネントから props で渡すこと。
 *
 * 画面に入ったときに1回だけ job_impression を送る。
 * マウント時ではなく実際に見えたときに送るので、
 * 「掲載期間中に何回表示されたか」を施設へ報告できる。
 */
export function JobCard({
    job,
    placement,
    isExpired = false,
    showAdLabel = true,
}: {
    job: Job;
    placement: JobPlacement;
    /** 掲載終了した求人。一覧では控えめに出す */
    isExpired?: boolean;
    /**
     * 有償掲載であることのラベルを出すか。
     * ★既定は true。求人は掲載料をいただいて載せているので、
     *   カード単位で広告と分かるようにする（景表法のステマ規制）。
     *   false にしてよいのは、外側の枠がすでに「PR」を出している場合だけ
     *   （SponsoredJobCard がそれ。二重表示になるので中では消す）。
     */
    showAdLabel?: boolean;
}) {
    const ref = useRef<HTMLDivElement | null>(null);
    const sentRef = useRef(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const send = () => {
            if (sentRef.current) return;
            sentRef.current = true;
            trackJobImpression(job, placement);
        };

        if (typeof IntersectionObserver !== "function") {
            send();
            return;
        }
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        send();
                        observer.disconnect();
                    }
                }
            },
            { threshold: 0.5 },
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [job, placement]);

    return (
        <div ref={ref}>
            <Link
                href={`/jobs/${job.slug}/`}
                onClick={() => trackJobClick(job, placement)}
                className={`block rounded-2xl border bg-white p-5 transition-colors sm:p-6 ${
                    isExpired
                        ? "border-slate-200 opacity-70 hover:border-slate-300"
                        : "border-slate-200 hover:border-blue-300 hover:bg-blue-50/30"
                }`}
            >
                <div className="flex flex-wrap items-center gap-1.5">
                    {showAdLabel && !job.isSample && <AdLabel variant="pr" />}
                    {job.profession.map((profession) => (
                        <span
                            key={profession}
                            className="rounded-md bg-blue-600 px-2 py-0.5 text-xs font-black text-white"
                        >
                            {jobProfessionShortLabels[profession]}
                        </span>
                    ))}
                    <span className="rounded-md border border-slate-300 px-2 py-0.5 text-xs font-bold text-slate-600">
                        {jobEmploymentTypeLabels[job.employmentType]}
                    </span>
                    {job.isSample && (
                        <span className="rounded-md bg-amber-500 px-2 py-0.5 text-xs font-black text-white">
                            掲載サンプル
                        </span>
                    )}{isExpired && (
                        <span className="rounded-md bg-slate-500 px-2 py-0.5 text-xs font-black text-white">
                            掲載終了
                        </span>
                    )}
                </div>

                <h3 className="jp-heading mt-3 text-lg font-black leading-snug text-slate-950 sm:text-xl">
                    {job.facilityName}
                </h3>
                {job.corporationName && (
                    <p className="mt-1 text-xs font-bold text-slate-500">{job.corporationName}</p>
                )}

                <p className="jp-text mt-2 text-sm font-bold text-slate-700">
                    {job.title}
                </p>

                <p className="jp-text mt-2 text-sm font-bold text-slate-600">
                    {job.prefecture}{job.city}
                    <span className="mx-1.5 text-slate-300">|</span>
                    {jobFacilityTypeLabels[job.facilityType]}
                </p>

                <dl className="mt-4 space-y-1.5 border-t border-slate-100 pt-4">
                    <div className="flex gap-3">
                        <dt className="w-16 shrink-0 text-xs font-black text-slate-400">給与</dt>
                        {/* 金額は「300,000／円」と割れると読みにくい。短い値なので break-keep を明示する。 */}
                        <dd className="jp-text min-w-0 break-keep text-sm font-bold text-slate-800">{job.salary}</dd>
                    </div>
                    <div className="flex gap-3">
                        <dt className="w-16 shrink-0 text-xs font-black text-slate-400">休日</dt>
                        <dd className="jp-text min-w-0 break-keep text-sm font-bold text-slate-800">
                            {job.holidays.split("／")[0]}
                        </dd>
                    </div>
                </dl>

                {/* 開示率。10項目すべて公開した施設は塗りつぶしで目立つ。
                    一覧はこの開示率が高い順に並んでいる（src/lib/jobs.ts）。 */}
                <div className="mt-4">
                    <WorkplaceDisclosureBadge job={job} />
                </div>

                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-black text-blue-700">
                    求人詳細を見る
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
                </span>
            </Link>
        </div>
    );
}
