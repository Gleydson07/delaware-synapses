/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // styledComponents: true,
    styledComponents: {
      ssr: true,
    },
  },
};

export default nextConfig;
