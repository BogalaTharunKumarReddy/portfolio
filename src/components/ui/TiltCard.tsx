import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import type { PointerEvent, ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** Max rotation in degrees. */
  max?: number
}

/**
 * 3D tilt: the card rotates towards the cursor and a soft highlight follows it.
 * Mouse only; touch, pen and reduced-motion users get a flat card.
 */
export function TiltCard({ children, className, max = 9 }: TiltCardProps) {
  const reduceMotion = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 220, damping: 20 })
  const sy = useSpring(py, { stiffness: 220, damping: 20 })

  const rotateY = useTransform(sx, [0, 1], [-max, max])
  const rotateX = useTransform(sy, [0, 1], [max, -max])
  const glare = useTransform([sx, sy], ([x, y]) => `radial-gradient(360px circle at ${Number(x) * 100}% ${Number(y) * 100}%, rgb(255 255 255 / 0.12), transparent 55%)`)

  if (reduceMotion) return <div className={className}>{children}</div>

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }
  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <div style={{ perspective: 1000 }} className={className}>
      <motion.div
        className="relative h-full [transform-style:preserve-3d]"
        style={{ rotateX, rotateY }}
        onPointerMove={onMove}
        onPointerLeave={reset}
      >
        {children}
        <motion.span
          aria-hidden="true"
          className={cn('pointer-events-none absolute inset-0 rounded-2xl')}
          style={{ background: glare }}
        />
      </motion.div>
    </div>
  )
}
