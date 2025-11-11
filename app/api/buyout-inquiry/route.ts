import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { buyoutInquirySchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = buyoutInquirySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 })
    }

    const { name, email, phone, company, preferredDates, groupSize, eventType, additionalDetails } = parsed.data

    await client.create({
      _type: 'buyoutInquiry',
      name,
      email,
      phone,
      company,
      preferredDates,
      groupSize,
      eventType,
      additionalDetails,
      submittedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Buyout inquiry submission error:', error)
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
  }
}

