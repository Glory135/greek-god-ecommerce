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

    // Validate required fields
    if (!amount || !customerFullName || !customerEmail || !paymentDescription) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const reference = `REF-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    const contractCode = process.env.NEXT_PUBLIC_MONNIFY_CONTRACT_CODE
    const apiKey = process.env.NEXT_PUBLIC_MONNIFY_API_KEY

    const paymentData = {
      amount,
      currency: 'NGN',
      reference,
      customerFullName,
      customerEmail,
      apiKey,
      contractCode,
      paymentDescription,
      metadata: metadata || {},
    }

    return NextResponse.json(paymentData)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
