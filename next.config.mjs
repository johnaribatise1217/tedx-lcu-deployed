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
};

export default nextConfig;
