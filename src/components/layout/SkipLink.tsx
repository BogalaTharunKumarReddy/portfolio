/** First focusable element on the page: lets keyboard users jump past the navigation. */
export function SkipLink() {
  return (
    <a
      href="#main"
      onClick={(event) => {
        event.preventDefault()
        const main = document.getElementById('main')
        main?.focus({ preventScroll: false })
      }}
      className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-brand-cyan px-5 py-2.5 text-sm font-semibold text-onbrand shadow-glow transition-transform focus:translate-y-0"
    >
      Skip to main content
    </a>
  )
}
