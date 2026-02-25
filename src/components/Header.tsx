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

                    <Link href="/faq" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">
                        よくある質問
                    </Link>
                    <Link href="/license" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">
                        ライセンス
                    </Link>
                    <Link href="/contact" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">
                        お問合せ
                    </Link>

                    {/* Primary CTA Button matching reference site */}
                    <Link href="/items" className="ml-2 px-6 py-2 rounded-full bg-teal-500 text-white text-sm font-bold hover:bg-teal-400 hover:shadow-lg hover:shadow-teal-500/30 transition-all">
                        素材を探す
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
                            <Link
                                href="/faq"
                                className="block py-2 text-sm font-bold text-slate-300 hover:text-white px-4"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                よくある質問
                            </Link>
                            <Link
                                href="/license"
                                className="block py-2 text-sm font-bold text-slate-300 hover:text-white px-4"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                ライセンス
                            </Link>
                            <Link
                                href="/contact"
                                className="block py-2 text-sm font-bold text-slate-300 hover:text-white px-4"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                お問合せ
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

