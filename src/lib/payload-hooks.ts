/**
 * Utility function for Payload CMS hooks to invalidate cache
 */

export const createCacheInvalidationHook = (collectionName: string) => {
  return async ({ doc, operation }: { doc: Record<string, string>; operation: string }) => {
    try {
      console.log(`🔄 Invalidating cache for ${collectionName} (${operation})`);

      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/webhooks/payload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collection: collectionName,
          operation,
          docId: doc.id,
        }),
      });

      if (!response.ok) {
        console.error(`❌ Failed to invalidate cache for ${collectionName}`);
      } else {
        console.log(`✅ Cache invalidated for ${collectionName}`);
      }
    } catch (error) {
      console.error(`❌ Error invalidating cache for ${collectionName}:`, error);
    }
  };
};

/**
 * Hook configurations for different collections
 */
export const cacheInvalidationHooks = {
  products: createCacheInvalidationHook('products'),
  collections: createCacheInvalidationHook('productCollections'),
  categories: createCacheInvalidationHook('categories'),
  heros: createCacheInvalidationHook('heros'),
  lookbook: createCacheInvalidationHook('lookBook'),
}; 