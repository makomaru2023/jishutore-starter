'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Plan {
    name: string;
    price: string;
    description: string;
    features: string[];
    priceId: string;
    highlighted: boolean;
}

interface PricingCardProps {
    plan: Plan;
}

export function PricingCard({ plan }: PricingCardProps) {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        try {
            setLoading(true);

            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    priceId: plan.priceId,
                    planName: plan.name,
                }),
            });

            const { sessionId } = await response.json();

            const stripe = await stripePromise;
            if (!stripe) {
                throw new Error('Stripeの読み込みに失敗しました');
            }

            const { error } = await stripe.redirectToCheckout({ sessionId });

            if (error) {
                console.error('Stripe checkout error:', error);
                alert('決済ページへの遷移に失敗しました。もう一度お試しください。');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('エラーが発生しました。もう一度お試しください。');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`relative rounded-2xl p-8 ${plan.highlighted
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl scale-105'
                    : 'bg-white text-gray-900 shadow-lg'
                }`}
        >
            {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-yellow-400 px-4 py-1 text-sm font-semibold text-gray-900">
                    おすすめ
                </div>
            )}

            <div className="mb-6">
                <h3 className={`text-2xl font-bold ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                </h3>
                <p className={`mt-2 text-sm ${plan.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
                    {plan.description}
                </p>
            </div>

            <div className="mb-6">
                <div className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}
                </div>
                <p className={`mt-1 text-sm ${plan.highlighted ? 'text-blue-100' : 'text-gray-500'}`}>
                    ※ 買い切り型・ライセンスフリー
                </p>
            </div>

            <ul className="mb-8 space-y-3">
                {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <svg
                            className={`mr-3 h-5 w-5 flex-shrink-0 ${plan.highlighted ? 'text-blue-200' : 'text-blue-500'
                                }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        <span className={`text-sm ${plan.highlighted ? 'text-blue-50' : 'text-gray-700'}`}>
                            {feature}
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
        </div>
    );
}
