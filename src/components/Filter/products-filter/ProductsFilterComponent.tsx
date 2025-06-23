"use client"

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Minus, Plus } from 'lucide-react'
import React, { useState } from 'react'
import PriceFilter from './PriceFilter'
import { useProductFilters } from '@/hooks/use-products-filters'

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
      `w-full p-4 border border-greek bg-greek  flex flex-col gap-2 text-greek-foreground`,
      className,
      isOpen && "bg-background text-background-foreground"
    )}
    >
      <div
        className={cn("flex items-center justify-between cursor-pointer",
          isOpen && "text-greek"
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

  return (
    <div className='w-full sticky top-20'>
      <div className="flex justify-between mb-5">
        <p className="text-2xl font-medium text-primary">Filters</p>
        <Button variant={"link"} className='' type='button' size={"sm"} >
          Clear All Filters
        </Button>
      </div>

      <div className="w-full flex flex-col gap-5">
        <ProductFilters title='Price'>
          <PriceFilter
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            onMinPriceChange={(value) => onChange("minPrice", value)}
            onMaxPriceChange={(value) => onChange("maxPrice", value)}
          />
        </ProductFilters>
      </div>
    </div>
  )
}

export default ProductsFilterComponent