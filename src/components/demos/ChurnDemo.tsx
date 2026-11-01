import { useState } from 'react'
import { cn } from '@/lib/cn'
import { DemoFrame } from './DemoFrame'

type Contract = 'Month-to-month' | 'One year' | 'Two year'
interface Inputs {
  tenure: number
  charges: number
  contract: Contract
  tickets: number
}
const DEFAULTS: Inputs = { tenure: 6, charges: 80, contract: 'Month-to-month', tickets: 3 }

/**
 * Transparent, rule-based score for illustration only. It is NOT the trained
 * model from the project: it just shows how inputs can change a risk estimate.
 */
function score({ tenure, charges, contract, tickets }: Inputs) {
  const factors: { label: string; points: number }[] = [
    { label: tenure < 12 ? 'Short tenure' : 'Long tenure', points: tenure < 12 ? 22 : tenure < 36 ? 6 : -10 },
    { label: charges > 90 ? 'High monthly charges' : 'Moderate monthly charges', points: charges > 90 ? 18 : charges > 60 ? 8 : 0 },
    { label: `${contract} contract`, points: contract === 'Month-to-month' ? 28 : contract === 'One year' ? 6 : -12 },
    { label: tickets >= 3 ? 'Many support tickets' : 'Few support tickets', points: tickets >= 3 ? 14 : tickets >= 1 ? 4 : 0 },
  ]
  const raw = 15 + factors.reduce((n, f) => n + f.points, 0)
  return { risk: Math.max(2, Math.min(97, raw)), factors }
}

export function ChurnDemo() {
  const [v, setV] = useState<Inputs>(DEFAULTS)
  const { risk, factors } = score(v)
  const level = risk >= 60 ? 'High' : risk >= 35 ? 'Medium' : 'Low'
  const tone = risk >= 60 ? 'bg-red-500' : risk >= 35 ? 'bg-amber-500' : 'bg-emerald-500'

  const slider = (id: keyof Inputs, label: string, min: number, max: number, unit: string) => (
    <div>
      <label htmlFor={`churn-${id}`} className="flex justify-between text-sm font-medium text-slate-200">
        <span>{label}</span>
        <span className="text-brand-cyan">
          {v[id]} {unit}
        </span>
      </label>
      <input
        id={`churn-${id}`}
        type="range"
        min={min}
        max={max}
        value={v[id] as number}
        onChange={(e) => setV({ ...v, [id]: Number(e.target.value) })}
        className="mt-2 w-full accent-brand-blue"
      />
    </div>
  )

  return (
    <DemoFrame
      title="Churn risk explorer"
      note="Interactive demo. Move the inputs to see a risk estimate. This uses simple illustrative rules, not the trained model from the project."
      onReset={() => setV(DEFAULTS)}
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          {slider('tenure', 'Customer tenure', 0, 72, 'months')}
          {slider('charges', 'Monthly charges', 20, 120, '₹ / unit')}
          {slider('tickets', 'Support tickets (last 3 months)', 0, 8, 'tickets')}
          <div>
            <label htmlFor="churn-contract" className="text-sm font-medium text-slate-200">
              Contract
            </label>
            <select
              id="churn-contract"
              value={v.contract}
              onChange={(e) => setV({ ...v, contract: e.target.value as Contract })}
              className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-brand-blue focus:outline-none"
            >
              {(['Month-to-month', 'One year', 'Two year'] as Contract[]).map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div aria-live="polite" className="rounded-xl border border-white/10 p-5">
          <p className="text-sm text-slate-400">Estimated churn risk</p>
          <p className="text-5xl font-bold text-gradient">{risk}%</p>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10" role="presentation">
            <div className={cn('h-full rounded-full transition-all duration-500', tone)} style={{ width: `${risk}%` }} />
          </div>
          <p className="mt-2 font-semibold text-white">{level} risk</p>

          <h3 className="mt-5 text-sm font-semibold uppercase tracking-wide text-slate-400">What moved the score</h3>
          <ul className="mt-2 space-y-1.5">
            {factors.map((f) => (
              <li key={f.label} className="flex justify-between gap-3 text-slate-300">
                <span>{f.label}</span>
                <span className={f.points > 0 ? 'text-red-600 dark:text-red-300' : 'text-emerald-700 dark:text-emerald-300'}>
                  {f.points > 0 ? '+' : ''}
                  {f.points}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DemoFrame>
  )
}
