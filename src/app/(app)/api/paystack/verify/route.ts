import { NextRequest, NextResponse } from 'next/server'

interface VerifyRequestBody {
  reference: string
  expectedAmount: number
}

interface PaystackVerifyData {
  status: string
  reference: string
  amount: number
  currency: string
  paid_at?: string
  customer?: {
    email?: string
  }
}

interface PaystackVerifyResponse {
  status: boolean
  message: string
  data?: PaystackVerifyData
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as VerifyRequestBody
    const { reference, expectedAmount } = body

    if (!reference || !expectedAmount || expectedAmount <= 0) {
      return NextResponse.json({ error: 'Missing reference or expected amount' }, { status: 400 })
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY
    if (!secretKey) {
      return NextResponse.json({ error: 'Missing Paystack secret key' }, { status: 500 })
    }

    // Retry up to 3 times to mitigate transient network drops
    let lastError: unknown = null
    let payload: PaystackVerifyResponse | null = null
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${secretKey}`,
            Accept: 'application/json',
          },
          cache: 'no-store',
        })
        if (!res.ok) {
          const text = await res.text()
          return NextResponse.json({ error: `Verification request failed: ${text}` }, { status: 502 })
        }
        payload = (await res.json()) as PaystackVerifyResponse
        break
      } catch (err) {
        lastError = err
        if (attempt < 3) {
          await sleep(300 * attempt)
          continue
        }
      }
    }

    if (!payload) {
      console.error('Paystack verify network error:', lastError)
      return NextResponse.json({ error: 'Network error while verifying payment. Please try again.' }, { status: 502 })
    }
    const data = payload.data

    const amountInKobo = Math.round(expectedAmount * 100)
    const isSuccessful = !!(data && (data.status || '').toLowerCase() === 'success')
    const amountMatches = !!(data && typeof data.amount === 'number' && data.amount === amountInKobo)
    const currencyMatches = !!(data && (data.currency || '').toUpperCase() === 'NGN')

    const verified = isSuccessful && amountMatches && currencyMatches

    return NextResponse.json({
      verified,
      details: verified
        ? {
            paymentReference: data?.reference,
            transactionReference: data?.reference,
            status: 'SUCCESS',
            paymentStatus: 'SUCCESS',
            authorizedAmount: (data?.amount || 0) / 100,
            paidOn: data?.paid_at || new Date().toISOString(),
            message: 'Payment verified via Paystack',
            responseMessage: payload.message,
          }
        : {
            paymentReference: data?.reference || reference,
            status: 'FAILED',
            responseMessage: payload.message || 'Verification failed',
          },
    })
  } catch (error) {
    console.error('Paystack verify error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}


