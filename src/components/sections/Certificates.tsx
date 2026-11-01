import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Award, ExternalLink, X, ZoomIn } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { GlassCard } from '@/components/ui/GlassCard'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { certificates } from '@/data/certificates'
import { getSection } from '@/data/sections'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { cn } from '@/lib/cn'
import type { Certificate } from '@/types'

function CertificateArt({ cert, large = false }: { cert: Certificate; large?: boolean }) {
  if (cert.image) {
    return (
      <img
        src={cert.image}
        alt={`${cert.title} certificate`}
        loading={large ? 'eager' : 'lazy'}
        decoding="async"
        className={cn('w-full object-contain', large ? 'max-h-[62vh]' : 'h-full')}
      />
    )
  }
  return (
    <div className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_30%_20%,theme(colors.navy.600),theme(colors.navy.900))]">
      <Award className={cn('text-brand-cyan/70', large ? 'h-24 w-24' : 'h-14 w-14')} aria-hidden="true" />
    </div>
  )
}

function Lightbox({ cert, onClose }: { cert: Certificate; onClose: () => void }) {
  const reduceMotion = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)
  useLockBodyScroll(true)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        e.preventDefault()
        closeRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${cert.title} certificate`}
      className="fixed inset-0 z-[90] grid place-items-center bg-ink/90 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="glass-strong w-full max-w-3xl overflow-hidden rounded-2xl"
        initial={reduceMotion ? false : { scale: 0.94, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={reduceMotion ? undefined : { scale: 0.96 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cn('grid w-full place-items-center bg-navy-900', !cert.image && 'aspect-[16/10]')}>
          <CertificateArt cert={cert} large />
        </div>
        <div className="flex items-start justify-between gap-4 p-6">
          <div>
            <h3 className="text-xl font-semibold">{cert.title}</h3>
            <p className="mt-1 text-sm text-slate-400">
              {cert.issuer} · {cert.date}
            </p>
            {cert.detail && <p className="mt-1 text-sm text-slate-300">{cert.detail}</p>}
            {cert.credentialId && (
              <p className="mt-1 break-all font-mono text-xs text-slate-400">Credential ID: {cert.credentialId}</p>
            )}
            {cert.url && (
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm text-brand-cyan hover:underline"
              >
                Verify credential <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close certificate"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-white hover:border-brand-cyan/40"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Certificates() {
  const section = getSection('certificates')
  const [openId, setOpenId] = useState<string | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const open = certificates.find((c) => c.id === openId)
  const hasPlaceholders = certificates.some((c) => c.placeholder)

  const close = () => {
    setOpenId(null)
    triggerRef.current?.focus()
  }

  return (
    <Section id={section.id}>
      <SectionHeading
        sectionId={section.id}
        eyebrow={section.eyebrow}
        title={section.title}
        highlight={section.highlight}
        description={section.description}
      />

      {hasPlaceholders && (
        <p className="mb-8 rounded-xl border border-dashed border-amber-400/30 bg-amber-400/5 p-4 text-sm text-amber-200">
          These cards are placeholders. Add your real certificates in <code className="font-mono">src/data/certificates.ts</code>{' '}
          (image, title, issuer, date) and they will replace these automatically.
        </p>
      )}

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert, i) => (
          <li key={cert.id}>
            <Reveal delay={(i % 3) * 0.08} className="h-full">
              <GlassCard className={cn('group h-full overflow-hidden', cert.placeholder && 'border-dashed')}>
                <button
                  type="button"
                  onClick={(e) => {
                    triggerRef.current = e.currentTarget
                    setOpenId(cert.id)
                  }}
                  className="block w-full text-left"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-navy-900">
                    <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
                      <CertificateArt cert={cert} />
                    </div>
                    <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-ink/70 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      <ZoomIn className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-mono text-xs text-brand-cyan">{cert.date}</p>
                      {cert.placeholder && <Badge className="border-amber-400/30 bg-amber-400/10 text-amber-300">Placeholder</Badge>}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold">{cert.title}</h3>
                    <p className="text-sm text-slate-400">{cert.issuer}</p>
                    {cert.detail && <p className="mt-2 text-xs text-slate-300">{cert.detail}</p>}
                    <span className="sr-only">Open certificate image</span>
                  </div>
                </button>
              </GlassCard>
            </Reveal>
          </li>
        ))}
      </ul>

      <AnimatePresence>{open && <Lightbox cert={open} onClose={close} />}</AnimatePresence>
    </Section>
  )
}
