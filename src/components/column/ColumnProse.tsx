/**
 * コラム本文の組版パーツ。
 *
 * 記事側は素の <p> や <h2> を書かず、ここのパーツだけを使う。
 * 日本語の折返し（jp-text / jp-heading）と余白を記事ごとにブレさせないため。
 *
 * ★Figure を除いてサーバーコンポーネント（状態を持たない）。
 *   Figure だけは拡大表示のために ColumnFigureZoom（クライアント）へ渡している。
 */

import type { ReactNode } from "react";

import { ColumnFigureZoom } from "@/components/column/ColumnFigureZoom";

// 見出しの行間は leading-relaxed（1.625）で揃える。日本語の太字は文字の高さが行送りを
// 上回るため、leading-snug（1.375）だと2行以上になったときに上下の行が実際に重なる。
// leading-normal（1.5）でも余白は1px しか残らないので、見出しはここまで開ける。
export function H2({ children }: { children: ReactNode }) {
    return (
        <h2 className="jp-heading mt-10 border-l-4 border-blue-600 pl-3 text-xl font-black leading-relaxed text-slate-950 sm:text-2xl">
            {children}
        </h2>
    );
}

export function H3({ children }: { children: ReactNode }) {
    return <h3 className="jp-heading mt-7 text-base font-black leading-relaxed text-slate-900 sm:text-lg">{children}</h3>;
}

export function P({ children }: { children: ReactNode }) {
    return <p className="jp-text mt-4 text-[15px] leading-8 text-slate-700 sm:text-base">{children}</p>;
}

export function Ul({ children }: { children: ReactNode }) {
    return <ul className="mt-4 space-y-2.5">{children}</ul>;
}

export function Li({ children }: { children: ReactNode }) {
    return (
        <li className="jp-text flex gap-2.5 text-[15px] leading-7 text-slate-700 sm:text-base">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" aria-hidden="true" />
            <span>{children}</span>
        </li>
    );
}

/** 手順の列挙。番号に意味がある場面だけ使う（訪問の流れなど）。 */
export function Ol({ children }: { children: ReactNode }) {
    return <ol className="mt-4 space-y-2.5">{children}</ol>;
}

export function OlLi({ n, children }: { n: number; children: ReactNode }) {
    return (
        <li className="jp-text flex gap-3 text-[15px] leading-7 text-slate-700 sm:text-base">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">
                {n}
            </span>
            <span>{children}</span>
        </li>
    );
}

/** 補足・注意のひとかたまり。tone で色を変える。 */
export function Note({
    tone = "info",
    title,
    children,
}: {
    tone?: "info" | "caution";
    title?: string;
    children: ReactNode;
}) {
    const styles =
        tone === "caution"
            ? { box: "border-amber-200 bg-amber-50", heading: "text-amber-900", body: "text-amber-950/90" }
            : { box: "border-slate-200 bg-slate-50", heading: "text-slate-900", body: "text-slate-700" };
    return (
        <div className={`mt-6 rounded-xl border p-4 sm:p-5 ${styles.box}`}>
            {title && <p className={`jp-heading text-sm font-black ${styles.heading}`}>{title}</p>}
            <div className={`jp-text text-sm leading-7 ${styles.body} ${title ? "mt-2" : ""}`}>{children}</div>
        </div>
    );
}

/**
 * 図解。src は `/column/` 配下のSVG。alt は説明文にする（編集ガイド§6）。
 *
 * ★タップ／クリックで拡大できる（2026-08-23）。本文中の幅ではスマホで字が読めないため。
 *   拡大・移動の中身は ColumnFigureZoom 側。ここは figure と caption だけを持つ。
 */
export function Figure({
    src,
    alt,
    caption,
    width,
    height,
}: {
    src: string;
    alt: string;
    caption?: string;
    width: number;
    height: number;
}) {
    return (
        // 図解は読む文章より広く見せる。記事カード側に余白がある lg 以上でだけ左右にはみ出す
        // （それ未満の幅ではみ出すとカードから溢れる）。
        <figure className="mt-7 lg:-mx-12">
            <ColumnFigureZoom src={src} alt={alt} caption={caption} width={width} height={height} />
            {caption && (
                <figcaption className="jp-text mt-2 text-xs leading-6 text-slate-500">{caption}</figcaption>
            )}
        </figure>
    );
}

/** 表（改定ウォッチの「確認した資料」など）。横スクロールで潰れないようにする。 */
export function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
    return (
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 lg:-mx-12">
            <table className="w-full min-w-[520px] border-collapse bg-white text-left text-sm">
                <thead>
                    <tr className="bg-slate-50">
                        {head.map((label) => (
                            <th key={label} className="whitespace-nowrap px-4 py-3 font-black text-slate-700">
                                {label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-t border-slate-200 align-top">
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="jp-text px-4 py-3 leading-7 text-slate-700">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
