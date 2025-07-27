import { NextRequest, NextResponse } from 'next/server';
import { getQueryClient } from '@/trpc/server';
import { invalidateProductCache, invalidateCollectionCache, invalidateLayoutCache } from '@/lib/cache-utils';

export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { type } = body;

    const queryClient = getQueryClient();

    switch (type) {
      case 'products':
        await invalidateProductCache(queryClient);
        return NextResponse.json({ success: true, message: 'Product cache invalidated' });
      
      case 'collections':
        await invalidateCollectionCache(queryClient);
        return NextResponse.json({ success: true, message: 'Collection cache invalidated' });
      
      case 'layout':
        await invalidateLayoutCache(queryClient);
        return NextResponse.json({ success: true, message: 'Layout cache invalidated' });
      
      case 'all':
        await queryClient.invalidateQueries();
        return NextResponse.json({ success: true, message: 'All cache invalidated' });
      
      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Cache invalidation error:', error);
    return NextResponse.json(
      { error: 'Failed to invalidate cache' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  return NextResponse.json({
    message: 'Cache debug endpoint (development only)',
    usage: 'POST with body: { "type": "products" | "collections" | "layout" | "all" }',
    note: 'This endpoint is for testing only. In production, cache invalidation happens automatically via webhooks.'
  });
} 