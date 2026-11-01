import type { TimelineItem } from '@/types'
import { profile } from './profile'

/**
 * Education timeline, newest first.
 * Real details from the resume. An entry with `placeholder: true` would show a dashed
 * "edit me" card, so none are left.
 */
export const education: TimelineItem[] = [
  {
    id: 'btech',
    period: `${profile.studyPeriod} (expected)`,
    title: profile.degree,
    subtitle: `${profile.university}, Hyderabad`,
    description:
      'Four-year undergraduate programme covering programming, databases, web technologies and software engineering fundamentals, alongside hands-on projects.',
    tags: ['CGPA 8.0/10', 'Databases', 'Web Technologies', 'AI & ML'],
    icon: 'graduation',
  },
  {
    id: 'intermediate',
    period: '2022 – 2024',
    title: 'Intermediate (MPC)',
    subtitle: 'Sri Chaitanya Junior College, Nidamanuru',
    description: 'Board of Intermediate Education, Mathematics, Physics and Chemistry. Scored 71%.',
    tags: ['MPC', '71%'],
    icon: 'book',
  },
  {
    id: 'school',
    period: '2022',
    title: 'Secondary School Certificate (SSC)',
    subtitle: 'Zilla Parishad High School (ZPHS), Peda Iralapadu',
    description: 'Scored 467 out of 600 marks (77.83%).',
    tags: ['467/600', '77.83%'],
    icon: 'book',
  },
]
