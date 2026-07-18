import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PlusHowItWorks, PlusPreviewGallery } from "@/components/plus/PlusEvidenceSections";
import { PlusSubscribeButton } from "@/components/plus/PlusSubscribeButton";
import { TrackedLineLink } from "@/components/TrackedLineLink";
import { FREE_MATERIAL_COUNT } from "@/constants/content-counts";
import { Testimonials } from "@/components/Testimonials";
import { PLUS_SLIDE_COUNT } from "@/constants/plus";
import {
    PLUS_PROMO_BADGE_TEXT,
    PLUS_PROMO_CURRENT_PRICE_YEN,
    PLUS_PROMO_DEADLINE_LABEL,
    PLUS_PROMO_IS_ACTIVE,
    PLUS_PROMO_NEXT_PRICE_YEN,
    PLUS_PROMO_PRICE_NOTE,
} from "@/constants/plus-pricing";
import { feeDomains, getComboDomains, getFeeCheckTotalCount, getFeeItemUrl, sampleFeeItems } from "@/lib/fee-check";

const LINE_URL = "https://lin.ee/79a5bNt";

const OG_TITLE = `資料づくりと報酬確認の「探す時間」を減らす｜自主トレ素材庫Plus`;
const OG_DESCRIPTION =
    "PT・OT・ST向け。編集できる自主トレスライドと、診療・介護報酬の記録・自己点検をひとつの月額サービスで確認できます。";

export const metadata: Metadata = {
    title: OG_TITLE,
    description: `${PLUS_SLIDE_COUNT}点の編集できるPowerPoint運動スライドと、全${feeDomains.length}分野・${getFeeCheckTotalCount()}項目の診療・介護報酬チェックを利用できる月額サービスです。資料作成に加え、記録に残すこと・自己点検ポイント・つまずきやすい点まで確認できます。${PLUS_PROMO_PRICE_NOTE}`,
    alternates: {
        canonical: "https://jishutore-sozaiko.online/products/jishutore-plus/",
    },
    openGraph: {
        title: OG_TITLE,
        description: OG_DESCRIPTION,
        url: "https://jishutore-sozaiko.online/products/jishutore-plus/",
        siteName: "自主トレ素材庫",
        type: "website",
        images: [
            {
                url: "/plus/previews/shoulder-raise.webp",
                width: 1200,
                height: 675,
                alt: "肩挙上運動のPowerPointスライド例",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: OG_TITLE,
        description: OG_DESCRIPTION,
        images: ["/plus/previews/shoulder-raise.webp"],
    },
};

const previews = [
    {
        src: "/plus/previews/shoulder-raise.webp",
        title: "肩挙上運動",
        caption: "イラスト・回数・運動のポイントを1枚に。文字は編集できます",
    },
    {
        src: "/plus/previews/sit-to-stand-using-chair.webp",
        title: "イスからの立ち座り",
        caption: "よく使う下肢運動も、回数やポイントを自由に編集できます",
    },
    {
        src: "/plus/previews/draw-in.webp",
        title: "ドローイン",
        caption: "体幹運動のイラストとポイントを、編集できるPowerPointで収録",
    },
    {
        src: "/plus/previews/single-leg-stand.webp",
        title: "片足立ち",
        caption: "バランス運動も、対象者に合わせて回数やポイントを編集できます",
    },
    {
        src: "/plus/previews/patakara-exercise.webp",
        title: "パタカラ体操",
        caption: "口腔体操のイラストとポイントも、編集できるPowerPointで収録",
    },
] as const;

const hasPlusAsset = (fileName: string) =>
    existsSync(join(process.cwd(), "public", "images", "plus", fileName));

const plusEvidenceAssets = {
    hasLibraryScreen: hasPlusAsset("library-screen.jpg"),
    hasPptEditingScreen: hasPlusAsset("ppt-editing.png"),
    hasSample: hasPlusAsset("sample.pptx"),
};

const feeCheckItemCount = getFeeCheckTotalCount();
const feeComboDomainCount = getComboDomains().length;

const feeCheckDomainLabels = feeDomains.map((domain) => domain.domainLabel);

const feeCheckSampleDomain = feeDomains.find((domain) => domain.domain === "homon-riha") ?? feeDomains[0];
const feeCheckSampleItem =
    feeCheckSampleDomain.items.find((item) => item.id === sampleFeeItems[feeCheckSampleDomain.domain]) ?? feeCheckSampleDomain.items[0];
const feeCheckSampleUnit = feeCheckSampleItem.units[0];

// 「資料作成」と「報酬確認」は別の仕事に見えるが、実際は同じ利用者さんの同じ流れの中にある。
// その一連を1本の線として見せるための構成（2機能の並列表示をやめた）。
const plusFlow = [
    {
        step: "01",
        phase: "担当が決まったら",
        title: "算定要件を確かめる",
        body: "個別機能訓練加算などの算定要件と単位数を、根拠の告示・通知へのリンクつきで確認します。",
        tool: `報酬チェック｜全${feeDomains.length}分野・${feeCheckItemCount}項目`,
    },
    {
        step: "02",
        phase: "指導の準備",
        title: "資料を選んで作る",
        body: `${PLUS_SLIDE_COUNT}点から必要なページを選び、1つのPowerPointにまとめます。回数や運動のポイントは編集できます。`,
        tool: `資料庫｜スライド${PLUS_SLIDE_COUNT}点`,
    },
    {
        step: "03",
        phase: "実施したあと",
        title: "記録することを確かめる",
        body: "加算ごとに「記録に残すこと」を整理しています。計画書・実施記録のどこに何を残すかが分かります。",
        tool: "記録に残すこと｜Plus限定",
    },
    {
        step: "04",
        phase: "請求の前に",
        title: "取りこぼしを点検する",
        body: "併算定できない組み合わせや、前提になる加算の抜けを表示します。自己点検にも使えます。",
        tool: `組み合わせチェック｜${feeComboDomainCount}分野`,
    },
] as const;

const comparisonRows = [
    {
        label: "料金",
        free: "無料",
        set: "各980円・買い切り",
        plus: `先行 月額${PLUS_PROMO_CURRENT_PRICE_YEN}円`,
    },
    {
        label: "ファイル形式",
        free: "PNG画像",
        set: "PowerPoint・PDF",
        plus: "PowerPoint",
    },
    {
        label: "提供単位",
        free: "運動イラスト1点ずつ",
        set: "完成済みの資料セット",
        plus: "編集できるスライド素材",
    },
    {
        label: "文字の編集",
        free: "できない",
        set: "できる",
        plus: "できる",
    },
    {
        label: "資料の構成",
        free: "自分で一から作る",
        set: "完成済みですぐ使える",
        plus: "必要なページを選んで作る",
    },
    {
        label: "追加素材",
        free: "無料ページで随時追加",
        set: "購入したセットを利用",
        plus: "契約中は追加分も利用可能",
    },
    {
        label: "報酬チェック",
        free: "単位数・算定要件・根拠リンク（一部無料公開中）",
        set: "―",
        plus: `記録・自己点検・改定差分・加算の組み合わせ確認（${feeComboDomainCount}分野）`,
    },
    {
        label: "解約後のファイル利用",
        free: "―",
        set: "買い切りなので制限なし",
        plus: "ダウンロード済みは利用OK",
    },
    {
        label: "向いている方",
        free: "画像だけ使いたい方",
        set: "完成資料をすぐ使いたい方",
        plus: "資料作成と報酬確認を効率化したい方",
    },
] as const;

const mobileComparisonLabels = new Set([
    "料金",
    "提供単位",
    "文字の編集",
    "資料の構成",
    "報酬チェック",
    "解約後のファイル利用",
    "向いている方",
]);
const compactMobileComparisonLabels = new Set(["料金", "資料の構成", "向いている方"]);

const plans = [
    {
        name: "自主トレ素材庫Plus",
        description: "資料作成と報酬チェックをまとめて使う",
        values: comparisonRows.filter((row) => mobileComparisonLabels.has(row.label)).map((row) => ({ label: row.label, value: row.plus })),
        recommended: true,
        href: "",
        cta: "",
    },
    {
        name: "無料素材",
        description: "PNGイラストを1点ずつ使う",
        values: comparisonRows.filter((row) => compactMobileComparisonLabels.has(row.label)).map((row) => ({ label: row.label, value: row.free })),
        recommended: false,
        href: "/items/",
        cta: "無料素材を見る",
    },
    {
        name: "買い切り資料セット",
        description: "完成した資料をそのまま使う",
        values: comparisonRows.filter((row) => compactMobileComparisonLabels.has(row.label)).map((row) => ({ label: row.label, value: row.set })),
        recommended: false,
        href: "/products/",
        cta: "買い切り資料を見る",
    },
] as const;

const faqs: { q: string; a: string }[] = [
    {
        q: "解約はどうすればできますか？",
        a: "資料庫の「プラン管理」からいつでも解約できます。解約後も、次回の請求日まではそのままご利用いただけます。",
    },
    {
        q: "解約したら、ダウンロードした資料は使えなくなりますか？",
        a: "いいえ。すでにダウンロード済みのPowerPointファイルは、解約後もそのままご利用いただけます。ただし、資料庫での再ダウンロードやライブラリへのアクセスはできなくなります。",
    },
    {
        q: "作った資料は商用利用できますか？",
        a: "購入者ご本人が、患者・利用者さんへの自主トレ指導や家族説明などの目的で、編集してご利用いただけます。ファイル（PowerPoint等）そのものの再配布・転売・共有はできません。詳しくは利用規約をご確認ください。",
    },
    {
        q: "支払い方法は何がありますか？",
        a: "クレジットカード決済（Stripe）です。決済が完了すると、すぐに資料庫をご利用いただけます。",
    },
    {
        q: "診療・介護報酬チェックは何ができますか？",
        a: `${feeCheckDomainLabels.join("・")}の単位数や点数、算定要件、根拠資料リンクを一部無料公開しています。記録に残すこと、自己点検で見るポイント、つまずきやすい点はPlusで確認できます。`,
    },
    {
        q: "月の途中で登録すると損しませんか？",
        a: "いいえ。自主トレ素材庫Plusは月初起算ではなく、登録日を基準に1か月ごとに料金が発生します。たとえば7月15日に登録した場合、次回の請求日は8月15日です。月末までの短い期間だけで1か月分が請求されることはありません。",
    },
    {
        q: "領収書は発行できますか？",
        a: "Stripeの決済完了メールを領収書としてご利用いただけます。宛名の変更や個別発行が必要な場合は、お問い合わせよりご連絡ください。",
    },
];

export default function JishutorePlusPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white pb-20 sm:pb-0">
            <Header />
            <main className="min-w-0 flex-1 overflow-x-clip [&_h1]:break-keep [&_h2]:break-keep [&_h3]:break-keep [&_p]:break-keep">
                <section className="border-b border-blue-100 bg-gradient-to-b from-blue-50 via-blue-50/60 to-white">
                    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-center lg:px-8 lg:py-16">
                        <div className="text-center lg:text-left">
                            {PLUS_PROMO_IS_ACTIVE && (
                                <div className="mb-4 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                                    <span className="rounded-full bg-blue-700 px-4 py-1.5 text-xs font-bold text-white">
                                        先行価格
                                    </span>
                                    <span className="rounded-full border border-amber-300 bg-amber-50 px-4 py-1.5 text-xs font-black text-amber-900">
                                        {PLUS_PROMO_BADGE_TEXT}
                                    </span>
                                </div>
                            )}
                            <p className="text-xs font-black tracking-widest text-blue-700">PT・OT・ST向け｜自主トレ素材庫Plus</p>
                            <h1 className="mt-3 text-3xl font-black leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
                                自主トレ資料づくりと<br />報酬確認の「探す時間」を減らす
                            </h1>
                            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base lg:mx-0">
                                必要なスライドを選び、1つのPowerPointにまとめて編集。
                                算定要件・記録・自己点検も、一次資料へのリンクつきで確認できます。
                            </p>
                            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                                <PlusSubscribeButton
                                    label={`月額${PLUS_PROMO_CURRENT_PRICE_YEN}円で始める`}
                                    className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                                />
                                <Link
                                    href="#how-it-works"
                                    className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700 sm:w-auto"
                                >
                                    1分で使い方を見る
                                </Link>
                            </div>
                            <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-bold text-slate-600 lg:justify-start">
                                <span>✓ いつでも解約</span>
                                <span>✓ ダウンロード済み資料は解約後も利用可</span>
                                <span>✓ カード決済</span>
                            </div>
                            {PLUS_PROMO_IS_ACTIVE && <p className="mt-3 text-xs leading-relaxed text-slate-500">{PLUS_PROMO_DEADLINE_LABEL}月額{PLUS_PROMO_CURRENT_PRICE_YEN}円。登録中はこの価格のまま据え置きです。</p>}
                            <p className="mt-2 text-xs leading-relaxed text-slate-500">
                                すでにご契約の方は{" "}
                                <Link href="/plus/login" className="font-semibold text-blue-600 hover:underline">
                                    こちらからログイン
                                </Link>
                            </p>
                        </div>

                        <div className="mx-auto w-full max-w-2xl">
                            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-blue-950/10 sm:p-3">
                                <div className="mb-2 flex items-center gap-1.5 px-1">
                                    <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                                </div>
                                <Image
                                    src="/images/plus/library-screen.jpg"
                                    alt="自主トレ素材庫Plusで必要な運動スライドを選んでいる画面"
                                    width={1265}
                                    height={645}
                                    priority
                                    sizes="(max-width: 1023px) 92vw, 560px"
                                    className="h-auto w-full rounded-lg border border-slate-100"
                                />
                            </div>
                            <div className="relative mx-3 -mt-5 grid gap-2 sm:mx-6 sm:grid-cols-2">
                                <div className="rounded-xl border border-blue-100 bg-white p-3 shadow-lg">
                                    <p className="text-xs font-black text-blue-700">資料作成</p>
                                    <p className="mt-1 text-sm font-black text-slate-950">{PLUS_SLIDE_COUNT}点から選んで編集</p>
                                </div>
                                <div className="rounded-xl border border-indigo-100 bg-white p-3 shadow-lg">
                                    <p className="text-xs font-black text-indigo-700">報酬確認</p>
                                    <p className="mt-1 text-sm font-black text-slate-950">{feeCheckItemCount}項目を一次資料つきで</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <PlusHowItWorks previews={previews} {...plusEvidenceAssets} />

                <section className="py-10 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-xs font-bold tracking-widest text-blue-700">1人の利用者さんに、ぜんぶついてくる</p>
                            <h2 className="mt-3 text-2xl font-black leading-snug text-slate-950 jp-heading sm:text-3xl">
                                資料を作る日と、算定を確かめる日は、別の日ではありません
                            </h2>
                            <p className="mt-4 text-sm leading-7 text-slate-600 jp-text ![word-break:normal] sm:text-base">
                                担当が決まってから請求までは、ひと続きの仕事です。Plusは、その流れで必要になるものをまとめています。
                            </p>
                        </div>
                        <ol className="mx-auto mt-8 grid max-w-6xl gap-4 sm:mt-10 lg:grid-cols-4">
                            {plusFlow.map((flow, idx) => (
                                <li key={flow.step} className="relative flex">
                                    <article className="flex w-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-black text-white">
                                                {flow.step}
                                            </span>
                                            <span className="text-xs font-black text-blue-700">{flow.phase}</span>
                                        </div>
                                        {/*
                                          * ![word-break:normal] は、この <main> に付いている [&_h3]:break-keep /
                                          * [&_p]:break-keep（子孫の見出し・段落すべてに word-break:keep-all を強制する）を
                                          * 打ち消すためのもの。カード幅が狭いので keep-all のままだと改行機会が無くなり、
                                          * 「リハビリテーシ／ョン」のような語中での強制分断や、句点の行頭送りが起きる。
                                          * 折り返しは globals.css の方針どおり jp-heading / jp-text に任せる。
                                          */}
                                        <h3 className="mt-3 text-base font-black leading-snug text-slate-950 jp-heading ![word-break:normal]">
                                            {flow.title}
                                        </h3>
                                        <p className="mt-2 flex-1 text-sm leading-6 text-slate-600 jp-text ![word-break:normal]">{flow.body}</p>
                                        <p className="mt-4 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-black text-blue-800 jp-text">
                                            {flow.tool}
                                        </p>
                                    </article>
                                    {/* 流れをつなぐ矢印。最後の1枚には出さない */}
                                    {idx < plusFlow.length - 1 && (
                                        <span
                                            aria-hidden="true"
                                            className="absolute left-1/2 top-full z-10 -translate-x-1/2 text-blue-300 lg:left-auto lg:right-0 lg:top-1/2 lg:translate-x-1/2 lg:-translate-y-1/2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 rotate-90 lg:rotate-0">
                                                <path d="M13.5 4.5 21 12l-7.5 7.5-1.06-1.06 5.69-5.69H3v-1.5h15.13l-5.69-5.69z" />
                                            </svg>
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ol>
                        <p className="mx-auto mt-10 max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center text-sm font-bold leading-7 text-slate-700 jp-text ![word-break:normal] sm:text-base">
                            資料づくりと報酬確認を別々に持つと、同じ利用者さんのことを2か所で調べ直すことになります。Plusは、この4つを同じ月額のなかに置いています。
                        </p>
                    </div>
                </section>

                <section className="border-y border-blue-100 bg-blue-50/60 py-10 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
                            <div className="min-w-0">
                                <p className="text-xs font-bold tracking-widest text-blue-700">報酬チェック</p>
                                <h2 className="mt-3 text-2xl font-black leading-tight text-slate-950 sm:text-3xl">
                                    単位数だけでなく、記録と自己点検まで確認できます
                                </h2>
                                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                                    厚生労働省の告示・通知・疑義解釈を一次資料から整理。
                                    算定要件に加えて、記録に残すこと、実地指導・自己点検で見られるポイント、
                                    つまずきやすい点まで同じ形式で確認できます。
                                </p>
                                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                                    <div className="rounded-lg border border-blue-100 bg-white p-4">
                                        <p className="text-xs font-bold text-blue-700">対応分野</p>
                                        <p className="mt-1 text-2xl font-black text-slate-950">{feeDomains.length}分野</p>
                                        <p className="mt-2 text-xs leading-5 text-slate-500">
                                            {feeCheckDomainLabels.join("・")}
                                        </p>
                                    </div>
                                    <div className="rounded-lg border border-blue-100 bg-white p-4">
                                        <p className="text-xs font-bold text-blue-700">収載項目</p>
                                        <p className="mt-1 text-2xl font-black text-slate-950">{feeCheckItemCount}項目</p>
                                        <p className="mt-2 text-xs leading-5 text-slate-500">
                                            単位数・算定要件・根拠リンク・記録・自己点検ポイントを整理しています。
                                        </p>
                                    </div>
                                    <div className="rounded-lg border border-blue-100 bg-white p-4">
                                        <p className="text-xs font-bold text-blue-700">加算の組み合わせ</p>
                                        <p className="mt-1 text-2xl font-black text-slate-950">{feeComboDomainCount}分野</p>
                                        <p className="mt-2 text-xs leading-5 text-slate-500">
                                            併算定不可・条件付き・区分選択制・前提加算を根拠リンクつきで確認できます。
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                    <Link
                                        href="/fee-check/"
                                        className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
                                    >
                                        無料版を見る
                                    </Link>
                                    <Link
                                        href={getFeeItemUrl(feeCheckSampleDomain.domain, feeCheckSampleItem.id)}
                                        className="inline-flex w-full items-center justify-center rounded-lg border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50 sm:w-auto"
                                    >
                                        全文サンプルを見る
                                    </Link>
                                    <Link
                                        href="/plus/fee-check-combo/"
                                        className="inline-flex w-full items-center justify-center rounded-lg border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50 sm:w-auto"
                                    >
                                        組み合わせチェックを使う
                                    </Link>
                                </div>
                                <p className="mt-4 text-xs leading-6 text-slate-500">
                                    ※ 個別ケースの可否を断定するものではありません。実際の請求では原本と保険者・地方厚生局の確認を優先してください。
                                </p>
                            </div>

                            <div className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm sm:p-5">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-black text-blue-800">
                                        介護保険
                                    </span>
                                    <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-black text-amber-800">
                                        加算
                                    </span>
                                    <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-black text-slate-600">
                                        一次資料確認済
                                    </span>
                                </div>
                                <h3 className="mt-3 text-lg font-black leading-snug text-slate-950">
                                    {feeCheckSampleItem.name}
                                </h3>
                                <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
                                    <div className="grid grid-cols-[1fr_110px] border-b border-slate-100 bg-slate-100 text-xs font-black text-slate-600">
                                        <span className="px-3 py-2">区分</span>
                                        <span className="px-3 py-2">単位数</span>
                                    </div>
                                    <div className="grid grid-cols-[1fr_110px] text-sm">
                                        <span className="px-3 py-3 font-bold text-slate-800">{feeCheckSampleUnit.condition}</span>
                                        <span className="px-3 py-3 font-black text-blue-800">{feeCheckSampleUnit.value}</span>
                                    </div>
                                </div>
                                <div className="mt-4 space-y-3">
                                    <div className="rounded-lg border border-slate-200 bg-white p-3">
                                        <p className="text-sm font-black text-slate-900">算定要件</p>
                                        <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm leading-6 text-slate-700">
                                            <li>対象期間と起算日を確認する</li>
                                            <li>リハビリテーション計画を作成する</li>
                                        </ol>
                                    </div>
                                    <div className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-black text-blue-900">
                                        🔒 ここからはPlus限定（記録・自己点検のコア部分）
                                    </div>
                                    <div className="rounded-lg border border-blue-100 bg-blue-50/40 p-3">
                                        <p className="text-sm font-black text-slate-900">記録に残すこと</p>
                                        <p className="mt-2 rounded-md bg-white px-3 py-2 text-sm leading-6 text-slate-700">
                                            📋 起算日、実施日、計画内容、説明記録を確認できる形で残す。
                                        </p>
                                    </div>
                                    <div className="rounded-lg border border-slate-200 bg-white p-3">
                                        <p className="text-sm font-black text-slate-900">自己点検で見るポイント</p>
                                        <p className="mt-2 flex gap-2 text-sm leading-6 text-slate-700">
                                            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border border-blue-300 bg-white text-xs font-black text-blue-700">
                                                □
                                            </span>
                                            算定期間と実施記録が一致しているか。
                                        </p>
                                    </div>
                                    <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm leading-6 text-amber-950">
                                        ⚠ 加算名が似ている項目との取り違えに注意。
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-b border-blue-100 bg-blue-700 py-8 text-white">
                    <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 px-4 text-center sm:px-6 lg:flex-row lg:text-left">
                        <div>
                            <p className="text-lg font-black">資料作成も報酬確認も、月額{PLUS_PROMO_CURRENT_PRICE_YEN}円で</p>
                            <p className="mt-1 text-sm leading-6 text-blue-100">いつでも解約でき、ダウンロード済みのPowerPointは解約後も使えます。</p>
                        </div>
                        <PlusSubscribeButton
                            label="自主トレ素材庫Plusを始める"
                            className="inline-flex w-full items-center justify-center rounded-lg bg-white px-7 py-3.5 text-sm font-black text-blue-700 shadow-sm transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                        />
                    </div>
                </section>

                <PlusPreviewGallery previews={previews} />

                <section id="comparison" className="scroll-mt-20 py-10 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-xs font-bold tracking-widest text-blue-700">プラン比較</p>
                            <h2 className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">
                                使い方に合うものを選べます
                            </h2>
                        </div>

                        <div className="mt-8 grid gap-5 md:hidden">
                            {plans.map((plan) => (
                                <article
                                    key={plan.name}
                                    className={`rounded-lg border bg-white p-4 sm:p-5 ${plan.recommended ? "border-blue-400 ring-2 ring-blue-100" : "border-slate-200"}`}
                                >
                                    {plan.recommended && (
                                        <span className="inline-block rounded-full bg-blue-700 px-3 py-1 text-[11px] font-bold text-white">
                                            資料作成＋報酬確認を使いたい方へ
                                        </span>
                                    )}
                                    <h3 className="mt-3 text-lg font-black text-slate-950">{plan.name}</h3>
                                    <p className="mt-1 text-sm text-slate-600">{plan.description}</p>
                                    <dl className="mt-4 divide-y divide-slate-100">
                                        {plan.values.map((item) => (
                                            <div key={item.label} className="py-2.5 first:pt-0">
                                                <dt className="text-xs font-bold text-blue-700">{item.label}</dt>
                                                <dd className="mt-1 text-sm leading-6 text-slate-700">{item.value}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                    <div className="mt-5">
                                        {plan.recommended ? (
                                            <PlusSubscribeButton
                                                label={`月額${PLUS_PROMO_CURRENT_PRICE_YEN}円で始める`}
                                                className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                                            />
                                        ) : (
                                            <Link href={plan.href} className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-700">
                                                {plan.cta}
                                            </Link>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>

                        <div className="mt-10 hidden overflow-hidden rounded-lg border border-slate-200 md:block">
                            <table className="w-full table-fixed border-collapse bg-white text-left">
                                <thead>
                                    <tr className="bg-slate-100">
                                        <th className="w-[18%] p-4 text-sm font-bold text-slate-700">比較項目</th>
                                        <th className="p-4 text-sm font-black text-slate-900">無料素材</th>
                                        <th className="p-4 text-sm font-black text-slate-900">買い切り資料セット</th>
                                        <th className="bg-blue-700 p-4 text-sm font-black text-white">自主トレ素材庫Plus</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonRows.map((row) => (
                                        <tr key={row.label} className="border-t border-slate-200 align-top">
                                            <th className="p-4 text-sm font-bold text-slate-700">{row.label}</th>
                                            <td className="p-4 text-sm leading-6 text-slate-600">{row.free}</td>
                                            <td className="p-4 text-sm leading-6 text-slate-600">{row.set}</td>
                                            <td className="bg-blue-50 p-4 text-sm font-bold leading-6 text-blue-950">{row.plus}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                <section className="border-y border-blue-100 bg-blue-50/60 py-10 sm:py-16">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-xs font-bold tracking-widest text-blue-700">運営と確認体制</p>
                            <h2 className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">作業療法士が、実務で使いやすい形に整理しています</h2>
                        </div>
                        <div className="mt-8 grid gap-4 md:grid-cols-3">
                            <article className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
                                <p className="text-2xl font-black text-blue-700">{FREE_MATERIAL_COUNT}点</p>
                                <h3 className="mt-2 font-black text-slate-950">無料素材を継続公開</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">自主トレ指導で使いやすい素材を、作業療法士の視点で制作しています。</p>
                                <Link href="/about/" className="mt-4 inline-flex text-sm font-bold text-blue-700 hover:underline">運営者について →</Link>
                            </article>
                            <article className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
                                <p className="text-2xl font-black text-blue-700">3枚</p>
                                <h3 className="mt-2 font-black text-slate-950">実物のPowerPointを試せる</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">回数・運動のポイントを編集できるか、登録前に確認できます。</p>
                                <a href="/images/plus/sample.pptx" download className="mt-4 inline-flex text-sm font-bold text-blue-700 hover:underline">無料サンプルを開く →</a>
                            </article>
                            <article className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
                                <p className="text-2xl font-black text-blue-700">一次資料</p>
                                <h3 className="mt-2 font-black text-slate-950">根拠と確認方法を公開</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">厚生労働省等の告示・通知・疑義解釈を基準に、確認日と根拠リンクを掲載します。</p>
                                <Link href="/fee-check/editorial-policy/" className="mt-4 inline-flex text-sm font-bold text-blue-700 hover:underline">編集方針を見る →</Link>
                            </article>
                        </div>
                    </div>
                </section>

                {/* 掲載許諾つきの声が0件のあいだは何も表示しない */}
                <Testimonials product="plus" />

                <section id="faq" className="scroll-mt-20 border-t border-slate-200 bg-slate-50 py-10 sm:py-20">
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <p className="text-xs font-bold tracking-widest text-blue-700">FAQ</p>
                            <h2 className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">
                                よくあるご質問
                            </h2>
                        </div>
                        <div className="mt-8 space-y-3 sm:mt-10">
                            {faqs.map((faq, idx) => (
                                <details
                                    key={faq.q}
                                    className="group rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition-all open:border-blue-200 open:shadow-md"
                                    open={idx === 0}
                                >
                                    <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-sm font-bold text-slate-900 sm:text-base">
                                        <span className="flex-1">Q. {faq.q}</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2.5}
                                            stroke="currentColor"
                                            className="mt-1 h-4 w-4 flex-shrink-0 text-blue-500 transition-transform group-open:rotate-180"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </summary>
                                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{faq.a}</p>
                                </details>
                            ))}
                        </div>
                        <p className="mt-6 text-center text-xs text-slate-500">
                            利用条件の詳細は{" "}
                            <Link href="/license" className="font-semibold text-blue-600 hover:underline">
                                利用規約
                            </Link>
                            {" "}をご覧ください。
                        </p>
                    </div>
                </section>

                <section className="border-t border-blue-100 bg-blue-50 py-10 sm:py-20">
                    <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        {PLUS_PROMO_IS_ACTIVE ? (
                            <>
                                <span className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-bold text-blue-800 ring-1 ring-blue-200">
                                    先行価格
                                </span>
                                <h2 className="mt-4 text-2xl font-black text-slate-950 sm:text-3xl">
                                    {PLUS_PROMO_DEADLINE_LABEL}の登録なら、ずっと月額{PLUS_PROMO_CURRENT_PRICE_YEN}円
                                </h2>
                                <p className="mt-3 text-sm font-bold text-slate-700">
                                    8月以降の新規登録は月額{PLUS_PROMO_NEXT_PRICE_YEN}円。既存会員は登録時の価格のままです。
                                </p>
                            </>
                        ) : (
                            <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">
                                自主トレ素材庫Plusを利用する
                            </h2>
                        )}
                        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                            収録スライドをPowerPointで編集・組み替えでき、診療・介護報酬の記録・自己点検ポイントも確認できます。
                            カード決済（Stripe）で、いつでも解約できます。
                        </p>
                        {PLUS_PROMO_IS_ACTIVE && <p className="mx-auto mt-5 max-w-xl rounded-xl border border-blue-100 bg-white px-4 py-3 text-xs leading-6 text-slate-600">{PLUS_PROMO_DEADLINE_LABEL}に登録すると、月額{PLUS_PROMO_CURRENT_PRICE_YEN}円のまま利用できます。料金改定後も、登録中の価格は上がりません。</p>}
                        <div className="mt-7 flex justify-center">
                            <PlusSubscribeButton
                                label={`月額${PLUS_PROMO_CURRENT_PRICE_YEN}円で申し込む`}
                                className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                            />
                        </div>
                        <p className="mt-4 text-xs leading-relaxed text-slate-500">
                            まだ迷う方は{" "}
                            <TrackedLineLink
                                href={LINE_URL}
                                placement="plus_page_footer"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-emerald-700 hover:underline"
                            >
                                LINEで最新情報を受け取る
                            </TrackedLineLink>
                            {" "}こともできます。
                        </p>
                    </div>
                </section>
            </main>
            <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-3 py-2 shadow-[0_-4px_18px_rgba(15,23,42,0.12)] backdrop-blur sm:hidden">
                <div className="mx-auto flex max-w-md items-center gap-3">
                    <div className="shrink-0">
                        <p className="text-[10px] font-bold text-slate-500">先行価格</p>
                        <p className="text-sm font-black text-slate-950">月額{PLUS_PROMO_CURRENT_PRICE_YEN}円</p>
                    </div>
                    <PlusSubscribeButton
                        label="Plusを始める"
                        className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-60"
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}
