"use client"

import React, { useEffect } from 'react'
import SectionTitle from '../Sections/SectionTitle';
import { ScrollArea } from '../ui/scroll-area';
import { formatPrice } from '@/lib/utils';
import useGetUser from '@/hooks/use-get-user';
import { useTRPC } from '@/trpc/client';
import { useCart } from '@/zustand/checkout/hooks/use-cart';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

interface OrderSummaryProps {
  onTotalCalculated?: (total: number) => void;
  onProductsCalculated?: (products: Array<{ id: string; name: string; price: number; quantity: number; image?: string }>) => void;
}

const OrderSummary = ({ onTotalCalculated, onProductsCalculated }: OrderSummaryProps) => {
  const { user } = useGetUser()
  const { clearAllCarts, products, totalProductsInCart } = useCart(user?.id || "")
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
  }, [error])

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

  // Notify parent of orderTotal
  useEffect(() => {
    if (onTotalCalculated) {
      onTotalCalculated(orderTotal)
    }
  }, [orderTotal, onTotalCalculated])

  // Notify parent of products
  useEffect(() => {
    if (onProductsCalculated && data?.docs) {
      const productDetails = data.docs.map((singleProd) => {
        const quantity = products.find(i => i.productId === singleProd.id)?.quantity || 1;
        return {
          id: singleProd.id,
          name: singleProd.name,
          price: singleProd.price,
          quantity,
          image: singleProd.cover?.url || (singleProd.images?.[0]?.image?.url ?? undefined),
        };
      });
      onProductsCalculated(productDetails);
    }
  }, [onProductsCalculated, data?.docs, products]);

  return (
    <div className='w-full '>
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
        </div>
      </div>
    </div>
  )
}

export default OrderSummary