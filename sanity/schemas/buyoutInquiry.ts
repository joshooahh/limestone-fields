import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'buyoutInquiry',
  title: 'Buyout Inquiry',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'company',
      title: 'Company/Organization',
      type: 'string',
    }),
    defineField({
      name: 'preferredDates',
      title: 'Preferred Dates',
      type: 'string',
    }),
    defineField({
      name: 'groupSize',
      title: 'Group Size',
      type: 'number',
    }),
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          { title: 'Executive Retreat', value: 'executive_retreat' },
          { title: 'Creative Intensive', value: 'creative_intensive' },
          { title: 'Wedding/Celebration', value: 'wedding_celebration' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'additionalDetails',
      title: 'Additional Details',
      type: 'text',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Proposal Sent', value: 'proposal_sent' },
          { title: 'Negotiating', value: 'negotiating' },
          { title: 'Booked', value: 'booked' },
          { title: 'Declined', value: 'declined' },
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Private notes not visible to customer',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      company: 'company',
      eventType: 'eventType',
      submittedAt: 'submittedAt',
    },
    prepare({ name, company, eventType, submittedAt }) {
      const dateLabel = submittedAt ? new Date(submittedAt).toLocaleDateString() : 'No date'
      return {
        title: name || 'Untitled inquiry',
        subtitle: `${company || 'No company'} • ${eventType || 'Event type?'} • ${dateLabel}`,
      }
    },
  },
})

