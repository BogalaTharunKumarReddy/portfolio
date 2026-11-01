import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import type { PointerEvent, ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface MagneticProps {
  children: ReactNode
  /** How far the element is pulled towards the cursor (0–1 of the distance). */
  strength?: number
  className?: string
}

/**
 * Wrapper that gently pulls its child towards the mouse pointer.
 * Disabled for touch/pen input and when the user prefers reduced motion.
 */
export function Magnetic({ children, strength = 0.28, className }: MagneticProps) {
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.2 })
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.2 })

  if (reduceMotion) return <div className={cn('inline-block', className)}>{children}</div>

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className={cn('inline-block', className)}
      style={{ x: springX, y: springY }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onBlur={reset}
    >
      {children}
    </motion.div>
  )
}
