'use client'

import { useEffect, useState } from 'react'
import {
  cloudbedsBookingUrl,
  FULL_PROPERTY_MIN_NIGHTS,
  addDaysToParam as addDays,
  defaultStayDates,
  toDateParam as toParam,
} from '@/lib/cloudbeds'

interface Props {
  className?: string
}

/**
 * Date search that defaults to the whole property. Hands off to the Cloudbeds
 * hosted engine with the Full Property room type pre-selected. Single cabins
 * are the quiet alternative underneath.
 */
export default function PropertyDateSearch({ className = '' }: Props) {
  const [mode, setMode] = useState<'property' | 'cabin'>('property')
  const [today, setToday] = useState('')
  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')

  // Dates are set after mount so server and client markup match.
  useEffect(() => {
    const start = defaultStayDates()
    setToday(toParam(new Date()))
    setCheckin(start.checkin)
    setCheckout(start.checkout)
  }, [])

  const minNights = mode === 'property' ? FULL_PROPERTY_MIN_NIGHTS : 1

  const onCheckin = (value: string) => {
    setCheckin(value)
    if (value && (!checkout || checkout < addDays(value, minNights))) {
      setCheckout(addDays(value, minNights))
    }
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!checkin || !checkout) return
    window.location.href = cloudbedsBookingUrl({ checkin, checkout, wholeProperty: mode === 'property' })
  }

  const field =
    'w-full rounded-lg border border-[#253136]/15 bg-white px-4 py-2.5 text-[16px] text-[#253136] focus:border-[#253136]/50 focus:outline-none'
  const label = 'mb-1.5 block font-subhead text-[11px] uppercase tracking-[0.22em] text-[#253136]/60'

  const toggleButtons = (['property', 'cabin'] as const).map((m) => (
    <button
      key={m}
      type="button"
      aria-pressed={mode === m}
      onClick={() => {
        setMode(m)
        if (m === 'property' && checkin && checkout < addDays(checkin, FULL_PROPERTY_MIN_NIGHTS)) {
          setCheckout(addDays(checkin, FULL_PROPERTY_MIN_NIGHTS))
        }
      }}
      className={`flex-1 whitespace-nowrap rounded-full px-5 py-2 font-subhead text-[12px] uppercase tracking-[0.18em] transition ${
        mode === m ? 'bg-[#253136] text-[#f7f2e4]' : 'text-[#253136]/70 hover:text-[#253136]'
      }`}
    >
      {m === 'property' ? 'Whole property' : 'A single cabin'}
    </button>
  ))

  return (
    <div className={className}>
      <div
        className="mx-auto mb-3 hidden w-fit rounded-full bg-[#f7f2e4] p-1 shadow-lg md:flex"
        role="group"
        aria-label="What to search"
      >
        {toggleButtons}
      </div>
      <form
        onSubmit={onSubmit}
        className="rounded-2xl bg-[#f7f2e4] p-5 shadow-xl md:flex md:items-end md:gap-4 md:p-6"
        aria-label="Check the whole property"
      >
        <div className="mb-4 flex w-full rounded-full bg-[#253136]/10 p-1 md:hidden" role="group" aria-label="What to search">
          {toggleButtons}
        </div>
        <div className="md:flex-1">
          <label htmlFor="ps-checkin" className={label}>Check in</label>
          <input
            id="ps-checkin"
            type="date"
            className={field}
            value={checkin}
            min={today || undefined}
            onChange={(e) => onCheckin(e.target.value)}
            required
          />
        </div>
        <div className="mt-4 md:mt-0 md:flex-1">
          <label htmlFor="ps-checkout" className={label}>Check out</label>
          <input
            id="ps-checkout"
            type="date"
            className={field}
            value={checkout}
            min={checkin ? addDays(checkin, minNights) : undefined}
            onChange={(e) => setCheckout(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="mt-5 inline-flex w-full items-center justify-center whitespace-nowrap rounded-[78px] bg-[#253136] px-8 py-3 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#b3c1ce] transition hover:bg-[#1e282c] md:mt-0 md:w-auto"
        >
          {mode === 'property' ? 'Check the whole property' : 'Check cabins'}
        </button>
      </form>
      <p className="mt-4 text-center font-body-secondary text-[15px] italic text-[#253136]/60">
        {mode === 'property'
          ? 'The whole property, two-night minimum.'
          : 'One or two cabins. Pick the dates and Cloudbeds shows what is open.'}
      </p>
    </div>
  )
}
