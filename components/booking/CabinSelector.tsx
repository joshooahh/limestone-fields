'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import HostawayCalendar from './HostawayCalendar'

const ENTIRE_PROPERTY_ID = 489941

const CABINS = [
  { label: 'Cabin 1', id: 480743, type: 'Large Cabin' },
  { label: 'Cabin 2', id: 489931, type: 'Large Cabin' },
  { label: 'Cabin 3', id: 489935, type: 'Standard Cabin' },
  { label: 'Cabin 4', id: 489937, type: 'Standard Cabin' },
  { label: 'Cabin 5', id: 489938, type: 'Standard Cabin' },
  { label: 'Cabin 6', id: 489933, type: 'Standard Cabin' },
  { label: 'Cabin 7', id: 489934, type: 'Standard Cabin' },
  { label: 'Cabin 8', id: 489936, type: 'Standard Cabin' },
  { label: 'Cabin 9', id: 489939, type: 'Standard Cabin' },
  { label: 'Cabin 10', id: 489940, type: 'Standard Cabin' },
]

type Selection = 'property' | number

export default function CabinSelector() {
  const [selected, setSelected] = useState<Selection>('property')

  const selectedCabin = typeof selected === 'number'
    ? CABINS.find((c) => c.id === selected)
    : null

  return (
    <div className="space-y-8">
      {/* Selector */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelected('property')}
          className={[
            'px-5 py-2 rounded-[78px] text-[12px] font-subhead uppercase tracking-[0.2em] transition border',
            selected === 'property'
              ? 'bg-[#253136] text-[#b3c1ce] border-[#253136]'
              : 'bg-transparent text-[#253136] border-[#253136]/30 hover:border-[#253136]',
          ].join(' ')}
        >
          Entire Property
        </button>
        {CABINS.map((cabin) => (
          <button
            key={cabin.id}
            onClick={() => setSelected(cabin.id)}
            className={[
              'px-5 py-2 rounded-[78px] text-[12px] font-subhead uppercase tracking-[0.2em] transition border',
              selected === cabin.id
                ? 'bg-[#253136] text-[#b3c1ce] border-[#253136]'
                : 'bg-transparent text-[#253136] border-[#253136]/30 hover:border-[#253136]',
            ].join(' ')}
          >
            {cabin.label}
          </button>
        ))}
      </div>

      {/* Entire Property — embedded calendar */}
      {selected === 'property' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <p className="font-headline text-[22px] text-[#253136]">Entire Property</p>
            <span className="font-subhead text-[11px] uppercase tracking-[0.2em] text-[#253136]/50 border border-[#253136]/20 rounded-full px-3 py-1">
              All 10 Cabins
            </span>
          </div>
          <HostawayCalendar key={ENTIRE_PROPERTY_ID} listingId={ENTIRE_PROPERTY_ID} numberOfMonths={2} />
        </div>
      )}

      {/* Individual cabin — direct link to Hostaway */}
      {selectedCabin && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <p className="font-headline text-[22px] text-[#253136]">{selectedCabin.label}</p>
            <span className="font-subhead text-[11px] uppercase tracking-[0.2em] text-[#253136]/50 border border-[#253136]/20 rounded-full px-3 py-1">
              {selectedCabin.type}
            </span>
          </div>
          <p className="font-body-secondary text-[17px] text-[#253136]/70 leading-relaxed">
            Check availability and book {selectedCabin.label} directly through our booking portal.
          </p>
          <a
            href={`https://174771_1.holidayfuture.com/listings/${selectedCabin.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-[78px] bg-[#253136] px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#b3c1ce] transition hover:bg-[#253136]/90"
          >
            Book {selectedCabin.label}
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
          <p className="text-[13px] font-subhead uppercase tracking-[0.2em] text-[#253136]/40">
            You&apos;ll be taken to our secure booking page
          </p>
        </div>
      )}
    </div>
  )
}
