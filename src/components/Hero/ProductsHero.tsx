"use client"

import { useTRPC } from "@/trpc/client";
import MaxWidthWrapper from "../MaxWidthWrapper"
import { useSuspenseQuery } from "@tanstack/react-query";
import { HERO_SLUGS } from "@/constants";
import HeroSkeleton from "./HeroSkeleton";

const ProductsHero = () => {
  const trpc = useTRPC();
  const { data, isPending } = useSuspenseQuery(trpc.layout.getHero.queryOptions(
    {
      slug: HERO_SLUGS.products
    },
  ))
  // Pending state (skeleton)
  if (isPending) {
    return (
      <HeroSkeleton />
    )
  }
  return (
    <section
      style={{
        backgroundImage: `linear-gradient(to bottom, #456d4550, rgba(0, 0, 0, 0.571)), url(${data?.docs?.hero?.url || "/images/products-hero.jpg"})`
      }}
      className={`relative w-full bg-center bg-cover bg-no-repeat min-h-[500px] flex items-end py-20 px-5`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300"></div>

    <MaxWidthWrapper>
      <div className="relative flex w-fit max-w-full flex-col gap-5">
          {
            data?.docs?.title && (
              <h1 className="text-3xl font-bold drop-shadow-lg text-white animate-in slide-in-from-bottom-4 fade-in duration-700 ease-out">{data?.docs?.title}</h1>
            )
          }
          {
            data?.docs?.description && (
              <p className='text-white text-xl max-w-[450px] animate-in slide-in-from-bottom-4 fade-in duration-700 ease-out delay-200'>
                {data?.docs?.description}
              </p>
            )
          }
        </div>
      </MaxWidthWrapper>
    </section>
  )
}

export default ProductsHero