'use client';

import { CategoryDropdown } from "@/components/CategoryDropdown";
import Link from "next/link";
import { useState } from "react";

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900 text-white shadow-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="text-xl font-black tracking-tight group-hover:text-teal-400 transition-colors">自主トレ素材庫</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <CategoryDropdown />

                    <a href="https://note.com/jisyutore" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">
                        note
                    </a>

                    <Link href="/ai-prompt-maker" className="text-sm font-bold text-slate-300 hover:text-white transition-colors flex items-center gap-1">
                        <span>🔒</span>
                        プロンプトメーカー
                    </Link>

                    <Link href="/#line" className="ml-2 px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-1.5 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30" style={{ backgroundColor: '#06C755', color: '#fff' }}>
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                        </svg>
                        LINE友だち追加
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-slate-800 bg-slate-900 shadow-xl absolute w-full left-0">
                    <div className="container mx-auto px-4 py-6 space-y-4">
                        <Link
                            href="/items"
                            className="block py-3 px-4 text-base font-bold text-white bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            すべての素材を探す
                        </Link>
                        <Link
                            href="/#line"
                            className="flex items-center justify-center gap-2 py-3 px-4 text-base font-bold text-white rounded-xl transition-colors"
                            style={{ backgroundColor: '#06C755' }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                            </svg>
                            LINE友だち追加
                        </Link>
                        <div className="space-y-1 pt-2">
                            <Link
                                href="/items?category=plain"
                                className="block py-2 text-sm font-bold text-slate-300 hover:text-white px-4"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                文字なし素材
                            </Link>
                            <Link
                                href="/items?category=text"
                                className="block py-2 text-sm font-bold text-slate-300 hover:text-white px-4"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                文字あり素材
                            </Link>
                        </div>
                        <div className="pt-4 border-t border-slate-800 space-y-1">
                            <a
                                href="https://note.com/jisyutore"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block py-2 text-sm font-bold text-slate-300 hover:text-white px-4"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                note
                            </a>
                            <Link
                                href="/ai-prompt-maker"
                                className="block py-2 text-sm font-bold text-slate-300 hover:text-white px-4"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                🔒 プロンプトメーカー（note購入者限定）
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

