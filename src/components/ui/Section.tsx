import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Container } from './Container'

interface SectionProps {
  id: string
  children: ReactNode
  className?: string
}

/** Page section with consistent spacing, anchor offset and an accessible name. */
export function Section({ id, children, className }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn('relative scroll-mt-24 py-24 outline-none sm:py-32', className)}
    >
      <Container>{children}</Container>
    </section>
  )
}
