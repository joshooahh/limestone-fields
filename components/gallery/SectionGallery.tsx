'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { GalleryPhoto } from '@/lib/gallery'

/** Show this many photos up front; sections with only a few more than this show everything. */
const INITIAL_COUNT = 9
const SHOW_ALL_SLACK = 2

/** 1 column on phones, 2 on tablets, 3 on desktop. Starts at 3 so server and first client render match. */
function useColumnCount() {
  const [n, setN] = useState(3)
  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1024px)')
    const mid = window.matchMedia('(min-width: 640px)')
    const update = () => setN(wide.matches ? 3 : mid.matches ? 2 : 1)
    update()
    wide.addEventListener('change', update)
    mid.addEventListener('change', update)
    return () => {
      wide.removeEventListener('change', update)
      mid.removeEventListener('change', update)
    }
  }, [])
  return n
}

/** Left-to-right masonry: each photo goes in the shortest column, so the first photos sit across the top. */
function distribute(photos: GalleryPhoto[], count: number) {
  const cols: { items: { photo: GalleryPhoto; index: number }[]; height: number }[] = Array.from(
    { length: count },
    () => ({ items: [], height: 0 })
  )
  photos.forEach((photo, index) => {
    const target = cols.reduce((a, b) => (b.height < a.height ? b : a))
    target.items.push({ photo, index })
    target.height += photo.h / photo.w
  })
  return cols
}

/**
 * The photo gallery shown inside each section of the Property page: a balanced
 * grid, a "show all" button for longer sets, and a full-screen viewer that
 * steps through every photo in the section.
 */
export default function SectionGallery({ photos, label }: { photos: GalleryPhoto[]; label: string }) {
  const [expanded, setExpanded] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const columnCount = useColumnCount()

  const collapsible = photos.length > INITIAL_COUNT + SHOW_ALL_SLACK
  const visible = collapsible && !expanded ? photos.slice(0, INITIAL_COUNT) : photos
  const columns = useMemo(() => distribute(visible, columnCount), [visible, columnCount])

  const current = openIndex !== null ? photos[openIndex] : null

  const step = useCallback(
    (dir: 1 | -1) => setOpenIndex((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [photos.length]
  )

  return (
    <div>
      <div className="flex items-start gap-3" role="list" aria-label={`${label} photos`}>
        {columns.map((col, c) => (
          <div key={c} className="flex min-w-0 flex-1 flex-col gap-3">
            {col.items.map(({ photo, index }) => (
              <div key={photo.src} role="listitem">
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  className="group block w-full overflow-hidden rounded-lg bg-[#e9e2d6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#253136] focus-visible:ring-offset-2"
                  aria-label={`Enlarge photo: ${photo.alt}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.w}
                    height={photo.h}
                    sizes="(min-width: 1152px) 360px, (min-width: 640px) 45vw, 100vw"
                    quality={78}
                    className="h-auto w-full transition duration-500 group-hover:scale-[1.02]"
                  />
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>

      {collapsible && (
        <div className="mt-8 text-center">
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center justify-center rounded-[78px] border border-current px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] opacity-80 transition hover:opacity-100"
          >
            {expanded ? 'Show fewer photos' : `Show all ${photos.length} photos`}
          </button>
        </div>
      )}

      <Dialog.Root open={current !== null} onOpenChange={(o) => !o && setOpenIndex(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[60] bg-[#F9F4EE]" />
          <Dialog.Content
            className="fixed inset-0 z-[61] flex flex-col text-[#253136] focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') step(1)
              if (e.key === 'ArrowLeft') step(-1)
            }}
          >
            <Dialog.Title className="sr-only">{current?.alt ?? 'Photo'}</Dialog.Title>
            <Dialog.Description className="sr-only">
              {label}, photo {openIndex !== null ? openIndex + 1 : ''} of {photos.length}. Use the arrow keys
              to move between photos and Escape to close.
            </Dialog.Description>

            <div className="flex items-center justify-between px-5 py-4 md:px-8">
              <p className="font-subhead text-[11px] uppercase tracking-[0.22em] text-[#253136]/60">
                {label} · {openIndex !== null ? openIndex + 1 : ''} / {photos.length}
              </p>
              <Dialog.Close
                className="rounded-full p-2 transition hover:bg-[#253136]/10 focus-visible:ring-2 focus-visible:ring-[#253136]"
                aria-label="Close photo"
              >
                <X className="h-6 w-6" />
              </Dialog.Close>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20">
              {current && (
                <Image
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  width={current.w}
                  height={current.h}
                  sizes="100vw"
                  quality={85}
                  priority
                  className="max-h-full w-auto max-w-full rounded-md object-contain"
                  style={{ maxHeight: 'calc(100vh - 11rem)' }}
                />
              )}
              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous photo"
                    className="absolute left-1 top-1/2 -translate-y-1/2 rounded-full bg-[#F9F4EE]/80 p-2 shadow transition hover:bg-white md:left-5"
                  >
                    <ChevronLeft className="h-7 w-7" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next photo"
                    className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-[#F9F4EE]/80 p-2 shadow transition hover:bg-white md:right-5"
                  >
                    <ChevronRight className="h-7 w-7" />
                  </button>
                </>
              )}
            </div>

            <p className="mx-auto max-w-2xl px-6 py-5 text-center font-body-secondary text-base leading-snug text-[#253136]/80 md:text-lg">
              {current?.alt}
            </p>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
