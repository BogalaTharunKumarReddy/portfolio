import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { projectCategories, projects } from '@/data/projects'
import { getSection } from '@/data/sections'
import { cn } from '@/lib/cn'
import { ProjectCard } from './ProjectCard'

export function Projects() {
  const section = getSection('projects')
  const reduceMotion = useReducedMotion()
  const [filter, setFilter] = useState<(typeof projectCategories)[number]>('All')
  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <Section id={section.id}>
      <SectionHeading
        sectionId={section.id}
        eyebrow={section.eyebrow}
        title={section.title}
        highlight={section.highlight}
        description={section.description}
      />

      <div role="group" aria-label="Filter projects by category" className="mb-10 flex flex-wrap gap-2">
        {projectCategories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
              filter === category
                ? 'border-brand-cyan/50 bg-brand-cyan/15 text-white'
                : 'border-white/10 text-slate-400 hover:border-white/25 hover:text-white',
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <p className="sr-only" role="status">
        Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
      </p>

      <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.li
              key={project.slug}
              layout={!reduceMotion}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

    </Section>
  )
}
