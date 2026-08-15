/**
 * 記事末尾の「この記事に出てくるイラスト」ブロック。
 *
 * イラスト層向けの記事（口腔体操の順番・自主トレの渡し方など）用。
 * 記事で説明した動きの絵が、そのまま無料で取れることを見せる。
 *
 * ★`relatedItems` は型とビルド検証だけ先に入っていて描画が無かった（2026-08-15に実装）。
 * 既存の記事はどれも使っていないので、この追加で見た目が変わる記事は無い。
 *
 * ★このコンポーネント自身は @/lib/column を import しない。サーバー側で解決した
 * 素材データだけを受け取る（KaiteiWatchLink・FeeItemColumnLinks と同じ理由）。
 */

import Image from "next/image";
import Link from "next/link";
import { getItemImageUrl } from "@/lib/items";
import type { Item } from "@/types";

export function ColumnRelatedItems({ items }: { items: Item[] }) {
    if (items.length === 0) return null;

    return (
        <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <p className="text-xs font-black tracking-widest text-teal-700">この記事に出てくるイラスト</p>
            <h2 className="jp-heading mt-2 text-lg font-black text-slate-950 sm:text-xl">
                すべて無料でダウンロードできます
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {items.map((item) => (
                    <Link
                        key={item.id}
                        href={`/items/${item.id}`}
                        className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition hover:border-teal-300 hover:bg-teal-50/50"
                    >
                        <div className="relative aspect-[4/3] w-full bg-white">
                            <Image
                                src={getItemImageUrl(item.previewSrc)}
                                alt={item.titleJa || item.title}
                                fill
                                className="object-contain p-2"
                                sizes="(max-width: 640px) 50vw, 33vw"
                            />
                        </div>
                        <span className="jp-heading line-clamp-2 px-3 py-2.5 text-xs font-black leading-5 text-slate-800 sm:text-sm">
                            {item.titleJa || item.title}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
