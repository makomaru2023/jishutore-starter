'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { TrackedPlusMemberLink } from '@/components/TrackedPlusMemberLink';

export function HeaderDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 text-sm font-medium text-blue-100 hover:text-white transition-colors focus:outline-none"
            >
                各プラン素材
                <svg
                    className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute left-1/2 mt-2 w-48 -translate-x-1/2 rounded-lg bg-white py-2 shadow-xl ring-1 ring-black ring-opacity-5 z-50">
                    <Link
                        href="/free"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        onClick={() => setIsOpen(false)}
                    >
                        無料素材
                    </Link>
                    <Link
                        href="/basic"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        onClick={() => setIsOpen(false)}
                    >
                        Basic素材
                    </Link>
                    <Link
                        href="/pro"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        onClick={() => setIsOpen(false)}
                    >
                        Pro素材
                    </Link>
                    <Link
                        href="/products"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        onClick={() => setIsOpen(false)}
                    >
                        Premium素材
                    </Link>
                    <TrackedPlusMemberLink
                        placement="header"
                        className="block border-t border-gray-100 px-4 py-2 text-sm font-bold text-blue-700 hover:bg-blue-50 hover:text-blue-600"
                        onClick={() => setIsOpen(false)}
                    >
                        会員ページ
                    </TrackedPlusMemberLink>
                </div>
            )}
        </div>
    );
}
