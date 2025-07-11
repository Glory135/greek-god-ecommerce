import CollectionsList from "@/components/collectionsComponents/ColectionsList";
import CollectionsListSkeleton from "@/components/collectionsComponents/CollectionsListSkeleton";
import CollectionsHero from "@/components/Hero/CollectionsHero";
import HeroSkeleton from "@/components/Hero/HeroSkeleton";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { DEFAULT_LIMIT, HERO_SLUGS } from "@/constants";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

export default function CollectionsPage() {
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(trpc.collections.getMany.infiniteQueryOptions({
    limit: DEFAULT_LIMIT
  }))

  void queryClient.prefetchQuery(trpc.layout.getHero.queryOptions(
    {
      slug: HERO_SLUGS.collections,
    }
  ))

  return (
    <div className="w-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<HeroSkeleton />}>
          <CollectionsHero />
        </Suspense>
      </HydrationBoundary>
      <MaxWidthWrapper className="flex gap-5 my-10 flex-col md:flex-row">
        <div className="flex-1 h-auto">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<CollectionsListSkeleton />}>
              <CollectionsList />
            </Suspense>
          </HydrationBoundary>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}