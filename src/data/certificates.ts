import type { Certificate } from '@/types'

/**
 * Certificate gallery. Every entry below is a real certificate; the details
 * come straight from what is printed on it. To add another:
 *   1. copy the image into /public/certificates/ and set `image`
 *   2. fill title, issuer, date (and optionally `credentialId`, `detail`, `url`)
 * `url` is a verification link: add it once you have one and a button appears.
 */
export const certificates: Certificate[] = [
  {
    id: 'eduskills-data-engineering',
    title: 'Data Engineering Virtual Internship',
    issuer: 'AICTE · EduSkills (AWS Academy curriculum)',
    date: 'Jan – Mar 2026',
    image: '/certificates/eduskills-data-engineering.jpg',
    credentialId: '44c58cbf59db4a9b8905',
    detail: '10-week virtual internship · Grade: O (Outstanding)',
    skills: ['Data Engineering', 'AWS'],
  },
  {
    id: 'internlink-web-development',
    title: 'Web Development Internship Program',
    issuer: 'InternLink',
    date: '30 Dec 2025',
    image: '/certificates/internlink-web-development.jpg',
    credentialId: 'IL12WEB0038',
    detail: 'Certificate of Completion',
    skills: ['Web Development'],
  },
  {
    id: 'nasscom-data-processing-visualisation',
    title: 'Data Processing and Visualisation',
    issuer: 'Nasscom FutureSkills Prime',
    date: '26 Sep 2026',
    image: '/certificates/nasscom-data-processing-visualisation.jpg',
    credentialId: 'FSP/2026/9/10407145',
    detail: 'Assessment cleared · Gold · 77%',
    skills: ['Data Processing', 'Data Visualisation'],
  },
  {
    id: 'nasscom-acquiring-data',
    title: 'Acquiring Data',
    issuer: 'Nasscom FutureSkills Prime',
    date: '26 Sep 2026',
    image: '/certificates/nasscom-acquiring-data.jpg',
    credentialId: 'FSP/2026/9/10407234',
    detail: 'Assessment cleared · Gold · 92%',
    skills: ['Data Acquisition'],
  },
  {
    id: 'nasscom-exploratory-data-analysis',
    title: 'Exploratory Data Analysis',
    issuer: 'Nasscom FutureSkills Prime',
    date: '26 Sep 2026',
    image: '/certificates/nasscom-exploratory-data-analysis.jpg',
    credentialId: 'FSP/2026/9/10407128',
    detail: 'Assessment cleared · Silver · 60%',
    skills: ['Exploratory Data Analysis'],
  },
]
