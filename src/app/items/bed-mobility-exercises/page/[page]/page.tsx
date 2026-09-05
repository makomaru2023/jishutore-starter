import { notFound } from "next/navigation";
import {
    createSeoCategoryMetadata,
    listSeoCategoryExtraPages,
    SeoItemCategoryPage,
} from "@/components/SeoItemCategoryPage";
import { parseItemPageParam } from "@/lib/item-pagination";
import { bedMobilityCategory as config } from "@/lib/seoItemCategories";

/**
 * /items/bed-mobility-exercises/page/<N>/ … 2ページ目以降。
 * ★1ページ目は /items/bed-mobility-exercises/（このルートは2以上だけを受ける）。
 * ★dynamicParams = false なので、存在しないページ番号は404になる。
 *   "1"・"0"・"02"・文字列も parseItemPageParam が弾く（同内容URLを増やさない）。
 */
export const dynamicParams = false;

export function generateStaticParams() {
    return listSeoCategoryExtraPages(config).map((page) => ({ page: String(page) }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }) {
    const { page } = await params;
    const parsed = parseItemPageParam(page);
    return parsed ? createSeoCategoryMetadata(config, parsed) : {};
}

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
    const { page } = await params;
    const parsed = parseItemPageParam(page);
    if (!parsed) notFound();
    return <SeoItemCategoryPage config={config} page={parsed} />;
}
