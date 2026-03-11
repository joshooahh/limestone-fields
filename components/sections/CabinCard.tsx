import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { urlForImage } from '@/sanity/lib/image'
import type { Cabin } from '@/sanity/types'

interface CabinCardProps {
  cabin: Cabin
}

export default function CabinCard({ cabin }: CabinCardProps) {
  return (
    <div className="grid gap-12 md:gap-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start">
      {/* Text column */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-[28px] font-headline leading-[1.37] text-[#253136]">
            {cabin.title}
          </h2>
          <div className="flex flex-wrap items-center gap-3 font-subhead text-[11px] uppercase tracking-[0.26em] text-[#253136]/60">
            <span>{cabin.squareFeet} sq ft</span>
            <span>·</span>
            <span>Sleeps {cabin.sleeps}</span>
            <span>·</span>
            <span>{cabin.bedType}</span>
          </div>
        </div>

        <div className="text-[18px] text-[#253136] leading-[1.55] [&_p]:mb-4 [&_p:last-child]:mb-0">
          <PortableText value={cabin.description} />
        </div>

        {cabin.included && cabin.included.length > 0 && (
          <div className="space-y-4">
            <p className="font-subhead text-[12px] tracking-[0.26em] uppercase text-[#253136]">
              WHAT&rsquo;S INCLUDED
            </p>
            <ul className="space-y-3">
              {cabin.included.map((item, i) => (
                <li
                  key={`${cabin._id}-included-${i}`}
                  className="text-[17px] text-[#253136] leading-[1.6]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Image column */}
      <div>
        {cabin.images?.[0] ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={urlForImage(cabin.images[0]).width(1200).height(900).url()}
              alt={cabin.title}
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
  )
}
