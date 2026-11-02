import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { newsletterSchema } from '@/lib/validations'
import { subscribeToMailchimp } from '@/lib/mailchimp'
import { clientIp, isRateLimited } from '@/lib/rate-limit'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Honeypot: a filled hidden field means a bot. Answer as if it worked and do nothing.
  const company = (body as { company?: unknown } | null)?.company
  if (typeof company === 'string' && company.trim() !== '') {
    return NextResponse.json({ success: true })
  }

  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: 'Too many sign-ups from this connection. Please try again in a few minutes.' },
      { status: 429 }
    )
  }

  const parsed = newsletterSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const { email, firstName } = parsed.data

  const mailchimp = await subscribeToMailchimp({ email, firstName })

  let saved = true
  try {
    await client.create({
      _type: 'newsletterSignup',
      email,
      firstName,
      source: 'newsletter',
      mailchimpSynced: mailchimp === 'subscribed',
      submittedAt: new Date().toISOString(),
    })
  } catch (error) {
    saved = false
    console.error('[newsletter] Sanity save failed:', error instanceof Error ? error.message : 'unknown error')
  }

  // The visitor succeeds if the address landed in at least one place.
  if (!saved && mailchimp !== 'subscribed') {
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
