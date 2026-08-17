const nextConfig = {
  trailingSlash: true,
  // Plus 合体DL API (/api/plus/download) が実行時に読む元PPTX一式を、
  // Vercel の関数バンドルに確実に同梱する（fs 読み込みは自動追跡されないため明示）。
  outputFileTracingRoot: __dirname,
  outputFileTracingIncludes: {
    '/api/plus/download': ['./plus-source/**/*'],
  },
  // Pin the workspace root to this project so Next.js doesn't mistakenly infer
  // the home directory (where a stray package-lock.json exists) as the root.
  turbopack: {
    root: __dirname,
  },
  images: {
    unoptimized: true,
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
        destination: '/products/jishutore-plus',
        permanent: true,
      },
      {
        source: '/products/self-training-materials',
        destination: '/products/jishutore-plus',
        permanent: true,
      },
      {
        source: '/products/home-elderly-self-training',
        destination: '/products/jishutore-plus',
        permanent: true,
      },
      {
        source: '/products/slide-prompt-generator',
        destination: '/products/jishutore-plus',
        permanent: true,
      },
      {
        // 旧プロンプトメーカーURL → Plus LPへ 301
        source: '/ai-prompt-maker',
        destination: '/products/jishutore-plus',
        permanent: true,
      },
    ];
  },
};
module.exports = nextConfig;
