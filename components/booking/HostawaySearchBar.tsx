'use client'

import { useEffect, useRef } from 'react'

export default function HostawaySearchBar() {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return

    const init = () => {
      if (typeof window.searchBar === 'function') {
        initialized.current = true
        window.searchBar({
          baseUrl: 'https://limestonefields.com/',
          showLocation: false,
          color: '#253136',
          rounded: true,
          openInNewTab: false,
          font: 'Helvetica Neue',
        })
      }
    }

    // If script already loaded
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
