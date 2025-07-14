"use client"

import ProductInCart from "@/components/Cart/ProductInCart"
import OrderSummary from "@/components/Checkout/OrderSummary"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import SectionTitle from "@/components/Sections/SectionTitle"
import { buttonVariants } from "@/components/ui/button"
import useGetUser from "@/hooks/use-get-user"
import { cn } from "@/lib/utils"
import { PAGES_LINKS } from "@/utils/linksData"
import { useCart } from "@/zustand/checkout/hooks/use-cart"
import Image from "next/image"
import Link from "next/link"

export default function CheckoutPage() {
  const { user } = useGetUser()
  const { products, clearCart } = useCart(user?.id || "")


  return (
    <div className="w-full">
      <MaxWidthWrapper className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16 relative">
        <div className="lg:col-span-4">
          <div className="w-full flex items-center justify-between mb-5">
            <SectionTitle className="!m-0" title="Checkout" />
            {
              products && products.length > 0 && (
                <span onClick={() => clearCart()} className="hover:underline text-base text-nowrap cursor-pointer">Clear Items</span>
              )
            }
          </div>
          {
            !products || products.length < 1 ? (
              <div className="my-10 w-full flex flex-col gap-5 justify-center items-center">
                <div
                  className='relative md=-4 h-60 w-60 text-muted-foreground'
                  aria-hidden='true'>
                  <Image
                    src={'/images/emptybag.png'}
                    fill
                    alt='Empty cart'
                  />
                </div>
                <h4 className='text-base font-bold capitalize'>
                  Your Bag Is empty.
                </h4>
                <p className='text-sm text-gray-700 capitalize'>
                  discover GreekGod and add products to your Bag
                </p>
                <div className="flex flex-col gap-2">
                  <Link
                    href={PAGES_LINKS.products.link}
                    className={buttonVariants({
                      variant: 'link',
                      size: 'sm',
                    })}>
                    Best Sellers
                  </Link>
                  <Link
                    href={PAGES_LINKS.collections.link}
                    className={buttonVariants({
                      variant: 'link',
                      size: 'sm',
                    })}>
                    Collections
                  </Link>
                  <Link
                    href={PAGES_LINKS.products.link}
                    className={buttonVariants({
                      variant: 'link',
                      size: 'sm',
                    })}>
                    Explre Our Products
                  </Link>
                </div>
              </div>
            ) :
              (
                <div className="w-full flex flex-col gap-5">
                  {
                    products.map((singleProduct) => (
                      <ProductInCart key={singleProduct.productId} product={singleProduct} lg={true} />
                    ))
                  }
                </div>
              )
          }
        </div>
        {
          products && products.length > 0 && (
            <div className="lg:col-span-3 h-fit lg:sticky top-24">
              <OrderSummary />
              <div className="w-full flex justify-end mt-5">
                <Link href={PAGES_LINKS.delivery.link} className={cn(buttonVariants({ variant: "greek" }), "px-20")}>Next</Link>
              </div>
            </div>
          )}
      </MaxWidthWrapper>
    </div>
  )
}