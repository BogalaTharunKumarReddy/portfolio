import type { TimelineItem } from '@/types'
import { profile } from './profile'

/**
 * Experience timeline, newest first. Only real activity is listed: this is a
 * fresher portfolio, so academic projects are presented honestly as such.
 * Add internships or freelance work here as they happen.
 */
export const experience: TimelineItem[] = [
  {
    id: 'next-role',
    period: 'Now',
    title: 'Open to internships and fresher roles',
    subtitle: 'Frontend Developer',
    description:
      'Looking for my first internship or full-time role where I can contribute to real products and learn from experienced engineers.',
    icon: 'briefcase',
  },
  {
    id: 'eduskills-data-engineering',
    period: 'Jan – Mar 2026',
    title: 'Data Engineering Virtual Internship',
    subtitle: 'AICTE · EduSkills (AWS Academy curriculum)',
    description:
      'Completed a 10-week virtual internship in data engineering and earned Grade O (Outstanding). Certificate ID 44c58cbf59db4a9b8905.',
    tags: ['Data Engineering', 'AWS'],
    icon: 'chart',
  },
  {
    id: 'internlink-web-development',
    period: 'Dec 2025',
    title: 'Web Development Internship Program',
    subtitle: 'InternLink · virtual',
    description:
      'Completed the InternLink Web Development internship program and received a Certificate of Completion on 30 Dec 2025.',
    tags: ['Web Development'],
    icon: 'code',
  },
  {
    id: 'study',
    period: `${profile.studyPeriod.split(' ')[0]} – Present`,
    title: 'B.Tech student, Information Technology',
    subtitle: profile.university,
    description:
      'Building a strong base in programming, databases and web development while applying it in hands-on projects.',
    icon: 'graduation',
  },
]
