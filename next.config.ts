import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // output: "export", // Убираем для поддержки middleware и динамических страниц
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/AgroHub' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/AgroHub/' : '',

  /* config options here */
};

const withNextIntl = createNextIntlPlugin(
  "./src/shared/configs/i18/request.ts"
);

export default withNextIntl(nextConfig);
