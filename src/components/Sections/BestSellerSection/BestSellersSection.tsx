"use client"

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'
import SectionTitle from '../SectionTitle'
import ProductsCarousel from '@/components/Products/ProductsCarousel'
import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'
import { ProductType } from '@/modules/products/types'

const BestSellersSection = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.products.getMany.queryOptions(
    {
      sort: "bestseller",
    }
  ))
  return (
    <MaxWidthWrapper>
      <SectionTitle title='Best Sellers' />
      <ProductsCarousel data={data?.docs as Array<ProductType>} />
    </MaxWidthWrapper>
  )
}

export default BestSellersSection