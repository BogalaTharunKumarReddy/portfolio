import { useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToSection } from '@/lib/scroll'

/**
 * Handles scroll position after route changes:
 *  - `/#about` style URLs scroll to the section once it has mounted
 *    (page transitions delay mounting, so we retry for a short while);
 *  - any other navigation resets to the top of the page.
 */
export function useHashScroll(): void {
  const { pathname, hash } = useLocation()
  const reduceMotion = useReducedMotion() ?? false

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    const id = decodeURIComponent(hash.slice(1))
    let frame = 0
    let attempts = 0

    const tryScroll = () => {
      if (scrollToSection(id, reduceMotion)) return
      if (attempts++ < 90) frame = requestAnimationFrame(tryScroll)
    }
    frame = requestAnimationFrame(tryScroll)

    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, reduceMotion])
}
