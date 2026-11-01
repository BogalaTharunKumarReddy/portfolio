/**
 * Fixed, pure-CSS backdrop (colours follow the active theme): soft background, a faint grid
 * and two slow pastel "lights". No JS, no canvas, so it costs almost nothing.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-10%,rgb(var(--amb-top))_0%,transparent_70%)]" />
      <div className="bg-grid absolute inset-0" />
      <div className="absolute -left-40 top-1/4 h-[32rem] w-[32rem] animate-float-slow rounded-full bg-[rgb(var(--amb-a))] blur-[120px] will-change-transform" />
      <div
        className="absolute -right-32 top-2/3 h-[28rem] w-[28rem] animate-float-slow rounded-full bg-[rgb(var(--amb-b))] blur-[120px] will-change-transform"
        style={{ animationDelay: '-8s' }}
      />
    </div>
  )
}
