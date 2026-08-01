"use client";

import Link from "next/link";
import { useEffect } from "react";
import {
    trackPlusFeeHubTabChange,
    trackPlusFeeHubView,
} from "@/lib/analytics";

export type FeeHubTab = "items" | "combo";

const tabs: readonly {
    id: FeeHubTab;
    label: string;
    description: string;
    href: string;
}[] = [
    {
        id: "items",
        label: "項目チェック",
        description: "全分野の要件・記録を検索",
        href: "/plus/fee-hub/",
    },
    {
        id: "combo",
        label: "組み合わせチェック",
        description: "併算定不可・前提加算を確認",
        href: "/plus/fee-hub/?tab=combo",
    },
];

export function FeeHubNavigation({
    activeTab,
    domainCount,
    itemCount,
}: {
    activeTab: FeeHubTab;
    domainCount: number;
    itemCount: number;
}) {
    useEffect(() => {
        trackPlusFeeHubView(activeTab, domainCount, itemCount);
    }, [activeTab, domainCount, itemCount]);

    return (
        <nav aria-label="報酬チェック機能" className="grid grid-cols-2 gap-2">
            {tabs.map((tab) => {
                const isActive = tab.id === activeTab;
                return (
                    <Link
                        key={tab.id}
                        href={tab.href}
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => {
                            if (!isActive) trackPlusFeeHubTabChange(tab.id, activeTab);
                        }}
                        className={`flex min-h-14 min-w-0 flex-col items-center justify-center rounded-xl border px-2 py-2 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:min-h-16 sm:px-4 ${
                            isActive
                                ? "border-blue-700 bg-blue-700 text-white shadow-sm"
                                : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                        }`}
                    >
                        <span className="break-keep text-xs font-black sm:text-sm">{tab.label}</span>
                        <span className={`mt-1 hidden text-[11px] font-bold sm:block ${isActive ? "text-blue-100" : "text-slate-500"}`}>
                            {tab.description}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
}
