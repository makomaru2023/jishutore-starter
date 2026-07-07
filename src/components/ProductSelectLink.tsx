'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

export type ProductSelectLocation =
    | 'products_compare'
    | 'products_bundle'
    | 'products_cross_link'
    | 'products_facility'
    | 'category_facility_cta'
    | 'home_facility';

interface ProductSelectLinkProps {
    href: string;
    itemName: string;
    location: ProductSelectLocation;
    className?: string;
    children: ReactNode;
}

/**
 * /products/ 内の選び方カード・比較表・まとめ買い導線・商品LP同士の回遊リンク等に使う
 * クリック計測つきリンク。GA4 product_select_click を発火する。
 * window.gtag 未定義でもエラーにならない。
 */
export function ProductSelectLink({ href, itemName, location, className, children }: ProductSelectLinkProps) {
    const handleClick = () => {
        if (typeof window === 'undefined') return;
        if (typeof window.gtag !== 'function') return;
        try {
            window.gtag('event', 'product_select_click', {
                item_name: itemName,
                location,
                destination: href,
            });
        } catch {
            // GA4未設定でもエラーにしない
        }
    };

    return (
        <Link href={href} onClick={handleClick} className={className}>
            {children}
        </Link>
    );
}
