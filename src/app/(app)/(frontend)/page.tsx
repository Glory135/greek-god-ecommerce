import HeroSkeleton from "@/components/Hero/HeroSkeleton";
import LandingHero from "@/components/Hero/LandingHero";
import BestSellersSection from "@/components/Sections/BestSellerSection/BestSellersSection";
import BestSellersSectionSkeleton from "@/components/Sections/BestSellerSection/BestSellersSectionSkeleton";
import CollectionsSection from "@/components/Sections/CollectionsSection/CollectionsSection";
import CTASection from "@/components/Sections/CTASection";
import TrendingSection from "@/components/Sections/TrendingSection/TrendingSection";
import { HERO_SLUGS } from "@/constants";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
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
      <CollectionsSection />
      <CTASection />
      <TrendingSection />
    </div>
  )
}