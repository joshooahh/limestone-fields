import Image from 'next/image'

interface BlogFigureProps {
  src: string | null
  alt: string
  caption?: string
  aspect?: string
  priority?: boolean
}

export default function BlogFigure({
  src,
  alt,
  caption,
  aspect = 'aspect-[16/10]',
  priority = false,
}: BlogFigureProps) {
  return (
    <figure>
      <div className={`relative ${aspect} overflow-hidden rounded-lg bg-[#b3c1ce]`}>
        {src && (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 700px, 100vw"
            priority={priority}
          />
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 font-subhead text-[12px] tracking-[0.08em] text-[#253136]/55">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
