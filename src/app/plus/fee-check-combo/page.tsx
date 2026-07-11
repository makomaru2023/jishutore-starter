import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { FeeComboChecker } from "@/components/plus/FeeComboChecker";
import { getComboDomains } from "@/lib/fee-check";
import { hasActivePlusAccess } from "@/lib/plus-access";

export const metadata: Metadata = {
    title: "加算の組み合わせチェック｜自主トレ素材庫Plus",
    description:
        "算定中の加算にチェックを入れると、その組み合わせに含まれる併算定不可・条件付き・区分選択制の規定を、根拠リンクつきで確認できるPlus会員向けツールです。",
    robots: { index: false, follow: false },
};

export default async function FeeCheckComboPage() {
    // middleware はセッションCookieの有無だけを見るため、ここで契約状態まで確認する
    // （解約者を弾く。資料庫・報酬チェック詳細と同じ基準）。
    if (!(await hasActivePlusAccess())) {
        redirect("/plus/login/?error=nosub");
    }

    const domains = getComboDomains();

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Header />
            <main className="min-w-0 flex-1 overflow-x-clip [&_h1]:break-keep [&_h2]:break-keep [&_h3]:break-keep">
                <section className="border-b border-blue-100 bg-blue-50/60">
                    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
                        <p className="text-xs font-bold tracking-widest text-blue-700">PLUS限定ツール</p>
                        <h1 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">加算の組み合わせチェック</h1>
                        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                            算定している（予定の）加算にチェックを入れると、その組み合わせに含まれる「一緒に算定できない」規定を、根拠リンクつきで表示します。
                            返戻の原因になりやすい組み合わせの自己点検にお使いください。
                        </p>
                        <p className="mt-2 text-xs leading-6 text-slate-500">
                            単位数・算定要件など各加算の詳細は{" "}
                            <Link href="/fee-check/" className="font-bold text-blue-700 hover:underline">
                                報酬チェック
                            </Link>
                            {" "}のページで確認できます。
                        </p>
                    </div>
                </section>

                <section className="py-8 sm:py-10">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        {domains.length === 0 ? (
                            <p className="text-sm text-slate-600">現在、組み合わせチェックに対応した分野はありません。</p>
                        ) : (
                            <FeeComboChecker domains={domains} />
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
