import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'
import SectionTitle from '../SectionTitle'

const TrendingSection = () => {
  return (
    <MaxWidthWrapper>
      <SectionTitle title='Trending' />
      <div className="w-full min-h-[700px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 grid-rows-6">
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, #456d4533, rgba(0, 0, 0, 0.218)), url(/images/trending1.jpg)`
          }}
          className=" bg-center bg-cover bg-no-repeat col-start-1 col-end-2 sm:col-span-2 lg:col-start-1 lg:col-end-4 row-start-1 row-end-7 min-h-[500px]"></div>
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, #456d4533, rgba(0, 0, 0, 0.218)), url(/images/trending2.jpg)`
          }}
          className=" bg-center bg-cover bg-no-repeat col-start-1 sm:col-span-1 lg:col-start-4 lg:col-end-6 row-start-4 row-end-7  min-h-[300px]"></div>
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, #456d4533, rgba(0, 0, 0, 0.218)), url(/images/trending3.jpg)`
          }}
          className=" bg-center bg-cover bg-no-repeat col-start-1 sm:col-span-1 lg:col-start-4 lg:col-end-6 row-start-1 row-end-4 min-h-[350px]"></div>
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, #456d4533, rgba(0, 0, 0, 0.218)), url(/images/trending4.jpg)`
          }}
          className=" bg-center bg-cover bg-no-repeat col-start-1 sm:col-span-1 lg:col-start-6 lg:col-end-8 row-start-1 row-end-4 min-h-[250px]"></div>
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, #456d4533, rgba(0, 0, 0, 0.218)), url(/images/trending5.jpg)`
          }}
          className=" bg-center bg-cover bg-no-repeat col-start-1 sm:col-span-1 lg:col-start-6 lg:col-end-8 row-start-4 row-end-7 min-h-[350px]"></div>
      </div>
    </MaxWidthWrapper>
  )
}

export default TrendingSection