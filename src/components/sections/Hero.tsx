import { ArrowDown, ArrowRight, Download, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { Container } from '@/components/ui/Container'
import { Magnetic } from '@/components/ui/Magnetic'
import { ProfileAvatar } from '@/components/ui/ProfilePhoto'
import { Reveal } from '@/components/ui/Reveal'
import { SectionLink } from '@/components/ui/SectionLink'
import { TextReveal } from '@/components/ui/TextReveal'
import { profile } from '@/data/profile'
import { HeroVisual } from './HeroVisual'

export function Hero() {
  const github = profile.socials.find((s) => s.id === 'github')
  const linkedin = profile.socials.find((s) => s.id === 'linkedin')

  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="relative flex min-h-screen items-center overflow-hidden pb-24 pt-32 outline-none"
    >
      <Container wide>
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          <div className="max-w-2xl">
            <Reveal className="flex flex-wrap items-center gap-4">
              <ProfileAvatar />
              <Badge>
                <span aria-hidden="true" className="h-2 w-2 animate-pulse-glow rounded-full bg-brand-cyan" />
                {profile.availability}
              </Badge>
            </Reveal>

            <h1 id="home-title" className="mt-8 h-fluid-xl font-bold">
              <TextReveal as="span" text="Hi, I’m" immediate className="block" />
              <TextReveal
                as="span"
                text={profile.name}
                highlight="Tharun Kumar Reddy"
                immediate
                delay={0.25}
                className="block"
              />
            </h1>

            <Reveal delay={0.5}>
              <p className="mt-6 font-display text-2xl text-slate-200 sm:text-3xl">{profile.headline}</p>
              <p className="mt-4 max-w-xl text-lg text-slate-400">{profile.tagline}</p>
              <p className="mt-6 inline-flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="h-4 w-4 text-brand-cyan" aria-hidden="true" />
                {profile.location}
              </p>
            </Reveal>

            <Reveal delay={0.65} className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic>
                <SectionLink sectionId="projects" className={buttonStyles({ variant: 'primary', size: 'lg' })}>
                  View projects
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </SectionLink>
              </Magnetic>
              <Magnetic>
                <ButtonLink
                  href={profile.resumePath}
                  download
                  variant="secondary"
                  size="lg"
                  leadingIcon={<Download className="h-4 w-4" aria-hidden="true" />}
                >
                  Download resume
                </ButtonLink>
              </Magnetic>
              <Magnetic>
                <SectionLink sectionId="contact" className={buttonStyles({ variant: 'ghost', size: 'lg' })}>
                  Get in touch
                </SectionLink>
              </Magnetic>
            </Reveal>

            <Reveal delay={0.8} className="mt-8 flex items-center gap-3">
              {github && (
                <Magnetic strength={0.4}>
                  <a
                    href={github.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile (opens in a new tab)"
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-brand-cyan/40 hover:text-white"
                  >
                    <GithubIcon className="h-5 w-5" />
                  </a>
                </Magnetic>
              )}
              {linkedin && (
                <Magnetic strength={0.4}>
                  <a
                    href={linkedin.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile (opens in a new tab)"
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-brand-cyan/40 hover:text-white"
                  >
                    <LinkedinIcon className="h-5 w-5" />
                  </a>
                </Magnetic>
              )}
            </Reveal>
          </div>

          <Reveal delay={0.3} y={0}>
            <HeroVisual />
          </Reveal>
        </div>

        <SectionLink
          sectionId="about"
          aria-label="Scroll to the about section"
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400 transition-colors hover:text-brand-cyan lg:flex"
        >
          Scroll
          <ArrowDown className="h-4 w-4 animate-float" aria-hidden="true" />
        </SectionLink>
      </Container>
    </section>
  )
}
