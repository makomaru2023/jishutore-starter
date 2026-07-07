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
        {
            url: `${baseUrl}/items/swallowing-exercises/`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/items/seated-exercises/`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/items/hand-rehabilitation/`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/items/fall-prevention-exercises/`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/items/bed-mobility-exercises/`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/items/stroke-exercises/`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/items/upper-limb-exercises/`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/items/lower-limb-exercises/`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/items/trunk-exercises/`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/items/stretching-exercises/`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/items/walking-exercises/`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/products/self-training-materials/`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.95,
        },
        {
            url: `${baseUrl}/products/jishutore-plus/`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/products/day-service-exercise-pack/`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.85,
        },
        {
            url: `${baseUrl}/sponsor/`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
        ...itemUrls,
    ]
}
