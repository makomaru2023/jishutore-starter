import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LineBanner } from "@/components/LineBanner";
import { CheckoutButton } from "@/components/CheckoutButton";
import { DAY_SERVICE_EXERCISE_PACK_PRICE_ID } from "@/lib/products";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "デイサービス向け体操・口腔体操・転倒予防資料パック｜自主トレ素材庫",
    description:
        "デイサービスで使える体操資料、口腔体操資料、転倒予防資料をまとめた施設向け資料パック。印刷・配布・掲示・職員間共有に使いやすい資料を収録予定です。",
    openGraph: {
        title: "デイサービス向け体操・口腔体操・転倒予防資料パック｜自主トレ素材庫",
        description:
            "デイサービスで使える体操資料、口腔体操資料、転倒予防資料をまとめた施設向け資料パック。印刷・配布・掲示・職員間共有に使いやすい資料を収録予定です。",
    },
};

const PRODUCT_ID = "day-service-exercise-pack";
const PRODUCT_NAME = "デイサービス向け 体操・口腔体操・転倒予防資料パック";
const PRICE = 14800;
const LINE_HREF = "/#line";

// 価格IDが設定されたら自動的に購入ボタンが有効化される。未設定の間は「近日公開」表示。
const checkoutReady = Boolean(DAY_SERVICE_EXERCISE_PACK_PRICE_ID);

const HERO_BADGES = [
    "施設内利用OK",
    "印刷・配布OK",
    "掲示OK",
    "職員間で共有OK",
    "買い切り",
];

const PAIN_POINTS = [
    "毎日の体操メニューを考えて、資料を用意するのに時間がかかる",
    "口腔体操や嚥下体操の資料を、わかりやすくまとめたい",
    "転倒予防の運動を、利用者さんに安全に伝えたい",
    "職員によって、説明の内容や言葉がバラバラになりやすい",
    "無料素材を、どこまで施設で使っていいのか不安がある",
    "新人やパートの職員にも、同じ流れで体操を進めてほしい",
];

const FEATURES: { title: string; description: string }[] = [
    {
        title: "そのまま印刷して使える完成資料",
        description:
            "イラスト素材ではなく、印刷してすぐ配れる・掲示できる形に仕上げた資料です。資料づくりの時間をそのまま減らせます。",
    },
    {
        title: "体操・口腔・転倒予防を1パックに",
        description:
            "デイサービスで毎日使う3つのテーマを、ひとまとめにしました。バラバラに探さなくても、必要な資料がそろいます。",
    },
    {
        title: "施設内で安心して共有できる",
        description:
            "施設内での印刷・配布・掲示・職員共有ができるライセンス付き。介護職の方にも伝わる言葉でまとめています。",
    },
];

const CATEGORIES: { no: string; title: string; items: string[] }[] = [
    {
        no: "01",
        title: "集団体操資料",
        items: [
            "座ってできる集団体操の進行プリント",
            "立ってできるバランス体操メニュー",
            "準備体操・整理体操（ウォームアップ・クールダウン）",
            "レクと組み合わせやすい季節の体操ネタ",
        ],
    },
    {
        no: "02",
        title: "口腔体操・嚥下体操資料",
        items: [
            "パタカラ体操の手順イラスト",
            "舌の体操・頬の体操",
            "唾液腺マッサージの図解",
            "食事前の深呼吸・発声・嚥下体操",
        ],
    },
    {
        no: "03",
        title: "転倒予防資料",
        items: [
            "椅子に座ったままできる下肢の筋力アップ運動",
            "バランス運動・立ち上がり動作の練習",
            "歩く前のウォームアップ運動",
            "転倒予防の声かけ・注意ポイント",
        ],
    },
    {
        no: "04",
        title: "フレイル予防・生活不活発予防資料",
        items: [
            "活動量を保つための運動メニュー",
            "生活の中でできる「ながら運動」",
            "フレイルのサインに気づくチェック項目",
            "動かない時間を減らす工夫の説明",
        ],
    },
    {
        no: "05",
        title: "記録表・チェック表",
        items: [
            "体操の実施記録表（日付・参加者）",
            "参加チェック表",
            "口腔体操チェックシート",
            "転倒予防チェックリスト",
        ],
    },
    {
        no: "06",
        title: "掲示物・ポスター",
        items: [
            "体操のポイントを貼り出す掲示物",
            "転倒予防の注意ポスター",
            "口腔体操の手順ポスター",
            "季節の体操を呼びかける掲示",
        ],
    },
    {
        no: "07",
        title: "職員向け説明メモ",
        items: [
            "各体操の目的・効果のかんたん解説",
            "利用者さんへの声かけ例",
            "安全に進めるための注意点",
            "リハ職がいない場面でも進められる進行メモ",
        ],
    },
];

const USE_SCENES = [
    "毎日の体操時間",
    "機能訓練の時間",
    "口腔ケア前の口腔体操",
    "送迎待ち・空き時間",
    "利用者・家族への説明",
    "新人・パート職員の教育",
    "施設内の掲示物",
];

const LICENSE_OK = [
    "施設内での印刷・配布",
    "施設内での掲示",
    "職員間での共有",
    "利用者さん・ご家族へ印刷して渡す",
];

const LICENSE_NG = [
    "再販売・販売を目的とした配布",
    "資料・素材を単体で取り出しての二次配布",
    "契約した施設の外への譲渡・共有",
    "データそのものをWeb上に再アップロードする行為",
];

// 免責文（指定文をそのまま使用）
const DISCLAIMER =
    "本資料は、医療行為や個別のリハビリ処方を代替するものではありません。利用者の状態、疾患、疼痛、バイタルサイン、転倒リスク等を確認したうえで、専門職または施設職員の判断により安全に配慮してご使用ください。";

// 日本語本文用：単語が途中で切れにくくする（self-training-materials と同じ設定）
const JP_TEXT = "break-keep [line-break:strict] [overflow-wrap:break-word] text-pretty";

const HIRA_KATA_KANJI = "[぀-ゟ゠-ヿ一-鿿]";
function jp(text: string): string {
    return text
        .replace(/([、。])/g, "$1​")
        .replace(
            new RegExp(`(から|まで|より|を|へ|も|が|は)(?=${HIRA_KATA_KANJI})`, "g"),
            "$1​"
        );
}

function SectionHeading({ kicker, title }: { kicker?: string; title: string }) {
    return (
        <div className="mb-8 sm:mb-10 text-center">
            {kicker && (
                <p className="mb-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold tracking-widest text-blue-600">
                    {kicker}
                </p>
            )}
            <h2 className={`text-2xl sm:text-3xl font-black leading-snug text-slate-900 ${JP_TEXT}`}>
                {title}
            </h2>
        </div>
    );
}

function PurchaseArea() {
    if (checkoutReady) {
        return (
            <div className="mx-auto max-w-md">
                <CheckoutButton
                    productId={PRODUCT_ID}
                    productName={PRODUCT_NAME}
                    price={PRICE}
                    label="このパックを購入する"
                />
                <p className={`mt-3 text-center text-xs text-slate-500 leading-relaxed ${JP_TEXT}`}>
                    {jp("購入後すぐにダウンロードページから資料一式を受け取れます。")}
                </p>
            </div>
        );
    }
    return (
        <div className="mx-auto max-w-md">
            <Link
                href={LINE_HREF}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-7 py-4 text-base font-black text-white shadow-md transition-colors hover:bg-slate-800"
            >
                LINEで販売開始を受け取る
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6 21 12m0 0-7.5 6M21 12H3" />
                </svg>
            </Link>
            <p className={`mt-3 text-center text-xs text-slate-500 leading-relaxed ${JP_TEXT}`}>
                {jp("現在は準備中です。販売開始は、LINEで先行してお知らせします。登録は無料です。")}
            </p>
        </div>
    );
}

export default function DayServiceExercisePackPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
            <Header />
            <main className="flex-1">
                {/* ① ファーストビュー */}
                <section className="relative bg-gradient-to-b from-blue-50 via-white to-white pt-12 pb-16 sm:pt-16 sm:pb-20">
                    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center space-y-6">
                            <div className="flex flex-wrap items-center justify-center gap-2">
                                <p className="inline-block rounded-full bg-white border border-blue-200 px-4 py-1.5 text-xs sm:text-sm font-bold tracking-widest text-blue-700 shadow-sm">
                                    施設・事業所向け 資料パック
                                </p>
                                {!checkoutReady && (
                                    <p className="inline-block rounded-full bg-amber-100 border border-amber-200 px-4 py-1.5 text-xs sm:text-sm font-black tracking-widest text-amber-700 shadow-sm">
                                        近日公開
                                    </p>
                                )}
                            </div>
                            <h1 className={`text-2xl sm:text-4xl font-black leading-snug tracking-tight text-slate-900 ${JP_TEXT}`}>
                                {jp("デイサービスの体操・口腔体操・転倒予防の資料を、")}
                                <br className="hidden sm:block" />
                                {jp("1つのパックにまとめました")}
                            </h1>
                            <p className={`mx-auto max-w-2xl text-sm sm:text-base font-medium leading-relaxed text-slate-600 ${JP_TEXT}`}>
                                {jp("デイサービス・通所介護で毎日使う、集団体操・口腔体操・嚥下体操・転倒予防の資料をまとめた施設向けパックです。施設内で印刷・配布・掲示・職員共有ができるライセンス付きで、介護職の方にも伝わる言葉でまとめます。")}
                            </p>

                            <div className="flex flex-wrap justify-center gap-2 pt-2">
                                {HERO_BADGES.map((badge) => (
                                    <span
                                        key={badge}
                                        className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs sm:text-sm font-bold text-blue-700 shadow-sm whitespace-nowrap"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3.5 w-3.5 text-blue-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                        {badge}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2 max-w-md sm:max-w-none mx-auto">
                                <a
                                    href="#price"
                                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-base font-black text-white shadow-lg transition-colors hover:bg-blue-500"
                                >
                                    {checkoutReady ? "価格を見る" : "販売開始の案内を受け取る"}
                                </a>
                                <a
                                    href="#contents"
                                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border-2 border-blue-200 bg-white px-8 py-4 text-base font-bold text-blue-700 transition-all hover:border-blue-400 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
                                >
                                    収録内容を見る
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ② 問題提起 */}
                <section className="bg-slate-50 py-14 sm:py-20">
                    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading title="こんな場面で、困っていませんか？" />
                        <ul className="mx-auto grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                            {PAIN_POINTS.map((point) => (
                                <li
                                    key={point}
                                    className={`flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm leading-relaxed text-slate-700 shadow-sm ${JP_TEXT}`}
                                >
                                    <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3.5 w-3.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.008v.008H12v-.008Zm9 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    </span>
                                    <span>{jp(point)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* ③ 商品の特徴（3つ） */}
                <section className="bg-white py-14 sm:py-20">
                    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading kicker="このパックの特徴" title="資料探しの時間を、現場の時間に" />
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                            {FEATURES.map((feature, idx) => (
                                <article
                                    key={feature.title}
                                    className="flex flex-col rounded-3xl border border-blue-100 bg-blue-50/40 p-6 shadow-sm"
                                >
                                    <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-base font-black text-white">
                                        {idx + 1}
                                    </span>
                                    <h3 className={`mb-2 text-lg font-black leading-snug text-slate-900 ${JP_TEXT}`}>
                                        {jp(feature.title)}
                                    </h3>
                                    <p className={`text-sm leading-relaxed text-slate-600 ${JP_TEXT}`}>
                                        {jp(feature.description)}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ④ 収録内容 */}
                <section id="contents" className="bg-slate-50 py-14 sm:py-20 scroll-mt-24">
                    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading kicker="収録内容" title="デイサービスで使う資料を7カテゴリで" />
                        <div className="mx-auto mb-8 max-w-2xl rounded-2xl border border-blue-100 bg-blue-50/60 px-5 py-4 text-center">
                            <p className={`text-xs sm:text-sm text-slate-600 leading-relaxed ${JP_TEXT}`}>
                                {jp("下記は収録を予定している内容です。最終的な構成は、販売開始時にあらためてご案内します。")}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {CATEGORIES.map((cat) => (
                                <article
                                    key={cat.no}
                                    className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
                                >
                                    <div className="mb-3 flex items-center gap-3">
                                        <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-black text-blue-600">
                                            {cat.no}
                                        </span>
                                        <h3 className={`text-base font-black text-slate-900 ${JP_TEXT}`}>
                                            {cat.title}
                                        </h3>
                                    </div>
                                    <ul className="space-y-1.5">
                                        {cat.items.map((item) => (
                                            <li
                                                key={item}
                                                className={`flex items-start gap-2 text-sm leading-relaxed text-slate-600 ${JP_TEXT}`}
                                            >
                                                <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-400" />
                                                <span>{jp(item)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ⑤ 利用シーン */}
                <section className="bg-white py-14 sm:py-20">
                    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading kicker="利用シーン" title="こんな場面で使えます" />
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                            {USE_SCENES.map((scene) => (
                                <span
                                    key={scene}
                                    className="rounded-full border border-blue-200 bg-blue-50/50 px-4 py-2 text-xs sm:text-sm font-bold text-blue-700 shadow-sm whitespace-nowrap"
                                >
                                    {scene}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ⑥ 施設内利用ライセンス */}
                <section className="bg-slate-50 py-14 sm:py-20">
                    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading kicker="ライセンス" title="施設内利用ライセンスについて" />
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {/* OK */}
                            <div className="rounded-2xl border border-blue-200 bg-blue-50/60 px-5 py-6 sm:px-7 sm:py-7">
                                <div className="mb-4 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5 text-blue-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <h3 className={`text-base sm:text-lg font-black text-blue-900 ${JP_TEXT}`}>
                                        できること
                                    </h3>
                                </div>
                                <ul className="space-y-2.5">
                                    {LICENSE_OK.map((line) => (
                                        <li key={line} className={`flex items-start gap-2 text-sm leading-relaxed text-blue-900 ${JP_TEXT}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>
                                            <span>{jp(line)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* NG */}
                            <div className="rounded-2xl border border-slate-300 bg-white px-5 py-6 sm:px-7 sm:py-7">
                                <div className="mb-4 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5 text-slate-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <h3 className={`text-base sm:text-lg font-black text-slate-700 ${JP_TEXT}`}>
                                        禁止事項
                                    </h3>
                                </div>
                                <ul className="space-y-2.5">
                                    {LICENSE_NG.map((line) => (
                                        <li key={line} className={`flex items-start gap-2 text-sm leading-relaxed text-slate-600 ${JP_TEXT}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                            <span>{jp(line)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <p className={`mt-5 text-center text-xs text-slate-500 leading-relaxed ${JP_TEXT}`}>
                            {jp("ライセンスは、購入した事業所の中でのご利用を対象としています。")}
                        </p>
                    </div>
                </section>

                {/* ⑦ 価格 */}
                <section id="price" className="bg-white py-14 sm:py-20 scroll-mt-24">
                    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading kicker="価格" title={checkoutReady ? "価格" : "価格（予定）"} />

                        <div className="rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-blue-50/60 to-white px-6 py-8 sm:px-10 sm:py-10 shadow-sm">
                            <div className="text-center">
                                <p className="text-xs font-black tracking-widest text-blue-600 mb-1">施設内利用ライセンス付き・買い切り</p>
                                <p className="flex items-baseline justify-center gap-1">
                                    <span className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900">
                                        14,800
                                    </span>
                                    <span className="text-lg font-black text-slate-700">円</span>
                                </p>
                                {!checkoutReady && (
                                    <p className={`mt-2 text-sm text-slate-500 font-medium ${JP_TEXT}`}>
                                        {jp("価格は予定です。最終的な価格と販売開始は、あらためてご案内します。")}
                                    </p>
                                )}
                            </div>

                            <div className="mt-7">
                                <PurchaseArea />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ⑧ 免責・注意事項 */}
                <section className="bg-slate-50 py-14 sm:py-20">
                    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
                        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-6 sm:px-7 sm:py-8">
                            <div className="mb-3 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5 text-amber-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                </svg>
                                <h2 className={`text-lg sm:text-xl font-black text-amber-900 ${JP_TEXT}`}>
                                    ご利用前にご確認ください
                                </h2>
                            </div>
                            <p className={`text-sm sm:text-base leading-relaxed text-amber-900 ${JP_TEXT}`}>
                                {jp(DISCLAIMER)}
                            </p>
                        </div>
                    </div>
                </section>

                {/* LINE先行案内 */}
                <section className="bg-white py-14 sm:py-20">
                    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-6 sm:mb-8">
                            <p className="mb-3 inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-bold tracking-widest text-green-700">
                                LINEでお知らせ
                            </p>
                            <h2 className={`text-2xl sm:text-3xl font-black leading-snug text-slate-900 ${JP_TEXT}`}>
                                {checkoutReady ? "無料の体操資料もLINEで配布中です" : "LINE登録で、販売開始のお知らせを受け取れます"}
                            </h2>
                            <p className={`mt-4 mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600 ${JP_TEXT}`}>
                                {jp("デイサービスで使える無料の体操資料や、自主トレ継続に役立つ補助シートも配布しています。施設向けパックの新着情報も、LINEでお知らせします。")}
                            </p>
                        </div>
                        <LineBanner />
                    </div>
                </section>

                {/* 回遊（個人向け・プロンプト工房） */}
                <section className="bg-slate-50 py-12 sm:py-16 border-t border-slate-100">
                    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
                        <p className="mb-5 text-center text-xs font-black tracking-widest text-slate-500">
                            今すぐ使えるものをお探しの方へ
                        </p>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Link
                                href="/products"
                                className="group flex flex-col rounded-3xl border border-blue-100 bg-white px-6 py-7 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
                            >
                                <p className="mb-1 text-[11px] font-bold tracking-widest text-blue-700">個人向け・980円〜</p>
                                <h3 className={`mb-2 text-lg font-black leading-snug text-slate-900 ${JP_TEXT}`}>
                                    疾患別・姿勢別の資料セット
                                </h3>
                                <p className={`text-sm leading-relaxed text-slate-600 ${JP_TEXT}`}>
                                    {jp("退院前指導や訪問リハで、患者さんにそのまま渡せる自主トレ資料です。今すぐダウンロードして使えます。")}
                                </p>
                                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 group-hover:gap-2.5 transition-all">
                                    資料セットを見る
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3.5 w-3.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6 21 12m0 0-7.5 6M21 12H3" />
                                    </svg>
                                </span>
                            </Link>

                            <Link
                                href="/products/slide-prompt-generator"
                                className="group flex flex-col rounded-3xl border border-blue-100 bg-white px-6 py-7 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
                            >
                                <p className="mb-1 text-[11px] font-bold tracking-widest text-blue-700">AIで自作したい方へ</p>
                                <h3 className={`mb-2 text-lg font-black leading-snug text-slate-900 ${JP_TEXT}`}>
                                    伝わるプロンプト工房
                                </h3>
                                <p className={`text-sm leading-relaxed text-slate-600 ${JP_TEXT}`}>
                                    {jp("用途を選ぶだけで、ChatGPTにそのまま貼れる資料づくりのプロンプトが完成します。勉強会や利用者説明の資料に。")}
                                </p>
                                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 group-hover:gap-2.5 transition-all">
                                    プロンプト工房を見る
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3.5 w-3.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6 21 12m0 0-7.5 6M21 12H3" />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
