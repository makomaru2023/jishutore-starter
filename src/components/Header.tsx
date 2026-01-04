'use client';

import Link from "next/link";
import { useState } from "react";

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-blue-700 bg-blue-600 text-white shadow-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-lg font-bold">自主トレ素材庫</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/items" className="text-sm font-bold text-white hover:text-blue-100 transition-colors">
                        素材一覧
                    </Link>

                    <Link href="/faq" className="text-sm font-medium text-blue-100 hover:text-white transition-colors">
                        よくある質問
                    </Link>
                    <Link href="/license" className="text-sm font-medium text-blue-100 hover:text-white transition-colors">
                        ライセンス
                    </Link>
                    <Link href="/contact" className="text-sm font-medium text-blue-100 hover:text-white transition-colors">
                        お問合せ
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-white hover:text-gray-200 focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-blue-500 bg-blue-600">
                    <div className="container mx-auto px-4 py-4 space-y-2">
                        <Link
                            href="/items"
                            className="block py-2 text-base font-medium text-white hover:bg-blue-700 rounded px-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            素材一覧
                        </Link>

                        <Link
                            href="/faq"
                            className="block py-2 text-base font-medium text-white hover:bg-blue-700 rounded px-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            よくある質問
                        </Link>
                        <Link
                            href="/license"
                            className="block py-2 text-base font-medium text-white hover:bg-blue-700 rounded px-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            ライセンス
                        </Link>
                        <Link
                            href="/contact"
                            className="block py-2 text-base font-medium text-white hover:bg-blue-700 rounded px-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            お問合せ
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}

