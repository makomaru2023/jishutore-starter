import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

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
];

export default function LineTokutenPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-12 flex-1 max-w-3xl">
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
                        以下の資料を無料でダウンロードできます。<br />
                        印刷してそのまま患者さんに渡せるフォーマットです。
                    </p>
                </div>

                {/* 特典カード一覧 */}
                <div className="space-y-6">
                    {tokutenList.map((item, i) => (
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
