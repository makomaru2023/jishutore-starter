import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PlusPreviewGallery } from "@/components/plus/PlusEvidenceSections";
import { PlusPromoCountdown } from "@/components/plus/PlusPromoCountdown";
import { PlusSubscribeButton } from "@/components/plus/PlusSubscribeButton";
import { TrackedPlusResourceLink } from "@/components/plus/TrackedPlusResourceLink";
import { Testimonials } from "@/components/Testimonials";
import { TrackedB2bContactLink } from "@/components/TrackedB2bContactLink";
import { TrackedLineLink } from "@/components/TrackedLineLink";
import { FREE_MATERIAL_COUNT } from "@/constants/content-counts";
import { PLUS_SLIDE_COUNT } from "@/constants/plus";
import {
    PLUS_PROOF_LINE_FRIENDS,
    PLUS_PROOF_TOTAL_DL,
} from "@/constants/plus-proof";
import { PLUS_ROADMAP } from "@/constants/plus-roadmap";
import {
    formatYen,
    PLUS_PROMO_BADGE_TEXT,
    PLUS_PROMO_CURRENT_PRICE_YEN,
    PLUS_PROMO_DEADLINE_LABEL,
    PLUS_PROMO_IS_ACTIVE,
    PLUS_PROMO_NEXT_PRICE_YEN,
    PLUS_PROMO_PRICE_NOTE,
} from "@/constants/plus-pricing";
import {
    feeDomains,
    getComboDomains,
    getFeeCheckTotalCount,
    getFeeItemUrl,
    sampleFeeItems,
} from "@/lib/fee-check";

const LINE_URL = "https://lin.ee/79a5bNt";
const currentPriceLabel = formatYen(PLUS_PROMO_CURRENT_PRICE_YEN);
const nextPriceLabel = formatYen(PLUS_PROMO_NEXT_PRICE_YEN);
const dailyPriceLabel = formatYen(Math.ceil(PLUS_PROMO_CURRENT_PRICE_YEN / 30));

const OG_TITLE = "資料づくりも算定確認もこれひとつ｜自主トレ素材庫Plus";
const HERO_DESCRIPTION = `編集できる運動スライド${PLUS_SLIDE_COUNT}点と完成デッキで、その日の自主トレ資料を選んでダウンロード。診療・介護報酬のチェックまで、同じ会員ページで終わります。`;
const OG_DESCRIPTION = HERO_DESCRIPTION;

export const metadata: Metadata = {
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    alternates: {
        canonical: "https://jishutore-sozaiko.online/products/jishutore-plus/",
    },
    openGraph: {
        title: OG_TITLE,
        description: OG_DESCRIPTION,
        url: "https://jishutore-sozaiko.online/products/jishutore-plus/",
        siteName: "自主トレ素材庫",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: OG_TITLE,
        description: OG_DESCRIPTION,
    },
};

const previews = [
    {
        src: "/plus/previews/shoulder-raise.webp",
        title: "肩挙上運動",
        caption: "黄色の回数バッジと下部のポイント2行を、対象者に合わせて編集できます",
    },
    {
        src: "/plus/previews/sit-to-stand-using-chair.webp",
        title: "イスからの立ち座り",
        caption: "イラストを大きく見せながら、回数と伝え方をPowerPointで調整できます",
    },
    {
        src: "/plus/previews/draw-in.webp",
        title: "ドローイン",
        caption: "体幹運動も同じ16:9形式で収録。必要なページだけを選べます",
    },
    {
        src: "/plus/previews/single-leg-stand.webp",
        title: "片足立ち",
        caption: "バランス運動の回数やポイントも、編集可能なテキストです",
    },
    {
        src: "/plus/previews/chair-squat.webp",
        title: "椅子スクワット",
        caption: "負荷の目安や注意点を、その方の体力に合わせて書き換えられます",
    },
    {
        src: "/plus/previews/cane-walking.webp",
        title: "杖歩行",
        caption: "歩行練習の指導用スライドも収録。注意点を生活環境に合わせて編集できます",
    },
    {
        src: "/plus/previews/ankle-pump.webp",
        title: "足首の底背屈運動",
        caption: "術後・ベッドサイドの定番運動も、そのまま説明用に使えます",
    },
    {
        src: "/plus/previews/towel-wringing.webp",
        title: "タオル絞り",
        caption: "上肢・手指の生活動作トレーニングも収録。自宅練習の指導にそのまま渡せます",
    },
    {
        src: "/plus/previews/patakara-exercise.webp",
        title: "パタカラ体操",
        caption: "口腔体操を含む無料イラストの文字あり版と、1対1で対応しています",
    },
    {
        src: "/plus/previews/swallowing-forehead-exercises.webp",
        title: "嚥下おでこ体操",
        caption: "嚥下体操も同じ形式で収録。言語聴覚士の自主トレ指導にも使えます",
    },
] as const;

const heroSlides = [
    {
        src: "/plus/previews/shoulder-raise.webp",
        title: "肩挙上運動",
        className: "left-[1%] top-[19%] z-10 w-[58%] -rotate-3 sm:top-[17%] sm:w-[60%] sm:-rotate-6",
    },
    {
        src: "/plus/previews/sit-to-stand-using-chair.webp",
        title: "イスからの立ち座り",
        className: "left-1/2 top-[4%] z-30 w-[62%] -translate-x-1/2 sm:w-[66%]",
        priority: true,
    },
    {
        src: "/plus/previews/single-leg-stand.webp",
        title: "片足立ち",
        className: "right-[1%] top-[19%] z-20 w-[58%] rotate-3 sm:top-[17%] sm:w-[60%] sm:rotate-6",
    },
] as const;

const feeCheckItemCount = getFeeCheckTotalCount();
const feeComboDomainCount = getComboDomains().length;
const feeCheckDomainLabels = feeDomains.map((domain) => domain.domainLabel);
const feeCheckSampleDomain = feeDomains.find((domain) => domain.domain === "homon-riha") ?? feeDomains[0];
const feeCheckSampleItem =
    feeCheckSampleDomain.items.find(
        (item) => item.id === sampleFeeItems[feeCheckSampleDomain.domain],
    ) ?? feeCheckSampleDomain.items[0];
const feeCheckSampleUnit = feeCheckSampleItem.units[0];

const proofItems = [
    {
        value: `${FREE_MATERIAL_COUNT.toLocaleString("ja-JP")}点`,
        label: "無料素材を公開中",
    },
    ...(PLUS_PROOF_TOTAL_DL === null
        ? []
        : [{
            value: `${PLUS_PROOF_TOTAL_DL.toLocaleString("ja-JP")}DL`,
            label: "累計ダウンロード",
        }]),
    ...(PLUS_PROOF_LINE_FRIENDS === null
        ? []
        : [{
            value: `${PLUS_PROOF_LINE_FRIENDS.toLocaleString("ja-JP")}人`,
            label: "LINEで情報を受け取る方",
        }]),
];

const pillars = [
    {
        number: "01",
        title: "編集できる運動スライド",
        summary: `${PLUS_SLIDE_COUNT}点から最大10点を選び、1つのPowerPointにまとめられます。`,
        detail: "回数とポイントを対象者ごとに調整",
    },
    {
        number: "02",
        title: "そのまま使える完成デッキ",
        summary: "疾患別9本と姿勢別6種を、会員ページからZIPでダウンロードできます。",
        detail: "退院前指導や訪問リハの準備に",
    },
    {
        number: "03",
        title: "伝わるプロンプト工房",
        summary: "ChatGPTに貼るスライド画像生成プロンプトを、選択式で組み立てます。",
        detail: "テンプレ8種・スタイル10種",
    },
    {
        number: "04",
        title: "診療・介護報酬チェック",
        summary: `全${feeDomains.length}分野・${feeCheckItemCount}項目を、一次資料へのリンクつきで整理しています。`,
        detail: `組み合わせ確認は${feeComboDomainCount}分野に対応`,
    },
] as const;

const diseaseDeckTopics = [
    "脳卒中 上肢",
    "脳卒中 下肢",
    "腰痛",
    "膝OA・TKA",
    "圧迫骨折後",
    "パーキンソン病",
    "五十肩",
    "人工股関節術後",
    "大腿骨骨折術後",
] as const;

const postureDeckTopics = ["全身", "上肢", "下肢", "座位", "臥位", "立位"] as const;

const promptWorkshopFlow = [
    {
        number: "1",
        title: "用途テンプレを選ぶ",
        body: "退院前指導・家族説明・勉強会など、8種類から場面に近い型を選びます。",
    },
    {
        number: "2",
        title: "見た目と枚数を決める",
        body: "ビジュアルスタイル10種類と、最大10枚までの構成を選択します。",
    },
    {
        number: "3",
        title: "ChatGPTへ貼り付ける",
        body: "完成したプロンプトをコピーし、ChatGPTでスライド画像を生成します。",
    },
] as const;

const workFlow = [
    {
        number: "01",
        phase: "担当が決まったら",
        title: "算定要件を確認する",
        body: `全${feeDomains.length}分野・${feeCheckItemCount}項目から、単位数と根拠資料を確認します。`,
    },
    {
        number: "02",
        phase: "指導の準備",
        title: "使う資料を選ぶ",
        body: `運動スライド${PLUS_SLIDE_COUNT}点、完成デッキ、プロンプト工房から、その日の仕事に合うものを選びます。`,
    },
    {
        number: "03",
        phase: "対象者に合わせて",
        title: "編集して配布する",
        body: "回数やポイントを調整し、専門職が内容を確認してから印刷・説明に使います。",
    },
    {
        number: "04",
        phase: "実施後と請求前",
        title: "記録と組み合わせを点検する",
        body: "記録に残すこと、自己点検項目、併算定できない組み合わせを見直します。",
    },
] as const;

const comparisonRows = [
    {
        label: "料金",
        free: "無料",
        plus: PLUS_PROMO_IS_ACTIVE
            ? `月額${currentPriceLabel}（${PLUS_PROMO_DEADLINE_LABEL}の登録で据え置き）`
            : `月額${currentPriceLabel}`,
    },
    {
        label: "使える内容",
        free: "運動イラストを1点ずつ",
        plus: "運動スライド・完成デッキ・作成ツール・報酬チェック",
    },
    {
        label: "ファイル形式",
        free: "PNG画像",
        plus: "編集できるPowerPoint、完成資料のZIP",
    },
    {
        label: "文字の編集",
        free: "できない",
        plus: "回数バッジとポイントを編集できる",
    },
    {
        label: "資料の準備",
        free: "画像を選び、自分で資料を作る",
        plus: "最大10点を結合、または完成デッキを使う",
    },
    {
        label: "プロンプト工房",
        free: "利用できない",
        plus: "会員ページから利用できる",
    },
    {
        label: "報酬チェック",
        free: "単位数・算定要件・根拠リンクを一部公開",
        plus: `記録・自己点検・つまずきやすい点・組み合わせ確認（${feeComboDomainCount}分野）`,
    },
    {
        label: "解約後",
        free: "―",
        plus: "ダウンロード済みファイルはそのまま利用できる",
    },
] as const;

const faqs: { q: string; a: ReactNode; id?: string }[] = [
    {
        q: "解約はどうすればできますか？",
        a: "資料庫の「プラン管理」からいつでも解約できます。解約後も、次回の請求日まではそのままご利用いただけます。",
    },
    {
        q: "解約したら、ダウンロードした資料は使えなくなりますか？",
        a: "いいえ。すでにダウンロード済みのPowerPointファイルは、解約後もそのままご利用いただけます。ただし、資料庫での再ダウンロードや会員ページへのアクセスはできなくなります。",
    },
    {
        q: "PowerPointを持っていなくても使えますか？",
        a: (
            <>
                {"編集にはデスクトップ版PowerPointを推奨しています。無料のPowerPoint for the webやGoogleスライドでも開けますが、レイアウトやフォントが崩れる場合があります。"}
                <TrackedPlusResourceLink
                    href="/images/plus/sample.pptx"
                    download
                    resource="powerpoint_sample"
                    placement="plus_lp_faq_powerpoint"
                    className="ml-1 font-semibold text-blue-700 underline decoration-blue-200 underline-offset-2 hover:decoration-blue-600"
                >
                    無料サンプル（3枚入り）
                </TrackedPlusResourceLink>
                {"で、お使いの環境で編集できるか登録前にご確認ください。"}
            </>
        ),
    },
    {
        q: "スマホやタブレットだけでも使えますか？",
        a: (
            <>
                {"会員ページの閲覧とファイルのダウンロードは可能です。PowerPointの編集はPCを推奨しています。印刷は、端末へ保存したPDFなどをコンビニのネットプリントで出力する方法もあります。まずは"}
                <TrackedPlusResourceLink
                    href="/images/plus/sample.pptx"
                    download
                    resource="powerpoint_sample"
                    placement="plus_lp_faq_mobile"
                    className="mx-1 font-semibold text-blue-700 underline decoration-blue-200 underline-offset-2 hover:decoration-blue-600"
                >
                    無料サンプル
                </TrackedPlusResourceLink>
                {"で、お使いの端末から開けるかご確認ください。"}
            </>
        ),
    },
    {
        q: "作った資料は商用利用できますか？",
        a: "購入者ご本人が、患者・利用者さんへの自主トレ指導や家族説明に編集してご利用いただけます。PowerPointなどのファイルそのものの再配布・転売・共有はできません。詳しくは利用規約をご確認ください。",
    },
    {
        q: "以前販売していた買い切りセットやプロンプト工房はどうなりましたか？",
        a: "すべてPlusに収録し、個別販売は終了しました。会員ページから追加料金なしでご利用いただけます。過去にご購入いただいた方は、これまでどおり購入分をご利用いただけます。",
    },
    {
        q: "施設やチームでの複数名利用はできますか？",
        a: (
            <>
                現在は、購入者ご本人にご利用いただく個人向けプランのみです。施設・チームでの複数名利用や請求書払いによる提供は準備中で、ご要望・ご相談を
                <TrackedB2bContactLink
                    href="/contact"
                    placement="plus_lp_faq"
                    className="font-semibold text-blue-700 underline decoration-blue-200 underline-offset-2 hover:decoration-blue-600"
                >
                    お問い合わせページ
                </TrackedB2bContactLink>
                より受け付けています。
            </>
        ),
    },
    {
        q: "支払い方法は何がありますか？",
        a: "クレジットカード決済（Stripe）です。決済が完了すると、すぐに会員ページをご利用いただけます。",
    },
    {
        q: "診療・介護報酬チェックは何ができますか？",
        a: `${feeCheckDomainLabels.join("・")}の単位数や点数、算定要件、根拠資料リンクを一部無料公開しています。記録に残すこと、自己点検で見るポイント、つまずきやすい点、加算の組み合わせはPlusで確認できます。`,
    },
    {
        q: "月の途中で登録すると損しませんか？",
        a: "いいえ。月初起算ではなく、登録日を基準に1か月ごとに料金が発生します。月末までの短い期間だけで1か月分が請求されることはありません。",
    },
    {
        id: "faq-receipt",
        q: "領収書は発行できますか？",
        a: "Stripeの決済完了メールを領収書としてご利用いただけます。宛名の変更や個別発行が必要な場合は、お問い合わせよりご連絡ください。",
    },
];

function SectionIntro({
    eyebrow,
    title,
    description,
    align = "center",
}: {
    eyebrow: string;
    title: string;
    description?: string;
    align?: "center" | "left";
}) {
    return (
        <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
            <p className="text-xs font-black tracking-[0.18em] text-blue-700">{eyebrow}</p>
            <h2 className="mt-3 text-2xl font-black leading-tight text-slate-950 jp-heading ![word-break:normal] sm:text-3xl lg:text-4xl">
                {title}
            </h2>
            {description && (
                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                    {description}
                </p>
            )}
        </div>
    );
}

function FeatureCheck({ children }: { children: ReactNode }) {
    return (
        <li className="flex items-start gap-3 text-sm leading-6 text-slate-700">
            <span
                aria-hidden="true"
                className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-black text-blue-700"
            >
                ✓
            </span>
            <span>{children}</span>
        </li>
    );
}

function PillarLabel({ number }: { number: string }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-black text-blue-800">
            <span>収録 {number}</span>
            <span className="h-1 w-1 rounded-full bg-blue-400" />
            <span>Plus限定</span>
        </span>
    );
}

function MidPageCta({ placement }: { placement: string }) {
    return (
        <section className="border-y border-blue-100 bg-blue-50/70 py-6" aria-label="自主トレ素材庫Plusへのお申し込み">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center sm:px-6 lg:flex-row lg:justify-between lg:px-8 lg:text-left">
                <div>
                    <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                        <p className="text-lg font-black text-slate-950">
                            4つ全部入りで、月額<span className="text-blue-700">{currentPriceLabel}</span>
                        </p>
                        {PLUS_PROMO_IS_ACTIVE && (
                            <span className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-[11px] font-black text-amber-950">
                                登録時価格のまま据え置き
                            </span>
                        )}
                    </div>
                    <p className="mt-1 text-xs font-bold leading-5 text-slate-600">
                        いつでも解約・ダウンロード済みは解約後も利用できます
                    </p>
                </div>
                <PlusSubscribeButton
                    placement={placement}
                    label={`月額${currentPriceLabel}で始める`}
                    className="inline-flex w-full items-center justify-center rounded-xl bg-blue-700 px-7 py-3.5 text-sm font-black text-white shadow-md shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                />
            </div>
        </section>
    );
}

export default function JishutorePlusPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white pb-20 sm:pb-0">
            <Header />
            <main className="min-w-0 flex-1 overflow-x-clip [&_h1]:break-keep [&_h2]:break-keep [&_h3]:break-keep">
                <section className="relative overflow-hidden border-b border-blue-100 bg-[radial-gradient(circle_at_top_right,_rgba(191,219,254,0.75),_transparent_42%),linear-gradient(to_bottom,_#eff6ff,_#ffffff)]">
                    <div className="absolute -left-20 top-20 h-56 w-56 rounded-full bg-indigo-100/60 blur-3xl" aria-hidden="true" />
                    <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:items-center lg:px-8 lg:py-20">
                        <div className="text-center lg:text-left">
                            <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                                <span className="rounded-full bg-slate-950 px-4 py-1.5 text-xs font-black text-white">
                                    PT・OT・ST個人向け
                                </span>
                                {PLUS_PROMO_IS_ACTIVE && (
                                    <span className="rounded-full border border-amber-300 bg-amber-50 px-4 py-1.5 text-xs font-black text-amber-900">
                                        {PLUS_PROMO_BADGE_TEXT}
                                        <PlusPromoCountdown prefix="・" />
                                    </span>
                                )}
                            </div>
                            <p className="mt-5 text-xs font-black tracking-[0.18em] text-blue-700">
                                自主トレ素材庫Plus
                            </p>
                            <h1 className="mt-3 text-4xl font-black leading-[1.12] tracking-tight text-slate-950 sm:text-5xl xl:text-[2.875rem]">
                                <span className="block xl:whitespace-nowrap">資料づくりも、算定確認も、</span>
                                <span className="mt-2 block text-blue-700">これひとつ。</span>
                            </h1>
                            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base lg:mx-0">
                                {HERO_DESCRIPTION}
                            </p>

                            <div className="mx-auto mt-7 max-w-xl rounded-2xl border border-blue-200 bg-white/90 p-4 text-left shadow-lg shadow-blue-950/5 lg:mx-0">
                                <div className="flex flex-wrap items-end justify-between gap-3">
                                    <div>
                                        <p className="text-xs font-bold text-slate-500">
                                            {PLUS_PROMO_IS_ACTIVE ? "期間中の新規登録" : "月額プラン"}
                                        </p>
                                        <p className="mt-1 text-3xl font-black tracking-tight text-slate-950">
                                            月額 <span className="text-blue-700">{currentPriceLabel}</span>
                                        </p>
                                    </div>
                                    {PLUS_PROMO_IS_ACTIVE && (
                                        <p className="rounded-xl bg-amber-50 px-3 py-2 text-xs font-black leading-5 text-amber-900">
                                            {PLUS_PROMO_DEADLINE_LABEL}
                                            <br />登録時価格のまま据え置き
                                        </p>
                                    )}
                                </div>
                                {PLUS_PROMO_IS_ACTIVE && (
                                    <p className="mt-3 border-t border-slate-100 pt-3 text-xs leading-6 text-slate-600">
                                        キャンペーン終了後の新規登録は月額{nextPriceLabel}です。既存会員は登録時の価格のまま変わりません。
                                    </p>
                                )}
                            </div>

                            <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
                                <PlusSubscribeButton
                                    placement="plus_lp_hero"
                                    label={`月額${currentPriceLabel}で始める`}
                                    className="inline-flex w-full items-center justify-center rounded-xl bg-blue-700 px-8 py-4 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                                />
                                <Link
                                    href="#included"
                                    className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-7 py-4 text-sm font-black text-slate-700 transition hover:border-blue-300 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:w-auto"
                                >
                                    4つの収録内容を見る
                                </Link>
                            </div>
                            <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-bold text-slate-600 lg:justify-start">
                                <span>✓ いつでも解約</span>
                                <span>✓ 登録日起算の月額課金</span>
                                <span>✓ ダウンロード済みは解約後も利用可</span>
                            </div>
                            <p className="mt-4 text-xs text-slate-500">
                                すでにご契約の方は{" "}
                                <Link href="/plus/login" className="font-bold text-blue-700 underline decoration-blue-200 underline-offset-2 hover:decoration-blue-600">
                                    会員ログイン
                                </Link>
                            </p>
                        </div>

                        <div className="mx-auto w-full max-w-2xl">
                            <div className="relative aspect-[16/9] w-full" aria-label="Plusに収録している実物スライドの例">
                                <div className="absolute inset-x-[13%] top-[2%] z-0 overflow-hidden rounded-2xl border border-white/80 bg-white p-1.5 opacity-45 shadow-xl sm:p-2" aria-hidden="true">
                                    <div className="flex items-center justify-between gap-3 px-1.5 pb-1.5">
                                        <div className="flex gap-1">
                                            <span className="h-1.5 w-1.5 rounded-full bg-rose-300" />
                                            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                                        </div>
                                        <span className="text-[8px] font-black tracking-wider text-slate-400">PLUS LIBRARY</span>
                                    </div>
                                    <Image
                                        src="/images/plus/library-screen.jpg"
                                        alt=""
                                        width={1265}
                                        height={645}
                                        sizes="(max-width: 639px) 74vw, (max-width: 1023px) 68vw, 460px"
                                        className="h-auto w-full rounded-xl border border-slate-100"
                                    />
                                </div>
                                {heroSlides.map((slide) => (
                                    <figure
                                        key={slide.src}
                                        className={`absolute overflow-hidden rounded-xl border border-white/90 bg-white p-1 shadow-2xl shadow-blue-950/20 sm:rounded-2xl sm:p-2 ${slide.className}`}
                                    >
                                        <Image
                                            src={slide.src}
                                            alt={`${slide.title}の実物スライド`}
                                            width={1200}
                                            height={675}
                                            priority={"priority" in slide && slide.priority}
                                            sizes="(max-width: 639px) 58vw, (max-width: 1023px) 56vw, 410px"
                                            className="h-auto w-full rounded-lg"
                                        />
                                    </figure>
                                ))}
                            </div>
                            <p className="mt-3 text-center text-xs font-bold text-slate-500">
                                実物の16:9スライド。回数バッジとポイントは編集できます
                            </p>
                        </div>
                    </div>
                </section>

                <section className="border-b border-slate-200 bg-white" aria-label="自主トレ素材庫の公開実績">
                    <div className="mx-auto flex max-w-5xl flex-wrap items-stretch justify-center gap-3 px-4 py-5 sm:px-6">
                        {proofItems.map((item) => (
                            <div key={item.label} className="min-w-40 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-center sm:max-w-72 sm:px-9">
                                <p className="text-xl font-black tracking-tight text-blue-700 sm:text-2xl">{item.value}</p>
                                <p className="mt-1 text-[11px] font-bold text-slate-500 sm:text-xs">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="included" className="scroll-mt-20 bg-slate-950 py-12 text-white sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-xs font-black tracking-[0.18em] text-blue-300">ALL IN ONE</p>
                            <h2 className="mt-3 text-2xl font-black leading-tight jp-heading ![word-break:normal] sm:text-3xl lg:text-4xl">
                                4つとも、追加料金なしで使えます
                            </h2>
                            <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                                個別販売していた完成デッキとツール、合計2,940円分もPlusへ収録。有料商品はPlusひとつにまとめました。
                            </p>
                        </div>
                        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {pillars.map((pillar) => (
                                <article key={pillar.number} className="flex min-w-0 flex-col rounded-2xl border border-slate-700 bg-slate-900 p-5">
                                    <span className="text-sm font-black text-blue-300">{pillar.number}</span>
                                    <h3 className="mt-3 text-lg font-black leading-snug text-white">{pillar.title}</h3>
                                    <p className="mt-3 flex-1 text-sm leading-6 text-slate-300">{pillar.summary}</p>
                                    <p className="mt-5 border-t border-slate-700 pt-4 text-xs font-bold leading-5 text-blue-200">
                                        {pillar.detail}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="editable-slides" className="scroll-mt-20 py-12 sm:py-20">
                    <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:px-8">
                        <div>
                            <PillarLabel number="01" />
                            <h2 className="mt-4 text-2xl font-black leading-tight text-slate-950 jp-heading ![word-break:normal] sm:text-3xl lg:text-4xl">
                                編集できる運動スライド
                            </h2>
                            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                                無料イラストの「文字あり」全点と1対1で対応する、16:9のPowerPointです。イラストを全面に配置し、黄色の回数バッジと下部のポイント2行を読みやすく整理しています。
                            </p>
                            <ul className="mt-6 space-y-3">
                                <FeatureCheck>{PLUS_SLIDE_COUNT}点を収録し、継続して追加</FeatureCheck>
                                <FeatureCheck>最大10点を選んで、1つのPowerPointに結合</FeatureCheck>
                                <FeatureCheck>回数バッジとポイントは、編集できるテキストボックス</FeatureCheck>
                                <FeatureCheck>対象者に合わせて編集し、そのまま印刷・説明に使用</FeatureCheck>
                            </ul>
                            {PLUS_ROADMAP.length > 0 && (
                                <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4">
                                    <p className="text-sm font-black text-indigo-950">今後の追加予定</p>
                                    <div className="mt-3 space-y-3">
                                        {PLUS_ROADMAP.map((item) => (
                                            <div key={item.label} className="rounded-xl border border-indigo-100 bg-white p-3">
                                                <div className="flex flex-wrap items-center justify-between gap-2">
                                                    <p className="text-xs font-black text-indigo-800">{item.label}</p>
                                                    {item.count !== undefined && (
                                                        <span className="text-[11px] font-bold text-slate-500">{item.count}点を予定</span>
                                                    )}
                                                </div>
                                                <p className="mt-1 text-xs leading-5 text-slate-600">{item.topics.join("・")}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <TrackedPlusResourceLink
                                href="/images/plus/sample.pptx"
                                download
                                resource="powerpoint_sample"
                                placement="plus_lp_editable_slides"
                                className="mt-7 inline-flex w-full items-center justify-center rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-black text-blue-800 transition hover:border-blue-300 hover:bg-blue-100 sm:w-auto"
                            >
                                3枚入りのPowerPointを無料で試す
                            </TrackedPlusResourceLink>
                        </div>
                        <div className="grid grid-cols-2 gap-3 rounded-3xl bg-blue-50 p-3 sm:gap-4 sm:p-5">
                            {previews.slice(0, 4).map((preview, index) => (
                                <figure key={preview.src} className={index === 0 ? "col-span-2 overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm" : "overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm"}>
                                    <Image
                                        src={preview.src}
                                        alt={`${preview.title}の編集できる運動スライド`}
                                        width={1200}
                                        height={675}
                                        sizes={index === 0 ? "(max-width: 1023px) 92vw, 600px" : "(max-width: 1023px) 45vw, 290px"}
                                        className="h-auto w-full"
                                    />
                                    {index === 0 && (
                                        <figcaption className="border-t border-slate-100 px-4 py-3 text-xs font-bold leading-5 text-slate-600">
                                            実物の16:9スライド。黄色の回数バッジと下部の文章を編集できます。
                                        </figcaption>
                                    )}
                                </figure>
                            ))}
                        </div>
                    </div>
                </section>

                <PlusPreviewGallery previews={previews} />

                <section id="completed-decks" className="scroll-mt-20 border-y border-slate-200 bg-slate-50 py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start">
                            <div className="lg:sticky lg:top-24">
                                <PillarLabel number="02" />
                                <h2 className="mt-4 text-2xl font-black leading-tight text-slate-950 jp-heading ![word-break:normal] sm:text-3xl lg:text-4xl">
                                    そのまま印刷して使える完成デッキ
                                </h2>
                                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                                    急ぐ日は、構成済みの資料を開いて必要な部分だけ調整できます。退院前指導や訪問リハなど、準備を一から始めたくない場面に使えます。
                                </p>
                                <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                                    <p className="text-sm font-black text-amber-950">旧・個別販売の商品も収録</p>
                                    <p className="mt-1 text-xs leading-6 text-amber-900">
                                        2つの完成デッキは旧・個別販売の商品です。Plusでは追加料金なしで利用できます。
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                <article className="flex min-w-0 flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <span className="rounded-full bg-blue-700 px-3 py-1 text-xs font-black text-white">疾患別</span>
                                        <span className="text-xs font-bold text-slate-500">PowerPoint＋PDF</span>
                                    </div>
                                    <h3 className="mt-4 text-xl font-black text-slate-950">疾患別9本セット</h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        疾患ごとの注意点と運動をまとめた完成資料。患者さん・ご家族が、自宅で見返しやすい構成です。
                                    </p>
                                    <ul className="mt-5 flex flex-wrap gap-2">
                                        {diseaseDeckTopics.map((topic) => (
                                            <li key={topic} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700">
                                                {topic}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="mt-5 border-t border-slate-100 pt-4 text-xs font-bold leading-5 text-blue-700">
                                        退院前指導・訪問リハ・家族説明に
                                    </p>
                                </article>

                                <article className="flex min-w-0 flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <span className="rounded-full bg-indigo-700 px-3 py-1 text-xs font-black text-white">姿勢別</span>
                                        <span className="text-xs font-bold text-slate-500">会員ページからZIP</span>
                                    </div>
                                    <h3 className="mt-4 text-xl font-black text-slate-950">姿勢別6種セット</h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        疾患名ではなく、今できる姿勢から運動を選べる完成資料。体力や立位の安定性に合わせやすい構成です。
                                    </p>
                                    <ul className="mt-5 grid grid-cols-2 gap-2">
                                        {postureDeckTopics.map((topic) => (
                                            <li key={topic} className="rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-2 text-center text-xs font-black text-indigo-900">
                                                {topic}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="mt-5 border-t border-slate-100 pt-4 text-xs font-bold leading-5 text-indigo-700">
                                        訪問リハ・通所リハ・集団体操に
                                    </p>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>

                <MidPageCta placement="plus_lp_mid_completed_decks" />

                <section id="prompt-workshop" className="scroll-mt-20 py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
                            <div>
                                <PillarLabel number="03" />
                                <h2 className="mt-4 text-2xl font-black leading-tight text-slate-950 jp-heading ![word-break:normal] sm:text-3xl lg:text-4xl">
                                    伝わるプロンプト工房
                                </h2>
                                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                                    ChatGPTに貼り付けるスライド画像生成プロンプトを、会員専用Webツールで組み立てます。毎回ゼロから文章を考えず、場面と見た目を選んで使えます。
                                </p>
                                <div className="mt-7 space-y-3">
                                    {promptWorkshopFlow.map((item) => (
                                        <article key={item.number} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-sm font-black text-white">
                                                {item.number}
                                            </span>
                                            <div>
                                                <h3 className="text-sm font-black text-slate-950">{item.title}</h3>
                                                <p className="mt-1 text-sm leading-6 text-slate-600">{item.body}</p>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                                <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-6 text-amber-950">
                                    <strong className="font-black">専門職による確認が必要です。</strong>
                                    生成AIの出力には誤りが含まれる場合があります。医療・介護現場で使う前に、内容と表現を必ず確認してください。
                                </div>
                                <p className="mt-4 text-xs font-bold text-slate-500">
                                    旧・個別販売の商品です。現在はPlusだけで利用できます。
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 rounded-3xl bg-slate-100 p-3 sm:gap-4 sm:p-5">
                                <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                                    <Image
                                        src="/products/slide-prompt-generator/ui-style-picker.png"
                                        alt="伝わるプロンプト工房で用途テンプレとビジュアルスタイルを選ぶ実際の画面"
                                        width={1600}
                                        height={2023}
                                        sizes="(max-width: 1023px) 45vw, 300px"
                                        className="h-72 w-full object-cover object-top sm:h-[26rem]"
                                    />
                                    <figcaption className="border-t border-slate-100 px-3 py-3 text-xs font-bold leading-5 text-slate-600">
                                        テンプレと見た目を選択
                                    </figcaption>
                                </figure>
                                <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                                    <Image
                                        src="/products/slide-prompt-generator/ui-prompt-output.png"
                                        alt="伝わるプロンプト工房でChatGPT用プロンプトが組み上がった実際の画面"
                                        width={1600}
                                        height={2269}
                                        sizes="(max-width: 1023px) 45vw, 300px"
                                        className="h-72 w-full object-cover object-top sm:h-[26rem]"
                                    />
                                    <figcaption className="border-t border-slate-100 px-3 py-3 text-xs font-bold leading-5 text-slate-600">
                                        貼り付け用プロンプトを作成
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="fee-check-feature" className="scroll-mt-20 border-y border-blue-100 bg-blue-50/70 py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-9 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
                            <div>
                                <PillarLabel number="04" />
                                <h2 className="mt-4 text-2xl font-black leading-tight text-slate-950 jp-heading ![word-break:normal] sm:text-3xl lg:text-4xl">
                                    診療・介護報酬チェック
                                </h2>
                                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                                    全{feeDomains.length}分野・{feeCheckItemCount}項目の単位数、算定要件、根拠リンクを整理。Plusでは、記録に残すこと、自己点検で見るポイント、つまずきやすい点まで確認できます。
                                </p>
                                <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                                    <div className="rounded-2xl border border-blue-100 bg-white p-3 text-center sm:p-4">
                                        <p className="text-2xl font-black text-blue-800">{feeDomains.length}</p>
                                        <p className="mt-1 text-[11px] font-bold text-slate-500">対応分野</p>
                                    </div>
                                    <div className="rounded-2xl border border-blue-100 bg-white p-3 text-center sm:p-4">
                                        <p className="text-2xl font-black text-blue-800">{feeCheckItemCount}</p>
                                        <p className="mt-1 text-[11px] font-bold text-slate-500">収載項目</p>
                                    </div>
                                    <div className="rounded-2xl border border-blue-100 bg-white p-3 text-center sm:p-4">
                                        <p className="text-2xl font-black text-blue-800">{feeComboDomainCount}</p>
                                        <p className="mt-1 text-[11px] font-bold text-slate-500">組み合わせ対応</p>
                                    </div>
                                </div>
                                <p className="mt-4 text-xs leading-6 text-slate-500">
                                    対応分野：{feeCheckDomainLabels.join("・")}
                                </p>
                                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                    <TrackedPlusResourceLink
                                        href="/fee-check/"
                                        resource="fee_check_free"
                                        placement="plus_lp_fee_check_feature"
                                        className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-800"
                                    >
                                        無料版を見る
                                    </TrackedPlusResourceLink>
                                    <Link href={getFeeItemUrl(feeCheckSampleDomain.domain, feeCheckSampleItem.id)} className="inline-flex items-center justify-center rounded-xl border border-blue-200 bg-white px-5 py-3 text-sm font-black text-blue-800 transition hover:bg-blue-50">
                                        全文サンプルを見る
                                    </Link>
                                    <Link href="/plus/fee-check-combo/" className="inline-flex items-center justify-center rounded-xl border border-blue-200 bg-white px-5 py-3 text-sm font-black text-blue-800 transition hover:bg-blue-50">
                                        組み合わせチェック
                                    </Link>
                                </div>
                                <p className="mt-5 text-xs leading-6 text-slate-500">
                                    ※ 個別ケースの算定可否を断定するものではありません。実際の請求では、原本と保険者・地方厚生局への確認を優先してください。
                                </p>
                            </div>

                            <article className="overflow-hidden rounded-3xl border border-blue-200 bg-white shadow-xl shadow-blue-950/5">
                                <div className="border-b border-slate-100 bg-slate-950 px-5 py-4 text-white sm:px-6">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-black text-blue-900">実際の収載例</span>
                                        <span className="rounded-full border border-slate-600 px-2.5 py-1 text-[11px] font-bold text-slate-200">一次資料確認済み</span>
                                    </div>
                                    <h3 className="mt-3 text-lg font-black leading-snug">{feeCheckSampleItem.name}</h3>
                                </div>
                                <div className="p-4 sm:p-6">
                                    <div className="grid grid-cols-[minmax(0,1fr)_auto] overflow-hidden rounded-xl border border-slate-200 text-sm">
                                        <span className="bg-slate-50 px-3 py-3 font-bold text-slate-700">{feeCheckSampleUnit.condition}</span>
                                        <span className="border-l border-slate-200 bg-blue-50 px-4 py-3 font-black text-blue-900">{feeCheckSampleUnit.value}</span>
                                    </div>
                                    <div className="mt-4 rounded-xl border border-slate-200 p-4">
                                        <p className="text-sm font-black text-slate-950">算定要件</p>
                                        <p className="mt-2 text-sm leading-6 text-slate-600">{feeCheckSampleItem.requirements[0]}</p>
                                    </div>
                                    <div className="my-4 rounded-xl bg-blue-700 px-4 py-3 text-sm font-black text-white">
                                        Plusでは、この先の実務確認まで表示
                                    </div>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4">
                                            <p className="text-sm font-black text-blue-950">記録に残すこと</p>
                                            <p className="mt-2 text-sm leading-6 text-slate-700">{feeCheckSampleItem.records[0]}</p>
                                        </div>
                                        <div className="rounded-xl border border-blue-100 bg-white p-4">
                                            <p className="text-sm font-black text-blue-950">自己点検で見るポイント</p>
                                            <p className="mt-2 text-sm leading-6 text-slate-700">{feeCheckSampleItem.auditPoints[0]}</p>
                                        </div>
                                    </div>
                                    {feeCheckSampleItem.pitfalls?.[0] && (
                                        <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
                                            <strong className="font-black">つまずきやすい点：</strong>{feeCheckSampleItem.pitfalls[0]}
                                        </p>
                                    )}
                                </div>
                            </article>
                        </div>
                    </div>
                </section>

                <section id="how-it-works" className="scroll-mt-20 py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <SectionIntro
                            eyebrow="現場での使い方"
                            title="登録から指導・点検まで、ひと続きで使えます"
                            description="資料づくりと報酬確認を別々に探さず、同じ会員ページから必要な機能へ移れます。"
                        />
                        <ol className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {workFlow.map((item) => (
                                <li key={item.number} className="flex">
                                    <article className="flex w-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-3xl font-black tracking-tight text-blue-200">{item.number}</span>
                                            <span className="text-right text-xs font-black text-blue-700">{item.phase}</span>
                                        </div>
                                        <h3 className="mt-4 text-base font-black leading-snug text-slate-950">{item.title}</h3>
                                        <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{item.body}</p>
                                    </article>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                <MidPageCta placement="plus_lp_mid_workflow" />

                <section id="free-samples" className="scroll-mt-20 border-y border-slate-200 bg-slate-50 py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <SectionIntro
                            eyebrow="登録前に確認"
                            title="まずは無料で、実物と中身を試せます"
                            description="PowerPointの編集感、報酬チェックの情報量、無料イラストの使い勝手を先に確かめてください。"
                        />
                        <div className="mt-9 grid gap-5 md:grid-cols-3">
                            <article className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                <span className="text-3xl font-black text-blue-200">01</span>
                                <h3 className="mt-4 text-lg font-black text-slate-950">PowerPointサンプル</h3>
                                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                                    実際と同じ形式の3枚入り。回数とポイントを編集できるか確認できます。
                                </p>
                                <TrackedPlusResourceLink
                                    href="/images/plus/sample.pptx"
                                    download
                                    resource="powerpoint_sample"
                                    placement="plus_lp_free_trial"
                                    className="mt-5 inline-flex items-center justify-center rounded-xl bg-blue-700 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-800"
                                >
                                    無料サンプルをダウンロード
                                </TrackedPlusResourceLink>
                            </article>
                            <article className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                <span className="text-3xl font-black text-blue-200">02</span>
                                <h3 className="mt-4 text-lg font-black text-slate-950">報酬チェック無料版</h3>
                                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                                    単位数・算定要件・根拠リンクを一部公開。Plus限定の全文サンプルも1項目確認できます。
                                </p>
                                <TrackedPlusResourceLink
                                    href="/fee-check/"
                                    resource="fee_check_free"
                                    placement="plus_lp_free_trial"
                                    className="mt-5 inline-flex items-center justify-center rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-black text-blue-800 transition hover:bg-blue-100"
                                >
                                    無料版を開く
                                </TrackedPlusResourceLink>
                            </article>
                            <article className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                <span className="text-3xl font-black text-blue-200">03</span>
                                <h3 className="mt-4 text-lg font-black text-slate-950">無料イラスト {FREE_MATERIAL_COUNT}点</h3>
                                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                                    登録不要・商用利用OK。無料ページだけでも、PNG画像を1点ずつダウンロードできます。
                                </p>
                                <Link href="/items/" className="mt-5 inline-flex items-center justify-center rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-black text-blue-800 transition hover:bg-blue-100">
                                    無料素材を見る
                                </Link>
                            </article>
                        </div>
                    </div>
                </section>

                <section id="pricing" className="scroll-mt-20 bg-blue-700 py-12 text-white sm:py-20">
                    <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:px-8">
                        <div>
                            <p className="text-xs font-black tracking-[0.18em] text-blue-200">料金</p>
                            <h2 className="mt-3 text-2xl font-black leading-tight jp-heading ![word-break:normal] sm:text-3xl lg:text-4xl">
                                4つ全部入りで、月額{currentPriceLabel}
                            </h2>
                            <p className="mt-4 text-sm leading-7 text-blue-100 sm:text-base">
                                登録日を基準に1か月ごとの課金です。いつでも解約でき、ダウンロード済みのPowerPointと完成デッキは解約後も使えます。
                            </p>
                            <p className="mt-5 rounded-2xl border border-blue-400/60 bg-blue-800/50 px-4 py-3 text-sm font-bold leading-6 text-white">
                                旧・個別販売の完成デッキ2本＋プロンプト工房、合計2,940円分を含みます。
                            </p>
                            <ul className="mt-6 space-y-2 text-sm font-bold text-white">
                                <li>✓ クレジットカード決済</li>
                                <li>✓ 登録後すぐに会員ページを利用</li>
                                <li>✓ 契約中の追加素材も追加料金なし</li>
                            </ul>
                        </div>

                        <div className="rounded-3xl bg-white p-5 text-slate-950 shadow-2xl shadow-blue-950/25 sm:p-7">
                            {PLUS_PROMO_IS_ACTIVE ? (
                                <>
                                    <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-950">
                                        {PLUS_PROMO_DEADLINE_LABEL}の登録が対象
                                        <PlusPromoCountdown prefix="・" />
                                    </span>
                                    <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                                        <div className="rounded-2xl border-2 border-blue-600 bg-blue-50 p-4 text-center">
                                            <p className="text-xs font-black text-blue-700">いま登録</p>
                                            <p className="mt-2 text-3xl font-black tracking-tight">月額{currentPriceLabel}</p>
                                            <p className="mt-1 text-xs font-bold text-blue-800">登録中はこの価格のまま</p>
                                        </div>
                                        <span className="text-center text-xl font-black text-slate-300" aria-hidden="true">→</span>
                                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
                                            <p className="text-xs font-black text-slate-500">キャンペーン終了後の新規</p>
                                            <p className="mt-2 text-3xl font-black tracking-tight text-slate-700">月額{nextPriceLabel}</p>
                                            <p className="mt-1 text-xs font-bold text-slate-500">既存会員の価格は変更なし</p>
                                        </div>
                                    </div>
                                    <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-xs font-bold leading-6 text-amber-950">
                                        {PLUS_PROMO_PRICE_NOTE}既存会員は登録時の価格のままです。
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p className="text-xs font-black text-blue-700">自主トレ素材庫Plus</p>
                                    <p className="mt-3 text-4xl font-black tracking-tight">月額{currentPriceLabel}</p>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        運動スライド、完成デッキ、プロンプト工房、報酬チェックの4つを利用できます。
                                    </p>
                                </>
                            )}
                            <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-center">
                                <p className="text-xs font-bold text-slate-600">30日換算なら</p>
                                <p className="mt-1 text-xl font-black text-blue-800">1日あたり約{dailyPriceLabel}</p>
                            </div>
                            <div className="mt-6">
                                <PlusSubscribeButton
                                    placement="plus_lp_pricing"
                                    label={`月額${currentPriceLabel}で申し込む`}
                                    className="inline-flex w-full items-center justify-center rounded-xl bg-blue-700 px-8 py-4 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                                />
                            </div>
                            <p className="mt-3 text-center text-xs font-bold text-slate-600">
                                <Link href="#faq-receipt" className="text-blue-700 underline decoration-blue-200 underline-offset-2 hover:decoration-blue-600">
                                    領収書発行可（経費精算にも使えます）
                                </Link>
                            </p>
                            <p className="mt-3 text-center text-[11px] leading-5 text-slate-500">
                                Stripeの安全な決済画面へ移動します。いつでも解約できます。
                            </p>
                        </div>
                    </div>
                </section>

                <section id="comparison" className="scroll-mt-20 py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <SectionIntro
                            eyebrow="無料素材との違い"
                            title="無料で足りる方も、Plusが合う方もいます"
                            description="画像だけ使いたい方は無料素材のままで大丈夫です。編集・完成資料・ツール・報酬確認までまとめたい方にPlusが向いています。"
                        />

                        <div className="mt-9 grid gap-5 md:hidden">
                            <article className="rounded-3xl border-2 border-blue-500 bg-blue-50 p-5 shadow-sm">
                                <span className="rounded-full bg-blue-700 px-3 py-1 text-xs font-black text-white">4つ全部入り</span>
                                <h3 className="mt-4 text-xl font-black text-slate-950">自主トレ素材庫Plus</h3>
                                <dl className="mt-4 divide-y divide-blue-100">
                                    {comparisonRows.map((row) => (
                                        <div key={row.label} className="py-3 first:pt-0">
                                            <dt className="text-xs font-black text-blue-800">{row.label}</dt>
                                            <dd className="mt-1 text-sm leading-6 text-slate-700">{row.plus}</dd>
                                        </div>
                                    ))}
                                </dl>
                                <div className="mt-5">
                                    <PlusSubscribeButton
                                        placement="plus_lp_comparison_mobile"
                                        label={`月額${currentPriceLabel}で始める`}
                                        className="inline-flex w-full items-center justify-center rounded-xl bg-blue-700 px-6 py-3.5 text-sm font-black text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                                    />
                                </div>
                            </article>
                            <article className="rounded-3xl border border-slate-200 bg-white p-5">
                                <h3 className="text-xl font-black text-slate-950">無料素材</h3>
                                <dl className="mt-4 divide-y divide-slate-100">
                                    {comparisonRows.map((row) => (
                                        <div key={row.label} className="py-3 first:pt-0">
                                            <dt className="text-xs font-black text-slate-500">{row.label}</dt>
                                            <dd className="mt-1 text-sm leading-6 text-slate-600">{row.free}</dd>
                                        </div>
                                    ))}
                                </dl>
                                <Link href="/items/" className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-slate-300 px-6 py-3.5 text-sm font-black text-slate-700 hover:border-blue-300 hover:text-blue-700">
                                    無料素材を見る
                                </Link>
                            </article>
                        </div>

                        <div className="mt-10 hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
                            <table className="w-full table-fixed border-collapse bg-white text-left">
                                <thead>
                                    <tr className="bg-slate-100">
                                        <th className="w-[18%] p-4 text-sm font-black text-slate-700">比較項目</th>
                                        <th className="p-4 text-sm font-black text-slate-900">無料素材</th>
                                        <th className="bg-blue-700 p-4 text-sm font-black text-white">自主トレ素材庫Plus</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonRows.map((row) => (
                                        <tr key={row.label} className="border-t border-slate-200 align-top">
                                            <th className="p-4 text-sm font-black text-slate-700">{row.label}</th>
                                            <td className="p-4 text-sm leading-6 text-slate-600">{row.free}</td>
                                            <td className="bg-blue-50 p-4 text-sm font-bold leading-6 text-blue-950">{row.plus}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                <section className="border-y border-blue-100 bg-blue-50/60 py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <SectionIntro
                            eyebrow="運営と確認体制"
                            title="現場で確認しやすい形を、誠実に積み重ねます"
                            description="作業療法士の視点で素材を制作し、報酬情報は一次資料に戻れる形で整理しています。"
                        />
                        <div className="mt-9 grid gap-5 md:grid-cols-3">
                            <article className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
                                <p className="text-3xl font-black text-blue-700">OT</p>
                                <h3 className="mt-3 text-lg font-black text-slate-950">作業療法士が運営</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">自主トレ指導で見やすく、編集しやすいことを基準に制作しています。</p>
                                <Link href="/about/" className="mt-5 inline-flex text-sm font-black text-blue-700 hover:underline">運営者について →</Link>
                            </article>
                            <article className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
                                <p className="text-3xl font-black text-blue-700">{FREE_MATERIAL_COUNT}点</p>
                                <h3 className="mt-3 text-lg font-black text-slate-950">無料素材を継続公開</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">登録不要・商用利用OKの素材を公開し、Plus登録前にも品質を確認できます。</p>
                                <Link href="/items/" className="mt-5 inline-flex text-sm font-black text-blue-700 hover:underline">無料素材を見る →</Link>
                            </article>
                            <article className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
                                <p className="text-3xl font-black text-blue-700">一次資料</p>
                                <h3 className="mt-3 text-lg font-black text-slate-950">根拠と確認日を掲載</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">厚生労働省等の告示・通知・疑義解釈を基準に、根拠リンクを掲載します。</p>
                                <Link href="/fee-check/editorial-policy/" className="mt-5 inline-flex text-sm font-black text-blue-700 hover:underline">編集方針を見る →</Link>
                            </article>
                        </div>
                    </div>
                </section>

                {/* 掲載許諾つきの声が0件のあいだは、セクションごと表示しない */}
                <Testimonials product="plus" />

                <section id="faq" className="scroll-mt-20 bg-slate-50 py-12 sm:py-20">
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                        <SectionIntro
                            eyebrow="FAQ"
                            title="よくあるご質問"
                            description="契約、利用条件、以前の商品についてまとめています。"
                        />
                        <div className="mt-9 space-y-3">
                            {faqs.map((faq, index) => (
                                <details
                                    key={faq.q}
                                    id={faq.id}
                                    className="group scroll-mt-24 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm open:border-blue-200 open:shadow-md"
                                    open={index === 0 || faq.id === "faq-receipt"}
                                >
                                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-sm font-black leading-6 text-slate-950 sm:text-base">
                                        <span className="flex-1">Q. {faq.q}</span>
                                        <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-lg font-bold text-blue-700 transition-transform group-open:rotate-45">＋</span>
                                    </summary>
                                    <div className="mt-3 border-t border-slate-100 pt-3 text-sm leading-7 text-slate-600">{faq.a}</div>
                                </details>
                            ))}
                        </div>
                        <p className="mt-6 text-center text-xs text-slate-500">
                            利用条件の詳細は{" "}
                            <Link href="/license" className="font-bold text-blue-700 hover:underline">利用規約</Link>
                            {" "}をご覧ください。
                        </p>
                    </div>
                </section>

                <section className="border-t border-blue-100 bg-[linear-gradient(135deg,_#eff6ff,_#ffffff_55%,_#eef2ff)] py-12 sm:py-20">
                    <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        {PLUS_PROMO_IS_ACTIVE && (
                            <span className="inline-flex rounded-full border border-amber-300 bg-amber-50 px-4 py-1.5 text-xs font-black text-amber-950">
                                {PLUS_PROMO_BADGE_TEXT}
                            </span>
                        )}
                        <h2 className="mt-4 text-3xl font-black leading-tight text-slate-950 jp-heading ![word-break:normal] sm:text-4xl">
                            資料づくりも、算定確認も、これひとつ。
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                            編集できる運動スライド、完成デッキ、伝わるプロンプト工房、診療・介護報酬チェックを、同じ月額で利用できます。
                        </p>
                        {PLUS_PROMO_IS_ACTIVE && (
                            <p className="mx-auto mt-5 max-w-2xl rounded-2xl border border-blue-100 bg-white px-4 py-3 text-sm font-bold leading-6 text-slate-700 shadow-sm">
                                {PLUS_PROMO_DEADLINE_LABEL}の登録で月額{currentPriceLabel}のまま据え置き。キャンペーン終了後の新規登録は月額{nextPriceLabel}です。
                            </p>
                        )}
                        <div className="mt-7 flex justify-center">
                            <PlusSubscribeButton
                                placement="plus_lp_final"
                                label={`月額${currentPriceLabel}で申し込む`}
                                className="inline-flex w-full items-center justify-center rounded-xl bg-blue-700 px-9 py-4 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                            />
                        </div>
                        <p className="mt-4 text-xs leading-6 text-slate-500">
                            まだ迷う方は{" "}
                            <TrackedLineLink
                                href={LINE_URL}
                                placement="plus_page_footer"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-emerald-700 underline decoration-emerald-200 underline-offset-2 hover:decoration-emerald-600"
                            >
                                LINEで更新情報を受け取る
                            </TrackedLineLink>
                            {" "}こともできます。
                        </p>
                    </div>
                </section>
            </main>

            <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-3 py-2 shadow-[0_-4px_18px_rgba(15,23,42,0.12)] backdrop-blur sm:hidden">
                <div className="mx-auto flex max-w-md items-center gap-3">
                    <div className="shrink-0">
                        {PLUS_PROMO_IS_ACTIVE && (
                            <p className="whitespace-nowrap text-[10px] font-black text-amber-700">
                                {PLUS_PROMO_DEADLINE_LABEL}
                                <PlusPromoCountdown prefix="・" />
                            </p>
                        )}
                        <p className="text-sm font-black text-slate-950">月額{currentPriceLabel}</p>
                    </div>
                    <PlusSubscribeButton
                        placement="plus_lp_mobile_sticky"
                        label="Plusを始める"
                        className="inline-flex w-full items-center justify-center rounded-xl bg-blue-700 px-5 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-60"
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}
