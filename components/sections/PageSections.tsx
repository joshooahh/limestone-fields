import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { urlForImage } from '@/sanity/lib/image'
import type { PageSection } from '@/sanity/types'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
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
              <section key={section._key} className="py-16 md:py-24">
                <div className="container max-w-4xl mx-auto px-6">
                  <Card>
                    <CardContent className="p-8 md:p-12 space-y-6">
                      {section.headline && (
                        <>
                          <h2 className="text-3xl md:text-4xl font-headline text-foreground">
                            {section.headline}
                          </h2>
                          <Separator />
                        </>
                      )}
                      {section.body && (
                        <div className="prose prose-lg max-w-none text-muted-foreground">
                          <PortableText value={section.body} />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </section>
            )

          case 'imageSection':
            return (
              <section key={section._key} className="py-16 md:py-24">
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
                    <p className="text-sm text-muted-foreground text-center mt-4">
                      {section.caption}
                    </p>
                  )}
                </div>
              </section>
            )

          case 'valuePropSection':
            return (
              <section key={section._key} className="py-24 md:py-32">
                <div className="container max-w-6xl mx-auto px-6">
                  {section.headline && (
                    <div className="text-center mb-16">
                      <h2 className="text-3xl md:text-5xl font-headline text-foreground mb-6">
                        {section.headline}
                      </h2>
                      <Separator className="max-w-24 mx-auto" />
                    </div>
                  )}
                  {section.introText && (
                    <div className="max-w-3xl mx-auto mb-16 text-center">
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {section.introText}
                      </p>
                    </div>
                  )}
                  {section.cards && section.cards.length > 0 && (
                    <div className="grid md:grid-cols-3 gap-8">
                      {section.cards.map((card, index) => (
                        <Card key={index}>
                          <CardContent className="p-8 space-y-4">
                            {card.headline && (
                              <h3 className="text-xl font-semibold text-foreground">
                                {card.headline}
                              </h3>
                            )}
                            {card.body && (
                              <p className="text-muted-foreground leading-relaxed">
                                {card.body}
                              </p>
                            )}
                          </CardContent>
                        </Card>
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
                  section.variant === 'muted' && 'bg-muted/30',
                  section.variant === 'secondary' && 'bg-secondary/30'
                )}
              >
                <div className="container max-w-4xl mx-auto px-6 text-center space-y-8">
                  {section.headline && (
                    <h2 className="text-3xl md:text-4xl font-headline text-foreground">
                      {section.headline}
                    </h2>
                  )}
                  {section.body && (
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                      {section.body}
                    </p>
                  )}
                  {section.buttonText && section.buttonHref && (
                    <div>
                      <Button asChild size="lg">
                        <Link href={section.buttonHref}>{section.buttonText}</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </section>
            )

          case 'cabinPreviewSection':
            return (
              <section key={section._key} className="py-24 md:py-32">
                <div className="container max-w-6xl mx-auto px-6">
                  {section.headline && (
                    <div className="text-center mb-16">
                      <h2 className="text-3xl md:text-5xl font-headline text-foreground mb-4">
                        {section.headline}
                      </h2>
                      {section.subhead && (
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                          {section.subhead}
                        </p>
                      )}
                      <Separator className="max-w-24 mx-auto mt-6" />
                    </div>
                  )}
                  {section.cabins && section.cabins.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-8">
                      {section.cabins.map((item, index) => (
                        <Card key={index}>
                          <CardContent className="p-8 space-y-6">
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
                              <div className="aspect-[4/3] bg-muted flex items-center justify-center rounded-lg">
                                <span className="text-muted-foreground">Image coming soon</span>
                              </div>
                            )}
                            <div className="space-y-4">
                              {item.cabin && (
                                <div>
                                  <h3 className="text-2xl font-headline text-foreground mb-2">
                                    {item.cabin.title}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {item.cabin.squareFeet} sq ft • Sleeps {item.cabin.sleeps} •{' '}
                                    {item.cabin.bedType}
                                  </p>
                                </div>
                              )}
                              {item.description && (
                                <p className="text-muted-foreground">{item.description}</p>
                              )}
                              <Link
                                href="/stay"
                                className="inline-flex items-center text-sm text-primary hover:underline"
                              >
                                Learn More →
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )

          case 'twoColumnSection':
            return (
              <section key={section._key} className="py-16 md:py-24">
                <div className="container max-w-6xl mx-auto px-6">
                  <div className="grid md:grid-cols-2 gap-12">
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
                        <h3 className="text-2xl font-headline text-foreground">
                          {section.leftHeadline}
                        </h3>
                      )}
                      {section.leftBody && (
                        <div className="prose text-muted-foreground">
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
                        <h3 className="text-2xl font-headline text-foreground">
                          {section.rightHeadline}
                        </h3>
                      )}
                      {section.rightBody && (
                        <div className="prose text-muted-foreground">
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
