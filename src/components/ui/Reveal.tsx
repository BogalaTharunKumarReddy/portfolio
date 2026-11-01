import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Seconds to wait before the animation starts. */
  delay?: number
  /** Distance in px the content travels upward while fading in. */
  y?: number
  once?: boolean
}

/** Fade-and-rise scroll reveal. Renders plain content for reduced-motion users. */
export function Reveal({ children, className, delay = 0, y = 24, once = true }: RevealProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
