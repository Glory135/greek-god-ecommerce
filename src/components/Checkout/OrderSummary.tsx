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
import { Color, Size } from '@/payload-types';

interface OrderSummaryProps {
  onTotalCalculated?: (total: number) => void;
  onProductsCalculated?: (products: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string
  }>) => void;
  calculatingDeliveryFee?:boolean;
  deliveryFee?: number;
}

const OrderSummary = ({ onTotalCalculated, onProductsCalculated, deliveryFee = 0, calculatingDeliveryFee = false }: OrderSummaryProps) => {
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

  // const getDeliveryFee = () => {
  //   const highest = data?.docs && data?.docs.length > 0 ? data?.docs.reduce((prev, current) =>
  //     current?.deliveryFee && prev?.deliveryFee &&
  //       current?.deliveryFee > prev?.deliveryFee ? current : prev
  //   ) : null
  //   return highest?.deliveryFee
  // }

  const orderTotal = calculateTotals() || 0;
  const totalWithDelivery = orderTotal + (deliveryFee || 0);

  // Notify parent of orderTotal (now includes deliveryFee)
  useEffect(() => {
    if (onTotalCalculated) {
      onTotalCalculated(orderTotal)
    }
  }, [orderTotal, onTotalCalculated])

  // Notify parent of products
  useEffect(() => {
    if (onProductsCalculated && data?.docs) {
      const productDetails = data.docs.map((singleProd) => {
        const cartProd = products.find(i => i.productId === singleProd.id);
        const quantity = cartProd?.quantity || 1;
        // Resolve color and size labels
        let colorLabel = undefined;
        let sizeLabel = undefined;
        if (cartProd?.color && Array.isArray(singleProd["available colors"])) {
          const colorObj = singleProd["available colors"].find((c: Color) => c.id === cartProd.color);
          colorLabel = colorObj?.label || cartProd.color;
        }
        if (cartProd?.size && Array.isArray(singleProd["available sizes"])) {
          const sizeObj = singleProd["available sizes"].find((s: Size) => s.id === cartProd.size);
          sizeLabel = sizeObj?.label || cartProd.size;
        }
        return {
          id: singleProd.id,
          name: singleProd.name,
          price: singleProd.price,
          quantity,
          image: singleProd.cover?.url || (singleProd.images?.[0]?.image?.url ?? undefined),
          size: sizeLabel,
          color: colorLabel,
          // deliveryFee: singleProd.deliveryFee ?? 0,
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
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold">Subtotal ({totalProductsInCart})</h4>
          <p className="text-base">{formatPrice(`${calculateTotals()}`)}</p>
        </div>
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold">Delivery</h4>
          <p className="text-base">{
            calculatingDeliveryFee ?
            "Calculating..."
            : !calculatingDeliveryFee && deliveryFee && deliveryFee !== 0
              ? formatPrice(`${deliveryFee}`)
              : "Not Yet Calculated"
          }</p>
        </div>
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold">Total Order</h4>
          <div className="flex gap-1">
            <p className="text-base">{formatPrice(`${totalWithDelivery}`)}</p>
            {
              !deliveryFee && (
                <p className="text-sm text-primary/50">
                  + delivery
                </p>
              )
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default OrderSummary