"use client";

import { ReactNode } from "react";

import { queryClient } from "@/shared/lib/client";

import { QueryClientProvider } from "@tanstack/react-query";

/**
 * QueryProvider - компонент для предоставления QueryClient в React-приложении.
 *
 * @param {Object} props - Пропсы компонента.
 * @param {ReactNode} props.children - Дочерние компоненты, которые будут обернуты в QueryClientProvider.
 * @returns {JSX.Element} QueryClientProvider, оборачивающий дочерние компоненты.
 */
export function QueryProvider({
  children,
}: {
  children: ReactNode;
}): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
