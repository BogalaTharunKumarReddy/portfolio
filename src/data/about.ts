import type { Highlight } from '@/types'
import { profile } from './profile'

export const aboutParagraphs: string[] = [
  `I’m ${profile.firstName}, an Information Technology undergraduate at ${profile.university} in Hyderabad (${profile.studyPeriod}). I enjoy turning ideas into working websites. I’m comfortable with HTML, CSS, JavaScript, Bootstrap, MySQL and ReactJS, I use AI tools to plan and build my projects, and I’m looking for a fresher role where I can keep growing as a frontend developer.`,
  'My projects so far cover a hostel management system, a campus community platform and a customer churn prediction model, so I’ve worked on the interface as well as the data and logic behind it.',
  'I’m still learning, and I learn by building: I use AI tools to help me write and debug code, and I make sure I understand what I ship. I also take data analysis courses alongside web development.',
]

export const aboutHighlights: Highlight[] = [
  {
    icon: 'layout',
    title: 'Frontend first',
    text: 'Responsive pages built with HTML, CSS, JavaScript, Bootstrap and ReactJS.',
  },
  {
    icon: 'server',
    title: 'Full stack thinking',
    text: 'Learning to connect interfaces to a MySQL database to deliver complete features.',
  },
  {
    icon: 'chart',
    title: 'Data curious',
    text: 'Completed data analysis courses (Nasscom FutureSkills Prime) and enjoy working with data.',
  },
]

export const aboutFacts: { label: string; value: string }[] = [
  { label: 'Location', value: profile.location },
  { label: 'University', value: profile.university },
  { label: 'Degree', value: profile.degree },
  { label: 'Graduating', value: String(profile.graduationYear) },
  { label: 'Focus', value: 'HTML · CSS · JavaScript · ReactJS' },
  { label: 'Status', value: profile.availability },
]
