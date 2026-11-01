import { lazy } from 'react'
import { SceneGate } from '@/components/three/SceneGate'

const DevScene = lazy(() => import('@/components/three/DevScene'))

/** Static stand-in (no WebGL, loading or error): the illustrated version of the same scene. */
function SceneFallback() {
  return (
    <img
      src="/hero-developer.webp"
      srcSet="/hero-developer-800.webp 800w, /hero-developer.webp 1600w"
      sizes="(min-width: 1024px) 40rem, 92vw"
      width={1600}
      height={900}
      alt=""
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover"
    />
  )
}

/**
 * The hero's right-hand side: an animated 3D developer scene on a dark "screen"
 * card (it reads well on both the light and the dark theme).
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[42rem]">
      <div aria-hidden="true" className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand-blue/30 via-brand-cyan/20 to-transparent blur-3xl" />
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/15 bg-[radial-gradient(ellipse_90%_80%_at_50%_30%,#241a5e,#0b0a26_70%)] shadow-glow-lg">
        <SceneGate
          className="absolute inset-0"
          label="Animated 3D illustration of a developer typing on a laptop, with floating panels showing a tech stack and projects"
          fallback={<SceneFallback />}
        >
          {({ active, reducedMotion }) => <DevScene active={active} reducedMotion={reducedMotion} />}
        </SceneGate>
      </div>
    </div>
  )
}
