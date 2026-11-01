import { useState } from 'react'
import samples from '@/data/analysisSamples.json'
import { cn } from '@/lib/cn'
import { DemoFrame } from './DemoFrame'

type Sample = (typeof samples)[keyof typeof samples]

/** Interactive chart over a small illustrative dataset: pick a series, hover or tab to a bar for its value. */
export function DataExplorerDemo({ slug }: { slug: keyof typeof samples }) {
  const data: Sample = samples[slug]
  const [index, setIndex] = useState(0)
  const [active, setActive] = useState<number | null>(null)
  const series = data.series[index]
  const max = Math.max(...series.values)
  const min = Math.min(...series.values)
  const avg = series.values.reduce((a, b) => a + b, 0) / series.values.length
  const peak = data.x[series.values.indexOf(max)]
  const low = data.x[series.values.indexOf(min)]

  const W = 640
  const H = 260
  const pad = { l: 8, r: 8, t: 14, b: 30 }
  const slot = (W - pad.l - pad.r) / series.values.length

  return (
    <DemoFrame
      title="Data explorer"
      note="Interactive demo with small illustrative sample data, not the real dataset. Choose a series to compare patterns."
      onReset={() => {
        setIndex(0)
        setActive(null)
      }}
    >
      <div role="group" aria-label="Choose a series" className="flex flex-wrap gap-2">
        {data.series.map((s, i) => (
          <button
            key={s.name}
            type="button"
            aria-pressed={i === index}
            onClick={() => setIndex(i)}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
              i === index
                ? 'border-brand-cyan/50 bg-brand-cyan/15 text-white'
                : 'border-white/10 text-slate-400 hover:border-white/25 hover:text-white',
            )}
          >
            {s.name}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm font-medium text-slate-200">
        {data.title} <span className="text-slate-400">· {data.metric}</span>
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`${data.title}, ${series.name}. Peak ${max} in ${peak}, lowest ${min} in ${low}.`}
        className="mt-3 w-full"
      >
        <line x1={pad.l} x2={W - pad.r} y1={H - pad.b} y2={H - pad.b} stroke="currentColor" className="text-slate-400/40" />
        {series.values.map((v, i) => {
          const h = ((H - pad.t - pad.b) * v) / max
          const x = pad.l + i * slot + slot * 0.15
          const y = H - pad.b - h
          return (
            <g key={data.x[i]} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}>
              <rect x={x} y={y} width={slot * 0.7} height={h} rx={4} className={active === i ? 'fill-brand-cyan' : 'fill-brand-blue'} />
              <text x={x + slot * 0.35} y={H - 10} textAnchor="middle" className="fill-slate-400 text-[11px]">
                {data.x[i]}
              </text>
              {active === i && (
                <text x={x + slot * 0.35} y={y - 5} textAnchor="middle" className="fill-slate-200 text-[12px] font-semibold">
                  {v}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      <dl className="mt-4 grid grid-cols-3 gap-3 text-center">
        {[
          ['Average', avg.toFixed(1)],
          ['Highest', `${max} · ${peak}`],
          ['Lowest', `${min} · ${low}`],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-3">
            <dt className="text-xs text-slate-400">{label}</dt>
            <dd className="mt-1 font-semibold text-white">{value}</dd>
          </div>
        ))}
      </dl>
    </DemoFrame>
  )
}
