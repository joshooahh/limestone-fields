import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { waitlistSchema } from '@/lib/validations'
import { resend, CONTACT_EMAIL, FROM_EMAIL } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = waitlistSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 })
    }

    const { firstName, lastName, email, interests } = parsed.data

    // Save to Sanity
    await client.create({
      _type: 'waitlistSubmission',
      firstName,
      lastName,
      email,
      interests,
      submittedAt: new Date().toISOString(),
    })

    // Send notification email
    await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `New waitlist signup — ${firstName} ${lastName}`,
      html: `
        <h2 style="font-family:sans-serif;color:#253136;">New Waitlist Signup — Limestone Fields</h2>
        <p style="font-family:sans-serif;"><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p style="font-family:sans-serif;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p style="font-family:sans-serif;"><strong>Interests:</strong></p>
        <ul style="font-family:sans-serif;">
          ${(interests ?? []).map((i: string) => `<li>${i}</li>`).join('')}
        </ul>
        <hr style="margin-top:24px;border:none;border-top:1px solid #e5e7eb;"/>
        <p style="font-family:sans-serif;font-size:12px;color:#9ca3af;">Submitted via limestonefields.com</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Waitlist submission error:', error)
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
  }
}
