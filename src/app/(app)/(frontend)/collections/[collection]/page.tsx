import Collectionproducts from "@/components/collectionsComponents/Collectionproducts"
import { Metadata } from "next";
import React from "react";

interface Props {
  params: Promise<{
    collection: string
  }>
}

export async function generateMetadata({ params }: { params: { collection: string } }): Promise<Metadata> {
  // Fetch collection data using trpc
  const collectionSlug = decodeURIComponent(params.collection);
  // Use dynamic import to avoid breaking SSR
  const { getQueryClient, trpc } = await import("@/trpc/server");
  const queryClient = getQueryClient();
  const collection = await queryClient.fetchQuery(trpc.collections.getOne.queryOptions({ slug: collectionSlug }));
  const data = collection?.docs;
  if (!data?.title) {
    return {
      title: "Collection Not Found | Greek God",
      description: "This collection could not be found.",
      robots: { index: false, follow: false }
    };
  }
  const imageUrl = data.hero?.url || "/images/products-hero.jpg";
  const canonical = `${process.env.NEXT_PUBLIC_APP_URL || "https://www.greekgod.clothing/"}/collections/${collectionSlug}`;
  return {
    title: `${data.title} | Greek God`,
    description: data.description || "Shop this collection at Greek God.",
    openGraph: {
      title: `${data.title} | Greek God`,
      description: data.description || "Shop this collection at Greek God.",
      url: canonical,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: data.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.title} | Greek God`,
      description: data.description || "Shop this collection at Greek God.",
      images: [
        {
          url: imageUrl,
          alt: data.title
        }
      ]
    },
    alternates: {
      canonical
    }
  };
}

export default async function CollectionPage({ params }: Props) {
  const { collection } = await params;
  const collectionSlug = decodeURIComponent(collection);
  // Fetch collection data for JSON-LD
  const { getQueryClient, trpc } = await import("@/trpc/server");
  const queryClient = getQueryClient();
  const collectionData = await queryClient.fetchQuery(trpc.collections.getOne.queryOptions({ slug: collectionSlug }));
  const data = collectionData?.docs;
  const imageUrl = data?.hero?.url || "/images/products-hero.jpg";
  const canonical = `${process.env.NEXT_PUBLIC_APP_URL || "https://www.greekgod.clothing/"}/collections/${collectionSlug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": data?.title,
    "description": data?.description,
    "image": imageUrl,
    "url": canonical
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* <HydrationBoundary state={dehydrate(queryClient)}>
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
      </HydrationBoundary> */}

      <div className="w-full">
        <Collectionproducts collectionSlug={collectionSlug} />
      </div>
    </>
  )
}