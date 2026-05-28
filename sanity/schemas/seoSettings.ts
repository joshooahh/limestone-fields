import { defineType, defineField } from 'sanity'

const seoFields = [
  defineField({
    name: 'title',
    title: 'Page Title',
    type: 'string',
    description: 'Appears in the browser tab and Google search results. Aim for ~60 characters.',
  }),
  defineField({
    name: 'description',
    title: 'Meta Description',
    type: 'text',
    rows: 3,
    description: 'Appears below the title in search results. Aim for ~155 characters.',
  }),
  defineField({
    name: 'ogImage',
    title: 'Social Share Image',
    type: 'image',
    description: 'Image shown when this page is shared on social media. 1200×630px recommended.',
    options: { hotspot: true },
  }),
]

const pageField = (name: string, title: string, url: string) =>
  defineField({
    name,
    title: `${title} (${url})`,
    type: 'object',
    fields: seoFields,
    options: { collapsible: true, collapsed: true },
  })

export default defineType({
  name: 'seoSettings',
  title: 'SEO Settings',
  type: 'document',
  groups: [
    { name: 'main', title: 'Main Pages' },
    { name: 'booking', title: 'Booking Pages' },
    { name: 'events', title: 'Events Pages' },
    { name: 'other', title: 'Other Pages' },
  ],
  fields: [
    // Main
    { ...pageField('home', 'Homepage', '/'), group: 'main' },
    { ...pageField('stay', 'Stay', '/stay'), group: 'main' },
    { ...pageField('experience', 'Experience', '/experience'), group: 'main' },
    { ...pageField('theProperty', 'The Property', '/the-property'), group: 'main' },
    { ...pageField('story', 'Our Story', '/story'), group: 'main' },
    // Booking
    { ...pageField('book', 'Book / Reservations', '/book'), group: 'booking' },
    { ...pageField('traditionalCabin', 'Traditional Cabin', '/book/traditional-cabin'), group: 'booking' },
    { ...pageField('familyCabin', 'Family-Sized Cabin', '/book/family-cabin'), group: 'booking' },
    // Events
    { ...pageField('privateEvents', 'Private Events', '/private-events'), group: 'events' },
    { ...pageField('weddings', 'Weddings', '/weddings'), group: 'events' },
    { ...pageField('buyouts', 'Buyouts / Corporate', '/buyouts'), group: 'events' },
    // Other
    { ...pageField('contact', 'Contact', '/contact'), group: 'other' },
  ],
})
