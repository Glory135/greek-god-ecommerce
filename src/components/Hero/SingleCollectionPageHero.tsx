"use client"

import { useTRPC } from "@/trpc/client";
import MaxWidthWrapper from "../MaxWidthWrapper"
import { useSuspenseQuery } from "@tanstack/react-query";

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
      <section className="w-full bg-gradient-to-b from-gray-200 to-gray-300 min-h-[500px] flex items-end py-20 px-5 animate-pulse">
        <MaxWidthWrapper>
          <div className="flex w-fit max-w-full flex-col gap-5">
            <div className="h-10 w-64 bg-gray-300 rounded mb-4" />
            <div className="h-6 w-96 bg-gray-200 rounded" />
          </div>
        </MaxWidthWrapper>
      </section>
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
            <h1 className="text-3xl font-bold drop-shadow-lg text-white">Collection Not Found</h1>
            <p className='text-white text-xl leading-relaxed max-w-3xl'>
              Sorry, we couldn&apos;t load this collection. Please try again later.
            </p>
          </div>
        </MaxWidthWrapper>
      </section>
    )
  }

  return (
    <section
      style={{
        backgroundImage: `linear-gradient(to bottom, #456d4550, rgba(0, 0, 0, 0.571)), url(${data?.docs?.hero?.url || '/images/products-hero.jpg'})`
      }}
      className={`w-full bg-center bg-cover bg-no-repeat min-h-[500px] flex items-end py-20 px-5`}>
      <MaxWidthWrapper>
        <div className="flex w-fit max-w-full flex-col gap-5">
          <h1 className="text-3xl font-bold drop-shadow-lg text-white">{data?.docs?.title}</h1>
          {
            data?.docs?.description && (
              <p className='text-white text-xl leading-relaxed max-w-3xl'>
                {data?.docs?.description}
              </p>
            )
          }
        </div>
      </MaxWidthWrapper>
    </section>)
}

export default SingleCollectionPageHero