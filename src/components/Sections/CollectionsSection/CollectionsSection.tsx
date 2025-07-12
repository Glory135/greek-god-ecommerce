"use client"

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'
import SectionTitle from '../SectionTitle'
import Image from 'next/image'
import Link from 'next/link'
import { PAGES_LINKS } from '@/utils/linksData'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { generateCollectionLink, shortenText } from '@/utils/commonFunctions'

const CollectionsSection = () => {
  const trpc = useTRPC();
  const { data, isPending } = useSuspenseQuery(trpc.collections.getMany.queryOptions(
    {
      limit: 4
    }
  ))

  // Loading skeleton
  if (isPending) {
    return (
      <MaxWidthWrapper>
        <div className="w-full flex flex-row items-center justify-between gap-5 flex-wrap mb-5">
          <SectionTitle title='Collections' className='!m-0 !w-fit' />
          <Link className={cn(buttonVariants({ variant: "link" }))} href={PAGES_LINKS.collections.link} >See All {">"} </Link>
        </div>
        <div className="w-full gap-5 grid grid-cols-1 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border relative aspect-[2.5/3] bg-gray-200 animate-pulse">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    )
  }

  return (
    <MaxWidthWrapper>
      <div className="w-full flex flex-row items-center justify-between gap-5 flex-wrap mb-5">
        <SectionTitle title='Collections' className='!m-0 !w-fit' />
        <Link className={cn(buttonVariants({ variant: "link" }))} href={PAGES_LINKS.collections.link} >See All {">"} </Link>
      </div>
      <div className="w-full gap-5 grid grid-cols-1 md:grid-cols-2">
        {data?.docs?.slice(0, 4).map((collection, index) => (
          <Link
            key={collection.id}
            href={generateCollectionLink(collection.slug)}
            className="group border relative aspect-[2.5/3] overflow-hidden cursor-pointer"
          >
            <Image
              fill
              alt={collection.title || "collection"}
              className='object-center object-cover transition-transform duration-500 group-hover:scale-110'
              src={collection.hero?.url || `/images/collection${index + 1}.jpg`}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col gap-3 justify-end p-6">
              {/* Title and Description */}
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <h3 className="text-white text-xl font-bold mb-2 group-hover:text-white">
                  {collection.title || `Collection ${index + 1}`}
                </h3>
                {collection.description && (
                  <p className="text-gray-200 text-sm mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {shortenText(collection.description, 200)}
                  </p>
                )}
              </div>

              {/* CTA Button */}
              <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out delay-150">
                <span className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "bg-white text-black hover:bg-gray-100 transition-colors duration-200"
                )}>
                  Explore Collection
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </MaxWidthWrapper>
  )
}

export default CollectionsSection