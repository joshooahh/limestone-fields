/**
 * Writers Retreat (Limestone Fields × Sobremesa · Nov 6–9, 2026) shared config.
 *
 * Every reservation request and question from /writers-retreat goes to all
 * three hosts. Override with RETREAT_NOTIFY_EMAILS (comma-separated) without
 * a code change.
 */
const DEFAULT_RETREAT_NOTIFY_EMAILS = [
  'josh@limestonefields.com',
  'jaclyn@limestonefields.com',
  'hellosobremesamagazine@gmail.com', // Katie Rice, Sobremesa
]

const fromEnv = (process.env.RETREAT_NOTIFY_EMAILS ?? '')
  .split(',')
  .map((e) => e.trim())
  .filter(Boolean)

export const RETREAT_NOTIFY_EMAILS: string[] = fromEnv.length ? fromEnv : DEFAULT_RETREAT_NOTIFY_EMAILS

/** Reply-to for the guest acknowledgement, so "just reply" reaches a host. */
export const RETREAT_REPLY_TO = 'josh@limestonefields.com'

/**
 * Direct booking into the Sobremesa Magazine allotment block in Cloudbeds
 * (rate plan "Sobremesa x Limestone Fields Writer's Retreat", Nov 6–9 2026).
 * The all-inclusive price is on the rate plan, so guests book and pay there.
 */
export const RETREAT_BOOKING_URL =
  'https://us2.cloudbeds.com/en/reservation/N1pYag/?allotment_block_code=b827423&currency=usd&checkin=2026-11-06&checkout=2026-11-09'

/** Payment terms set on the Cloudbeds block: half at booking, the rest 30 days before arrival. */
export const RETREAT_DEPOSIT_TERMS = 'A 50% deposit confirms your cabin when you book. The balance is charged 30 days before arrival.'
