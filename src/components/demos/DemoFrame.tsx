import { RotateCcw } from 'lucide-react'
import type { ReactNode } from 'react'
import { GlassCard } from '@/components/ui/GlassCard'

interface DemoFrameProps {
  title: string
  note: string
  onReset: () => void
  children: ReactNode
}

/** Shared chrome for the in-browser project demos: browser-like bar, "sample data" notice, reset. */
export function DemoFrame({ title, note, onReset, children }: DemoFrameProps) {
  return (
    <GlassCard spotlight={false} className="overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-amber-400/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          </span>
          <p className="font-semibold text-white">{title}</p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-sm text-slate-300 transition-colors hover:border-brand-blue/40 hover:text-brand-blue"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Reset
        </button>
      </div>
      <p className="border-b border-white/10 bg-brand-blue/[0.05] px-4 py-2 text-sm text-slate-300">{note}</p>
      <div className="p-4 sm:p-6">{children}</div>
    </GlassCard>
  )
}
