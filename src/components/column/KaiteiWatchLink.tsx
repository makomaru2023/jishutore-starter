/**
 * 最新の「改定ウォッチ」記事への導線。
 *
 * 置き場所は2つ（企画書§5）：
 * - `/fee-check/` トップ … 今月の変更まとめとして
 * - 報酬チェック各項目ページの「確認日」の近く … 毎月点検している証拠を見せる場所
 *
 * 記事が1本も無い間は呼び出し側が undefined を渡す想定で、何も描画しない。
 * ★このコンポーネント自身は @/lib/column を import しない。サーバー側で解決した
 * タイトルとURLだけを受け取り、記事本体をバンドルに引き込まないようにする。
 */

import Link from "next/link";

export type KaiteiWatchLinkTarget = {
    title: string;
    href: string;
    /** YYYY-MM-DD */
    updatedAt: string;
};

export function KaiteiWatchHubLink({ target }: { target?: KaiteiWatchLinkTarget }) {
    if (!target) return null;

    return (
        <Link
            href={target.href}
            className="mx-auto mt-6 flex max-w-2xl flex-col gap-1 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-left transition hover:border-amber-300 hover:bg-amber-100/70"
        >
            <span className="text-xs font-black tracking-widest text-amber-800">
                今月の変更まとめ（{target.updatedAt}）
            </span>
            <span className="jp-heading text-sm font-black leading-6 text-amber-950 sm:text-base">
                {target.title}
            </span>
            <span className="text-xs font-bold text-amber-800">
                今月どの資料を確認し、どの項目が変わったかをまとめています →
            </span>
        </Link>
    );
}

export function KaiteiWatchInlineLink({ target }: { target?: KaiteiWatchLinkTarget }) {
    if (!target) return null;

    return (
        <p className="mt-1.5 text-xs font-bold text-slate-500 print:hidden">
            <Link href={target.href} className="text-blue-700 hover:underline">
                今月の変更まとめを見る
            </Link>
        </p>
    );
}
