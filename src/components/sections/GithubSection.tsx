import { ExternalLink, RotateCw } from 'lucide-react'
import { GithubIcon } from '@/components/ui/BrandIcons'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { Button, ButtonLink } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { Reveal } from '@/components/ui/Reveal'
import { GithubProjects } from './GithubProjects'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { profile } from '@/data/profile'
import { getSection } from '@/data/sections'
import { useGithub } from '@/hooks/useGithub'
import { cn } from '@/lib/cn'
import type { GithubData } from '@/lib/github'

const languageColors = ['bg-brand-blue', 'bg-brand-cyan', 'bg-brand-teal', 'bg-brand-sky', 'bg-indigo-400', 'bg-slate-400']

function Skeleton() {
  return <div aria-hidden="true" className="glass h-72 animate-pulse rounded-2xl" />
}

function Loaded({ data }: { data: GithubData }) {
  const { user, totalStars, languages } = data
    const totalLang = languages.reduce((s, l) => s + l.count, 0)
  const stats = [
    { label: 'Public repos', value: user.public_repos },
    { label: 'Stars earned', value: totalStars },
    { label: 'Followers', value: user.followers },
  ]

  return (
    <>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
        <Reveal className="min-w-0">
          <GlassCard className="flex h-full flex-col gap-6 p-6">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar_url}
                alt={`${user.login} GitHub avatar`}
                width={64}
                height={64}
                loading="lazy"
                className="h-16 w-16 rounded-full border border-white/10"
              />
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold text-white">{user.name ?? user.login}</p>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex max-w-full items-center gap-1.5 text-sm text-brand-cyan hover:underline"
                >
                  <span className="truncate">@{user.login}</span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </div>
            {user.bio && <p className="text-sm text-slate-400">{user.bio}</p>}
            <dl className="grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                  <dd className="font-display text-2xl font-bold text-gradient">
                    <AnimatedCounter value={s.value} />
                  </dd>
                  <dt className="mt-1 text-[11px] text-slate-400">{s.label}</dt>
                </div>
              ))}
            </dl>
            {languages.length > 0 && (
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">Languages</p>
                <div
                  role="img"
                  aria-label={`Languages: ${languages.map((l) => `${l.name} ${l.count}`).join(', ')}`}
                  className="mt-3 flex h-2.5 overflow-hidden rounded-full bg-white/5"
                >
                  {languages.map((l, i) => (
                    <span key={l.name} className={languageColors[i % languageColors.length]} style={{ width: `${(l.count / totalLang) * 100}%` }} />
                  ))}
                </div>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-400">
                  {languages.slice(0, 6).map((l, i) => (
                    <li key={l.name} className="flex items-center gap-1.5">
                      <span aria-hidden="true" className={cn('h-2 w-2 rounded-full', languageColors[i % languageColors.length])} />
                      {l.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </GlassCard>
        </Reveal>

        <GithubProjects />
      </div>

      <div className="mt-8">
        <ButtonLink
          href={user.html_url}
          external
          variant="secondary"
          leadingIcon={<GithubIcon className="h-4 w-4" />}
        >
          View all repositories
        </ButtonLink>
      </div>
    </>
  )
}

export function GithubSection() {
  const section = getSection('github')
  // Fetched on page load (and cached for the session), not on scroll: swapping the
  // skeleton for real content while the user scrolls past would shift the layout
  // and make in-page navigation land short of its target.
  const { state, retry } = useGithub(profile.githubUsername)

  return (
    <Section id={section.id}>
      <SectionHeading
        sectionId={section.id}
        eyebrow={section.eyebrow}
        title={section.title}
        highlight={section.highlight}
        description={section.description}
      />
      <div aria-live="polite" aria-busy={state.status === 'loading'} className="min-h-[18rem]">
        {state.status === 'loading' && <Skeleton />}
        {state.status === 'success' && <Loaded data={state.data} />}
        {state.status === 'error' && (
          <GlassCard spotlight={false} className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-white">Couldn’t load live GitHub data</p>
              <p className="mt-1 text-sm text-slate-400">{state.message} You can still view everything on GitHub directly.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" size="sm" onClick={retry} leadingIcon={<RotateCw className="h-4 w-4" aria-hidden="true" />}>
                Retry
              </Button>
              <ButtonLink
                href={`https://github.com/${profile.githubUsername}`}
                external
                size="sm"
                leadingIcon={<GithubIcon className="h-4 w-4" />}
              >
                Open GitHub
              </ButtonLink>
            </div>
          </GlassCard>
        )}
      </div>
    </Section>
  )
}
