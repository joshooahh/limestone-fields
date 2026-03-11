interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[]
}

/**
 * Renders a JSON-LD structured data script tag.
 * Place inside a page's <head> or anywhere in the component tree —
 * Next.js App Router hoists <script> tags rendered in server components.
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
