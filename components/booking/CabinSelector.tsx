'use client'

import { useState } from 'react'
import HostawayCalendar from './HostawayCalendar'

const CABINS = [
  { label: 'Entire Property', id: 489941, type: 'buyout' },
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

export default function CabinSelector() {
  const [selected, setSelected] = useState(CABINS[0])

  return (
    <div className="space-y-8">
      {/* Selector */}
      <div className="flex flex-wrap gap-2">
        {CABINS.map((cabin) => (
          <button
            key={cabin.id}
            onClick={() => setSelected(cabin)}
            className={[
              'px-5 py-2 rounded-[78px] text-[12px] font-subhead uppercase tracking-[0.2em] transition border',
              selected.id === cabin.id
                ? 'bg-[#253136] text-[#b3c1ce] border-[#253136]'
                : 'bg-transparent text-[#253136] border-[#253136]/30 hover:border-[#253136]',
            ].join(' ')}
          >
            {cabin.label}
          </button>
        ))}
      </div>

      {/* Selected cabin info */}
      <div className="flex items-center gap-3">
        <p className="font-headline text-[22px] text-[#253136]">{selected.label}</p>
        {selected.type !== 'buyout' && (
          <span className="font-subhead text-[11px] uppercase tracking-[0.2em] text-[#253136]/50 border border-[#253136]/20 rounded-full px-3 py-1">
            {selected.type}
          </span>
        )}
        {selected.type === 'buyout' && (
          <span className="font-subhead text-[11px] uppercase tracking-[0.2em] text-[#253136]/50 border border-[#253136]/20 rounded-full px-3 py-1">
            All 10 Cabins
          </span>
        )}
      </div>

      {/* Calendar — key forces remount when listing changes */}
      <HostawayCalendar key={selected.id} listingId={selected.id} numberOfMonths={2} />
    </div>
  )
}
