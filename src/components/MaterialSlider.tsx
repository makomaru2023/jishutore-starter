'use client'

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'
import Image from 'next/image'
import { Item } from '@/types'

type PropType = {
    items: Item[]
    options?: any
}

export function MaterialSlider(props: PropType) {
    const { items, options } = props
    const [emblaRef] = useEmblaCarousel(options, [
        Autoplay({ playOnInit: true, delay: 4000 })
    ])

    if (!items || items.length === 0) return null;

    const getImageUrl = (path: string) => {
        if (!path) return '/placeholder.png';
        if (path.startsWith("https://")) return path;

        const R2_DOMAIN = "https://pub-00b4caa7ca60422fa31c5d5d0d6772c3.r2.dev";
        // Encode each path segment so spaces/parentheses become valid URL characters.
        const encodedPath = path.split("/").map(encodeURIComponent).join("/");
        return `${R2_DOMAIN}/${encodedPath}`;
    }

    return (
        <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex">
                {items.map((item) => (
                    <div className="embla__slide flex-[0_0_80%] min-w-0 sm:flex-[0_0_45%] md:flex-[0_0_35%] lg:flex-[0_0_28%] pl-4" key={item.id}>
                        <Link href={`/items/${item.id}`} className="block h-full group">
                            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                                {/* Image Area */}
                                <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
                                    <Image
                                        src={getImageUrl(item.previewSrc)}
                                        alt={item.titleJa || item.title}
                                        fill
                                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                                        sizes="(max-width: 768px) 80vw, (max-width: 1200px) 45vw, 30vw"
                                    />
                                    <div className="absolute top-2 right-2">
                                        <span className="inline-block px-2 py-1 rounded-md text-xs font-bold bg-white text-blue-600 shadow-sm border border-blue-100">
                                            Free
                                        </span>
                                    </div>
                                </div>

                                {/* Text Area */}
                                <div className="p-4 flex-grow flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {item.titleJa || item.title}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
