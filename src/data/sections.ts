import type { SectionMeta } from '@/types'

/**
 * Ordered registry of every home-page section.
 * Navigation, scroll-spy, footer links and section headings all read from here.
 */
export const sections: SectionMeta[] = [
  {
    id: 'home',
    label: 'Home',
    eyebrow: 'Welcome',
    title: 'Home',
    description: 'Introduction',
    inNav: false,
  },
  {
    id: 'about',
    label: 'About',
    eyebrow: '01 / About',
    title: 'A developer who cares about the details',
    highlight: 'details',
    description: 'Who I am, what I am studying and the kind of work I want to do.',
    inNav: true,
  },
  {
    id: 'workspace',
    label: 'Workspace',
    eyebrow: '02 / Workspace',
    title: 'Step into my dev setup',
    highlight: 'dev setup',
    description: 'An interactive 3D desk and the tools I use. Drag to look around, then click the monitor or lamp.',
    inNav: false,
  },
  {
    id: 'education',
    label: 'Education',
    eyebrow: '03 / Education',
    title: 'Learning path',
    highlight: 'path',
    description: 'My academic journey so far.',
    inNav: true,
  },
  {
    id: 'skills',
    label: 'Skills',
    eyebrow: '04 / Skills',
    title: 'Tools I build with',
    highlight: 'build',
    description: 'Technologies grouped by what they are used for.',
    inNav: true,
  },
  {
    id: 'projects',
    label: 'Projects',
    eyebrow: '05 / Projects',
    title: 'Selected work',
    highlight: 'work',
    description: 'Hands-on projects, each with a detailed case study.',
    inNav: true,
  },
  {
    id: 'experience',
    label: 'Experience',
    eyebrow: '06 / Experience',
    title: 'Hands-on experience',
    highlight: 'experience',
    description: 'Practical work and learning milestones.',
    inNav: true,
  },
  {
    id: 'certificates',
    label: 'Certificates',
    eyebrow: '07 / Certificates',
    title: 'Certifications',
    highlight: 'Certifications',
    description: 'Courses and credentials I have completed.',
    inNav: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    eyebrow: '08 / Open source',
    title: 'Live from GitHub',
    highlight: 'GitHub',
    description: 'Profile stats, languages and my latest public repositories, pulled live from GitHub.',
    inNav: false,
  },
  {
    id: 'resume',
    label: 'Resume',
    eyebrow: '09 / Resume',
    title: 'Preview and download',
    highlight: 'download',
    description: 'Read my resume here or download the PDF.',
    inNav: false,
  },
  {
    id: 'blog',
    label: 'Blog',
    eyebrow: '10 / Writing',
    title: 'Technical notes',
    highlight: 'notes',
    description: 'Short write-ups on what I am learning and building.',
    inNav: true,
  },
  {
    id: 'contact',
    label: 'Contact',
    eyebrow: '11 / Contact',
    title: 'Let’s build something',
    highlight: 'build',
    description: 'Open to fresher roles and internships. Send me a message.',
    inNav: true,
  },
]

export const navSections = sections.filter((s) => s.inNav)
export const sectionIds = sections.map((s) => s.id)

export function getSection(id: string): SectionMeta {
  const section = sections.find((s) => s.id === id)
  if (!section) throw new Error(`Unknown section "${id}"`)
  return section
}
