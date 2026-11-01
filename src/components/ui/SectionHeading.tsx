import { cn } from '@/lib/cn'
import { Reveal } from './Reveal'
import { TextReveal } from './TextReveal'

interface SectionHeadingProps {
  /** Section id; the heading gets `${sectionId}-title` for aria-labelledby. */
  sectionId: string
  eyebrow: string
  title: string
  highlight?: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  sectionId,
  eyebrow,
  title,
  highlight,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  const centered = align === 'center'

  return (
    <header className={cn('mb-12 max-w-3xl sm:mb-16', centered && 'mx-auto text-center', className)}>
      <Reveal>
        <p
          className={cn(
            'mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-brand-cyan',
            centered && 'justify-center',
          )}
        >
          <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-brand-cyan to-transparent" />
          {eyebrow}
        </p>
      </Reveal>
      <TextReveal
        as="h2"
        id={`${sectionId}-title`}
        text={title}
        highlight={highlight}
        className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl"
      />
      {description && (
        <Reveal delay={0.15}>
          <p className="mt-5 text-lg text-slate-400">{description}</p>
        </Reveal>
      )}
    </header>
  )
}
