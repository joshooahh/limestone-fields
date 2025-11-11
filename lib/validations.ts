import { z } from 'zod'

export const waitlistSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Enter a valid email'),
  interests: z.array(z.string()).optional().default([]),
})

export type WaitlistFormData = z.infer<typeof waitlistSchema>

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

