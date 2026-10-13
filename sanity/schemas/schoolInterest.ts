import { defineType, defineField } from 'sanity'

/**
 * "Get first word" sign-ups from Art of Living School class pages
 * (/school/[slug]). Dates and prices aren't set yet, so these are interest,
 * not bookings — each one is a person to write to when the class opens.
 */
export default defineType({
  name: 'schoolInterest',
  title: 'Art of Living School Sign-up',
  type: 'document',
  fields: [
    defineField({ name: 'classSlug', title: 'Class', type: 'string' }),
    defineField({ name: 'classTitle', title: 'Class Title', type: 'string' }),
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'bringingSomeone', title: 'Bringing someone', type: 'boolean' }),
    defineField({ name: 'notes', title: 'Notes', type: 'text' }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['new', 'contacted', 'booked', 'not this time'] },
      initialValue: 'new',
    }),
    defineField({ name: 'submittedAt', title: 'Submitted At', type: 'datetime' }),
  ],
  orderings: [{ title: 'Newest first', name: 'submittedAtDesc', by: [{ field: 'submittedAt', direction: 'desc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'classTitle' },
  },
})
