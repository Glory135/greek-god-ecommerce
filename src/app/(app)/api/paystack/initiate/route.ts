import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      amount,
      customerFullName,
      customerEmail,
      paymentDescription,
      metadata,
    } = body

    if (!amount || !customerFullName || !customerEmail || !paymentDescription) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const reference = `REF-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    const key = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY

    if (!key) {
      return NextResponse.json({ error: 'Missing Paystack public key' }, { status: 500 })
    }

    const data = {
      key,
      reference,
      amount,
      currency: 'NGN',
      metadata: metadata || {},
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}


