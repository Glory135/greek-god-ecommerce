"use client"

import { formatPrice } from '@/lib/utils';
import { Collection, Color } from '@/payload-types';
import { generateCollectionLink, shortenText } from '@/utils/commonFunctions';
import { PAGES_LINKS } from '@/utils/linksData';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import dynamic from 'next/dynamic';

// to solve hydration error
const AddToCartButton = dynamic(
  () => import('../Cart/AddToCartButton').then(
    (mod)=> mod.default
  ),
  {
    ssr: false,
    loading: () => <p>Loading...</p>
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
  return (
    // <Link href={"/"}>
    <div className='rounded-md bg-white overflow-hidden h-full flex flex-col'>
      <div className="relative aspect-[2.5/3]">
        <Image
          alt={name}
          fill
          className='object-cover object-center'
          src={imageUrl || "/images/placeholder.png"}
        />
        <Image
          alt={name}
          width={20}
          height={20}
          src={"/icons/heart.svg"}
          className='absolute top-5 left-5 cursor-pointer'
        />
        <AddToCartButton productId={id} userSlug='' className='absolute top-5 right-5 cursor-pointer' small={true} />
      </div>
      <div className="w-full p-2 flex flex-col gap-3 flex-1">
        <Link href={`${PAGES_LINKS.products.link}/${id}`} className='hover:underline'>
          <h3 className='font-bold text-primary capitalize'>{name}</h3>
        </Link>
        <div className="w-full flex justify-between gap-x-5 gap-y-2 flex-wrap">
          {
            description ? (
              <p className="capitalize">
                {shortenText(description, 25)}
              </p>
            )
              : collection ? (
                <Link href={generateCollectionLink(collection.slug)} className='hover:underline'>
                  <p className="capitalize">
                    {shortenText(collection.title, 25)}
                  </p>
                </Link>
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
                colors?.map((color) => (
                  <div key={color.id} className="w-5 h-5 rounded-full border" style={{
                    backgroundColor: color?.color
                  }} />
                ))
              }
            </div>)
        }
      </div>
    </div>
    // </Link >
  )
}

export default ProductCard