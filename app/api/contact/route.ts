import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { contactSchema } from '@/lib/validations'
import { resend, CONTACT_EMAIL, FROM_EMAIL } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 })
    }

    const { name, email, message } = parsed.data

    // Save to Sanity
    await client.create({
      _type: 'contactSubmission',
      name,
      email,
      message,
      submittedAt: new Date().toISOString(),
    })

    // Send notification email
    await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `New contact message from ${name}`,
      html: `
        <h2 style="font-family:sans-serif;color:#253136;">New Contact Message — Limestone Fields</h2>
        <p style="font-family:sans-serif;"><strong>Name:</strong> ${name}</p>
        <p style="font-family:sans-serif;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p style="font-family:sans-serif;"><strong>Message:</strong></p>
        <p style="font-family:sans-serif;">${message ?? '(no message provided)'}</p>
        <hr style="margin-top:24px;border:none;border-top:1px solid #e5e7eb;"/>
        <p style="font-family:sans-serif;font-size:12px;color:#9ca3af;">Submitted via limestonefields.com</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact submission error:', error)
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
  }
}
