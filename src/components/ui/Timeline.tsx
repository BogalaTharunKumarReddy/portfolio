import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { Badge } from '@/components/ui/Badge'
import { GlassCard } from '@/components/ui/GlassCard'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'
import type { TimelineItem } from '@/types'

/** Vertical timeline whose gradient spine draws itself as you scroll. */
export function Timeline({ items, label }: { items: TimelineItem[]; label: string }) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 26 })

  return (
    <ol ref={ref} aria-label={label} className="relative space-y-8 pl-12 sm:pl-16">
      <span aria-hidden="true" className="absolute bottom-2 left-[19px] top-2 w-px bg-white/10 sm:left-[27px]" />
      <motion.span
        aria-hidden="true"
        className="absolute bottom-2 left-[19px] top-2 w-px origin-top bg-gradient-to-b from-brand-blue to-brand-cyan sm:left-[27px]"
        style={{ scaleY: reduceMotion ? 1 : draw }}
      />

      {items.map((item, index) => (
        <li key={item.id} className="relative">
          <span
            aria-hidden="true"
            className={cn(
              'absolute -left-12 top-1 grid h-10 w-10 place-items-center rounded-full border bg-navy-900 sm:-left-16 sm:h-14 sm:w-14',
              item.placeholder ? 'border-dashed border-white/20 text-slate-400' : 'border-brand-cyan/40 text-brand-cyan shadow-glow-sm',
            )}
          >
            <Icon name={item.icon} className="h-4 w-4 sm:h-5 sm:w-5" />
          </span>

          <Reveal delay={index * 0.05}>
            <GlassCard className={cn('p-6', item.placeholder && 'border-dashed')}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-xs uppercase tracking-wider text-brand-cyan">{item.period}</p>
                {item.placeholder && (
                  <Badge className="border-amber-400/30 bg-amber-400/10 text-amber-300">Placeholder · edit me</Badge>
                )}
              </div>
              <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-400">{item.subtitle}</p>
              <p className="mt-4 text-slate-300">{item.description}</p>
              {item.tags && (
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Topics">
                  {item.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </GlassCard>
          </Reveal>
        </li>
      ))}
    </ol>
  )
}
