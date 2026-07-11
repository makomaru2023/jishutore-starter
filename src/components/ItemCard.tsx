import Image from "next/image";
import { Item } from "@/types";
import { getItemImageUrl } from "@/lib/items";
import Link from "next/link";
import { MaterialDownloadButton } from "@/components/MaterialDownloadButton";

interface ItemCardProps {
    item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
    // Use direct R2 URL for better performance
    const imageUrl = getItemImageUrl(item.previewSrc);
    const isTextImage = item.category === "text";

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-2xl border-2 border-slate-100 bg-white shadow-sm transition-all hover:border-teal-500/30 hover:shadow-xl hover:shadow-teal-500/10 sm:rounded-[2rem]">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50">
                <Link href={`/items/${item.id}`}>
                    <Image
                        src={imageUrl}
                        alt={item.title}
                        fill
                        className="object-contain p-3 transition-transform duration-500 group-hover:scale-110 sm:p-6"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                </Link>
            </div>
            <div className="flex flex-1 flex-col p-3 sm:p-6">
                <div className="mb-2 flex flex-wrap items-center gap-1.5 text-[10px] font-bold sm:mb-3 sm:gap-2 sm:text-xs">
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-600 sm:px-3">
                        {isTextImage ? "説明文付きPNG" : "文字なしPNG"}
                    </span>
                    <span className="rounded-full bg-teal-50 px-2 py-1 text-teal-600 sm:px-3">
                        無料
                    </span>
                </div>
                {isTextImage && (
                    <p className="mb-2 hidden text-xs font-medium leading-relaxed text-slate-500 sm:block">
                        画像内の文字は編集できません
                    </p>
                )}
                <h3 className="mb-4 line-clamp-2 text-sm font-black leading-snug text-slate-900 sm:mb-6 sm:text-lg">
                    <Link href={`/items/${item.id}`} className="hover:text-teal-600 transition-colors">
                        {item.titleJa || item.title}
                    </Link>
                </h3>
                <div className="mt-auto">
                    <MaterialDownloadButton
                        href={item.fileHref}
                        materialName={item.titleJa || item.title}
                        materialSlug={item.id}
                        materialType={item.tier}
                        className="inline-flex w-full items-center justify-center rounded-full bg-teal-500 px-2 py-2.5 text-xs font-bold text-white shadow-md shadow-teal-500/20 transition-all hover:-translate-y-0.5 hover:bg-teal-400 hover:shadow-lg hover:shadow-teal-500/40 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:px-4 sm:py-3 sm:text-sm"
                    >
                        <span className="hidden sm:inline">PNGを</span>ダウンロード
                    </MaterialDownloadButton>
                </div>
            </div>
        </div>
    );
}
