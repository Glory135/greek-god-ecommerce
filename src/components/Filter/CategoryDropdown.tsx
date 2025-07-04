"use client"

import React, { useRef, useState } from 'react'
import { buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils'
import { useDropdownPosition } from '@/hooks/use-dropdown-position'
import SubCategoryMenu from './SubCategoryMenu'
import Link from 'next/link'
import { paramBuilder } from '@/utils/commonFunctions'
import { PAGES_LINKS } from '@/utils/linksData'
import { CategoriesGetManyOutput } from '@/modules/categories/types'

interface Props {
  category: CategoriesGetManyOutput[0],
  isActive?: boolean,
  isNavigationHovered?: boolean,
}

const CategoryDropdown = ({
  category,
  isActive,
  isNavigationHovered,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getDropdownPosition } = useDropdownPosition(dropdownRef)

  const onMouseEnter = () => {
    if (category.subcategories) {
      setIsOpen(true)
    }
  }
  const onMouseLeave = () => {
    setIsOpen(false)
  }
  const dropDownPosition = getDropdownPosition()

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative">
        <Link
          href={`${paramBuilder(
            PAGES_LINKS.products.link,
            { category: category.slug === "all" ? "" : category.slug }
          )}`}
          className={cn("h-11 px-4",
            buttonVariants({
              size: "sm",
              variant: "ghost"
            }),
            isActive && !isNavigationHovered && "bg-primary text-primary-foreground shadow-sm",
            isOpen && "bg-secondary text-secondary-foreground shadow-sm"
          )}
        >
          {category.name}
        </Link>
        {
          category.subcategories && category.subcategories.length > 0 && (
            <div className={cn(
              "opacity-0 absolute -bottom-3 w-0 h-0  border-l-[10px] border-b-[10px] border-r-[10px] border-l-transparent border-r-transparent border-b-primary left-1/2 -translate-x-1/2",
              isOpen && "opacity-100"
            )}></div>
          )
        }
      </div>
      <SubCategoryMenu
        isOpen={isOpen}
        position={dropDownPosition}
        category={category}
      />
    </div>
  )
}

export default CategoryDropdown