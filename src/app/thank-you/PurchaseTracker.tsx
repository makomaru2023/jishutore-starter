'use client';

import { useEffect } from 'react';

interface PurchaseTrackerProps {
    sessionId?: string;
    productId: string;
    productName: string;
    value: number;
}

export function PurchaseTracker({ sessionId, productId, productName, value }: PurchaseTrackerProps) {
    useEffect(() => {
        if (!sessionId) return;
        if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

        // 二重計上の防止：同じ transaction_id では再送信しない。
        // localStorage に記録し、リロード・再訪問しても発火は1回に保つ。
        const key = `purchase_tracked_${sessionId}`;
        try {
            if (localStorage.getItem(key)) return;
            localStorage.setItem(key, '1');
        } catch {
            /* storage 不可環境では従来どおり送信（最悪でも稀に二重計上） */
        }

        window.gtag('event', 'purchase', {
            transaction_id: sessionId,
            value,
            currency: 'JPY',
            items: [
                {
                    item_id: productId,
                    item_name: productName,
                    price: value,
                    quantity: 1,
                },
            ],
        });
    }, [sessionId, productId, productName, value]);

    return null;
}
