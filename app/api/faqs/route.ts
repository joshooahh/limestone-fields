import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

const faqsQuery = `*[_type == "faq"] | order(order asc) {
  _id,
  question,
  answer,
  order
}`

export async function GET() {
  try {
    const faqs = await client.fetch(faqsQuery)
    return NextResponse.json(faqs)
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 })
  }
}

