import { useReducedMotion } from 'framer-motion'
import type { MouseEvent } from 'react'
import { Link, useLocation, type LinkProps } from 'react-router-dom'
import { scrollToSection } from '@/lib/scroll'

interface SectionLinkProps extends Omit<LinkProps, 'to'> {
  /** Id of a home-page section (see src/data/sections.ts). */
  sectionId: string
}

/**
 * Link to a home-page section.
 * On the home page it smooth-scrolls in place; from any other route it
 * navigates to `/#section` and `useHashScroll` finishes the job.
 */
export function SectionLink({ sectionId, onClick, children, ...rest }: SectionLinkProps) {
  const { pathname } = useLocation()
  const reduceMotion = useReducedMotion() ?? false
  const isHome = sectionId === 'home'

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (event.defaultPrevented || pathname !== '/') return
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    event.preventDefault()
    scrollToSection(sectionId, reduceMotion)
    window.history.replaceState(null, '', isHome ? '/' : `#${sectionId}`)
  }

  return (
    <Link
      to={{ pathname: '/', hash: isHome ? '' : `#${sectionId}` }}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Link>
  )
}
