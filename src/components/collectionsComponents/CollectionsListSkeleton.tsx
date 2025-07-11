import React from 'react'
import CollectionCardSkeleton from './CollectionCardSkeleton'
import { DEFAULT_LIMIT } from '@/constants'

const CollectionsListSkeleton = () => {
  // Create an array of 6 skeleton items to match the grid layout
  const skeletonItems = Array.from({ length: DEFAULT_LIMIT }, (_, index) => (
    <CollectionCardSkeleton key={index} />
  ))

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {skeletonItems}
      </div>
      {/* Load More Button Skeleton */}
      <div className="w-full flex justify-center pt-8">
        <div className="h-10 w-32 bg-slate-200 rounded-lg animate-pulse"></div>
      </div>
    </>
  )
}

export default CollectionsListSkeleton 