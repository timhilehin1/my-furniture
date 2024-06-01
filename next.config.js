/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
				pathname: "**",
			},

			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "s.gravatar.com",
				pathname: "**",
			},
		],
	},
};

module.exports = nextConfig;
