import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'
import SectionTitle from '../SectionTitle'
import ProductCardSkeleton from '@/components/Products/ProductCardSkeleton'

const BestSellersSectionSkeleton = () => {
  return (
    <MaxWidthWrapper>
      {/* Section Title Skeleton */}
      <SectionTitle title='Best Sellers' />

      {/* Carousel Container Skeleton */}
      <div className="w-full flex flex-col justify-center items-center gap-2">
        {/* Carousel Content Skeleton */}
        <div className="w-full overflow-hidden">
          <div className="w-full flex gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 xl:w-1/4">
                <ProductCardSkeleton key={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators Skeleton */}
        <div className="flex items-center justify-center gap-2 py-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ease-in-out ${index === 0
                ? 'bg-gray-400 scale-125'
                : 'bg-gray-300'
                }`}
            />
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default BestSellersSectionSkeleton 