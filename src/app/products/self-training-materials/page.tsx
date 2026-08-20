import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Testimonials } from "@/components/Testimonials";
import { LineBanner } from "@/components/LineBanner";
import { CheckoutButton } from "@/components/CheckoutButton";
import { ProductSelectLink } from "@/components/ProductSelectLink";
import { WatermarkPreviewSection, type PreviewGroup } from "@/components/WatermarkPreviewSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "退院前・訪問リハでそのまま使える 疾患別自主トレPowerPoint 9本セット｜自主トレ素材庫",
    description:
        "脳卒中・腰痛・膝OA・圧迫骨折後・パーキンソン病など、疾患別に編集できるPowerPoint資料9本セット。980円の買い切り、印刷配布OK。退院前指導・訪問リハ・家族説明に。",
    openGraph: {
        title: "疾患別自主トレPowerPoint 9本セット｜自主トレ素材庫",
        description:
            "9 疾患の自主トレ資料（PPTX）が 980 円の買い切り。患者さんへの説明、家族説明、退院前指導に。",
        images: ["/products/self-training-materials/og.jpg"],
    },
    twitter: {
        card: "summary_large_image",
        images: ["/products/self-training-materials/og.jpg"],
    },
};

const PRODUCT_ID = "self-training-materials-vol01";
const PRODUCT_NAME = "疾患別自主トレPowerPoint9本セット";
const PRICE = 980;

const HERO_BADGES = [
    "980円・買い切り",
    "PowerPoint形式",
    "編集OK",
    "印刷配布OK",
    "疾患別9本セット",
];

const PAIN_POINTS = [
    "退院前指導のたびに自主トレ資料を作っている",
    "口頭説明だけでは、自宅で運動内容を忘れられやすい",
    "家族にも運動内容や注意点を共有したい",
    "無料イラストを貼って資料を作る時間がない",
    "疾患ごとに説明内容を整理するのが大変",
    "患者さんに渡せる見た目の資料を用意したい",
];

const COMPARISON_ROWS: {
    label: string;
    free: string;
    paid: string;
}[] = [
    { label: "内容", free: "イラスト単体", paid: "疾患別に構成済み" },
    { label: "使い方", free: "自分で資料に貼る", paid: "開いて編集・印刷" },
    { label: "説明文", free: "自分で作成", paid: "説明文入り" },
    { label: "手順・注意点", free: "自分で調整", paid: "手順・回数・注意点つき" },
    { label: "資料作成時間", free: "資料作成が必要", paid: "ゼロから作らなくていい" },
    { label: "向いている人", free: "素材だけ欲しい人向け", paid: "患者説明まで時短したい人向け" },
];

const CONTENTS: { title: string; description: string }[] = [
    {
        title: "脳卒中 上肢",
        description: "肩・肘・手指のリーチ動作や巧緻動作を、自宅で続けやすい流れにまとめています。",
    },
    {
        title: "脳卒中 下肢",
        description: "立位バランスや歩行に必要な下肢筋活動を促す運動を、座位中心で構成。",
    },
    {
        title: "腰痛",
        description: "腰部負担に配慮し、体幹支持・股関節モビリティを中心にやさしい運動から構成。",
    },
    {
        title: "膝OA・TKA",
        description: "大腿四頭筋セッティング・膝可動域・荷重練習など、術前術後で使いやすいメニュー。",
    },
    {
        title: "圧迫骨折後",
        description: "前屈動作を避けつつ、背筋・体幹支持・呼吸を意識した自主トレ内容。",
    },
    {
        title: "パーキンソン病",
        description: "大きな動き・リズム運動を中心に、姿勢保持や歩行につながる運動を解説。",
    },
    {
        title: "五十肩",
        description: "肩関節周囲炎の時期に合わせ、痛みに配慮した可動域運動と日常動作のコツを掲載。",
    },
    {
        title: "人工股関節術後",
        description: "脱臼予防に配慮した姿勢・動作と、股関節周囲筋の基礎トレーニングをセットに。",
    },
    {
        title: "大腿骨骨折術後",
        description: "免荷期から荷重期まで使いやすい下肢運動と、立ち上がり・歩行への流れを解説。",
    },
];

// 透かし入りプレビュー（全ページ掲載）。
// previews/{slug}-01..12.webp を各疾患PDFの全ページからレンダリングして掲載。
// 実在する画像だけが自動的に表示される（存在チェックで404は出ない）。
const PREVIEW_DIR = "/preview/self-training-materials/previews";
const PREVIEW_PAGES = 12;

const PREVIEW_CATEGORIES: { slug: string; title: string; caption: string }[] = [
    { slug: "stroke-upper", title: "脳卒中 上肢", caption: "肩・肘・手指の運動メニュー" },
    { slug: "stroke-lower", title: "脳卒中 下肢", caption: "立位・歩行につながる下肢運動" },
    { slug: "low-back-pain", title: "腰痛", caption: "体幹支持・股関節を中心にした運動" },
    { slug: "knee-oa-tka", title: "膝OA・TKA", caption: "大腿四頭筋・膝可動域・荷重練習" },
    { slug: "compression-fracture", title: "圧迫骨折後", caption: "前屈を避けた背筋・体幹の運動" },
    { slug: "parkinsons", title: "パーキンソン病", caption: "大きな動き・リズム運動" },
    { slug: "frozen-shoulder", title: "五十肩", caption: "時期に合わせた可動域運動" },
    { slug: "hip-replacement", title: "人工股関節術後", caption: "脱臼予防に配慮した運動" },
    { slug: "femur-fracture", title: "大腿骨骨折術後", caption: "免荷期から荷重期までの下肢運動" },
];

const PREVIEW_GROUPS: PreviewGroup[] = PREVIEW_CATEGORIES.map((category) => ({
    title: category.title,
    caption: category.caption,
    items: Array.from({ length: PREVIEW_PAGES }, (_, i) => ({
        title: `${i + 1}ページ目`,
        src: `${PREVIEW_DIR}/${category.slug}-${String(i + 1).padStart(2, "0")}.webp`,
    })),
}));

const USE_STEPS = [
    "対象疾患のPowerPointを開く",
    "患者さんに合わせて回数・注意点を編集する",
    "印刷して説明・配布する",
];

const USE_SCENES = ["退院前指導", "訪問リハ", "家族説明"];

const RECOMMENDED = [
    "退院前指導の資料を毎回ゼロから作っている",
    "訪問リハで患者さんに渡せる資料が欲しい",
    "口頭説明だけでは、自主トレが定着しにくいと感じている",
    "家族にも運動内容を共有したい",
    "自施設用に編集できる、PowerPoint資料が欲しい",
    "無料イラストを貼る時間すら惜しい",
];

const FAQS: { q: string; a: string }[] = [
    {
        q: "購入後、どこからダウンロードできますか？",
        a: "決済完了後に表示されるサンクスページから、ダウンロードしていただけます。万一ダウンロードできない場合は、購入時のメールアドレスを添えてお問い合わせください。",
    },
    {
        q: "PowerPointがないと使えませんか？",
        a: "PowerPointでの編集を想定しています。環境によっては、GoogleスライドやKeynoteで開ける場合もあります。ただし表示崩れが起こる可能性がある点はご了承ください。",
    },
    {
        q: "内容を編集してもいいですか？",
        a: "はい。患者さんの状態や施設の方針に合わせて、文言・回数・注意点などを編集してご使用いただけます。",
    },
    {
        q: "患者さんやご家族に印刷して渡してもいいですか？",
        a: "はい。臨床・介護現場での説明資料として、印刷配布していただけます。再配布や販売は禁止しています。",
    },
    {
        q: "医療監修済みですか？",
        a: "作業療法士としての臨床経験をもとに作成していますが、個別の医療判断を代替するものではありません。対象者の状態に応じて専門職の判断でご使用ください。",
    },
    {
        q: "返金はできますか？",
        a: "デジタル商品の性質上、原則として購入後の返金はお受けできません。ただし、ファイルが開けないなど明らかな不具合がある場合はお問い合わせください。",
    },
    {
        q: "領収書は発行できますか？",
        a: "Stripe決済時のメールに添付される明細・領収書をご確認ください。別途必要な場合はお問い合わせください。",
    },
];

const HERO_CHECKOUT_CLASS =
    "flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-base font-black text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-600/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const SECTION_CHECKOUT_CLASS =
    "flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-4 text-base font-black text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

// 日本語本文用：単語が途中で切れにくくする
// word-break:keep-all で日本語の単語が途中で切れにくくする。
// 句読点で改行されるのが基本。line-break:strict で「、」「。」「？」等の行頭禁則を守る。
// 改行点が無く幅も超えた場合のみ、最終手段として break-word が効く。
const JP_TEXT = "break-keep [line-break:strict] [overflow-wrap:break-word] text-pretty";

/**
 * 日本語テキストに改行可能位置（U+200B = ゼロ幅スペース）を挿入する。
 * - 「、」「。」の直後
 * - 助詞（は・が・を・へ・も・から・まで・より）の直後で、次が日本語文字の場合
 * 「に」「で」「と」「の」は動詞や複合語の一部にもなるため対象外。
 * `word-break:keep-all` と組み合わせて使うことで、長い句が句節境界で自然に折り返される。
 */
function jp(text: string): string {
    const HIRA_KATA_KANJI = "[぀-ゟ゠-ヿ一-鿿]";
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

export default function SelfTrainingMaterialsPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
            <Header />
            <main className="flex-1">
                {/* A. ファーストビュー */}
                <section className="relative bg-gradient-to-b from-blue-50 via-white to-white pt-12 pb-16 sm:pt-16 sm:pb-20">
                    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center space-y-6">
                            <p className="inline-block rounded-full bg-white border border-blue-200 px-4 py-1.5 text-xs sm:text-sm font-bold tracking-widest text-blue-700 shadow-sm">
                                疾患別 自主トレ PowerPoint 9本セット
                            </p>
                            <h1 className={`text-2xl sm:text-4xl font-black leading-snug tracking-tight text-slate-900 ${JP_TEXT}`}>
                                {jp("退院前・訪問リハの自主トレ説明、")}
                                <br className="hidden sm:block" />
                                {jp("毎回ゼロから作っていませんか？")}
                            </h1>
                            <p className={`mx-auto max-w-2xl text-sm sm:text-base font-medium leading-relaxed text-slate-600 ${JP_TEXT}`}>
                                {jp("疾患別に使えるPowerPoint資料9本を、印刷・編集できる形でまとめました。患者さんやご家族が、自宅で見返しやすい自主トレ説明資料です。")}
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
                                <div className="w-full sm:w-auto">
                                    <CheckoutButton
                                        productId={PRODUCT_ID}
                                        productName={PRODUCT_NAME}
                                        price={PRICE}
                                        label="980円で購入する"
                                        className={HERO_CHECKOUT_CLASS}
                                    />
                                </div>
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
                            <p className={`text-xs text-slate-500 ${JP_TEXT}`}>
                                サイト内のStripeで決済 / 決済完了後にダウンロード案内が表示されます
                            </p>
                        </div>
                    </div>
                </section>

                {/* B. 悩み訴求 */}
                <section className="bg-slate-50 py-14 sm:py-20">
                    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading title="こんな資料作成、地味に時間がかかりませんか？" />
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

                {/* C. 解決策 */}
                <section className="bg-white py-14 sm:py-20">
                    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
                        <p className="mb-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold tracking-widest text-blue-600">
                            解決策
                        </p>
                        <h2 className={`text-2xl sm:text-3xl font-black leading-snug text-slate-900 ${JP_TEXT}`}>
                            このセットは、イラスト素材ではなく
                            <wbr />
                            <span className="text-blue-600">&ldquo;説明資料&rdquo;</span>
                            です
                        </h2>
                        <p className={`mt-6 text-sm sm:text-base leading-relaxed text-slate-600 ${JP_TEXT}`}>
                            {jp("無料素材は、自分で資料を作りたい方向けのイラスト素材です。一方、このPowerPoint資料セットは、説明の流れ・運動メニュー・注意点までまとめた完成資料です。必要な部分だけ編集して、退院前指導・訪問リハ・家族説明に使えます。")}
                        </p>
                    </div>
                </section>

                {/* D. 無料素材との違い */}
                <section className="bg-slate-50 py-14 sm:py-20">
                    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading kicker="無料素材との違い" title="無料素材とPowerPoint資料、何が違うの？" />

                        {/* スマホ: カード形式 */}
                        <div className="grid gap-4 md:hidden">
                            {COMPARISON_ROWS.map((row) => (
                                <div
                                    key={row.label}
                                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                                >
                                    <p className="mb-3 text-xs font-black tracking-widest text-slate-500">
                                        {row.label}
                                    </p>
                                    <div className="grid grid-cols-1 gap-3">
                                        <div className="rounded-xl bg-slate-50 p-3">
                                            <p className="mb-1 text-[11px] font-bold tracking-wider text-slate-500">
                                                無料素材
                                            </p>
                                            <p className={`text-sm font-medium text-slate-700 ${JP_TEXT}`}>
                                                {row.free}
                                            </p>
                                        </div>
                                        <div className="rounded-xl bg-blue-50 p-3">
                                            <p className="mb-1 text-[11px] font-bold tracking-wider text-blue-600">
                                                有料PowerPoint資料
                                            </p>
                                            <p className={`text-sm font-bold text-slate-800 ${JP_TEXT}`}>
                                                {row.paid}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* PC: テーブル形式 */}
                        <div className="hidden md:block">
                            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                                <table className="w-full min-w-[640px] text-sm">
                                    <thead>
                                        <tr className="bg-slate-50 text-left">
                                            <th className="w-1/4 px-5 py-4 font-black tracking-widest text-xs text-slate-500">項目</th>
                                            <th className="w-1/3 px-5 py-4 font-bold text-slate-700">無料素材</th>
                                            <th className="w-1/3 px-5 py-4 font-black text-blue-700">有料PowerPoint資料</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {COMPARISON_ROWS.map((row) => (
                                            <tr key={row.label} className="border-t border-slate-100 align-top">
                                                <td className="px-5 py-4 font-bold text-slate-600">{row.label}</td>
                                                <td className={`px-5 py-4 text-slate-600 ${JP_TEXT}`}>{row.free}</td>
                                                <td className={`px-5 py-4 font-bold text-slate-800 bg-blue-50/40 ${JP_TEXT}`}>
                                                    {row.paid}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                {/* E. 商品内容 */}
                <section id="contents" className="bg-white py-14 sm:py-20 scroll-mt-24">
                    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading kicker="収録内容" title="9テーマ・疾患別のPowerPoint資料" />
                        <div className="mx-auto mb-8 max-w-2xl rounded-2xl border border-blue-100 bg-blue-50/60 px-5 py-4 text-center">
                            <p className={`text-sm sm:text-base font-bold text-blue-800 leading-relaxed ${JP_TEXT}`}>
                                9枚のスライドではありません。
                                <br className="sm:hidden" />
                                <span className="text-blue-600">9本のPowerPoint資料セット</span>です。
                            </p>
                            <p className={`mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed ${JP_TEXT}`}>
                                {jp("1本の資料の中に、表紙・説明・運動メニュー・手順・回数の目安・注意点・継続のコツまで入っています。")}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {CONTENTS.map((item, idx) => (
                                <article
                                    key={item.title}
                                    className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
                                >
                                    <div className="mb-3 flex items-center gap-3">
                                        <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-black text-blue-600">
                                            {String(idx + 1).padStart(2, "0")}
                                        </span>
                                        <h3 className={`text-base font-black text-slate-900 ${JP_TEXT}`}>
                                            {item.title}
                                        </h3>
                                    </div>
                                    <p className={`text-sm leading-relaxed text-slate-600 ${JP_TEXT}`}>
                                        {jp(item.description)}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* E2. 透かし入りプレビュー（全ページ掲載） */}
                <WatermarkPreviewSection
                    id="preview"
                    kicker="SAMPLE"
                    heading="9疾患の全ページを透かし入りで公開しています"
                    intro="購入前に中身をしっかり確認できるよう、9疾患・全108ページを掲載しています。カードにカーソルを合わせるとページが流れ、クリックすると拡大表示で左右の矢印でも送れます。"
                    subcopy="実際のPowerPoint資料の全ページを、透かし入りで掲載しています。購入後のPowerPoint・PDFファイルには透かしは入りません。"
                    groups={PREVIEW_GROUPS}
                    background="slate"
                    columns={3}
                    display="carousel"
                />

                {/* F. 使い方 */}
                <section className="bg-slate-50 py-14 sm:py-20">
                    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading kicker="使い方" title="使い方はかんたんです" />

                        <ol className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
                            {USE_STEPS.map((step, idx) => (
                                <li
                                    key={step}
                                    className="relative rounded-2xl border border-slate-200 bg-white px-5 py-6 text-center shadow-sm"
                                >
                                    <span className="absolute -top-3 left-1/2 inline-flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white shadow">
                                        {idx + 1}
                                    </span>
                                    <p className={`pt-2 text-sm sm:text-base font-bold text-slate-800 leading-relaxed ${JP_TEXT}`}>
                                        {jp(step)}
                                    </p>
                                </li>
                            ))}
                        </ol>

                        <div className="mt-10">
                            <p className="text-center text-xs font-black tracking-widest text-slate-500 mb-3">
                                こんな場面で使えます
                            </p>
                            <div className="flex flex-wrap justify-center gap-2">
                                {USE_SCENES.map((scene) => (
                                    <span
                                        key={scene}
                                        className="rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs sm:text-sm font-bold text-blue-700 shadow-sm whitespace-nowrap"
                                    >
                                        {scene}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* G. おすすめの人 */}
                <section className="bg-white py-14 sm:py-20">
                    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading title="こんなリハ職におすすめです" />
                        <ul className="mx-auto grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
                            {RECOMMENDED.map((item) => (
                                <li
                                    key={item}
                                    className={`flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm leading-relaxed text-slate-700 shadow-sm ${JP_TEXT}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                    <span>{jp(item)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* H. 購入前の注意 */}
                <section className="bg-slate-50 py-14 sm:py-20">
                    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
                        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-6 sm:px-7 sm:py-8">
                            <div className="mb-3 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5 text-amber-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                </svg>
                                <h2 className={`text-lg sm:text-xl font-black text-amber-900 ${JP_TEXT}`}>
                                    購入前にご確認ください
                                </h2>
                            </div>
                            <p className={`text-sm sm:text-base leading-relaxed text-amber-900 ${JP_TEXT}`}>
                                {jp("この資料は、すべての患者さんにそのまま使える、医療プロトコルではありません。")}
                            </p>
                            <p className={`mt-3 text-sm sm:text-base leading-relaxed text-amber-900 ${JP_TEXT}`}>
                                {jp("対象者の状態、医師の指示、疼痛、禁忌、術後時期に合わせて、専門職の判断で編集してご使用ください。")}
                            </p>
                        </div>
                    </div>
                </section>

                {/* I. 価格 */}
                <section className="bg-white py-14 sm:py-20">
                    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading kicker="価格" title="価格" />

                        <div className="rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-blue-50/60 to-white px-6 py-8 sm:px-10 sm:py-10 shadow-sm">
                            <div className="text-center">
                                <p className="text-xs font-black tracking-widest text-blue-600 mb-1">買い切り</p>
                                <p className="flex items-baseline justify-center gap-1">
                                    <span className="text-5xl sm:text-6xl font-black tracking-tight text-slate-900">
                                        980
                                    </span>
                                    <span className="text-xl font-black text-slate-700">円</span>
                                </p>
                                <p className="mt-2 text-sm text-slate-500 font-medium">
                                    9本セット / 1本あたり 約109円
                                </p>
                            </div>

                            <ul className="mx-auto mt-6 grid max-w-md grid-cols-1 gap-2 sm:grid-cols-2">
                                {["PowerPoint形式", "編集OK", "印刷配布OK", "買い切り（追加料金なし）"].map((item) => (
                                    <li
                                        key={item}
                                        className={`flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-3 py-2 text-xs sm:text-sm font-bold text-slate-700 ${JP_TEXT}`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4 flex-shrink-0 text-blue-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-7">
                                <CheckoutButton
                                    productId={PRODUCT_ID}
                                    productName={PRODUCT_NAME}
                                    price={PRICE}
                                    label="980円で購入する"
                                    className={SECTION_CHECKOUT_CLASS}
                                />
                                <p className={`mt-3 text-center text-xs text-slate-500 leading-relaxed ${JP_TEXT}`}>
                                    Stripeの決済画面に移動します。
                                    決済完了後、ダウンロードページへ自動で戻ります。
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* J. 購入後の流れ */}
                <section className="bg-slate-50 py-14 sm:py-20">
                    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading kicker="購入後の流れ" title="購入後の流れ" />
                        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            {[
                                "サイト内でStripe決済",
                                "決済完了後、ダウンロードページへ移動",
                                "PowerPoint資料をダウンロードして使用",
                            ].map((step, idx) => (
                                <li
                                    key={step}
                                    className="relative rounded-2xl border border-slate-200 bg-white px-5 py-6 text-center shadow-sm"
                                >
                                    <span className="absolute -top-3 left-1/2 inline-flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white shadow">
                                        {idx + 1}
                                    </span>
                                    <p className={`pt-2 text-sm sm:text-base font-bold text-slate-800 leading-relaxed ${JP_TEXT}`}>
                                        {jp(step)}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* 掲載許諾つきの声が0件のあいだは何も表示しない */}
                <Testimonials product="condition" />

                {/* K. FAQ */}
                <section className="bg-white py-14 sm:py-20">
                    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading kicker="FAQ" title="よくあるご質問" />
                        <div className="space-y-3">
                            {FAQS.map((faq, idx) => (
                                <details
                                    key={faq.q}
                                    className="group rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition-all open:border-blue-200 open:shadow-md"
                                    open={idx === 0}
                                >
                                    <summary className={`flex cursor-pointer list-none items-start justify-between gap-3 text-sm sm:text-base font-bold text-slate-900 ${JP_TEXT}`}>
                                        <span className="flex-1">Q. {jp(faq.q)}</span>
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
                                    <p className={`mt-3 text-sm leading-relaxed text-slate-600 ${JP_TEXT}`}>
                                        {jp(faq.a)}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* L. LINE無料特典 */}
                <section className="bg-slate-50 py-14 sm:py-20">
                    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-6 sm:mb-8">
                            <p className="mb-3 inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-bold tracking-widest text-green-700">
                                購入前に雰囲気を確認したい方へ
                            </p>
                            <h2 className={`text-2xl sm:text-3xl font-black leading-snug text-slate-900 ${JP_TEXT}`}>
                                LINE登録で、サンプル資料を無料でお試し
                            </h2>
                            <p className={`mt-4 mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600 ${JP_TEXT}`}>
                                {jp("腰痛版の一部サンプルや、自主トレ継続に役立つ補助シートを無料配布しています。有料版では、9テーマすべてのPowerPoint資料を編集可能な形でご利用いただけます。")}
                            </p>
                        </div>
                        <LineBanner />
                    </div>
                </section>

                {/* M. 最終CTA */}
                <section className="bg-gradient-to-b from-white to-blue-50/60 py-16 sm:py-24">
                    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className={`text-2xl sm:text-3xl font-black leading-snug text-slate-900 ${JP_TEXT}`}>
                            退院前指導の資料作成を、
                            <br className="hidden sm:block" />
                            <span className="text-blue-600">ゼロから始めない</span>
                        </h2>
                        <p className={`mt-6 text-sm sm:text-base leading-relaxed text-slate-600 ${JP_TEXT}`}>
                            {jp("対象疾患の資料を開き、必要な部分を調整して印刷するだけ。患者さんとご家族に、自宅で見返せる自主トレ資料を渡せます。")}
                        </p>

                        <div className="mt-8 mx-auto max-w-md">
                            <CheckoutButton
                                productId={PRODUCT_ID}
                                productName={PRODUCT_NAME}
                                price={PRICE}
                                label="980円で購入する"
                                className={SECTION_CHECKOUT_CLASS}
                            />
                            <p className={`mt-3 text-xs text-slate-500 leading-relaxed ${JP_TEXT}`}>
                                Stripe決済 / 買い切り / 編集・印刷OK
                            </p>
                        </div>
                    </div>
                </section>

                {/* 姿勢別セットへの回遊導線 */}
                <section className="bg-white py-12 sm:py-16 border-t border-slate-100">
                    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
                        <div className="rounded-3xl border border-blue-100 bg-blue-50/30 px-6 py-8 sm:px-8 sm:py-10">
                            <p className="mb-2 text-[11px] font-bold tracking-widest text-blue-700">
                                もう1つの資料セット
                            </p>
                            <h2 className={`text-xl sm:text-2xl font-black leading-snug text-slate-900 mb-3 ${JP_TEXT}`}>
                                姿勢から選びたい方へ
                            </h2>
                            <p className={`text-sm sm:text-base leading-relaxed text-slate-600 mb-5 ${JP_TEXT}`}>
                                座位・立位・臥位など、対象者の「今できる姿勢」から選べる資料セットもあります。立位が不安定な方や、ベッド上中心の方への自主トレ指導に使いやすい資料です。
                            </p>
                            <ProductSelectLink
                                href="/products/home-elderly-self-training/"
                                itemName="姿勢別自主トレ指導資料セット"
                                location="products_cross_link"
                                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-blue-500 bg-white px-6 py-3 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                            >
                                姿勢別セットを見る
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3.5 w-3.5 flex-shrink-0">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6 21 12m0 0-7.5 6M21 12H3" />
                                </svg>
                            </ProductSelectLink>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
