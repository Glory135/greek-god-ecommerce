import type { SearchParams } from "nuqs/server";
import ProductsFilterComponent from "@/components/Filter/products-filter/ProductsFilterComponent";
import ProductsHero from "@/components/Hero/ProductsHero";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductList, { ProductListSkeleton } from "@/components/Products/ProductList";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { loadProductsFilters } from "@/hooks/search-params";

interface Props {
  searchParams: Promise<SearchParams>;
}
export default async function ProductsPage({ searchParams }: Props) {
  const filters = await loadProductsFilters(searchParams)
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({
    ...filters,
    category: !!filters?.subcategory ? filters?.subcategory : filters?.category,
  }))

  return (
    <div className="w-full">
      <ProductsHero />
      <MaxWidthWrapper className="flex gap-5 my-10">
        <>
          <div className="hidden md:block w-[350px]">
            <ProductsFilterComponent />
          </div>
          <div className="flex-1 h-auto">
            <HydrationBoundary state={dehydrate(queryClient)}>
              <Suspense fallback={<ProductListSkeleton />}>
                <ProductList />
              </Suspense>
            </HydrationBoundary>
          </div>
        </>
      </MaxWidthWrapper>
    </div>
  )
}