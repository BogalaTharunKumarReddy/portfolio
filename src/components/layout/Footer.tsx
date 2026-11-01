import { ArrowUp, Mail } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons'
import { Container } from '@/components/ui/Container'
import { SectionLink } from '@/components/ui/SectionLink'
import { profile } from '@/data/profile'
import { navSections } from '@/data/sections'
import type { SocialId } from '@/types'
import { Logo } from './Logo'

function SocialIcon({ id }: { id: SocialId }) {
  const className = 'h-4 w-4'
  if (id === 'github') return <GithubIcon className={className} />
  if (id === 'linkedin') return <LinkedinIcon className={className} />
  return <Mail className={className} aria-hidden="true" />
}

const YEAR = new Date().getFullYear()

export function Footer() {
  const reduceMotion = useReducedMotion()

  return (
    <footer className="relative border-t border-white/10 bg-navy-950/60">
      <Container wide className="py-14">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-slate-400">
              {profile.tagline} Based in {profile.location}.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">Explore</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {navSections.map((item) => (
                <li key={item.id}>
                  <SectionLink
                    sectionId={item.id}
                    className="text-sm text-slate-400 transition-colors hover:text-brand-cyan"
                  >
                    {item.label}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">Connect</h2>
            <ul className="mt-4 space-y-2.5">
              {profile.socials.map((social) => {
                const external = social.id !== 'email'
                return (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group inline-flex items-center gap-3 text-sm text-slate-400 transition-colors hover:text-brand-cyan"
                    >
                      <SocialIcon id={social.id} />
                      <span>{social.label}</span>
                      {external && <span className="sr-only">(opens in a new tab)</span>}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center">
          <p>
            © {YEAR} {profile.name}. Built with React, TypeScript, Tailwind CSS, Framer Motion and
            Three.js.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-slate-300 transition-colors hover:border-brand-cyan/40 hover:text-white"
          >
            Back to top
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </Container>
    </footer>
  )
}
