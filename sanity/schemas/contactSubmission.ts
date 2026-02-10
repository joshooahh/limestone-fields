import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactSubmission',
  title: 'Contact Submission',
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
      name: 'message',
      title: 'Message',
      type: 'text',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      email: 'email',
      submittedAt: 'submittedAt',
    },
    prepare({ name, email, submittedAt }) {
      return {
        title: name || email,
        subtitle: submittedAt
          ? `${email} • ${new Date(submittedAt).toLocaleDateString()}`
          : email,
      }
    },
  },
})
