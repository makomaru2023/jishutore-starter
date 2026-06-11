import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/line-tokuten-members/', '/line-tokuten/', '/member/'],
        },
        sitemap: 'https://jishutore-sozaiko.online/sitemap.xml',
    }
}
