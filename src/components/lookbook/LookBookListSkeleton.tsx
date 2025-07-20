"use client"


const LookBookListSkeleton = () => {
  return (
    <div className="w-full">
      {/* Grid of skeleton images */}
      <div className="w-full grid grid-cols-4 gap-2">
        {Array.from({ length: 16 }).map((_, index) => (
          <div 
            key={index} 
            className="relative aspect-square w-full min-h-[350px] bg-gray-200 animate-pulse rounded-md"
          />
        ))}
      </div>
      
    </div>
  )
}

export default LookBookListSkeleton 