import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { schoolInterestSchema } from '@/lib/validations'
import { resend, FROM_EMAIL } from '@/lib/email'
import { SCHOOL_NOTIFY_EMAILS, SCHOOL_REPLY_TO, getSchoolClass } from '@/lib/school'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * "Get first word" sign-ups from Art of Living School class pages. Saves to
 * Sanity (schoolInterest), notifies the hosts, and sends the guest a short
 * acknowledgement. Nothing is booked or charged here.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = schoolInterestSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 })
    }

    const { classSlug, name, email, phone, bringingSomeone, notes } = parsed.data
    // "all" = the sign-up on the /school index, for the whole season.
    const schoolClass = classSlug === 'all' ? { title: 'The whole season' } : getSchoolClass(classSlug)
    if (!schoolClass) {
      return NextResponse.json({ error: 'Unknown class' }, { status: 400 })
    }

    await client.create({
      _type: 'schoolInterest',
      classSlug,
      classTitle: schoolClass.title,
      name,
      email,
      phone,
      bringingSomeone,
      notes,
      status: 'new',
      submittedAt: new Date().toISOString(),
    })

    const safe = {
      name: escapeHtml(name),
      email: escapeHtml(email),
      phone: escapeHtml(phone),
      notes: escapeHtml(notes),
      title: escapeHtml(schoolClass.title),
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: SCHOOL_NOTIFY_EMAILS,
      replyTo: email,
      subject: `Art of Living School · ${schoolClass.title} — ${name}`,
      html: `
        <h2 style="font-family:sans-serif;color:#253136;">${safe.title} — new sign-up</h2>
        <p style="font-family:sans-serif;"><strong>Name:</strong> ${safe.name}</p>
        <p style="font-family:sans-serif;"><strong>Email:</strong> <a href="mailto:${safe.email}">${safe.email}</a></p>
        ${phone ? `<p style="font-family:sans-serif;"><strong>Phone:</strong> ${safe.phone}</p>` : ''}
        <p style="font-family:sans-serif;"><strong>Coming with someone:</strong> ${bringingSomeone ? 'Yes' : 'No'}</p>
        ${notes ? `<p style="font-family:sans-serif;"><strong>Notes:</strong><br/>${safe.notes.replace(/\n/g, '<br/>')}</p>` : ''}
        <hr style="margin-top:24px;border:none;border-top:1px solid #e5e7eb;"/>
        <p style="font-family:sans-serif;font-size:12px;color:#9ca3af;">Submitted via limestonefields.com/school${classSlug === 'all' ? '' : `/${classSlug}`}. Reply to this email to answer them directly.</p>
      `,
    })

    const firstName = safe.name.split(' ')[0]
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      replyTo: SCHOOL_REPLY_TO,
      subject: `You're on the list — ${classSlug === 'all' ? 'the Art of Living School' : schoolClass.title} at Limestone Fields`,
      html: `
        <div style="font-family:Georgia,serif;color:#253136;max-width:560px;line-height:1.6;">
          <p>Hi ${firstName},</p>
          <p>Thanks for your interest in ${classSlug === 'all' ? 'the Art of Living School' : `${safe.title}, part of the Art of Living School`} at Limestone Fields.</p>
          <p>We're setting the dates now. You'll hear first, before the class is announced anywhere else, with the weekend, the price, and a link to hold your cabin.</p>
          <p>Questions in the meantime? Just reply to this note.</p>
          <p>— Limestone Fields</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('School interest submission error:', error)
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
  }
}
