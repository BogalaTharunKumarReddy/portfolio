/**
 * Smoothly scroll to a section by id (or to the top for "home"), then move
 * keyboard focus to it so screen-reader and keyboard users land in the right place.
 * Returns false when the element is not in the DOM (yet).
 */
export function scrollToSection(id: string, reduceMotion = false): boolean {
  const behavior: ScrollBehavior = reduceMotion ? 'auto' : 'smooth'

  if (id === 'home') {
    window.scrollTo({ top: 0, behavior })
    return true
  }

  const el = document.getElementById(id)
  if (!el) return false

  el.scrollIntoView({ behavior, block: 'start' })
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
  return true
}
