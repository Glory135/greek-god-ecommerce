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
import { DEFAULT_LIMIT, HERO_SLUGS } from "@/constants";
import HeroSkeleton from "@/components/Hero/HeroSkeleton";

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

  void queryClient.prefetchQuery(trpc.layout.getHero.queryOptions(
    {
      slug: HERO_SLUGS.products,
    }
  ))

  return (
    <div className="w-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<HeroSkeleton />}>
          <ProductsHero />
        </Suspense>
      </HydrationBoundary>
      <MaxWidthWrapper className="flex gap-5 my-10 flex-col md:flex-row">
        <>
          {/* mobile */}
          <div className="block md:hidden sticky top-20 !z-30">
            <MobileProductFilter />
          </div>
          {/* desktop */}
          <div className="hidden md:block md:w-[250px] lg:w-[350px]">
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

export const metadata = {
  title: "Products | Greek God",
  description: "Shop the latest Greek God products. Crafted for every journey, designed for every man.",
  openGraph: {
    title: "Products | Greek God",
    description: "Shop the latest Greek God products. Crafted for every journey, designed for every man.",
    images: [
      {
        url: "/images/products-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Greek God Products"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Products | Greek God",
    description: "Shop the latest Greek God products. Crafted for every journey, designed for every man.",
    images: [
      {
        url: "/images/products-hero.jpg",
        alt: "Greek God Products"
      }
    ]
  }
};