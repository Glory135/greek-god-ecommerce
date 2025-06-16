"use client"

import { CustomCategory } from '@/app/(app)/types'
import React, { useRef, useState } from 'react'
import { Button, buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils'
import { useDropdownPosition } from '@/hooks/use-dropdown-position'
import SubCategoryMenu from './SubCategoryMenu'
import Link from 'next/link'
import { paramBuilder } from '@/utils/commonFunctions'
import { PAGES_LINKS } from '@/utils/linksData'

interface Props {
  category: CustomCategory,
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

  // TODO
  // improve mobile later
  // const toggleDropDown = () => {
  //   if (category.subcategories?.docs?.length) {
  //     setIsOpen(prev => !prev)
  //   }
  // }

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    // onClick={toggleDropDown}
    >
      <div className="relative">
        <Link
        href={paramBuilder(PAGES_LINKS.products.link, {category: category.slug})}
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