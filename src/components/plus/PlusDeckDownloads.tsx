/* ───────── 完成デッキ＆会員ツール（/plus/library 上部パネル） ─────────
 * 旧・買い切り商品（疾患別9本セット／姿勢別セット／プロンプト工房）のPlus収録分。
 * ZIPは /api/plus/deck-download/ 経由（契約者限定・Stripe契約を毎回確認）。 */

const ZipIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
);
const ToolIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 7h6m-3-3v6M4 20l6.5-6.5M15 4l-1.5 1.5M8 9 4 13l3 3 4-4" />
    </svg>
);

type DeckEntry = {
    title: string;
    desc: string;
    href: string;
    cta: string;
    kind: "zip" | "tool";
};

const ENTRIES: DeckEntry[] = [
    {
        title: "疾患別 完成デッキ 9本セット",
        desc: "脳卒中・腰痛など、退院前・訪問リハでそのまま使える疾患別PowerPoint",
        href: "/api/plus/deck-download/?deck=disease-9-set",
        cta: "ZIPをダウンロード",
        kind: "zip",
    },
    {
        title: "姿勢別 完成デッキセット",
        desc: "座位・臥位・立位など「今できる姿勢」から選べる自主トレPowerPoint",
        href: "/api/plus/deck-download/?deck=posture-set",
        cta: "ZIPをダウンロード",
        kind: "zip",
    },
    {
        title: "伝わるプロンプト工房",
        desc: "ChatGPTに貼るだけでスライド画像を量産できるプロンプト作成ツール",
        href: "/member/slide-prompt-generator/",
        cta: "ツールを開く",
        kind: "tool",
    },
];

export function PlusDeckDownloads() {
    return (
        <section
            aria-label="完成デッキと会員ツール"
            className="mb-5 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm sm:p-5"
        >
            <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-[11px] font-black text-slate-900">
                    新収録
                </span>
                <h2 className="text-sm font-black text-slate-900 sm:text-base">完成デッキ＆会員ツール</h2>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-500 jp-text">
                個別販売していたセット・ツールがPlusに収録されました。追加料金なしでご利用いただけます。
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {ENTRIES.map((entry) => (
                    <div
                        key={entry.title}
                        className="flex flex-col rounded-xl border border-slate-200 bg-slate-50/60 p-3"
                    >
                        <p className="text-xs font-black leading-snug text-slate-800">{entry.title}</p>
                        <p className="mt-1 flex-1 text-[11px] leading-relaxed text-slate-500 jp-text">
                            {entry.desc}
                        </p>
                        <a
                            href={entry.href}
                            className="mt-2.5 inline-flex items-center justify-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
                        >
                            {entry.kind === "zip" ? <ZipIcon /> : <ToolIcon />}
                            {entry.cta}
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}
