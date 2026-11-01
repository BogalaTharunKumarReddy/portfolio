import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Timeline } from '@/components/ui/Timeline'
import { experience } from '@/data/experience'
import { getSection } from '@/data/sections'

export function Experience() {
  const section = getSection('experience')

  return (
    <Section id={section.id}>
      <SectionHeading
        sectionId={section.id}
        eyebrow={section.eyebrow}
        title={section.title}
        highlight={section.highlight}
        description={section.description}
      />
      <div className="max-w-3xl">
        <Timeline items={experience} label="Experience timeline" />
      </div>
    </Section>
  )
}
