import React from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import Link from 'next/link'
import { PAGES_LINKS } from '@/utils/linksData'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'

const CTASection = () => {
  return (
    <section
      style={{
        backgroundImage: `linear-gradient(to bottom, #456d4550, rgba(0, 0, 0, 0.571)), url(/images/collection1.jpg)`
      }}
      className={`w-full bg-center bg-cover bg-no-repeat min-h-[450px] flex items-end justify-end py-20 px-5`}>
      <MaxWidthWrapper className='flex justify-end'>
        <div className="flex w-fit max-w-full flex-col gap-5">
          <p className='text-white text-xl max-w-[450px]'>
            Beyond the fabric, lies the man. Dress with purpose,
            live with distinction.
          </p>
          <Link
            href={PAGES_LINKS.products.link}
            className={
              cn(
                buttonVariants({
                  variant: "greek"
                }),
                'flex w-fit px-10'
              )}>
            Explore Our Products
          </Link>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}

export default CTASection