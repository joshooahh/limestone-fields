'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { retreatReservationSchema, type RetreatReservationFormInput } from '@/lib/validations'

const ERROR_CLASS = 'text-[#f7e7d5] text-xs'

/**
 * Interest list for a future Writers Retreat date. Posts to
 * /api/retreat-reservation with intent "interest"; saves to Sanity and emails
 * the hosts, same plumbing as the original reservation form.
 */
export default function RetreatInterestForm() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [failed, setFailed] = useState(false)

  const form = useForm<RetreatReservationFormInput>({
    resolver: zodResolver(retreatReservationSchema),
    defaultValues: {
      intent: 'interest',
      name: '',
      email: '',
      phone: '',
      cabinPreference: undefined,
      occupancy: 'single',
      earlyArrival: false,
      dietary: '',
      notes: '',
    },
  })

  const onSubmit = async (data: RetreatReservationFormInput) => {
    setIsSubmitting(true)
    setFailed(false)
    try {
      const response = await fetch('/api/retreat-reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, intent: 'interest' }),
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
        <h3 className="text-[28px] font-headline leading-[1.37] text-[#f7f2e4]">You&rsquo;re on the list.</h3>
        <p className="text-[18px] text-[#b3c1ce] leading-[1.55]">
          When we set the next date, you&rsquo;ll hear about it before anyone else, with first pick of the cabins.
          Check your inbox for a short note from us.
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
              <FormControl><Input autoComplete="name" {...field} /></FormControl>
              <FormMessage className={ERROR_CLASS} />
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
        <FormField
          control={form.control}
          name="cabinPreference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>If you came, you&rsquo;d want</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Optional" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="standard">A standard cabin to myself</SelectItem>
                  <SelectItem value="suite">A suite, maybe with a companion</SelectItem>
                  <SelectItem value="either">Not sure yet</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className={ERROR_CLASS} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Anything else</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What you're working on, which seasons work for you, a question for the hosts"
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage className={ERROR_CLASS} />
            </FormItem>
          )}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-[78px] bg-[#f7f2e4] px-10 py-3 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#253136] transition hover:bg-[#f7e7d5] disabled:opacity-60"
        >
          {isSubmitting ? 'Sending...' : 'Keep Me Posted'}
        </button>
        {failed && (
          <p className="text-[14px] text-[#f7e7d5]">
            Something went wrong sending that. Please try again, or email hello@limestonefields.com.
          </p>
        )}
        <p className="text-[13px] text-[#b3c1ce] leading-relaxed">
          No commitment. We&rsquo;ll write once when the next date is set, and you&rsquo;ll have first pick of the twelve places.
        </p>
      </form>
    </Form>
  )
}
