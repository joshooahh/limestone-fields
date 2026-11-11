import { CLOUDBEDS_PROPERTY_CODE } from '@/lib/cloudbeds'

/**
 * Offers shown on /offers. Each one is a Cloudbeds promo code: the link opens
 * the hosted booking engine with the code already applied.
 *
 * To add an offer (Black Friday, Weekday Sale, Advance Purchase...), create the
 * promo code in Cloudbeds, then add one entry here. To retire one, delete the
 * entry. `bookBy` / `stayBy` are optional and only shown when set.
 *
 * Don't put a discount amount in `description` unless it matches what the
 * code actually does in Cloudbeds.
 */
export type Offer = {
  /** Anchor on the page, so campaigns can link to /offers#slug. */
  slug: string
  /** Cloudbeds promo code, exactly as set up in Cloudbeds (case matters). */
  promoCode: string
  name: string
  description: string
  /** What the code gives, shown under the name. Only what has been checked on the booking page. */
  rate?: string
  /** Who it's for or what to bring, shown in small type. */
  eligibility?: string
  bookBy?: string
  stayBy?: string
}

export const offers: Offer[] = [
  {
    slug: 'clergy',
    promoCode: 'CLERGY',
    name: 'Clergy Rate',
    rate: 'A reduced rate on midweek stays',
    description:
      'For pastors, priests, and others in ministry. A quiet cabin on the lake, for the people who spend their weeks looking after everyone else.',
    eligibility: 'For active and retired clergy.',
  },
  {
    slug: 'military',
    promoCode: 'Military',
    name: 'Military Rate',
    description:
      'For those who serve and those who have served, and the families who serve alongside them.',
    eligibility: 'For active duty, veterans, and military families.',
  },
  {
    slug: 'aaa',
    promoCode: 'AAApublication',
    name: 'AAA Member Rate',
    rate: '10% off our standard rate',
    description:
      'For AAA members making the drive out to Lake Limestone, two hours from Austin, Dallas, and Houston.',
    eligibility: 'For current AAA members.',
  },
]

export function offerBookingUrl(promoCode: string): string {
  return `https://us2.cloudbeds.com/reservation/${CLOUDBEDS_PROPERTY_CODE}#promo=${promoCode}`
}
