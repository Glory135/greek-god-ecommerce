"use client"

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Minus, Plus } from 'lucide-react'
import React, { useState } from 'react'
import PriceFilter from './PriceFilter'
import { useProductFilters } from '@/hooks/use-products-filters'
import ColorsFilter from './ColorsFilter'
import ProductSort from './ProductSort'
import { useRouter } from 'next/navigation'

interface ProductFilterProps {
  title: string
  className?: string
  children: React.ReactNode
}

const ProductFilters = ({ title, className, children }: ProductFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = isOpen ? Minus : Plus

  return (
    <div className={cn(
      `w-full p-4 border border-greek bg-greek  flex flex-col gap-2 text-greek-foreground transition`,
      className,
      isOpen && "bg-background text-background-foreground"
    )}
    >
      <div
        className={cn("flex items-center justify-between cursor-pointer ",
          isOpen && "text-greek mb-5"
        )}
        onClick={() => setIsOpen(prev => !prev)}>
        <p className="font-medium">{title}</p>
        <Icon className='size-5' />
      </div>
      {
        isOpen && children
      }
    </div>
  )
}

const ProductsFilterComponent = () => {
  const [filters, setFilters] = useProductFilters();

  const onChange = (key: keyof typeof filters, value: unknown) => {
    setFilters({ ...filters, [key]: value })
  }

  const hasFilters = Object.entries(filters).some(([key, value]) => {
    if (key === "sort") return false
    if (Array.isArray(value)) {
      return value.length > 0
    }
    if (typeof value === "string") {
      return value !== "";
    }
    return value !== null
  })

  const onClear = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      category: "",
      subcategory: "",
      colors: [],
      sort: "default"
    })
  }

  return (
    <div className='w-full sticky top-24'>
      <div className="flex justify-between mb-5">
        <p className="text-2xl font-medium text-primary">Filters</p>
        {
          hasFilters && (
            <Button onClick={onClear} variant={"link"} className='' type='button' size={"sm"}>
              Clear
            </Button>
          )
        }
      </div>

      <div className="w-full flex flex-col gap-5">
        <ProductFilters title='Sort By'>
          <ProductSort />
        </ProductFilters>

        <ProductFilters title='Price'>
          <PriceFilter
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            onMinPriceChange={(value) => onChange("minPrice", value)}
            onMaxPriceChange={(value) => onChange("maxPrice", value)}
          />
        </ProductFilters>
        
        <ProductFilters title='Colors'>
          <ColorsFilter value={filters.colors} onChange={(value) => onChange("colors", value)} />
        </ProductFilters>
      </div>
    </div>
  )
}

export default ProductsFilterComponent