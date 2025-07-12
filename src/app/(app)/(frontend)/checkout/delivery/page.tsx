"use client"

import MonnifyButton from "@/components/Checkout/MonnifyButton";
import OrderSummary from "@/components/Checkout/OrderSummary";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SectionTitle from "@/components/Sections/SectionTitle";
import { buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import useGetUser from "@/hooks/use-get-user";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/server";
import { PAGES_LINKS } from "@/utils/linksData";
import { useCart } from "@/zustand/checkout/hooks/use-cart";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";


export default function DeliveryPage() {
  const [delivery, setDelivery] = useState({
    firstname: "",
    lastname: "",
    address: "",
    appartment: "",
    state: "",
    phone: "",
  })
  const [saveData, setSaveData] = useState(false)
  const user = useGetUser()
  const { products } = useCart(user?.id || "")


  const handleChange = (name: string, value: string) => {
    setDelivery(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const { data } = useQuery(trpc.checkout.getProducts.queryOptions({
    ids: products.map(i => i.productId)
  }))

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
          <SectionTitle title="Delivery Information" />
          <form className="w-full flex flex-col gap-5">
            <div className="flex gap-5 w-full flex-wrap">
              <Input
                type="text"
                name="firstname"
                value={delivery.firstname}
                className="flex-1"
                placeholder="First Name"
                required
                onChange={(e) => handleChange("firstname", e.target.value)}
              />
              <Input
                type="text"
                name="lastname"
                value={delivery.lastname}
                className="flex-1"
                placeholder="Last Name"
                required
                onChange={(e) => handleChange("lastname", e.target.value)}
              />
            </div>
            <Input
              type="text"
              name="address"
              value={delivery.address}
              className=""
              placeholder="Address"
              required
              onChange={(e) => handleChange("address", e.target.value)}
            />
            <Input
              type="text"
              name="appartment"
              value={delivery.appartment}
              className=""
              placeholder="Apartment,suite,etc.(optional)"
              onChange={(e) => handleChange("appartment", e.target.value)}
            />
            <Input
              type="text"
              name="state"
              value={delivery.state}
              className=""
              placeholder="City / State"
              required
              onChange={(e) => handleChange("state", e.target.value)}
            />
            <Input
              type="text"
              name="state"
              value={delivery.state}
              className=""
              placeholder="City / State"
              required
              onChange={(e) => handleChange("state", e.target.value)}
            />
            <div className="flex gap-2 items-center">
              <Checkbox checked={saveData} onClick={() => setSaveData(prev => !prev)} /> <p>Save this information for next time</p>
            </div>
            <div className="w-full flex gap-5 justify-between my-5">
              <Link
                href={PAGES_LINKS.checkout.link}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                  }))}
              >Back to Checkout
              </Link>
              <MonnifyButton
                buttonText="Proceed To Pay"
                amount={orderTotal}
                email={user?.email|| ""}
                description="test transaction"
                fullname="Adeyemi Glory"
              />
            </div>
          </form>
        </div>
        <div className="lg:col-span-3 h-fit lg:sticky top-24">
          <OrderSummary />
        </div>
      </MaxWidthWrapper>
    </div>
  )
}