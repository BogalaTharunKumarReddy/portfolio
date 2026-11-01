import type { Profile } from '@/types'

/**
 * Single source of truth for personal details.
 * Anything marked TODO(edit) is a placeholder: replace it with your real value.
 */

// TODO(edit): your deployed URL (also update index.html, public/robots.txt, public/sitemap.xml)
export const SITE_URL = 'https://portfolio-lucky74723s-projects.vercel.app'

export const profile: Profile = {
  name: 'Tharun Kumar Reddy',
  firstName: 'Tharun',
  initials: 'TKR',
  headline: 'Frontend Developer',
  tagline:
    'Information Technology undergraduate building websites and projects with HTML, CSS, JavaScript and ReactJS, using AI tools to build faster.',
  availability: 'Open to fresher Frontend Developer roles',
  location: 'Hyderabad, Telangana, India',
  university: 'Malla Reddy University',
  degree: 'B.Tech in Information Technology',
  studyPeriod: '2024 – 2028',
  graduationYear: 2028,
  githubUsername: 'BogalaTharunKumarReddy',
  // Repos listed here (case-insensitive) never appear in the auto-synced "More from GitHub" list.
  // The profile README repo and forks/archived repos are already skipped.
  githubHiddenRepos: ['portfolio', 'my-portfolio', 'portfolio-website'],
  // Portrait (800x800) and small avatar crop live in /public. Replace the files to change the photo.
  photo: '/profile.jpg',
  photoAvatar: '/profile-avatar.jpg',

  email: 'bogalatharunkumarreddy143@gmail.com',
  // TODO(edit): drop your resume PDF into /public and keep this path (or rename it here)
  resumePath: '/resume.pdf',

  socials: [
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/BogalaTharunKumarReddy',
      handle: '@BogalaTharunKumarReddy',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      // TODO(edit): your LinkedIn profile URL, e.g. https://www.linkedin.com/in/your-handle
      href: 'https://www.linkedin.com/',
      handle: 'Add your profile URL',
    },
    {
      id: 'email',
      label: 'Email',
      href: 'mailto:bogalatharunkumarreddy143@gmail.com',
      handle: 'bogalatharunkumarreddy143@gmail.com',
    },
  ],
}
