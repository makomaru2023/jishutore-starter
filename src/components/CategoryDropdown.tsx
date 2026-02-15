'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

function CategoryLinks({ onClose }: { onClose: () => void }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Determine current active state
    const currentCategory = searchParams.get('category');
    const isItemsPage = pathname === '/items';

    return (
        <>
            <Link
                href="/items"
                className={`block px-4 py-3 text-sm hover:bg-blue-50 hover:text-blue-600 border-b border-gray-100 last:border-0 ${isItemsPage && !currentCategory ? 'text-blue-600 font-bold bg-blue-50' : 'text-gray-700'
                    }`}
                onClick={onClose}
            >
                すべての素材
            </Link>
            <Link
                href="/items?category=plain"
                className={`block px-4 py-3 text-sm hover:bg-blue-50 hover:text-blue-600 border-b border-gray-100 last:border-0 ${currentCategory === 'plain' ? 'text-blue-600 font-bold bg-blue-50' : 'text-gray-700'
                    }`}
                onClick={onClose}
            >
                文字なし素材 (Plain)
            </Link>
            <Link
                href="/items?category=text"
                className={`block px-4 py-3 text-sm hover:bg-blue-50 hover:text-blue-600 ${currentCategory === 'text' ? 'text-blue-600 font-bold bg-blue-50' : 'text-gray-700'
                    }`}
                onClick={onClose}
            >
                文字あり素材 (With Text)
            </Link>
        </>
    );
}

export function CategoryDropdown() {
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

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleOpen}
                className="flex items-center gap-1 text-sm font-bold text-white hover:text-blue-100 transition-colors focus:outline-none"
                aria-expanded={isOpen}
            >
                素材一覧
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
                <div className="absolute left-0 mt-2 w-56 rounded-lg bg-white py-2 shadow-xl ring-1 ring-black ring-opacity-5 z-50">
                    <Suspense fallback={<div className="p-4 text-sm text-gray-500">Loading...</div>}>
                        <CategoryLinks onClose={() => setIsOpen(false)} />
                    </Suspense>
                </div>
            )}
        </div>
    );
}
