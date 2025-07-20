"use client"

import { useTRPC } from "@/trpc/client"
import { useInfiniteQuery } from "@tanstack/react-query"
import { InboxIcon, RefreshCcw } from "lucide-react"
import SectionTitle from "../Sections/SectionTitle"
import MaxWidthWrapper from "../MaxWidthWrapper"
import { Button } from "../ui/button"
import ProductCard from "../Products/ProductCard"
import ProductCardSkeletonGrid from "../Products/ProductCardSkeletonGrid"

const Collectionproducts = (
  {
    collectionSlug
  }: {
    collectionSlug: string
  }
) => {
  const trpc = useTRPC()

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery(trpc.collections.getProducts.infiniteQueryOptions({
    collectionSlug: collectionSlug,
    limit: 15
  },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.docs.length > 0 ? lastPage.nextPage : undefined
      }
    }));

  if (isLoading) {
    return (
      <MaxWidthWrapper className="pt-10">
        <div className="w-full flex flex-col gap-5">
          <SectionTitle title="Products in this collection" />
          <ProductCardSkeletonGrid
            count={15}
            className="md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          />
        </div>
      </MaxWidthWrapper>
    )
  }

  if (data?.pages?.[0]?.docs.length === 0) {
    return (
      <MaxWidthWrapper className="pt-10">
        <div className="flex flex-col gap-5">
          <SectionTitle title="Products in this collection" />
          <div className="border border-greek border-dashed flex items-center justify-center p-8 flex-col gap-y-5 bg-muted text-primary w-full h-[50vh] rounded-lg">
            <InboxIcon />
            <p className="text-primary text-base font-medium">No Products Found! </p>
          </div>
        </div>
      </MaxWidthWrapper>
    )
  }
  return (
    <MaxWidthWrapper className="pt-10">
      <div className="flex flex-col gap-5">
        <SectionTitle title="Products in this collection" />

        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {
              data?.pages.flatMap((page) => page.docs).map((product) => {
                return (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    imageUrl={product?.cover?.url}
                    reviewCount={2}
                    reviewRating={10}
                    collection={product?.collection}
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
      </div>
    </MaxWidthWrapper>
  )
}

export default Collectionproducts