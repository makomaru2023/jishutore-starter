import { notFound } from "next/navigation";
import {
    createSwallowingMetadata,
    listSwallowingExtraPages,
    SwallowingExercisesPage,
} from "@/components/SwallowingCategoryPage";
import { parseItemPageParam } from "@/lib/item-pagination";

/**
 * /items/swallowing-exercises/page/<N>/ … 2ページ目以降。
 * ★1ページ目は /items/swallowing-exercises/。
 * ★dynamicParams = false なので、存在しないページ番号は404になる。
 */
export const dynamicParams = false;

export function generateStaticParams() {
    return listSwallowingExtraPages().map((page) => ({ page: String(page) }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }) {
    const { page } = await params;
    const parsed = parseItemPageParam(page);
    return parsed ? createSwallowingMetadata(parsed) : {};
}

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
    const { page } = await params;
    const parsed = parseItemPageParam(page);
    if (!parsed) notFound();
    return <SwallowingExercisesPage page={parsed} />;
}
