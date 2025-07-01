"use client"

import { useCart } from '@/zustand/checkout/hooks/use-cart'
import React from 'react'
import { Button } from '../ui/button'
import { TbShoppingBagX, TbShoppingBagPlus } from "react-icons/tb";
import { cn } from '@/lib/utils';


interface Props {
  userSlug: string;
  productId: string;
  small?: boolean;
  disabled?: boolean
  className?: string
}

const AddToCartButton = ({ userSlug, productId, disabled = false, small = false, className }: Props) => {
  const cart = useCart(userSlug)

  return (
    <Button
      disabled={disabled}
      variant={!small && cart.isProductInCart(productId) ? "ghost" : "greek"}
      className={cn(
        'flex-1',
        small && "w-fit h-fit !p-1 !py-1 ",
        cart.isProductInCart(productId) ? "!text-red-500" : "!text-greek-foreground",
        className && className
      )}
      onClick={() => cart.toggleProduct(productId)}
    >
      {
        cart.isProductInCart(productId)
          ? <TbShoppingBagX className='!w-10' /> : <TbShoppingBagPlus className='!w-10' />
      }
      {
        !small && cart.isProductInCart(productId)
          ? "Remove From Cart" :
          !small && !cart.isProductInCart(productId)
            ? "Add To Bag" :
            null
      }
    </Button>
  )
}

export default AddToCartButton