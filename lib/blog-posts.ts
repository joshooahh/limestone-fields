export interface BlogPostSummary {
  slug: string
  category: string
  title: string
  dek: string
  /** Human-readable publish date, e.g. "July 7, 2026" */
  publishedDate: string
  /** ISO date, e.g. "2026-07-07" */
  isoDate: string
}

export const blogPosts: BlogPostSummary[] = [
  {
    slug: 'weekend-getaway-from-dallas',
    category: 'Getaways',
    title: 'Weekend Getaway From Dallas: Lakefront Cabins Two Hours South',
    dek: 'Ten lakefront cabins two hours south of Dallas, on 16 acres at Lake Limestone. A weekend that actually feels like rest.',
    publishedDate: 'July 7, 2026',
    isoDate: '2026-07-07',
  },
  {
    slug: 'corporate-retreat-venues-texas',
    category: 'Retreats',
    title: 'Corporate Retreat Venues in Texas: Buy Out a Lakefront Property',
    dek: 'A whole-property buyout for team offsites — all ten cabins, the shared barn, and the lake, reserved for one group at a time.',
    publishedDate: 'July 7, 2026',
    isoDate: '2026-07-07',
  },
  {
    slug: 'deep-work-retreat',
    category: 'Retreats',
    title: 'Deep Work Retreat in Texas: A Quiet Cabin Built for Focus',
    dek: 'No televisions, no schedule — a quiet lakefront cabin built for the hours your regular week never allows.',
    publishedDate: 'July 7, 2026',
    isoDate: '2026-07-07',
  },
  {
    slug: 'intimate-wedding-venues-texas',
    category: 'Weddings',
    title: 'Intimate Wedding Venues in Texas: A Lakefront Weekend Where Everyone Stays',
    dek: 'One event at a time on Lake Limestone — a lakefront ceremony, a shared barn, and ten cabins where your people stay the weekend.',
    publishedDate: 'July 7, 2026',
    isoDate: '2026-07-07',
  },
]

export function getBlogPost(slug: string): BlogPostSummary | undefined {
  return blogPosts.find((p) => p.slug === slug)
}
