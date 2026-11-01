import { Download, ExternalLink } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { Magnetic } from '@/components/ui/Magnetic'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { education } from '@/data/education'
import { certificates } from '@/data/certificates'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { getSection } from '@/data/sections'
import { skillCategories } from '@/data/skills'

/**
 * On-page resume preview rendered from the same data files as the rest of the
 * site (always readable, works on mobile, never blocked by PDF viewers),
 * plus buttons for the real PDF in /public/resume.pdf.
 */
export function ResumeSection() {
  const section = getSection('resume')
  const realEducation = education.filter((e) => !e.placeholder)

  return (
    <Section id={section.id}>
      <SectionHeading
        sectionId={section.id}
        eyebrow={section.eyebrow}
        title={section.title}
        highlight={section.highlight}
        description={section.description}
      />

      <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
        <Reveal className="min-w-0">
          <GlassCard spotlight={false} className="p-6 sm:p-10">
            <article aria-label="Resume preview" className="space-y-7">
              <header className="border-b border-white/10 pb-6">
                <h3 className="text-3xl font-bold">{profile.name}</h3>
                <p className="mt-1 text-brand-cyan">{profile.headline}</p>
                <p className="mt-2 text-sm text-slate-400">
                  {profile.location} · github.com/{profile.githubUsername}
                </p>
              </header>

              <section aria-label="Summary">
                <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">Summary</h4>
                <p className="mt-3 text-slate-300">{profile.tagline}</p>
              </section>

              <section aria-label="Education">
                <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">Education</h4>
                <ul className="mt-3 space-y-3">
                  {realEducation.map((e) => (
                    <li key={e.id}>
                      <p className="font-semibold text-white">{e.title}</p>
                      <p className="text-sm text-slate-400">
                        {e.subtitle} · {e.period}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-label="Skills">
                <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">Technical skills</h4>
                <dl className="mt-3 space-y-2 text-sm">
                  {skillCategories.slice(0, 5).map((c) => (
                    <div key={c.id} className="sm:flex sm:gap-3">
                      <dt className="w-28 shrink-0 font-medium text-white">{c.title}</dt>
                      <dd className="text-slate-400">{c.skills.join(', ')}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section aria-label="Internships and certifications">
                <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">Internships &amp; certifications</h4>
                <ul className="mt-3 space-y-2 text-sm">
                  {certificates.map((c) => (
                    <li key={c.id} className="text-slate-400">
                      <span className="font-medium text-white">{c.title}</span> · {c.issuer} · {c.date}
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-label="Projects">
                <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">Projects</h4>
                <ul className="mt-3 space-y-4">
                  {projects.map((p) => (
                    <li key={p.slug}>
                      <p className="font-semibold text-white">
                        {p.title} <span className="font-mono text-xs font-normal text-brand-cyan">({p.stack.join(', ')})</span>
                      </p>
                      <p className="mt-1 text-sm text-slate-400">{p.summary}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </article>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-wrap gap-4 lg:sticky lg:top-28 lg:w-64 lg:flex-col">
          <Magnetic>
            <ButtonLink
              href={profile.resumePath}
              download="Tharun_Kumar_Reddy_Resume.pdf"
              size="lg"
              leadingIcon={<Download className="h-4 w-4" aria-hidden="true" />}
              className="w-full"
            >
              Download PDF
            </ButtonLink>
          </Magnetic>
          <Magnetic>
            <ButtonLink
              href={profile.resumePath}
              external
              variant="secondary"
              size="lg"
              trailingIcon={<ExternalLink className="h-4 w-4" aria-hidden="true" />}
            >
              Open in new tab
            </ButtonLink>
          </Magnetic>
        </Reveal>
      </div>
    </Section>
  )
}
