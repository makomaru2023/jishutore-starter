"use client";

import Link from "next/link";
import { trackPlusFeeHubBannerClick } from "@/lib/analytics";

export function FeeCheckMemberHubBanner({
    domainCount,
    placement,
}: {
    domainCount: number;
    placement: "fee_check_top_member_banner" | "fee_check_detail_member_banner";
}) {
    return (
        <aside className="border-b border-blue-200 bg-blue-50" aria-label="Plus会員版のご案内">
            <div className="container mx-auto flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs font-bold leading-5 text-blue-950 sm:text-sm">
                    <span className="mr-2 rounded-full bg-blue-700 px-2.5 py-1 text-[10px] font-black text-white">Plus会員</span>
                    会員専用画面なら、全{domainCount}分野をまとめて確認できます。
                </p>
                <Link
                    href="/plus/fee-hub/"
                    onClick={() => trackPlusFeeHubBannerClick(placement)}
                    className="inline-flex min-h-10 items-center justify-center rounded-full bg-blue-700 px-4 py-2 text-xs font-black text-white transition hover:bg-blue-800 sm:min-h-0"
                >
                    Plus会員版で開く（タブ・検索・印刷）
                    <span className="ml-1" aria-hidden="true">→</span>
                </Link>
            </div>
        </aside>
    );
}
