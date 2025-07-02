import React from 'react';
import MaxWidthWrapper from '../MaxWidthWrapper';

const shimmer =
  'animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200';

const SkeletonBox = ({ className = '' }: { className?: string }) => (
  <div className={`${shimmer} ${className}`} />
);

const SingleProductViewSkeleton = () => {
  return (
    <MaxWidthWrapper>
      <div className="relative w-full flex flex-col md:flex-row gap-8">
        {/* Left: Images */}
        <div className="flex flex-col flex-1 gap-10">
          <div className="flex-1 flex flex-row gap-2">
            {/* Thumbnails */}
            <div className="hidden md:flex w-[70px] flex-col gap-3 items-center justify-center">
              {[1, 2, 3].map((i) => (
                <SkeletonBox key={i} className="w-[70px] aspect-square rounded-md" />
              ))}
            </div>
            {/* Main Image */}
            <div className="relative flex-1 aspect-[2.5/3] sm:aspect-[1/0.8] md:aspect-square xl:aspect-[1/.7] rounded-lg overflow-hidden">
              <SkeletonBox className="w-full h-full rounded-lg" />
            </div>
          </div>

          {/* Add to Cart (mobile) */}
          <div className="flex md:hidden flex-1 h-fit mt-4">
            <SkeletonBox className="w-full h-14 rounded-lg" />
          </div>

          {/* Product Details */}
          <div className="w-full bg-greek/15 rounded-lg mt-4">
            <div className="w-full p-5 flex items-center justify-between">
              <SkeletonBox className="h-6 w-32 rounded" />
              <SkeletonBox className="h-6 w-6 rounded-full" />
            </div>
            <div className="w-full p-5 border-t border-black flex flex-col gap-4">
              <SkeletonBox className="h-5 w-24 rounded" />
              <SkeletonBox className="h-4 w-40 rounded" />
              <SkeletonBox className="h-4 w-32 rounded" />
              <div className="flex flex-wrap gap-20 mt-5">
                <div className="flex flex-col gap-3">
                  <SkeletonBox className="h-5 w-20 rounded" />
                  <SkeletonBox className="h-4 w-24 rounded" />
                  <SkeletonBox className="h-4 w-16 rounded" />
                </div>
                <div className="flex flex-col gap-3">
                  <SkeletonBox className="h-5 w-24 rounded" />
                  <SkeletonBox className="h-4 w-20 rounded" />
                  <SkeletonBox className="h-4 w-16 rounded" />
                </div>
              </div>
            </div>
          </div>

          {/* Ratings */}
          <div className="w-full p-5 sm:p-10 mt-4">
            <div className="flex items-center justify-between">
              <SkeletonBox className="h-6 w-24 rounded" />
              <div className="flex items-center gap-x-2">
                <SkeletonBox className="h-5 w-5 rounded-full" />
                <SkeletonBox className="h-5 w-10 rounded" />
                <SkeletonBox className="h-5 w-16 rounded" />
              </div>
            </div>
            <div className="grid grid-cols-[auto_1fr_auto] gap-3 mt-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <React.Fragment key={i}>
                  <SkeletonBox className="h-4 w-16 rounded" />
                  <SkeletonBox className="h-4 w-full rounded" />
                  <SkeletonBox className="h-4 w-8 rounded" />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Add to Cart (desktop) */}
        <div className="hidden md:flex flex-1 h-fit !sticky !top-20">
          <SkeletonBox className="w-full h-40 rounded-lg" />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default SingleProductViewSkeleton; 