"use client"

import React from 'react'
import { CheckBoxFilter } from './CheckBoxFilters'
import { cn } from '@/lib/utils'
import { useTRPC } from '@/trpc/client'
import { useInfiniteQuery } from '@tanstack/react-query'
import { DEFAULT_LIMIT } from '@/constants'
import { Button } from '@/components/ui/button'

interface Props {
  value: string[] | null,
  onChange: (value: string[]) => void;
}

const ColorsFilterSkeleton = () => {
  return (
    <>
      {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
        <div key={index} className="w-full flex items-center gap-3 animate-pulse">
          <div className="w-4 h-4 bg-gray-200 rounded border"></div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-gray-200"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      ))}
    </>
  )
}

const ColorsFilter = ({ value, onChange }: Props) => {
  const trpc = useTRPC()
  const { data: colors, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(trpc.colors.getMany.infiniteQueryOptions(
    {
      limit: DEFAULT_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.docs.length > 0 ? lastPage.nextPage : undefined
      }
    }
  ))

  const onClick = (color: string) => {
    if (value?.includes(color)) {
      onChange(value?.filter((c) => c !== color) || []);
    } else {
      onChange([...(value || []), color]);
    }
  }

  if (isLoading) {
    return <ColorsFilterSkeleton />
  }
  return (
    <>
      {
        colors?.pages.map((page) =>
          page?.docs.map((color) => (
            <CheckBoxFilter
              key={color.id}
              isChecked={value?.includes(color.label)}
              checkChange={() => { onClick(color.label) }}
              RenderComp={<div className='flex items-center gap-2'>
                <div className={cn("w-5 h-5 rounded-full border"
                )}
                  style={{
                    backgroundColor: color.color
                  }}
                ></div>
                <p className="text-base">
                  {color.label}
                </p>
              </div>}
            />
          ))
        )
      }

      {
        hasNextPage && (
          <div className="w-full">
            <Button disabled={isFetchingNextPage} onClick={() => fetchNextPage()} variant={"link"} size={"sm"}>load more...</Button>
          </div>
        )
      }
    </>
  )
}

export default ColorsFilter