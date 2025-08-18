"use client"
import { useTRPC } from '@/trpc/client';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { InboxIcon, RefreshCcw } from 'lucide-react';
import React from 'react'
import { Button } from '../ui/button';
import Image from 'next/image';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import LookBookListSkeleton from './LookBookListSkeleton';


const LookBookList = () => {
  const trpc = useTRPC();
  const { data, isPending, hasNextPage, isFetchingNextPage, fetchNextPage } = useSuspenseInfiniteQuery(trpc.lookbook.getMany.infiniteQueryOptions(
    {
      limit: 16
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.docs.length > 0 ? lastPage.nextPage : undefined
      }
    }
  ))

  if (isPending) {
    return (<LookBookListSkeleton />)
  }
  if (data.pages?.[0]?.docs.length === 0) {
    return (
      <div className="border border-greek border-dashed flex items-center justify-center p-8 flex-col gap-y-5 bg-muted text-primary w-full h-[50vh] rounded-lg">
        <InboxIcon />
        <p className="text-primary text-base font-medium">No item Found! </p>
      </div>
    )
  }  

  return (
    <PhotoProvider
      speed={() => 800}
      easing={(type) => (type === 2 ? 'cubic-bezier(0.36, 0, 0.66, -0.56)' : 'cubic-bezier(0.34, 1.56, 0.64, 1)')}
    >
      <div className="w-full grid grid-cols-4 gap-2">
        {
          data?.pages.flatMap((page) => page.docs).map((look, index) => {
            const imageUrl = look?.imageLarge?.url || look?.image?.url
            return (
              <PhotoView key={index} src={imageUrl || ""}>
                <div key={look.id} className="relative aspect-square w-full min-h-[350px]">
                  <Image fill alt={look.title} src={imageUrl || ""} className='object-cover object-top' />
                </div>
              </PhotoView>
            )
          })
        }

      </div>
      <div className="w-full flex justify-center pt-8">
        {
          hasNextPage && (
            <Button
              disabled={isFetchingNextPage}
              // className=''
              variant="secondary"
              onClick={() => fetchNextPage()} >
              <RefreshCcw
                className={`${isFetchingNextPage && "animate-spin"}`}
              />
              Load More
            </Button>
          )
        }
      </div>
    </PhotoProvider>
  )
}

export default LookBookList