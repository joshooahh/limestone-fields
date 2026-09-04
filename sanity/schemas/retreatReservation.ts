import { defineType, defineField } from 'sanity'

/**
 * Reservation requests from the Writers Retreat landing page
 * (/writers-retreat). Cabins for Nov 6–9, 2026 are held in Cloudbeds under
 * the Sobremesa Magazine group block, so guests can't self-book — each
 * request is confirmed by hand and assigned from the block.
 */
export default defineType({
  name: 'retreatReservation',
  title: 'Writers Retreat Reservation',
  type: 'document',
  fields: [
    defineField({
      name: 'intent',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Reservation request', value: 'reserve' },
          { title: 'Question', value: 'question' },
        ],
      },
      initialValue: 'reserve',
    }),
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({
      name: 'cabinPreference',
      title: 'Cabin Preference',
      type: 'string',
      options: {
        list: [
          { title: 'Standard Cabin (single)', value: 'standard' },
          { title: 'Cabin Suite', value: 'suite' },
          { title: 'Either — help me choose', value: 'either' },
        ],
      },
    }),
    defineField({
      name: 'occupancy',
      title: 'Occupancy',
      type: 'string',
      options: {
        list: [
          { title: 'Just me', value: 'single' },
          { title: 'Me plus a companion', value: 'double' },
        ],
      },
    }),
    defineField({
      name: 'earlyArrival',
      title: 'Thursday early arrival requested',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({ name: 'dietary', title: 'Dietary Needs / Allergies', type: 'text' }),
    defineField({ name: 'notes', title: 'Notes from Guest', type: 'text' }),
    defineField({ name: 'submittedAt', title: 'Submitted At', type: 'datetime' }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Cabin Offered', value: 'offered' },
          { title: 'Deposit Sent', value: 'deposit_sent' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Waitlist', value: 'waitlist' },
          { title: 'Declined', value: 'declined' },
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'cabinAssigned',
      title: 'Cabin Assigned (internal)',
      type: 'string',
      description: 'Which cabin from the Cloudbeds block this guest was given.',
    }),
    defineField({
      name: 'internalNotes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Private notes not visible to the guest',
    }),
  ],
  preview: {
    select: { name: 'name', intent: 'intent', cabinPreference: 'cabinPreference', status: 'status', submittedAt: 'submittedAt' },
    prepare({ name, intent, cabinPreference, status, submittedAt }) {
      const dateLabel = submittedAt ? new Date(submittedAt).toLocaleDateString() : 'No date'
      return {
        title: name || 'Untitled request',
        subtitle: `${intent === 'question' ? 'question' : cabinPreference ?? 'cabin?'} • ${status ?? 'new'} • ${dateLabel}`,
      }
    },
  },
})
