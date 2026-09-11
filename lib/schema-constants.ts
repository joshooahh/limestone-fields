/**
 * Stable identifier for the Limestone Fields entity. The homepage declares
 * the full LodgingBusiness/Organization schema under this @id; every other
 * page's schema (blog posts, etc.) should reference it via
 * `{ "@id": ORGANIZATION_ID }` instead of duplicating Organization details.
 * This is the "entity recognition" pattern recommended in the SEO/AEO/GEO
 * strategy doc (Section 2) so search engines and LLMs resolve every mention
 * of Limestone Fields back to one consistent entity.
 */
export const ORGANIZATION_ID = 'https://limestonefields.com/#organization'

export const SITE_URL = 'https://limestonefields.com'

/**
 * Default social-share image (aerial of the cabins and pond), used whenever a
 * page has no image of its own and Sanity's SEO Settings document has none.
 * Cropped to the 1200x630 Open Graph ratio by Sanity's image CDN.
 */
export const DEFAULT_OG_IMAGE =
  'https://cdn.sanity.io/images/ve6k1p3k/production/7d112e41d8431e2973f3a02f4011d2cd2e5b86c7-7574x4260.jpg?w=1200&h=630&fit=crop&auto=format'

export const LOGO_URL = `${SITE_URL}/logos/primary/logo-dark.png`

/**
 * Inline publisher for Article schema. Google's Article validation needs the
 * publisher's name and logo on the same page, so this carries them while
 * still pointing at the sitewide entity via @id.
 */
export const PUBLISHER = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: 'Limestone Fields',
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: LOGO_URL },
}

/**
 * Lightweight WebPage block for interior pages that don't carry their own
 * business schema. Ties the page to the sitewide entity by @id so nothing on
 * the site is structurally unconnected.
 */
export function webPageSchema(path: string, name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `${SITE_URL}${path}`,
    name,
    description,
    isPartOf: { '@type': 'WebSite', url: SITE_URL, name: 'Limestone Fields' },
    about: { '@id': ORGANIZATION_ID },
    mainEntity: { '@id': ORGANIZATION_ID },
    primaryImageOfPage: { '@type': 'ImageObject', url: DEFAULT_OG_IMAGE },
  }
}

/** Ready-to-spread Open Graph image list for pages that define their own openGraph block (which replaces the root one). */
export const OG_IMAGES = [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'Limestone Fields — Lake Limestone, TX' }]

/** The property as an event venue: one entity, declared on /private-events, referenced elsewhere. */
export const VENUE_ID = `${SITE_URL}/#venue`

export const AREA_SERVED = [
  { '@type': 'City', name: 'Austin', sameAs: 'https://en.wikipedia.org/wiki/Austin,_Texas' },
  { '@type': 'City', name: 'Dallas', sameAs: 'https://en.wikipedia.org/wiki/Dallas' },
  { '@type': 'City', name: 'Houston', sameAs: 'https://en.wikipedia.org/wiki/Houston' },
  { '@type': 'State', name: 'Texas', sameAs: 'https://en.wikipedia.org/wiki/Texas' },
]

export function breadcrumbSchema(items: [string, string][]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  }
}

/**
 * Schema for a sales landing page that sells one use of the property
 * (a small wedding, a company retreat, a family reunion). The page is not a
 * new venue; it is a Service the venue provides. Provider and location both
 * resolve to the sitewide entities so every landing page strengthens the same
 * knowledge-graph record instead of fragmenting it.
 */
export function landingPageSchema(opts: {
  path: string
  name: string
  serviceType: string
  description: string
  audienceType: string
  image: string
  capacity: number
}) {
  const url = `${SITE_URL}${opts.path}`
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: opts.name,
      serviceType: opts.serviceType,
      description: opts.description,
      url,
      image: opts.image,
      provider: { '@id': ORGANIZATION_ID },
      areaServed: AREA_SERVED,
      audience: { '@type': 'Audience', audienceType: opts.audienceType },
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: `${url}#inquire`,
        availableLanguage: 'en',
      },
      offers: {
        '@type': 'Offer',
        url: `${url}#inquire`,
        availability: 'https://schema.org/InStock',
        priceCurrency: 'USD',
        description: 'Full-property exclusive use. Pricing by proposal after inquiry.',
        eligibleQuantity: { '@type': 'QuantitativeValue', maxValue: opts.capacity, unitText: 'guests' },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      url,
      name: opts.name,
      description: opts.description,
      isPartOf: { '@type': 'WebSite', url: SITE_URL, name: 'Limestone Fields' },
      about: { '@id': VENUE_ID },
      mainEntity: { '@id': `${url}#service` },
      primaryImageOfPage: { '@type': 'ImageObject', url: opts.image },
    },
  ]
}
