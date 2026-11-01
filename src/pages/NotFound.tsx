import { ArrowLeft } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { Container } from '@/components/ui/Container'
import { GlassCard } from '@/components/ui/GlassCard'
import { Magnetic } from '@/components/ui/Magnetic'
import { SectionLink } from '@/components/ui/SectionLink'

export default function NotFound() {
  const { pathname } = useLocation()

  return (
    <section aria-labelledby="notfound-title" className="flex min-h-screen items-center pb-16 pt-32">
      <Seo title="Page not found" path={pathname} noIndex />
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p
            aria-hidden="true"
            className="text-gradient animate-float bg-[length:200%_auto] font-display text-[9rem] font-bold leading-none sm:text-[12rem]"
          >
            404
          </p>
          <h1 id="notfound-title" className="mt-2 text-3xl font-bold sm:text-4xl">
            This page drifted out of orbit
          </h1>
          <p className="mx-auto mt-4 max-w-md text-slate-400">
            The page you are looking for does not exist or has moved. Head back home or jump to my work.
          </p>

          <GlassCard spotlight={false} className="mx-auto mt-8 max-w-md p-4 text-left font-mono text-sm">
            <p className="text-slate-400">$ open {pathname}</p>
            <p className="mt-1 text-red-400">
              Error: no such page
              <span aria-hidden="true" className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-brand-cyan" />
            </p>
          </GlassCard>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <Link to="/" className={buttonStyles({ variant: 'primary', size: 'lg' })}>
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to home
              </Link>
            </Magnetic>
            <Magnetic>
              <SectionLink sectionId="projects" className={buttonStyles({ variant: 'secondary', size: 'lg' })}>
                View projects
              </SectionLink>
            </Magnetic>
          </div>
        </div>
      </Container>
    </section>
  )
}
