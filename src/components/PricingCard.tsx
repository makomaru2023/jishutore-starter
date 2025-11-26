'use client';

import { useState } from 'react';


interface PricingCardProps {
    title: string;
    price: string;
    description: string;
    features: string[];
    priceId: string;
    buttonText: string;
    recommended?: boolean;
}

export function PricingCard({
    title,
    price,
    description,
    features,
    priceId,
    buttonText,
    recommended = false
}: PricingCardProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCheckout = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ priceId }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Checkout failed');
            }

            // Redirect to Stripe Checkout
            window.location.href = data.url;
        } catch (err) {
            console.error('Checkout error:', err);
            setError(err instanceof Error ? err.message : 'An error occurred');
            setIsLoading(false);
        }
    };

    return (
        <div className={`relative flex flex-col rounded-2xl border ${recommended ? 'border-blue-600 shadow-xl scale-105 z-10' : 'border-gray-200 shadow-sm'} bg-white p-8`}>
            {recommended && (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-blue-600 px-3 py-1 text-center text-sm font-medium text-white">
                    人気プラン
                </div>
            )}
            <div className="mb-8">
                <h3 className="text-xl font-semibold leading-7 text-gray-900">{title}</h3>
                <p className="mt-4 flex items-baseline gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-gray-900">¥{price}</span>
                    <span className="text-base text-gray-500">（税込）</span>
                </p>
                <p className="mt-6 text-base leading-7 text-gray-600">{description}</p>
            </div>
            <ul role="list" className="mb-8 space-y-3 text-sm leading-6 text-gray-600 flex-1">
                {features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                        <svg className="h-6 w-5 flex-none text-blue-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                        </span>
                    </li>
                ))}
            </ul>

            <button
                onClick={handleCheckout}
                disabled={loading}
                className={`w-full rounded-lg py-3 px-6 font-semibold transition-all ${plan.highlighted
                    ? 'bg-white text-blue-600 hover:bg-blue-50 disabled:bg-gray-200'
                    : 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400'
                    } disabled:cursor-not-allowed`}
            >
                {loading ? '処理中...' : '今すぐはじめる'}
            </button>

            <div className="mt-4 text-center">
                <a
                    href="/license"
                    className={`text-sm underline ${plan.highlighted ? 'text-blue-100 hover:text-white' : 'text-blue-600 hover:text-blue-800'
                        }`}
                >
                    利用規約
                </a>
                <span className={`mx-2 ${plan.highlighted ? 'text-blue-200' : 'text-gray-400'}`}>と</span>
                <a
                    href="/license"
                    className={`text-sm underline ${plan.highlighted ? 'text-blue-100 hover:text-white' : 'text-blue-600 hover:text-blue-800'
                        }`}
                >
                    ライセンス
                </a>
                <span className={`${plan.highlighted ? 'text-blue-100' : 'text-gray-600'}`}> に同意します</span>
            </div>
        </div >
    );
}
