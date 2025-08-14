"use client"

import MonnifyButton from "@/components/Checkout/MonnifyButton"
import PaystackButton from "@/components/Checkout/PaystackButton"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import useGetUser from "@/hooks/use-get-user"
import { useCheckoutStore } from "@/zustand/checkout/store/use-checkout-store"
import { useCart } from "@/zustand/checkout/hooks/use-cart";
import { useEffect, useRef, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { PAGES_LINKS } from "@/utils/linksData"
import { CheckoutProduct } from '@/zustand/checkout/store/use-checkout-store';
import { formatPrice } from "@/lib/utils"
import { CART_STORAGE_STRING, CHECKOUT_STORAGE_STRING } from "@/constants"
import Image from "next/image"

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
  const { addressData, orderTotal, products, deliveryFee, clearCheckout } = useCheckoutStore()
  const { clearCart, products: cartProducts } = useCart(user?.id || "")
  const router = useRouter()
  const trpc = useTRPC();
  const hasRedirected = useRef(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const paymentProvider = (process.env.NEXT_PUBLIC_PAYMENT_PROVIDER || 'paystack') as 'paystack' | 'monnify'
  const isPaystack = paymentProvider === 'paystack'


  // Clear stale checkout data if cart is empty (prevents using old order data)
  useEffect(() => {
    if (cartProducts.length === 0 && (products.length > 0 || addressData || orderTotal)) {
      clearCheckout();
    }
  }, [cartProducts.length, products.length, addressData, orderTotal, clearCheckout]);


  // Defensive fallback: recalculate orderTotal from products if missing
  const fallbackOrderTotal = useMemo(() => {
    if (!products || products.length === 0) return 0;
    return products.reduce((acc, prod) => acc + (prod.price * prod.quantity), 0);
  }, [products]);
  const safeOrderTotal = orderTotal && orderTotal > 0 ? orderTotal : fallbackOrderTotal;
  const safeDeliveryFee = typeof deliveryFee === 'number' && deliveryFee > 0 ? deliveryFee : 0;
  const grandTotal = safeOrderTotal + safeDeliveryFee;

  // increase order count for products ordered
  const incrementOrderCount = useMutation(trpc.products.incrementOrderCount.mutationOptions());


  // create the order record
  const createOrder = useMutation(trpc.orders.createOrder.mutationOptions({
    onSuccess: () => {
      toast.success("Order created successfully!");
      clearCheckout();
      clearCart();

      // Also manually clear localStorage to ensure persistence is cleared
      if (typeof window !== 'undefined') {
        localStorage.removeItem(CHECKOUT_STORAGE_STRING);
        localStorage.removeItem(CART_STORAGE_STRING);
      }

      // Force a page refresh to ensure all state is completely reset
      setTimeout(() => {
        window.location.href = PAGES_LINKS.account.link;
      }, 500);
    },
    onError: () => {
      toast.error("Failed to create order record.");
    }
  }));


  // on successful payment callback
  const handlePaymentSuccess = async (monnifyResponse?: MonnifyResponse) => {
    if (!user || !user.email || !user.id || !addressData) return;

    // Validate that we have fresh cart data (not stale checkout data)
    if (cartProducts.length === 0) {
      toast.error('Bag data is missing. Please try again.');
      clearCheckout();
      router.replace(PAGES_LINKS.checkout.link);
      return;
    }

    // If Paystack is active, verify transaction server-side before proceeding
    let effectiveResponse: MonnifyResponse | undefined = monnifyResponse
    if (isPaystack) {
      try {
        const ref = monnifyResponse?.paymentReference || monnifyResponse?.transactionReference || ""
        const verificationRes = await fetch('/api/paystack/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reference: ref, expectedAmount: grandTotal }),
        })
        const verificationJson = await verificationRes.json() as { verified: boolean; details?: MonnifyResponse; error?: string }
        if (!verificationRes.ok || !verificationJson.verified) {
          toast.error('Payment verification failed. Please contact support if you were charged.')
          return
        }
        if (verificationJson.details) {
          effectiveResponse = verificationJson.details
        }
      } catch (err) {
        toast.error('Unable to verify payment at the moment. Please try again.')
        return
      }
    }

    // Extract payment reference and details from response
    const paymentReference = effectiveResponse?.paymentReference || "";
    const transactionReference = effectiveResponse?.transactionReference || "";
    const paymentCompleted = effectiveResponse?.status === "SUCCESS";
    const amountPaid = effectiveResponse?.authorizedAmount ? String(effectiveResponse.authorizedAmount) : String(grandTotal);
    const paymentDate = effectiveResponse?.paidOn || new Date().toISOString();
    const paymentDescription = effectiveResponse?.message || `Order payment for ${addressData.firstname} ${addressData.lastname}`;

    // Validate that checkout products match cart products
    const cartProductIds = cartProducts.map(p => p.productId).sort();
    const checkoutProductIds = products.map(p => p.id).sort();
    const productsMatch = JSON.stringify(cartProductIds) === JSON.stringify(checkoutProductIds);

    if (!productsMatch) {
      toast.error("Product data mismatch. Please try again.");
      clearCheckout();
      router.replace(PAGES_LINKS.checkout.link);
      return;
    }

    // Create order in DB - use current cart products to ensure fresh data
    createOrder.mutate({
      paymentReference: paymentReference || transactionReference,
      transactionReference: transactionReference,
      paymentCompleted,
      amount: String(safeOrderTotal),
      deliveryFee: safeDeliveryFee,
      grandTotal: String(grandTotal),
      amountPaid,
      paymentDate,
      paymentDescription,
      customerId: user.id || "",
      userEmail: user.email || "",
      addressSnapshot: addressData,
      productsSnapshot: products, // This should be the current checkout products
      productsOrdered: products.map((p: CheckoutProduct) => p.id),
      status: paymentCompleted ? "paid" : "pending",
    });

    // Increment product order counts
    if (products && products.length > 0) {
      incrementOrderCount.mutate({
        products: products.map((p: CheckoutProduct) => ({ id: p.id, quantity: p.quantity }))
      });
    }

    setIsRedirecting(true);

    // Show success message
    toast.success(`Payment successful! Transaction: ${transactionReference}`);
  };

  // on payment cancellation callback
  const handlePaymentCancel = (monnifyResponse?: MonnifyResponse) => {
    const responseMessage = monnifyResponse?.responseMessage || "Payment was cancelled";
    console.log(responseMessage);
    // toast.error(responseMessage);
  };

  // on payment error callback
  const handlePaymentError = (monnifyResponse?: MonnifyResponse) => {
    const errorMessage = monnifyResponse?.responseMessage || "Payment failed. Please try again.";
    toast.error(errorMessage);
  };

  useEffect(() => {
    // If any required data is missing, redirect back to delivery page
    if (isRedirecting) return;
    if (!hasRedirected.current && (!user || !user.email || !addressData || !safeOrderTotal || safeOrderTotal <= 0 || !products || products.length === 0)) {
      hasRedirected.current = true;
      // toast.error("Missing delivery, order, or product information. Please complete delivery details first.")
      clearCheckout()
      router.replace("/checkout/delivery")
    }
  }, [user, addressData, safeOrderTotal, products, router, isRedirecting])

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
                      {prod.image && <Image width={50} height={50} src={prod.image} alt={prod.name} className="object-cover rounded" />}
                      {prod.name}
                    </td>
                    <td className="px-2 py-1">{prod.quantity}</td>
                    <td className="px-2 py-1">{formatPrice(prod.price.toLocaleString())}</td>
                    <td className="px-2 py-1 font-semibold">{formatPrice((prod.price * prod.quantity).toLocaleString())}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Order Total</h2>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span>Subtotal:</span>
              <span>{formatPrice(safeOrderTotal.toLocaleString())}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Delivery Fee:</span>
              <span>{safeDeliveryFee > 0 ? formatPrice(safeDeliveryFee.toLocaleString()) : "Free"}</span>
            </div>
            <div className="flex items-center justify-between font-bold text-primary">
              <span>Grand Total:</span>
              <span>{formatPrice(grandTotal.toLocaleString())}</span>
            </div>
          </div>
        </div>
        { (process.env.NEXT_PUBLIC_PAYMENT_PROVIDER || 'paystack') === 'paystack' ? (
          <PaystackButton
            buttonText={`Pay ${formatPrice(grandTotal.toLocaleString())}`}
            amount={grandTotal}
            email={user.email}
            description={`Order payment for ${addressData.firstname} ${addressData.lastname}`}
            fullname={`${addressData.firstname} ${addressData.lastname}`}
            onSuccess={handlePaymentSuccess}
            onCancel={handlePaymentCancel}
            onError={handlePaymentError}
          />
        ) : (
          <MonnifyButton
            buttonText={`Pay ${formatPrice(grandTotal.toLocaleString())}`}
            amount={grandTotal}
            email={user.email}
            description={`Order payment for ${addressData.firstname} ${addressData.lastname}`}
            fullname={`${addressData.firstname} ${addressData.lastname}`}
            onSuccess={handlePaymentSuccess}
            onCancel={handlePaymentCancel}
            onError={handlePaymentError}
          />
        )}
      </div>
    </MaxWidthWrapper>
  )
}