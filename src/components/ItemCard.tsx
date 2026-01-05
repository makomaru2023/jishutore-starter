import Image from "next/image";
import { Item } from "@/types";
import Link from "next/link";

interface ItemCardProps {
    item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
    // Use direct R2 URL for better performance
    const R2_DOMAIN = "https://pub-00b4caa7ca60422fa31c5d5d0d6772c3.r2.dev";
    let imageUrl = item.previewSrc;
    if (!imageUrl.startsWith("https://")) {
        imageUrl = `${R2_DOMAIN}/${item.previewSrc}`;
    }

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                <Link href={`/items/${item.id}`}>
                    <Image
                        src={imageUrl}
                        alt={item.title}
                        fill
                        className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </Link>
            </div>
            <div className="flex flex-1 flex-col p-4">
                <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 capitalize">
                        {item.category}
                    </span>
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-blue-600 capitalize">
                        Free
                    </span>
                </div>
                <h3 className="mb-4 text-lg font-medium text-gray-900 line-clamp-2">
                    <Link href={`/items/${item.id}`} className="hover:text-blue-600 hover:underline">
                        {item.titleJa || item.title}
                    </Link>
                </h3>
                <div className="mt-auto">
                    <a
                        href={item.fileHref}
                        download
                        className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        ダウンロード
                    </a>
                </div>
            </div>
        </div>
    );
}
