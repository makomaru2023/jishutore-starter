export type ComparisonRow = {
    /** 比較する観点（例: 形式・使い方） */
    label: string;
    /** 左列（比較対象。無料素材や他商品） */
    left: string;
    /** 右列（この商品） */
    right: string;
};

interface ProductComparisonTableProps {
    rows: readonly ComparisonRow[];
    /** 左列の見出し（例: 無料素材） */
    leftLabel: string;
    /** 右列の見出し（例: 姿勢別PowerPoint資料） */
    rightLabel: string;
}

/**
 * 「無料 vs この商品」の比較表。
 * --------------------------------------------------------------
 * ★2026-08-28：商品LP3か所（疾患別の無料比較／姿勢別の無料比較／姿勢別の疾患別比較）が
 *   それぞれ別実装で、特に姿勢別の無料比較は「観点ごとに1枚のカードを横5枚並べ、
 *   各カードの中で無料と有料を上下に置く」形だった。これだと
 *   ①商品名のラベルが5回繰り返される ②文量の違いで行が横に揃わない
 *   ③5列に潰れて「座位・立位・／臥位から選べる」と折れる、の3つが同時に起きて読みにくい。
 *   見出しを1回だけ出して行を横に揃える、素直な表に統一した。
 *
 * PCは表、スマホは行ごとの積み上げ。どちらも枠と区切り線だけで、入れ子の塗りは使わない。
 */
export function ProductComparisonTable({ rows, leftLabel, rightLabel }: ProductComparisonTableProps) {
    return (
        <>
            {/* PC: 表 */}
            <div className="hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
                <table className="w-full table-fixed text-sm">
                    <thead>
                        <tr className="bg-slate-50 text-left">
                            <th className="w-[22%] px-5 py-3.5 text-xs font-semibold tracking-wide text-slate-500">
                                項目
                            </th>
                            <th className="w-[39%] px-5 py-3.5 text-sm font-bold text-slate-600">{leftLabel}</th>
                            <th className="w-[39%] border-l border-blue-100 bg-blue-50/60 px-5 py-3.5 text-sm font-bold text-blue-700">
                                {rightLabel}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.label} className="border-t border-slate-100 align-top">
                                <th scope="row" className="px-5 py-4 text-left text-sm font-bold text-slate-900">
                                    {row.label}
                                </th>
                                <td className="px-5 py-4 leading-relaxed text-slate-600">{row.left}</td>
                                <td className="border-l border-blue-100 bg-blue-50/40 px-5 py-4 font-bold leading-relaxed text-slate-900">
                                    {row.right}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* スマホ: 行ごとに積み上げる */}
            <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 md:hidden">
                {rows.map((row) => (
                    <div key={row.label} className="p-4">
                        <p className="text-sm font-bold text-slate-900">{row.label}</p>
                        <div className="mt-2.5 space-y-2.5">
                            <div>
                                <p className="text-[11px] font-semibold text-slate-400">{leftLabel}</p>
                                <p className="mt-0.5 text-sm leading-relaxed text-slate-600">{row.left}</p>
                            </div>
                            <div className="border-l-2 border-blue-200 pl-3">
                                <p className="text-[11px] font-semibold text-blue-600">{rightLabel}</p>
                                <p className="mt-0.5 text-sm font-bold leading-relaxed text-slate-900">{row.right}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
