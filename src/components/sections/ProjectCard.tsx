import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GithubIcon } from '@/components/ui/BrandIcons'
import { GlassCard } from '@/components/ui/GlassCard'
import { Icon } from '@/components/ui/Icon'
import { accentGradient } from '@/components/ui/accent'
import { TiltCard } from '@/components/ui/TiltCard'
import { cn } from '@/lib/cn'
import type { Project } from '@/types'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <TiltCard className="h-full">
      <GlassCard className="group flex h-full flex-col overflow-hidden">
        <div className={cn('relative grid aspect-[16/10] place-items-center overflow-hidden bg-gradient-to-br', accentGradient[project.accent])}>
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} preview`}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <>
              <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
              <span className="relative grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-ink/60 text-brand-cyan shadow-glow backdrop-blur">
                <Icon name={project.icon} className="h-8 w-8" />
              </span>
            </>
          )}
          <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-ink/60 px-3 py-1 font-mono text-xs text-slate-300 backdrop-blur">
            {project.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-semibold">
            <Link
              to={`/projects/${project.slug}`}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-offset-8"
            >
              {project.title}
            </Link>
          </h3>
          <p className="mt-2 text-sm text-brand-sky">{project.tagline}</p>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{project.summary}</p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
            {project.stack.map((tech) => (
              <li key={tech} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-slate-300">
                {tech}
              </li>
            ))}
          </ul>

          <div className="relative z-10 mt-6 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-cyan">
              Case study &amp; live demo <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub (opens in a new tab)`}
                className="relative z-10 grid h-9 w-9 place-items-center rounded-full border border-white/10 text-slate-300 hover:border-brand-cyan/40 hover:text-white"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </GlassCard>
    </TiltCard>
  )
}
