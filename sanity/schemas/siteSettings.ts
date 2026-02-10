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
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Physical Address',
      type: 'string',
      description: 'Display address for footer',
    }),
    defineField({
      name: 'mapUrl',
      title: 'Google Map URL',
      type: 'url',
      description: 'Link to Google Maps for the property',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label', description: 'e.g. Instagram' },
            { name: 'url', type: 'url', title: 'URL' },
          ],
          preview: {
            select: { label: 'label' },
            prepare: ({ label }: { label?: string }) => ({ title: label || 'Social link' }),
          },
        },
      ],
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

