'use client'

import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { MonnifyResponse } from '@/app/(app)/(frontend)/checkout/payment/page';

declare global {
  interface Window {
    MonnifySDK?: {
      initialize: unknown
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

export default function MonnifyButton({ buttonType, clickEffect, disabled = false, buttonText, amount, fullname, email, description, className, onSuccess, onCancel, onError }: Props) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://sdk.monnify.com/plugin/monnify.js'
    script.async = true
    script.onload = () => setIsSDKLoaded(true)
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const payWithMonnify = async () => {
    if (!window.MonnifySDK) return
    setIsLoading(true)

    try {
      const res = await fetch('/api/initiate-payment', {
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
            form: 'Monnify Demo Form',
          },
        }),
      })

      const paymentData = await res.json()

      // @ts-expect-error there is no type
      window.MonnifySDK.initialize({
        ...paymentData,
        onLoadStart: () => console.log('Loading Monnify...'),
        onLoadComplete: () => console.log('Monnify Ready'),
        onComplete: (response: MonnifyResponse) => {
          console.log('Payment Complete:', response)

          // Handle different response types
          const responseData = response;

          if (responseData?.paymentStatus === 'SUCCESS' || responseData?.status === 'SUCCESS') {
            if (onSuccess) onSuccess(response)
          } else if (responseData?.paymentStatus === 'USER_CANCELLED' || responseData?.responseCode === 'USER_CANCELLED') {
            console.log('Payment Cancelled by User:', response)
            if (onCancel) onCancel(response)
          } else {
            console.log('Payment Error or Unknown Status:', response)
            if (onError) onError(response)
          }
        },
        onClose: (data: MonnifyResponse) => {
          console.log('Payment Modal Closed:', data)
          // Handle modal close as cancellation
          if (onCancel) onCancel(data)
        },
      })
    } catch (err) {
      console.error('Failed to initiate payment', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      type={buttonType as "button" | "submit" | "reset" || "button"}
      onClick={() => {
        clickEffect && clickEffect()
        payWithMonnify()
      }}
      disabled={!isSDKLoaded || isLoading || disabled}
      className={cn(className)}
    >
      {isLoading ? 'Processing...' : buttonText || 'Pay'}
    </Button>
  )
}
