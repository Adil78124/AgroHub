import { defineRouting } from "next-intl/routing";

import { defaultLocale, locales } from "@/shared/consts";

export const routing = defineRouting({
  locales: locales,
  defaultLocale: defaultLocale,
});
