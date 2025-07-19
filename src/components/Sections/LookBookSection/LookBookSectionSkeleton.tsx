"use client"

const LookBookSectionSkeleton = () => {
  return (
    <div className="w-full min-h-[700px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 grid-rows-6">
      {/* Large left section */}
      <div className="bg-gray-200 animate-pulse col-start-1 col-end-2 sm:col-span-2 lg:col-start-1 lg:col-end-4 row-start-1 row-end-7 min-h-[500px]"></div>
      
      {/* Top right small section */}
      <div className="bg-gray-200 animate-pulse col-start-1 sm:col-span-1 lg:col-start-4 lg:col-end-6 row-start-1 row-end-4 min-h-[350px]"></div>
      
      {/* Bottom right small section */}
      <div className="bg-gray-200 animate-pulse col-start-1 sm:col-span-1 lg:col-start-4 lg:col-end-6 row-start-4 row-end-7 min-h-[300px]"></div>
      
      {/* Top far right section */}
      <div className="bg-gray-200 animate-pulse col-start-1 sm:col-span-1 lg:col-start-6 lg:col-end-8 row-start-1 row-end-4 min-h-[250px]"></div>
      
      {/* Bottom far right section */}
      <div className="bg-gray-200 animate-pulse col-start-1 sm:col-span-1 lg:col-start-6 lg:col-end-8 row-start-4 row-end-7 min-h-[350px]"></div>
    </div>
  )
}

export default LookBookSectionSkeleton 