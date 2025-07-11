import React from 'react'

const CollectionCardSkeleton = () => {
  return (
    <div className="relative block overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 shadow-lg animate-pulse">
      {/* Hero Image Skeleton */}
      <div className="relative h-80 w-full overflow-hidden">
        <div className="h-full w-full bg-gradient-to-br from-slate-200 to-slate-300 animate-pulse"></div>
        
        {/* Content Container Skeleton */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {/* Title Skeleton */}
          <div className="mb-2">
            <div className="h-8 w-3/4 bg-white/20 rounded-lg animate-pulse"></div>
          </div>
          
          {/* Description Skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-white/20 rounded animate-pulse"></div>
            <div className="h-4 w-2/3 bg-white/20 rounded animate-pulse"></div>
          </div>
          
          {/* Call to Action Skeleton */}
          <div className="mt-4 flex items-center">
            <div className="h-4 w-32 bg-white/20 rounded animate-pulse"></div>
            <div className="ml-2 h-4 w-4 bg-white/20 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollectionCardSkeleton 