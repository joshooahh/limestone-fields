import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'waitlistSubmission',
  title: 'Waitlist Submission',
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'interests',
      title: 'Interests',
      type: 'array',
      of: [{ type: 'string' }],
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
          { title: 'Contacted', value: 'contacted' },
          { title: 'Converted', value: 'converted' },
        ],
      },
      initialValue: 'new',
    }),
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      submittedAt: 'submittedAt',
    },
    prepare({ firstName, lastName, email, submittedAt }) {
      return {
        title: `${firstName ?? ''} ${lastName ?? ''}`.trim() || email,
        subtitle: submittedAt
          ? `${email} • ${new Date(submittedAt).toLocaleDateString()}`
          : email,
      }
    },
  },
})

