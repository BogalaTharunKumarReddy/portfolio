import type { Accent } from '@/types'

/** Gradient classes for each project accent colour. */
export const accentGradient: Record<Accent, string> = {
  blue: 'from-brand-blue/30 to-brand-sky/5',
  cyan: 'from-brand-cyan/30 to-brand-blue/5',
  teal: 'from-brand-teal/30 to-brand-cyan/5',
}
