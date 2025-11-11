import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'cabin',
  title: 'Cabin',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "Standard Cabin" or "Cabin Suite"',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({
      name: 'squareFeet',
      title: 'Square Feet',
      type: 'number',
    }),
    defineField({
      name: 'sleeps',
      title: 'Sleeps',
      type: 'string',
      description: 'e.g. "2" or "4-6"',
    }),
    defineField({
      name: 'bedType',
      title: 'Bed Type',
      type: 'string',
      description: 'e.g. "King bed" or "King bed + bunk beds"',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet list of features',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'included',
      title: "What's Included",
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which cabin appears on /stay page',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})

