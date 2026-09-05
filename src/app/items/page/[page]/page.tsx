import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ItemsIndexPage } from "@/components/ItemsIndexPage";
import { FREE_MATERIAL_COUNT_LABEL } from "@/constants/content-counts";
import {
    buildItemPageUrl,
    getItemPageRange,
    getTotalItemPages,
    listExtraPageNumbers,
    parseItemPageParam,
} from "@/lib/item-pagination";
import { getItems } from "@/lib/items";

/**
 * /items/page/<N>/ … 素材一覧の2ページ目以降。
 * ================================================================
 * ★1ページ目は /items/。ここは2以上だけを受ける（/items/page/1/ は作らない）。
 * ★dynamicParams = false ＋ parseItemPageParam で、
 *   存在しないページ番号・"0"・"02"・文字列はすべて404にする。
 *   ゆるく受けると同じ内容のURLが無限に生える。
 * ★絞り込み（?category= / ?q=）はここでは扱わない。
 *   クロールさせたいのは「素材一覧そのもの」で、絞り込みの組み合わせではない。
 */

const BASE_URL = "https://jishutore-sozaiko.online";
const BASE_PATH = "/items/";

export const dynamicParams = false;

export function generateStaticParams() {
    return listExtraPageNumbers(getItems().length).map((page) => ({ page: String(page) }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ page: string }>;
}): Promise<Metadata> {
    const { page } = await params;
    const parsed = parseItemPageParam(page);
    if (!parsed) return {};

    const total = getItems().length;
    const range = getItemPageRange(parsed, total);
    const title = `自主トレイラスト素材一覧 ${parsed}ページ目【無料・商用OK・登録不要】｜自主トレ素材庫`;

    return {
        title,
        description:
            `自主トレイラスト${FREE_MATERIAL_COUNT_LABEL}の一覧、${parsed}ページ目です（${range.start}〜${range.end}点目）。` +
            "登録不要・商用OK・クレジット表記不要で、印刷してそのまま患者さんに渡せます。" +
            "上肢・下肢・体幹・歩行・座位・口腔など部位別に探せ、文字あり・文字なしの2タイプから選べます。",
        // ★2ページ目以降のcanonicalは自分自身。1ページ目へまとめない。
        alternates: { canonical: BASE_URL + buildItemPageUrl(BASE_PATH, parsed) },
    };
}

export default async function ItemsPagedPage({
    params,
}: {
    params: Promise<{ page: string }>;
}) {
    const { page } = await params;
    const parsed = parseItemPageParam(page);
    if (!parsed) notFound();

    const items = getItems();
    const totalPages = getTotalItemPages(items.length);
    if (parsed > totalPages) notFound();

    const range = getItemPageRange(parsed, items.length);

    return (
        <ItemsIndexPage
            items={items}
            breadcrumb={
                <>
                    <Link href="/" className="transition-colors hover:text-teal-700">
                        ホーム
                    </Link>
                    <span className="mx-2" aria-hidden="true">
                        /
                    </span>
                    <Link href={BASE_PATH} className="transition-colors hover:text-teal-700">
                        無料素材
                    </Link>
                    <span className="mx-2" aria-hidden="true">
                        /
                    </span>
                    <span className="text-slate-700">{parsed}ページ目</span>
                </>
            }
            title={
                <>
                    <span className="inline-block sm:whitespace-nowrap">自主トレイラスト</span>
                    <span className="inline-block sm:whitespace-nowrap">素材一覧</span>
                    <span className="inline-block">（{parsed}ページ目）</span>
                </>
            }
            description={
                <>
                    <span className="inline-block sm:whitespace-nowrap">
                        全{items.length}点のうち、
                    </span>
                    <span className="inline-block sm:whitespace-nowrap">
                        {range.start}〜{range.end}点目を表示しています。
                    </span>
                    <span className="inline-block sm:whitespace-nowrap">
                        すべて無料でダウンロードできます。
                    </span>
                </>
            }
            pagination={{ basePath: BASE_PATH, currentPage: parsed, totalPages }}
            buyoutAd="both"
        />
    );
}
