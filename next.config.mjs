/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['better-sqlite3'],
  images: {
    unoptimized: true,
  },

  /**
   * Coming-soon phase: redirect all known sub-routes back to the homepage.
   * Remove this block when the full site is ready to launch.
   */
  async redirects() {
    const comingSoonRoutes = [
      '/for-brands',
      '/for-creators',
      '/for-small-business',
      '/corporate',
      '/careers',
      '/book',
      '/admin',
    ];

    return comingSoonRoutes.map((source) => ({
      source,
      destination: '/',
      permanent: false, // 307 — temporary, so search engines don't cache it permanently
    }));
  },
};

export default nextConfig;
