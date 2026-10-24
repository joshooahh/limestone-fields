'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  cloudbedsBookingUrl,
  FULL_PROPERTY_MIN_NIGHTS,
  addDaysToParam as addDays,
  defaultStayDates,
  toDateParam as toParam,
} from '@/lib/cloudbeds'

type Availability = {
  status: 'ok' | 'unknown' | 'error'
  wholePropertyOpen?: boolean | null
  nightly?: { date: string; rate: number }[]
  bookingLink?: string | null
}

const CLOUDBEDS_PREFIX = 'https://us2.cloudbeds.com/'
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function nightLabel(param: string): string {
  const [y, m, d] = param.split('-').map(Number)
  return `${DAYS[new Date(y, m - 1, d).getDay()]} ${MONTHS[m - 1]} ${d}`
}

/** Rate exactly as returned: separators only, no rounding up or totals. */
function money(rate: number): string {
  return `$${rate.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
}

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
  const [avail, setAvail] = useState<Availability | 'loading' | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  // Dates are set after mount so server and client markup match.
  useEffect(() => {
    const start = defaultStayDates()
    setToday(toParam(new Date()))
    setCheckin(start.checkin)
    setCheckout(start.checkout)
  }, [])

  const fetchAvailability = useCallback(async (ci: string, co: string) => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    setAvail('loading')
    try {
      const res = await fetch(`/api/availability?checkin=${ci}&checkout=${co}`, { signal: controller.signal })
      const data = (await res.json()) as Availability
      if (!controller.signal.aborted) setAvail(data)
    } catch {
      if (!controller.signal.aborted) setAvail({ status: 'error' })
    }
  }, [])

  // Whole-property searches show live rates and availability for the picked dates.
  useEffect(() => {
    if (mode !== 'property' || !checkin || !checkout || checkout <= checkin) {
      abortRef.current?.abort()
      setAvail(null)
      return
    }
    const t = setTimeout(() => fetchAvailability(checkin, checkout), 350)
    return () => clearTimeout(t)
  }, [mode, checkin, checkout, fetchAvailability])

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
    if (mode === 'property') {
      fetchAvailability(checkin, checkout)
      return
    }
    window.location.href = cloudbedsBookingUrl({ checkin, checkout, wholeProperty: false })
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
      className={`flex-1 whitespace-nowrap rounded-full px-2 py-2 font-subhead text-[11px] uppercase tracking-[0.1em] md:px-5 md:text-[12px] md:tracking-[0.18em] transition ${
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
      {mode === 'property' && avail && (
        <div className="mt-4 rounded-2xl bg-[#f7f2e4] p-5 shadow-xl md:p-6" aria-live="polite">
          {avail === 'loading' ? (
            <p className="text-center font-body-secondary text-[16px] italic text-[#253136]/60">
              Looking at those dates&hellip;
            </p>
          ) : avail.status === 'ok' && avail.wholePropertyOpen === true ? (
            <div className="space-y-4">
              <p className="font-headline text-[22px] leading-snug text-[#253136]">
                The whole property is open for these dates.
              </p>
              {avail.nightly && avail.nightly.length > 0 && (
                <ul className="divide-y divide-[#253136]/10 text-[16px] text-[#253136]">
                  {avail.nightly.map((n) => (
                    <li key={n.date} className="flex items-baseline justify-between py-2">
                      <span>{nightLabel(n.date)}</span>
                      <span>{money(n.rate)} <span className="text-[13px] text-[#253136]/55">a night</span></span>
                    </li>
                  ))}
                </ul>
              )}
              <a
                href={
                  avail.bookingLink && avail.bookingLink.startsWith(CLOUDBEDS_PREFIX)
                    ? avail.bookingLink
                    : cloudbedsBookingUrl({ checkin, checkout, wholeProperty: true })
                }
                className="inline-flex w-full items-center justify-center rounded-[78px] bg-[#253136] px-6 py-3 text-[13px] font-subhead uppercase tracking-[0.18em] text-[#b3c1ce] transition hover:bg-[#1e282c] md:w-auto md:px-8 md:tracking-[0.22em]"
              >
                Book the whole property
              </a>
            </div>
          ) : avail.status === 'ok' && avail.wholePropertyOpen === false ? (
            <p className="font-body-secondary text-[17px] text-[#253136]">
              The whole property is not open for these dates. Try a nearby weekend, or{' '}
              <a href="/buyouts#inquiry" className="underline underline-offset-2">ask us</a>.
            </p>
          ) : (
            <p className="font-body-secondary text-[17px] text-[#253136]">
              Ask us about these dates.{' '}
              <a href="/buyouts#inquiry" className="underline underline-offset-2">Send an inquiry</a>
              {avail.status === 'error' && (
                <>
                  , or{' '}
                  <a
                    href={cloudbedsBookingUrl({ checkin, checkout, wholeProperty: true })}
                    className="underline underline-offset-2"
                  >
                    search on Cloudbeds
                  </a>
                </>
              )}
              .
            </p>
          )}
        </div>
      )}
      <p className="mt-4 text-center font-body-secondary text-[15px] italic text-[#253136]/60">
        {mode === 'property'
          ? 'The whole property, two-night minimum.'
          : 'One or two cabins. Pick the dates and Cloudbeds shows what is open.'}
      </p>
    </div>
  )
}
