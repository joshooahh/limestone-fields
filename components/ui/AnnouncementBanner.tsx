'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, X } from 'lucide-react'
import type { Announcement } from '@/sanity/types'

/**
 * Thin announcement strip pinned above the fixed site header. Edited in
 * Sanity → Site Settings → Homepage Announcement Banner. When shown, it
 * measures its own height (the text wraps on phones) and sets the
 * --announcement-h CSS variable on <html> so SiteHeader drops below it.
 * A close button hides it for the rest of the browser session.
 */

const MIN_HEIGHT_PX = 44
const DISMISS_KEY = 'lf-announcement-dismissed'

/** Used when Sanity has no announcement saved yet. Sanity wins once it does. */
export const DEFAULT_ANNOUNCEMENT: Announcement = {
  enabled: true,
  text: 'Nov 6–9: A Writers Retreat with Sobremesa Magazine.',
  linkLabel: 'Twelve places. Save yours',
  href: '/writers-retreat',
}

export default function AnnouncementBanner({ announcement }: { announcement?: Announcement | null }) {
  const a = announcement ?? DEFAULT_ANNOUNCEMENT
  const active = Boolean(a.enabled && a.text)
  const [dismissed, setDismissed] = useState(true) // assume hidden until we've checked storage (avoids a flash)

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(`${DISMISS_KEY}:${a.text}`) === '1')
    } catch {
      setDismissed(false)
    }
  }, [a.text])

  const visible = active && !dismissed
  const ref = useRef<HTMLDivElement>(null)

  // Keep --announcement-h equal to the banner's rendered height, including
  // when the text wraps on narrow screens or the viewport is resized.
  useEffect(() => {
    const root = document.documentElement
    const el = ref.current
    if (!visible || !el) {
      root.style.removeProperty('--announcement-h')
      return
    }
    const apply = () => root.style.setProperty('--announcement-h', `${Math.ceil(el.getBoundingClientRect().height)}px`)
    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(el)
    return () => {
      ro.disconnect()
      root.style.removeProperty('--announcement-h')
    }
  }, [visible])

  if (!visible) return null

  const external = /^https?:\/\//.test(a.href ?? '')
  const inner = (
    <>
      <span className="font-body text-[14px] md:text-[15px] text-[#253136]">{a.text}</span>
      {a.linkLabel && a.href && (
        <span className="inline-flex items-center gap-1.5 font-subhead text-[11px] tracking-[0.18em] uppercase text-[#253136] underline underline-offset-4 decoration-[#253136]/40 group-hover:decoration-[#253136]">
          {a.linkLabel}
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      )}
    </>
  )

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Announcement"
      className="fixed inset-x-0 top-0 z-40 bg-[#F7E7D5] border-b border-[#253136]/10"
      style={{ minHeight: MIN_HEIGHT_PX }}
    >
      <div className="mx-auto flex min-h-[44px] w-full max-w-[1207px] items-center justify-center gap-3 px-12 py-2 text-center">
        {a.href ? (
          external ? (
            <a href={a.href} target="_blank" rel="noopener noreferrer" className="group inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5">
              {inner}
            </a>
          ) : (
            <Link href={a.href} className="group inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5">
              {inner}
            </Link>
          )
        ) : (
          <div className="inline-flex flex-wrap items-center justify-center gap-x-3">{inner}</div>
        )}
      </div>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => {
          try {
            sessionStorage.setItem(`${DISMISS_KEY}:${a.text}`, '1')
          } catch {}
          setDismissed(true)
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-[#253136]/60 transition hover:bg-[#253136]/10 hover:text-[#253136]"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
