import { useReducedMotion } from 'framer-motion'
import { Suspense, useState, type ReactNode } from 'react'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/cn'
import { supportsWebGL } from '@/lib/webgl'

interface SceneGateProps {
  /** Accessible description of the visual (the canvas itself is decorative). */
  label: string
  /** Lightweight stand-in shown while loading, without WebGL, or if the scene crashes. */
  fallback: ReactNode
  className?: string
  /** Render prop: `active` is true while on screen, `reducedMotion` mirrors the OS setting. */
  children: (state: { active: boolean; reducedMotion: boolean }) => ReactNode
}

/**
 * Wraps a lazily-loaded WebGL scene so that it
 *  - is only mounted once it nears the viewport (saves bandwidth and GPU),
 *  - pauses rendering when scrolled away,
 *  - falls back gracefully when WebGL is missing or throws.
 */
export function SceneGate({ label, fallback, className, children }: SceneGateProps) {
  const reducedMotion = useReducedMotion() ?? false
  const { ref, inView, everInView } = useInView<HTMLDivElement>('250px')
  const [crashed, setCrashed] = useState(false)
  const [webgl] = useState(() => supportsWebGL())

  const showScene = webgl && !crashed && everInView

  return (
    <div ref={ref} role="img" aria-label={label} className={cn('relative', className)}>
      {showScene ? (
        <ErrorBoundary fallback={fallback} onError={() => setCrashed(true)}>
          <Suspense fallback={fallback}>{children({ active: inView, reducedMotion })}</Suspense>
        </ErrorBoundary>
      ) : (
        fallback
      )}
    </div>
  )
}
