import { formatPrice } from '@/lib/utils';
import { Collection, Color } from '@/payload-types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface Props {
  id: string;
  name: string;
  imageUrl?: string | null;
  reviewRating?: number;
  reviewCount?: number;
  price: number;
  collection?: Collection;
  colors?: Color[]
}

const ProductCard = ({ id, name, imageUrl, price, collection, colors }: Props) => {
  return (
    // <Link href={"/"}>
    <div className='rounded-md bg-white overflow-hidden h-full flex flex-col'>
      <div className="relative aspect-[2.5/3]">
        <Image
          alt={name}
          fill
          className='object-cover object-center'
          src={imageUrl || "/images/placeholder.jpg"}
        />
        <Image
          alt={name}
          width={20}
          height={20}
          src={"/icons/heart.svg"}
          className='absolute top-5 right-5 cursor-pointer'
        />
      </div>
      <div className="w-full p-2 flex flex-col gap-3 flex-1">
        <Link href={`/products/${id}`} className='hover:underline'>
          <h3 className='font-bold text-primary capitalize'>{name}</h3>
        </Link>
        <div className="w-full flex justify-between gap-x-5 gap-y-2 flex-wrap">
          {
            collection && (
              <Link href={`/collections/${collection.slug}`} className='hover:underline'>
                <p className="capitalize">
                  {collection.title}
                </p>
              </Link>
            )
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
                  <div className="w-5 h-5 rounded-full" style={{
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