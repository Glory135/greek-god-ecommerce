"use client"

import { useTRPC } from "@/trpc/client";
import MaxWidthWrapper from "../MaxWidthWrapper"
import { useSuspenseQuery } from "@tanstack/react-query";
import HeroSkeleton from "./HeroSkeleton";

const SingleCollectionPageHero = ({
  collectionSlug
}: {
  collectionSlug: string
}) => {
  const trpc = useTRPC();
  const { data, isPending, isError } = useSuspenseQuery(trpc.collections.getOne.queryOptions(
    {
      slug: collectionSlug
    },
  ))

  // Pending state (skeleton)
  if (isPending) {
    return (
      <HeroSkeleton />
    )
  }

  // Error state
  if (isError || !data?.docs) {
    return (
      <section
        style={{
          backgroundImage: `linear-gradient(to bottom, #456d4550, rgba(0, 0, 0, 0.571)), url(/images/products-hero.jpg)`
        }}
        className="w-full bg-center bg-cover bg-no-repeat min-h-[500px] flex items-end py-20 px-5"
      >
        <MaxWidthWrapper>
          <div className="flex w-fit max-w-full flex-col gap-5">
            <h1 className="text-3xl font-bold drop-shadow-lg text-white animate-in slide-in-from-bottom-4 fade-in duration-700 ease-out">Collection Not Found</h1>
            <p className='text-white text-xl leading-relaxed max-w-3xl animate-in slide-in-from-bottom-4 fade-in duration-700 ease-out delay-200'>
              Sorry, we couldn&apos;t load this collection. Please try again later.
            </p>
          </div>
        </MaxWidthWrapper>
      </section>
    )
  }

  const imageUrl = data?.docs?.heroLarge?.url || data?.docs?.hero?.url;

  return (
    <section
      style={{
        backgroundImage: `linear-gradient(to bottom, #456d4550, rgba(0, 0, 0, 0.571)), url(${imageUrl || '/images/products-hero.jpg'})`
      }}
      className={`relative w-full bg-center bg-cover bg-no-repeat min-h-[500px] flex items-end py-20 px-5`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300"></div>

    <MaxWidthWrapper>
      <div className="relative flex w-fit max-w-full flex-col gap-5">
          <h1 className="text-3xl font-bold drop-shadow-lg text-white animate-in slide-in-from-bottom-4 fade-in duration-700 ease-out">{data?.docs?.title}</h1>
          {
            data?.docs?.description && (
              <p className='text-white text-xl leading-relaxed max-w-3xl animate-in slide-in-from-bottom-4 fade-in duration-700 ease-out delay-200'>
                {data?.docs?.description}
              </p>
            )
          }
        </div>
      </MaxWidthWrapper>
    </section>)
}

export default SingleCollectionPageHero