import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PurchaseTracker } from "./PurchaseTracker";
import { Metadata } from "next";
import { stripe } from "@/lib/stripe";
import { getOrder, isOrderActive } from "@/lib/orders";
import { signDownloadToken } from "@/lib/auth";

export const metadata: Metadata = {
    title: "ご購入ありがとうございます｜自主トレ素材庫",
    description: "自主トレ資料セットのダウンロードページです。",
    robots: { index: false, follow: false },
};

// Always render server-side; never cache (auth-sensitive).
export const dynamic = "force-dynamic";

const PRODUCT_NAME_BY_ID: Record<string, string> = {
    "self-training-materials-vol01": "疾患別自主トレ資料セット",
};

type ThankYouState =
    | { status: "missing-session" }
    | { status: "session-not-paid" }
    | { status: "order-not-ready" } // webhook hasn't run yet
    | { status: "order-expired"; createdAt: string; expiresAt: string }
    | {
          status: "ok";
          productId: string;
          productName: string;
          amount: number;
          token: string;
          expiresAt: string;
      };

async function resolveState(sessionId?: string): Promise<ThankYouState> {
    if (!sessionId) return { status: "missing-session" };

    // 1. Verify the Checkout Session with Stripe (defense in depth — anyone can guess a session_id URL).
    let session;
    try {
        session = await stripe.checkout.sessions.retrieve(sessionId);
    } catch (err) {
        console.error("Failed to retrieve Stripe session:", err);
        return { status: "missing-session" };
    }
    if (session.payment_status !== "paid") {
        return { status: "session-not-paid" };
    }

    // 2. Look up the order record saved by the webhook.
    const order = await getOrder(sessionId);
    if (!order) {
        // Webhook may not have run yet (race condition right after redirect).
        return { status: "order-not-ready" };
    }
    if (!isOrderActive(order)) {
        return { status: "order-expired", createdAt: order.createdAt, expiresAt: order.expiresAt };
    }

    // 3. Issue a short-lived download token.
    const token = await signDownloadToken({ sessionId: order.sessionId, productId: order.productId });
    const productName = PRODUCT_NAME_BY_ID[order.productId] ?? order.productId;

    return {
        status: "ok",
        productId: order.productId,
        productName,
        amount: order.amount,
        token,
        expiresAt: order.expiresAt,
    };
}

function formatDate(iso: string): string {
    try {
        const d = new Date(iso);
        return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
    } catch {
        return iso;
    }
}

export default async function ThankYouPage({
    searchParams,
}: {
    searchParams: Promise<{ session_id?: string; product?: string }>;
}) {
    const { session_id } = await searchParams;
    const state = await resolveState(session_id);

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Header />
            {state.status === "ok" && (
                <PurchaseTracker
                    sessionId={session_id}
                    productId={state.productId}
                    productName={state.productName}
                    value={state.amount}
                />
            )}
            <main className="flex-1">
                <div className="container mx-auto max-w-2xl px-4 py-12 sm:py-16">
                    <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-9">
                        {state.status === "ok" && <OkBody token={state.token} expiresAt={state.expiresAt} />}
                        {state.status === "order-not-ready" && <OrderNotReadyBody />}
                        {state.status === "order-expired" && (
                            <OrderExpiredBody expiresAt={state.expiresAt} />
                        )}
                        {state.status === "session-not-paid" && <NotPaidBody />}
                        {state.status === "missing-session" && <MissingSessionBody />}

                        <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:justify-center">
                            <Link
                                href="/"
                                className="rounded-full border border-slate-200 px-5 py-2.5 text-center text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50"
                            >
                                トップページへ戻る
                            </Link>
                            <Link
                                href="/products"
                                className="rounded-full border border-slate-200 px-5 py-2.5 text-center text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50"
                            >
                                資料セットページへ戻る
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

function OkBody({ token, expiresAt }: { token: string; expiresAt: string }) {
    return (
        <>
            <div className="mb-5 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-7 w-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                </div>
            </div>

            <h1 className="text-center text-2xl font-black tracking-tight text-slate-900">
                ご購入ありがとうございます
            </h1>
            <p className="mt-4 text-center text-sm leading-relaxed text-slate-600">
                自主トレ資料セットをご購入いただきありがとうございます。
                <br />
                以下のボタンから資料セットをダウンロードしてください。
            </p>

            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
                <p className="mb-2 text-sm font-bold text-slate-700">ダウンロード内容</p>
                <ul className="space-y-1.5">
                    {[
                        "編集できるPPTX資料（9疾患）",
                        "印刷用PDF（9疾患）",
                        "使い方テキスト",
                        "利用規約テキスト",
                    ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-6">
                <a
                    href={`/api/download?token=${encodeURIComponent(token)}`}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-4 text-base font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/30"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    資料セットをダウンロードする
                </a>
                <p className="mt-2 text-center text-xs text-slate-500">
                    このダウンロードリンクは <strong>{formatDate(expiresAt)}</strong> まで有効です（ページを再読み込みすればリンクを再発行できます）。
                </p>
            </div>

            <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-4">
                <p className="text-xs leading-relaxed text-amber-800">
                    ダウンロードURLの共有、資料データそのものの再配布はご遠慮ください。
                    患者さんへの説明、家族説明、施設内資料作成にはご利用いただけます。
                </p>
            </div>
        </>
    );
}

function OrderNotReadyBody() {
    return (
        <>
            <h1 className="text-center text-xl font-black tracking-tight text-slate-900">
                決済処理を確認中です
            </h1>
            <p className="mt-4 text-center text-sm leading-relaxed text-slate-600">
                決済は完了していますが、サーバー側の処理がまだ完了していません。
                <br />
                <strong>10〜30秒ほど待ってからこのページを再読み込み</strong>してください。
            </p>
            <p className="mt-3 text-center text-xs text-slate-500">
                3 分以上経ってもこの表示の場合は、お手数ですが
                <a href="mailto:smart.rehabili@gmail.com" className="text-blue-600 hover:underline">smart.rehabili@gmail.com</a>
                までご連絡ください。
            </p>
        </>
    );
}

function OrderExpiredBody({ expiresAt }: { expiresAt: string }) {
    return (
        <>
            <h1 className="text-center text-xl font-black tracking-tight text-slate-900">
                ダウンロード期限を過ぎています
            </h1>
            <p className="mt-4 text-center text-sm leading-relaxed text-slate-600">
                このご注文のダウンロード可能期間（{formatDate(expiresAt)} まで）は終了しました。
                <br />
                再ダウンロードをご希望の場合は、ご購入時のメールアドレスを添えて
                <a href="mailto:smart.rehabili@gmail.com" className="text-blue-600 hover:underline">smart.rehabili@gmail.com</a>
                までご連絡ください。
            </p>
        </>
    );
}

function NotPaidBody() {
    return (
        <>
            <h1 className="text-center text-xl font-black tracking-tight text-slate-900">
                お支払いが完了していません
            </h1>
            <p className="mt-4 text-center text-sm leading-relaxed text-slate-600">
                お支払いが確認できませんでした。決済をやり直すか、お問い合わせください。
            </p>
        </>
    );
}

function MissingSessionBody() {
    return (
        <>
            <h1 className="text-center text-xl font-black tracking-tight text-slate-900">
                このページは購入完了後に表示されます
            </h1>
            <p className="mt-4 text-center text-sm leading-relaxed text-slate-600">
                ご購入手続きを完了するとダウンロードリンクが表示されます。
            </p>
        </>
    );
}
