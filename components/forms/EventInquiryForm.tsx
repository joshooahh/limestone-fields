'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { buyoutInquirySchema, type BuyoutInquiryFormInput } from '@/lib/validations'

const ERROR_CLASS = 'text-[#f7e7d5] text-xs'

interface Props {
  /** Stored on the Sanity buyoutInquiry document and used in the email subject. */
  eventType: 'small_wedding' | 'company_retreat' | 'family_reunion'
  /** Label for the optional second name / org field, e.g. "Partner's name" or "Company". Omit to hide. */
  companyLabel?: string
  companyPlaceholder?: string
  datesLabel?: string
  datesPlaceholder?: string
  groupLabel?: string
  detailsPlaceholder?: string
  submitLabel?: string
  footnote: string
}

/**
 * One inquiry form for the event landing pages. Posts to the existing
 * /api/buyout-inquiry route, so submissions land in Sanity as Buyout Inquiry
 * documents and email hello@ exactly like the /buyouts and /weddings forms.
 */
/** Landing path + utm_* params + referrer, so ad and search leads are attributable in Sanity and the email. */
function leadSource(): string {
  if (typeof window === 'undefined') return ''
  const params = new URLSearchParams(window.location.search)
  const utm = Array.from(params.entries()).filter(([k]) => k.startsWith('utm_') || k === 'gclid' || k === 'fbclid')
  const parts = [window.location.pathname, ...utm.map(([k, v]) => `${k}=${v}`)]
  if (document.referrer) parts.push(`ref=${document.referrer}`)
  return parts.join(' ').slice(0, 500)
}

export default function EventInquiryForm({
  eventType,
  companyLabel,
  companyPlaceholder,
  datesLabel = 'Preferred dates *',
  datesPlaceholder = 'e.g. a weekend in April 2027, or "flexible"',
  groupLabel = 'How many people *',
  detailsPlaceholder = 'Tell us what you have in mind',
  submitLabel = 'Send Inquiry',
  footnote,
}: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [failed, setFailed] = useState(false)

  const form = useForm<BuyoutInquiryFormInput>({
    resolver: zodResolver(buyoutInquirySchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      preferredDates: '',
      groupSize: undefined,
      eventType,
      additionalDetails: '',
    },
  })

  const onSubmit = async (data: BuyoutInquiryFormInput) => {
    setIsSubmitting(true)
    setFailed(false)
    try {
      const response = await fetch('/api/buyout-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, eventType, source: leadSource() }),
      })
      if (response.ok) setSubmitted(true)
      else setFailed(true)
    } catch (error) {
      console.error('Form submission error:', error)
      setFailed(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl py-12 space-y-4">
        <h3 className="text-[28px] font-headline leading-[1.37] text-[#f7f2e4]">We&rsquo;ll be in touch.</h3>
        <p className="text-[18px] text-[#b3c1ce] leading-[1.55]">
          Thanks for reaching out. Within two business days we&rsquo;ll reply with availability, pricing, and
          honest answers to anything you asked. If a call would help, say so and we&rsquo;ll set one up.
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
        <div className={`grid gap-4 ${companyLabel ? 'md:grid-cols-2' : ''}`}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your name *</FormLabel>
                <FormControl><Input autoComplete="name" {...field} /></FormControl>
                <FormMessage className={ERROR_CLASS} />
              </FormItem>
            )}
          />
          {companyLabel && (
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{companyLabel}</FormLabel>
                  <FormControl><Input placeholder={companyPlaceholder} {...field} /></FormControl>
                  <FormMessage className={ERROR_CLASS} />
                </FormItem>
              )}
            />
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl><Input type="email" autoComplete="email" {...field} /></FormControl>
                <FormMessage className={ERROR_CLASS} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl><Input type="tel" autoComplete="tel" {...field} /></FormControl>
                <FormMessage className={ERROR_CLASS} />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="preferredDates"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{datesLabel}</FormLabel>
                <FormControl><Input placeholder={datesPlaceholder} {...field} /></FormControl>
                <FormMessage className={ERROR_CLASS} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="groupSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{groupLabel}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    value={typeof field.value === 'number' ? String(field.value) : ''}
                    onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage className={ERROR_CLASS} />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="additionalDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Anything else</FormLabel>
              <FormControl><Textarea placeholder={detailsPlaceholder} className="min-h-32" {...field} /></FormControl>
              <FormMessage className={ERROR_CLASS} />
            </FormItem>
          )}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-[78px] bg-[#f7f2e4] px-10 py-3 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#253136] transition hover:bg-[#f7e7d5] disabled:opacity-60"
        >
          {isSubmitting ? 'Sending...' : submitLabel}
        </button>

        {failed && (
          <p className="text-[14px] text-[#f7e7d5]">
            Something went wrong sending that. Please try again, or email hello@limestonefields.com.
          </p>
        )}

        <p className="text-[13px] text-[#b3c1ce] leading-relaxed">{footnote}</p>
      </form>
    </Form>
  )
}
