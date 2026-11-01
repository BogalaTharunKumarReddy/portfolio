import type { HTMLAttributes, MouseEvent } from 'react'
import { cn } from '@/lib/cn'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Cursor-following cyan light on hover. */
  spotlight?: boolean
  strong?: boolean
}

export function GlassCard({
  spotlight = true,
  strong = false,
  className,
  onMouseMove,
  ...rest
}: GlassCardProps) {
  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    onMouseMove?.(event)
    if (!spotlight) return
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  return (
    <div
      className={cn(
        'rounded-2xl',
        strong ? 'glass-strong' : 'glass',
        spotlight && 'glass-spotlight',
        className,
      )}
      onMouseMove={handleMouseMove}
      {...rest}
    />
  )
}
