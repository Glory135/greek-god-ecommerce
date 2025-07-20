"use client"

import React from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import { buttonVariants } from '../ui/button'
import Link from 'next/link'
import { PAGES_LINKS } from '@/utils/linksData'
import { cn } from '@/lib/utils'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import HeroSkeleton from './HeroSkeleton'

const LandingHero = () => {
  const trpc = useTRPC();
  const { data, isPending } = useSuspenseQuery(trpc.layout.getHero.queryOptions(
    {
      slug: "home-page-hero"
    },
  ))
  // Pending state (skeleton)
  if (isPending) {
    return (
      <HeroSkeleton className='min-h-[650px]' />
    )
  }
  return (
    <section
      style={{
        backgroundImage: `linear-gradient(to bottom, #456d4550, rgba(0, 0, 0, 0.571)), url(${data?.docs?.hero?.url || "/images/hero1.jpg"})`
      }}
      className={`relative w-full bg-top bg-cover bg-no-repeat min-h-[650px] flex items-end py-20 px-5`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300"></div>

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
          <Link href={PAGES_LINKS.products.link} className={
            cn(
              buttonVariants({
                variant: "greek"
              }),
              'flex w-fit px-10 animate-in slide-in-from-bottom-4 fade-in duration-700 ease-out delay-300'
            )} >Start Shopping</Link>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}

export default LandingHero