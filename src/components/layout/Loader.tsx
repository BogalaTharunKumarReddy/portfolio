import { useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { profile } from '@/data/profile'
import { markLoaderSeen } from '@/lib/loaderSession'

interface LoaderProps {
  /** Called when the progress reaches 100%: the app mounts underneath while the overlay fades. */
  onReady: () => void
}

/**
 * Custom first-visit loader: a monogram whose ring draws itself while a counter
 * runs to 100, driven by one GSAP timeline. Plays once per session.
 */
export function Loader({ onReady }: LoaderProps) {
  const reduceMotion = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<SVGCircleElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    const ring = ringRef.current
    const count = countRef.current
    if (!root || !ring || !count) return

    const circumference = 2 * Math.PI * 54
    ring.style.strokeDasharray = `${circumference}`
    ring.style.strokeDashoffset = `${circumference}`

    const progress = { value: 0 }
    const duration = reduceMotion ? 0.2 : 1.5

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.to(progress, {
        value: 100,
        duration,
        ease: 'power2.inOut',
        onUpdate: () => {
          count.textContent = String(Math.round(progress.value))
          ring.style.strokeDashoffset = String(circumference * (1 - progress.value / 100))
        },
      })
        .add(() => {
          markLoaderSeen()
          onReady()
        })
        .to(root, {
          opacity: 0,
          duration: reduceMotion ? 0.15 : 0.55,
          ease: 'power1.out',
          onComplete: () => setGone(true),
        })

      if (!reduceMotion) {
        gsap.from('[data-loader-mark]', { scale: 0.8, opacity: 0, duration: 0.6, ease: 'back.out(1.7)' })
        gsap.from('[data-loader-text]', { y: 12, opacity: 0, duration: 0.6, delay: 0.2 })
      }
    }, root)

    return () => ctx.revert()
  }, [reduceMotion, onReady])

  if (gone) return null

  return (
    <div
      ref={rootRef}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[200] grid place-items-center bg-ink"
    >
      <div className="flex flex-col items-center gap-6">
        <div data-loader-mark className="relative grid h-32 w-32 place-items-center">
          <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90" aria-hidden="true">
            <circle cx="60" cy="60" r="54" fill="none" className="stroke-white/10" strokeWidth="3" />
            <circle
              ref={ringRef}
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="url(#loader-gradient)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="loader-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="var(--grad-1)" />
                <stop offset="1" stopColor="var(--grad-2)" />
              </linearGradient>
            </defs>
          </svg>
          <span className="font-display text-3xl font-bold tracking-tight text-gradient">{profile.initials}</span>
        </div>
        <p data-loader-text className="font-mono text-xs uppercase tracking-[0.3em] text-slate-400">
          Loading <span ref={countRef} className="tabular-nums text-brand-cyan">0</span>%
        </p>
      </div>
    </div>
  )
}
