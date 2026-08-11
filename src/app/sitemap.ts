import { MetadataRoute } from 'next'
import { getItems } from '@/lib/items'
import { getColumnArticles, getColumnUrl } from '@/lib/column'
import { feeDomains, getAllFeeItems } from '@/lib/fee-check'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://jishutore-sozaiko.online'
    const items = getItems()
    const staticUpdatedAt = new Date('2026-07-10T00:00:00+09:00')

    const itemUrls = items.map((item) => ({
        url: `${baseUrl}/items/${item.id}/`,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))
    const feeDomainUrls = feeDomains.map((domain) => ({
        url: `${baseUrl}/fee-check/${domain.domain}/`,
        lastModified: new Date(
            domain.items.reduce(
                (latest, item) => item.lastVerified > latest ? item.lastVerified : latest,
                '2026-01-01',
            ),
        ),
        changeFrequency: 'weekly' as const,
        priority: 0.85,
    }))
    const allFeeItems = getAllFeeItems()
    const feeItemUrls = allFeeItems.map(({ domain, item }) => ({
        url: `${baseUrl}/fee-check/${domain.domain}/${item.id}/`,
        lastModified: new Date(item.lastVerified),
        changeFrequency: 'monthly' as const,
        priority: 0.75,
    }))
    // ハブは全項目の最新確認日を更新日とする（分野ページと同じ考え方）
    const feeCheckUpdatedAt = new Date(
        allFeeItems.reduce(
            (latest, { item }) => item.lastVerified > latest ? item.lastVerified : latest,
            '2026-01-01',
        ),
    )

    const columnArticles = getColumnArticles()
    const columnUrls = columnArticles.map((article) => ({
        url: `${baseUrl}${getColumnUrl(article.slug)}`,
        lastModified: new Date(article.updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))
    // 一覧の更新日は、最新記事の更新日と同じにする（新着順で並べているため）
    const columnIndexUpdatedAt = new Date(
        columnArticles.reduce(
            (latest, article) => article.updatedAt > latest ? article.updatedAt : latest,
            '2026-01-01',
        ),
    )

    return [
        {
            url: baseUrl,
            lastModified: staticUpdatedAt,
            changeFrequency: 'weekly' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/items/`,
            lastModified: staticUpdatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/items/swallowing-exercises/`,
            lastModified: staticUpdatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/items/seated-exercises/`,
            lastModified: staticUpdatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/items/hand-rehabilitation/`,
            lastModified: staticUpdatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/items/fall-prevention-exercises/`,
            lastModified: staticUpdatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/items/bed-mobility-exercises/`,
            lastModified: staticUpdatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/items/stroke-exercises/`,
            lastModified: staticUpdatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/items/upper-limb-exercises/`,
            lastModified: staticUpdatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/items/lower-limb-exercises/`,
            lastModified: staticUpdatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/items/trunk-exercises/`,
            lastModified: staticUpdatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/items/stretching-exercises/`,
            lastModified: staticUpdatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/items/walking-exercises/`,
            lastModified: staticUpdatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/products/`,
            lastModified: staticUpdatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/products/jishutore-plus/`,
            lastModified: staticUpdatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/fee-check/`,
            lastModified: feeCheckUpdatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/fee-check/editorial-policy/`,
            lastModified: new Date('2026-07-12T00:00:00+09:00'),
            changeFrequency: 'monthly' as const,
            priority: 0.65,
        },
        {
            // 非会員向けの組み合わせチェック説明ページ（会員はmiddlewareでハブへ転送）。
            // 「併算定 できない」系のクエリの受け皿になりうるので載せる。
            url: `${baseUrl}/plus/fee-check-combo/`,
            lastModified: new Date('2026-08-12T00:00:00+09:00'),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/products/day-service-exercise-pack/`,
            lastModified: staticUpdatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.85,
        },
        {
            url: `${baseUrl}/sponsor/`,
            lastModified: staticUpdatedAt,
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
        {
            url: `${baseUrl}/column/`,
            lastModified: columnIndexUpdatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        ...columnUrls,
        ...itemUrls,
        ...feeDomainUrls,
        ...feeItemUrls,
    ]
}
