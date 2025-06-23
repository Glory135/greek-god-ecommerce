"use client"

import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'

const ProductList = ({ category }: { category?: string }) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.products.getMany.queryOptions({
    category
  }))
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {
        data?.docs.map((product) => {
          return (
            <div key={product.id} className="border rounded-md bg-background p-5">
              <h2 className='text-xl font-medium'>{product.name}</h2>
              <p>{product.price}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default ProductList

export const ProductListSkeleton = () => {
  return (
    <div className="">
      Loading...
    </div>
  )
}