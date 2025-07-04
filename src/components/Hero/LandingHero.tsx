import React from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import { buttonVariants } from '../ui/button'
import Link from 'next/link'
import { PAGES_LINKS } from '@/utils/linksData'
import { cn } from '@/lib/utils'

const LandingHero = () => {
  return (
    <section
      style={{
        backgroundImage: `linear-gradient(to bottom, #456d4550, rgba(0, 0, 0, 0.571)), url(/images/hero1.jpg)`
      }}
      className={`w-full bg-center bg-cover bg-no-repeat min-h-[650px] flex items-end py-20 px-5`}>
      <MaxWidthWrapper>
        <div className="flex w-fit max-w-full flex-col gap-5">
          <p className='text-white text-xl max-w-[450px]'>
            Crafted for every journey, designed for every man.
            Enduring style, unwavering confidence
          </p>
          <Link href={PAGES_LINKS.products.link} className={
            cn(
              buttonVariants({
                variant: "greek"
              }),
              'flex w-fit px-10'
            )} >New Arrivals</Link>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}

export default LandingHero