import type { SearchParams } from "nuqs/server";
import ProductsFilterComponent from "@/components/Filter/products-filter/ProductsFilterComponent";
import ProductsHero from "@/components/Hero/ProductsHero";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductList, { ProductListSkeleton } from "@/components/Products/ProductList";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { loadProductsFilters } from "@/hooks/search-params";
import MobileProductFilter from "@/components/Filter/products-filter/MobileProductFilter";
import { DEFAULT_LIMIT } from "@/constants";

interface Props {
  searchParams: Promise<SearchParams>;
}
export default async function ProductsPage({ searchParams }: Props) {
  const filters = await loadProductsFilters(searchParams)
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
    ...filters,
    category: !!filters?.subcategory ? filters?.subcategory : filters?.category,
    limit: DEFAULT_LIMIT
  }))

  return (
    <div className="w-full">
      <ProductsHero />
      <MaxWidthWrapper className="flex gap-5 my-10 flex-col md:flex-row">
        <>
          {/* mobile */}
          <div className="block md:hidden">
            <MobileProductFilter />
          </div>
          {/* desktop */}
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