import { z } from 'zod'

export const waitlistSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Enter a valid email'),
  interests: z.array(z.string()).optional().default([]),
})

export type WaitlistFormData = z.infer<typeof waitlistSchema>
export type WaitlistFormInput = z.input<typeof waitlistSchema>

export const buyoutInquirySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().default(''),
  company: z.string().default(''),
  preferredDates: z.string().min(1, 'Preferred dates are required'),
  groupSize: z.coerce.number().min(1, 'Group size is required'),
  eventType: z.string().min(1, 'Event type is required'),
  additionalDetails: z.string().default(''),
})

export type BuyoutInquiryFormData = z.infer<typeof buyoutInquirySchema>
export type BuyoutInquiryFormInput = z.input<typeof buyoutInquirySchema>

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  message: z.string().min(1, 'Message is required'),
})

export type ContactFormData = z.infer<typeof contactSchema>
export type ContactFormInput = z.input<typeof contactSchema>


export const retreatReservationSchema = z
  .object({
    /** "reserve" = request a place; "question" = just asking, no cabin needed. */
    intent: z.enum(['reserve', 'question']).default('reserve'),
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Enter a valid email'),
    phone: z.string().default(''),
    cabinPreference: z.enum(['standard', 'suite', 'either']).optional(),
    occupancy: z.enum(['single', 'double']).default('single'),
    earlyArrival: z.boolean().default(false),
    dietary: z.string().default(''),
    notes: z.string().default(''),
  })
  .superRefine((data, ctx) => {
    if (data.intent === 'reserve' && !data.cabinPreference) {
      ctx.addIssue({ code: 'custom', path: ['cabinPreference'], message: 'Choose a cabin preference' })
    }
    if (data.intent === 'question' && data.notes.trim().length === 0) {
      ctx.addIssue({ code: 'custom', path: ['notes'], message: 'Tell us your question' })
    }
  })

export type RetreatReservationFormData = z.infer<typeof retreatReservationSchema>
export type RetreatReservationFormInput = z.input<typeof retreatReservationSchema>
