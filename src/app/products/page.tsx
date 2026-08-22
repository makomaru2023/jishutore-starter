import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LineBanner } from "@/components/LineBanner";
import { PlusSubscribeButton } from "@/components/plus/PlusSubscribeButton";
import { PlusYearlyOption } from "@/components/plus/PlusYearlyOption";
import { isPlusYearlyAvailable } from "@/lib/plus-subscription";
import { TrackedLineLink } from "@/components/TrackedLineLink";
import { PLUS_SLIDE_COUNT } from "@/constants/plus";
import { PLUS_PAUSED_MEMBER_NOTE, PLUS_SIGNUP_PAUSED } from "@/constants/plus-availability";
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
        "有料は2種類です。使い続ける道具は月額の「自主トレ素材庫Plus」、資料そのものは買い切り。疾患別9本セットと姿勢別セットは各980円で、編集できる運動スライド・伝わるプロンプト工房・診療介護報酬チェックはPlusにまとまっています。",
    alternates: {
        canonical: "https://jishutore-sozaiko.online/products/",
    },
};

const LINE_URL = "https://lin.ee/79a5bNt";

export default function ProductsPage() {
    // ★受付停止中は価格IDの有無にかかわらず申し込ませない。
    const plusCheckoutReady = !PLUS_SIGNUP_PAUSED && Boolean(PLUS_CURRENT_PRICE);

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Header />
            <main className="min-w-0 flex-1 overflow-x-clip">
                <section className="border-b border-slate-200 bg-white">
                    <div className="container mx-auto px-4 py-12 sm:py-16">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-xs font-black tracking-widest text-blue-700">有料コンテンツ</p>
                            {PLUS_SIGNUP_PAUSED ? (
                                <>
                                    <h1 className="jp-heading mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
                                        そのまま配れる資料を、<span className="block sm:ml-2 sm:inline">買い切りで</span>
                                    </h1>
                                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                                        必要なものだけを選んで購入できます。
                                        月額の「自主トレ素材庫Plus」は、現在は新しいお申し込みを停止しています。
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h1 className="jp-heading mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
                                        <span className="block sm:inline">使い続ける道具は月額、</span>
                                        <span className="block sm:ml-2 sm:inline">資料は買い切り</span>
                                    </h1>
                                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                                        毎月使う道具（編集できるスライド・作成ツール・報酬チェック）は月額のPlusに。
                                        そのまま配れる資料は、必要なものだけ買い切りで選べます。
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                <section id="plus" className="scroll-mt-24 bg-white py-12 sm:py-16">
                    <div className="container mx-auto min-w-0 px-4">
                        <div className="mx-auto grid w-full min-w-0 max-w-5xl gap-6 overflow-hidden rounded-lg border border-blue-200 bg-blue-50 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center">
                            <div className="min-w-0">
                                <div className="flex min-w-0 flex-wrap gap-2">
                                    <span className="rounded-full bg-blue-700 px-3 py-1 text-xs font-black text-white">
                                        全部入り
                                    </span>
                                    {PLUS_PROMO_IS_ACTIVE && (
                                        <span className="max-w-full whitespace-normal break-normal rounded-xl border border-amber-300 bg-amber-50 px-3 py-1 text-center text-xs font-black leading-5 text-amber-900 [overflow-wrap:anywhere] sm:rounded-full">
                                            {PLUS_PROMO_BADGE_TEXT}
                                        </span>
                                    )}
                                </div>
                                <h2 className="jp-heading mt-4 text-2xl font-black text-slate-950 sm:text-3xl">
                                    自主トレ素材庫Plus
                                </h2>
                                <p className="mt-3 text-base font-black leading-7 text-slate-900 sm:text-lg">
                                    資料づくりと、診療・介護報酬の確認をひとつに。
                                </p>
                                <div className="mt-4 grid min-w-0 gap-3 sm:grid-cols-2">
                                    <div className="min-w-0 rounded-lg border border-blue-200 bg-white p-4">
                                        <p className="text-xs font-black tracking-wider text-blue-700">自主トレ資料</p>
                                        <p className="mt-1 text-sm font-black text-slate-950">選んで編集できるスライド</p>
                                        <p className="mt-2 text-xs leading-5 text-slate-600">
                                            {PLUS_SLIDE_COUNT}点から必要なページを選び、説明文や注意点を対象者に合わせて編集できます。
                                        </p>
                                    </div>
                                    <div className="min-w-0 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                                        <p className="text-xs font-black tracking-wider text-emerald-700">報酬チェック</p>
                                        <p className="mt-1 text-sm font-black text-slate-950">算定要件から自己点検まで</p>
                                        <p className="mt-2 text-xs leading-5 text-slate-600">
                                            診療・介護報酬の単位数、記録に残すこと、見落としやすい点を確認できます。
                                        </p>
                                    </div>
                                    <div className="min-w-0 rounded-lg border border-blue-200 bg-white p-4">
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
                            <div className="min-w-0 max-w-full rounded-lg border border-blue-200 bg-white p-4">
                                {PLUS_SIGNUP_PAUSED ? (
                                    <>
                                        <p className="text-xs font-black tracking-widest text-slate-500">受付状況</p>
                                        <p className="mt-1 text-2xl font-black leading-snug text-slate-800">
                                            新しいお申し込みは<br />停止しています
                                        </p>
                                        <p className="mt-2 text-xs font-bold leading-5 text-slate-500">
                                            再開時期が決まりましたら、LINEとサイトでお知らせします。
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-xs font-black tracking-widest text-blue-700">
                                            {PLUS_PROMO_IS_ACTIVE ? "先行価格" : "料金"}
                                        </p>
                                        <p className="mt-1 text-3xl font-black text-slate-950">月額{PLUS_PROMO_CURRENT_PRICE_YEN}円</p>
                                        <p className="mt-1 text-xs font-bold leading-5 text-slate-500">
                                            スライド{PLUS_SLIDE_COUNT}点＋ツール＋報酬チェック<br />すべて利用できます
                                        </p>
                                    </>
                                )}
                                <div className="mt-4 grid gap-2">
                                    {PLUS_SIGNUP_PAUSED ? (
                                        <>
                                            <span className="inline-flex min-h-12 w-full max-w-full items-center justify-center whitespace-normal rounded-full border border-slate-300 bg-slate-100 px-5 py-3 text-center text-sm font-black leading-5 text-slate-500">
                                                新規受付停止中
                                            </span>
                                            <p className="text-xs leading-5 text-slate-500">
                                                {PLUS_PAUSED_MEMBER_NOTE}
                                            </p>
                                            <Link
                                                href="/plus/library/"
                                                className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-blue-200 bg-white px-5 py-2.5 text-sm font-black text-blue-700 transition hover:bg-blue-50"
                                            >
                                                会員ページへ
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            {plusCheckoutReady ? (
                                                <PlusSubscribeButton
                                                    placement="products_index_plus_card"
                                                    label={`月額${PLUS_PROMO_CURRENT_PRICE_YEN}円で申し込む`}
                                                    className="inline-flex min-h-12 w-full max-w-full items-center justify-center whitespace-normal rounded-full bg-blue-700 px-5 py-3 text-center text-sm font-black leading-5 text-white shadow-sm transition hover:bg-blue-800"
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
                                        </>
                                    )}
                                </div>
                                {plusCheckoutReady && (
                                    <PlusYearlyOption
                                        placement="products_index_plus_card_yearly"
                                        isPurchasable={isPlusYearlyAvailable()}
                                        className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50/70 p-3 text-center"
                                    />
                                )}
                            </div>
                        </div>

                    </div>
                </section>

                <section className="border-t border-slate-200 bg-slate-50 py-12 sm:py-16">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-5xl">
                            <div className="mb-6 text-center">
                                <p className="text-xs font-black tracking-widest text-blue-700">買い切り</p>
                                <h2 className="jp-heading mt-2 text-2xl font-black text-slate-950">
                                    そのまま配れる資料は、必要なものだけ
                                </h2>
                                <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                                    完成済みのPowerPoint資料です。月額に入らず、1回のお支払いでずっと使えます。
                                </p>
                            </div>
                            <div className="grid gap-5 md:grid-cols-2">
                                <article className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <span className="self-start rounded-full bg-blue-700 px-3 py-1 text-xs font-black text-white">疾患別</span>
                                    <h3 className="jp-heading mt-3 text-lg font-black text-slate-950">疾患別自主トレPowerPoint 9本セット</h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">
                                        脳卒中・腰痛・膝OA・圧迫骨折後・パーキンソン病など、疾患ごとの注意点と運動をまとめた完成資料です。
                                    </p>
                                    <p className="mt-4 text-2xl font-black text-slate-950">980円</p>
                                    <Link
                                        href="/products/self-training-materials/"
                                        className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-blue-700 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-800"
                                    >
                                        詳細を見る
                                    </Link>
                                </article>
                                <article className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <span className="self-start rounded-full bg-indigo-700 px-3 py-1 text-xs font-black text-white">姿勢別</span>
                                    <h3 className="jp-heading mt-3 text-lg font-black text-slate-950">姿勢別自主トレPowerPointセット</h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">
                                        疾患名ではなく「今できる姿勢」から選べる完成資料です。体力や立位の安定性に合わせやすい構成になっています。
                                    </p>
                                    <p className="mt-4 text-2xl font-black text-slate-950">980円</p>
                                    <Link
                                        href="/products/home-elderly-self-training/"
                                        className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-indigo-700 px-5 py-3 text-sm font-black text-white transition hover:bg-indigo-800"
                                    >
                                        詳細を見る
                                    </Link>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-t border-slate-200 bg-white py-12 sm:py-16">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-5xl">
                            <div className="mb-5 text-center">
                                <h2 className="jp-heading text-2xl font-black text-slate-950">まだ迷う方へ</h2>
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
