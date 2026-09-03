"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

/**
 * 報酬チェックの「他の分野」への横移動リンク。
 * --------------------------------------------------------------
 * ★2026-09-03：内部リンクの実測で、分野ページ（8つ）へのリンクが
 *   ほぼトップページと同一分野の詳細ページからしか出ていないことが分かった。
 *   分野ページ同士は相互リンクゼロで、老健を見ている人が通所リハへ回れなかった。
 *
 *   分野ページは報酬チェックのハブ（1人2.50ページ回遊・2026-08-10の分析）なので、
 *   ここに評価と導線を集めたい。素材ページからは張らない（文脈が違うため）。
 *
 * ★見た目は意図的に軽くしている。詳細ページには既に
 *   アンケート・同カテゴリ・分野CTA・求人枠があるので、
 *   これ以上「押させる」ものを増やさない（CTAではなくナビとして置く）。
 *
 * 計測は既存の fee_check_domain_cta_click を placement 違いで流用する。
 */
export type FeeCheckDomainNavEntry = {
    domain: string;
    label: string;
    href: string;
    itemCount: number;
};

export function FeeCheckDomainNav({
    entries,
    placement,
    className = "",
}: {
    entries: FeeCheckDomainNavEntry[];
    placement: "domain_page" | "item_page";
    className?: string;
}) {
    if (entries.length === 0) return null;

    return (
        <nav className={`rounded-lg border border-slate-200 bg-white p-5 ${className}`}>
            <h2 className="text-sm font-black text-slate-950">ほかの分野の算定要件</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
                {entries.map((entry) => (
                    <li key={entry.domain}>
                        <Link
                            href={entry.href}
                            onClick={() =>
                                trackEvent("fee_check_domain_cta_click", {
                                    fee_domain: entry.domain,
                                    item_count: entry.itemCount,
                                    placement,
                                })
                            }
                            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                        >
                            {entry.label}
                            <span className="text-[11px] font-black text-slate-400">
                                {entry.itemCount}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
