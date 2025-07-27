import { useQueryClient } from '@tanstack/react-query';
import { invalidateProductCache, invalidateCollectionCache, invalidateLayoutCache } from '@/lib/cache-utils';

export const useCacheInvalidation = () => {
  const queryClient = useQueryClient();

  const invalidateProducts = async () => {
    await invalidateProductCache(queryClient);
  };

  const invalidateCollections = async () => {
    await invalidateCollectionCache(queryClient);
  };

  const invalidateLayout = async () => {
    await invalidateLayoutCache(queryClient);
  };

  const invalidateAll = async () => {
    await queryClient.invalidateQueries();
  };

  const refetchProducts = async () => {
    await queryClient.refetchQueries({
      queryKey: ['products'],
    });
  };

  const refetchCollections = async () => {
    await queryClient.refetchQueries({
      queryKey: ['collections'],
    });
  };

  const refetchLayout = async () => {
    await queryClient.refetchQueries({
      queryKey: ['layout'],
    });
  };

  return {
    invalidateProducts,
    invalidateCollections,
    invalidateLayout,
    invalidateAll,
    refetchProducts,
    refetchCollections,
    refetchLayout,
  };
}; 