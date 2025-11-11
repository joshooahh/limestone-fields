import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'openingDate',
      title: 'Opening Date',
      type: 'string',
      description: 'Display text like "Spring 2026"',
    }),
    defineField({
      name: 'bookingsOpen',
      title: 'Bookings Open',
      type: 'boolean',
      description: 'Toggle to enable booking functionality',
    }),
    defineField({
      name: 'footerCta',
      title: 'Footer CTA',
      type: 'object',
      fields: [
        { name: 'headline', type: 'string', title: 'Headline' },
        { name: 'body', type: 'text', title: 'Body' },
        { name: 'buttonText', type: 'string', title: 'Button Text' },
      ],
    }),
  ],
})

