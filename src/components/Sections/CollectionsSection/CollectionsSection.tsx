"use client"

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'
import SectionTitle from '../SectionTitle'
import Link from 'next/link'
import { PAGES_LINKS } from '@/utils/linksData'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import CollectionCard from '@/components/collectionsComponents/CollectionCard'
import CollectionsListSkeleton from '@/components/collectionsComponents/CollectionsListSkeleton'

const CollectionsSection = () => {
  const trpc = useTRPC();
  const { data, isPending } = useSuspenseQuery(trpc.collections.getMany.queryOptions(
    {
      limit: 6
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
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <CollectionsListSkeleton key={i} number={6} />
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
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {data?.docs?.slice(0, 6).map((collection) => (
          <CollectionCard
            key={collection.id}
            slug={collection.slug}
            title={collection.title}
            description={collection?.description}
            heroimg={collection?.hero?.url}
          />
        ))}
      </div>
    </MaxWidthWrapper>
  )
}

export default CollectionsSection