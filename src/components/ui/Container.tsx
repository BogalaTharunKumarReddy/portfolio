import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Use the wider layout (navigation, footer, hero). */
  wide?: boolean
}

export function Container({ wide = false, className, ...rest }: ContainerProps) {
  return (
    <div
      className={cn('mx-auto w-full px-5 sm:px-8', wide ? 'max-w-7xl' : 'max-w-6xl', className)}
      {...rest}
    />
  )
}
