'use client';

import { useCallback, useEffect, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';

export type PopularCarouselItem = {
  id: string;
  imageUrl: string;
  titleJa: string;
};

type PopularItemsCarouselProps = {
  items: PopularCarouselItem[];
};

const getAutoplayRootNode = (emblaRoot: HTMLElement) => emblaRoot.parentElement;

export function PopularItemsCarousel({ items }: PopularItemsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: 'start', loop: true, slidesToScroll: 1 },
    [
      Autoplay({
        delay: 4000,
        playOnInit: true,
        rootNode: getAutoplayRootNode,
        stopOnFocusIn: true,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const updateCarouselState = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    updateCarouselState();
    emblaApi.on('select', updateCarouselState);
    emblaApi.on('reInit', updateCarouselState);

    return () => {
      emblaApi.off('select', updateCarouselState);
      emblaApi.off('reInit', updateCarouselState);
    };
  }, [emblaApi, updateCarouselState]);

  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = emblaApi.plugins().autoplay;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionPreference = (event: MediaQueryListEvent) => {
      if (event.matches) {
        autoplay.stop();
      } else {
        autoplay.play();
      }
    };

    if (motionQuery.matches) autoplay.stop();
    motionQuery.addEventListener('change', handleMotionPreference);

    return () => {
      motionQuery.removeEventListener('change', handleMotionPreference);
    };
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      emblaApi.plugins().autoplay.reset();
    },
    [emblaApi],
  );

  if (items.length === 0) return null;

  return (
    <div aria-label="人気のイラスト" aria-roledescription="カルーセル" role="region">
      <div className="-my-3 overflow-hidden py-3" ref={emblaRef}>
        <div className="-ml-3 flex touch-pan-y">
          {items.map((item, index) => {
            const displayTitle = item.titleJa.replace(/【文字あり】$/, '');

            return (
              <div
                aria-label={`${index + 1} / ${items.length}`}
                aria-roledescription="スライド"
                className="min-w-0 flex-[0_0_80%] pl-3 sm:flex-[0_0_46%] lg:flex-[0_0_25%] xl:flex-[0_0_23%]"
                key={item.id}
                role="group"
              >
                <Link
                  aria-label={`${item.titleJa}の素材を見る`}
                  className="group block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                  href={`/items/${item.id}`}
                >
                  <article className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg">
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
                      <Image
                        alt={item.titleJa}
                        className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.03]"
                        fill
                        sizes="(max-width: 639px) 80vw, (max-width: 1023px) 46vw, (max-width: 1279px) 25vw, 23vw"
                        src={item.imageUrl}
                      />
                      <span className="absolute right-2.5 top-2.5 rounded-full bg-blue-600 px-2.5 py-1 text-xs font-black text-white shadow-sm">
                        人気
                      </span>
                    </div>
                    <div className="flex min-h-16 items-center justify-center bg-blue-600 px-3 py-2.5">
                      <h3 className="jp-heading line-clamp-2 text-center text-sm font-black leading-5 text-white sm:text-base sm:leading-6">
                        {displayTitle}
                      </h3>
                    </div>
                  </article>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div aria-label="スライドを選ぶ" className="mt-5 flex justify-center" role="group">
        {scrollSnaps.map((_, index) => {
          const isSelected = index === selectedIndex;

          return (
            <button
              aria-current={isSelected ? 'true' : undefined}
              aria-label={`${index + 1}枚目の素材へ移動`}
              className="flex h-8 w-7 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              key={index}
              onClick={() => scrollTo(index)}
              type="button"
            >
              <span
                className={`block h-2.5 rounded-full transition-all ${
                  isSelected ? 'w-5 bg-blue-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
