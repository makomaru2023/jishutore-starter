'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { verifySessionAndGetToken } from '@/app/actions/verify-session';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

function ThankYouContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
    const [planName, setPlanName] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        if (!sessionId) {
            setStatus('error');
            setErrorMessage('セッションIDが見つかりません。');
            return;
        }

        async function verify() {
            const result = await verifySessionAndGetToken(sessionId!);

            if (result.success && result.token) {
                setStatus('success');
                setDownloadUrl(`/api/download?token=${result.token}`);
                setPlanName(result.plan === 'basic' ? 'Basic' : result.plan === 'pro' ? 'Pro' : 'Premium');

                // Set purchased cookie for client-side state if needed (optional, but good for UX)
                document.cookie = "purchased=true; path=/; max-age=31536000"; // 1 year
            } else {
                setStatus('error');
                setErrorMessage(result.error || '不明なエラーが発生しました。');
            }
        }

        verify();
    }, [sessionId]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
                {status === 'loading' && (
                    <div className="space-y-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-lg text-gray-600">お支払いを確認しています...</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="bg-white p-8 rounded-2xl shadow-sm max-w-lg w-full border border-gray-100">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">ご購入ありがとうございます！</h1>
                        <p className="text-gray-600 mb-8">
                            {planName}プランの決済が完了しました。<br />
                            以下のボタンから素材をダウンロードしてください。
                        </p>

                        <a
                            href={downloadUrl!}
                            className="block w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                        >
                            {planName}素材をダウンロード
                        </a>

                        <p className="mt-6 text-sm text-gray-500">
                            ※ダウンロードが始まらない場合は、ブラウザのポップアップブロック設定をご確認ください。
                        </p>

                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                                トップページに戻る
                            </Link>
                        </div>
                    </div>
                )}

                {status === 'error' && (
                    <div className="bg-white p-8 rounded-2xl shadow-sm max-w-lg w-full border border-red-100">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">エラーが発生しました</h1>
                        <p className="text-red-600 mb-8">{errorMessage}</p>
                        <Link href="/contact" className="text-blue-600 hover:text-blue-800 underline">
                            サポートにお問い合わせ
                        </Link>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}

export default function ThankYouPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
            <ThankYouContent />
        </Suspense>
    );
}
