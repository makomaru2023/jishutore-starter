import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PlusHowItWorks, PlusPreviewGallery } from "@/components/plus/PlusEvidenceSections";
import { PlusSubscribeButton } from "@/components/plus/PlusSubscribeButton";
import { FREE_MATERIAL_COUNT } from "@/constants/content-counts";
import { PLUS_SLIDE_COUNT } from "@/constants/plus";
import { feeDomains, getFeeCheckTotalCount, getFeeItemUrl, sampleFeeItems } from "@/lib/fee-check";

const LINE_URL = "https://lin.ee/79a5bNt";

const OG_TITLE = "自主トレ素材庫Plus｜月額500円〜";
const OG_DESCRIPTION =
    "説明文・注意点つきの自主トレスライドを、PowerPointで自由に編集・組み替え。診療・介護報酬チェックも一部無料公開中です。";

export const metadata: Metadata = {
    title: "自主トレ素材庫Plus｜編集できるPowerPoint素材｜月額500円〜",
    description: `${PLUS_SLIDE_COUNT}点の運動スライド（毎月追加中）から必要なページを選び、PowerPointで編集・組み替えできる月額サービスです。訪問リハ・通所リハ・老健・訪問看護からのリハ・回復期リハ病棟・地域包括ケア病棟・急性期一般病棟の診療・介護報酬チェック（一部無料公開中）も追加。7月登録は永続月額500円（8月〜680円、以降は素材点数に応じて改定）。既存会員は据え置き。`,
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
                url: "/plus/previews/ex-001.webp",
                width: 1280,
                height: 720,
                alt: "自主トレ素材庫Plusの収録スライド例",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: OG_TITLE,
        description: OG_DESCRIPTION,
        images: ["/plus/previews/ex-001.webp"],
    },
};

const previews = [
    {
        src: "/plus/previews/ex-001.webp",
        title: "肩すくめ運動",
        caption: "運動方法・回数・目的・注意点を1枚に整理",
    },
    {
        src: "/plus/previews/ex-021.webp",
        title: "反対の手と膝をタッチ",
        caption: "体幹やバランス練習に使えるスライド例",
    },
    {
        src: "/plus/previews/ex-051.webp",
        title: "コイン操作練習",
        caption: "手指の巧緻動作を説明するスライド例",
    },
    {
        src: "/plus/previews/ex-081.webp",
        title: "お椀を使って手首の運動",
        caption: "身近な道具を使った自主トレのスライド例",
    },
    {
        src: "/plus/previews/ex-105.webp",
        title: "ノルディックウォーキング",
        caption: "屋外活動まで幅広く選べるスライド例",
    },
] as const;

const hasPlusAsset = (fileName: string) =>
    existsSync(join(process.cwd(), "public", "images", "plus", fileName));

const plusEvidenceAssets = {
    hasLibraryScreen: hasPlusAsset("library-screen.png"),
    hasPptEditingScreen: hasPlusAsset("ppt-editing.png"),
    hasSample: hasPlusAsset("sample.pptx"),
};

const feeCheckItemCount = getFeeCheckTotalCount();

const feeCheckDomainLabels = feeDomains.map((domain) => domain.domainLabel);

const feeCheckSampleDomain = feeDomains.find((domain) => domain.domain === "homon-riha") ?? feeDomains[0];
const feeCheckSampleItem =
    feeCheckSampleDomain.items.find((item) => item.id === sampleFeeItems[feeCheckSampleDomain.domain]) ?? feeCheckSampleDomain.items[0];
const feeCheckSampleUnit = feeCheckSampleItem.units[0];

const features = [
    {
        title: `${PLUS_SLIDE_COUNT}点から選べる（毎月追加中）`,
        body: "上肢・下肢・体幹・姿勢別など、対象者に合う自主トレを探せます。",
    },
    {
        title: "PowerPointで編集できる",
        body: "説明文や回数、注意点を書き換え、施設名や担当者名も追加できます。",
    },
    {
        title: "必要なページだけ組み合わせる",
        body: "利用者さんごとにスライドを選び、オリジナルの資料を作れます。",
    },
    {
        title: "説明文・注意点つき",
        body: "文章をゼロから考える時間を減らし、確認と調整に集中できます。",
    },
    {
        title: "診療・介護報酬も確認できる",
        body: `${feeCheckDomainLabels.join("・")}の単位数・点数・記録・根拠資料を確認できるツールを追加しました。`,
    },
] as const;

const comparisonRows = [
    {
        label: "料金",
        free: "無料",
        set: "各980円・買い切り",
        plus: "先行 月額500円",
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
        plus: "記録・自己点検ポイント・改定差分・印刷まで全項目",
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
        plus: "対象者ごとに調整したい方",
    },
] as const;

const plans = [
    {
        name: "無料素材",
        description: "PNGイラストを1点ずつ使う",
        values: comparisonRows.map((row) => ({ label: row.label, value: row.free })),
        recommended: false,
    },
    {
        name: "買い切り資料セット",
        description: "完成した資料をそのまま使う",
        values: comparisonRows.map((row) => ({ label: row.label, value: row.set })),
        recommended: false,
    },
    {
        name: "自主トレ素材庫Plus",
        description: "必要なスライドを選んで編集する",
        values: comparisonRows.map((row) => ({ label: row.label, value: row.plus })),
        recommended: true,
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
        <div className="flex min-h-screen flex-col bg-white">
            <Header />
            <main className="min-w-0 flex-1 overflow-x-clip [&_h1]:break-keep [&_h2]:break-keep [&_h3]:break-keep [&_p]:break-keep">
                <section className="border-b border-blue-100 bg-blue-50/60">
                    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
                        <div className="mx-auto max-w-4xl text-center">
                            <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
                                <span className="rounded-full bg-blue-700 px-4 py-1.5 text-xs font-bold text-white">
                                    先行モニター募集中
                                </span>
                                <span className="rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs font-bold text-blue-800">
                                    7月登録は永続500円
                                </span>
                            </div>
                            <h1 className="text-3xl font-black text-slate-950 sm:text-4xl lg:text-5xl">
                                自主トレ素材庫Plus
                            </h1>
                            <p className="mt-4 text-lg font-bold leading-relaxed text-blue-900 sm:text-xl">
                                {PLUS_SLIDE_COUNT}点の運動スライド（毎月追加中）から、必要な自主トレ資料を自分で作れる
                            </p>
                            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                                説明文・回数・注意点つきのPowerPointスライドを収録。
                                利用者さんの状態に合わせて選び、文字を編集し、自由に組み替えられる月額サービスです。
                            </p>
                            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <PlusSubscribeButton
                                    label="月額500円で申し込む"
                                    className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                                />
                                <Link
                                    href="#comparison"
                                    className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700 sm:w-auto"
                                >
                                    無料・買い切りとの違いを見る
                                </Link>
                            </div>
                            <p className="mt-3 text-xs leading-relaxed text-slate-500">
                                7月中のご登録なら、月額500円のままずっと据え置き（8月からは680円）。カード決済（Stripe）・いつでも解約できます。
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-slate-500">
                                すでにご契約の方は{" "}
                                <Link href="/plus/login" className="font-semibold text-blue-600 hover:underline">
                                    こちらからログイン
                                </Link>
                            </p>
                        </div>

                        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 lg:grid-cols-5">
                            {previews.map((preview, index) => (
                                <div
                                    key={preview.src}
                                    className={`${index === previews.length - 1 ? "col-span-2 mx-auto w-1/2 sm:col-span-1 sm:w-full" : ""} min-w-0 overflow-hidden rounded-lg border border-blue-100 bg-white shadow-sm`}
                                >
                                    <Image
                                        src={preview.src}
                                        alt={`${preview.title}のPowerPointスライド例`}
                                        width={1280}
                                        height={720}
                                        priority={index < 3}
                                        sizes="(max-width: 639px) 46vw, (max-width: 1023px) 30vw, 190px"
                                        className="h-auto w-full"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-10 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-xs font-bold tracking-widest text-blue-700">PLUSでできること</p>
                            <h2 className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">
                                資料づくりを、選んで整える作業に
                            </h2>
                            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                                イラストを探し、説明文を考え、レイアウトを整える工程を短縮します。
                                最後は専門職が確認し、対象者に合う内容へ調整できます。
                            </p>
                        </div>
                        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-5">
                            {features.map((feature, index) => (
                                <article key={feature.title} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:block sm:p-5">
                                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-black text-blue-700">
                                        {index + 1}
                                    </span>
                                    <div className="min-w-0">
                                        <h3 className="text-base font-black text-slate-900 sm:mt-4">{feature.title}</h3>
                                        <p className="mt-1.5 text-sm leading-6 text-slate-600 sm:mt-2">{feature.body}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
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
                                <div className="mt-5 grid gap-3 sm:grid-cols-2">
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

                <PlusHowItWorks previews={previews} {...plusEvidenceAssets} />

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
                                            自分で資料を作りたい方へ
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

                <section className="border-y border-blue-100 bg-blue-50/60 py-10 sm:py-12">
                    <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                        <p className="text-base font-black leading-7 text-slate-950 sm:text-lg">
                            無料素材{FREE_MATERIAL_COUNT}点を公開してきた自主トレ素材庫が運営しています
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            日々の自主トレ指導で使いやすい素材を、継続して制作・公開しています。
                        </p>
                        <Link
                            href="/items/"
                            className="mt-4 inline-flex items-center justify-center font-bold text-blue-700 hover:underline"
                        >
                            無料素材を見る
                        </Link>
                    </div>
                </section>

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
                        <span className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-bold text-blue-800 ring-1 ring-blue-200">
                            先行モニター募集中
                        </span>
                        <h2 className="mt-4 text-2xl font-black text-slate-950 sm:text-3xl">
                            7月中の登録なら、ずっと月額500円
                        </h2>
                        <p className="mt-3 text-sm font-bold text-slate-700">
                            8月からは月額680円。素材が増えるたびに価格を改定しますが、既存会員は登録時の価格のまま据え置きです。
                        </p>
                        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                            収録スライドから必要なページを選び、PowerPointで編集・組み替えできます。
                            カード決済（Stripe）で、いつでも解約できます。
                        </p>
                        <div className="mx-auto mt-5 max-w-md rounded-xl border border-blue-100 bg-white p-4 text-left text-xs leading-6 text-slate-600">
                            <p className="mb-1 font-bold text-slate-800">今後の料金改定の目安</p>
                            <p>・7月登録：<span className="font-bold text-blue-700">永続 月額500円</span></p>
                            <p>・8月〜：月額680円</p>
                            <p>・素材200点到達（9月頃）：月額780円</p>
                            <p>・素材300点到達（11月頃）：月額980円</p>
                            <p className="mt-1 text-slate-500">※ 改定はそのつど事前にお知らせします。改定後も、既存会員の価格は上がりません。</p>
                        </div>
                        <div className="mt-7 flex justify-center">
                            <PlusSubscribeButton
                                label="月額500円で申し込む"
                                className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                            />
                        </div>
                        <p className="mt-4 text-xs leading-relaxed text-slate-500">
                            まだ迷う方は{" "}
                            <Link
                                href={LINE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-emerald-700 hover:underline"
                            >
                                LINEで最新情報を受け取る
                            </Link>
                            {" "}こともできます。
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
