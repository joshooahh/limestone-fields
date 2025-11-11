import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from 'sanity'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface ValuePropItem {
  title: string
  description: string
}

interface ValuePropProps {
  eyebrow?: string
  headline: string
  copy?: string
  body?: PortableTextBlock[]
  items?: ValuePropItem[]
}

export default function ValueProp({ eyebrow, headline, copy, body, items = [] }: ValuePropProps) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <Card className="border-none bg-card/80 shadow-sm">
          <CardHeader className="space-y-4 text-center">
            {eyebrow && (
              <p className="text-xs uppercase tracking-[0.4rem] text-muted-foreground">{eyebrow}</p>
            )}
            <CardTitle className="text-3xl md:text-4xl font-serif text-foreground">{headline}</CardTitle>
          </CardHeader>
          <CardContent className="mx-auto max-w-3xl space-y-6 text-center text-muted-foreground">
            {body ? (
              <div className="prose prose-lg mx-auto text-left text-muted-foreground">
                <PortableText value={body} />
              </div>
            ) : (
              copy && <p className="text-lg leading-relaxed">{copy}</p>
            )}
          </CardContent>
        </Card>

        {items.length > 0 && (
          <div className="grid gap-8 md:grid-cols-3">
            {items.map((item, index) => (
              <div key={item.title} className="rounded-xl border border-border bg-background p-6 shadow-sm">
                <h3 className="font-serif text-lg text-foreground">{item.title}</h3>
                <Separator className="my-4" />
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                <div className="mt-6 text-xs uppercase text-muted-foreground/80">0{index + 1}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
