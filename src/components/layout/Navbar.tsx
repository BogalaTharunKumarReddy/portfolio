import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { Container } from '@/components/ui/Container'
import { Magnetic } from '@/components/ui/Magnetic'
import { SectionLink } from '@/components/ui/SectionLink'
import { navSections } from '@/data/sections'
import { useActiveSection } from '@/hooks/useActiveSection'
import { cn } from '@/lib/cn'
import { ThemeToggle } from './ThemeToggle'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'

export function Navbar() {
  const { active } = useActiveSection()
  const { pathname, hash } = useLocation()
  const [scrolled, setScrolled] = useState(false)

  // The menu is "open" only for the route it was opened on, so navigating
  // (route or hash change) closes it without any effect-driven state reset.
  const routeKey = `${pathname}${hash}`
  const [openForRoute, setOpenForRoute] = useState<string | null>(null)
  const open = openForRoute === routeKey
  const closeMenu = useCallback(() => setOpenForRoute(null), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={cn('fixed inset-x-0 top-0 z-50 transition-[padding] duration-300', scrolled ? 'py-2' : 'py-4')}>
      <Container wide className="relative z-[60]">
        <nav
          aria-label="Primary"
          className={cn(
            'flex items-center justify-between gap-4 rounded-full px-3 py-2 pl-4 transition-all duration-300',
            open ? 'border border-transparent' : 'glass-strong',
            scrolled && !open && 'shadow-glow',
          )}
        >
          <Logo onClick={closeMenu} />

          <ul className="hidden items-center gap-1 xl:flex">
            {navSections.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <SectionLink
                    sectionId={item.id}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'nav-link relative block rounded-full px-4 py-2 text-[0.95rem] font-semibold transition-colors',
                      isActive ? 'text-onbrand' : 'text-slate-400 hover:text-brand-blue',
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan shadow-glow-sm"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </SectionLink>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Magnetic className="hidden sm:inline-block">
              <SectionLink sectionId="resume" className={buttonStyles({ variant: 'primary', size: 'sm' })}>
                Resume
              </SectionLink>
            </Magnetic>

            <button
              type="button"
              data-menu-toggle
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpenForRoute(open ? null : routeKey)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white transition-colors hover:border-brand-cyan/40 xl:hidden"
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </Container>

      {/* Sibling of the blurred nav: backdrop-filter would otherwise trap this fixed overlay. */}
      <MobileMenu open={open} onClose={closeMenu} activeId={active} />
    </header>
  )
}
