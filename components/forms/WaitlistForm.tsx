'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
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
      <div className="rounded-xl bg-muted px-6 py-12 text-center">
        <h3 className="mb-2 text-2xl font-serif text-foreground">You&rsquo;re on the list.</h3>
        <p className="text-muted-foreground">We&rsquo;ll be in touch when bookings open.</p>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-xl space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>I&rsquo;m interested in</FormLabel>
              <div className="space-y-2">
                {INTEREST_OPTIONS.map((interest) => (
                  <label
                    key={interest}
                    className="flex items-center justify-between rounded-md border border-border bg-card p-3 text-sm text-muted-foreground transition hover:bg-card/60"
                  >
                    <span>{interest}</span>
                    <Checkbox
                      checked={field.value?.includes(interest)}
                      onCheckedChange={(checked) => {
                        const value = new Set(field.value ?? [])
                        if (checked) {
                          value.add(interest)
                        } else {
                          value.delete(interest)
                        }
                        field.onChange(Array.from(value))
                      }}
                      className="border-border"
                    />
                  </label>
                ))}
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Submitting…' : 'Join the Waitlist'}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          We&rsquo;ll never share your information. Unsubscribe anytime.
        </p>
      </form>
    </Form>
  )
}

