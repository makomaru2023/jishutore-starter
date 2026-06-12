"use client";

import type { ReactNode } from "react";
import { trackMaterialDownload } from "@/lib/analytics";

interface DownloadTrackingLinkProps {
    href: string;
    fileName: string;
    itemName: string;
    children: ReactNode;
    className?: string;
}

/**
 * 購入後ZIPなど、ファイル名指定のダウンロードリンク（計測付き）
 * 旧 download_click は廃止し、material_download に一本化している。
 */
export function DownloadTrackingLink({
    href,
    fileName,
    itemName,
    children,
    className,
}: DownloadTrackingLinkProps) {
    const handleClick = () => {
        trackMaterialDownload({
            materialName: itemName,
            materialSlug: fileName,
            materialType: "purchased-zip",
        });
    };

    return (
        <a href={href} download={fileName} onClick={handleClick} className={className}>
            {children}
        </a>
    );
}
