import { MapPin } from 'lucide-react'
import { profile } from '@/data/profile'
import { useImageAvailable } from '@/hooks/useImageAvailable'
import { cn } from '@/lib/cn'

/** Small circular avatar. Renders nothing until a real photo exists (no empty placeholder in the hero). */
export function ProfileAvatar({ className }: { className?: string }) {
  const available = useImageAvailable(profile.photoAvatar)
  if (!available) return null

  return (
    <span
      className={cn(
        'inline-block rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan p-[2px] shadow-glow-sm',
        className,
      )}
    >
      <img
        src={profile.photoAvatar}
        alt={`Portrait of ${profile.name}`}
        width={48}
        height={48}
        decoding="async"
        className="h-12 w-12 rounded-full border-2 border-ink object-cover object-top"
      />
    </span>
  )
}

/**
 * Circular portrait for the About section: gradient ring, glow and a name tag.
 * Shows a monogram until the photo file exists, so the layout never breaks.
 */
export function ProfilePortrait({ className }: { className?: string }) {
  const available = useImageAvailable(profile.photo)

  return (
    <figure className={cn('relative mx-auto w-full max-w-xs sm:max-w-sm', className)}>
      <div aria-hidden="true" className="absolute -inset-4 rounded-full bg-gradient-to-br from-brand-blue/30 to-brand-cyan/20 blur-2xl" />

      <div className="relative rounded-full bg-gradient-to-br from-brand-blue via-brand-cyan to-brand-teal p-[3px] shadow-glow">
        <div className="relative aspect-square overflow-hidden rounded-full bg-navy-900">
          {available ? (
            <img
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              width={800}
              height={800}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          ) : (
            <div aria-hidden="true" className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_30%_20%,theme(colors.navy.600),theme(colors.navy.900)_70%)]">
              <div className="bg-grid absolute inset-0 opacity-60" />
              <span className="text-gradient relative font-display text-7xl font-bold tracking-tight sm:text-8xl">
                {profile.initials}
              </span>
            </div>
          )}
        </div>
      </div>

      <figcaption className="glass-strong relative z-10 mx-auto -mt-5 w-fit max-w-full rounded-2xl px-5 py-3 text-center">
        <p className="font-display text-base font-semibold text-white">{profile.name}</p>
        <p className="mt-0.5 flex items-center justify-center gap-1.5 text-xs text-slate-300">
          <MapPin className="h-3.5 w-3.5 text-brand-cyan" aria-hidden="true" />
          {profile.location}
        </p>
      </figcaption>
    </figure>
  )
}
