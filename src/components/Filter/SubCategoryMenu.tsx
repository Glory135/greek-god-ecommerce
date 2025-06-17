"use client"

import Link from "next/link"
import { handleSubCategoryLink } from "./filterFuncs"
import { CategoriesGetManyOutput } from "@/modules/categories/types"

interface SubCategoryMenuProps {
  category: CategoriesGetManyOutput[0]
  isOpen: boolean
  position: {
    top: number,
    left: number,
  }
}

const SubCategoryMenu = ({ category, position, isOpen }: SubCategoryMenuProps) => {
  if (!isOpen || !category.subcategories || (category.subcategories ?? []).length === 0) return null
  return (
    <div
      className="fixed z-50"
      style={{
        top: position.top,
        left: position.left
      }}
    >
      <div className="h-3 w-60 opacity-0" />
      <div className="w-60 text-primary-foreground bg-primary overflow-hidden border">
        <div className="">
          {category.subcategories?.map((subcategory) => (
            <Link key={subcategory.slug} href={handleSubCategoryLink(subcategory as CategoriesGetManyOutput[0], category)} className="w-full text-left p-4 hover:bg-greek hover:text-greek-foreground flex justify-between items-center hover:underline font-normal text-sm">
              {subcategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SubCategoryMenu