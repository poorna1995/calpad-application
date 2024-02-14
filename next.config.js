/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["sfo3.digitaloceanspaces.com", "undefined"],
		loader: "default",
		formats: ["image/webp"],
		imageSizes: [200, 400, 100, 40, 800],
		deviceSizes: [360, 400, 500, 600, 800, 1000, 1200, 1400, 1600],
	},
	output: "standalone",
};

module.exports = nextConfig;
