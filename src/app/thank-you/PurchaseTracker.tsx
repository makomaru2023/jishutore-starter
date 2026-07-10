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
        let attempts = 0;
        let timer: ReturnType<typeof setTimeout> | undefined;
        const key = `purchase_tracked_${sessionId}`;

        const sendPurchase = () => {
            if (typeof window.gtag !== 'function') {
                attempts += 1;
                if (attempts < 20) timer = setTimeout(sendPurchase, 250);
                return;
            }

            // 二重計上の防止：同じ transaction_id では再送信しない。
            // GA送信前にタグの準備を待ち、送信後にだけ完了済みとして保存する。
            try {
                if (localStorage.getItem(key)) return;
            } catch {
                /* storage 不可環境では送信を継続する */
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

            try {
                localStorage.setItem(key, '1');
            } catch {
                /* storage 不可環境では稀な二重計上を許容する */
            }
        };

        sendPurchase();
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [sessionId, productId, productName, value]);

    return null;
}
