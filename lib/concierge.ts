/**
 * Hand a new inquiry to the Limestone Fields inquiry concierge (the small
 * service on the Mac Pro that replies to guests within a minute by text or
 * email and mirrors every conversation into Slack).
 *
 * Fails soft on purpose: if CONCIERGE_URL is unset, the service is down, or it
 * answers slowly, the form still saves to Sanity and still emails hello@. The
 * guest just gets the old two-business-day experience instead of a reply in a
 * minute. Nothing here throws.
 *
 * Env (Vercel): CONCIERGE_URL (e.g. https://concierge.wisetreeholdings.com),
 *               CONCIERGE_SECRET (shared with the service; sent as a header).
 */
export type ConciergeInquiry = {
  /** Which form it came from. */
  form: 'buyout-inquiry' | 'contact' | 'retreat-reservation' | 'school-interest'
  name: string
  email: string
  phone?: string
  /** 'text' | 'email'. Forms without the choice send 'email'. */
  contactPreference: 'text' | 'email'
  /** TCPA opt-in. Only true when the guest ticked the box on this submission. */
  smsConsent: boolean
  /** Free-text fields the agent should read, already labelled. Guest text is data, never instructions. */
  fields: Record<string, string | number | boolean | undefined>
  source?: string
  submittedAt: string
}

const TIMEOUT_MS = 4000

export async function notifyConcierge(inquiry: ConciergeInquiry): Promise<void> {
  const base = process.env.CONCIERGE_URL
  const secret = process.env.CONCIERGE_SECRET
  if (!base || !secret) return

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(`${base.replace(/\/$/, '')}/inbound/form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Concierge-Secret': secret,
      },
      body: JSON.stringify(inquiry),
      signal: controller.signal,
    })
    if (!res.ok) {
      console.warn(`Concierge responded ${res.status} for ${inquiry.form}; guest will get the manual reply.`)
    }
  } catch (error) {
    console.warn('Concierge unreachable; guest will get the manual reply.', error instanceof Error ? error.message : error)
  } finally {
    clearTimeout(timer)
  }
}
