interface BlogProseProps {
  children: React.ReactNode
}

/**
 * Typography wrapper for blog article body content. Apply plain semantic
 * HTML (h2, p, a, ul, BlogFigure) as children and this handles the styling,
 * matching the site's editorial typography used elsewhere (see policies/[slug]).
 */
export default function BlogProse({ children }: BlogProseProps) {
  return (
    <div
      className="
        text-[18px] text-[#253136] leading-[1.65]
        [&>p]:mb-6
        [&>h2]:font-headline [&>h2]:text-[26px] [&>h2]:md:text-[30px] [&>h2]:leading-[1.3] [&>h2]:text-[#253136] [&>h2]:mt-14 [&>h2]:mb-5 [&>h2]:scroll-mt-28
        [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-[#253136]/35 [&_a:hover]:decoration-[#253136]
        [&>figure]:my-10
        [&>p>strong]:font-headline [&>p>strong]:text-[20px]
      "
    >
      {children}
    </div>
  )
}
