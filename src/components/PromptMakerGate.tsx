'use client';

import { useEffect, useState, FormEvent, ReactNode } from 'react';

const STORAGE_KEY = 'prompt-maker-unlocked';

export function PromptMakerGate({ children }: { children: ReactNode }) {
    const [unlocked, setUnlocked] = useState(false);
    const [checked, setChecked] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === 'true') {
            setUnlocked(true);
        }
        setChecked(true);
    }, []);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/prompt-maker-auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            if (res.ok) {
                localStorage.setItem(STORAGE_KEY, 'true');
                setUnlocked(true);
            } else {
                setError('パスワードが違います。');
            }
        } catch {
            setError('通信エラーが発生しました。もう一度お試しください。');
        } finally {
            setLoading(false);
        }
    }

    if (!checked) return null;
    if (unlocked) return <>{children}</>;

    return (
        <div className="max-w-md mx-auto bg-white rounded-3xl border-2 border-slate-200 shadow-sm p-8 sm:p-10">
            <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-8 h-8 text-slate-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 tracking-tight">
                    note購入者限定ページ
                </h2>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    note記事に記載されているパスワードを
                    <br />
                    入力してください。
                </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="パスワード"
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-teal-400 focus:outline-none text-base font-medium"
                    autoFocus
                />
                {error && (
                    <p className="text-sm text-rose-500 font-bold">{error}</p>
                )}
                <button
                    type="submit"
                    disabled={loading || !password}
                    className="w-full py-3 rounded-xl bg-teal-500 text-white font-black text-base hover:bg-teal-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? '確認中...' : 'ロックを解除'}
                </button>
            </form>
            <p className="text-xs text-slate-400 font-medium text-center mt-6">
                パスワードはnote記事内に記載されています。
            </p>
        </div>
    );
}
