"use client"

import { cn, formatPrice } from '@/lib/utils'
import { ProductsGetOneOutput } from '@/modules/products/types'
import React, { useState } from 'react'
import { CiDeliveryTruck } from "react-icons/ci";
import { CheckIcon, Heart, LinkIcon, LoaderIcon, X } from 'lucide-react'
import { Button } from '../ui/button'
import dynamic from 'next/dynamic';
import { useCart } from '@/zustand/checkout/hooks/use-cart';
import useGetUser from '@/hooks/use-get-user';
import StarRating from '../Rating/StarRating';

// to solve hydration error
const AddToCartButton = dynamic(
  () => import('../Cart/AddToCartButton').then(
    (mod) => mod.default
  ),
  {
    ssr: false,
    loading: () => <Button disabled className='flex-1' variant={"greek"}><LoaderIcon className='animate-spin w-10' /> Bag</Button>
  }
)


const AddToCartDetails = ({ product }: { product: ProductsGetOneOutput }) => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSze, setSelectedSze] = useState(0);

  const user = useGetUser()
  const cart = useCart(user?.id || "")

  return (
    <div className='w-full flex flex-col gap-5 p-5 lg:p-10'>
      <h1 className='text-4xl font-medium capitalize '>{product.name}</h1>
      {
        product?.description && (
          <p className="text-base first-letter:capitalize">{product?.description}</p>
        )
      }
      <div className="flex gap-5 flex-wrap items-center">
        <div className="flex flex-col gap-4">
          <div className={cn("flex flex-col justify-center items-center gap-1",
            product['in stock'] ? "text-green-500" : "text-red-500")}>
            <div className="flex gap-1 justify-center items-center">
              {
                product['in stock'] ? <CheckIcon /> : <X />
              }
              <p className={cn("text-center font-medium uppercase text-nowrap",
                product['in stock'] ? "text-green-500" : "text-red-500"
              )}>
                {
                  product['in stock'] ? "In Stock" : "Out of stock"
                }
              </p>
            </div>
            {
              !product['in stock'] && (
                <span className="text-primary text-sm">Come Back Later</span>
              )
            }
          </div>
        </div>

        <div className=" px-2 py-1 border w-fit">
          <p className="text-base font-medium">{formatPrice(`${product.price}`)}</p>
        </div>

          <div className="px-2 py-1 w-fit">
            <StarRating
              rating={3}
              iconClassName='size-4'
            />
          </div>
      </div>


      {
        product?.['available colors'] && product?.['available colors'].length > 0 && (
          <div className="flex flex-col justify-center gap-3">
            <p className="text-base">Select Color:</p>
            <div className="w-fit flex gap-3 flex-wrap">
              {
                product?.['available colors'].map((color, idx) => (
                  <div
                    onClick={() => setSelectedColor(idx)}
                    key={color.id}
                    style={{
                      backgroundColor: color.color
                    }}
                    className={cn(
                      "w-5 h-5 rounded-full border border-primary cursor-pointer",
                      idx === selectedColor && "ring-4 ring-primary outline-1 outline-primary"
                    )} />
                ))
              }
            </div>
          </div>
        )
      }
      {
        product?.['available sizes'] && product?.['available sizes'].length > 0 && (
          <div className=" flex flex-col justify-center gap-3">
            <p className="text-base">Select Size:</p>
            <div className="w-fit flex gap-2 flex-wrap">
              {
                product?.['available sizes'].map((size, idx) => (
                  <div
                    key={size.id}
                    onClick={() => setSelectedSze(idx)}
                    className={cn(
                      "px-2 py-1 border w-fit bg-secondary cursor-pointer",
                      idx === selectedSze && "ring-2 ring-primary"
                    )}>
                    <p className="text-xs text-secondary-foreground font-medium">{size.label}</p>
                  </div>
                ))
              }
            </div>
          </div>
        )
      }

      <div className="w-full flex gap-2 mt-5">
        <AddToCartButton
          productId={product.id}
          price={`${product.price}`}
          disabled={!product['in stock'] && !cart.isProductInCart(product.id)}
        />
        <Button
          variant={"secondary"}
          onClick={() => { }}
          disabled={false}
          className='size-12'>
          <LinkIcon />
        </Button>
      </div>


      <div className="mt-5 flex flex-wrap gap-5 justify-between text-base text-primary/50">
        <div className="flex items-center gap-1">
          <CiDeliveryTruck size={20} />
          <p>Return Easy</p>
        </div>
        <div className="flex items-center gap-1">
          <Heart />
          <p>Add To Wishlist</p>
        </div>
      </div>
    </div>
  )
}

export default AddToCartDetails