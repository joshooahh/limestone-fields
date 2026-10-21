'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cloudbedsBookingUrl, FULL_PROPERTY_MIN_NIGHTS } from '@/lib/cloudbeds'

/** YYYY-MM-DD in the browser's local time zone. */
function toParam(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function addDays(param: string, n: number): string {
  const [y, m, d] = param.split('-').map(Number)
  const date = new Date(y, m - 1, d + n)
  return toParam(date)
}

/** The first Friday at least a week out, so the starting dates are a real weekend. */
function defaultCheckin(): string {
  const d = new Date()
  d.setDate(d.getDate() + 7)
  while (d.getDay() !== 5) d.setDate(d.getDate() + 1)
  return toParam(d)
}

interface Props {
  /** Where the single-cabin alternative goes. */
  cabinHref?: string
  className?: string
}

/**
 * Date search that defaults to the whole property. Hands off to the Cloudbeds
 * hosted engine with the Full Property room type pre-selected. Single cabins
 * are the quiet alternative underneath.
 */
export default function PropertyDateSearch({ cabinHref = '/book', className = '' }: Props) {
  const [today, setToday] = useState('')
  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')

  // Dates are set after mount so server and client markup match.
  useEffect(() => {
    const start = defaultCheckin()
    setToday(toParam(new Date()))
    setCheckin(start)
    setCheckout(addDays(start, FULL_PROPERTY_MIN_NIGHTS))
  }, [])

  const onCheckin = (value: string) => {
    setCheckin(value)
    if (value && (!checkout || checkout < addDays(value, FULL_PROPERTY_MIN_NIGHTS))) {
      setCheckout(addDays(value, FULL_PROPERTY_MIN_NIGHTS))
    }
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!checkin || !checkout) return
    window.location.href = cloudbedsBookingUrl({ checkin, checkout, wholeProperty: true })
  }

  const field =
    'w-full rounded-lg border border-[#253136]/15 bg-white px-4 py-2.5 text-[16px] text-[#253136] focus:border-[#253136]/50 focus:outline-none'
  const label = 'mb-1.5 block font-subhead text-[11px] uppercase tracking-[0.22em] text-[#253136]/60'

  return (
    <div className={className}>
      <form
        onSubmit={onSubmit}
        className="rounded-2xl bg-[#f7f2e4] p-5 shadow-xl md:flex md:items-end md:gap-4 md:p-6"
        aria-label="Check the whole property"
      >
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
            min={checkin ? addDays(checkin, FULL_PROPERTY_MIN_NIGHTS) : undefined}
            onChange={(e) => setCheckout(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="mt-5 inline-flex w-full items-center justify-center whitespace-nowrap rounded-[78px] bg-[#253136] px-8 py-3 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#b3c1ce] transition hover:bg-[#1e282c] md:mt-0 md:w-auto"
        >
          Check the whole property
        </button>
      </form>
      <p className="mt-4 text-center font-body-secondary text-[15px] italic text-[#253136]/60">
        The whole property, two-night minimum.{' '}
        <Link href={cabinHref} className="underline underline-offset-2 hover:text-[#253136]">
          Looking for a single cabin?
        </Link>
      </p>
    </div>
  )
}
