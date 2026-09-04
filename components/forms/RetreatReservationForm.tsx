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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { retreatReservationSchema, type RetreatReservationFormInput } from '@/lib/validations'
import { RETREAT_BOOKING_URL, RETREAT_DEPOSIT_TERMS } from '@/lib/retreat'

const ERROR_CLASS = 'text-[#f7e7d5] text-xs'

/**
 * Reservation request for the Writers Retreat (/writers-retreat). Not a
 * self-serve booking: cabins for Nov 6–9 are held in Cloudbeds under the
 * Sobremesa Magazine block, so each request is confirmed by hand and a
 * deposit link is sent after. Posts to /api/retreat-reservation.
 */
export default function RetreatReservationForm() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [failed, setFailed] = useState(false)

  const form = useForm<RetreatReservationFormInput>({
    resolver: zodResolver(retreatReservationSchema),
    defaultValues: {
      intent: 'question',
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

  const cabinPreference = form.watch('cabinPreference')
  const intent = form.watch('intent')
  const isQuestion = intent === 'question'

  const onSubmit = async (data: RetreatReservationFormInput) => {
    setIsSubmitting(true)
    setFailed(false)
    try {
      const response = await fetch('/api/retreat-reservation', {
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
        <h3 className="text-[28px] font-headline leading-[1.37] text-[#f7f2e4]">
          {isQuestion ? 'Got it. We\u2019ll write back soon.' : 'Your cabin request is in.'}
        </h3>
        <p className="text-[18px] text-[#b3c1ce] leading-[1.55]">
          {isQuestion
            ? 'Your question went to the hosts at Limestone Fields and Sobremesa. One of us will reply within two business days.'
            : 'Within two business days the hosts will reply with your cabin held and the link to book it. A 50% deposit confirms it; the balance is due when you check in. Check your inbox for a short note from us in the meantime.'}
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
          name="intent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>I&rsquo;d like to</FormLabel>
              <FormControl>
                <div role="radiogroup" className="grid gap-3 sm:grid-cols-2">
                  {[
                    ['question', 'Ask a question', 'Goes straight to the hosts at Limestone Fields and Sobremesa.'],
                    ['reserve', 'Have the hosts hold a cabin', 'Rather not book online today? Tell us your cabin and we\u2019ll hold it and send you the link.'],
                  ].map(([value, title, hint]) => {
                    const active = field.value === value
                    return (
                      <button
                        key={value}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => field.onChange(value)}
                        className={`text-left rounded-md border p-4 transition ${
                          active
                            ? 'border-[#f7f2e4] bg-[#f7f2e4]/10'
                            : 'border-[#b3c1ce]/30 hover:border-[#b3c1ce]/60'
                        }`}
                      >
                        <span className="block font-subhead text-[11px] tracking-[0.22em] uppercase text-[#f7f2e4]">{title}</span>
                        <span className="block text-[14px] text-[#b3c1ce] mt-1 leading-relaxed">{hint}</span>
                      </button>
                    )
                  })}
                </div>
              </FormControl>
            </FormItem>
          )}
        />

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

        {!isQuestion && (
        <>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="cabinPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cabin *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a cabin" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="standard">Standard Cabin · $1,600 per person</SelectItem>
                    <SelectItem value="suite">Cabin Suite · from $1,450 per person</SelectItem>
                    <SelectItem value="either">Either — help me choose</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className={ERROR_CLASS} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="occupancy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Who&rsquo;s coming</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="single">Just me</SelectItem>
                    <SelectItem value="double" disabled={cabinPreference === 'standard'}>
                      Me plus a companion (suite)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className={ERROR_CLASS} />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="earlyArrival"
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
                <FormLabel className="cursor-pointer">Arrive Thursday, Nov 5</FormLabel>
                <p className="text-[14px] text-[#b3c1ce] leading-relaxed">
                  Settle in a night early at half the nightly rate: +$100 for a standard cabin, +$150 for a suite.
                </p>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dietary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dietary needs / allergies</FormLabel>
              <FormControl>
                <Input placeholder="Anything the kitchen should know" {...field} />
              </FormControl>
              <FormMessage className={ERROR_CLASS} />
            </FormItem>
          )}
        />

        </>
        )}

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{isQuestion ? 'Your question *' : 'Anything else'}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={
                    isQuestion
                      ? 'Ask us anything about the weekend, the cabins, the food, or the writing'
                      : "What you're hoping to write, questions about the weekend, who you're bringing"
                  }
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
          {isSubmitting ? 'Sending...' : isQuestion ? 'Send Question' : 'Ask the Hosts to Hold a Cabin'}
        </button>

        {failed && (
          <p className="text-[14px] text-[#f7e7d5]">
            Something went wrong sending that. Please try again, or email hello@limestonefields.com.
          </p>
        )}

        <p className="text-[13px] text-[#b3c1ce] leading-relaxed">
          {isQuestion ? (
            'Your note goes to the hosts at Limestone Fields and Sobremesa. We reply within two business days.'
          ) : (
            <>
              Ready now? You can{' '}
              <a href={RETREAT_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[#f7f2e4]">
                book your cabin directly
              </a>
              . Otherwise we reply within two business days with your cabin held and the link. {RETREAT_DEPOSIT_TERMS} Prices are per person and include three nights, every meal, and all programming.
            </>
          )}
        </p>
      </form>
    </Form>
  )
}
