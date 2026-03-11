'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { waitlistSchema, type WaitlistFormInput } from '@/lib/validations'

const INTEREST_OPTIONS = [
  'Weekend stays',
  'Extended stays (5+ nights)',
  'Full property buyouts',
  'Updates and stories from the build',
]

export default function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false)
  const form = useForm<WaitlistFormInput>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { interests: [] },
  })

  const onSubmit = async (data: WaitlistFormInput) => {
    try {
      const payload = waitlistSchema.parse(data)

      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed to submit waitlist form')
      }

      setSubmitted(true)
      form.reset()
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  if (submitted) {
    return (
      <div className="max-w-xl py-12 space-y-4">
        <h3 className="text-[28px] font-headline leading-[1.37] text-[#f7f2e4]">
          You&rsquo;re on the list.
        </h3>
        <p className="text-[18px] text-[#b3c1ce] leading-[1.55]">
          We&rsquo;ll be in touch when bookings open.
        </p>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-xl space-y-6 [&_label]:text-[#e8e4dc] [&_label]:text-[11px] [&_label]:font-subhead [&_label]:uppercase [&_label]:tracking-[0.22em]"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage className="text-[#f7e7d5] text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage className="text-[#f7e7d5] text-xs" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" inputMode="email" {...field} />
              </FormControl>
              <FormMessage className="text-[#f7e7d5] text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>I&rsquo;m Interested In</FormLabel>
              <div className="space-y-2 pt-1">
                {INTEREST_OPTIONS.map((interest) => {
                  const checked = field.value?.includes(interest) ?? false
                  return (
                    <label
                      key={interest}
                      className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 p-3 text-[15px] text-[#e8e4dc] transition hover:bg-white/10 cursor-pointer"
                    >
                      <span>{interest}</span>
                      <span
                        className={[
                          'flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border transition',
                          checked
                            ? 'border-[#f7f2e4] bg-[#f7f2e4]'
                            : 'border-white/30 bg-transparent',
                        ].join(' ')}
                        aria-hidden
                      >
                        {checked && (
                          <svg
                            className="h-2.5 w-2.5 text-[#253136]"
                            viewBox="0 0 10 10"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M1.5 5L4 7.5L8.5 2.5" />
                          </svg>
                        )}
                      </span>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={(e) => {
                          const value = new Set(field.value ?? [])
                          if (e.target.checked) {
                            value.add(interest)
                          } else {
                            value.delete(interest)
                          }
                          field.onChange(Array.from(value))
                        }}
                      />
                    </label>
                  )
                })}
              </div>
            </FormItem>
          )}
        />

        <button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="inline-flex items-center justify-center rounded-[78px] bg-[#f7f2e4] px-10 py-3 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#253136] transition hover:bg-[#f7e7d5] disabled:opacity-60"
        >
          {form.formState.isSubmitting ? 'Submitting…' : 'Join the Waitlist'}
        </button>

        <p className="text-[13px] text-[#b3c1ce] leading-relaxed">
          We&rsquo;ll never share your information. Unsubscribe anytime.
        </p>
      </form>
    </Form>
  )
}
