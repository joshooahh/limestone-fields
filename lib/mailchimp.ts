import { createHash } from 'crypto'

export const FIELD_NOTES_TAG = 'field-notes-website'
const TIMEOUT_MS = 8000

export type MailchimpResult = 'subscribed' | 'skipped' | 'failed'

/**
 * Adds an address to the Field Notes audience (single opt-in).
 *
 * - PUT is an upsert: a new address is subscribed, an existing one is left as it is,
 *   so someone already subscribed counts as success and someone who unsubscribed
 *   earlier is not re-subscribed.
 * - Never throws and never returns upstream error text to the caller.
 */
export async function subscribeToMailchimp(input: {
  email: string
  firstName?: string
}): Promise<MailchimpResult> {
  const apiKey = process.env.MAILCHIMP_API_KEY
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID
  const prefix = process.env.MAILCHIMP_SERVER_PREFIX

  if (!apiKey || !audienceId || !prefix) {
    console.warn(
      '[newsletter] MAILCHIMP_API_KEY, MAILCHIMP_AUDIENCE_ID or MAILCHIMP_SERVER_PREFIX is not set. Signup saved to Sanity only.'
    )
    return 'skipped'
  }

  // The prefix is part of the hostname, so only accept a plain datacenter name like "us2".
  if (!/^[a-z0-9]+$/i.test(prefix) || !/^[a-z0-9]+$/i.test(audienceId)) {
    console.warn('[newsletter] Mailchimp server prefix or audience id has an unexpected format.')
    return 'failed'
  }

  const subscriberHash = createHash('md5').update(input.email.toLowerCase()).digest('hex')
  const base = `https://${prefix}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}`
  const headers = {
    Authorization: `Basic ${Buffer.from(`field-notes:${apiKey}`).toString('base64')}`,
    'Content-Type': 'application/json',
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const member = await fetch(base, {
      method: 'PUT',
      headers,
      signal: controller.signal,
      body: JSON.stringify({
        email_address: input.email,
        status_if_new: 'subscribed',
        ...(input.firstName ? { merge_fields: { FNAME: input.firstName } } : {}),
      }),
    })

    if (!member.ok) {
      console.warn(`[newsletter] Mailchimp member upsert failed with HTTP ${member.status}.`)
      return 'failed'
    }

    // The tag is a convenience for segmenting. A failure here does not undo the subscription.
    const tag = await fetch(`${base}/tags`, {
      method: 'POST',
      headers,
      signal: controller.signal,
      body: JSON.stringify({ tags: [{ name: FIELD_NOTES_TAG, status: 'active' }] }),
    })
    if (!tag.ok) {
      console.warn(`[newsletter] Mailchimp tag call failed with HTTP ${tag.status}.`)
    }

    return 'subscribed'
  } catch (error) {
    const reason = error instanceof Error && error.name === 'AbortError' ? 'timed out' : 'network error'
    console.warn(`[newsletter] Mailchimp request ${reason}.`)
    return 'failed'
  } finally {
    clearTimeout(timer)
  }
}
