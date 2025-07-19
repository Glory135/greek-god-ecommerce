import React from 'react'
import CollectionCardSkeleton from './CollectionCardSkeleton'
import { DEFAULT_LIMIT } from '@/constants'

const CollectionsListSkeleton = ({ number }: { number?: number }) => {
  // Create an array of 6 skeleton items to match the grid layout
  const skeletonItems = Array.from({ length: number || DEFAULT_LIMIT }, (_, index) => (
    <CollectionCardSkeleton key={index} />
  ))

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {skeletonItems}
      </div>
    </>
  )
}

export default CollectionsListSkeleton 