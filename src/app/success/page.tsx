'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import Link from 'next/link';

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (sessionId) {
            // ここで必要に応じてセッション情報を検証できます
            setTimeout(() => setLoading(false), 1000);
        } else {
            setError('セッションIDが見つかりません');
            setLoading(false);
        }
    }, [sessionId]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-16">
                <div className="mx-auto max-w-2xl">
                    {loading ? (
                        <div className="text-center">
                            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                            <p className="mt-4 text-gray-600">決済情報を確認中...</p>
                        </div>
                    ) : error ? (
                        <div className="rounded-lg bg-red-50 p-8 text-center">
                            <svg
                                className="mx-auto h-16 w-16 text-red-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <h1 className="mt-4 text-2xl font-bold text-gray-900">エラーが発生しました</h1>
                            <p className="mt-2 text-gray-600">{error}</p>
                            <Link
                                href="/pricing"
                                className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
                            >
                                料金プランに戻る
                            </Link>
                        </div>
                    ) : (
                        <div className="rounded-lg bg-white p-8 shadow-lg">
                            <div className="text-center">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                    <svg
                                        className="h-10 w-10 text-green-600"
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
                                </div>
                                <h1 className="mt-6 text-3xl font-bold text-gray-900">
                                    ご購入ありがとうございます！
                                </h1>
                                <p className="mt-4 text-lg text-gray-600">
                                    決済が正常に完了しました。
                                </p>
                            </div>

                            <div className="mt-8 rounded-lg bg-blue-50 p-6">
                                <h2 className="mb-3 text-lg font-semibold text-gray-900">次のステップ</h2>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm text-white">
                                            1
                                        </span>
                                        <span>
                                            ご登録のメールアドレスに、素材のダウンロードリンクをお送りしました。
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm text-white">
                                            2
                                        </span>
                                        <span>
                                            メールが届かない場合は、迷惑メールフォルダをご確認ください。
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm text-white">
                                            3
                                        </span>
                                        <span>
                                            素材は<Link href="/license" className="text-blue-600 hover:underline">利用規約</Link>に従ってご利用ください。
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                                <Link
                                    href="/"
                                    className="rounded-lg bg-blue-600 px-6 py-3 text-center text-white hover:bg-blue-700"
                                >
                                    ホームに戻る
                                </Link>
                                <Link
                                    href="/premium"
                                    className="rounded-lg border-2 border-gray-300 px-6 py-3 text-center text-gray-700 hover:bg-gray-50"
                                >
                                    素材を見る
                                </Link>
                            </div>

                            <div className="mt-8 border-t pt-6 text-center text-sm text-gray-500">
                                <p>セッションID: {sessionId}</p>
                                <p className="mt-2">
                                    お問い合わせの際は、上記のセッションIDをお知らせください。
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
