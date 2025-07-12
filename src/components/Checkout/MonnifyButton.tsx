'use client'

import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

declare global {
  interface Window {
    MonnifySDK?: any
  }
}

export default function MonnifyButton({ buttonText, amount, fullname, email, description, className }: { buttonText?: string, amount: number, fullname?: string, email: string, description?: string, className?: string }) {
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

      window.MonnifySDK.initialize({
        ...paymentData,
        onLoadStart: () => console.log('Loading Monnify...'),
        onLoadComplete: () => console.log('Monnify Ready'),
        onComplete: (response: any) => {
          console.log('Payment Complete:', response)
        },
        onClose: (data: any) => {
          console.log('Payment Modal Closed:', data)
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
      onClick={payWithMonnify}
      disabled={!isSDKLoaded || isLoading}
      className={cn(className)}
    >
      {isLoading ? 'Processing...' : buttonText || 'Pay'}
    </Button>
  )
}
