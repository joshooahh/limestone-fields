'use client'

import { useEffect, useRef } from 'react'

function hideGuestsRow(): boolean {
  const widget = document.getElementById('hostaway-booking-widget')
  if (!widget) return false

  // Find the leaf element whose text is exactly "Guests", then walk up to its row container
  const allEls = Array.from(widget.querySelectorAll('*'))
  for (const el of allEls) {
    if (el.childElementCount === 0 && el.textContent?.trim() === 'Guests') {
      // Walk up until we find a sibling-bearing ancestor (the row)
      let target: HTMLElement | null = el as HTMLElement
      while (target && target.parentElement && target.parentElement !== widget) {
        const siblings = target.parentElement.children.length
        if (siblings >= 2) {
          target.style.display = 'none'
          return true
        }
        target = target.parentElement
      }
    }
  }
  return false
}

export default function HostawaySearchBar() {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return

    const init = () => {
      if (typeof window.searchBar === 'function') {
        initialized.current = true
        window.searchBar({
          baseUrl: 'https://booking.limestonefields.com/',
          showLocation: false,
          color: '#253136',
          rounded: true,
          openInNewTab: false,
          font: 'Helvetica Neue',
        })

        // Watch for the widget to render, then hide the guests row
        const observer = new MutationObserver(() => {
          if (hideGuestsRow()) observer.disconnect()
        })
        const container = document.getElementById('hostaway-booking-widget')
        if (container) {
          observer.observe(container, { childList: true, subtree: true })
          // Also try immediately in case it already rendered
          hideGuestsRow()
        }
      }
    }

    if (typeof window.searchBar === 'function') {
      init()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://d2q3n06xhbi0am.cloudfront.net/widget.js?1640277196'
    script.async = true
    script.onload = init
    document.head.appendChild(script)
  }, [])

  return <div id="hostaway-booking-widget" />
}
