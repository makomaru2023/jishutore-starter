import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PlusLibrary } from "@/components/plus/PlusLibrary";
import { hasActivePlusAccess } from "@/lib/plus-access";
import { PurchaseTracker } from "@/app/thank-you/PurchaseTracker";
import { getStripe } from "@/lib/stripe";
import { isPlusPriceObject } from "@/lib/plus-subscription";
import { feeDomains, getFeeCheckTotalCount } from "@/lib/fee-check";

export const metadata: Metadata = {
    title: "資料を選ぶ｜自主トレ素材庫Plus",
    description:
        "完成済みのPowerPoint資料を選んでZIPでまとめてダウンロードできる、リハ職・医療職・介護職向けの資料庫です。",
    // 会員向け画面のため、当面は検索エンジンに登録しない
    robots: { index: false, follow: false },
};

// middleware はセッションCookieの有無だけを見るため、ここで Stripe の契約状態まで
// 確認し、解約者が資料庫UIを閲覧できないようにする（ダウンロードAPIと同じ基準）。
export default async function PlusLibraryPage({
    searchParams,
}: {
    searchParams: Promise<{ welcome?: string; session_id?: string }>;
}) {
    if (!(await hasActivePlusAccess())) {
        redirect("/plus/login/?error=nosub");
    }
    const { welcome, session_id } = await searchParams;
    let purchaseAmount = 0;
    if (welcome === "1" && session_id) {
        try {
            const stripe = getStripe();
            if (stripe) {
                const session = await stripe.checkout.sessions.retrieve(session_id);
                const lineItems = await stripe.checkout.sessions.listLineItems(session_id, { limit: 5 });
                if (
                    session.mode === "subscription" &&
                    (session.status === "complete" || session.payment_status === "paid") &&
                    isPlusPriceObject(lineItems.data[0]?.price)
                ) {
                    purchaseAmount = session.amount_total ?? 0;
                }
            }
        } catch (error) {
            console.error("plus library: purchase tracking verification failed", error);
        }
    }

    return (
        <>
            {welcome === "1" && session_id && purchaseAmount > 0 && (
                <PurchaseTracker
                    sessionId={session_id}
                    productId="jishutore-plus"
                    productName="自主トレ素材庫Plus"
                    value={purchaseAmount}
                />
            )}
            <PlusLibrary
                feeDomainCount={feeDomains.length}
                feeItemCount={getFeeCheckTotalCount()}
            />
        </>
    );
}
