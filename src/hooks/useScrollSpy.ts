import { useEffect } from 'react'

/** Fraction of the viewport height where a section "becomes current". */
const TRIGGER_LINE = 0.4

/**
 * Reports which section currently crosses a line 40% down the viewport.
 * Positions are re-measured on every scroll/resize (rAF-throttled) rather than
 * relying on incremental observer events, so the result stays correct after
 * layout shifts (images, lazy content, filters) and instant jumps.
 * Calls `onChange('')` on unmount so the nav clears. `onChange` must be stable.
 */
export function useScrollSpy(ids: readonly string[], onChange: (id: string) => void): void {
  const key = ids.join('|')

  useEffect(() => {
    const elements = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return

    let frame = 0
    let current = ''

    const measure = () => {
      frame = 0
      const line = window.innerHeight * TRIGGER_LINE
      let next = elements[0]!.id
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= line) next = el.id
        else break
      }
      if (next !== current) {
        current = next
        onChange(next)
      }
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    // Late layout changes (fonts, async sections) can move sections without a scroll event.
    const resizeObserver = new ResizeObserver(schedule)
    resizeObserver.observe(document.body)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      resizeObserver.disconnect()
      onChange('')
    }
  }, [key, onChange])
}
