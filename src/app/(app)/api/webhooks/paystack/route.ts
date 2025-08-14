import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

interface PaystackEvent<T = unknown> {
  event: string
  data: T
}

interface ChargeSuccessData {
  status: string
  reference: string
  amount: number
  currency: string
  paid_at?: string
  customer?: {
    email?: string
  }
}

export async function POST(req: NextRequest) {
  const secret = process.env.PAYSTACK_SECRET_KEY
  if (!secret) {
    return NextResponse.json({ error: 'Missing Paystack secret key' }, { status: 500 })
  }

  // Read raw body for signature validation
  const rawBody = await req.text()
  const signature = req.headers.get('x-paystack-signature') || ''
  const computed = crypto
    .createHmac('sha512', secret)
    .update(rawBody)
    .digest('hex')

  if (computed !== signature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const event = JSON.parse(rawBody) as PaystackEvent<ChargeSuccessData>

  try {
    if (event.event === 'charge.success') {
      const data = event.data
      if (data && (data.status || '').toLowerCase() === 'success' && (data.currency || '').toUpperCase() === 'NGN') {
        const payload = await getPayload({ config: configPromise })

        // Upsert order by reference; if it exists, set paid; otherwise create a minimal pending record
        // We keep logic idempotent by unique paymentReference field in Orders collection
        const existing = await payload.find({
          collection: 'orders',
          where: {
            paymentReference: { equals: data.reference },
          },
          limit: 1,
        })

        if (existing.docs && existing.docs.length > 0) {
          const orderId = existing?.docs[0]?.id as string
          await payload.update({
            collection: 'orders',
            id: orderId,
            data: {
              status: 'paid',
              paymentCompleted: true,
              amountPaid: String((data.amount || 0) / 100),
            },
          })
        }
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Paystack webhook error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ status: 'Paystack webhook active' })
}


