'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { schoolInterestSchema, type SchoolInterestFormInput } from '@/lib/validations'

const ERROR_CLASS = 'text-[#f7e7d5] text-xs'

/**
 * "Get first word" sign-up for an Art of Living School class. Dates and
 * prices aren't final, so this collects interest, not bookings. Posts to
 * /api/school-interest.
 */
export default function SchoolInterestForm({ classSlug, classTitle }: { classSlug: string; classTitle: string }) {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [failed, setFailed] = useState(false)

  const form = useForm<SchoolInterestFormInput>({
    resolver: zodResolver(schoolInterestSchema),
    defaultValues: { classSlug, name: '', email: '', phone: '', bringingSomeone: false, notes: '' },
  })

  const onSubmit = async (data: SchoolInterestFormInput) => {
    setIsSubmitting(true)
    setFailed(false)
    try {
      const response = await fetch('/api/school-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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
          When the dates for {classTitle} are set, you&rsquo;ll hear first, before the class is announced anywhere
          else. Check your inbox for a short note from us in the meantime.
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
          name="bringingSomeone"
          render={({ field }) => (
            <FormItem className="flex items-start gap-3 space-y-0 rounded-md border border-[#b3c1ce]/30 p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked === true)}
                  className="mt-0.5 border-[#b3c1ce] data-[state=checked]:bg-[#f7f2e4] data-[state=checked]:text-[#253136]"
                />
              </FormControl>
              <div className="space-y-1">
                <FormLabel className="cursor-pointer">I&rsquo;d come with someone</FormLabel>
                <p className="text-[14px] text-[#b3c1ce] leading-relaxed">
                  A partner, a friend, a parent. We&rsquo;ll hold a suite for two when the class opens.
                </p>
              </div>
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
                  placeholder="Weekends that work for you, what you'd hope to learn, dietary needs, questions"
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
          {isSubmitting ? 'Sending...' : 'Put Me on the List'}
        </button>

        {failed && (
          <p className="text-[14px] text-[#f7e7d5]">
            Something went wrong sending that. Please try again, or email hello@limestonefields.com.
          </p>
        )}

        <p className="text-[13px] text-[#b3c1ce] leading-relaxed">
          No payment, no commitment. Just first word when the dates are set, and a real person to answer
          your questions.
        </p>
      </form>
    </Form>
  )
}
