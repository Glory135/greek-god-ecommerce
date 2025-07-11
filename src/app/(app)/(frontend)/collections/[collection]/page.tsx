import Collectionproducts from "@/components/collectionsComponents/Collectionproducts"
import SingleCollectionPageHero from "@/components/Hero/SingleCollectionPageHero"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"

interface Props {
  params: Promise<{
    collection: string
  }>
}

export default async function CollectionPage({ params }: Props) {
  const { collection } = await params
  const collectionSlug = decodeURIComponent(collection)

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.collections.getOne.queryOptions({
    slug: collectionSlug
  }))

  return (
    <div className="w-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={
          <section className="w-full bg-gradient-to-b from-gray-200 to-gray-300 min-h-[500px] flex items-end py-20 px-5 animate-pulse">
            <MaxWidthWrapper>
              <div className="flex w-fit max-w-full flex-col gap-5">
                <div className="h-10 w-64 bg-gray-300 rounded mb-4" />
                <div className="h-6 w-96 bg-gray-200 rounded" />
              </div>
            </MaxWidthWrapper>
          </section>}>
          <SingleCollectionPageHero collectionSlug={collectionSlug} />
        </Suspense>
      </HydrationBoundary>

      <Collectionproducts collectionSlug={collectionSlug} />
    </div>
  )
}