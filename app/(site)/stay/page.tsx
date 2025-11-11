import { PortableText } from '@portabletext/react'
import CabinCard from '@/components/sections/CabinCard'
import Hero from '@/components/sections/Hero'
import { client } from '@/sanity/lib/client'
import { cabinsQuery, pageQuery } from '@/sanity/queries'
import type { Cabin, PageDocument, TextSection } from '@/sanity/types'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default async function StayPage() {
  const [cabins, stayPage] = await Promise.all([
    client.fetch<Cabin[]>(cabinsQuery),
    client.fetch<PageDocument | null>(pageQuery, { slug: 'stay' }),
  ])

  const introSection = stayPage?.sections?.find(
    (section): section is TextSection => section?._type === 'textSection'
  )

  return (
    <>
      <Hero
        headline={stayPage?.heroHeadline ?? 'The Cabins at Limestone Fields'}
        subhead={
          stayPage?.heroSubhead ??
          'Ten cabins. Two styles. One simple truth: everything you need, nothing you don&rsquo;t.'
        }
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <Card className="mx-auto max-w-3xl border-none bg-card/80 p-10 text-center shadow-sm">
          <div className="prose prose-lg mx-auto text-muted-foreground">
            {introSection?.body ? (
              <PortableText value={introSection.body} />
            ) : (
              <p>
                Each cabin is designed for presence. No televisions, just windows. No distractions, just the essentials
                done exceptionally well.
              </p>
            )}
          </div>
        </Card>

        <Separator className="my-16" />

        <div className="space-y-12">
          {cabins?.length ? (
            cabins.map((cabin) => <CabinCard key={cabin._id} cabin={cabin} />)
          ) : (
            <p className="text-center text-muted-foreground">
              Cabins are coming soon. Check back as we get closer to opening.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
