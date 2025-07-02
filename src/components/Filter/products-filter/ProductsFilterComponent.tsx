"use client"

import { Button } from '@/components/ui/button'
import { cn, formatPrice } from '@/lib/utils'
import { Minus, Plus, X } from 'lucide-react'
import React, { useState } from 'react'
import PriceFilter from './PriceFilter'
import { useProductFilters } from '@/hooks/use-products-filters'
import ColorsFilter from './ColorsFilter'
import ProductSort from './ProductSort'
import SizesFilter from './SizesFilter'
import { TbMathEqualGreater, TbMathEqualLower } from "react-icons/tb";


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

const ProductsFilterComponent = (
  { showHeader = true, showActions = false, actionEffect }:
    { showHeader?: boolean, showActions?: boolean, actionEffect?: () => void }
) => {
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
      sizes: [],
      sort: "featured"
    })
  }

  return (
    <div className='w-full sticky top-24'>
      {
        showHeader && (<div className="flex justify-between mb-5">
          <p className="text-2xl font-medium text-primary">Filters</p>
          {
            hasFilters && (
              <Button onClick={onClear} variant={"link"} className='' type='button' size={"sm"}>
                Clear
              </Button>
            )
          }
        </div>)
      }

      {
        showActions && (
          <div className="w-full flex gap-2 my-5">
            <Button
              onClick={() => {
                onClear();
                if (actionEffect) {
                  actionEffect()
                }
              }}
              variant={"ghost"}
              className='flex-1'>
              Clear Filter
            </Button>
            <Button
              onClick={() => {
                if (actionEffect) {
                  actionEffect()
                }
              }}
              variant={"greek"}
              className='flex-1'>
              Apply Filter
            </Button>
          </div>
        )
      }

      <div className="w-full flex flex-wrap gap-1 text-sm text-greek-foreground my-5">
        {
          Object.entries(filters).map(([key, value]) => {
            const isArray = Array.isArray(value)
            const hasValue = !isArray ? !!value : !!value.length

            const handleRemove = () => {
              setFilters({
                ...filters,
                [key]: isArray ? [] : ""
              })
            }

            if (!hasValue) return null
            if (isArray) {
              return (
                <FilterItem handleRemove={handleRemove} key={key}>
                  <p className='capitalize'>
                    <span className='font-bold'>{key}: </span>
                    {value.join(", ")}
                  </p>
                </FilterItem>
              )
            }
            if (key === "minPrice") {
              return (
                <FilterItem handleRemove={handleRemove} key={key} >
                  <p className='flex gap-1 items-center'>
                    <TbMathEqualGreater /> {formatPrice(value)}
                  </p>
                </FilterItem>
              )
            }
            if (key === "maxPrice") {
              return (
                <FilterItem handleRemove={handleRemove} key={key} >
                  <p className='flex gap-1 items-center'>
                    <TbMathEqualLower /> {formatPrice(value)}
                  </p>
                </FilterItem>
              )
            }
            return (
              <FilterItem sort={key === "sort"} handleRemove={handleRemove} key={key} ><p className="capitalize"> {value}</p></FilterItem>
            )
          })
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

        <ProductFilters title='Sizes'>
          <SizesFilter value={filters.sizes} onChange={(value) => onChange("sizes", value)} />
        </ProductFilters>
      </div>
    </div>
  )
}

export default ProductsFilterComponent

const FilterItem = ({ sort = false, children, handleRemove }: {
  sort?: boolean,
  children: React.ReactNode,
  handleRemove?: () => void,
}) => {
  return (
    <div className="p-3 bg-greek/80 flex items-center justify-center gap-2 text-sm">
      {children}
      {
        !sort && (
          <X
            size={15}
            className='cursor-pointer'
            onClick={() => {
              if (handleRemove) {
                handleRemove()
              }
            }} />)
      }
    </div>
  )
}