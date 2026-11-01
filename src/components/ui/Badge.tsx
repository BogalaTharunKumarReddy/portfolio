import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export function Badge({ className, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-brand-cyan/25 bg-brand-cyan/10 px-3 py-1 font-mono text-sm font-medium tracking-wide text-brand-cyan',
        className,
      )}
      {...rest}
    />
  )
}
