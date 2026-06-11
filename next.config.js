const nextConfig = {
  trailingSlash: true,
  // Pin the workspace root to this project so Next.js doesn't mistakenly infer
  // the home directory (where a stray package-lock.json exists) as the root.
  turbopack: {
    root: __dirname,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'pub-00b4caa7ca60422fa31c5d5d0d6772c3.r2.dev', pathname: '/**' }
    ]
  },
  async redirects() {
    return [
      {
        source: '/free',
        destination: '/items',
        permanent: true,
      },
      {
        source: '/basic',
        destination: '/items',
        permanent: true,
      },
      {
        source: '/pro',
        destination: '/items',
        permanent: true,
      },
      {
        source: '/pricing',
        destination: '/items',
        permanent: true,
      },
      {
        source: '/）を運営しております',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/premium',
        destination: '/products/self-training-materials',
        permanent: true,
      },
      {
        // 旧プロンプトメーカーURL → 新商品LPへ 301
        source: '/ai-prompt-maker',
        destination: '/products/slide-prompt-generator',
        permanent: true,
      },
    ];
  },
};
module.exports = nextConfig;
