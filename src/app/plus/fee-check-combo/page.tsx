import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PlusSubscribeButton } from "@/components/plus/PlusSubscribeButton";
import { formatYen, PLUS_PROMO_CURRENT_PRICE_YEN } from "@/constants/plus-pricing";
import { PLUS_PAUSED_MEMBER_NOTE, PLUS_SIGNUP_PAUSED } from "@/constants/plus-availability";
import { getComboDomains, getFeeCheckTotalCount } from "@/lib/fee-check";

/**
 * 非会員向けの「加算の組み合わせチェック」説明ページ。
 *
 * ★このページが存在する理由：以前は Plus LP と無料の分野ページから
 * `/plus/fee-check-combo/`・`/plus/fee-hub/?tab=combo` へ直接リンクしており、
 * 非会員が middleware で**説明なしにログイン画面（メール入力欄）へ直行**していた。
 * 「何の機能か分からないままメールアドレスを求められる」状態だったため、
 * 機能の説明・表示イメージ・登録導線を挟む（2026-08-12）。
 *
 * 会員は middleware が `/plus/fee-hub/?tab=combo` へ転送するので、このページには来ない。
 *
 * ★ペイウォール：併算定チェックの中身（pairs / variantChoices / requires の
 * note と sources）はPlus限定。このページでは**収録件数と判定タイプの名前だけ**を出し、
 * 具体的な判定結果は伏せる。表示イメージは実データではなく静的なモック。
 */

const priceLabel = formatYen(PLUS_PROMO_CURRENT_PRICE_YEN);

export const metadata: Metadata = {
    title: `加算の組み合わせチェックとは｜自主トレ素材庫Plus（月額${priceLabel}）`,
    description:
        "算定している加算にチェックを入れると、併算定不可・条件付き・区分選択制・前提加算の規定を根拠リンクつきで表示する自主トレ素材庫Plusの会員機能です。対応分野と収録件数、表示イメージを紹介します。",
    alternates: {
        canonical: "https://jishutore-sozaiko.online/plus/fee-check-combo/",
    },
    // ★受付停止中は検索結果から下げる。既存会員の入口としてページ自体は残す。
    ...(PLUS_SIGNUP_PAUSED ? { robots: { index: false, follow: false } } : {}),
};

const CHECK_TYPES = [
    {
        mark: "⛔",
        title: "併算定できない組み合わせ",
        body: "同時に算定できない加算どうしを選んでいると警告します。返戻の原因になりやすいところです。",
        tone: "border-rose-200 bg-rose-50",
    },
    {
        mark: "⚠",
        title: "条件つきで算定できる組み合わせ",
        body: "「この条件を満たすときだけ併算定できる」タイプ。条件の中身まで表示します。",
        tone: "border-amber-200 bg-amber-50",
    },
    {
        mark: "🔀",
        title: "区分の選択制",
        body: "(Ⅰ)(Ⅱ)のようにどれか1つしか選べない加算で、複数を選んでいると知らせます。",
        tone: "border-blue-200 bg-blue-50",
    },
    {
        mark: "✅",
        title: "前提になる加算の不足",
        body: "その加算を算定するために別の加算の届出・算定が要る場合に、足りないものを挙げます。",
        tone: "border-emerald-200 bg-emerald-50",
    },
];

/** 表示イメージ（静的モック）。実データではなく、判定結果は伏せてある。 */
const MOCK_SELECTION = [
    { name: "個別機能訓練加算(Ⅰ)イ", checked: true },
    { name: "個別機能訓練加算(Ⅰ)ロ", checked: true },
    { name: "入浴介助加算(Ⅰ)", checked: true },
    { name: "ADL維持等加算(Ⅰ)", checked: false },
    { name: "認知症加算", checked: false },
];

export default function FeeCheckComboGatePage() {
    const comboDomains = getComboDomains();
    const ruleCount = comboDomains.reduce(
        (total, { conflicts }) =>
            total
            + conflicts.pairs.length
            + conflicts.variantChoices.length
            + (conflicts.requires?.length ?? 0),
        0,
    );
    const itemCount = getFeeCheckTotalCount();

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Header />
            <main className="flex-1">
                <div className="container mx-auto px-4 py-8">
                    <div className="mx-auto max-w-4xl">
                        <nav className="mb-4 flex flex-wrap gap-2 text-sm font-bold text-slate-500">
                            <Link href="/fee-check/" className="text-blue-700 hover:underline">
                                報酬チェック
                            </Link>
                            <span>/</span>
                            <span>加算の組み合わせチェック</span>
                        </nav>

                        <section className="rounded-2xl border border-blue-200 bg-white p-5 shadow-sm sm:p-7">
                            <span className="inline-flex rounded-full bg-blue-700 px-3 py-1 text-xs font-black text-white">
                                Plus限定ツール
                            </span>
                            <h1 className="mt-3 break-keep text-2xl font-black leading-snug text-slate-950 jp-heading sm:text-3xl">
                                この加算、一緒に算定できる？をまとめてチェック
                            </h1>
                            <p className="mt-3 max-w-2xl break-keep text-sm leading-7 text-slate-600">
                                自施設で算定している（予定の）加算にチェックを入れるだけで、
                                併算定不可・条件つき・区分選択制・前提加算の規定を、
                                厚生労働省の告示・通知へのリンクつきで表示します。
                                実地指導の前や、新しい加算を取るか検討するときの自己点検に使えます。
                            </p>

                            <div className="mt-5 grid grid-cols-3 gap-3">
                                <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3 text-center">
                                    <p className="text-2xl font-black text-blue-800">{comboDomains.length}</p>
                                    <p className="mt-1 text-[11px] font-bold text-slate-500">対応分野</p>
                                </div>
                                <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3 text-center">
                                    <p className="text-2xl font-black text-blue-800">{ruleCount}</p>
                                    <p className="mt-1 text-[11px] font-bold text-slate-500">収録した規定</p>
                                </div>
                                <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3 text-center">
                                    <p className="text-2xl font-black text-blue-800">{itemCount}</p>
                                    <p className="mt-1 text-[11px] font-bold text-slate-500">対象の項目</p>
                                </div>
                            </div>
                        </section>

                        <section className="mt-6">
                            <h2 className="text-lg font-black text-slate-950 break-keep">4種類の規定を見ています</h2>
                            <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                {CHECK_TYPES.map((type) => (
                                    <div key={type.title} className={`rounded-xl border p-4 ${type.tone}`}>
                                        <p className="text-sm font-black text-slate-900 break-keep">
                                            <span aria-hidden="true">{type.mark}</span> {type.title}
                                        </p>
                                        <p className="mt-2 text-sm leading-6 text-slate-700 break-keep">{type.body}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <h2 className="text-lg font-black text-slate-950 break-keep">表示イメージ</h2>
                                <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-500">
                                    実際の画面をもとにしたイメージです
                                </span>
                            </div>

                            <div className="mt-4 grid gap-4 md:grid-cols-2">
                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-xs font-black tracking-widest text-slate-500">1. 算定している加算を選ぶ</p>
                                    <ul className="mt-3 space-y-2">
                                        {MOCK_SELECTION.map((row) => (
                                            <li
                                                key={row.name}
                                                className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-bold ${
                                                    row.checked
                                                        ? "border-blue-200 bg-white text-slate-800"
                                                        : "border-slate-200 bg-white/60 text-slate-400"
                                                }`}
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] ${
                                                        row.checked
                                                            ? "border-blue-600 bg-blue-600 text-white"
                                                            : "border-slate-300 bg-white text-transparent"
                                                    }`}
                                                >
                                                    ✓
                                                </span>
                                                <span className="min-w-0 break-keep">{row.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-xs font-black tracking-widest text-slate-500">2. 該当する規定が出る</p>
                                    <ul className="mt-3 space-y-2">
                                        {CHECK_TYPES.map((type) => (
                                            <li key={type.title} className="rounded-md border border-slate-200 bg-white px-3 py-2">
                                                <p className="text-xs font-black text-slate-700 break-keep">
                                                    <span aria-hidden="true">{type.mark}</span> {type.title}
                                                </p>
                                                <div className="mt-2 space-y-1.5" aria-hidden="true">
                                                    <span className="block h-2 w-full rounded-full bg-slate-200" />
                                                    <span className="block h-2 w-4/5 rounded-full bg-slate-200" />
                                                </div>
                                                <p className="mt-2 text-[11px] font-bold text-blue-800">
                                                    🔒 該当する組み合わせと根拠リンクはPlusで表示されます
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="mt-6 rounded-2xl border border-blue-200 bg-blue-50/60 p-5 sm:p-6">
                            <h2 className="text-lg font-black text-slate-950 break-keep">
                                組み合わせチェックは自主トレ素材庫Plusの機能です
                            </h2>
                            <p className="mt-2 max-w-2xl break-keep text-sm leading-7 text-slate-600">
                                Plusでは、{itemCount}項目すべての「記録に残すこと・自己点検で見るポイント・つまずきやすい点」と、
                                この組み合わせチェック、全分野の横断検索、印刷が使えます。
                                改定・疑義解釈は毎月点検し、各ページの確認日を更新しています。
                            </p>
                            {PLUS_SIGNUP_PAUSED && (
                                <p className="mt-4 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold leading-6 text-slate-700 break-keep">
                                    現在、新規のお申し込みは停止しています。{PLUS_PAUSED_MEMBER_NOTE}
                                </p>
                            )}
                            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                                <PlusSubscribeButton
                                    placement="fee_combo_gate"
                                    label={`月額${priceLabel}で使う`}
                                    className="inline-flex w-full items-center justify-center rounded-xl bg-blue-700 px-8 py-4 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                                />
                                <Link
                                    href="/plus/login/"
                                    className="inline-flex items-center justify-center rounded-xl border border-blue-200 bg-white px-5 py-3 text-sm font-black text-blue-800 transition hover:bg-blue-50"
                                >
                                    すでに会員の方はログイン
                                </Link>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-black">
                                <Link href="/fee-check/" className="text-blue-700 hover:underline">
                                    無料版の報酬チェックを見る
                                </Link>
                                {!PLUS_SIGNUP_PAUSED && (
                                    <Link href="/products/jishutore-plus/" className="text-blue-700 hover:underline">
                                        Plusの収録内容を見る
                                    </Link>
                                )}
                            </div>
                        </section>

                        <p className="mt-6 rounded-md bg-slate-50 p-3 text-xs leading-5 text-slate-500">
                            ※ 個別ケースの算定可否を断定するものではありません。実際の請求では、原本と保険者・地方厚生局への確認を優先してください。
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
