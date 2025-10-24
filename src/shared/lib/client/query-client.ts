import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: false,
      retry: 3,
      gcTime: 1000 * 60 * 5,
    },
    mutations: {
      retry: 1,
    },
  },
});
