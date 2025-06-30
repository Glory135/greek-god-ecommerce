import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <div className='rounded-md bg-background overflow-hidden h-full flex flex-col shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200'>
      {/* Image skeleton with shimmer effect */}
      <div className="relative aspect-[2.5/3] bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200">
        {/* Heart icon skeleton */}
        <div className="absolute top-5 right-5 w-5 h-5 bg-gray-300 rounded-full animate-pulse" />
        
        {/* Shimmer overlay for image */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/30 to-transparent animate-shimmer" />
      </div>
      
      {/* Content skeleton */}
      <div className="w-full p-2 flex flex-col gap-3 flex-1">
        {/* Product name skeleton */}
        <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse" style={{ animationDelay: '0.1s' }} />
        
        {/* Collection and price skeleton */}
        <div className="w-full flex justify-between gap-x-5 gap-y-2 flex-wrap">
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-1/3 animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-1/4 animate-pulse" style={{ animationDelay: '0.3s' }} />
        </div>
        
        {/* Colors skeleton */}
        <div className="flex gap-2">
          <div className="w-5 h-5 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          <div className="w-5 h-5 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="w-5 h-5 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton; 