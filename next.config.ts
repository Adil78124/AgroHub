import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // Для Vercel используем обычную сборку без статического экспорта
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Убираем basePath и assetPrefix для Vercel
  /* config options here */
};

const withNextIntl = createNextIntlPlugin(
  "./src/shared/configs/i18/request.ts"
);

export default withNextIntl(nextConfig);
