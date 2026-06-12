"use client";

import type { ReactNode } from "react";
import { trackMaterialDownload } from "@/lib/analytics";

/**
 * 素材ダウンロード用リンク（計測付き）
 * - クリック時に material_download を送信
 * - ダウンロード処理（href への遷移）は妨げない
 * - 任意で material-downloaded イベントを発火し、LINE トースト表示を促す
 */

/** ダウンロード直後トーストが購読するカスタムイベント名 */
export const MATERIAL_DOWNLOADED_EVENT = "material-downloaded";

interface MaterialDownloadButtonProps {
    href: string;
    materialName: string;
    materialSlug: string;
    materialType: string;
    className?: string;
    children: ReactNode;
    /** ダウンロード後の LINE トーストを促すか（既定: true） */
    notifyToast?: boolean;
}

export function MaterialDownloadButton({
    href,
    materialName,
    materialSlug,
    materialType,
    className,
    children,
    notifyToast = true,
}: MaterialDownloadButtonProps) {
    const handleClick = () => {
        // 計測（失敗してもダウンロードは成立させる）
        trackMaterialDownload({ materialName, materialSlug, materialType });

        if (notifyToast) {
            try {
                window.dispatchEvent(new CustomEvent(MATERIAL_DOWNLOADED_EVENT));
            } catch {
                /* イベント発火失敗は無視 */
            }
        }
    };

    return (
        <a href={href} download onClick={handleClick} className={className}>
            {children}
        </a>
    );
}
