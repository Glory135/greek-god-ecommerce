import { NextRequest, NextResponse } from 'next/server';
import { getQueryClient } from '@/trpc/server';
import { invalidateProductCache, invalidateCollectionCache, invalidateLayoutCache } from '@/lib/cache-utils';

export async function POST(request: NextRequest) {
  // Add cache headers to prevent caching
  const response = NextResponse.json({ success: true });
  response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');

  try {
    const body = await request.json();
    const { collection, operation } = body;

    console.log(`🔄 Webhook triggered: ${operation} on ${collection}`);

    // Get the query client
    const queryClient = getQueryClient();

    // Invalidate cache based on the collection that was modified
    switch (collection) {
      case 'products':
        await invalidateProductCache(queryClient);
        console.log('✅ Product cache invalidated');
        break;
      
      case 'productCollections':
        await invalidateCollectionCache(queryClient);
        console.log('✅ Collection cache invalidated');
        break;
      
      case 'categories':
        // Categories affect both products and navigation
        await invalidateProductCache(queryClient);
        await invalidateLayoutCache(queryClient);
        console.log('✅ Category cache invalidated');
        break;
      
      case 'heros':
        await invalidateLayoutCache(queryClient);
        console.log('✅ Hero cache invalidated');
        break;
      
      case 'lookBook':
        // Invalidate lookbook cache
        await queryClient.invalidateQueries({
          queryKey: ['lookbook'],
        });
        console.log('✅ Lookbook cache invalidated');
        break;
      
      default:
        // For any other collection, invalidate all cache
        await queryClient.invalidateQueries();
        console.log('✅ All cache invalidated');
        break;
    }

    return NextResponse.json({ 
      success: true, 
      message: `Cache invalidated for ${collection}`,
      timestamp: new Date().toISOString()
    }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
  } catch (error) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to invalidate cache' },
      { status: 500 }
    );
  }
}

// Handle GET requests for webhook verification
export async function GET() {
  return NextResponse.json({ status: 'Webhook endpoint is active' });
} 