import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PurchaseTracker } from "./PurchaseTracker";
import { Metadata } from "next";
import { stripe } from "@/lib/stripe";
import { buildOrder, getOrder, isOrderActive, saveOrder, PRODUCT_ZIP_KEYS } from "@/lib/orders";
import {
    POSTURE_SELF_TRAINING_PRICE_ID,
    BUNDLE_SELF_TRAINING_PRICE_ID,
    SLIDE_PROMPT_GENERATOR_PRICE_ID,
} from "@/lib/products";
import { signDownloadToken } from "@/lib/auth";
import { DownloadTrackingLink } from "@/components/DownloadTrackingLink";
import { grantSlidePromptAccess } from "./grant-slide-prompt-access";

export const metadata: Metadata = {
    title: "ご購入ありがとうございます｜自主トレ素材庫",
    description: "自主トレ資料セットのダウンロードページです。",
    robots: { index: false, follow: false },
};

// Always render server-side; never cache (auth-sensitive).
export const dynamic = "force-dynamic";

const PRODUCT_NAME_BY_ID: Record<string, string> = {
    "self-training-materials-vol01": "疾患別自主トレ資料セット",
    "home-elderly-self-training": "姿勢別 自主トレ指導資料セット",
    "bundle-self-training-set": "疾患別＋姿勢別 まとめ買いセット",
    "slide-prompt-generator": "伝わるプロンプト工房（スライド画像生成）",
};

const PURCHASE_SURVEY_URL = "https://forms.gle/NkuUY7tB8kwNZiYh7";

/** アクセス権付与型の商品（ZIPダウンロードではなくサイト内ツールへの入場権） */
const ACCESS_ONLY_PRODUCT_IDS = new Set(["slide-prompt-generator"]);

type DownloadEntry = {
    itemName: string;
    fileName: string;
    description: string;
    /**
     * `public` … /files/ 以下の静的ZIPを直接配信。
     * `r2-token` … サンクスページで発行する短期トークンで /api/download 経由で R2 から配信。
     */
    delivery: "public" | "r2-token";
    /** delivery === "public" の場合のみ使用する直リンク先。 */
    publicHref?: string;
};

/**
 * productId ごとのダウンロード一覧。
 * バンドル商品は複数エントリを持つ。
 */
const PRODUCT_DOWNLOADS: Record<string, DownloadEntry[]> = {
    "self-training-materials-vol01": [
        {
            itemName: "疾患別自主トレ資料セット",
            fileName: "jishutore-materials-vol01.zip",
            description: "PowerPoint版とPDF版をまとめたZIPファイルです。",
            delivery: "r2-token",
        },
    ],
    "home-elderly-self-training": [
        {
            itemName: "姿勢別 自主トレ指導資料セット",
            fileName: "home-elderly-self-training.zip",
            description: "PowerPoint版とPDF版をまとめたZIPファイルです。",
            delivery: "public",
            publicHref: "/files/home-elderly-self-training.zip",
        },
    ],
    "bundle-self-training-set": [
        {
            itemName: "疾患別 自主トレ資料9本セット",
            fileName: "jishutore-materials-vol01.zip",
            description: "脳卒中・大腿骨頸部骨折など、疾患別9本のPowerPoint＋PDFをまとめたZIPです。",
            delivery: "r2-token",
        },
        {
            itemName: "姿勢別 自主トレ指導資料セット",
            fileName: "home-elderly-self-training.zip",
            description: "在宅高齢者向け・姿勢別6種のPowerPoint＋PDFをまとめたZIPです。",
            delivery: "public",
            publicHref: "/files/home-elderly-self-training.zip",
        },
    ],
};

/**
 * Stripe Price ID → 内部 productId のマップ。
 * thank-you ページの自己修復（Webhook 取りこぼし時のリカバリ）で使う。
 * Webhook 側の `priceIdToProductId` と同じ内容を保つこと。
 */
function priceIdToProductId(priceId: string | null | undefined): string | null {
    if (!priceId) return null;
    const map: Record<string, string> = {
        [process.env.STRIPE_PRICE_ID_SELF_TRAINING_SET || ""]: "self-training-materials-vol01",
        [POSTURE_SELF_TRAINING_PRICE_ID || ""]: "home-elderly-self-training",
        [BUNDLE_SELF_TRAINING_PRICE_ID || ""]: "bundle-self-training-set",
        [SLIDE_PROMPT_GENERATOR_PRICE_ID || ""]: "slide-prompt-generator",
    };
    return map[priceId] || null;
}

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
    let order = await getOrder(sessionId);

    // 2b. Self-healing — Webhook may not have run yet, or may have failed (e.g. unknown product
    //     before this code shipped). If the session is paid AND the line item's priceId resolves
    //     to a known productId, persist the order on-the-fly so the download UI works without
    //     manual intervention.
    if (!order) {
        try {
            const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 5 });
            const priceId = lineItems.data[0]?.price?.id;
            const productId = priceIdToProductId(priceId);
            if (productId && PRODUCT_ZIP_KEYS[productId]) {
                const recovered = buildOrder({
                    sessionId: session.id,
                    productId,
                    amount: session.amount_total ?? 0,
                    currency: session.currency ?? "jpy",
                    email: session.customer_details?.email ?? session.customer_email ?? null,
                    stripeCustomerId:
                        typeof session.customer === "string"
                            ? session.customer
                            : session.customer?.id ?? null,
                    paymentStatus: session.payment_status,
                });
                await saveOrder(recovered);
                console.log(`Order recovered on thank-you page: ${recovered.sessionId} (${recovered.productId})`);
                order = recovered;
            }
        } catch (err) {
            console.error("Self-heal of missing order failed:", err);
        }
    }

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
                        {state.status === "ok" && (
                            <OkBody
                                token={state.token}
                                productId={state.productId}
                                productName={state.productName}
                                expiresAt={state.expiresAt}
                                sessionId={session_id}
                            />
                        )}
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
                                有料コンテンツ一覧へ戻る
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

function OkBody({
    token,
    productId,
    productName,
    expiresAt,
    sessionId,
}: {
    token: string;
    productId: string;
    productName: string;
    expiresAt: string;
    sessionId?: string;
}) {
    // アクセス権付与型の商品（プロンプト工房など）は専用UIに分岐
    if (ACCESS_ONLY_PRODUCT_IDS.has(productId)) {
        return <AccessOnlyBody productId={productId} productName={productName} sessionId={sessionId} />;
    }

    const downloads = PRODUCT_DOWNLOADS[productId] ?? [];
    const isBundle = downloads.length > 1;

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
            <p className="mt-4 text-center text-sm leading-relaxed text-slate-600 break-keep">
                {productName}をご購入いただきありがとうございます。
                <br />
                {isBundle
                    ? "以下の2つのZIPをそれぞれダウンロードしてください。"
                    : "以下のボタンから資料セットをダウンロードしてください。"}
            </p>

            <div className="mt-6 space-y-4">
                {downloads.map((dl, index) => (
                    <DownloadCard
                        key={`${dl.fileName}-${index}`}
                        entry={dl}
                        token={token}
                        index={isBundle ? index + 1 : undefined}
                        total={isBundle ? downloads.length : undefined}
                    />
                ))}
            </div>

            {downloads.some((d) => d.delivery === "r2-token") && (
                <p className="mt-3 text-center text-xs text-slate-500 break-keep">
                    署名つきダウンロードリンクは <strong>{formatDate(expiresAt)}</strong> まで有効です（ページを再読み込みすればリンクを再発行できます）。
                </p>
            )}

            <PurchaseSurveyCard />

            <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-4">
                <p className="text-xs leading-relaxed text-amber-800 break-keep">
                    ダウンロードURLの共有、資料データそのものの再配布はご遠慮ください。
                    患者さんへの説明、家族説明、施設内資料作成にはご利用いただけます。
                </p>
            </div>
        </>
    );
}

function PurchaseSurveyCard() {
    return (
        <div className="mt-6 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm shadow-blue-100/60">
            <p className="text-xs font-black tracking-widest text-blue-700">
                任意アンケート
            </p>
            <h2 className="mt-2 text-lg font-black tracking-tight text-slate-900">
                使い心地を教えていただけると助かります
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 break-keep">
                今後の資料改善や新作づくりの参考にするため、購入者向けの簡単なアンケートを用意しています。
                回答は任意で、1〜2分ほどで終わります。まだ使っていない場合は、実際に使ってからの回答で大丈夫です。
            </p>
            <p className="mt-2 text-xs leading-relaxed text-slate-500 break-keep">
                患者さん個人が特定される情報や、個別の医療相談は入力しないでください。
            </p>
            <a
                href={PURCHASE_SURVEY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-bold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
            >
                使い心地アンケートに回答する
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.3} stroke="currentColor" className="h-4 w-4" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5H19.5M19.5 4.5V10.5M19.5 4.5 10.5 13.5M6 6.75H4.5A1.5 1.5 0 0 0 3 8.25v11.25A1.5 1.5 0 0 0 4.5 21h11.25a1.5 1.5 0 0 0 1.5-1.5V18" />
                </svg>
            </a>
        </div>
    );
}

function DownloadCard({
    entry,
    token,
    index,
    total,
}: {
    entry: DownloadEntry;
    token: string;
    index?: number;
    total?: number;
}) {
    const href =
        entry.delivery === "public" && entry.publicHref
            ? entry.publicHref
            : `/api/download?token=${encodeURIComponent(token)}`;

    return (
        <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
            {index && total && (
                <p className="mb-1 text-[11px] font-bold tracking-widest text-blue-600">
                    ZIP {index} / {total}
                </p>
            )}
            <p className="break-keep text-base font-black text-slate-900">
                {entry.itemName}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 break-keep">
                {entry.description}
            </p>
            <DownloadTrackingLink
                href={href}
                fileName={entry.fileName}
                itemName={entry.itemName}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-4 text-base font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/30"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                ZIPをダウンロードする
            </DownloadTrackingLink>
        </div>
    );
}

/**
 * アクセス権付与型の商品（プロンプト工房など）向けのサンクスページ本体。
 * 「アクセス開始」ボタンを押すと Server Action が Cookie をセットして
 * /member/slide-prompt-generator にリダイレクトする。
 */
function AccessOnlyBody({
    productId,
    productName,
    sessionId,
}: {
    productId: string;
    productName: string;
    sessionId?: string;
}) {
    if (productId !== "slide-prompt-generator" || !sessionId) {
        // 想定外の到達。安全側に倒して工房のLPへ案内。
        return (
            <>
                <h1 className="text-center text-xl font-black tracking-tight text-slate-900">
                    ご購入ありがとうございます
                </h1>
                <p className="mt-4 text-center text-sm text-slate-600 break-keep">
                    アクセス情報の表示中に問題が発生しました。お手数ですが
                    <a href="mailto:smart.rehabili@gmail.com" className="text-blue-600 hover:underline">smart.rehabili@gmail.com</a>
                    までご連絡ください。
                </p>
            </>
        );
    }

    const fallbackPassword = process.env.SLIDE_PROMPT_PASSWORD;

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
            <p className="mt-4 text-center text-sm leading-relaxed text-slate-600 break-keep">
                {productName}をご購入いただきありがとうございます。
                <br />
                下の「アクセスを開始する」を押すと、工房にログインした状態でジャンプします。
            </p>

            {/* アクセス開始ボタン（Server Action） */}
            <form
                action={async () => {
                    "use server";
                    await grantSlidePromptAccess(sessionId);
                }}
                className="mt-6"
            >
                <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-4 text-base font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/30"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                    工房へのアクセスを開始する
                </button>
            </form>

            {/* 次回のアクセス先（ブックマーク推奨） */}
            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
                <p className="mb-2 text-xs font-black tracking-widest text-blue-700">
                    次回からのアクセス先（ブックマーク推奨）
                </p>
                <p className="mb-3 text-sm leading-relaxed text-blue-900/80 break-keep">
                    ページを閉じても、下のボタンからいつでも工房に戻れます。ブラウザに<strong>ブックマーク（お気に入り登録）</strong>しておくと、次回すぐ開けます。
                </p>
                <a
                    href="/member/slide-prompt-generator"
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-blue-300 bg-white px-6 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
                >
                    工房を開く
                </a>
            </div>

            {/* 再ログイン用パスワードの案内（1年後のCookie失効後・別端末など、念のため） */}
            {fallbackPassword && (
                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="mb-2 text-xs font-black tracking-widest text-slate-600">
                        再ログイン用パスワード
                    </p>
                    <p className="mb-2 text-sm leading-relaxed text-slate-600 break-keep">
                        端末を変えたとき・しばらく経ってからアクセスし直すときは、ログイン画面でこのパスワードを入力してください。
                    </p>
                    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-base font-bold tracking-wider text-slate-900 select-all">
                        {fallbackPassword}
                    </div>
                    <p className="mt-2 text-[11px] leading-relaxed text-slate-500 break-keep">
                        ※ メモアプリや LINE Keep などに控えておくと安心です。
                    </p>
                </div>
            )}

            <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-4">
                <p className="text-xs leading-relaxed text-amber-800 break-keep">
                    パスワードの共有・転載はご遠慮ください。生成されたプロンプトの利用は、医療・介護現場での確認のうえでお願いいたします。
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
