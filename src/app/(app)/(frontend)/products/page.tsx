import ProductsFilterComponent from "@/components/Filter/products-filter/ProductsFilterComponent";
import ProductsHero from "@/components/Hero/ProductsHero";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductList, { ProductListSkeleton } from "@/components/Products/ProductList";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  searchParams: Promise<{
    category?: string,
    subcategory?: string
  }>
}
export default async function ProductsPage({ searchParams }: Props) {
  const { category, subcategory } = await searchParams

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({
    category: !!subcategory ? subcategory : category
  }))

  return (
    <div className="w-full">
      <ProductsHero />
      <MaxWidthWrapper className="flex gap-5 my-10">
        <>
        <div className="w-[350px]">
          <ProductsFilterComponent />
        </div>
        <div className="flex-1">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<ProductListSkeleton />}>
              <ProductList category={!!subcategory ? subcategory : category} />
            </Suspense>
          </HydrationBoundary>
        </div>
        </>
      </MaxWidthWrapper>

    </div>
  )
}