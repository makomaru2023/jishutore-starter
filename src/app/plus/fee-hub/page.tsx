import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FeeComboChecker } from "@/components/plus/FeeComboChecker";
import { FeeCheckTool } from "@/components/plus/FeeCheckTool";
import { PlusPlanManagementButton } from "@/components/plus/PlusPlanManagementButton";
import {
    FeeHubNavigation,
    type FeeHubTab,
} from "@/components/plus/FeeHubNavigation";
import {
    feeDomains,
    getComboDomains,
    getFeeCheckTotalCount,
} from "@/lib/fee-check";
import { hasActivePlusAccess } from "@/lib/plus-access";

export const metadata: Metadata = {
    title: "診療・介護報酬チェック 会員版｜自主トレ素材庫Plus",
    description:
        "全分野の算定要件・記録・自己点検と、加算の組み合わせを1ページで確認できる自主トレ素材庫Plus会員向けツールです。",
    robots: { index: false, follow: false },
};

export default async function PlusFeeHubPage({
    searchParams,
}: {
    searchParams: Promise<{ tab?: string }>;
}) {
    if (!(await hasActivePlusAccess())) {
        redirect("/plus/login/?error=nosub");
    }

    const params = await searchParams;
    const activeTab: FeeHubTab = params.tab === "combo" ? "combo" : "items";
    const comboDomains = getComboDomains();
    const itemCount = getFeeCheckTotalCount();

    return (
        <div className="flex min-h-screen min-w-0 flex-col overflow-x-clip bg-slate-50 print:bg-white">
            <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur print:hidden">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3 sm:flex-nowrap sm:gap-3 sm:px-6">
                    <Link href="/plus/library/" className="flex min-w-0 items-center gap-2.5" aria-label="自主トレ素材庫Plus 資料庫へ">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-xs font-black text-white shadow-sm">
                            P+
                        </span>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-black leading-tight text-slate-900 sm:text-lg">
                                自主トレ素材庫<span className="text-blue-600">Plus</span>
                            </p>
                            <p className="hidden truncate text-xs text-slate-500 sm:block">会員専用ツール</p>
                        </div>
                    </Link>
                    <nav
                        className="order-3 mt-2 grid w-full grid-cols-3 gap-1.5 border-t border-slate-100 pt-2 text-xs font-bold sm:order-none sm:ml-auto sm:mt-0 sm:flex sm:w-auto sm:shrink-0 sm:border-0 sm:pt-0"
                        aria-label="会員メニュー"
                    >
                        <Link
                            href="/plus/library/"
                            className="inline-flex min-h-10 items-center justify-center rounded-full border border-blue-200 bg-blue-50 px-2.5 text-center text-blue-700 transition hover:border-blue-300 hover:bg-blue-100 sm:px-3"
                        >
                            資料庫へ戻る
                        </Link>
                        <PlusPlanManagementButton className="inline-flex min-h-10 items-center justify-center rounded-full border border-slate-200 bg-white px-2.5 text-slate-600 transition hover:border-blue-300 hover:text-blue-700 disabled:opacity-60 sm:px-3">
                            プラン管理
                        </PlusPlanManagementButton>
                        <form action="/api/plus/auth/logout/" method="post">
                            <button
                                type="submit"
                                className="min-h-10 w-full rounded-full border border-slate-200 bg-white px-2.5 text-slate-500 transition hover:border-slate-300 hover:text-slate-700 sm:w-auto sm:px-3"
                            >
                                ログアウト
                            </button>
                        </form>
                    </nav>
                </div>
            </header>

            <main className="min-w-0 flex-1">
                <section className="border-b border-blue-100 bg-gradient-to-b from-blue-50 to-white print:hidden">
                    <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10">
                        <p className="text-xs font-black tracking-[0.18em] text-blue-700">PLUS会員専用</p>
                        <h1 className="mt-2 break-keep text-2xl font-black leading-tight text-slate-950 sm:text-3xl">
                            診療・介護報酬チェック 会員版
                        </h1>
                        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                            算定要件、記録に残すこと、自己点検、加算の組み合わせを、会員専用の1ページから確認できます。
                        </p>
                    </div>
                </section>

                <section className="border-b border-slate-200 bg-white print:hidden">
                    <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
                        <FeeHubNavigation
                            activeTab={activeTab}
                            domainCount={feeDomains.length}
                            itemCount={itemCount}
                        />
                    </div>
                </section>

                {activeTab === "items" ? (
                    <section aria-label="項目チェック" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 print:px-0 print:py-0">
                        <FeeCheckTool domains={feeDomains} />
                    </section>
                ) : (
                    <section aria-label="組み合わせチェック" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 print:px-0 print:py-0">
                        <div className="mb-5 rounded-xl border border-blue-100 bg-white p-5 shadow-sm print:hidden">
                            <p className="text-xs font-black tracking-[0.16em] text-blue-700">加算の組み合わせ</p>
                            <h2 className="mt-2 text-xl font-black text-slate-950 sm:text-2xl">併算定不可・前提加算をまとめて自己点検</h2>
                            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
                                算定中または算定予定の項目を選ぶと、同時算定できない組み合わせや確認が必要な前提を根拠リンクつきで表示します。
                            </p>
                        </div>
                        {comboDomains.length === 0 ? (
                            <p className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
                                現在、組み合わせチェックに対応した分野はありません。
                            </p>
                        ) : (
                            <FeeComboChecker domains={comboDomains} />
                        )}
                    </section>
                )}
            </main>
        </div>
    );
}
