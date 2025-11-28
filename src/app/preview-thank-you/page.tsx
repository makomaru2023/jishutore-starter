'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

function PreviewThankYouContent() {
    const searchParams = useSearchParams();
    // Allow testing different plans via ?plan=basic|pro|premium
    const planParam = searchParams.get('plan') || 'premium';

    const planName = planParam === 'basic' ? 'Basic' : planParam === 'pro' ? 'Pro' : 'Premium';
    const downloadUrl = '#'; // Dummy link for preview

    // Set cookie for previewing the "purchased" state on other pages
    if (typeof document !== 'undefined') {
        document.cookie = "purchased=true; path=/; max-age=3600"; // 1 hour for preview
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
                {/* Always show success state for preview */}
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
                        href={downloadUrl}
                        className="block w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                        onClick={(e) => {
                            e.preventDefault();
                            alert('これはプレビュー画面です。実際のダウンロードは行われません。');
                        }}
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

                <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm max-w-lg">
                    <p className="font-bold">管理者用プレビューモード</p>
                    <p>これは購入完了ページの表示確認用画面です。実際の決済は行われていません。</p>
                    <div className="mt-2 flex gap-2 justify-center text-xs">
                        <Link href="/preview-thank-you?plan=basic" className="underline">Basic表示</Link>
                        <Link href="/preview-thank-you?plan=pro" className="underline">Pro表示</Link>
                        <Link href="/preview-thank-you?plan=premium" className="underline">Premium表示</Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default function PreviewThankYouPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
            <PreviewThankYouContent />
        </Suspense>
    );
}
