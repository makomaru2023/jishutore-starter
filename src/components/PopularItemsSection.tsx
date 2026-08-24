import Link from 'next/link';
import { FREE_MATERIAL_COUNT_LABEL } from '@/constants/content-counts';
import { getItemImageUrl, getItems } from '@/lib/items';
import { PopularItemsCarousel, type PopularCarouselItem } from './PopularItemsCarousel';

const POPULAR_ITEM_IDS = [
  'squat-premium-text',
  'draw-in-premium-text',
  'ankle-dorsiflexion-and-plantarflexion-premium-text',
  'scapular-retraction-exercise-premium-text',
  'cane-walking-premium-text',
  'air-bike-premium-text',
  'hip-lift-premium-text',
  'chest-opening-with-stretch-pole-premium-text',
  'heel-raise-premium-text',
  'cat-and-dog-premium-text',
] as const;

function getPopularItems(): PopularCarouselItem[] {
  const itemsById = new Map(getItems().map((item) => [item.id, item]));

  return POPULAR_ITEM_IDS.flatMap((id) => {
    const item = itemsById.get(id);
    if (!item) return [];

    return [
      {
        id: item.id,
        imageUrl: getItemImageUrl(item.previewSrc),
        titleJa: item.titleJa ?? item.title,
      },
    ];
  });
}

export function PopularItemsSection() {
  const popularItems = getPopularItems();
  if (popularItems.length === 0) return null;

  return (
    <section className="border-b border-slate-200 bg-slate-50 py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs font-black tracking-widest text-blue-700">人気の素材</p>
            <h2 className="jp-heading mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
              <span className="inline-block sm:whitespace-nowrap">よくダウンロード</span>
              <span className="inline-block sm:whitespace-nowrap">されているイラスト</span>
            </h2>
            <p className="jp-text mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              <span className="inline-block">運動名と説明つきの文字あり版なので、</span>
              <span className="inline-block">印刷してそのまま患者さんに渡せます。</span>
              <span className="inline-block">文字を自由に入れられる文字なし版も、</span>
              <span className="inline-block">各素材ページからダウンロードできます。</span>
            </p>
          </div>

          <div className="mt-8">
            <PopularItemsCarousel items={popularItems} />
          </div>

          <div className="mt-6 text-center">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-blue-700 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              href="/items"
            >
              {FREE_MATERIAL_COUNT_LABEL}を見る
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
