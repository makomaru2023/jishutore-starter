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

        const key = `purchase_tracked_${sessionId}`;
        if (sessionStorage.getItem(key)) return;
        sessionStorage.setItem(key, '1');

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
