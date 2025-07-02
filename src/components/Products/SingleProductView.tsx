"use client"

import React, { Fragment } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { formatPrice } from '@/lib/utils'
import { Plus, StarIcon } from 'lucide-react'
import { Progress } from '../ui/progress'
import ProductImagesStack from './ProductImagesStack'
import AddToCartDetails from '../Cart/AddToCartDetails'
import { generateCategoryLink, generateCollectionLink } from '@/utils/commonFunctions'
import Link from 'next/link'

const SingleProductView = ({ productId }: { productId: string }) => {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.products.getOne.queryOptions({
    id: productId
  }))

  return (
    <MaxWidthWrapper>
      <div className="relative w-full flex">
        <div className="flex-col flex flex-1 gap-10">
          <div className="flex-1">
            <ProductImagesStack images={data.images} />
          </div>

          <div className="flex md:hidden flex-1 h-fit">
            <AddToCartDetails product={data} />
          </div>

          <div className="w-full bg-greek/15">
            <div className="w-full p-5 flex items-center justify-between">
              <h4 className="font-bold">
                Product Details
              </h4>
              <Plus />
            </div>
            <div className="w-full p-5 border-t border-black">
              <p className='font-bold'>
                Delivery:  {data.deliveryFee ? formatPrice(`${data.deliveryFee}`) : "Free"}
              </p>
              <div className="flex flex-col">
                <b>Return:</b>
                {
                  data['return policy'] ?
                    (<p>
                      Unwashed, unworn items are eligible for returns or exchanges within <b>{data['return policy']}</b> of purchase. Final Sale items are not eligible for returns or exchanges.
                    </p>)
                    :
                    <b>No Returns</b>
                }
              </div>
              <div className="flex flex-wrap gap-20 mt-5">
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

          <div className="w-full p-5 sm:p-10">
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

        <div className="hidden md:flex flex-1 h-fit !sticky !top-20">
          <AddToCartDetails product={data} />
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default SingleProductView