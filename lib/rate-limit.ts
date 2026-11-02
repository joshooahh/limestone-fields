/**
 * Small in-memory, per-IP limiter. State lives in one server instance, so on a
 * multi-instance host it is a best-effort brake on bursts, not a hard quota.
 */
const hits = new Map<string, number[]>()

export function isRateLimited(key: string, max = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)

  if (recent.length >= max) {
    hits.set(key, recent)
    return true
  }

  recent.push(now)
  hits.set(key, recent)

  // Keep the map from growing without bound.
  if (hits.size > 5000) {
    hits.forEach((times, k) => {
      if (times.every((t) => now - t >= windowMs)) hits.delete(k)
    })
  }
  return false
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') ?? 'unknown'
}
