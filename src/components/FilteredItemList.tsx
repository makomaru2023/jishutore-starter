'use client';

import { useState, useMemo } from 'react';
import { Item } from '@/types';
import { ItemCard } from '@/components/ItemCard';

interface FilteredItemListProps {
    items: Item[];
}

export function FilteredItemList({ items }: FilteredItemListProps) {
    const [searchQuery, setSearchQuery] = useState('');

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
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                <div className="text-center py-12 text-gray-500">
                    条件に一致する素材は見つかりませんでした。
                </div>
            )}
        </div>
    );
}
