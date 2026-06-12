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

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-[2rem] border-2 border-slate-100 bg-white shadow-sm transition-all hover:shadow-xl hover:shadow-teal-500/10 hover:border-teal-500/30">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50">
                <Link href={`/items/${item.id}`}>
                    <Image
                        src={imageUrl}
                        alt={item.title}
                        fill
                        className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </Link>
            </div>
            <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center gap-2 text-xs font-bold">
                    <span className="rounded-full bg-slate-100 text-slate-500 px-3 py-1 capitalize">
                        {item.category}
                    </span>
                    <span className="rounded-full bg-teal-50 px-3 py-1 text-teal-600 capitalize">
                        Free
                    </span>
                </div>
                <h3 className="mb-6 text-lg font-black text-slate-900 line-clamp-2 leading-snug">
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
                        className="inline-flex w-full items-center justify-center rounded-full bg-teal-500 px-4 py-3 text-sm font-bold text-white transition-all shadow-md shadow-teal-500/20 hover:bg-teal-400 hover:shadow-lg hover:shadow-teal-500/40 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    >
                        ダウンロード
                    </MaterialDownloadButton>
                </div>
            </div>
        </div>
    );
}
