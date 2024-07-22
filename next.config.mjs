/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {

        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'hdgpxktsxhhpdrvhlwsa.supabase.co',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'th.bing.com',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
