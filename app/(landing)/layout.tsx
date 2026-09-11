import type { ReactNode } from 'react'

/**
 * Route group for single-path event landing pages (small weddings, company
 * retreats, family reunions). No site nav and no standard footer: each page
 * renders its own chrome through <LandingShell>, so the only ways out are the
 * inquiry form, the logo, and a look at the cabins.
 */
export default function LandingLayout({ children }: { children: ReactNode }) {
  return <div className="relative flex min-h-screen flex-col">{children}</div>
}
