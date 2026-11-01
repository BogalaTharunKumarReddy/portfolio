import { BedDouble, UserMinus, UserPlus } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { cn } from '@/lib/cn'
import { DemoFrame } from './DemoFrame'

interface Resident {
  name: string
  feePaid: boolean
}
interface Room {
  id: string
  floor: number
  capacity: number
  residents: Resident[]
}
type Filter = 'all' | 'vacant' | 'full'

const seed = (): Room[] => {
  const names: Record<string, Resident[]> = {
    '101': [{ name: 'Ravi', feePaid: true }, { name: 'Kiran', feePaid: false }],
    '102': [{ name: 'Arjun', feePaid: true }],
    '103': [],
    '104': [{ name: 'Suresh', feePaid: false }, { name: 'Manoj', feePaid: true }],
    '201': [{ name: 'Vikram', feePaid: true }],
    '202': [],
    '203': [{ name: 'Anil', feePaid: true }, { name: 'Praveen', feePaid: true }],
    '204': [],
  }
  return Object.entries(names).map(([id, residents]) => ({ id, floor: Number(id[0]), capacity: 2, residents }))
}

export function HostelDemo() {
  const [rooms, setRooms] = useState<Room[]>(seed)
  const [selectedId, setSelectedId] = useState('103')
  const [filter, setFilter] = useState<Filter>('all')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const selected = rooms.find((r) => r.id === selectedId)!
  const beds = rooms.reduce((n, r) => n + r.capacity, 0)
  const occupied = rooms.reduce((n, r) => n + r.residents.length, 0)
  const pending = rooms.reduce((n, r) => n + r.residents.filter((x) => !x.feePaid).length, 0)

  const visible = rooms.filter((r) =>
    filter === 'all' ? true : filter === 'vacant' ? r.residents.length < r.capacity : r.residents.length === r.capacity,
  )

  const update = (fn: (r: Room) => Room) => setRooms((rs) => rs.map((r) => (r.id === selectedId ? fn(r) : r)))

  const allocate = (e: FormEvent) => {
    e.preventDefault()
    const clean = name.trim()
    if (!clean) return setError('Enter the student’s name.')
    if (selected.residents.length >= selected.capacity) return setError(`Room ${selected.id} is full.`)
    if (rooms.some((r) => r.residents.some((x) => x.name.toLowerCase() === clean.toLowerCase())))
      return setError(`${clean} already has a room.`)
    update((r) => ({ ...r, residents: [...r.residents, { name: clean, feePaid: false }] }))
    setName('')
    setError('')
  }

  const reset = () => {
    setRooms(seed())
    setSelectedId('103')
    setFilter('all')
    setName('')
    setError('')
  }

  return (
    <DemoFrame
      title="Hostel dashboard"
      note="Interactive demo with sample data. It runs in your browser and is not connected to a real database."
      onReset={reset}
    >
      <dl className="grid grid-cols-3 gap-3 text-center">
        {[
          ['Beds occupied', `${occupied}/${beds}`],
          ['Beds vacant', String(beds - occupied)],
          ['Fees pending', String(pending)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-3">
            <dt className="order-2 text-sm text-slate-400">{label}</dt>
            <dd className="text-2xl font-bold text-gradient">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <div role="group" aria-label="Filter rooms" className="flex flex-wrap gap-2">
            {(['all', 'vacant', 'full'] as Filter[]).map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 text-sm capitalize transition-colors',
                  filter === f ? 'border-transparent bg-brand-blue text-onbrand' : 'border-white/10 text-slate-300 hover:border-brand-blue/40',
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {visible.map((room) => {
              const used = room.residents.length
              const full = used === room.capacity
              return (
                <li key={room.id}>
                  <button
                    type="button"
                    aria-pressed={selectedId === room.id}
                    onClick={() => {
                      setSelectedId(room.id)
                      setError('')
                    }}
                    className={cn(
                      'w-full rounded-xl border p-3 text-left transition-all',
                      selectedId === room.id ? 'border-brand-blue ring-2 ring-brand-blue/30' : 'border-white/10 hover:border-brand-blue/40',
                      full ? 'bg-brand-blue/10' : used ? 'bg-brand-cyan/[0.07]' : 'bg-white/5',
                    )}
                  >
                    <span className="flex items-center gap-1.5 font-semibold text-white">
                      <BedDouble className="h-4 w-4 text-brand-cyan" aria-hidden="true" /> {room.id}
                    </span>
                    <span className="mt-1 block text-sm text-slate-400">
                      {used}/{room.capacity} · {full ? 'Full' : used ? 'Partly filled' : 'Vacant'}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
          {visible.length === 0 && <p className="mt-4 text-slate-400">No rooms match this filter.</p>}
        </div>

        <div className="rounded-xl border border-white/10 p-4">
          <h3 className="text-lg font-semibold">Room {selected.id}</h3>
          <p className="text-sm text-slate-400">Floor {selected.floor} · {selected.capacity} beds</p>

          <ul className="mt-3 space-y-2">
            {selected.residents.length === 0 && <li className="text-slate-400">No residents yet.</li>}
            {selected.residents.map((res) => (
              <li key={res.name} className="flex items-center justify-between gap-2 rounded-lg bg-white/5 px-3 py-2">
                <span className="font-medium text-white">{res.name}</span>
                <span className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-pressed={res.feePaid}
                    onClick={() =>
                      update((r) => ({ ...r, residents: r.residents.map((x) => (x.name === res.name ? { ...x, feePaid: !x.feePaid } : x)) }))
                    }
                    className={cn(
                      'rounded-full px-2.5 py-0.5 text-xs font-semibold',
                      res.feePaid ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' : 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
                    )}
                  >
                    {res.feePaid ? 'Fee paid' : 'Fee pending'}
                  </button>
                  <button
                    type="button"
                    aria-label={`Check out ${res.name}`}
                    onClick={() => update((r) => ({ ...r, residents: r.residents.filter((x) => x.name !== res.name) }))}
                    className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-slate-300 hover:border-red-400/50 hover:text-red-500"
                  >
                    <UserMinus className="h-4 w-4" aria-hidden="true" />
                  </button>
                </span>
              </li>
            ))}
          </ul>

          <form onSubmit={allocate} className="mt-4" noValidate>
            <label htmlFor="hostel-name" className="text-sm font-medium text-slate-200">
              Allocate a student
            </label>
            <div className="mt-1.5 flex gap-2">
              <input
                id="hostel-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'hostel-error' : undefined}
                placeholder="Student name"
                className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-slate-400 focus:border-brand-blue focus:outline-none"
              />
              <button type="submit" className="inline-flex items-center gap-1.5 rounded-lg bg-brand-blue px-3.5 py-2 font-semibold text-onbrand">
                <UserPlus className="h-4 w-4" aria-hidden="true" /> Add
              </button>
            </div>
            <p id="hostel-error" role="alert" className="mt-1.5 min-h-5 text-sm text-red-600 dark:text-red-300">
              {error}
            </p>
          </form>
        </div>
      </div>
    </DemoFrame>
  )
}
