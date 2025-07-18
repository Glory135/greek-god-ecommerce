import HeroSkeleton from "@/components/Hero/HeroSkeleton";
import LandingHero from "@/components/Hero/LandingHero";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BestSellersSection from "@/components/Sections/BestSellerSection/BestSellersSection";
import BestSellersSectionSkeleton from "@/components/Sections/BestSellerSection/BestSellersSectionSkeleton";
import CollectionsSection from "@/components/Sections/CollectionsSection/CollectionsSection";
import CTASection from "@/components/Sections/CTASection";
import SectionTitle from "@/components/Sections/SectionTitle";
import TrendingSection from "@/components/Sections/TrendingSection/TrendingSection";
import { buttonVariants } from "@/components/ui/button";
import { HERO_SLUGS } from "@/constants";
import { cn } from "@/lib/utils";
import { getQueryClient, trpc } from "@/trpc/server";
import { PAGES_LINKS } from "@/utils/linksData";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Link from "next/link";
import { Suspense } from "react";

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
  void queryClient.prefetchQuery(trpc.collections.getMany.queryOptions({
    limit: 4
  }))
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

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={
          <MaxWidthWrapper>
            <div className="w-full flex flex-row items-center justify-between gap-5 flex-wrap mb-5">
              <SectionTitle title='Collections' className='!m-0 !w-fit' />
              <Link className={cn(buttonVariants({ variant: "link" }))} href={PAGES_LINKS.collections.link} >See All {">"} </Link>
            </div>
            <div className="w-full gap-5 grid grid-cols-1 md:grid-cols-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="border relative aspect-[2.5/3] bg-gray-200 animate-pulse">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </MaxWidthWrapper>
        }>
          <CollectionsSection />
        </Suspense>
      </HydrationBoundary>
      <CTASection />
      <TrendingSection />
    </div>
  )
}