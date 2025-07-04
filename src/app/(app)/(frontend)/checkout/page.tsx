"use client"

import ProductInCart from "@/components/Cart/ProductInCart"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import SectionTitle from "@/components/Sections/SectionTitle"
import { Button, buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import useGetUser from "@/hooks/use-get-user"
import { formatPrice } from "@/lib/utils"
import { useTRPC } from "@/trpc/client"
import { PAGES_LINKS } from "@/utils/linksData"
import { useCart } from "@/zustand/checkout/hooks/use-cart"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { toast } from "sonner"

export default function CheckoutPage() {
  const user = useGetUser()
  const { clearAllCarts, products, clearCart, totalProductsInCart } = useCart(user?.id || "")
  const trpc = useTRPC()

  const { data, error } = useQuery(trpc.checkout.getProducts.queryOptions({
    ids: products.map(i => i.productId)
  }))

  useEffect(() => {
    if (!error) return;
    if (error?.data?.code === "NOT_FOUND") {
      clearAllCarts()
      toast.warning("Invalid products found, your cart has been cleared!")
    }
  }, [error, clearAllCarts])

  const calculateTotals = () => {
    const total = data?.docs && data?.docs.length > 0 ? data?.docs.reduce((accumulator, singleProd) => {
      const quantity = products.find(i => i.productId === singleProd.id)?.quantity;
      const totalPrice = singleProd.price * (quantity || 1)
      return (accumulator + totalPrice)
    }, 0) : 0

    return total
  }

  const getDeliveryFee = () => {
    const highest = data?.docs && data?.docs.length > 0 ? data?.docs.reduce((prev, current) =>
      current?.deliveryFee && prev?.deliveryFee &&
        current?.deliveryFee > prev?.deliveryFee ? current : prev
    ) : null
    return highest?.deliveryFee
  }

  const orderTotal = (calculateTotals() || 0) + (getDeliveryFee() || 0)

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
              <SectionTitle title="Order Summary" />
              <div className="w-full flex flex-col gap-5">
                <div className="w-full grid grid-cols-3">
                  <div className="">
                    <h4 className="text-base font-bold">Price</h4>
                  </div>
                  <div className="">
                    <h4 className="text-base font-bold">Quantity</h4>
                  </div>
                  <div className="">
                    <h4 className="text-base font-bold">Total</h4>
                  </div>
                </div>
                <ScrollArea className="h-auto lg:h-[30vh]">
                  {
                    data?.docs.map((singleProd) => {
                      const quantity = products.find(i => i.productId === singleProd.id)?.quantity;
                      const totalPrice = singleProd.price * (quantity || 1)

                      return (
                        <div key={singleProd.id} className="w-full grid grid-cols-3 my-2 border-b">
                          <div className="">
                            <p className="text-base">{formatPrice(`${singleProd.price}`)}</p>
                          </div>
                          <div className="">
                            <p className="text-base">{quantity}</p>
                          </div>
                          <div className="">
                            <p className="text-base">{formatPrice(`${totalPrice}`)}</p>
                          </div>
                        </div>
                      )
                    })
                  }
                </ScrollArea>
                <div className="w-full border-t border-primary flex flex-col gap-5 py-5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold">Subtotal ({totalProductsInCart})</h4>
                    <p className="text-base">{formatPrice(`${calculateTotals()}`)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold">Delivey</h4>
                    <p className="text-base">{
                      getDeliveryFee() && getDeliveryFee() !== 0
                        ? formatPrice(`${getDeliveryFee() || 0}`)
                        : "Free"
                    }</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold">Total Order</h4>
                    <p className="text-base">{formatPrice(`${orderTotal}`)}</p>
                  </div>
                  <div className="w-full flex justify-end mt-5">
                    <Button className="px-20">Next</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
      </MaxWidthWrapper>
    </div>
  )
}