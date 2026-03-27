/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 100],
    remotePatterns: [
      { protocol: "https", hostname: "*.scdn.co" },
      { protocol: "https", hostname: "*.spotifycdn.com" },
      { protocol: "https", hostname: "*.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
