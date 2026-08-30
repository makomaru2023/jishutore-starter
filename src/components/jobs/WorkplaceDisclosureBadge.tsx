import {
    countWorkplaceDisclosure,
    JOB_WORKPLACE_DISCLOSURE_TOTAL,
} from "@/constants/jobs";
import type { Job } from "@/types/job";

/**
 * 「職場情報 8/10 公開」バッジ。
 * --------------------------------------------------------------
 * 求人カードと詳細ページの両方で使う。
 * 10/10 のときだけ塗りつぶしにして、開示しきった施設が一目で分かるようにする。
 *
 * 1項目も公開していない求人には出さない。開示ゼロの求人は
 * 「リハ職が知りたい職場情報」のセクション自体が出ないので、
 * わざわざ 0/10 と掲げなくても伝わる（施設を晒すのが目的ではない）。
 */
export function WorkplaceDisclosureBadge({
    job,
    size = "sm",
}: {
    job: Pick<Job, "workplace">;
    size?: "sm" | "md";
}) {
    const disclosed = countWorkplaceDisclosure(job);
    if (disclosed === 0) return null;

    const isComplete = disclosed === JOB_WORKPLACE_DISCLOSURE_TOTAL;
    const padding = size === "md" ? "px-3 py-1.5 text-sm" : "px-2.5 py-1 text-xs";

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full font-black ${padding} ${
                isComplete
                    ? "bg-blue-700 text-white"
                    : "border border-slate-300 bg-white text-slate-600"
            }`}
        >
            {isComplete && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3.5}
                    stroke="currentColor"
                    className="h-3 w-3 shrink-0"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
            )}
            職場情報 {disclosed}/{JOB_WORKPLACE_DISCLOSURE_TOTAL} 公開
        </span>
    );
}
