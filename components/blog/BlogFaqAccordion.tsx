import { ChevronDown } from 'lucide-react'

interface BlogFaqAccordionProps {
  faqs: { question: string; answer: string }[]
}

export default function BlogFaqAccordion({ faqs }: BlogFaqAccordionProps) {
  if (faqs.length === 0) return null

  return (
    <section id="faq" className="py-16 md:py-20 bg-[#F9F4EE] rounded-lg px-6 md:px-10">
      <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136] mb-4">
        Questions
      </p>
      <h2 className="font-headline text-[28px] md:text-[32px] leading-[1.3] text-[#253136] mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-0">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="group border-t border-[#253136]/20 last:border-b py-5 open:pb-5"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left text-[18px] font-headline leading-[1.35] text-[#253136] [&::-webkit-details-marker]:hidden">
              <span>{faq.question}</span>
              <ChevronDown className="mt-1.5 h-4 w-4 shrink-0 text-[#253136]/50 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-[16px] text-[#253136]/80 leading-[1.6]">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
