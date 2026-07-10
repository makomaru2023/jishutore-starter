import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FeeCheckDetailCard } from "@/components/fee-check/FeeCheckDetailCard";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
    getFeeDescription,
    getFeeItem,
    getFeeItemUrl,
    getAllFeeItems,
    isSampleFeeItem,
} from "@/lib/fee-check";
import { hasActivePlusAccess } from "@/lib/plus-access";

export async function generateStaticParams() {
    return getAllFeeItems().map(({ domain, item }) => ({
        domain: domain.domain,
        id: item.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ domain: string; id: string }> }): Promise<Metadata> {
    const { domain: domainId, id } = await params;
    const result = getFeeItem(domainId, id);
    if (!result) {
        return { title: "報酬チェック項目が見つかりません｜自主トレ素材庫" };
    }

    const { domain, item } = result;
    const title = `${item.name}の算定要件・単位数（${domain.domainLabel}）【2026年度対応】｜自主トレ素材庫`;
    const description = getFeeDescription(item, domain);

    return {
        title,
        description,
        alternates: {
            canonical: `https://jishutore-sozaiko.online${getFeeItemUrl(domain.domain, item.id)}`,
        },
        openGraph: {
            title,
            description,
            url: `https://jishutore-sozaiko.online${getFeeItemUrl(domain.domain, item.id)}`,
            siteName: "自主トレ素材庫",
            type: "article",
        },
    };
}

export default async function FeeCheckDetailPage({ params }: { params: Promise<{ domain: string; id: string }> }) {
    const { domain: domainId, id } = await params;
    const result = getFeeItem(domainId, id);
    if (!result) notFound();

    const { domain, item } = result;
    const isSample = isSampleFeeItem(domain.domain, item.id);
    // サンプルは誰でも全文公開なので、契約確認（Stripe呼び出し）は不要。
    const isMember = isSample ? false : await hasActivePlusAccess();
    const isUnlocked = isMember || isSample;
    const visibleItem = isUnlocked
        ? item
        : {
            ...item,
            records: item.records.slice(0, 1),
            auditPoints: item.auditPoints.slice(0, 1),
            pitfalls: item.pitfalls?.slice(0, 1),
            relatedQA: undefined,
            changedInLastRevision: false,
            changeSummary: undefined,
        };
    const hiddenCounts = isUnlocked
        ? { records: 0, auditPoints: 0, pitfalls: 0 }
        : {
            records: Math.max(item.records.length - visibleItem.records.length, 0),
            auditPoints: Math.max(item.auditPoints.length - visibleItem.auditPoints.length, 0),
            pitfalls: Math.max((item.pitfalls?.length ?? 0) - (visibleItem.pitfalls?.length ?? 0), 0),
        };
    const relatedItems = domain.items
        .filter((entry) => entry.id !== item.id && entry.category === item.category)
        .slice(0, 4);

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Header />
            <main className="flex-1">
                <div className="container mx-auto px-4 py-8">
                    <div className="mx-auto max-w-5xl">
                        <nav className="mb-4 flex flex-wrap gap-2 text-sm font-bold text-slate-500">
                            <Link href="/fee-check/" className="text-blue-700 hover:underline">
                                報酬チェック
                            </Link>
                            <span>/</span>
                            <Link href={`/fee-check/${domain.domain}/`} className="text-blue-700 hover:underline">
                                {domain.domainLabel}
                            </Link>
                        </nav>

                        <FeeCheckDetailCard
                            domain={domain}
                            item={visibleItem}
                            isUnlocked={isUnlocked}
                            isSample={isSample}
                            hiddenCounts={hiddenCounts}
                        />

                        {relatedItems.length > 0 && (
                            <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
                                <h2 className="text-lg font-black text-slate-950">同じカテゴリの項目</h2>
                                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                                    {relatedItems.map((related) => (
                                        <Link
                                            key={related.id}
                                            href={getFeeItemUrl(domain.domain, related.id)}
                                            className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold leading-6 text-slate-700 hover:border-blue-300 hover:text-blue-700"
                                        >
                                            {related.name}
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
