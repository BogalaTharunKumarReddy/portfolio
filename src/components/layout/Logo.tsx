import { profile } from '@/data/profile'
import { SectionLink } from '@/components/ui/SectionLink'

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <SectionLink
      sectionId="home"
      onClick={onClick}
      className="group flex items-center gap-3 rounded-xl"
    >
      <span
        aria-hidden="true"
        className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-cyan font-display text-sm font-bold tracking-tight text-onbrand shadow-glow-sm transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105"
      >
        {profile.initials}
      </span>
      <span className="sr-only">{profile.name}, back to top</span>
      <span aria-hidden="true" className="hidden flex-col leading-tight sm:flex">
        <span className="font-display text-sm font-semibold text-white">{profile.name}</span>
        <span className="font-mono text-[11px] text-slate-400">{profile.headline}</span>
      </span>
    </SectionLink>
  )
}
