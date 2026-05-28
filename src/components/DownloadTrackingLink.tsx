"use client";

import type { ReactNode } from "react";

interface DownloadTrackingLinkProps {
    href: string;
    fileName: string;
    itemName: string;
    children: ReactNode;
    className?: string;
}

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

export function DownloadTrackingLink({
    href,
    fileName,
    itemName,
    children,
    className,
}: DownloadTrackingLinkProps) {
    const handleClick = () => {
        if (typeof window === "undefined" || typeof window.gtag !== "function") return;

        window.gtag("event", "download_click", {
            item_name: itemName,
            file_name: fileName,
            file_type: "zip",
        });
    };

    return (
        <a href={href} download={fileName} onClick={handleClick} className={className}>
            {children}
        </a>
    );
}
