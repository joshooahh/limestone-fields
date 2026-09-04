import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { retreatReservationSchema } from '@/lib/validations'
import { resend, FROM_EMAIL } from '@/lib/email'
import { RETREAT_NOTIFY_EMAILS, RETREAT_REPLY_TO, RETREAT_BOOKING_URL, RETREAT_DEPOSIT_TERMS } from '@/lib/retreat'

const CABIN_LABEL: Record<string, string> = {
  standard: 'Standard Cabin (single occupancy)',
  suite: 'Cabin Suite',
  either: 'Either — help me choose',
}

const OCCUPANCY_LABEL: Record<string, string> = {
  single: 'Just me',
  double: 'Me plus a companion',
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Writers Retreat (Limestone Fields × Sobremesa, Nov 6–9 2026) reservation
 * requests. Rooms for those dates are held in Cloudbeds under the Sobremesa
 * Magazine group block, so this is request → personal confirmation → deposit,
 * not a self-serve booking. Saves to Sanity, notifies the team, and sends the
 * guest a short acknowledgement.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = retreatReservationSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 })
    }

    const { intent, name, email, phone, cabinPreference, occupancy, earlyArrival, dietary, notes } = parsed.data
    const isQuestion = intent === 'question'

    await client.create({
      _type: 'retreatReservation',
      intent,
      name,
      email,
      phone,
      cabinPreference,
      occupancy,
      earlyArrival,
      dietary,
      notes,
      status: 'new',
      submittedAt: new Date().toISOString(),
    })

    const safe = {
      name: escapeHtml(name),
      email: escapeHtml(email),
      phone: escapeHtml(phone),
      dietary: escapeHtml(dietary),
      notes: escapeHtml(notes),
    }
    const cabinLabel = cabinPreference ? CABIN_LABEL[cabinPreference] ?? cabinPreference : 'Not chosen yet'
    const occupancyLabel = OCCUPANCY_LABEL[occupancy] ?? occupancy

    // Hosts notification — Josh, Jaclyn, Katie
    await resend.emails.send({
      from: FROM_EMAIL,
      to: RETREAT_NOTIFY_EMAILS,
      replyTo: email,
      subject: isQuestion
        ? `Writers Retreat question — ${name}`
        : `Writers Retreat reservation request — ${name}`,
      html: `
        <h2 style="font-family:sans-serif;color:#253136;">Writers Retreat — ${isQuestion ? 'new question' : 'new reservation request'}</h2>
        <p style="font-family:sans-serif;"><strong>Name:</strong> ${safe.name}</p>
        <p style="font-family:sans-serif;"><strong>Email:</strong> <a href="mailto:${safe.email}">${safe.email}</a></p>
        ${phone ? `<p style="font-family:sans-serif;"><strong>Phone:</strong> ${safe.phone}</p>` : ''}
        ${
          isQuestion
            ? ''
            : `
        <p style="font-family:sans-serif;"><strong>Cabin preference:</strong> ${cabinLabel}</p>
        <p style="font-family:sans-serif;"><strong>Occupancy:</strong> ${occupancyLabel}</p>
        <p style="font-family:sans-serif;"><strong>Thursday early arrival:</strong> ${earlyArrival ? 'Yes' : 'No'}</p>
        ${dietary ? `<p style="font-family:sans-serif;"><strong>Dietary / allergies:</strong> ${safe.dietary}</p>` : ''}`
        }
        ${notes ? `<p style="font-family:sans-serif;"><strong>${isQuestion ? 'Question' : 'Notes'}:</strong><br/>${safe.notes.replace(/\n/g, '<br/>')}</p>` : ''}
        <hr style="margin-top:24px;border:none;border-top:1px solid #e5e7eb;"/>
        <p style="font-family:sans-serif;font-size:12px;color:#9ca3af;">Submitted via limestonefields.com/writers-retreat. Reply to this email to answer the guest directly.${
          isQuestion ? '' : ' To confirm: hold the cabin in the Sobremesa Magazine block in Cloudbeds and send the guest the block booking link.'
        }</p>
      `,
    })

    // Guest acknowledgement
    const firstName = safe.name.split(' ')[0]
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      replyTo: RETREAT_REPLY_TO,
      subject: isQuestion
        ? 'We got your question — Writers Retreat, Nov 6–9'
        : 'Your place at the table — Writers Retreat, Nov 6–9',
      html: isQuestion
        ? `
        <div style="font-family:Georgia,serif;color:#253136;max-width:560px;line-height:1.6;">
          <p>Hi ${firstName},</p>
          <p>Thanks for writing about the Writers Retreat at Limestone Fields with Sobremesa, November 6–9, 2026.</p>
          <p>Your question went to the hosts at Limestone Fields and Sobremesa. One of us will reply within two business days.</p>
          <p style="font-size:14px;color:#686121;">You asked:<br/>${safe.notes.replace(/\n/g, '<br/>')}</p>
          <p>— Limestone Fields &amp; Sobremesa</p>
        </div>
      `
        : `
        <div style="font-family:Georgia,serif;color:#253136;max-width:560px;line-height:1.6;">
          <p>Hi ${firstName},</p>
          <p>Thank you for asking to join the Writers Retreat at Limestone Fields with Sobremesa, November 6–9, 2026.</p>
          <p>This is a small gathering, so the hosts confirm each place personally. Within two business days we'll reply with your cabin held and the link to book it. ${RETREAT_DEPOSIT_TERMS} Places are confirmed in the order requests arrive.</p>
          <p>If you'd rather not wait, you can <a href="${RETREAT_BOOKING_URL}" style="color:#253136;">book your cabin directly</a> now.</p>
          <p style="font-size:14px;color:#686121;">You asked for: ${cabinLabel} · ${occupancyLabel}${earlyArrival ? ' · Thursday early arrival' : ''}</p>
          <p>Questions in the meantime? Just reply to this note.</p>
          <p>— Limestone Fields &amp; Sobremesa</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Retreat reservation submission error:', error)
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
  }
}
