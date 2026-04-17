'use client';

import { Suspense, useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Item } from '@/types';
import { ItemCard } from '@/components/ItemCard';

interface FilteredItemListProps {
    items: Item[];
}

function FilteredItemListInner({ items }: FilteredItemListProps) {
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(() => searchParams.get('q') || '');

    useEffect(() => {
        const q = searchParams.get('q') || '';
        setSearchQuery(q);
    }, [searchParams]);

    const filteredItems = useMemo(() => {
        if (!searchQuery.trim()) return items;

        const query = searchQuery.toLowerCase().trim();
        const keywords = query.split(/\s+/); // Split by whitespace for multiple keywords

        return items.filter((item) => {
            const titleEn = item.title.toLowerCase();
            const titleJa = item.titleJa?.toLowerCase() || '';
            const fileName = item.fileName.toLowerCase();

            // Check if ALL keywords match at least one of the fields (AND search)
            return keywords.every(keyword =>
                titleEn.includes(keyword) ||
                titleJa.includes(keyword) ||
                fileName.includes(keyword)
            );
        });
    }, [items, searchQuery]);

    return (
        <div>
            <div className="mb-8 max-w-md mx-auto">
                <div className="relative shadow-sm rounded-full overflow-hidden border border-slate-200 focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500 transition-all">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-12 pr-4 py-3.5 border-none bg-white placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-0 sm:text-base font-medium"
                        placeholder="キーワードで検索（例: 肩, スクワット）"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                {searchQuery && (
                    <p className="mt-2 text-sm text-gray-500 text-center">
                        {filteredItems.length} 件見つかりました
                    </p>
                )}
            </div>

            {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredItems.map((item) => (
                        <ItemCard key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 text-slate-500 bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <div className="text-4xl mb-4">🔍</div>
                    <p className="font-bold text-lg text-slate-700">見つかりませんでした</p>
                    <p className="mt-2 text-sm">別のキーワードでお試しください。</p>
                </div>
            )}
        </div>
    );
}

export function FilteredItemList(props: FilteredItemListProps) {
    return (
        <Suspense fallback={null}>
            <FilteredItemListInner {...props} />
        </Suspense>
    );
}
