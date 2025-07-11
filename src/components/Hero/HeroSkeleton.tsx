import React from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import { cn } from '@/lib/utils'

const HeroSkeleton = ({ className }: { className?: string }) => {
  return (
    <section className={cn("w-full bg-gradient-to-b from-gray-200 to-gray-300 min-h-[500px] flex items-end py-20 px-5 animate-pulse", className)}>
      <MaxWidthWrapper>
        <div className="flex w-fit max-w-full flex-col gap-5">
          <div className="h-10 w-64 bg-gray-300 rounded mb-4" />
          <div className="h-6 w-96 bg-gray-200 rounded" />
        </div>
      </MaxWidthWrapper>
    </section>)
}

export default HeroSkeleton