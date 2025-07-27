import { QueryClient } from '@tanstack/react-query';

/**
 * Utility functions for cache invalidation
 */

export const invalidateProductCache = async (queryClient: QueryClient) => {
  try {
    // Invalidate all product-related queries
    await queryClient.invalidateQueries({
      queryKey: ['products'],
    });
    
    // Invalidate specific product queries
    await queryClient.invalidateQueries({
      queryKey: ['products', 'getMany'],
    });
    
    await queryClient.invalidateQueries({
      queryKey: ['products', 'getOne'],
    });
    
    console.log('✅ Product cache invalidated successfully');
  } catch (error) {
    console.error('❌ Failed to invalidate product cache:', error);
    throw error;
  }
};

export const invalidateCollectionCache = async (queryClient: QueryClient) => {
  try {
    // Invalidate all collection-related queries
    await queryClient.invalidateQueries({
      queryKey: ['collections'],
    });
    
    await queryClient.invalidateQueries({
      queryKey: ['collections', 'getMany'],
    });
    
    await queryClient.invalidateQueries({
      queryKey: ['collections', 'getOne'],
    });
    
    console.log('✅ Collection cache invalidated successfully');
  } catch (error) {
    console.error('❌ Failed to invalidate collection cache:', error);
    throw error;
  }
};

export const invalidateLayoutCache = async (queryClient: QueryClient) => {
  try {
    // Invalidate layout-related queries (navigation, hero images)
    await queryClient.invalidateQueries({
      queryKey: ['layout'],
    });
    
    await queryClient.invalidateQueries({
      queryKey: ['layout', 'getNavigationData'],
    });
    
    await queryClient.invalidateQueries({
      queryKey: ['layout', 'getHero'],
    });
    
    console.log('✅ Layout cache invalidated successfully');
  } catch (error) {
    console.error('❌ Failed to invalidate layout cache:', error);
    throw error;
  }
};

export const invalidateAllCache = async (queryClient: QueryClient) => {
  try {
    // Invalidate all queries (use sparingly)
    await queryClient.invalidateQueries();
    console.log('✅ All cache invalidated successfully');
  } catch (error) {
    console.error('❌ Failed to invalidate all cache:', error);
    throw error;
  }
};

export const refetchProductData = async (queryClient: QueryClient) => {
  try {
    // Refetch product data without invalidating cache
    await queryClient.refetchQueries({
      queryKey: ['products'],
    });
    console.log('✅ Product data refetched successfully');
  } catch (error) {
    console.error('❌ Failed to refetch product data:', error);
    throw error;
  }
};

/**
 * Cache keys for consistent invalidation
 */
export const CACHE_KEYS = {
  PRODUCTS: ['products'] as const,
  PRODUCTS_GET_MANY: ['products', 'getMany'] as const,
  PRODUCTS_GET_ONE: ['products', 'getOne'] as const,
  COLLECTIONS: ['collections'] as const,
  COLLECTIONS_GET_MANY: ['collections', 'getMany'] as const,
  COLLECTIONS_GET_ONE: ['collections', 'getOne'] as const,
  LAYOUT: ['layout'] as const,
  LAYOUT_NAVIGATION: ['layout', 'getNavigationData'] as const,
  LAYOUT_HERO: ['layout', 'getHero'] as const,
  LOOKBOOK: ['lookbook'] as const,
  LOOKBOOK_GET_MANY: ['lookbook', 'getMany'] as const,
} as const; 