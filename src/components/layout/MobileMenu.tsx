import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { SectionLink } from '@/components/ui/SectionLink'
import { profile } from '@/data/profile'
import { sections } from '@/data/sections'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { cn } from '@/lib/cn'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  activeId: string
}

/** Sections shown in the mobile menu: everything except the hero. */
const menuItems = sections.filter((s) => s.id !== 'home')

export function MobileMenu({ open, onClose, activeId }: MobileMenuProps) {
  const reduceMotion = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  useLockBodyScroll(open)

  // Focus management: move focus in, trap Tab, close on Escape.
  useEffect(() => {
    if (!open) return
    const toggle = document.querySelector<HTMLElement>('[data-menu-toggle]')
    const focusables = (): HTMLElement[] => [
      ...(toggle ? [toggle] : []),
      ...Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
      ),
    ]

    focusables()[1]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        toggle?.focus()
        return
      }
      if (event.key !== 'Tab') return
      const items = focusables()
      const first = items[0]
      const last = items[items.length - 1]
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-50 overflow-y-auto bg-ink/95 px-6 pb-10 pt-28 backdrop-blur-xl xl:hidden"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: 'circle(0% at 92% 4%)' }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, clipPath: 'circle(150% at 92% 4%)' }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: 'circle(0% at 92% 4%)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <nav aria-label="Mobile">
            <ul className="mx-auto flex max-w-md flex-col gap-1">
              {menuItems.map((item, index) => {
                const isActive = activeId === item.id
                return (
                  <motion.li
                    key={item.id}
                    initial={reduceMotion ? false : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.12 + index * 0.04, duration: 0.35 }}
                  >
                    <SectionLink
                      sectionId={item.id}
                      onClick={onClose}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'flex items-baseline justify-between rounded-xl px-4 py-3 font-display text-2xl font-semibold transition-colors',
                        isActive ? 'bg-white/5 text-brand-cyan' : 'text-slate-200 hover:bg-white/5 hover:text-white',
                      )}
                    >
                      {item.label}
                      <span aria-hidden="true" className="font-mono text-xs text-slate-400">
                        {item.eyebrow.split(' / ')[0]}
                      </span>
                    </SectionLink>
                  </motion.li>
                )
              })}
            </ul>
          </nav>

          <div className="mx-auto mt-8 flex max-w-md items-center justify-between gap-4 border-t border-white/10 pt-6">
            <SectionLink
              sectionId="resume"
              onClick={onClose}
              className={buttonStyles({ variant: 'primary', size: 'md' })}
            >
              View resume
            </SectionLink>
            <div className="flex items-center gap-2">
              {profile.socials
                .filter((s) => s.id !== 'email')
                .map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} (opens in a new tab)`}
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-brand-cyan/40 hover:text-white"
                  >
                    {social.id === 'github' ? (
                      <GithubIcon className="h-5 w-5" />
                    ) : (
                      <LinkedinIcon className="h-5 w-5" />
                    )}
                  </a>
                ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
