import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from '@tanstack/react-query';
import superjson from 'superjson';

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Increase stale time to 5 minutes for better caching
        staleTime: 5 * 60 * 1000, // 5 minutes
        // Set cache time to 10 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
        // Retry failed requests
        retry: 2,
        // Refetch on window focus for critical data
        refetchOnWindowFocus: true,
        // Refetch on reconnect
        refetchOnReconnect: true,
      },
      mutations: {
        // Retry failed mutations
        retry: 1,
      },
      dehydrate: {
        serializeData: superjson.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
      hydrate: {
        deserializeData: superjson.deserialize,
      },
    },
  });
}