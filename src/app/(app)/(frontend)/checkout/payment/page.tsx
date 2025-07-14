"use client"

import MonnifyButton from "@/components/Checkout/MonnifyButton"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import useGetUser from "@/hooks/use-get-user"
import { useCheckoutStore } from "@/zustand/checkout/store/use-checkout-store"
import { useCart } from "@/zustand/checkout/hooks/use-cart";
import { useEffect, useRef, useMemo } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { PAGES_LINKS } from "@/utils/linksData"
import { CheckoutProduct } from '@/zustand/checkout/store/use-checkout-store';

// Define MonnifyResponse type
export interface MonnifyResponse {
  paymentReference?: string;
  transactionReference?: string;
  status?: string;
  paymentStatus?: string;
  authorizedAmount?: number;
  paidOn?: string;
  message?: string;
  responseMessage?: string;
  responseCode?: string;
}

export default function PaymentPage() {
  const { user } = useGetUser()
  const { addressData, orderTotal, products, clearCheckout } = useCheckoutStore()
  const { clearCart } = useCart(user?.id || "")
  const router = useRouter()
  const trpc = useTRPC();
  const hasRedirected = useRef(false);

  // Defensive fallback: recalculate orderTotal from products if missing
  const fallbackOrderTotal = useMemo(() => {
    if (!products || products.length === 0) return 0;
    return products.reduce((acc, prod) => acc + (prod.price * prod.quantity), 0);
  }, [products]);
  const safeOrderTotal = orderTotal && orderTotal > 0 ? orderTotal : fallbackOrderTotal;

  // increase order count for products ordered
  const incrementOrderCount = useMutation(trpc.products.incrementOrderCount.mutationOptions({
    onSuccess: () => {
      toast.success("Order placed and product stats updated!");
    },
    onError: () => {
      toast.error("Failed to update product order counts.");
    }
  }));


  // create the order record
  const createOrder = useMutation(trpc.orders.createOrder.mutationOptions({
    onSuccess: () => {
      toast.success("Order created successfully!");
    },
    onError: () => {
      toast.error("Failed to create order record.");
    }
  }));


  // on successful payment callback
  const handlePaymentSuccess = (monnifyResponse?: MonnifyResponse) => {
    if (!user || !user.email || !user.id || !addressData) return;

    console.log("Monnify Success Response:", monnifyResponse);

    // Extract payment reference and details from Monnify response
    const paymentReference = monnifyResponse?.paymentReference || "";
    const transactionReference = monnifyResponse?.transactionReference || "";
    const paymentCompleted = monnifyResponse?.status === "SUCCESS";
    const amountPaid = monnifyResponse?.authorizedAmount ? String(monnifyResponse.authorizedAmount) : String(safeOrderTotal);
    const paymentDate = monnifyResponse?.paidOn || new Date().toISOString();
    const paymentDescription = monnifyResponse?.message || `Order payment for ${addressData.firstname} ${addressData.lastname}`;

    // Create order in DB
    createOrder.mutate({
      paymentReference: paymentReference || transactionReference,
      transactionReference: transactionReference,
      paymentCompleted,
      amount: String(safeOrderTotal),
      amountPaid,
      paymentDate,
      paymentDescription,
      customerId: user.id || "",
      userEmail: user.email || "",
      addressSnapshot: addressData,
      productsSnapshot: products,
      productsOrdered: products.map((p: CheckoutProduct) => p.id),
      status: paymentCompleted ? "paid" : "pending",
    });

    // Increment product order counts
    if (products && products.length > 0) {
      incrementOrderCount.mutate({
        products: products.map((p: CheckoutProduct) => ({ id: p.id, quantity: p.quantity }))
      });
    }
    
    clearCheckout();
    clearCart();
    
    // Show success message and redirect
    toast.success(`Payment successful! Transaction: ${transactionReference}`);
    router.replace(PAGES_LINKS.account.link) // Redirect to account page or order confirmation
  };

  // on payment cancellation callback
  const handlePaymentCancel = (monnifyResponse?: MonnifyResponse) => {
    console.log("Monnify Cancellation Response:", monnifyResponse);
    
    const responseMessage = monnifyResponse?.responseMessage || "Payment was cancelled";
    toast.error(responseMessage);
    
    // Don't clear checkout or cart - let user try again
    // Optionally redirect back to delivery page or stay on payment page
  };

  // on payment error callback
  const handlePaymentError = (monnifyResponse?: MonnifyResponse) => {
    console.log("Monnify Error Response:", monnifyResponse);
    
    const errorMessage = monnifyResponse?.responseMessage || "Payment failed. Please try again.";
    toast.error(errorMessage);
    
    // Don't clear checkout or cart - let user try again
  };

  useEffect(() => {    
    // If any required data is missing, redirect back to delivery page
    if (!hasRedirected.current && (!user || !user.email || !addressData || !safeOrderTotal || safeOrderTotal <= 0 || !products || products.length === 0)) {
      hasRedirected.current = true;
      toast.error("Missing delivery, order, or product information. Please complete delivery details first.")
      clearCheckout()
      router.replace("/checkout/delivery")
    }
  }, [user, addressData, safeOrderTotal, products, router])

  // If any required data is missing, don't render payment UI
  if (!user || !user.email || !addressData || !safeOrderTotal || safeOrderTotal <= 0 || !products || products.length === 0) {
    return null
  }

  return (
    <MaxWidthWrapper>
      <div className="max-w-lg mx-auto mt-10 bg-white rounded-lg shadow p-6 flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold mb-2">Delivery Information</h2>
          <div className="text-base text-gray-700">
            <div><span className="font-medium">Name:</span> {addressData.firstname} {addressData.lastname}</div>
            <div><span className="font-medium">Address:</span> {addressData.address}{addressData.appartment ? `, ${addressData.appartment}` : ""}, {addressData.city}</div>
            <div><span className="font-medium">Phone:</span> {addressData.phone}</div>
            <div><span className="font-medium">Email:</span> {user.email}</div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Order Items</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-2 py-1 text-left">Product</th>
                  <th className="px-2 py-1 text-left">Qty</th>
                  <th className="px-2 py-1 text-left">Price</th>
                  <th className="px-2 py-1 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod) => (
                  <tr key={prod.id}>
                    <td className="px-2 py-1 flex items-center gap-2">
                      {prod.image && <img src={prod.image} alt={prod.name} className="w-8 h-8 object-cover rounded" />}
                      {prod.name}
                    </td>
                    <td className="px-2 py-1">{prod.quantity}</td>
                    <td className="px-2 py-1">₦{prod.price.toLocaleString()}</td>
                    <td className="px-2 py-1 font-semibold">₦{(prod.price * prod.quantity).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Order Total</h2>
          <div className="text-lg text-primary font-semibold">₦{safeOrderTotal.toLocaleString()}</div>
        </div>
        <MonnifyButton
          buttonText="Proceed To Pay"
          amount={safeOrderTotal}
          email={user.email}
          description={`Order payment for ${addressData.firstname} ${addressData.lastname}`}
          fullname={`${addressData.firstname} ${addressData.lastname}`}
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
          onError={handlePaymentError}
        />
      </div>
    </MaxWidthWrapper>
  )
}