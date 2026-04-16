import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/ai-prompt-maker/', '/line-tokuten-members/', '/line-tokuten/'],
        },
        sitemap: 'https://jishutore-sozaiko.online/sitemap.xml',
    }
}
