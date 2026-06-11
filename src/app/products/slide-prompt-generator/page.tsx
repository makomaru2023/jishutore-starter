import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LineBanner } from "@/components/LineBanner";
import { CheckoutButton } from "@/components/CheckoutButton";
import { SLIDE_PROMPT_GENERATOR_PRICE_ID } from "@/lib/products";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "伝わるプロンプト工房｜ChatGPTでスライド画像を量産する購入者専用ツール｜自主トレ素材庫",
    description:
        "用途・テーマ・枚数を選ぶだけで、ChatGPT にそのまま貼り付けられるスライド画像生成プロンプトを作成できる購入者専用ツール。家族説明・勉強会・利用者説明・退院前指導の資料づくりを時短。980円・買い切り・永久アクセス。",
    openGraph: {
        title: "伝わるプロンプト工房｜自主トレ素材庫",
        description:
            "ChatGPT に貼り付けるだけで、リハビリ・介護現場向けのスライド画像プロンプトが完成。980円・買い切り。",
    },
};

const PRODUCT_ID = "slide-prompt-generator";
const PRODUCT_NAME = "伝わるプロンプト工房";
const PRICE = 980;

const checkoutReady = Boolean(SLIDE_PROMPT_GENERATOR_PRICE_ID);

const HERO_BADGES = [
    "980円・買い切り",
    "永久アクセス",
    "ChatGPT 直貼り対応",
    "用途別テンプレ",
    "チェック式UI",
];

const PAIN_POINTS = [
    "勉強会のスライド作成に毎回時間がかかる",
    "家族説明の資料を一から書き起こすのが大変",
    "ChatGPT に聞いても、毎回プロンプトを考え直すのが面倒",
    "現場で使える具体的な文面が出てこない",
    "AI 画像生成のプロンプトをイチから組むのが難しい",
    "退院前指導の資料を、伝わる構成で作りたい",
];

const STEPS: { num: string; title: string; description: string }[] = [
    {
        num: "01",
        title: "用途・テーマを選ぶ",
        description: "家族説明・勉強会・利用者説明など、シーンに応じたテンプレを一覧から選びます。",
    },
    {
        num: "02",
        title: "枚数や対象者を選ぶ",
        description: "想定する枚数・主な対象者・トーン（やさしい／専門寄り）をチェック式で指定します。",
    },
    {
        num: "03",
        title: "プロンプトをコピーして ChatGPT へ",
        description: "完成したプロンプトをワンクリックでコピーし、ChatGPT に貼り付けるだけで使えます。",
    },
];

const SCENES: { title: string; description: string }[] = [
    {
        title: "家族説明",
        description: "退院後の介助方法・転倒予防・薬の管理など、ご家族向けに「伝わる」言葉で構成された資料に。",
    },
    {
        title: "院内・施設内 勉強会",
        description: "新人教育・症例検討・テーマ別レクチャーなど、リハ職向けの体系的な学習資料に。",
    },
    {
        title: "利用者さんへの説明",
        description: "デイサービス・通所リハ・訪問現場で、利用者さん本人にも伝わる平易な言葉でまとめた資料に。",
    },
    {
        title: "退院前指導",
        description: "退院後の自主トレ・生活動作・注意点を、看護師・MSWとも共有しやすい構成で。",
    },
];

const FAQ: { q: string; a: string }[] = [
    {
        q: "購入後、どのくらいで使えるようになりますか？",
        a: "決済完了後すぐにご利用いただけます。サンクスページの「アクセスを開始する」ボタンを押すと、そのまま工房にログインした状態でジャンプします。",
    },
    {
        q: "ChatGPT は別途用意が必要ですか？",
        a: "はい。本ツールは「ChatGPT に貼り付けるためのプロンプト」を作成するツールです。ChatGPT（無料プランでも利用可）は別途お使いください。",
    },
    {
        q: "生成された内容はそのまま現場で使えますか？",
        a: "生成 AI の出力には誤りが含まれる場合があります。医療・介護現場での使用前に、必ず専門職による内容確認をお願いいたします。",
    },
    {
        q: "アクセスはいつまで利用できますか？",
        a: "買い切りのため、サイトの提供が続く限り永久にご利用いただけます。ログイン状態は端末ごとに30日有効で、切れた場合はサンクスページに表示される再ログイン用パスワードでいつでも復帰できます。",
    },
    {
        q: "領収書は発行できますか？",
        a: "Stripe の決済完了メールが領収書としてご利用いただけます。宛名変更や個別発行のご希望は、お問い合わせよりご連絡ください。",
    },
];

export default function SlidePromptGeneratorLpPage() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Header />
            <main className="flex-1 [&_p]:break-keep [&_h1]:break-keep [&_h2]:break-keep [&_h3]:break-keep">
                {/* A. Hero */}
                <section className="relative bg-gradient-to-b from-blue-50/60 via-white to-white pt-12 pb-16 sm:pt-16 sm:pb-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold tracking-widest text-blue-700 border border-blue-100">
                                購入者専用ツール
                            </p>
                            <h1 className="text-2xl font-black leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl break-keep">
                                ChatGPT で<span className="text-blue-600">スライド画像</span>を量産する
                                <br />
                                プロンプト工房
                            </h1>
                            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base break-keep">
                                用途・テーマ・枚数を選ぶだけで、ChatGPT にそのまま貼り付けられるスライド画像生成プロンプトが完成します。家族説明、勉強会、利用者説明、退院前指導の資料づくりに。
                            </p>

                            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                                {HERO_BADGES.map((b) => (
                                    <span
                                        key={b}
                                        className="rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-bold text-blue-700"
                                    >
                                        {b}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <CheckoutButton
                                    productId={PRODUCT_ID}
                                    productName={PRODUCT_NAME}
                                    price={PRICE}
                                    label="980円で購入する"
                                    disabled={!checkoutReady}
                                    className="inline-flex w-full sm:w-auto min-h-12 items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-3 text-base font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                                />
                                <Link
                                    href="#how-to-use"
                                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3 text-base font-bold text-slate-700 transition-colors hover:border-blue-200 hover:text-blue-700"
                                >
                                    使い方を見る
                                </Link>
                            </div>
                            {!checkoutReady && (
                                <p className="mt-3 text-xs font-bold text-slate-500">
                                    現在販売準備中です。LINE登録で販売開始をお知らせします。
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                {/* B. 悩み訴求 */}
                <section className="bg-slate-50 py-14 sm:py-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-3xl text-center mb-10">
                            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 break-keep">
                                毎回ゼロから資料を作る時間、もう要りません
                            </h2>
                            <p className="text-sm sm:text-base text-slate-600 leading-relaxed break-keep">
                                家族説明、勉強会、利用者説明、退院前指導… 場面に合わせた資料づくりに、こんなお悩みはありませんか？
                            </p>
                        </div>
                        <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2">
                            {PAIN_POINTS.map((p) => (
                                <div
                                    key={p}
                                    className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4"
                                >
                                    <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="h-3 w-3" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                    </span>
                                    <p className="text-sm leading-relaxed text-slate-700 break-keep">{p}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* C. 解決策 */}
                <section className="bg-white py-14 sm:py-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="mb-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-[11px] font-black tracking-widest text-blue-700 border border-blue-100">
                                解決策
                            </p>
                            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 break-keep">
                                チェックを入れて、コピー＆ChatGPTに貼るだけ
                            </h2>
                            <p className="text-sm sm:text-base leading-relaxed text-slate-600 break-keep">
                                「伝わるプロンプト工房」は、リハビリ・介護現場でよく使われるスライド構成を<strong className="text-slate-800">チェック式UI</strong>でまとめたツールです。チェックを入れるだけで、ChatGPTにそのまま貼り付け可能なプロンプトが完成します。
                            </p>
                        </div>
                    </div>
                </section>

                {/* D. 使い方 */}
                <section id="how-to-use" className="bg-slate-50 py-14 sm:py-20 scroll-mt-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 break-keep">
                                使い方は、たったの3ステップ
                            </h2>
                        </div>
                        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-3">
                            {STEPS.map((s) => (
                                <div
                                    key={s.num}
                                    className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-6"
                                >
                                    <p className="mb-3 text-3xl font-black tracking-tight text-blue-600">
                                        {s.num}
                                    </p>
                                    <h3 className="mb-2 text-base font-black leading-snug text-slate-900 break-keep">
                                        {s.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-slate-600 break-keep">
                                        {s.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* E. こんな場面で */}
                <section className="bg-white py-14 sm:py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 break-keep">
                                こんな場面でお使いいただけます
                            </h2>
                        </div>
                        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
                            {SCENES.map((s) => (
                                <div
                                    key={s.title}
                                    className="flex min-w-0 flex-col rounded-2xl border border-blue-100 bg-blue-50/30 p-6"
                                >
                                    <h3 className="mb-2 text-base font-black leading-snug text-slate-900 break-keep">
                                        {s.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-slate-600 break-keep">
                                        {s.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* F. 注意事項 */}
                <section className="bg-slate-50 py-12 sm:py-16">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-3xl">
                            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
                                <div className="flex items-start gap-3">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.008M10.34 3.94 1.91 18a1.5 1.5 0 0 0 1.3 2.25h17.58a1.5 1.5 0 0 0 1.3-2.25L13.66 3.94a1.5 1.5 0 0 0-2.6 0Z" />
                                    </svg>
                                    <div className="min-w-0">
                                        <h3 className="text-sm font-black text-amber-900 mb-2 break-keep">
                                            ご使用にあたって
                                        </h3>
                                        <ul className="space-y-1.5 text-xs sm:text-sm leading-relaxed text-amber-900 break-keep">
                                            <li>・生成AIの出力には誤りが含まれる場合があります。医療・介護現場での使用前に、必ず専門職による確認をお願いします。</li>
                                            <li>・個人情報、実名、詳細な症例情報は ChatGPT に入力しないでください。</li>
                                            <li>・本ツールは ChatGPT 等の生成AIサービスを別途ご用意いただく前提です（無料プランでも利用可）。</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* G. 価格 */}
                <section id="purchase" className="bg-white py-14 sm:py-20 scroll-mt-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-2xl">
                            <div className="rounded-3xl border border-blue-100 bg-gradient-to-b from-blue-50/60 to-white p-7 sm:p-10 text-center">
                                <p className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-[11px] font-black tracking-widest text-blue-800">
                                    買い切り・永久アクセス
                                </p>
                                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 break-keep">
                                    {PRODUCT_NAME}
                                </h2>
                                <p className="flex items-baseline justify-center gap-1 mb-1">
                                    <span className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900">
                                        ¥{PRICE.toLocaleString()}
                                    </span>
                                    <span className="text-sm font-bold text-slate-500">（税込）</span>
                                </p>
                                <p className="text-xs font-bold text-slate-500 mb-6">
                                    買い切り・追加課金なし
                                </p>
                                <CheckoutButton
                                    productId={PRODUCT_ID}
                                    productName={PRODUCT_NAME}
                                    price={PRICE}
                                    label="980円で購入する"
                                    disabled={!checkoutReady}
                                    className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-4 text-base font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                                />
                                {!checkoutReady && (
                                    <p className="mt-3 text-xs font-bold text-slate-500 break-keep">
                                        現在販売準備中です。LINE登録で販売開始をお知らせします。
                                    </p>
                                )}
                                <p className="mt-4 text-[11px] text-slate-500 break-keep">
                                    Stripe 経由のクレジットカード決済です。決済完了後すぐにご利用いただけます。
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* H. FAQ */}
                <section className="bg-slate-50 py-14 sm:py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 break-keep">
                                よくあるご質問
                            </h2>
                        </div>
                        <div className="mx-auto max-w-3xl space-y-3">
                            {FAQ.map((f) => (
                                <details
                                    key={f.q}
                                    className="group rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-blue-200"
                                >
                                    <summary className="flex cursor-pointer items-start justify-between gap-3 text-sm font-black text-slate-900 break-keep">
                                        <span className="min-w-0 flex-1">Q. {f.q}</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2.5}
                                            stroke="currentColor"
                                            className="h-4 w-4 flex-shrink-0 text-slate-400 transition-transform group-open:rotate-180"
                                            aria-hidden="true"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </summary>
                                    <p className="mt-3 text-sm leading-relaxed text-slate-600 break-keep">
                                        {f.a}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* I. LINE 補助導線 */}
                <section className="bg-white py-12 sm:py-16">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-2xl">
                            <LineBanner />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
