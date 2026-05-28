import type { Metadata } from 'next'
import type { Image as SanityImage } from 'sanity'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { propertyImagesQuery } from '@/sanity/queries'

export const metadata: Metadata = {
  title: 'The Property — Limestone Fields',
  description:
    'Sixteen acres on Lake Limestone, Texas. Ten private cabins, a 1,200 sq ft commons barn, a working permaculture farm, and 1,200 ft of private lakefront. 2 hours from Austin, Dallas, and Houston.',
  openGraph: {
    title: 'The Property — Limestone Fields',
    description:
      'A photo tour of Limestone Fields — the cabins, the barn, the outdoor kitchen, the lake, the farm, and the land.',
    url: 'https://limestonefields.com/the-property',
  },
  alternates: { canonical: 'https://limestonefields.com/the-property' },
}

type PropertyImages = {
  heroImage?: SanityImage | null
  cabinsImages?: SanityImage[] | null
  barnImages?: SanityImage[] | null
  kitchenImages?: SanityImage[] | null
  lakeImages?: SanityImage[] | null
  farmImages?: SanityImage[] | null
  landImages?: SanityImage[] | null
}

function imgUrl(sanityImage: SanityImage | null | undefined, width = 1400): string | null {
  if (sanityImage?.asset) {
    return urlForImage(sanityImage).width(width).auto('format').url()
  }
  return null
}

function imgUrls(images: SanityImage[] | null | undefined, width = 1200): string[] {
  if (!images) return []
  return images
    .map((img) => imgUrl(img, width))
    .filter((url): url is string => url !== null)
}

interface PhotoGridProps {
  urls: string[]
  alts: string[]
}

function PhotoGrid({ urls, alts }: PhotoGridProps) {
  if (urls.length === 0) return null

  if (urls.length === 1) {
    return (
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg bg-[#b3c1ce]">
        <Image src={urls[0]} alt={alts[0] ?? ''} fill className="object-cover" sizes="100vw" />
      </div>
    )
  }

  if (urls.length === 2) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {urls.map((url, i) => (
          <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#b3c1ce]">
            <Image src={url} alt={alts[i] ?? ''} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
        ))}
      </div>
    )
  }

  // 3 photos: large left + two stacked right
  return (
    <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#b3c1ce]">
        <Image src={urls[0]} alt={alts[0] ?? ''} fill className="object-cover" sizes="(min-width: 768px) 60vw, 100vw" />
      </div>
      <div className="grid grid-rows-2 gap-3">
        <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden rounded-lg bg-[#b3c1ce]">
          <Image src={urls[1]} alt={alts[1] ?? ''} fill className="object-cover" sizes="(min-width: 768px) 40vw, 100vw" />
        </div>
        <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden rounded-lg bg-[#b3c1ce]">
          <Image src={urls[2]} alt={alts[2] ?? ''} fill className="object-cover" sizes="(min-width: 768px) 40vw, 100vw" />
        </div>
      </div>
    </div>
  )
}

interface SectionProps {
  label: string
  headline: string
  description: string
  urls: string[]
  alts: string[]
  bg: string
  textColor?: string
  labelColor?: string
  bodyColor?: string
  cta?: React.ReactNode
}

function PropertySection({
  label,
  headline,
  description,
  urls,
  alts,
  bg,
  textColor = 'text-[#253136]',
  labelColor = 'text-[#253136]/50',
  bodyColor = 'text-[#253136]/80',
  cta,
}: SectionProps) {
  return (
    <section className={`${bg} py-20 md:py-28`}>
      <div className="container max-w-6xl mx-auto px-6 space-y-10">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <p className={`font-subhead text-[11px] tracking-[0.3em] uppercase ${labelColor}`}>
            {label}
          </p>
          <h2 className={`font-headline text-[32px] md:text-[40px] leading-[1.2] ${textColor}`}>
            {headline}
          </h2>
          <p className={`font-body-secondary text-lg leading-relaxed ${bodyColor}`}>
            {description}
          </p>
          {cta}
        </div>
        {urls.length > 0 && (
          <PhotoGrid urls={urls} alts={alts} />
        )}
        {urls.length === 0 && (
          <div className="w-full aspect-[16/9] rounded-lg bg-[#b3c1ce]/40 flex items-center justify-center">
            <p className={`font-subhead text-[11px] tracking-[0.2em] uppercase ${labelColor}`}>
              Photos coming soon
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default async function ThePropertyPage() {
  const raw = await client.fetch<PropertyImages | null>(propertyImagesQuery).catch(() => null)

  const heroUrl = imgUrl(raw?.heroImage, 2000)
  const cabinsUrls = imgUrls(raw?.cabinsImages)
  const barnUrls = imgUrls(raw?.barnImages)
  const kitchenUrls = imgUrls(raw?.kitchenImages)
  const lakeUrls = imgUrls(raw?.lakeImages)
  const farmUrls = imgUrls(raw?.farmImages)
  const landUrls = imgUrls(raw?.landImages)

  return (
    <>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[540px] bg-[#253136]">
        {heroUrl && (
          <Image
            src={heroUrl}
            alt="Limestone Fields — aerial view"
            fill
            className="object-cover opacity-80"
            sizes="100vw"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#253136]/20 via-transparent to-[#253136]/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 md:pb-28 text-center px-6">
          <p className="font-subhead text-[11px] tracking-[0.3em] uppercase text-white/60 mb-4">
            LAKE LIMESTONE, TEXAS
          </p>
          <h1 className="font-headline text-[48px] md:text-[72px] leading-[1.1] text-white mb-4">
            The Property
          </h1>
          <p className="font-body-secondary text-lg text-white/70">
            Sixteen acres · Ten cabins · 1,200 ft of private lakefront
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-limestone-cream py-20 md:py-28">
        <div className="container max-w-2xl mx-auto px-6 text-center space-y-6">
          <p className="font-body-secondary text-xl md:text-2xl text-[#253136] leading-[1.6]">
            Limestone Fields sits on sixteen acres at the edge of Lake Limestone — a working
            landscape of open fields, old woods, creek bottomland, and 1,200 feet of private
            shoreline.
          </p>
          <p className="font-body-secondary text-lg text-[#253136]/70 leading-relaxed">
            Ten private cabins are set lightly across the property. A converted commons barn, a
            working permaculture farm, an outdoor kitchen, and a stretch of undeveloped lakefront
            round it out. There is enough here to fill a week. There is also enough space to do
            absolutely nothing.
          </p>
        </div>
      </section>

      {/* The Cabins */}
      <PropertySection
        label="ACCOMMODATIONS"
        headline="The Cabins"
        description="Ten private cabins sit across the property in two layouts — traditional (sleeps 2) and family-sized (sleeps 4). Each has a king bed, private outdoor cedar soaking tub, lake views, and individual HVAC. Natural materials. Quiet interiors. Nothing superfluous."
        urls={cabinsUrls}
        alts={['Cabin exterior', 'Cabin interior', 'Cedar soaking tub']}
        bg="bg-[#F9F4EE]"
        cta={
          <Link
            href="/book"
            className="inline-flex items-center justify-center rounded-[78px] bg-[#253136] px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#b3c1ce] transition hover:bg-[#253136]/90"
          >
            View Cabin Types
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        }
      />

      {/* The Commons Barn */}
      <PropertySection
        label="SHARED SPACES"
        headline="The Commons Barn"
        description="A 1,200 sq ft post-and-beam barn anchors the property as the shared gathering space. Inside: a full chef's kitchen, long communal tables, and a wood-burning fireplace. Open to all guests throughout the day. Available for private buyout for events."
        urls={barnUrls}
        alts={['Commons barn exterior', 'Barn interior', 'Chef\'s kitchen']}
        bg="bg-limestone-cream"
      />

      {/* The Outdoor Kitchen */}
      <PropertySection
        label="OUTDOOR COOKING"
        headline="The Outdoor Kitchen"
        description="Adjacent to the barn, the outdoor kitchen centers on a Santa Maria-style wood-fired grill. Built for the kind of cooking that takes the better part of an afternoon — whole animals, cast iron, smoke. An outdoor dining area seats a full group."
        urls={kitchenUrls}
        alts={['Santa Maria grill', 'Outdoor kitchen', 'Outdoor dining']}
        bg="bg-[#CBD2DA]"
      />

      {/* The Lake */}
      <PropertySection
        label="WATERFRONT"
        headline="The Lake"
        description="Limestone Fields has 1,200 feet of private frontage on Lake Limestone. The shoreline is undeveloped — no docks, no jet skis, no crowds. Kayaks, canoes, and fishing from the bank. Mornings on the water are quiet. Evenings are better."
        urls={lakeUrls}
        alts={['Lake Limestone shoreline', 'Water view', 'Lakefront at sunset']}
        bg="bg-[#253136]"
        textColor="text-[#f7f2e4]"
        labelColor="text-[#b3c1ce]/60"
        bodyColor="text-[#f7f2e4]/70"
      />

      {/* The Farm */}
      <PropertySection
        label="WORKING LAND"
        headline="The Farm"
        description="A working permaculture farm runs along the southern edge of the property. Seasonal vegetables, herbs, fruit trees, and a small flock of chickens. Guests are welcome to walk the beds, pick what's ripe, and bring it to the kitchen. The farm operates year-round."
        urls={farmUrls}
        alts={['Permaculture farm beds', 'Seasonal crops', 'Farm detail']}
        bg="bg-[#F9F4EE]"
      />

      {/* The Land */}
      <PropertySection
        label="SIXTEEN ACRES"
        headline="The Land"
        description="Beyond the structures, the property is mostly undisturbed. Old post oaks and cedar elms. A creek that runs through the lower pasture. Open fields that shift with the seasons. Walking paths connect the cabins to the water's edge. The kind of place that asks you to slow down."
        urls={landUrls}
        alts={['Creek through the pasture', 'Post oak woods', 'Open fields at golden hour']}
        bg="bg-limestone-cream"
      />

      {/* Getting Here */}
      <section className="bg-[#CBD2DA] py-20 md:py-28">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-subhead text-[11px] tracking-[0.3em] uppercase text-[#253136]/50 mb-4">
              LOCATION
            </p>
            <h2 className="font-headline text-[32px] md:text-[40px] leading-[1.2] text-[#253136]">
              Getting Here
            </h2>
            <p className="font-body-secondary text-lg text-[#253136]/70 leading-relaxed mt-4 max-w-xl mx-auto">
              Limestone Fields is located in Jewett, Texas — roughly two hours from three major cities,
              but far enough to feel like a different world.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 text-center">
            {[
              { city: 'Austin', time: '2 hrs', miles: '~120 miles' },
              { city: 'Dallas', time: '2 hrs', miles: '~130 miles' },
              { city: 'Houston', time: '2 hrs', miles: '~130 miles' },
            ].map(({ city, time, miles }) => (
              <div key={city} className="bg-white/40 rounded-lg px-6 py-8 space-y-2">
                <p className="font-headline text-[28px] text-[#253136]">{city}</p>
                <p className="font-subhead text-[13px] tracking-[0.2em] uppercase text-[#253136]/60">
                  {time} · {miles}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center space-y-2">
            <p className="font-subhead text-[13px] tracking-[0.2em] uppercase text-[#253136]/60">
              159 LCR 890 · Jewett, TX 75846
            </p>
            <a
              href="https://maps.google.com/?q=159+LCR+890+Jewett+TX+75846"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-subhead text-[11px] tracking-[0.2em] uppercase text-[#253136]/50 hover:text-[#253136]/70 transition underline underline-offset-4"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-36 bg-[#253136] text-center">
        <div className="container max-w-xl mx-auto px-6 space-y-6">
          <p className="font-subhead text-[11px] tracking-[0.3em] uppercase text-[#b3c1ce]/60">
            READY TO STAY
          </p>
          <h2 className="font-headline text-[36px] md:text-[48px] leading-[1.2] text-[#f7f2e4]">
            Come see it for yourself.
          </h2>
          <p className="font-body-secondary text-lg text-[#f7f2e4]/70 leading-relaxed">
            Traditional cabins from $250 / night. Family-sized from $320 / night.
            Private property buyouts available.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-[78px] bg-[#f7f2e4] px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#253136] transition hover:bg-[#e8e4dc]"
            >
              Check Availability
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-[78px] border border-[#f7f2e4]/30 px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#f7f2e4]/70 transition hover:border-[#f7f2e4]/60 hover:text-[#f7f2e4]"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
