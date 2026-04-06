import { MetadataRoute } from 'next'
import { getItems } from '@/lib/items'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://jishutore-sozaiko.online'
    const items = getItems()

    const itemUrls = items.map((item) => ({
        url: `${baseUrl}/items/${item.id}/`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
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
        ...itemUrls,
    ]
}
