import type { SkillCategory } from '@/types'

/**
 * Technical skills grouped by purpose. Only what I actually use: no fake
 * percentage bars. Edit freely as you learn more.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'Building responsive pages and interfaces.',
    icon: 'layout',
    skills: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'ReactJS'],
  },
  {
    id: 'database',
    title: 'Databases',
    description: 'Storing and querying relational data.',
    icon: 'database',
    skills: ['MySQL'],
  },
  {
    id: 'data',
    title: 'Data Analysis',
    description: 'Cleaning, exploring and visualising data.',
    icon: 'chart',
    skills: ['Data Analysis', 'Exploratory Data Analysis', 'Data Visualisation'],
  },
  {
    id: 'ai',
    title: 'AI-assisted Development',
    description: 'Using AI tools to plan, build and debug websites and projects faster.',
    icon: 'sparkles',
    skills: ['AI-assisted development', 'Prompting', 'Building projects with AI'],
  },
]

/** Every distinct skill, used for the technologies counter. */
export const allSkills: string[] = Array.from(new Set(skillCategories.flatMap((c) => c.skills)))
