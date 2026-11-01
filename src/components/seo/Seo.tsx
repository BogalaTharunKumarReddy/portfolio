import { useEffect } from 'react'
import { SITE_URL, profile } from '@/data/profile'

interface SeoProps {
  /** Page-specific title; the site name is appended automatically. */
  title?: string
  description?: string
  /** Route path used for the canonical and og:url tags. */
  path?: string
  noIndex?: boolean
}

const DEFAULT_TITLE = `${profile.name} | ${profile.headline}`
const DEFAULT_DESCRIPTION = `Portfolio of ${profile.name}, a ${profile.degree} student in ${profile.location} building websites with HTML, CSS, JavaScript and ReactJS. ${profile.availability}.`

function upsertMeta(attr: 'name' | 'property', key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/** Keeps document title and social/SEO meta tags in sync with the current route. */
export function Seo({ title, description = DEFAULT_DESCRIPTION, path = '/', noIndex = false }: SeoProps) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${profile.name}` : DEFAULT_TITLE
    const url = `${SITE_URL}${path}`

    document.title = fullTitle
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow')
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', `${SITE_URL}/og-image.png`)
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertCanonical(url)
  }, [title, description, path, noIndex])

  return null
}
