"use client"

import useGetUser from '@/hooks/use-get-user'
import { cn, formatPrice } from '@/lib/utils'
import { useTRPC } from '@/trpc/client'
import { generateProductLink, shortenText } from '@/utils/commonFunctions'
import { useCart } from '@/zustand/checkout/hooks/use-cart'
import { IProductInCart } from '@/zustand/checkout/store/use-cart-store'
import { useQuery } from '@tanstack/react-query'
import { X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductInCart = ({ product, lg = false, close }: { product: IProductInCart, lg?: boolean, close?: () => void }) => {
  const user = useGetUser()
  const { increaseQuantity, decreaseQuantity, removeProduct } = useCart(user?.id || "")
  const trpc = useTRPC()

  const { data: productData, isLoading } = useQuery(trpc.products.getOne.queryOptions({ id: product.productId }))

  const size = productData?.['available sizes']?.filter(i => i.id === product.size)[0]
  const color = productData?.['available colors']?.filter(i => i.id === product.color)[0]

  if (isLoading) {
    return <ProductInCartSkeleton lg={lg} />
  }
  return (
    <div className='relative text-sm w-full flex my-3 shadow-md pl-2'>
      <X
        size={15}
        className='absolute top-5 right-5 cursor-pointer'
        onClick={() => { removeProduct(product.productId) }}
      />
      <div
        className={cn(
          "relative w-[125px] aspect-[1/1.3]",
          lg && "!w-[150px]"
        )}>
        <Image
          alt={productData?.name || "product"}
          src={productData?.cover?.url || "/images/placeholder.png"}
          fill
          className='object-cover'
        />
      </div>
      <div className="w-full flex flex-col gap-2 p-3 capitalize">
        <h3 className="font-bold">
          <Link onClick={() => { if (close) close() }} className='hover:underline' href={generateProductLink(product.productId)}>
            {shortenText(productData?.name || "", 30)}
          </Link>
        </h3>
        {
          (product?.size && size) && (
            <p className="">Size: {size?.label}</p>
          )
        }
        {
          (product?.color && color) && (
            <div className="flex gap-1 items-center">
              <p className="">Color: {color?.label}</p>
              {
                <div style={{ backgroundColor: color.color }} className={cn("w-5 h-5 rounded-full border")}></div>
              }
            </div>
          )
        }
        <div className='w-full flex  justify-between items-center font-bold'>
          <span className='font-bold'>{formatPrice(`${productData?.price}`)}</span>
          <div className='flex bg-greek/60 text-greek-foreground'>
            <div className="p-2 cursor-pointer" onClick={() => decreaseQuantity(product.productId)}>-</div>
            <div className="p-2 ">{product.quantity || 0}</div>
            <div className="p-2 cursor-pointer" onClick={() => increaseQuantity(product.productId)}>+</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Skeleton component for loading state
const ProductInCartSkeleton = ({ lg = false }: { lg?: boolean }) => (
  <div className="relative text-sm w-full flex my-3 shadow-md animate-pulse">
    <div
      className={cn(
        "relative bg-gray-200 dark:bg-gray-700 w-[125px] aspect-[1/1.3] rounded-md overflow-hidden",
        lg && "!w-[150px]"
      )}
    />
    <div className="w-full flex flex-col gap-2 p-3">
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-1" />
      <div className="flex gap-2 items-center mb-1">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
        <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 border" />
      </div>
      <div className="w-full flex justify-between items-center font-bold mt-2">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/6" />
        <div className="flex bg-gray-200/60 dark:bg-gray-700/60 rounded">
          <div className="p-2">
            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
          </div>
          <div className="p-2">
            <div className="w-6 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
          </div>
          <div className="p-2">
            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default ProductInCart