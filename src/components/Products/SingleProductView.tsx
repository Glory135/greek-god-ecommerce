"use client"

import React, { Fragment } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import Image from 'next/image'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { cn, formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { generateCategoryLink, generateCollectionLink } from '@/utils/commonFunctions'
import StarRating from '../Rating/StarRating'
import { Button } from '../ui/button'
import { CheckIcon, LinkIcon, StarIcon, X } from 'lucide-react'
import { FaShoppingBag } from 'react-icons/fa'
import { Progress } from '../ui/progress'

const SingleProductView = ({ productId }: { productId: string }) => {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.products.getOne.queryOptions({
    id: productId
  }))

  return (
    <MaxWidthWrapper>
      <div className="border rounded-md bg-background overflow-hidden">
        <div className="relative aspect-[3.9] border-b">
          <Image
            fill
            alt={data.name}
            src={data?.image?.url || `/images/placeholder.jpg`}
            className='object-cover object-center'
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6">
          <div className="col-span-4">
            <div className="p-6 flex flex-col gap-3">
              <h1 className='text-4xl font-medium capitalize'>{data.name}</h1>
              {
                data?.description && (
                  <p className="text-base">{data?.description}</p>
                )
              }
            </div>

            <div className="border-y flex flex-wrap">
              <div className="px-6 py-4 flex items-center justify-center ">
                <div className=" px-2 py-1 border w-fit">
                  <p className="text-base font-medium">{formatPrice(`${data.price}`)}</p>
                </div>
              </div>
              <div className="px-6 py-4 flex items-center justify-center ">
                <div className=" px-2 py-1 w-fit">
                  <StarRating
                    rating={3}
                    iconClassName='size-4'
                  />
                </div>
              </div>
              {
                data?.['available colors'] && data?.['available colors'].length > 0 && (
                  <div className="px-6 py-4 flex flex-col justify-center ">
                    <p className="text-base">Colors:</p>
                    <div className="w-fit flex gap-2 flex-wrap">
                      {
                        data?.['available colors'].map((color) => (
                          <div
                            key={color.id}
                            style={{
                              backgroundColor: color.color
                            }}
                            className={cn("w-5 h-5 rounded-full border")} />
                        ))
                      }
                    </div>
                  </div>
                )
              }
              {
                data?.['available sizes'] && data?.['available sizes'].length > 0 && (
                  <div className="px-6 py-4 flex flex-col justify-center ">
                    <p className="text-base">Sizes:</p>
                    <div className="w-fit flex gap-2 flex-wrap">
                      {
                        data?.['available sizes'].map((size) => (
                          <div className="px-2 py-1 border w-fit bg-secondary">
                            <p className="text-xs text-secondary-foreground font-medium">{size.label}</p>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )
              }
            </div>
            <div className="flex gap-5">
              <div className="flex flex-wrap gap-20 px-6 py-4">
                {
                  data?.category && data?.category.length > 0 && (
                    <div className='flex flex-col gap-3'>
                      <h4 className='font-bold'>Categories</h4>
                      <ul className='flex flex-col gap-2'>
                        {
                          data?.category.map((singleCat) => (
                            <li className='hover:underline w-fit' key={singleCat.id}>
                              <Link href={generateCategoryLink(singleCat.slug)}> {singleCat.name}</Link>
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  )
                }

                {
                  data?.collection && data?.collection.length > 0 && (
                    <div className='flex flex-col gap-3'>
                      <h4 className='font-bold'>Collections</h4>
                      <ul className='flex flex-col gap-2'>
                        {
                          data?.collection.map((singleCollectoin) => (
                            <li className='hover:underline w-fit' key={singleCollectoin.id}>
                              <Link href={generateCollectionLink(singleCollectoin.slug)}> {singleCollectoin.title}</Link>
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  )
                }
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <div className="border-t lg:border-t-0 lg:border-l h-full">
              <div className="flex flex-col gap-4 p-6 border-b">
                <div className={cn("flex flex-col justify-center items-center gap-1",
                  data['in stock'] ? "text-green-500" : "text-red-500")}>
                  <div className="flex gap-1 justify-center items-center">
                    {
                      data['in stock'] ? <CheckIcon /> : <X />
                    }
                    <p className={cn("text-center font-medium uppercase",
                      data['in stock'] ? "text-green-500" : "text-red-500"
                    )}>
                      {
                        data['in stock'] ? "In Stock" : "Out of stock"
                      }
                    </p>
                  </div>
                  {
                    !data['in stock'] && (
                      <span className="text-primary text-sm">Come Back Later</span>
                    )
                  }
                </div>

                <div className="flex flex-row items-center gap-2">
                  <Button
                    disabled={!data['in stock']}
                    variant={"greek"}
                    className='flex-1'>
                    <FaShoppingBag />
                    Add To Bag
                  </Button>
                  <Button
                    variant={"secondary"}
                    onClick={() => { }}
                    disabled={false}
                    className='size-12'>
                    <LinkIcon />
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium">Ratings</h3>
                  <div className="flex items-center gap-x-1 font-medium">
                    <StarIcon className='size-4 fill-primary' />
                    <p>({5})</p>
                    <p className='text-base'>{5} ratings</p>
                  </div>
                </div>

                <div className="grid grid-cols-[auto_1fr_auto] gap-3 mt-4">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <Fragment key={stars}>
                      <div className="font-medium">
                        {stars} {stars === 1 ? "star" : "stars"}
                      </div>
                      <Progress
                        value={40}
                        className='h-[1lh]'
                      />
                      <div className="font-medium">
                        {0}%
                      </div>
                    </Fragment>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default SingleProductView