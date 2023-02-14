/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    storyblokApiToken: process.env.STORYBLOK_API_TOKEN,
    storyblockOathToken: process.env.STORYBLOK_OATH_TOKEN,
  },
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
