"use client"

import { CustomCategory } from '@/app/(app)/types'
import React, { useEffect, useRef, useState } from 'react'
import CategoryDropdown from './CategoryDropdown'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { ListFilterIcon } from 'lucide-react'
import CategoriesSidebar from './CategoriesSidebar'

interface CategoriesProps {
  data: CustomCategory[]
}

const CategoriesComponent = ({ data }: CategoriesProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const viewAllRef = useRef<HTMLDivElement>(null)

  const [visibleCount, setVisibleCount] = useState(data.length)
  const [isAnyHovered, setIsAnyHovered] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const activeCategory = "all"
  const activeCategoryIndex = data.findIndex(cat => cat.slug === activeCategory)
  const isActiveCategoryHiden = activeCategoryIndex >= visibleCount && activeCategoryIndex != -1

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
    resizeObserver.observe(containerRef.current!)

    return () => resizeObserver.disconnect();
  }, [data.length])

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
        {data.map((category) => (
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
      <div
        ref={containerRef}
        onMouseEnter={() => setIsAnyHovered(true)}
        onMouseLeave={() => setIsAnyHovered(false)}
        className="flex flex-nowrap items-center gap-3">
        {data.slice(0, visibleCount).map((category) => (
          <div key={category.id} className="">
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={isAnyHovered}
            />
          </div>
        ))}
        <div ref={viewAllRef} className="shrink-0">
          <CategoriesSidebar data={data} />
        </div>
      </div>
    </div>
  )
}

export default CategoriesComponent