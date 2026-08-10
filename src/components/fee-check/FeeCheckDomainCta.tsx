"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

/**
 * 加算の個別ページ末尾に置く、分野一覧への導線。
 *
 * 2026-08-10：報酬チェックは来訪者の46%を集めているのに1人1.24ページ・44秒で
 * 離脱していた（加算名で検索 → 単位数を確認 → 帰る、という1問1答の使われ方）。
 * 一方で分野トップに着地した人だけは1人2.50ページ回遊していたため、
 * 「この分野には他にも項目がある」と件数つきで伝える導線を末尾に置く。
 *
 * 効果は fee_check_domain_cta_click の発生数で測る。
 */
export function FeeCheckDomainCta({
    domain,
    domainLabel,
    href,
    itemCount,
}: {
    domain: string;
    domainLabel: string;
    href: string;
    itemCount: number;
}) {
    return (
        <section className="mt-6 rounded-lg border border-blue-200 bg-blue-50/70 p-5">
            <p className="text-xs font-black tracking-widest text-blue-700">SAME DOMAIN</p>
            <h2 className="mt-1 break-keep text-lg font-black leading-snug text-slate-950">
                {domainLabel}の算定要件を、まとめて確認できます
            </h2>
            <p className="mt-1.5 break-keep text-sm font-bold leading-relaxed text-slate-600">
                単位数・算定要件・厚生労働省の根拠資料へのリンクを、{itemCount}項目ぶん掲載しています。
            </p>
            <Link
                href={href}
                onClick={() =>
                    trackEvent("fee_check_domain_cta_click", {
                        fee_domain: domain,
                        item_count: itemCount,
                        placement: "item_footer",
                    })
                }
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-700 px-5 py-2.5 text-sm font-black text-white transition-colors hover:bg-blue-800"
            >
                {domainLabel}の一覧を見る（全{itemCount}項目）
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="h-4 w-4 flex-shrink-0"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
            </Link>
        </section>
    );
}
