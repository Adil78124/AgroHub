import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { defaultLocale } from "@/shared/consts";

/**
 * Middleware для обработки редиректов на дефолтную локаль
 *
 * @param request - NextRequest объект
 * @returns NextResponse с редиректом или продолжением
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Если это корневой путь, редиректим на дефолтную локаль
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }
  
  // Если это путь без локали (например /farmer), добавляем дефолтную локаль
  if (!pathname.startsWith("/ru") && !pathname.startsWith("/kk") && !pathname.startsWith("/_next") && !pathname.startsWith("/favicon")) {
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
