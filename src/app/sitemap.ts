import { MetadataRoute } from 'next'
import { getItems } from '@/lib/items'
import { getColumnArticles, getColumnUrl } from '@/lib/column'
import { feeDomains, getAllFeeItems } from '@/lib/fee-check'
import { PLUS_SIGNUP_PAUSED } from '@/constants/plus-availability'
import { getSitemapJobs, getJobUrl } from '@/lib/jobs'
import { JOB_POSTING_LP_INDEXABLE } from '@/constants/jobs'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://jishutore-sozaiko.online'
    const items = getItems()
    const staticUpdatedAt = new Date('2026-07-10T00:00:00+09:00')

    const itemUrls = items.map((item) => ({
        url: `${baseUrl}/items/${item.id}/`,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))
    // 未確認（lastVerified が null）の項目は更新日の判定から外す。
    // 日付が無いものを今日扱いにすると、確認していない項目を「更新済み」と伝えてしまう。
    const latestVerified = (dates: (string | null)[]) =>
        dates.reduce<string>(
            (latest, value) => (value && value > latest ? value : latest),
            '2026-01-01',
        )

    const feeDomainUrls = feeDomains.map((domain) => ({
        url: `${baseUrl}/fee-check/${domain.domain}/`,
        lastModified: new Date(
            latestVerified(domain.items.map((item) => item.lastVerified)),
        ),
        changeFrequency: 'weekly' as const,
        priority: 0.85,
    }))
    const allFeeItems = getAllFeeItems()
    const feeItemUrls = allFeeItems.map(({ domain, item }) => ({
        url: `${baseUrl}/fee-check/${domain.domain}/${item.id}/`,
        lastModified: new Date(latestVerified([item.lastVerified])),
        changeFrequency: 'monthly' as const,
        priority: 0.75,
    }))
    // ハブは全項目の最新確認日を更新日とする（分野ページと同じ考え方）
    const feeCheckUpdatedAt = new Date(
        latestVerified(allFeeItems.map(({ item }) => item.lastVerified)),
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
    // 公開・index可能・canonical設定済みの固定ページ。
    // Bingが重要ページをsitemap外として検出しないよう、商品・信頼・スポンサー関連も明示する。
    const additionalPublicUrls = [
        { path: '/about/', lastModified: '2026-02-05', changeFrequency: 'yearly' as const, priority: 0.5 },
        { path: '/contact/', lastModified: '2026-07-19', changeFrequency: 'yearly' as const, priority: 0.4 },
        { path: '/faq/', lastModified: '2026-06-14', changeFrequency: 'monthly' as const, priority: 0.6 },
        { path: '/license/', lastModified: '2026-07-22', changeFrequency: 'yearly' as const, priority: 0.5 },
        { path: '/privacy/', lastModified: '2026-01-04', changeFrequency: 'yearly' as const, priority: 0.3 },
        { path: '/tokushoho/', lastModified: '2026-08-19', changeFrequency: 'yearly' as const, priority: 0.3 },
        { path: '/products/home-elderly-self-training/', lastModified: '2026-07-20', changeFrequency: 'monthly' as const, priority: 0.7 },
        { path: '/products/self-training-materials/', lastModified: '2026-07-20', changeFrequency: 'monthly' as const, priority: 0.7 },
        { path: '/products/slide-prompt-generator/', lastModified: '2026-07-20', changeFrequency: 'monthly' as const, priority: 0.7 },
        { path: '/sponsor/terms/', lastModified: '2026-09-02', changeFrequency: 'yearly' as const, priority: 0.4 },
        { path: '/sponsor/detail-sponsor/', lastModified: '2026-06-08', changeFrequency: 'monthly' as const, priority: 0.4 },
        { path: '/sponsor/page-sponsor/', lastModified: '2026-06-08', changeFrequency: 'monthly' as const, priority: 0.4 },
        { path: '/sponsor/premium-sponsor/', lastModified: '2026-06-06', changeFrequency: 'monthly' as const, priority: 0.4 },
    ].map((page) => ({
        url: `${baseUrl}${page.path}`,
        lastModified: new Date(`${page.lastModified}T00:00:00+09:00`),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
    }))

    // 求人（/jobs/）。掲載中の求人だけを載せる。
    // 掲載サンプル（架空求人）と掲載終了した求人は getSitemapJobs 側で除いている。
    // 終了求人を検索結果に残さないための、Googleのガイドラインに沿った扱い。
    const jobUrls = getSitemapJobs().map((job) => ({
        url: `${baseUrl}${getJobUrl(job.slug)}`,
        lastModified: new Date(`${job.publishedAt}T00:00:00+09:00`),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    // ★2026-08-22：Plusの新規受付停止中は、販売系のURLを sitemap から外す。
    //   ページ側は noindex にしてあるので、載せ続けると指示が食い違う。
    //   再開時は PLUS_SIGNUP_PAUSED を false にすれば自動で戻る。
    const plusSalesUrls = PLUS_SIGNUP_PAUSED
        ? []
        : [
            {
                url: `${baseUrl}/products/jishutore-plus/`,
                lastModified: staticUpdatedAt,
                changeFrequency: 'weekly' as const,
                priority: 0.9,
            },
            {
                // 非会員向けの組み合わせチェック説明ページ。
                // 「併算定 できない」系のクエリの受け皿になりうるので載せる。
                url: `${baseUrl}/plus/fee-check-combo/`,
                lastModified: new Date('2026-08-12T00:00:00+09:00'),
                changeFrequency: 'monthly' as const,
                priority: 0.7,
            },
        ]

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
            url: `${baseUrl}/fee-check/`,
            lastModified: feeCheckUpdatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/fee-check/editorial-policy/`,
            lastModified: new Date('2026-08-19T00:00:00+09:00'),
            changeFrequency: 'monthly' as const,
            priority: 0.65,
        },
        {
            url: `${baseUrl}/products/day-service-exercise-pack/`,
            lastModified: staticUpdatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.85,
        },
        {
            url: `${baseUrl}/jobs/`,
            lastModified: new Date('2026-08-26T00:00:00+09:00'),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        },
        // 求人掲載LP・求人掲載規約は noindex の間 sitemap にも載せない（指示が食い違わないように）
        ...(JOB_POSTING_LP_INDEXABLE
            ? [
                {
                    url: `${baseUrl}/jobs/posting/`,
                    lastModified: new Date('2026-08-26T00:00:00+09:00'),
                    changeFrequency: 'monthly' as const,
                    priority: 0.5,
                },
                {
                    url: `${baseUrl}/jobs/terms/`,
                    lastModified: new Date('2026-09-02T00:00:00+09:00'),
                    changeFrequency: 'yearly' as const,
                    priority: 0.4,
                },
            ]
            : []),
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
        ...jobUrls,
        ...plusSalesUrls,
        ...additionalPublicUrls,
        ...columnUrls,
        ...itemUrls,
        ...feeDomainUrls,
        ...feeItemUrls,
    ]
}
