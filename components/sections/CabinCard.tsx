import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { urlForImage } from '@/sanity/lib/image'
import type { Cabin } from '@/sanity/types'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface CabinCardProps {
  cabin: Cabin
}

export default function CabinCard({ cabin }: CabinCardProps) {
  return (
    <Card className="overflow-hidden border border-border/60 bg-card/80 shadow-sm">
      <div className="grid gap-12 px-6 py-12 md:grid-cols-2 md:px-10">
        <div className="space-y-8">
          <CardHeader className="p-0">
            <h2 className="text-3xl font-serif text-foreground">{cabin.title}</h2>
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3rem] text-muted-foreground">
              <span>{cabin.squareFeet} sq ft</span>
              <span className="text-muted-foreground/40">•</span>
              <span>Sleeps {cabin.sleeps}</span>
              <span className="text-muted-foreground/40">•</span>
              <span>{cabin.bedType}</span>
            </div>
          </CardHeader>

          <CardContent className="p-0 text-muted-foreground">
            <div className="prose prose-stone max-w-none">
              <PortableText value={cabin.description} />
            </div>
          </CardContent>

          <div className="rounded-lg border border-border/80 bg-background/50 p-6">
            <h3 className="text-xs uppercase tracking-[0.35rem] text-muted-foreground">What&rsquo;s included</h3>
            <Separator className="my-4" />
            <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              {cabin.included?.map((item, i) => (
                <li key={`${cabin._id}-included-${i}`} className="flex items-start gap-2">
                  <span className="mt-1 text-muted-foreground/40">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          {cabin.images?.[0] ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border/70 bg-muted">
              <Image
                src={urlForImage(cabin.images[0]).width(1200).height(900).url()}
                alt={cabin.title}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-border text-muted-foreground">
              Image coming soon
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

