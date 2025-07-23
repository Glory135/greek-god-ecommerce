import LookBookList from "@/components/lookbook/LookBookList";
import LookBookListSkeleton from "@/components/lookbook/LookBookListSkeleton";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

export const metadata = {
  title: "Lookbook | Greek God",
  description: "Browse the Greek God lookbook for style inspiration and discover our latest fashion trends.",
  openGraph: {
    title: "Lookbook | Greek God",
    description: "Browse the Greek God lookbook for style inspiration and discover our latest fashion trends.",
    images: [
      {
        url: "/logo/logo-icon.png",
        width: 1200,
        height: 630,
        alt: "Greek God Lookbook"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Lookbook | Greek God",
    description: "Browse the Greek God lookbook for style inspiration and discover our latest fashion trends.",
    images: [
      {
        url: "/logo/logo-full.png",
        alt: "Greek God Lookbook"
      }
    ]
  }
};

export default function LookbookPage() {
  const queryClient = getQueryClient();

  void queryClient.prefetchInfiniteQuery(trpc.lookbook.getMany.infiniteQueryOptions({
    limit: 16
  }))
  return (
    <div className="w-full px-2 flex justify-center items-center flex-col">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<LookBookListSkeleton />}>
          <LookBookList />
        </Suspense>
      </HydrationBoundary>
    </div>
  )
}