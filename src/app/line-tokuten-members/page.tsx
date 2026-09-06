import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "LINE友だち追加特典 | 自主トレ素材庫",
    robots: { index: false, follow: false },
};

type Tokuten = {
    icon: string;
    title: string;
    description: string;
    files: { label: string; href: string }[];
    ready: boolean;
};

const tokutenList: Tokuten[] = [
    {
        icon: "📋",
        title: "自主トレを継続する理由（説明スライド）",
        description: "患者さんが「なぜ自主トレを続けるのか」を理解できるスライド資料。そのまま印刷して渡せます。",
        files: [
            { label: "PDF", href: "/line-tokuten/jishutore-reason.pdf" },
            { label: "PowerPoint", href: "/line-tokuten/jishutore-reason.pptx" },
        ],
        ready: true,
    },
    {
        icon: "✅",
        title: "自主トレチェックシート",
        description: "カレンダー式の記録表。「今日やった」を毎日チェックするだけ。続けた日が一目でわかります。",
        files: [
            { label: "PDF", href: "/line-tokuten/jishutore-checksheet.pdf" },
            { label: "PowerPoint", href: "/line-tokuten/jishutore-checksheet.pptx" },
        ],
        ready: true,
    },
    {
        icon: "🏠",
        title: "転倒予防 環境チェックリスト",
        description: "自宅の転倒リスクをチェックできるリスト。退院前の環境確認にそのまま使えます。",
        files: [
            { label: "PDF", href: "/line-tokuten/fall-prevention-checklist.pdf" },
            { label: "Word", href: "/line-tokuten/fall-prevention-checklist.docx" },
        ],
        ready: true,
    },
    {
        icon: "💊",
        title: "お薬・リハビリ記録ノート",
        description: "お薬の服用とリハビリの実施を記録するシート。ご家族とも共有しやすいフォーマットです。1週間版と1ヶ月版の2種類入り。",
        files: [
            { label: "PDF（1週間版）", href: "/line-tokuten/medicine-rehab-record-weekly.pdf" },
            { label: "PDF（1ヶ月版）", href: "/line-tokuten/medicine-rehab-record-monthly.pdf" },
            { label: "Word（1週間版）", href: "/line-tokuten/medicine-rehab-record-weekly.docx" },
            { label: "Word（1ヶ月版）", href: "/line-tokuten/medicine-rehab-record-monthly.docx" },
        ],
        ready: true,
    },
    {
        icon: "❓",
        title: "退院後の生活Q&A集",
        description: "「お風呂は入っていい？」「運動はいつから？」など、退院後あるあるの疑問に答えるQ&A集。",
        files: [
            { label: "PDF", href: "/line-tokuten/post-discharge-qa.pdf" },
            { label: "Word", href: "/line-tokuten/post-discharge-qa.docx" },
        ],
        ready: true,
    },
    {
        icon: "🦵",
        title: "腰痛 自主トレメニュー（疾患別セットのサンプル）",
        description: "買い切りの「疾患別自主トレPowerPoint 9本セット」から、腰痛編1冊（全12ページ）を無料サンプルとしてお試しいただけます。",
        files: [
            { label: "PDF（印刷用）", href: "/line-tokuten/low-back-pain-jishutore.pdf" },
            { label: "PowerPoint（編集用）", href: "/line-tokuten/low-back-pain-jishutore.pptx" },
        ],
        ready: true,
    },
];

export default function LineTokutenPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-12 flex-1 max-w-4xl">
                {/* お礼メッセージ */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#06C755' }}>
                        <svg viewBox="0 0 24 24" className="w-9 h-9" fill="white">
                            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                        </svg>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                        友だち追加ありがとうございます！
                    </h1>
                    <p className="text-slate-500 font-medium">
                        配布資料6点＋制作ツール（無料版）の計7点をご利用いただけます。<br />
                        まずは腰痛編のPowerPointと、チェックシートからお試しください。
                    </p>
                </div>

                <section aria-labelledby="start-title" className="mb-10 rounded-2xl border border-blue-200 bg-white p-5 sm:p-8 shadow-sm">
                    <p className="text-sm font-bold text-blue-700">まずは、編集して使ってみる</p>
                    <h2 id="start-title" className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 break-keep">腰痛編から、必要な1枚を。</h2>
                    <p className="mt-3 text-slate-600 leading-relaxed break-keep">疾患別9本セットの「腰痛編」1冊を、全12ページまとめて無料で試せます。</p>
                    <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_1.4fr] sm:items-center">
                        <Image src="/line-tokuten/previews/low-back-pain-jishutore.jpg" alt="腰痛編の自主トレ資料サンプル" width={600} height={848} className="max-h-72 w-full object-contain rounded-xl bg-slate-50" />
                        <div>
                            <p className="font-bold text-slate-900">文字を編集するならPowerPoint</p>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600">必要なページを選び、配布先に合わせて説明文や見出しを整えられます。</p>
                            <div className="mt-4 flex flex-col gap-3">
                                <a href="/line-tokuten/low-back-pain-jishutore.pptx" download className="rounded-xl bg-blue-700 px-5 py-3 text-center font-bold text-white hover:bg-blue-800">腰痛編をダウンロード（PowerPoint）</a>
                                <a href="/line-tokuten/low-back-pain-jishutore.pdf" download className="rounded-xl border border-slate-300 px-5 py-3 text-center font-bold text-slate-700 hover:bg-slate-50">まず内容を見る（PDF）</a>
                            </div>
                            <p className="mt-3 text-xs leading-relaxed text-slate-500">編集にはPowerPointなどの対応ソフトが必要です。ソフトやフォントによって表示が異なる場合があります。</p>
                        </div>
                    </div>
                    <div className="mt-7 border-t border-slate-200 pt-6">
                        <h3 className="font-bold text-slate-900">使い始めるまでの3ステップ</h3>
                        <ol className="mt-3 grid gap-4 sm:grid-cols-3">
                            <li className="rounded-xl bg-slate-50 p-4"><p className="font-bold text-blue-800">1. 必要なページを選ぶ</p><p className="mt-2 text-sm text-slate-600">原本を残し、コピーしたファイルで作業します。</p></li>
                            <li className="rounded-xl bg-slate-50 p-4"><p className="font-bold text-blue-800">2. 文字を編集する</p><p className="mt-2 text-sm text-slate-600">見出しや説明文を、配布先に合わせて整えます。</p></li>
                            <li className="rounded-xl bg-slate-50 p-4"><p className="font-bold text-blue-800">3. 印刷前に確認する</p><p className="mt-2 text-sm text-slate-600">プレビューで文字切れや、印刷するページを確認します。</p></li>
                        </ol>
                        <p className="mt-4 text-sm leading-relaxed text-slate-600">資料は医療行為の代わりになるものではありません。運動の選択・回数・注意点は、専門職が利用者さんの状態に合わせて判断してください。</p>
                    </div>
                </section>

                <section aria-labelledby="checksheet-title" className="mb-10 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
                    <p className="text-sm font-bold text-blue-700">資料と一緒に使う</p>
                    <h2 id="checksheet-title" className="mt-2 text-xl font-black text-slate-900">自主トレチェックシート</h2>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">自主トレを行った日を記録する、カレンダー式のシートです。配布資料とセットにして、振り返りに使えます。</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                        <a href="/line-tokuten/jishutore-checksheet.pdf" download className="rounded-xl border border-blue-200 px-4 py-3 font-bold text-blue-800 hover:bg-blue-50">チェックシート（PDF）</a>
                        <a href="/line-tokuten/jishutore-checksheet.pptx" download className="rounded-xl border border-blue-200 px-4 py-3 font-bold text-blue-800 hover:bg-blue-50">チェックシート（PowerPoint）</a>
                    </div>
                </section>

                <section aria-labelledby="other-bonuses-title">
                <h2 id="other-bonuses-title" className="mb-4 text-xl font-black text-slate-900">ほかの資料・制作ツールも使えます</h2>
                <div className="space-y-6">
                    {/* NEW：プロンプト工房（無料版） */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="text-3xl flex-shrink-0 mt-1">🛠</div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h2 className="text-lg font-black text-slate-900">伝わるプロンプト工房（無料版）</h2>
                                </div>
                                <p className="text-sm text-slate-500 font-medium mb-4">
                                    用途とテーマを選ぶだけで、ChatGPT用のスライド画像生成プロンプトが完成。家族説明や勉強会の資料づくりに。無料版はテンプレート2種・スタイル3種・3枚まで使えます。
                                </p>
                                <Link
                                    href="/line-tokuten-members/slide-prompt-generator/"
                                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-500 hover:bg-teal-400 text-white font-bold text-sm rounded-full transition-all hover:scale-105 shadow-sm"
                                >
                                    ツールを使う
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {tokutenList.filter((item) => !item.files.some((file) => file.href === "/line-tokuten/low-back-pain-jishutore.pptx" || file.href === "/line-tokuten/jishutore-checksheet.pptx")).map((item, i) => (
                        <div
                            key={i}
                            className={`bg-white rounded-2xl border p-6 shadow-sm ${
                                item.ready ? "border-slate-200" : "border-dashed border-slate-300 opacity-70"
                            }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className="text-3xl flex-shrink-0 mt-1">{item.icon}</div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h2 className="text-lg font-black text-slate-900">{item.title}</h2>
                                        {!item.ready && (
                                            <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                                                準備中
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-slate-500 font-medium mb-4">{item.description}</p>

                                    {item.ready ? (
                                        <div className="flex flex-wrap gap-2">
                                            {item.files.map((file, j) => (
                                                <a
                                                    key={j}
                                                    href={file.href}
                                                    download
                                                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-500 hover:bg-teal-400 text-white font-bold text-sm rounded-full transition-all hover:scale-105 shadow-sm"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                    </svg>
                                                    {file.label}
                                                </a>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-amber-600 font-bold">
                                            完成次第、LINEでお知らせします。
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                </section>

                <section aria-labelledby="product-title" className="mt-10 rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-8">
                    <h2 id="product-title" className="text-xl font-black text-slate-900">ほかの疾患の資料も必要な方へ</h2>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">無料サンプルは腰痛編1冊です。疾患別9本セットは、腰痛編を含む9テーマのPowerPoint資料を収録しています。必要なテーマがあるか、商品ページでご確認ください。</p>
                    <Link href="/products/self-training-materials/" className="mt-4 inline-flex rounded-xl bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800">疾患別9本セットの内容・価格を見る</Link>
                    <p className="mt-3 text-xs text-slate-500">無料特典の利用に、商品の購入は必要ありません。</p>
                </section>

                {/* フッターメッセージ */}
                <div className="mt-12 text-center">
                    <div className="bg-slate-100 rounded-2xl p-6">
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                            資料は随時アップデートしています。<br />
                            新しい資料が追加されたら、LINEでお知らせします。<br />
                            ご意見・ご要望があれば、LINEのトークからお気軽にどうぞ！
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
