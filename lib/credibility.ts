/**
 * Social proof shown on the homepage: Airbnb standing, press, guest quotes.
 *
 * Everything here was verified against the public source on the date noted.
 * Update AIRBNB when the numbers move (they're on the host card of any
 * listing); keep PRESS to pieces a visitor can click through to, and mark
 * paid placements so we never call them features.
 */

export const AIRBNB = {
  /** Whole-property listing; its host card shows the all-listings rating and review count. */
  url: 'https://www.airbnb.com/rooms/1674132817665414161',
  rating: '4.98',
  reviews: 58,
  superhost: true,
  asOf: '2026-10-15',
}

export type PressItem = {
  name: string
  /** Where the name links. Omit when the piece is print-only. */
  url?: string
  date: string
  /** Shown as a hover title; keeps the bar honest about what each one is. */
  detail: string
  /** Paid or traded placement, not earned coverage. */
  sponsored?: boolean
}

export const PRESS: PressItem[] = [
  {
    name: 'CultureMap',
    url: 'https://austin.culturemap.com/news/travel/limestone-fields-opening-jewett/',
    date: 'May–June 2026',
    detail: 'Opening stories on CultureMap Austin, Dallas and San Antonio, and June travel roundups on Austin, Dallas, Houston and Fort Worth',
  },
  {
    name: 'KXAN Studio 512',
    url: 'https://www.kxan.com/studio-512/escape-to-limestone-fields-a-scenic-texas-retreat-with-farm-experiences-tomato-tips-and-digital-detox-living/',
    date: 'May 26, 2026',
    detail: 'Trisha Bates on Austin’s NBC station: the farm, tomato tips and unplugged cabins',
  },
  {
    name: 'Tribeza',
    url: 'https://tribeza.com/culture/texas-travel/tribeza-2026-summer-getaway-guide/',
    date: 'July/August 2026',
    detail: 'Summer Getaway Guide, print and online (sponsored placement)',
    sponsored: true,
  },
  {
    name: 'Palomino County Magazine',
    date: 'September 2026',
    detail: 'Texas Round Up spread: the pick for Lake Limestone (print only)',
  },
]

export type GuestQuote = {
  quote: string
  name: string
  from?: string
  /** Shown on the homepage; the rest are available for other pages. */
  featured?: boolean
}

/** Verbatim from Airbnb guest reviews, punctuation and all. */
export const GUEST_QUOTES: GuestQuote[] = [
  {
    quote: 'My stay felt like a high-end hotel, but with the tranquility of a farm.',
    name: 'Amber',
    from: 'Austin, TX',
    featured: true,
  },
  {
    quote: 'The cabins feel like they belong to the land — a cozy mix of rustic charm and luxurious comfort.',
    name: 'Marshall',
    from: 'Waco, TX',
    featured: true,
  },
  {
    quote:
      'What was supposed to be a one-night getaway quickly turned into two nights because we simply didn\'t want to leave.',
    name: 'Danielle',
    featured: true,
  },
  {
    quote:
      'It is obvious a lot of care and attention went into every detail of the cabins. This was one of the best airbnbs I\'ve rented in the last 15 years.',
    name: 'Thomas',
    from: 'Hamtramck, MI',
  },
  {
    quote: 'The entire experience felt relaxing, intentional, and restorative.',
    name: 'Sigrid',
    from: 'Dallas, TX',
  },
  {
    quote:
      'We had a group of around 30 between a handful of families and this was the perfect getaway!',
    name: 'Rene',
    from: 'Houston, TX',
  },
]
