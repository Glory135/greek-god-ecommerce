import CollectionsList from "@/components/collectionsComponents/ColectionsList";
import CollectionsListSkeleton from "@/components/collectionsComponents/CollectionsListSkeleton";
import CollectionsHero from "@/components/Hero/CollectionsHero";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { DEFAULT_LIMIT } from "@/constants";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

export default function CollectionsPage() {
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(trpc.collections.getMany.infiniteQueryOptions({
    limit: DEFAULT_LIMIT
  }))

  return (
    <div className="w-full">
      <CollectionsHero />
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