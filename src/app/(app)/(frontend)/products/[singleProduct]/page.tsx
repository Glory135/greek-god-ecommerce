import SingleProductView from "@/components/Products/SingleProductView";
import SingleProductViewSkeleton from "@/components/Products/SingleProductViewSkeleton";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { Metadata } from "next";
import React from "react";

interface Props {
  params: Promise<{ singleProduct: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Fetch product data using trpc
  const { singleProduct } = await params;
  // Use dynamic import to avoid breaking SSR
  const { getQueryClient, trpc } = await import("@/trpc/server");
  const queryClient = getQueryClient();
  const product = await queryClient.fetchQuery(trpc.products.getOne.queryOptions({ id: singleProduct }));
  const data = product;
  if (!data?.name) {
    return {
      title: "Product Not Found | Greek God",
      description: "This product could not be found.",
      robots: { index: false, follow: false }
    };
  }
  const imageUrl = data.cover?.url || (data.images?.[0]?.image?.url ?? "/images/products-hero.jpg");
  const canonical = `${process.env.NEXT_PUBLIC_APP_URL || "https://www.greekgod.clothing"}/products/${singleProduct}`;
  return {
    title: `${data.name} | Greek God`,
    description: data.description || "Shop this product at Greek God.",
    openGraph: {
      title: `${data.name} | Greek God`,
      description: data.description || "Shop this product at Greek God.",
      url: canonical,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: data.name
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.name} | Greek God`,
      description: data.description || "Shop this product at Greek God.",
      images: [
        {
          url: imageUrl,
          alt: data.name
        }
      ]
    },
    alternates: {
      canonical
    }
  };
}

export default async function SinglePRoductsPage({ params }: Props) {
  const { singleProduct } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.products.getOne.queryOptions({
    id: singleProduct
  }))

  // Fetch product data for JSON-LD
  const product = await queryClient.fetchQuery(trpc.products.getOne.queryOptions({ id: singleProduct }));
  const imageUrl = product.cover?.url || (product.images?.[0]?.image?.url ?? "/images/products-hero.jpg");
  const canonical = `${process.env.NEXT_PUBLIC_APP_URL || "https://www.greekgod.clothing"}/products/${singleProduct}`;
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": imageUrl,
    "sku": singleProduct,
    "offers": {
      "@type": "Offer",
      "url": canonical,
      "priceCurrency": "NGN",
      "price": product.price,
      "availability": product["in stock"] ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SingleProductViewSkeleton />}>
          <SingleProductView productId={singleProduct} />
        </Suspense>
      </HydrationBoundary>
    </>
  )
}