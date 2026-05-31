import { existsSync } from 'node:fs';
import { join } from 'node:path';
import {
    PreviewLightboxGrid,
    type PreviewGroup,
    type PreviewItem,
} from './PreviewLightboxGrid';

export type { PreviewItem, PreviewGroup };

// 本文用 / 見出し用の日本語タイポグラフィ（globals.css の共通方針）
const JP_WRAP = 'jp-text';
const JP_HEADING = 'jp-heading';

interface WatermarkPreviewSectionProps {
    id?: string;
    kicker?: string;
    /** セクション見出し */
    heading: string;
    /** 見出し直下の導入文（任意） */
    intro?: string;
    /** プレビューの位置づけを説明するサブコピー */
    subcopy: string;
    /** プレビュー候補（存在する画像だけ自動的に表示される）。groups と併用しない。 */
    items?: PreviewItem[];
    /** カテゴリごとにまとめたプレビュー。存在する画像だけ自動的に表示される。 */
    groups?: PreviewGroup[];
    background?: 'white' | 'slate';
    columns?: 2 | 3;
}

const fileExists = (src: string) =>
    existsSync(join(process.cwd(), 'public', src));

/**
 * 透かし入りプレビューセクション（サーバーコンポーネント）。
 * ビルド時に public 配下のファイル存在を確認し、実在する画像だけをグリッドに渡す。
 * - items / groups のどちらかを渡す（groups はカテゴリ見出し付きで表示）
 * - 1枚以上ある場合：存在する画像だけ表示
 * - 1枚もない場合：「サンプル画像を準備中です」プレースホルダを表示
 * これにより存在しない画像パスを参照して 404 になることを防ぐ。
 */
export function WatermarkPreviewSection({
    id,
    kicker = 'PREVIEW',
    heading,
    intro,
    subcopy,
    items,
    groups,
    background = 'white',
    columns = 3,
}: WatermarkPreviewSectionProps) {
    // 存在する画像だけに絞り込む（groups はカテゴリ単位で空になったら除外）
    const availableGroups = (groups ?? [])
        .map((group) => ({
            ...group,
            items: group.items.filter((item) => fileExists(item.src)),
        }))
        .filter((group) => group.items.length > 0);

    const availableItems = (items ?? []).filter((item) => fileExists(item.src));

    const totalCount =
        availableGroups.reduce((sum, group) => sum + group.items.length, 0) +
        availableItems.length;

    const bgClass = background === 'slate' ? 'bg-slate-50' : 'bg-white';

    return (
        <section id={id} className={`${bgClass} py-14 sm:py-20`}>
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8 text-center sm:mb-10">
                    {kicker && (
                        <p className="mb-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-black tracking-widest text-blue-600">
                            {kicker}
                        </p>
                    )}
                    <h2 className={`text-2xl font-black leading-snug text-slate-900 sm:text-3xl ${JP_HEADING}`}>
                        {heading}
                    </h2>
                    {intro && (
                        <p className={`mx-auto mt-4 max-w-3xl text-sm font-medium leading-relaxed text-slate-600 sm:text-base ${JP_WRAP}`}>
                            {intro}
                        </p>
                    )}
                    <p className={`mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 ${JP_WRAP}`}>
                        {subcopy}
                    </p>
                </div>

                {totalCount > 0 ? (
                    availableGroups.length > 0 ? (
                        <PreviewLightboxGrid groups={availableGroups} columns={columns} />
                    ) : (
                        <PreviewLightboxGrid items={availableItems} columns={columns} />
                    )
                ) : (
                    <div className="mx-auto flex max-w-md items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
                        <p className="text-sm font-bold text-slate-400">
                            サンプル画像を準備中です
                        </p>
                    </div>
                )}

                <p className={`mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-slate-500 ${JP_WRAP}`}>
                    ※ 掲載画像はプレビュー用のため透かし入りです。購入後のPowerPoint・PDFファイルには透かしは入りません。
                </p>
            </div>
        </section>
    );
}
