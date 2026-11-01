import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

/** Thin gradient bar at the top of the viewport showing page scroll progress. */
export function ScrollProgress() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-teal"
      style={{ scaleX: reduceMotion ? scrollYProgress : smooth }}
    />
  )
}
