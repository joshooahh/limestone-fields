import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { urlForImage } from '@/sanity/lib/image'
import type { PageSection } from '@/sanity/types'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface PageSectionsProps {
  sections?: PageSection[]
}

export default function PageSections({ sections }: PageSectionsProps) {
  if (!sections || sections.length === 0) return null

  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case 'textSection':
            return (
              <section key={section._key} className="py-24 md:py-32 bg-limestone-cream">
                <div className="container max-w-4xl mx-auto px-6">
                  {section.headline && (
                    <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136] mb-8">
                      {section.headline}
                    </h2>
                  )}
                  {section.body && (
                    <div className="text-[18px] text-[#253136] leading-[1.55] [&_p]:mb-4 [&_p:last-child]:mb-0">
                      <PortableText value={section.body} />
                    </div>
                  )}
                </div>
              </section>
            )

          case 'imageSection':
            return (
              <section key={section._key} className="py-24 md:py-32 bg-[#F9F4EE]">
                <div className="container max-w-6xl mx-auto px-6">
                  {section.image && (
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <Image
                        src={urlForImage(section.image).width(1600).height(900).url()}
                        alt={section.alt || section.caption || 'Section image'}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  {section.caption && (
                    <p className="font-subhead text-[11px] tracking-[0.22em] uppercase text-[#253136]/60 text-center mt-5">
                      {section.caption}
                    </p>
                  )}
                </div>
              </section>
            )

          case 'valuePropSection':
            return (
              <section key={section._key} className="py-24 md:py-32 bg-[#CBD2DA]">
                <div className="container max-w-6xl mx-auto px-6">
                  {(section.headline || section.introText) && (
                    <div className="mb-16">
                      {section.headline && (
                        <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136] mb-5">
                          {section.headline}
                        </h2>
                      )}
                      {section.introText && (
                        <p className="font-body-secondary text-lg md:text-xl text-[#253136] leading-relaxed max-w-3xl">
                          {section.introText}
                        </p>
                      )}
                    </div>
                  )}
                  {section.cards && section.cards.length > 0 && (
                    <div className="grid md:grid-cols-3 gap-12">
                      {section.cards.map((card, index) => (
                        <div key={index} className="space-y-4">
                          {card.headline && (
                            <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
                              {card.headline}
                            </p>
                          )}
                          {card.body && (
                            <p className="text-[18px] text-[#253136] leading-[1.55]">
                              {card.body}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )

          case 'ctaSection':
            return (
              <section
                key={section._key}
                className={cn(
                  'py-24 md:py-32',
                  section.variant === 'secondary' ? 'bg-[#253136]' : 'bg-limestone-cream'
                )}
              >
                <div className="container max-w-4xl mx-auto px-6 space-y-8">
                  {section.headline && (
                    <h2
                      className={cn(
                        'text-[32px] font-headline leading-[1.37]',
                        section.variant === 'secondary' ? 'text-[#f7f2e4]' : 'text-[#253136]'
                      )}
                    >
                      {section.headline}
                    </h2>
                  )}
                  {section.body && (
                    <p
                      className={cn(
                        'text-[18px] leading-[1.55] max-w-2xl',
                        section.variant === 'secondary' ? 'text-[#b3c1ce]' : 'text-[#253136]'
                      )}
                    >
                      {section.body}
                    </p>
                  )}
                  {section.buttonText && section.buttonHref && (
                    <div>
                      <Link
                        href={section.buttonHref}
                        className={cn(
                          'inline-flex items-center justify-center rounded-[78px] px-8 py-3 text-[13px] font-subhead uppercase tracking-[0.22em] transition',
                          section.variant === 'secondary'
                            ? 'bg-[#f7f2e4] text-[#253136] hover:bg-[#f7e7d5]'
                            : 'bg-[#253136] text-[#b3c1ce] hover:bg-[#253136]/90'
                        )}
                      >
                        {section.buttonText}
                      </Link>
                    </div>
                  )}
                </div>
              </section>
            )

          case 'cabinPreviewSection':
            return (
              <section key={section._key} className="py-24 md:py-32 bg-[#F9F4EE]">
                <div className="container max-w-6xl mx-auto px-6">
                  {(section.headline || section.subhead) && (
                    <div className="mb-16">
                      {section.headline && (
                        <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136] mb-4">
                          {section.headline}
                        </h2>
                      )}
                      {section.subhead && (
                        <p className="font-body-secondary text-[17px] text-[#253136]/90 leading-[1.6] tracking-[0.03em] italic">
                          {section.subhead}
                        </p>
                      )}
                    </div>
                  )}
                  {section.cabins && section.cabins.length > 0 && (
                    <div className="space-y-20">
                      {section.cabins.map((item, index) => (
                        <div
                          key={index}
                          className="grid gap-12 md:gap-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start"
                        >
                          <div className="space-y-5">
                            {item.cabin && (
                              <>
                                <div className="space-y-3">
                                  <h3 className="text-[28px] font-headline leading-[1.37] text-[#253136]">
                                    {item.cabin.title}
                                  </h3>
                                  <div className="flex flex-wrap items-center gap-3 font-subhead text-[11px] uppercase tracking-[0.26em] text-[#253136]/60">
                                    <span>{item.cabin.squareFeet} sq ft</span>
                                    <span>·</span>
                                    <span>Sleeps {item.cabin.sleeps}</span>
                                    <span>·</span>
                                    <span>{item.cabin.bedType}</span>
                                  </div>
                                </div>
                              </>
                            )}
                            {item.description && (
                              <p className="text-[18px] text-[#253136] leading-[1.55]">
                                {item.description}
                              </p>
                            )}
                            <Link
                              href="/stay"
                              className="inline-flex items-center justify-center rounded-[78px] bg-[#253136] px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#b3c1ce] transition hover:bg-[#253136]/90"
                            >
                              View All Cabins
                            </Link>
                          </div>
                          <div>
                            {item.image ? (
                              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                                <Image
                                  src={urlForImage(item.image).width(1200).height(900).url()}
                                  alt={item.cabin?.title || 'Cabin image'}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="flex aspect-[4/3] items-center justify-center rounded-lg border border-dashed border-[#253136]/20 text-[#253136]/40 font-subhead text-[12px] uppercase tracking-[0.22em]">
                                Image coming soon
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )

          case 'twoColumnSection':
            return (
              <section key={section._key} className="py-24 md:py-32 bg-limestone-cream">
                <div className="container max-w-6xl mx-auto px-6">
                  <div className="grid gap-12 md:gap-20 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start">
                    <div className="space-y-6">
                      {section.leftImage && (
                        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                          <Image
                            src={urlForImage(section.leftImage).width(800).height(600).url()}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      {section.leftHeadline && (
                        <h3 className="text-[28px] font-headline leading-[1.37] text-[#253136]">
                          {section.leftHeadline}
                        </h3>
                      )}
                      {section.leftBody && (
                        <div className="text-[18px] text-[#253136] leading-[1.55] [&_p]:mb-4 [&_p:last-child]:mb-0">
                          <PortableText value={section.leftBody} />
                        </div>
                      )}
                    </div>
                    <div className="space-y-6">
                      {section.rightImage && (
                        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                          <Image
                            src={urlForImage(section.rightImage).width(800).height(600).url()}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      {section.rightHeadline && (
                        <h3 className="text-[28px] font-headline leading-[1.37] text-[#253136]">
                          {section.rightHeadline}
                        </h3>
                      )}
                      {section.rightBody && (
                        <div className="text-[18px] text-[#253136] leading-[1.55] [&_p]:mb-4 [&_p:last-child]:mb-0">
                          <PortableText value={section.rightBody} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )

          default:
            return null
        }
      })}
    </>
  )
}
