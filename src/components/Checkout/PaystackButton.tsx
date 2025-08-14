'use client'

import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { MonnifyResponse } from '@/app/(app)/(frontend)/checkout/payment/page'

declare global {
  interface Window {
    PaystackPop?: new () => {
      newTransaction: (config: Record<string, unknown>) => void
    }
  }
}

interface Props {
  buttonType?: string;
  clickEffect?: () => void;
  disabled?: boolean;
  buttonText?: string;
  amount: number;
  fullname?: string;
  email: string;
  description?: string;
  className?: string;
  onSuccess?: (response: MonnifyResponse) => void;
  onCancel?: (response: MonnifyResponse) => void;
  onError?: (response: MonnifyResponse) => void;
}

export default function PaystackButton({ buttonType, clickEffect, disabled = false, buttonText, amount, fullname, email, description, className, onSuccess, onCancel, onError }: Props) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://js.paystack.co/v2/inline.js'
    script.async = true
    script.onload = () => setIsSDKLoaded(true)
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const payWithPaystack = async () => {
    if (!window.PaystackPop) return
    setIsLoading(true)

    try {
      const res = await fetch('/api/paystack/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          customerFullName: fullname,
          customerEmail: email,
          paymentDescription: description,
          metadata: {
            form: 'Paystack Payment Form',
          },
        }),
      })

      const initiateData = await res.json() as {
        key?: string
        reference?: string
        amount?: number
        currency?: string
        metadata?: Record<string, unknown>
        error?: string
      }

      if (!res.ok || !initiateData?.key || !initiateData?.reference) {
        if (onError) onError({ responseMessage: initiateData?.error || 'Failed to initiate Paystack payment' })
        return
      }

      const paystack = new window.PaystackPop()
      const amountInKobo = Math.round((amount || 0) * 100)

      paystack.newTransaction({
        key: initiateData.key,
        email,
        amount: amountInKobo,
        reference: initiateData.reference,
        currency: 'NGN',
        metadata: initiateData.metadata || {},
        onSuccess: (transaction: { reference: string }) => {
          const normalized: MonnifyResponse = {
            paymentReference: transaction.reference,
            transactionReference: transaction.reference,
            status: 'SUCCESS',
            paymentStatus: 'SUCCESS',
            authorizedAmount: amountInKobo / 100,
            paidOn: new Date().toISOString(),
            message: 'Payment successful via Paystack',
            responseMessage: 'Payment successful via Paystack',
          }
          if (onSuccess) onSuccess(normalized)
        },
        onCancel: () => {
          const canceled: MonnifyResponse = {
            status: 'USER_CANCELLED',
            paymentStatus: 'USER_CANCELLED',
            responseMessage: 'Payment was cancelled',
          }
          if (onCancel) onCancel(canceled)
        },
      })
    } catch (err) {
      console.error('Failed to initiate Paystack payment', err)
      if (onError) onError({ responseMessage: 'Payment failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      type={buttonType as "button" | "submit" | "reset" || "button"}
      onClick={() => {
        if (clickEffect) {
          clickEffect()
        }
        payWithPaystack()
      }}
      disabled={!isSDKLoaded || isLoading || disabled}
      className={cn(className)}
    >
      {isLoading ? 'Processing...' : buttonText || 'Pay'}
    </Button>
  )
}


