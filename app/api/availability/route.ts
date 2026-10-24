import { NextResponse } from 'next/server'

/**
 * Server-side proxy to the concierge's live availability and rates.
 * The secret stays on the server. Fails soft: any problem returns
 * { status: 'error' } so the date search can fall back to "ask us".
 */
export const dynamic = 'force-dynamic'

const TIMEOUT_MS = 4000
const DATE = /^\d{4}-\d{2}-\d{2}$/

const soft = (extra: Record<string, unknown> = {}) =>
  NextResponse.json({ status: 'error', ...extra }, { headers: { 'Cache-Control': 'no-store' } })

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const checkin = searchParams.get('checkin') ?? ''
  const checkout = searchParams.get('checkout') ?? ''
  if (!DATE.test(checkin) || !DATE.test(checkout) || checkout <= checkin) {
    return NextResponse.json({ status: 'error', reason: 'bad_dates' }, { status: 400 })
  }

  const base = process.env.CONCIERGE_URL
  const secret = process.env.CONCIERGE_SECRET
  if (!base || !secret) return soft()

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const url = `${base.replace(/\/$/, '')}/availability?checkin=${checkin}&checkout=${checkout}`
    const res = await fetch(url, {
      headers: { 'X-Concierge-Secret': secret },
      signal: controller.signal,
      cache: 'no-store',
    })
    if (!res.ok) return soft()
    const data = await res.json()
    return NextResponse.json(data, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return soft()
  } finally {
    clearTimeout(timer)
  }
}
