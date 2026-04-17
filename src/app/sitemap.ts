import { MetadataRoute } from 'next'
import { getItems } from '@/lib/items'

// トップのカテゴリナビと一致するキーワード一覧（SEO対象）
const CATEGORY_QUERIES = ['shoulder', 'hip', 'trunk', 'stretch', 'walking', 'stand']

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://jishutore-sozaiko.online'
    const items = getItems()

    const itemUrls = items.map((item) => ({
        url: `${baseUrl}/items/${item.id}/`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    const categoryUrls = CATEGORY_QUERIES.map((q) => ({
        url: `${baseUrl}/items/?q=${q}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.85,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/items/`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        ...categoryUrls,
        ...itemUrls,
    ]
}
