import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Timeline } from '@/components/ui/Timeline'
import { education } from '@/data/education'
import { getSection } from '@/data/sections'

export function Education() {
  const section = getSection('education')

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
        <Timeline items={education} label="Education timeline" />
      </div>
    </Section>
  )
}
