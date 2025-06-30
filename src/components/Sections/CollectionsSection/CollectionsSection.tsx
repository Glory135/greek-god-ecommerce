import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'
import SectionTitle from '../SectionTitle'
import Image from 'next/image'

const CollectionsSection = () => {
  return (
    <MaxWidthWrapper>
      <SectionTitle title='Collections' />
      <div className="w-full gap-5 grid grid-cols-1 md:grid-cols-2">
        <div className="border relative aspect-[2.5/3]">
          <Image fill alt="collection" className='object-center object-cover' src={"/images/collection1.jpg"} />
        </div>
        <div className="border relative aspect-[2.5/3]">
          <Image fill alt="collection" className='object-center object-cover' src={"/images/collection1.jpg"} />
        </div>
        <div className="border relative aspect-[2.5/3]">
          <Image fill alt="collection" className='object-center object-cover' src={"/images/collection1.jpg"} />
        </div>
        <div className="border relative aspect-[2.5/3]">
          <Image fill alt="collection" className='object-center object-cover' src={"/images/collection1.jpg"} />
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default CollectionsSection