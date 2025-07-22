"use client"

import OrderSummary from "@/components/Checkout/OrderSummary";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SectionTitle from "@/components/Sections/SectionTitle";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import useGetUser from "@/hooks/use-get-user";
import { cn } from "@/lib/utils";
import { addressFieldsSchema } from "@/modules/DeliveryAddresses/schema";
import { useTRPC } from "@/trpc/client";
import { PAGES_LINKS } from "@/utils/linksData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useCheckoutStore } from "@/zustand/checkout/store/use-checkout-store";
import { CheckoutProduct } from '@/zustand/checkout/store/use-checkout-store';
import { DeliveryAddress } from "@/payload-types";
import { useCart } from "@/zustand/checkout/hooks/use-cart";
import { STATES } from "@/utils/data";
import { AUTH_CALLBACK_STORE_STRING } from "@/constants";


export default function DeliveryPage() {
  const [saveData, setSaveData] = useState(false)
  const [selectedAddressId, setSelectedAddressId] = useState<string>("")
  const [selectedState, setSelectedState] = useState<string>("");
  const [localDeliveryFee, setLocalDeliveryFee] = useState<number>(0);
  const { user, isLoading: userLoading, isError: userError } = useGetUser()
  const router = useRouter()
  const pathname = usePathname()

  const trpc = useTRPC();
  const { setAddressData, setOrderTotal, setProducts, setDeliveryFee, orderTotal, clearCheckout } = useCheckoutStore();
  const { products: cartProducts } = useCart(user?.id || "");

  // Clear stale checkout data if cart is empty (prevents using old order data)
  useEffect(() => {
    if (cartProducts.length === 0 && orderTotal) {
      console.log('Clearing stale checkout data on delivery page - cart is empty but orderTotal exists');
      clearCheckout();
    }
  }, [cartProducts.length, orderTotal, clearCheckout]);

  // Handle authentication redirect
  useEffect(() => {
    if (userError || (!userLoading && (!user || !user.id || !user.email))) {
      toast.error("Please log in to continue with checkout");
      localStorage.setItem(AUTH_CALLBACK_STORE_STRING, pathname);
      router.replace("/login");
    }
  }, [userError, userLoading, user, router, pathname]);

  // Fetch user addresses
  const { data: addressesData, isLoading: addressesLoading } = useQuery(
    trpc.delivery.getUserAddresses.queryOptions({
      customerId: user?.id || ""
    },
      {
        enabled: !!user?.id,
      }
    )
  );

  // Fetch delivery fee when selectedState changes
  const { data: statesDeliveryFee, isFetching: isFetchingDeliveryFee, error: errorDeliveryFee, isError: isErorDeliveryFee, isSuccess: isSuccessDeliveryFee } = useQuery(
    trpc.deliveryFees.getDeliveryFee.queryOptions(
      { state: selectedState },
      {
        enabled: !!selectedState,
      }
    )
  );

  useEffect(() => {
    if (isErorDeliveryFee) {
      console.error("Failed to fetch delivery fee", errorDeliveryFee);
      setLocalDeliveryFee(0);
      setDeliveryFee(0);
      return;
    }
    if (statesDeliveryFee && isSuccessDeliveryFee) {
      console.log(statesDeliveryFee);
      
      const fee = statesDeliveryFee?.deliveryFee || 0;
      setLocalDeliveryFee(fee);
      setDeliveryFee(fee);
      return;
    }
  }, [statesDeliveryFee, isFetchingDeliveryFee, isSuccessDeliveryFee, isErorDeliveryFee, selectedState])

  const addAddress = useMutation(trpc.delivery.addInfo.mutationOptions({
    onError: (error) => {
      toast(error.message)
    },
    onSuccess: async () => {
      toast.success("Address saved successfully!");
    }
  }))

  const form = useForm<z.infer<typeof addressFieldsSchema>>({
    mode: "all",
    resolver: zodResolver(addressFieldsSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      address: "",
      appartment: "",
      city: "",
      phone: "",
    }
  });

  // Auto-populate form when address is selected
  useEffect(() => {
    if (selectedAddressId && addressesData?.data) {
      const selectedAddress = addressesData.data.find(addr => addr.id === selectedAddressId);
      if (selectedAddress) {
        // Only reset if the form values are actually different
        const currentValues = form.getValues();
        if (
          currentValues.firstname !== (selectedAddress.firstname || "") ||
          currentValues.lastname !== (selectedAddress.lastname || "") ||
          currentValues.address !== selectedAddress.address ||
          currentValues.appartment !== (selectedAddress.appartment || "") ||
          currentValues.city !== selectedAddress.city ||
          currentValues.phone !== selectedAddress.phone
        ) {
          form.reset({
            firstname: selectedAddress.firstname || "",
            lastname: selectedAddress.lastname || "",
            address: selectedAddress.address,
            appartment: selectedAddress.appartment || "",
            city: selectedAddress.city,
            phone: selectedAddress.phone,
          });
          setSelectedState(selectedAddress.city?.toLowerCase() || "");
        }
      }
    }
  }, [selectedAddressId, addressesData?.data, form]);

  // Save orderTotal from OrderSummary (memoized)
  const handleTotalCalculated = useCallback((total: number) => {
    setOrderTotal(total);
  }, [setOrderTotal]);

  // Save products from OrderSummary (memoized)
  const handleProductsCalculated = useCallback((products: CheckoutProduct[]) => {
    setProducts(products);
  }, [setProducts]);

  const onSubmit = (values: z.infer<typeof addressFieldsSchema>) => {
    if (!orderTotal || orderTotal <= 0) {
      toast.error("Order total is missing or invalid. Please check your bag.");
      return;
    }
    // Always save to Zustand store for payment page
    setAddressData(values);
    setOrderTotal(orderTotal);
    // Save to database only if user checked "Save this information"
    if (saveData) {
      addAddress.mutate({ ...values, customerId: user?.id || "" });
    }
    router.push(PAGES_LINKS.payment.link);
  }


  const formatAddressForSelect = (address: DeliveryAddress) => {
    const name = `${address.firstname || ""} ${address.lastname || ""}`.trim();
    const addressLine = `${address.address}${address.appartment ? `, ${address.appartment}` : ""}`;
    return `${name} - ${addressLine}, ${address.city}`;
  };

  const isWorking = addressesLoading || isFetchingDeliveryFee;


  // User data validation and loading states
  if (userLoading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin w-8 h-8 text-primary" />
          <p className="text-lg text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }
  // Redirect if user is not authenticated or there's an error
  if (userError || !user || !user.id || !user.email) {
    return (
      <div className="w-full flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full">
      <MaxWidthWrapper className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16 relative">
        <div className="lg:col-span-4">
          <SectionTitle title="Delivery Information" />

          {/* Loading Spinner */}
          {addressesLoading && (
            <div className="flex items-center justify-center my-8">
              <Loader2 className="animate-spin w-8 h-8 text-primary" />
              <span className="ml-3 text-primary text-lg font-medium">Loading your saved addresses...</span>
            </div>
          )}

          {/* Saved Addresses Select */}
          {addressesData?.data && addressesData.data.length > 0 && !addressesLoading && (
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">
                Select a saved address
              </label>
              <Select
                value={selectedAddressId}
                onValueChange={(value) => {
                  setSelectedAddressId(value);
                  if (value === "new") {
                    form.reset({
                      firstname: "",
                      lastname: "",
                      address: "",
                      appartment: "",
                      city: "",
                      phone: "",
                    });
                  }
                }}
                disabled={addressesLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a saved address or add new" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">
                    + Add new address
                  </SelectItem>
                  {addressesData.data.map((address) => (
                    <SelectItem key={address.id} value={address.id}>
                      {formatAddressForSelect(address)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-5"
              aria-busy={isWorking}
            >
              <div className="flex gap-5 w-full flex-wrap">
                <FormField
                  name="firstname"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input {...field} type="text" placeholder="First Name" className="flex-1" disabled={isWorking} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="lastname"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input {...field} type="text" placeholder="Last Name" className="flex-1" disabled={isWorking} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                name="address"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input {...field} type="text" placeholder="Address" disabled={isWorking} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="appartment"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input {...field} type="text" placeholder="Apartment,suite,etc.(optional)" disabled={isWorking} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="city"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Select
                        {...field}
                        disabled={isWorking}
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedState(value);
                        }}
                        value={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="City / State" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>States In Nigeria</SelectLabel>
                            {
                              STATES.map((state) => (
                                <SelectItem value={state.toLowerCase()} key={state}>{state}</SelectItem>
                              ))
                            }
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {/* <Input {...field} type="text" placeholder="City / State" disabled={addressesLoading} /> */}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input {...field} type="text" placeholder="Phone" disabled={isWorking} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Show checkbox only for new addresses */}
              {(!selectedAddressId || selectedAddressId === "new") && (
                <div className="flex gap-2 items-center">
                  <Checkbox checked={saveData} onClick={() => setSaveData(prev => !prev)} disabled={isWorking} /> <p>Save this information for next time</p>
                </div>
              )}
              <div className="w-full flex gap-5 justify-between my-5">
                <Link
                  href={PAGES_LINKS.checkout.link}
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                    }))}
                >Back to Checkout
                </Link>
                <Button type="submit" disabled={isWorking}>
                  Proceed To Pay
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="lg:col-span-3 h-fit lg:sticky top-24">
          <OrderSummary 
          onTotalCalculated={handleTotalCalculated}
          onProductsCalculated={handleProductsCalculated} 
          deliveryFee={localDeliveryFee} 
          calculatingDeliveryFee={isFetchingDeliveryFee}
          />
        </div>
      </MaxWidthWrapper>
    </div>
  )
}