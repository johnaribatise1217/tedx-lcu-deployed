// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**',
            },

            {
                protocol: 'https',
                hostname: 'tedx-lcu-admin-deployed.vercel.app',
                pathname: '/**',
            },
        ],
    },
    // SEO and Performance optimizations
    compress: true,
    poweredByHeader: false,
    generateEtags: true,

    // Headers for better SEO and security
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                ],
            },
            {
                source: '/sitemap.xml',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'application/xml',
                    },
                ],
            },
            {
                source: '/robots.txt',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'text/plain',
                    },
                ],
            },
        ];
    },

    // Redirects for SEO (if needed)
    async redirects() {
        return [
            // Add any redirects here if needed
        ];
    },
};

export default nextConfig;
