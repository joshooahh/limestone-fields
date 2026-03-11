import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { buyoutInquirySchema } from '@/lib/validations'
import { resend, CONTACT_EMAIL, FROM_EMAIL } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = buyoutInquirySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 })
    }

    const { name, email, phone, company, preferredDates, groupSize, eventType, additionalDetails } = parsed.data

    // Save to Sanity
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

    // Send notification email
    await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `New ${eventType ?? 'buyout'} inquiry from ${name}`,
      html: `
        <h2 style="font-family:sans-serif;color:#253136;">New Inquiry — Limestone Fields</h2>
        <p style="font-family:sans-serif;"><strong>Name:</strong> ${name}</p>
        <p style="font-family:sans-serif;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        ${phone ? `<p style="font-family:sans-serif;"><strong>Phone:</strong> ${phone}</p>` : ''}
        ${company ? `<p style="font-family:sans-serif;"><strong>Company:</strong> ${company}</p>` : ''}
        ${eventType ? `<p style="font-family:sans-serif;"><strong>Event Type:</strong> ${eventType}</p>` : ''}
        ${groupSize ? `<p style="font-family:sans-serif;"><strong>Group Size:</strong> ${groupSize}</p>` : ''}
        ${preferredDates ? `<p style="font-family:sans-serif;"><strong>Preferred Dates:</strong> ${preferredDates}</p>` : ''}
        ${additionalDetails ? `<p style="font-family:sans-serif;"><strong>Additional Details:</strong><br/>${additionalDetails}</p>` : ''}
        <hr style="margin-top:24px;border:none;border-top:1px solid #e5e7eb;"/>
        <p style="font-family:sans-serif;font-size:12px;color:#9ca3af;">Submitted via limestonefields.com</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Buyout inquiry submission error:', error)
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
  }
}
