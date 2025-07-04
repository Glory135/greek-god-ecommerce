"use client"

import { formatPrice } from '@/lib/utils';
import { Collection, Color } from '@/payload-types';
import { generateCollectionLink, shortenText } from '@/utils/commonFunctions';
import { PAGES_LINKS } from '@/utils/linksData';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import dynamic from 'next/dynamic';
import { Button } from '../ui/button';
import { LoaderIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

// to solve hydration error
const AddToCartButton = dynamic(
  () => import('../Cart/AddToCartButton').then(
    (mod) => mod.default
  ),
  {
    ssr: false,
    loading: () => <Button disabled className='absolute top-5 right-5 w-fit h-fit !p-2 !py-2' variant={"greek"}><LoaderIcon className='animate-spin w-10' /></Button>
  }
)
const AddToWishListButton = dynamic(
  () => import('../WishList/AddToWishList').then(
    (mod) => mod.default
  ),
  {
    ssr: false,
    loading: () => <Button disabled className='absolute top-5 left-5 w-fit h-fit !p-2 !py-2' variant={"ghost"}><LoaderIcon className='animate-spin w-10' /></Button>
  }
)

interface Props {
  id: string;
  name: string;
  imageUrl?: string | null;
  reviewRating?: number;
  reviewCount?: number;
  price: number;
  collection?: Collection;
  colors?: Color[];
  description?: string | null;
}

const ProductCard = ({ id, name, imageUrl, price, collection, colors, description }: Props) => {
  const router = useRouter()

  const linkClick = (e: React.MouseEvent, to: string) => {
    e.preventDefault();
    e.stopPropagation();

    router.push(to)
  }

  return (
    <Link href={`${PAGES_LINKS.products.link}/${id}`} className='hover:opacity-90 '>
      <div className='rounded-md bg-background overflow-hidden h-full flex flex-col'>
        <div className="relative aspect-[2.5/3]">
          <Image
            alt={name}
            fill
            className='object-cover object-center'
            src={imageUrl || "/images/placeholder.png"}
          />
          <AddToWishListButton
            productId={id}
            className='absolute top-5 left-5 cursor-pointer'
            small={true}
          />
          <AddToCartButton
            productId={id}
            className='absolute top-5 right-5 cursor-pointer'
            small={true}
          />
        </div>
        <div className="w-full p-2 pb-5 flex flex-col gap-3 flex-1">
          <h3 className='font-bold text-primary capitalize hover:underline'>
            {shortenText(name, 30)}
          </h3>
          <div className="w-full flex justify-between gap-x-5 gap-y-2 flex-wrap">
            {
              description ? (
                <p className="capitalize">
                  {shortenText(description, 25)}
                </p>
              )
                : collection ? (
                  <p
                    onClick={(e) =>
                      linkClick(e, generateCollectionLink(collection.slug))
                    }
                    className="capitalize hover:underline"
                  >
                    {shortenText(collection.title, 25)}
                  </p>
                ) : null
            }
            <p className="font-bold">
              {formatPrice(price.toString())}
            </p>
          </div>
          {
            colors && colors.length > 0 && (
              <div className="flex gap-2">
                {
                  colors?.slice(0, 10).map((color) => (
                    <div key={color.id} className="w-5 h-5 rounded-full border" style={{
                      backgroundColor: color?.color
                    }} />
                  ))
                }
              </div>)
          }
        </div>
      </div>
    </Link >
  )
}

export default ProductCard