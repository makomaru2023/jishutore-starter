const nextConfig = {
  trailingSlash: true,
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
    ];
  },
};
module.exports = nextConfig;
