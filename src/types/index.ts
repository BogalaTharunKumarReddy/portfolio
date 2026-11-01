export interface SectionMeta {
  /** DOM id of the section and hash used in URLs (`/#projects`). */
  id: string
  label: string
  eyebrow: string
  title: string
  /** Words inside `title` rendered with the accent gradient. */
  highlight?: string
  description: string
  /** Show in the primary navigation bar. */
  inNav: boolean
}

export type SocialId = 'github' | 'linkedin' | 'email'

export interface SocialLink {
  id: SocialId
  label: string
  href: string
  handle: string
}

export interface Profile {
  name: string
  firstName: string
  initials: string
  headline: string
  tagline: string
  availability: string
  location: string
  university: string
  degree: string
  studyPeriod: string
  graduationYear: number
  githubUsername: string
  /** Repo names to keep out of the auto-synced GitHub list. */
  githubHiddenRepos: string[]
  /** Path of your portrait in /public (e.g. /profile.jpg). Falls back to a monogram if missing. */
  photo: string
  /** Tight, small crop of the portrait used for the hero avatar. */
  photoAvatar: string
  email: string
  resumePath: string
  socials: SocialLink[]
}

/* ---------------------------------- About --------------------------------- */

export type IconName =
  | 'layout'
  | 'server'
  | 'database'
  | 'brain'
  | 'wrench'
  | 'book'
  | 'sparkles'
  | 'code'
  | 'graduation'
  | 'briefcase'
  | 'users'
  | 'building'
  | 'chart'

export interface Highlight {
  icon: IconName
  title: string
  text: string
}

/* ------------------------------- Timelines -------------------------------- */

export interface TimelineItem {
  id: string
  period: string
  title: string
  subtitle: string
  description: string
  tags?: string[]
  icon: IconName
  /** Marks an entry as an editable stand-in rather than real information. */
  placeholder?: boolean
}

/* --------------------------------- Skills --------------------------------- */

export interface SkillCategory {
  id: string
  title: string
  description: string
  icon: IconName
  skills: string[]
}

/* -------------------------------- Projects -------------------------------- */

export type ProjectCategory = 'Full Stack' | 'Machine Learning' | 'Data Analysis' | 'Web'
export type Accent = 'blue' | 'cyan' | 'teal'

export interface Project {
  slug: string
  title: string
  tagline: string
  summary: string
  category: ProjectCategory
  icon: IconName
  accent: Accent
  status: string
  /** Cover image in /public/projects (16:10 works best). Falls back to the icon banner. */
  image?: string
  stack: string[]
  features: string[]
  /** Leave undefined until the URL exists; buttons only render for set links. */
  links: { github?: string; live?: string }
  caseStudy: {
    overview: string
    problem: string
    role: string
    approach: { title: string; text: string }[]
    challenges: { challenge: string; solution: string }[]
    learnings: string[]
    next: string[]
  }
}

/* ------------------------------ Certificates ------------------------------ */

export interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  /** Optional path in /public (e.g. /certificates/aws.png). */
  image?: string
  /** Optional verification URL. */
  url?: string
  skills?: string[]
  /** Credential / certificate ID printed on the certificate. */
  credentialId?: string
  /** One factual line, e.g. grade or score as printed on the certificate. */
  detail?: string
  placeholder?: boolean
}

/* ---------------------------------- Blog ---------------------------------- */

export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'code'; lang: string; code: string }

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  /** ISO date (YYYY-MM-DD). */
  date: string
  tags: string[]
  blocks: BlogBlock[]
}
