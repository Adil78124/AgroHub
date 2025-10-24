import { redirect } from "next/navigation";

import { defaultLocale } from "@/shared/consts";

/**
 * Главная страница - редирект на дефолтную локаль
 */
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
