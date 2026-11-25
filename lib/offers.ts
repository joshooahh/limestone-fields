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
  /**
   * Cloudbeds promo code, exactly as set up in Cloudbeds (case matters).
   * Leave unset for a public sale rate (e.g. Black Friday Sale) that the
   * booking engine already shows to everyone without a code.
   */
  promoCode?: string
  name: string
  description: string
  /** What the code gives, shown under the name. Only what has been checked on the booking page. */
  rate?: string
  /** Who it's for or what to bring, shown in small type. */
  eligibility?: string
  bookBy?: string
  stayBy?: string
  /**
   * Last day the offer is shown, as YYYY-MM-DD (Central time). After this
   * date it drops off /offers on its own. Leave unset for standing offers.
   */
  showUntil?: string
}

/** Offer terms from Josh's promo notes (Nov 25, 2026). Neither applies to the Full Property. */
const ALL_OFFERS: Offer[] = [
  {
    // Matches the Expedia Black Friday campaign. Book Nov 17–Dec 3, stay
    // Nov 17–Dec 30, 2-night minimum. Cloudbeds can't enforce the booking
    // window, so the rate is switched off by hand after Dec 3.
    slug: 'black-friday',
    promoCode: 'BLACKFRIDAY',
    name: 'Black Friday Sale',
    rate: '15% off any cabin',
    description:
      'A cabin on the lake for less, for a December weekend or a quiet few days midweek before the holidays.',
    eligibility: 'Two-night minimum. Single cabins only, not whole-property buyouts.',
    bookBy: 'December 3',
    stayBy: 'December 30',
    showUntil: '2026-12-03',
  },
  {
    slug: 'weekday-escape',
    promoCode: 'WEEKDAYS',
    name: 'Weekday Escape',
    rate: '15% off any cabin, midweek',
    description:
      'The quietest days on the lake are the ones in the middle of the week. Arrive any day Sunday through Thursday and stay as long as you like.',
    eligibility:
      'Arrive Sunday through Thursday. Your stay can run into Friday or Saturday, but not a weekend night on its own. Single cabins only, not whole-property buyouts.',
  },
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

/** Today as YYYY-MM-DD in Central time, where the property is. */
function todayCentral(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/Chicago' })
}

/** Offers currently shown on /offers: anything past its `showUntil` date is left out. */
export function activeOffers(): Offer[] {
  const today = todayCentral()
  return ALL_OFFERS.filter((o) => !o.showUntil || today <= o.showUntil)
}

export function offerBookingUrl(promoCode?: string): string {
  const base = `https://us2.cloudbeds.com/reservation/${CLOUDBEDS_PROPERTY_CODE}`
  return promoCode ? `${base}#promo=${promoCode}` : base
}
