'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
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

const weddingSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().default(''),
  partnerName: z.string().default(''),
  weddingDate: z.string().min(1, 'Wedding date is required'),
  guestCount: z.coerce.number().min(1, 'Guest count is required'),
  additionalDetails: z.string().default(''),
})

type WeddingFormInput = z.input<typeof weddingSchema>

export default function WeddingInquiryForm() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<WeddingFormInput>({
    resolver: zodResolver(weddingSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      partnerName: '',
      weddingDate: '',
      guestCount: 0,
      additionalDetails: '',
    },
  })

  const onSubmit = async (data: WeddingFormInput) => {
    setIsSubmitting(true)
    try {
      const buyoutData = {
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        company: data.partnerName
          ? `Wedding: ${data.name} & ${data.partnerName}`
          : `Wedding: ${data.name}`,
        preferredDates: data.weddingDate,
        groupSize: data.guestCount,
        eventType: 'Wedding/Celebration',
        additionalDetails: data.additionalDetails || '',
      }

      const response = await fetch('/api/buyout-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buyoutData),
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
          Thanks for reaching out. We&rsquo;ll send you detailed information and
          pricing within two business days.
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
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name *</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage className="text-[#f7e7d5] text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="partnerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Partner&apos;s Name</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage className="text-[#f7e7d5] text-xs" />
              </FormItem>
            )}
          />
        </div>

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

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="weddingDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wedding Date *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. October 15, 2026" {...field} />
                </FormControl>
                <FormMessage className="text-[#f7e7d5] text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="guestCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guest Count *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    max="150"
                    {...field}
                    value={typeof field.value === 'number' ? String(field.value) : ''}
                    onChange={(e) =>
                      field.onChange(e.target.value === '' ? 0 : Number(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage className="text-[#f7e7d5] text-xs" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="additionalDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tell Us About Your Vision</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What drew you to Limestone Fields? What matters most to you about your celebration?"
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
          {isSubmitting ? 'Sending...' : 'Send Inquiry'}
        </button>

        <p className="text-[13px] text-[#b3c1ce] leading-relaxed">
          We&rsquo;ll respond within two business days. Wedding weekends include exclusive
          use of the entire property, Friday through Sunday.
        </p>
      </form>
    </Form>
  )
}
