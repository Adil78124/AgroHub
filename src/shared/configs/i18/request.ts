// Для статического экспорта используем клиентскую конфигурацию
import { getRequestConfig } from "next-intl/server";
import { routing } from "@i18/routing";

export default getRequestConfig(async ({ locale }) => {
  const validLocale = locale || routing.defaultLocale;
  return {
    locale: validLocale,
    messages: (await import(`../../../../messages/${validLocale}.json`)).default,
  };
});
