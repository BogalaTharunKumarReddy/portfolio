import {
  BarChart3,
  BookOpen,
  BrainCircuit,
  Briefcase,
  Building2,
  Code,
  Database,
  GraduationCap,
  LayoutTemplate,
  Server,
  Sparkles,
  Users,
  Wrench,
  type LucideProps,
} from 'lucide-react'
import type { ComponentType } from 'react'
import type { IconName } from '@/types'

const icons: Record<IconName, ComponentType<LucideProps>> = {
  layout: LayoutTemplate,
  server: Server,
  database: Database,
  brain: BrainCircuit,
  wrench: Wrench,
  book: BookOpen,
  sparkles: Sparkles,
  code: Code,
  graduation: GraduationCap,
  briefcase: Briefcase,
  users: Users,
  building: Building2,
  chart: BarChart3,
}

/** Decorative icon looked up by name from the data files. */
export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Component = icons[name]
  return <Component aria-hidden="true" {...props} />
}
