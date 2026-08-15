/**
 * 報酬チェックの項目ページから、その項目を扱った図解つきコラム記事への導線。
 *
 * 置き場所は「算定要件」セクションの直後。いちばん文字が硬いところを読み終えた直後、
 * つまり読み手がつまずいている瞬間に出す（企画書_コラムの部分公開とPlus導線 §3-9）。
 *
 * ★飛び先は必ず無料で読める記事にすること。
 * 「わかりにくい方はこちら」の先が施錠されていると、文字で理解できずに困っている人が
 * いきなり壁にぶつかる。2026-08-11に `/plus/fee-check-combo/` で直した事故と同じ形になる。
 *
 * ★このコンポーネント自身は @/lib/column を import しない。サーバー側で解決した
 * タイトルとURLだけを受け取り、記事本体をバンドルに引き込まない（KaiteiWatchLink と同じ理由）。
 */

import Link from "next/link";

export type FeeItemColumnTarget = {
    title: string;
    href: string;
};

export function FeeItemColumnLinks({ targets }: { targets: FeeItemColumnTarget[] }) {
    if (targets.length === 0) return null;

    return (
        <section className="rounded-lg border border-blue-200 bg-blue-50 p-4 print:hidden">
            {/* 「この加算が」ではなく「この項目が」。基本報酬のページにも出るので、
                加算に限定した言い方にしない（サイト内では148項目という数え方で統一している）。 */}
            <h2 className="jp-heading break-keep text-sm font-black text-slate-900">
                この項目がわかりにくい方へ｜図解で解説しています
            </h2>
            <p className="jp-text mt-1.5 break-keep text-xs font-bold leading-6 text-slate-600">
                算定要件は条件を並べたものなので、どういう順番で進むかまでは書かれていません。
                そこを図にして並べ直した記事があります。
            </p>
            <div className="mt-3 space-y-2">
                {targets.map((target) => (
                    <Link
                        key={target.href}
                        href={target.href}
                        className="jp-heading flex items-start gap-2 rounded-md border border-blue-200 bg-white px-3 py-2.5 text-sm font-black leading-6 text-blue-800 transition hover:border-blue-400 hover:bg-blue-100/50"
                    >
                        <span aria-hidden="true">📘</span>
                        <span>{target.title}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
