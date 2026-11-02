import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'newsletterSignup',
  title: 'Field Notes Signup',
  type: 'document',
  fields: [
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'firstName', title: 'First Name', type: 'string' }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      initialValue: 'newsletter',
    }),
    defineField({
      name: 'mailchimpSynced',
      title: 'Added to Mailchimp',
      type: 'boolean',
      description:
        'False means the Mailchimp call was skipped or failed. Add this person to the Field Notes audience by hand.',
    }),
    defineField({ name: 'submittedAt', title: 'Submitted At', type: 'datetime' }),
  ],
  preview: {
    select: {
      firstName: 'firstName',
      email: 'email',
      submittedAt: 'submittedAt',
      synced: 'mailchimpSynced',
    },
    prepare({ firstName, email, submittedAt, synced }) {
      const date = submittedAt ? new Date(submittedAt).toLocaleDateString() : ''
      return {
        title: firstName ? `${firstName} (${email})` : email,
        subtitle: `${date}${synced === false ? ' • not yet in Mailchimp' : ''}`.trim(),
      }
    },
  },
})
