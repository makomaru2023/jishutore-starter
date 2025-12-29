import { MetadataRoute } from 'next'
import { getItems } from '@/lib/items'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://self-training.pro-kinkin-sss.com'
    const items = getItems()

    const itemUrls = items.map((item) => ({
        url: `${baseUrl}/items/${item.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        ...itemUrls,
    ]
}
