import React from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'

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
          {/* <Button className='flex w-fit px-10' >New Arrivals</Button> */}
        </div>
      </MaxWidthWrapper>
    </section>
  )
}

export default CTASection