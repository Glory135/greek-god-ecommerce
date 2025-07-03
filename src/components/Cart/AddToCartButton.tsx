"use client"

import { useCart } from '@/zustand/checkout/hooks/use-cart'
import React from 'react'
import { Button } from '../ui/button'
import { TbShoppingBagX, TbShoppingBagPlus } from "react-icons/tb";
import { cn, formatPrice } from '@/lib/utils';
import NotLoggedInCatcher from '../Auth/NotLoggedInCatcher';
import useGetUser from '@/hooks/use-get-user';


interface Props {
  productId: string;
  color?: string;
  size?: string;
  quantity?: number;
  price?: string;
  small?: boolean;
  disabled?: boolean
  className?: string
}

const AddToCartButton = ({ productId, color, size, quantity = 1, disabled = false, small = false, className, price }: Props) => {
  const user = useGetUser()
  const cart = useCart(user?.id || "")

  const handleCartToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    cart.toggleProduct({ productId, quantity, color, size })
  }
  

  return (
    <NotLoggedInCatcher>
      <Button
        disabled={disabled}
        variant={!small && cart.isProductInCart(productId) ? "ghost" : "greek"}
        className={cn(
          'flex-1',
          small && "w-fit h-fit !p-2 !py-2",
          cart.isProductInCart(productId) ? "!text-red-500" : "!text-greek-foreground",
          className && className
        )}
        onClick={handleCartToggle}
      >
        {
          cart.isProductInCart(productId)
            ? <TbShoppingBagX className='' /> : <TbShoppingBagPlus className='' />
        }
        {
          !small && cart.isProductInCart(productId)
            ? "Remove From Bag" :
            !small && !cart.isProductInCart(productId)
              ? "Add To Bag" :
              null
        }
        {
          price && ` (${formatPrice(`${price}`)})`
        }
      </Button>
    </NotLoggedInCatcher>
  )
}

export default AddToCartButton