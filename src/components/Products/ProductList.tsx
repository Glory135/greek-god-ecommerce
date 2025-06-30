"use client"

import { useProductFilters } from '@/hooks/use-products-filters';
import { useTRPC } from '@/trpc/client';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import React from 'react'
import ProductCard from './ProductCard';
import ProductCardSkeletonGrid from './ProductCardSkeletonGrid';
import { DEFAULT_LIMIT } from '@/constants';
import { Button } from '../ui/button';
import { InboxIcon, RefreshCcw } from 'lucide-react';

const ProductList = () => {
  const [filters] = useProductFilters();

  const trpc = useTRPC();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useSuspenseInfiniteQuery(trpc.products.getMany.infiniteQueryOptions(
    {
      ...filters,
      category: !!filters?.subcategory ? filters?.subcategory : filters?.category,
      limit: DEFAULT_LIMIT
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.docs.length > 0 ? lastPage.nextPage : undefined
      }
    }
  ))

  if (data.pages?.[0]?.docs.length === 0) {
    return (
      <div className="border border-greek border-dashed flex items-center justify-center p-8 flex-col gap-y-5 bg-muted text-primary w-full h-[50vh] rounded-lg">
        <InboxIcon />
        <p className="text-primary text-base font-medium">No Products Found! </p>
      </div>
    )
  }
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {
          data?.pages.flatMap((page) => page.docs).map((product) => {
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                imageUrl={product.image?.url}
                reviewCount={2}
                reviewRating={10}
                collection={product?.collection[0]}
                colors={product['available colors']}
                description={product?.description}
              />
            )
          })
        }
      </div>
      <div className="w-full flex justify-center pt-8">
        {
          hasNextPage && (
            <Button
              disabled={isFetchingNextPage}
              // className=''
              variant="secondary"
              onClick={() => fetchNextPage()} >
              <RefreshCcw
                className={`${isFetchingNextPage && "animate-spin"}`}
              />
              Load More
            </Button>
          )
        }
      </div>
    </>
  )
}

export default ProductList

export const ProductListSkeleton = () => {
  return (
    <ProductCardSkeletonGrid count={DEFAULT_LIMIT} />
  )
}