/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['10.4.150.56',], // 添加主机名，以允许 Next.js 处理该主机名下的图像
  },
  reactStrictMode: false,
};

export default nextConfig;
