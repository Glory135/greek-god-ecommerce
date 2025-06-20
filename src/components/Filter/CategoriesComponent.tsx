"use client"

import React, { Suspense, useEffect, useRef, useState } from 'react'
import CategoryDropdown from './CategoryDropdown'
import CategoriesSidebar from './CategoriesSidebar'
import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'


const CategoriesComponent = () => {
  const search = useSearchParams()

  const trpc = useTRPC();
  const { data } = useQuery(trpc.categories.getMany.queryOptions());

  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const viewAllRef = useRef<HTMLDivElement>(null)

  const [visibleCount, setVisibleCount] = useState(data?.length)
  const [isAnyHovered, setIsAnyHovered] = useState(false)

  const categorySearch = search.get("category")
  const activeCategory = categorySearch || "all"

  useEffect(() => {
    const calcVisibility = () => {
      if (!containerRef.current || !measureRef.current || !viewAllRef.current) { return; }
      const containerWidth = containerRef.current.offsetWidth;
      const viewAllWidth = viewAllRef.current.offsetWidth;
      const availableWidth = containerWidth + viewAllWidth;

      const items = Array.from(measureRef.current.children);
      let totalWidth = 150 // 0 was not working for me
      let visible = 0

      for (const item of items) {
        const width = item.getBoundingClientRect().width;
        if (totalWidth + width > availableWidth) break;
        totalWidth += width;
        visible++
      }
      setVisibleCount(visible)
    }

    const resizeObserver = new ResizeObserver(calcVisibility);
    if (containerRef?.current) resizeObserver.observe(containerRef.current!)

    return () => resizeObserver.disconnect();
  }, [data?.length])

  return (
    <div className='relative w-full'>
      {/* hidden to measure the width of container */}
      <div ref={measureRef}
        className="absolute opacity-0 pointer-events-none flex "
        style={{
          position: "fixed",
          top: -9999,
          left: -9999,
        }}
      >
        {data?.map((category) => (
          <div key={category.id} className="">
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>

      {/* actual visible one */}
      <Suspense fallback={<CategoriesSkeleton />}>
        <div
          ref={containerRef}
          onMouseEnter={() => setIsAnyHovered(true)}
          onMouseLeave={() => setIsAnyHovered(false)}
          className="flex flex-nowrap items-center gap-3">
          {data?.slice(0, visibleCount).map((category) => (
            <div key={category.id} className="">
              <CategoryDropdown
                category={category}
                isActive={activeCategory === category.slug}
                isNavigationHovered={isAnyHovered}
              />
            </div>
          ))}
          <div ref={viewAllRef} className="shrink-0">
            <CategoriesSidebar />
          </div>
        </div>
      </Suspense>
    </div>
  )
}

export default CategoriesComponent

const CategoriesSkeleton = () => {
  return (
    <div className="flex items-center gap-3">
      {/* Placeholder for category items */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="h-10 w-24 animate-pulse rounded-lg bg-gray-300"
        />
      ))}

      {/* Placeholder for "View All" button */}
      <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-300" />
    </div>
  )
}