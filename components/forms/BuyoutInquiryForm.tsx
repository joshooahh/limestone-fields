'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { buyoutInquirySchema, type BuyoutInquiryFormInput } from '@/lib/validations'

export default function BuyoutInquiryForm() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<BuyoutInquiryFormInput>({
    resolver: zodResolver(buyoutInquirySchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      preferredDates: '',
      groupSize: 0,
      eventType: '',
      additionalDetails: '',
    },
  })

  const onSubmit = async (data: BuyoutInquiryFormInput) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/buyout-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) setSubmitted(true)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl py-12 space-y-4">
        <h3 className="text-[28px] font-headline leading-[1.37] text-[#f7f2e4]">
          We&rsquo;ll be in touch.
        </h3>
        <p className="text-[18px] text-[#b3c1ce] leading-[1.55]">
          We&rsquo;ll review your request and send you a detailed proposal within
          two business days.
        </p>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-2xl space-y-6 [&_label]:text-[#e8e4dc] [&_label]:text-[11px] [&_label]:font-subhead [&_label]:uppercase [&_label]:tracking-[0.22em]"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name *</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage className="text-[#f7e7d5] text-xs" />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl><Input type="email" {...field} /></FormControl>
                <FormMessage className="text-[#f7e7d5] text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl><Input type="tel" {...field} /></FormControl>
                <FormMessage className="text-[#f7e7d5] text-xs" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company / Organization (Optional)</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage className="text-[#f7e7d5] text-xs" />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="preferredDates"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Dates *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. March 15–18, 2026" {...field} />
                </FormControl>
                <FormMessage className="text-[#f7e7d5] text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="groupSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Group Size *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    value={typeof field.value === 'number' ? String(field.value) : ''}
                    onChange={(e) => {
                      const value = e.target.value
                      field.onChange(value === '' ? undefined : Number(value))
                    }}
                  />
                </FormControl>
                <FormMessage className="text-[#f7e7d5] text-xs" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="eventType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Type *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="executive_retreat">Executive Retreat</SelectItem>
                  <SelectItem value="creative_intensive">Creative Intensive</SelectItem>
                  <SelectItem value="wedding_celebration">Wedding / Celebration</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-[#f7e7d5] text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="additionalDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Details</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your event, any special needs, or questions"
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[#f7e7d5] text-xs" />
            </FormItem>
          )}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-[78px] bg-[#f7f2e4] px-10 py-3 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#253136] transition hover:bg-[#f7e7d5] disabled:opacity-60"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
        </button>

        <p className="text-[13px] text-[#b3c1ce] leading-relaxed">
          Buyout bookings require a minimum 3-night stay. Pricing is customized based on
          dates, group size, and specific needs. We&rsquo;ll respond within two business
          days with a detailed proposal.
        </p>
      </form>
    </Form>
  )
}
