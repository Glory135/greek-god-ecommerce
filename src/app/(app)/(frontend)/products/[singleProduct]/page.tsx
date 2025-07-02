import SingleProductView from "@/components/Products/SingleProductView";
import SingleProductViewSkeleton from "@/components/Products/SingleProductViewSkeleton";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  params: Promise<{ singleProduct: string }>
}

export default async function SinglePRoductsPage({ params }: Props) {
  const { singleProduct } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.products.getOne.queryOptions({
    id: singleProduct
  }))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<SingleProductViewSkeleton />}>
        <SingleProductView productId={singleProduct} />
      </Suspense>
    </HydrationBoundary>
  )
}