import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { contactSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 })
    }

    const { name, email, message } = parsed.data

    await client.create({
      _type: 'contactSubmission',
      name,
      email,
      message,
      submittedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact submission error:', error)
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
  }
}
