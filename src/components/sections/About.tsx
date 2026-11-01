import { GlassCard } from '@/components/ui/GlassCard'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { Icon } from '@/components/ui/Icon'
import { ProfilePortrait } from '@/components/ui/ProfilePhoto'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { aboutFacts, aboutHighlights, aboutParagraphs } from '@/data/about'
import { blogPosts } from '@/data/blog'
import { projects } from '@/data/projects'
import { getSection } from '@/data/sections'
import { allSkills } from '@/data/skills'

const stats = [
  { label: 'Projects built', value: projects.length },
  { label: 'Technologies', value: allSkills.length },
  { label: 'Technical articles', value: blogPosts.length },
]

export function About() {
  const section = getSection('about')

  return (
    <Section id={section.id}>
      <SectionHeading
        sectionId={section.id}
        eyebrow={section.eyebrow}
        title={section.title}
        highlight={section.highlight}
        description={section.description}
      />

      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start">
        <div className="space-y-5 text-lg leading-relaxed text-slate-300">
          {aboutParagraphs.map((text, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p>{text}</p>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <dl className="grid grid-cols-3 gap-4 pt-4">
              {stats.map((stat) => (
                <GlassCard key={stat.label} className="p-4 text-center sm:p-5">
                  <dt className="order-2 mt-1 text-xs text-slate-400 sm:text-sm">{stat.label}</dt>
                  <dd className="font-display text-3xl font-bold text-gradient sm:text-4xl">
                    <AnimatedCounter value={stat.value} />
                  </dd>
                </GlassCard>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="min-w-0 space-y-8">
          <Reveal delay={0.1}>
            <ProfilePortrait />
          </Reveal>

          <Reveal delay={0.15}>
            <GlassCard className="p-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">Quick facts</h3>
              <dl className="mt-5 divide-y divide-white/5">
                {aboutFacts.map((fact) => (
                  <div key={fact.label} className="flex items-start justify-between gap-6 py-3 text-sm">
                    <dt className="text-slate-400">{fact.label}</dt>
                    <dd className="text-right text-slate-100">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </GlassCard>
          </Reveal>
        </div>
      </div>

      <ul className="mt-12 grid gap-5 md:grid-cols-3">
        {aboutHighlights.map((item, i) => (
          <li key={item.title}>
            <Reveal delay={i * 0.08} className="h-full">
              <GlassCard className="h-full p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-cyan/10 text-brand-cyan">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.text}</p>
              </GlassCard>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
