import HeroSkeleton from "@/components/Hero/HeroSkeleton";
import LandingHero from "@/components/Hero/LandingHero";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BestSellersSection from "@/components/Sections/BestSellerSection/BestSellersSection";
import BestSellersSectionSkeleton from "@/components/Sections/BestSellerSection/BestSellersSectionSkeleton";
import LookBookSection from "@/components/Sections/LookBookSection/LookBookSection";
import { HERO_SLUGS } from "@/constants";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Link from "next/link";
import { Suspense } from "react";
import ProductList, { ProductListSkeleton } from "@/components/Products/ProductList";
import SectionTitle from "@/components/Sections/SectionTitle";
import { cn } from "@/lib/utils";
import { PAGES_LINKS } from "@/utils/linksData";
import { buttonVariants } from "@/components/ui/button";
import LookBookSectionSkeleton from "@/components/Sections/LookBookSection/LookBookSectionSkeleton";


export default function LandingPage() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.products.getMany.queryOptions(
    {
      sort: "bestseller",
    }
  ))

  void queryClient.prefetchQuery(trpc.layout.getHero.queryOptions(
    {
      slug: HERO_SLUGS.home,
    }
  ))

  void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
    limit: 20
  }))

  void queryClient.prefetchQuery(trpc.lookbook.getMany.queryOptions(
    {
      limit: 5,
    }
  ))

  // void queryClient.prefetchQuery(trpc.collections.getMany.queryOptions({
  //   limit: 6
  // }))

  return (
    <div className="w-full flex flex-col gap-10 md:gap-16">

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<HeroSkeleton className='min-h-[650px]' />}>
          <LandingHero />
        </Suspense>
      </HydrationBoundary>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<BestSellersSectionSkeleton />}>
          <BestSellersSection />
        </Suspense>
      </HydrationBoundary>

      <MaxWidthWrapper>
        <div className="w-full flex flex-row items-center justify-between gap-5 flex-wrap mb-5">
          <SectionTitle title='Products' className='!m-0 !w-fit' />
          <Link className={cn(buttonVariants({ variant: "link" }))} href={PAGES_LINKS.products.link} >See More {">"} </Link>
        </div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<ProductListSkeleton customLimit={20} className="md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" />}>
            <ProductList customLimit={20} className="md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" noLoadMore={true} />
          </Suspense>
        </HydrationBoundary>
      </MaxWidthWrapper>

      {/* <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={
          <MaxWidthWrapper>
            <div className="w-full flex flex-row items-center justify-between gap-5 flex-wrap mb-5">
              <SectionTitle title='Collections' className='!m-0 !w-fit' />
              <Link className={cn(buttonVariants({ variant: "link" }))} href={PAGES_LINKS.collections.link} >See All {">"} </Link>
            </div>
            <CollectionsListSkeleton number={6} />
          </MaxWidthWrapper>
        }>
          <CollectionsSection />
        </Suspense>
      </HydrationBoundary> */}

      {/* <CTASection /> */}
      <MaxWidthWrapper>
        <div className="w-full flex flex-row items-center justify-between gap-5 flex-wrap mb-5">
          <SectionTitle title='Look Book' className='!m-0 !w-fit' />
          <Link className={cn(buttonVariants({ variant: "link" }))} href={PAGES_LINKS.lookbook.link} >See More {">"} </Link>
        </div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<LookBookSectionSkeleton />}>
            <LookBookSection />
          </Suspense>
        </HydrationBoundary>
      </MaxWidthWrapper>
    </div>
  )
}