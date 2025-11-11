import { config as loadEnv } from 'dotenv'
loadEnv({ path: '.env.local' })
loadEnv()
import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset || !token) {
  throw new Error('Missing Sanity environment variables. Check .env.local.')
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

type PortableBlock = {
  _type: 'block'
  style: 'normal'
  markDefs?: []
  children: { _type: 'span'; text: string }[]
}

const block = (text: string): PortableBlock => ({
  _type: 'block',
  style: 'normal',
  markDefs: [],
  children: [{ _type: 'span', text }],
})

const textSection = (key: string, headline: string, paragraphs: string[]) => ({
  _type: 'textSection',
  _key: key,
  headline,
  body: paragraphs.map((paragraph) => block(paragraph)),
})

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  title: 'Limestone Fields',
  description:
    'A collection of cabins on Lake Limestone. Designed for rest, reflection, and the kind of clarity that comes from being still.',
  email: 'hello@limestonefields.com',
  openingDate: 'Spring 2026',
  bookingsOpen: false,
  footerCta: {
    headline: 'Opening Spring 2026',
    body: 'Be the first to know when bookings open. Join our waitlist for early access and updates.',
    buttonText: 'Join the Waitlist',
  },
}

const cabins = [
  {
    _id: 'cabin-standard-cabin',
    _type: 'cabin',
    title: 'Standard Cabin',
    slug: { _type: 'slug', current: 'standard-cabin' },
    squareFeet: 256,
    sleeps: '2',
    bedType: 'King bed',
    features: [
      'Private outdoor cedar soaking tub',
      'Workspace with natural light',
      'No televisions, just windows',
      'Access to Commons Barn',
    ],
    description: [
      block('A clean, well-appointed space for one or two. Large windows frame the landscape. A writing desk faces the view. Everything you need, with nothing extra to manage.'),
      block('For meals and coffee, the Commons Barn waits—stocked with locally roasted beans and a full kitchen ready for your use.'),
      block('Outside, your private cedar soaking tub. Fill it at dusk. Watch the stars appear.'),
      block('This is a cabin built for focus, for rest, for the work that matters when you finally have the space to do it.'),
    ],
    included: [
      'Parachute bed linens and towels',
      'Firewood and fire-starting kit',
      'Organic bath products',
      'Filtered water',
      'Access to Commons Barn kitchen and coffee',
    ],
    images: [],
    order: 1,
  },
  {
    _id: 'cabin-cabin-suite',
    _type: 'cabin',
    title: 'Cabin Suite',
    slug: { _type: 'slug', current: 'cabin-suite' },
    squareFeet: 384,
    sleeps: '4-6',
    bedType: 'King bed + bunk beds',
    features: [
      'Full kitchen with dining table',
      'Private outdoor cedar soaking tub',
      'Workspace with natural light',
      'No televisions, just windows',
      'Sleeps up to 6 guests',
    ],
    description: [
      block('More space. Same intention.'),
      block(
        'The Cabin Suite offers room for a small group or family without losing the simplicity that defines Limestone Fields. A king bed for two. Bunk beds for children or friends. A full kitchen with a dining table where you can share a meal, spread out a project, or sit with morning coffee while everyone else sleeps.'
      ),
      block('Outside, the same private cedar soaking tub. The same wide sky.'),
      block('Whether you\'re here to create together, plan together, or simply be together—this is a space that holds you without crowding you.'),
    ],
    included: [
      'Parachute bed linens and towels for all guests',
      'Locally roasted coffee and tea',
      'Firewood and fire-starting kit',
      'Full kitchen with cookware, dishware, and essentials',
      'Organic bath products',
      'Filtered water',
      'Dining table seating for 6',
    ],
    images: [],
    order: 2,
  },
]

const faqs = [
  ['When do bookings open?', "We're opening Spring 2026. Join our waitlist to be notified the moment bookings go live."],
  ["What's the minimum stay?", 'Minimum stay requirements will be determined closer to opening and may vary by season and demand.'],
  ['Is there cell service?', 'Cell service is available but limited depending on your carrier. WiFi is provided in all cabins and the Commons Barn.'],
  [
    'What should I bring?',
    'We provide all linens, towels, kitchenware, and basic amenities. Bring your own food and beverages (the nearest grocery store is 20 minutes away), any specific toiletries you prefer, and weather-appropriate clothing. Detailed packing suggestions will be sent upon booking.',
  ],
  [
    'Can I bring my dog?',
    'Yes. Pet-friendly cabins are available with advance notice. Pets must remain off furniture and be crated when unattended. $50 per pet, per stay. Select cabins remain pet-free for guests with allergies.',
  ],
  ['Are the cabins accessible?', 'All cabins are single-story with step-free entry. For specific accessibility needs or questions, please contact us directly.'],
  [
    "What's nearby?",
    "Not much, and that's the point. The nearest town (Groesbeck) is 15 minutes away with a small grocery store, gas station, and a few local restaurants. We're intentionally remote.",
  ],
  ['Do you host events or weddings?', 'Yes. Full property buyouts are available for executive retreats, creative intensives, and intimate celebrations. Learn more on our Buyouts page.'],
  [
    'What if I need to cancel?',
    'Our cancellation policy offers full refunds for cancellations made 14+ days prior to arrival, 50% refunds for 7-14 days prior, and no refunds for cancellations less than 7 days prior to arrival.',
  ],
].map(([question, answer], index) => ({
  _id: `faq-${index + 1}`,
  _type: 'faq',
  question,
  answer: [block(answer)],
  order: index + 1,
}))

const policies = [
  {
    _id: 'policy-pet-policy',
    title: 'Pet Policy',
    slug: { _type: 'slug', current: 'pet-policy' },
    content: [
      block('Pet-friendly cabins available with advance notice. Pets must remain off furniture and be crated when unattended. $50 per pet, per stay. Select cabins remain pet-free for guests with allergies.'),
    ],
    order: 1,
  },
  {
    _id: 'policy-cancellation-policy',
    title: 'Cancellation Policy',
    slug: { _type: 'slug', current: 'cancellation-policy' },
    content: [
      block('Full refund for cancellations made 14+ days prior to arrival'),
      block('50% refund for cancellations made 7-14 days prior to arrival'),
      block('No refund for cancellations made less than 7 days prior to arrival'),
    ],
    order: 2,
  },
  {
    _id: 'policy-check-in-check-out',
    title: 'Check-in/Check-out',
    slug: { _type: 'slug', current: 'check-in-check-out' },
    content: [
      block('Check-in: 4:00 PM'),
      block('Check-out: 11:00 AM'),
      block('Early check-in and late check-out may be available upon request, subject to availability.'),
    ],
    order: 3,
  },
  {
    _id: 'policy-accessibility',
    title: 'Accessibility',
    slug: { _type: 'slug', current: 'accessibility' },
    content: [
      block('All cabins are single-story with step-free entry. For specific accessibility needs, please contact us directly at hello@limestonefields.com.'),
    ],
    order: 4,
  },
].map((policy) => ({ _type: 'policy', ...policy }))

const pages = [
  {
    _id: 'page-home',
    _type: 'page',
    title: 'Home',
    slug: { _type: 'slug', current: 'home' },
    heroHeadline: 'Quiet ground for honest work.',
    heroSubhead:
      'A collection of cabins on Lake Limestone. Designed for rest, reflection, and the kind of clarity that comes from being still.',
    sections: [
      textSection('home-section-1', 'Cabins designed for presence', [
        'Ten cabins, two layouts, all crafted with the essentials you need and nothing extra.',
        'Natural materials, intentional details, and space to take a deeper breath.',
        'Presence over performance. Generous windows. Honest amenities. A pace set for restoration.',
      ]),
    ],
  },
  {
    _id: 'page-stay',
    _type: 'page',
    title: 'Stay',
    slug: { _type: 'slug', current: 'stay' },
    heroHeadline: 'The Cabins at Limestone Fields',
    heroSubhead: "Ten cabins. Two styles. One simple truth: everything you need, nothing you don't.",
    sections: [
      textSection('stay-section-1', 'Designed for presence', [
        'Each cabin is designed for presence. No televisions, just windows. No distractions, just the essentials done exceptionally well.',
        'Parachute linens. A private cedar soaking tub beneath the sky. The Commons Barn offers high-quality pour-over coffee and a full kitchen for your use—whenever you need it, never required.',
      ]),
    ],
  },
  {
    _id: 'page-buyouts',
    _type: 'page',
    title: 'Buyouts',
    slug: { _type: 'slug', current: 'buyouts' },
    heroHeadline: 'Full Property Buyouts',
    heroSubhead: 'Ten cabins, gathering spaces, and wide-open fields reserved entirely for your people.',
    sections: [
      textSection('buyouts-section-1', 'Make it yours', [
        'Whether you are planning an executive retreat, a creative intensive, or an intimate celebration, a full-property buyout gives you Limestone Fields entirely to yourself.',
        'Gather in the Commons Barn, let conversations linger around the fire pits, and have private cabins ready for restorative sleep when the evening winds down.',
      ]),
    ],
  },
  {
    _id: 'page-story',
    _type: 'page',
    title: 'Story',
    slug: { _type: 'slug', current: 'story' },
    heroHeadline: 'Our Story',
    heroSubhead: 'Built by friends who believe deeply in unhurried mornings, shared meals, and a sense of place.',
    sections: [
      textSection('story-section-1', 'An intentional retreat in Middle Tennessee', [
        'Limestone Fields began as a sketch on paper and a desire to build a place we wanted to escape to with friends and family.',
        'What followed was a commitment to honest materials, generous daylight, and the sort of small details that make you feel considered.',
      ]),
    ],
  },
  {
    _id: 'page-contact',
    _type: 'page',
    title: 'Contact',
    slug: { _type: 'slug', current: 'contact' },
    heroHeadline: 'Stay in touch',
    heroSubhead:
      'Have a question about Limestone Fields, partnerships, or future stays? Drop a note and we will follow up.',
    sections: [
      textSection('contact-section-1', 'We would love to hear from you', [
        'We are still building, but we are here. Join the waitlist for opening updates, or email us directly with questions about the property, partnerships, or future bookings.',
        'Lake Limestone, Texas — approximately two hours from Austin, Dallas, and Houston.',
      ]),
    ],
  },
]

async function seed() {
  try {
    console.log('🌱 Seeding Sanity content...\n')

    console.log('→ Upserting site settings')
    await client.createOrReplace(siteSettings)

    for (const cabin of cabins) {
      console.log(`→ Upserting cabin: ${cabin.title}`)
      await client.createOrReplace(cabin)
    }

    for (const faq of faqs) {
      console.log(`→ Upserting FAQ: ${faq.question}`)
      await client.createOrReplace(faq)
    }

    for (const policy of policies) {
      console.log(`→ Upserting policy: ${policy.title}`)
      await client.createOrReplace(policy)
    }

    for (const page of pages) {
      console.log(`→ Upserting page: ${page.title}`)
      await client.createOrReplace(page)
    }

    console.log('\n🎉 Seed complete! Open http://localhost:3000/studio to review.')
  } catch (error) {
    console.error('❌ Seed failed', error)
    process.exit(1)
  }
}

seed()

