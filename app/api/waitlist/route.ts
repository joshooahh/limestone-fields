import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { waitlistSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = waitlistSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 })
    }

    const { firstName, lastName, email, interests } = parsed.data

    await client.create({
      _type: 'waitlistSubmission',
      firstName,
      lastName,
      email,
      interests,
      submittedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Waitlist submission error:', error)
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
  }
}

