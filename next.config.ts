import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  output: "standalone",

  /* config options here */
};

const withNextIntl = createNextIntlPlugin(
  "./src/shared/configs/i18/request.ts"
);

export default withNextIntl(nextConfig);
