"use client"

import React from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils';
import NotLoggedInCatcher from '../Auth/NotLoggedInCatcher';
import useGetUser from '@/hooks/use-get-user';
import { useWishlist } from '@/zustand/wishlist/hooks/use-wishlist';
import { Heart } from 'lucide-react';


interface Props {
  productId: string;
  small?: boolean;
  disabled?: boolean
  className?: string
}

const AddToWishListButton = ({ productId, disabled = false, small = false, className }: Props) => {
  const user = useGetUser()
  const wishList = useWishlist(user?.id || "")

  const handleWishListToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    wishList.toggleProduct(productId)
  }
  
  return (
    <NotLoggedInCatcher>
      <Button
        disabled={disabled}
        variant={"ghost"}
        className={cn(
          small && "w-fit h-fit !p-2 !py-2",
          wishList.isProductInWishList(productId) ? "!text-red-500" : "!text-primary",
          className && className,
          "flex gap-2 items-center justify-center font-light"
        )}
        onClick={handleWishListToggle}
      >
        {
          wishList.isProductInWishList(productId)
            ? <Heart fill='red' /> : <Heart fill='white' />
        }
        {
          !small && wishList.isProductInWishList(productId)
            ? "Remove From Wish List" :
            !small && !wishList.isProductInWishList(productId)
              ? "Add To Wish List" :
              null
        }
      </Button>
    </NotLoggedInCatcher>
  )
}

export default AddToWishListButton