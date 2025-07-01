import SingleProductView from "@/components/Products/SingleProductView";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

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
      <SingleProductView productId={singleProduct} />
    </HydrationBoundary>
  )
}