'use client';

import { useState } from 'react';

interface CheckoutButtonProps {
    productId: string;
    productName: string;
    price: number;
    label?: string;
}

export function CheckoutButton({ productId, productName, price, label }: CheckoutButtonProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClick = async () => {
        setLoading(true);
        setError(null);

        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', 'begin_checkout', {
                product_id: productId,
                product_name: productName,
                value: price,
                currency: 'JPY',
            });
        }

        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId }),
            });

            const data = await res.json().catch(() => null);

            if (!res.ok || !data?.url) {
                throw new Error('checkout failed');
            }

            window.location.href = data.url;
        } catch {
            setError('決済ページへの移動に失敗しました。時間をおいて再度お試しください。');
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <button
                type="button"
                onClick={handleClick}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-4 text-base font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading ? (
                    <>
                        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        処理中…
                    </>
                ) : (
                    <>
                        {label ?? '購入する'}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6 21 12m0 0-7.5 6M21 12H3" />
                        </svg>
                    </>
                )}
            </button>
            {error && (
                <p className="mt-2 text-sm font-medium text-red-600">{error}</p>
            )}
        </div>
    );
}
