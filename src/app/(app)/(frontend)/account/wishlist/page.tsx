"use client"

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductCard from "@/components/Products/ProductCard";
import ProductCardSkeletonGrid from "@/components/Products/ProductCardSkeletonGrid";
import SectionTitle from "@/components/Sections/SectionTitle";
import useGetUser from "@/hooks/use-get-user";
import { useTRPC } from "@/trpc/client";
import { PAGES_LINKS } from "@/utils/linksData";
import { useWishlist } from "@/zustand/wishlist/hooks/use-wishlist";
import { useQuery } from "@tanstack/react-query";
import { InboxIcon } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";


export default function WishListPsge() {
  const { user, isLoading: loadingUser } = useGetUser()
  const router = useRouter()

  // Redirect to login if not logged in
  useEffect(() => {
    if (!loadingUser && !user) {
      router.replace(PAGES_LINKS.login.link);
    }
  }, [loadingUser, user, router]);

  const { products, totalProductsInCart } = useWishlist(user?.id || "")
  const trpc = useTRPC()
  const { data, isLoading } = useQuery(trpc.wishlist.getProducts.queryOptions({
    ids: products
  }))


  return (
    <MaxWidthWrapper className="pt-10">
      <div className="flex flex-col gap-5">
        <SectionTitle title="My Wish List" />
        <p>{totalProductsInCart} Items</p>
        <div className="w-full">
          {
            totalProductsInCart === 0 ?
              (
                <div className="border border-greek border-dashed flex items-center justify-center p-8 flex-col gap-y-5 bg-muted text-primary w-full h-[50vh] rounded-lg">
                  <InboxIcon />
                  <p className="text-primary text-base font-medium">No Products Found! </p>
                </div>
              ) :
              isLoading ?
                (
                  <ProductCardSkeletonGrid
                    count={totalProductsInCart}
                    className="md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                  />
                ) :
                (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                    {
                      data?.docs.map((product) => {
                        return (
                          <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            imageUrl={product?.largeCover?.url || product?.cover?.url}
                            reviewCount={2}
                            reviewRating={10}
                            collection={product?.collection}
                            colors={product['available colors']}
                            description={product?.description}
                          />
                        )
                      })
                    }
                  </div>
                )
          }

        </div>

      </div>
    </MaxWidthWrapper>
  )
}