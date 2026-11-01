import { GlassCard } from '@/components/ui/GlassCard'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getSection } from '@/data/sections'
import { skillCategories } from '@/data/skills'

export function Skills() {
  const section = getSection('skills')

  return (
    <Section id={section.id}>
      <SectionHeading
        sectionId={section.id}
        eyebrow={section.eyebrow}
        title={section.title}
        highlight={section.highlight}
        description={section.description}
      />

      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {skillCategories.map((category, i) => (
          <li key={category.id}>
            <Reveal delay={(i % 3) * 0.08} className="h-full">
              <GlassCard className="h-full p-6">
                <div className="flex items-center gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-blue/25 to-brand-cyan/25 text-brand-cyan">
                    <Icon name={category.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">{category.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${category.title} skills`}>
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-brand-cyan/40 hover:bg-brand-cyan/10 hover:text-white"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
