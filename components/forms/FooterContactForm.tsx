'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { contactSchema, type ContactFormInput } from '@/lib/validations'

export default function FooterContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const form = useForm<ContactFormInput>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormInput) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Failed to submit')
      setSubmitted(true)
      form.reset()
    } catch {
      form.setError('root', { message: 'Something went wrong. Please try again.' })
    }
  }

  if (submitted) {
    return (
      <p className="text-sm text-background/80">
        Thank you. We&apos;ll be in touch.
      </p>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-background/80">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your name"
                  className="border-background/30 bg-background/10 text-background placeholder:text-background/50"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-background/80" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-background/80">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="border-background/30 bg-background/10 text-background placeholder:text-background/50"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-background/80" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-background/80">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="How can we help?"
                  rows={3}
                  className="border-background/30 bg-background/10 text-background placeholder:text-background/50 resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-background/80" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="secondary"
          size="sm"
          className="rounded-full border border-background bg-background text-foreground hover:bg-background/90"
        >
          Send
        </Button>
      </form>
    </Form>
  )
}
