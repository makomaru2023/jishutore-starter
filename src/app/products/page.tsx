import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LineBanner } from "@/components/LineBanner";
import { PlusSubscribeButton } from "@/components/plus/PlusSubscribeButton";
import { TrackedLineLink } from "@/components/TrackedLineLink";
import { PLUS_SLIDE_COUNT } from "@/constants/plus";
import { PLUS_CURRENT_PRICE } from "@/lib/plus-subscription";
import {
    PLUS_PROMO_BADGE_TEXT,
    PLUS_PROMO_CURRENT_PRICE_YEN,
    PLUS_PROMO_IS_ACTIVE,
    PLUS_PROMO_PRICE_NOTE,
} from "@/constants/plus-pricing";

export const metadata: Metadata = {
    title: "有料コンテンツ｜自主トレ素材庫",
    description:
        "有料コンテンツは「自主トレ素材庫Plus」ひとつ。編集できる運動スライド、疾患別・姿勢別の完成デッキ、伝わるプロンプト工房、診療・介護報酬チェックが全部入りの月額サービスです。",
    alternates: {
        canonical: "https://jishutore-sozaiko.online/products/",
    },
};

const LINE_URL = "https://lin.ee/79a5bNt";

// 旧・個別販売商品。Plus収録済み（各ページは収録のお知らせとして残している）
const mergedProducts = [
    { name: "疾患別自主トレ資料（9本セット）", href: "/products/self-training-materials/" },
    { name: "姿勢別自主トレPowerPointセット", href: "/products/home-elderly-self-training/" },
    { name: "伝わるプロンプト工房", href: "/products/slide-prompt-generator/" },
] as const;

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6 21 12m0 0-7.5 6M21 12H3" />
        </svg>
    );
}

export default function ProductsPage() {
    const plusCheckoutReady = Boolean(PLUS_CURRENT_PRICE);

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Header />
            <main className="flex-1 [&_h1]:break-keep [&_h2]:break-keep [&_h3]:break-keep [&_p]:break-keep">
                <section className="border-b border-slate-200 bg-white">
                    <div className="container mx-auto px-4 py-12 sm:py-16">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-xs font-black tracking-widest text-blue-700">有料コンテンツ</p>
                            <h1 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
                                有料は「Plus」ひとつだけ
                            </h1>
                            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                                スライド素材・完成デッキ・作成ツール・報酬チェックを、ひとつの月額にまとめました。
                                どれを買うか迷う必要はありません。
                            </p>
                        </div>
                    </div>
                </section>

                <section id="plus" className="scroll-mt-24 bg-white py-12 sm:py-16">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto grid max-w-5xl gap-6 rounded-lg border border-blue-200 bg-blue-50 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center">
                            <div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="rounded-full bg-blue-700 px-3 py-1 text-xs font-black text-white">
                                        全部入り
                                    </span>
                                    {PLUS_PROMO_IS_ACTIVE && (
                                        <span className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-black text-amber-900">
                                            {PLUS_PROMO_BADGE_TEXT}
                                        </span>
                                    )}
                                </div>
                                <h2 className="mt-4 text-2xl font-black text-slate-950 sm:text-3xl">
                                    自主トレ素材庫Plus
                                </h2>
                                <p className="mt-3 text-base font-black leading-7 text-slate-900 sm:text-lg">
                                    資料づくりと、診療・介護報酬の確認をひとつに。
                                </p>
                                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-lg border border-blue-200 bg-white p-4">
                                        <p className="text-xs font-black tracking-wider text-blue-700">自主トレ資料</p>
                                        <p className="mt-1 text-sm font-black text-slate-950">選んで編集できるスライド</p>
                                        <p className="mt-2 text-xs leading-5 text-slate-600">
                                            {PLUS_SLIDE_COUNT}点から必要なページを選び、説明文や注意点を対象者に合わせて編集できます。
                                        </p>
                                    </div>
                                    <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                                        <p className="text-xs font-black tracking-wider text-emerald-700">報酬チェック</p>
                                        <p className="mt-1 text-sm font-black text-slate-950">算定要件から自己点検まで</p>
                                        <p className="mt-2 text-xs leading-5 text-slate-600">
                                            診療・介護報酬の単位数、記録に残すこと、見落としやすい点を確認できます。
                                        </p>
                                    </div>
                                    <div className="rounded-lg border border-blue-200 bg-white p-4">
                                        <p className="text-xs font-black tracking-wider text-blue-700">完成デッキ</p>
                                        <p className="mt-1 text-sm font-black text-slate-950">疾患別9本＋姿勢別セット</p>
                                        <p className="mt-2 text-xs leading-5 text-slate-600">
                                            退院前・訪問リハでそのまま使える完成済みPowerPointをZIPでダウンロードできます。
                                        </p>
                                    </div>
                                    <div className="rounded-lg border border-blue-200 bg-white p-4">
                                        <p className="text-xs font-black tracking-wider text-blue-700">会員ツール</p>
                                        <p className="mt-1 text-sm font-black text-slate-950">伝わるプロンプト工房</p>
                                        <p className="mt-2 text-xs leading-5 text-slate-600">
                                            ChatGPTに貼るだけでスライド画像を量産できるプロンプトを作成できます。
                                        </p>
                                    </div>
                                </div>
                                {PLUS_PROMO_IS_ACTIVE && (
                                    <p className="mt-3 text-sm font-bold leading-6 text-blue-800">
                                        {PLUS_PROMO_PRICE_NOTE}
                                        いつでも解約できます。
                                    </p>
                                )}
                            </div>
                            <div className="rounded-lg border border-blue-200 bg-white p-4">
                                <p className="text-xs font-black tracking-widest text-blue-700">
                                    {PLUS_PROMO_IS_ACTIVE ? "先行価格" : "料金"}
                                </p>
                                <p className="mt-1 text-3xl font-black text-slate-950">月額{PLUS_PROMO_CURRENT_PRICE_YEN}円</p>
                                <p className="mt-1 text-xs font-bold leading-5 text-slate-500">
                                    スライド{PLUS_SLIDE_COUNT}点＋完成デッキ＋ツール＋報酬チェック<br />すべて利用できます
                                </p>
                                <div className="mt-4 grid gap-2">
                                    {plusCheckoutReady ? (
                                        <PlusSubscribeButton
                                            placement="products_index_plus_card"
                                            label={`月額${PLUS_PROMO_CURRENT_PRICE_YEN}円で申し込む`}
                                            className="inline-flex w-full items-center justify-center rounded-full bg-blue-700 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-blue-800"
                                        />
                                    ) : (
                                        <span className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-black text-slate-400">
                                            準備中
                                        </span>
                                    )}
                                    <Link
                                        href="/products/jishutore-plus/"
                                        className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-blue-200 bg-white px-5 py-2.5 text-sm font-black text-blue-700 transition hover:bg-blue-50"
                                    >
                                        詳細を見る
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="mx-auto mt-6 max-w-5xl rounded-lg border border-slate-200 bg-white p-5">
                            <p className="text-sm font-black text-slate-900">個別販売していた商品はPlusに収録されました</p>
                            <p className="mt-2 text-xs leading-6 text-slate-600">
                                以下の商品の個別販売は終了しました。ご購入済みの方は、これまでどおり購入分をご利用いただけます。
                            </p>
                            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                                {mergedProducts.map((product) => (
                                    <li key={product.href}>
                                        <Link
                                            href={product.href}
                                            className="text-xs font-bold text-blue-700 underline underline-offset-2 hover:text-blue-500"
                                        >
                                            {product.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="border-t border-slate-200 bg-white py-12 sm:py-16">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-5xl">
                            <div className="mb-6">
                                <p className="text-xs font-black tracking-widest text-blue-700">施設・事業所向け</p>
                                <h2 className="mt-2 text-2xl font-black text-slate-950">
                                    施設・事業所向けパック
                                </h2>
                                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                                    デイサービスなどでそのまま使える資料パックを準備しています。
                                    販売開始は、LINEで先行してお知らせします。
                                </p>
                            </div>
                            <article className="flex flex-col rounded-lg border border-slate-200 bg-slate-50 p-5 sm:p-6">
                                <div className="mb-3 flex flex-wrap items-center gap-2">
                                    <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-black text-slate-500">
                                        準備中
                                    </span>
                                </div>
                                <h3 className="text-lg font-black leading-snug text-slate-950 sm:text-xl">
                                    デイサービス向け 体操・口腔体操・転倒予防資料パック
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-slate-600">
                                    集団体操・口腔体操・転倒予防・記録表などを1パックにまとめた、施設向けの資料集です。
                                </p>
                                <Link
                                    href="/products/day-service-exercise-pack/"
                                    className="mt-5 inline-flex min-h-12 w-fit items-center justify-center gap-1.5 rounded-full border border-blue-200 bg-white px-5 py-3 text-sm font-black text-blue-700 transition hover:bg-blue-50"
                                >
                                    内容を見る
                                    <ArrowIcon className="h-3.5 w-3.5" />
                                </Link>
                            </article>
                        </div>
                    </div>
                </section>

                <section className="border-t border-slate-200 bg-white py-12 sm:py-16">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-5xl">
                            <div className="mb-5 text-center">
                                <h2 className="text-2xl font-black text-slate-950">まだ迷う方へ</h2>
                                <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                                    新作やアップデートのお知らせはLINEで受け取れます。
                                    迷う場合は、まず無料特典から雰囲気を確認できます。
                                </p>
                                <TrackedLineLink
                                    href={LINE_URL}
                                    placement="products_page"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-black text-white transition hover:bg-slate-800"
                                >
                                    LINEで案内を受け取る
                                </TrackedLineLink>
                            </div>
                            <LineBanner />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
