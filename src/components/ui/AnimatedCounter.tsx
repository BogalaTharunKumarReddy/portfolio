import { useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { useInView } from '@/hooks/useInView'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  duration?: number
  className?: string
}

/** Counts up to `value` with GSAP the first time it scrolls into view. */
export function AnimatedCounter({ value, suffix = '', duration = 1.6, className }: AnimatedCounterProps) {
  const reduceMotion = useReducedMotion()
  const { ref, everInView } = useInView<HTMLSpanElement>('0px')
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = textRef.current
    if (!el || !everInView) return

    if (reduceMotion) {
      el.textContent = `${value}${suffix}`
      return
    }

    const state = { n: 0 }
    const tween = gsap.to(state, {
      n: value,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = `${Math.round(state.n)}${suffix}`
      },
    })
    return () => {
      tween.kill()
    }
  }, [everInView, reduceMotion, value, suffix, duration])

  return (
    <span ref={ref} className={className}>
      {/* Final value is in the DOM for screen readers and no-JS-animation cases; the span below animates. */}
      <span className="sr-only">{`${value}${suffix}`}</span>
      <span ref={textRef} aria-hidden="true">
        0{suffix}
      </span>
    </span>
  )
}
