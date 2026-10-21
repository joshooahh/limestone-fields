import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { buyoutInquirySchema } from '@/lib/validations'
import { resend, CONTACT_EMAIL, FROM_EMAIL } from '@/lib/email'
import { notifyConcierge } from '@/lib/concierge'

const EVENT_LABEL: Record<string, string> = {
  small_wedding: 'small wedding',
  company_retreat: 'company retreat',
  family_reunion: 'family reunion',
  executive_retreat: 'executive retreat',
  creative_intensive: 'creative intensive',
  wedding_celebration: 'wedding/celebration',
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = buyoutInquirySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 })
    }

    const { name, email, phone, company, preferredDates, groupSize, eventType, additionalDetails, source, contactPreference, smsConsent } = parsed.data
    const submittedAt = new Date().toISOString()

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
      source,
      contactPreference,
      smsConsent,
      submittedAt,
    })

    // Send notification email
    await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `New ${EVENT_LABEL[eventType] ?? eventType ?? 'buyout'} inquiry from ${name}`,
      html: `
        <h2 style="font-family:sans-serif;color:#253136;">New Inquiry — Limestone Fields</h2>
        <p style="font-family:sans-serif;"><strong>Name:</strong> ${name}</p>
        <p style="font-family:sans-serif;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p style="font-family:sans-serif;"><strong>Mobile:</strong> ${phone}</p>
        <p style="font-family:sans-serif;"><strong>Prefers:</strong> ${contactPreference === 'text' ? 'text' : 'email'}${smsConsent ? ' (agreed to texts)' : ' (no text consent)'}</p>
        ${company ? `<p style="font-family:sans-serif;"><strong>Company:</strong> ${company}</p>` : ''}
        ${eventType ? `<p style="font-family:sans-serif;"><strong>Event Type:</strong> ${eventType}</p>` : ''}
        ${groupSize ? `<p style="font-family:sans-serif;"><strong>Group Size:</strong> ${groupSize}</p>` : ''}
        ${preferredDates ? `<p style="font-family:sans-serif;"><strong>Preferred Dates:</strong> ${preferredDates}</p>` : ''}
        ${additionalDetails ? `<p style="font-family:sans-serif;"><strong>Additional Details:</strong><br/>${additionalDetails}</p>` : ''}
        ${source ? `<p style="font-family:sans-serif;font-size:12px;color:#6b7280;"><strong>Source:</strong> ${source}</p>` : ''}
        <hr style="margin-top:24px;border:none;border-top:1px solid #e5e7eb;"/>
        <p style="font-family:sans-serif;font-size:12px;color:#9ca3af;">Submitted via limestonefields.com</p>
      `,
    })

    // Hand to the concierge so the guest hears back within a minute. Fails soft.
    await notifyConcierge({
      form: 'buyout-inquiry',
      name,
      email,
      phone,
      contactPreference,
      smsConsent,
      fields: { company, preferredDates, groupSize, eventType, additionalDetails },
      source,
      submittedAt,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Buyout inquiry submission error:', error)
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
  }
}
