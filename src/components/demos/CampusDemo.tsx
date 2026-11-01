import { CalendarDays, Megaphone, Search } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { cn } from '@/lib/cn'
import { DemoFrame } from './DemoFrame'

type Category = 'Academic' | 'Events' | 'Clubs'
interface Post {
  id: number
  category: Category
  title: string
  body: string
  event?: { date: string; going: number }
}

const CATEGORIES: Category[] = ['Academic', 'Events', 'Clubs']

const seed = (): Post[] => [
  { id: 1, category: 'Academic', title: 'Mid-semester exam schedule released', body: 'Timetables are available with your department coordinators. Check your hall ticket details.' },
  { id: 2, category: 'Events', title: 'Tech fest registrations open', body: 'Hackathon, quiz and project expo. Team up with friends and register this week.', event: { date: '14 Nov', going: 42 } },
  { id: 3, category: 'Clubs', title: 'Coding club weekly meetup', body: 'Bring a laptop. This week: building a small React app together.', event: { date: '8 Nov', going: 17 } },
  { id: 4, category: 'Academic', title: 'Library timings extended', body: 'The library stays open until 9 PM during the exam period.' },
]

export function CampusDemo() {
  const [posts, setPosts] = useState<Post[]>(seed)
  const [category, setCategory] = useState<Category | 'All'>('All')
  const [query, setQuery] = useState('')
  const [going, setGoing] = useState<Set<number>>(new Set())
  const [title, setTitle] = useState('')
  const [cat, setCat] = useState<Category>('Events')
  const [error, setError] = useState('')

  const shown = posts.filter(
    (p) => (category === 'All' || p.category === category) && `${p.title} ${p.body}`.toLowerCase().includes(query.trim().toLowerCase()),
  )

  const toggleRsvp = (id: number) =>
    setGoing((s) => {
      const next = new Set(s)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const publish = (e: FormEvent) => {
    e.preventDefault()
    if (title.trim().length < 4) return setError('Give the announcement a title (at least 4 characters).')
    setPosts((ps) => [{ id: Date.now(), category: cat, title: title.trim(), body: 'Posted just now from the demo.' }, ...ps])
    setTitle('')
    setError('')
  }

  const reset = () => {
    setPosts(seed())
    setCategory('All')
    setQuery('')
    setGoing(new Set())
    setTitle('')
    setError('')
  }

  return (
    <DemoFrame
      title="CampusConnect feed"
      note="Interactive demo with sample data. Posts and RSVPs live only in this page and reset when you reload."
      onReset={reset}
    >
      <div className="flex flex-wrap items-center gap-3">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {(['All', ...CATEGORIES] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-sm transition-colors',
                category === c ? 'border-transparent bg-brand-blue text-onbrand' : 'border-white/10 text-slate-300 hover:border-brand-blue/40',
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="relative ml-auto block w-full sm:w-64">
          <span className="sr-only">Search announcements</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="w-full rounded-full border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-white placeholder:text-slate-400 focus:border-brand-blue focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <ul className="space-y-3" aria-live="polite">
          {shown.map((post) => {
            const rsvp = going.has(post.id)
            return (
              <li key={post.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className="chip">{post.category}</span>
                  {post.event && (
                    <span className="inline-flex items-center gap-1.5 text-slate-300">
                      <CalendarDays className="h-4 w-4 text-brand-cyan" aria-hidden="true" /> {post.event.date}
                    </span>
                  )}
                </div>
                <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>
                <p className="mt-1 text-slate-400">{post.body}</p>
                {post.event && (
                  <button
                    type="button"
                    aria-pressed={rsvp}
                    onClick={() => toggleRsvp(post.id)}
                    className={cn(
                      'mt-3 rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors',
                      rsvp ? 'border-transparent bg-emerald-600 text-white' : 'border-brand-blue/40 text-brand-blue hover:bg-brand-blue/10',
                    )}
                  >
                    {rsvp ? 'You’re going' : 'RSVP'} · {post.event.going + (rsvp ? 1 : 0)} going
                  </button>
                )}
              </li>
            )
          })}
          {shown.length === 0 && <li className="text-slate-400">No announcements match.</li>}
        </ul>

        <form onSubmit={publish} noValidate className="h-fit rounded-xl border border-white/10 p-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <Megaphone className="h-5 w-5 text-brand-cyan" aria-hidden="true" /> Post an announcement
          </h3>
          <label htmlFor="campus-title" className="mt-3 block text-sm font-medium text-slate-200">
            Title
          </label>
          <input
            id="campus-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'campus-error' : undefined}
            className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-brand-blue focus:outline-none"
          />
          <label htmlFor="campus-cat" className="mt-3 block text-sm font-medium text-slate-200">
            Category
          </label>
          <select
            id="campus-cat"
            value={cat}
            onChange={(e) => setCat(e.target.value as Category)}
            className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-brand-blue focus:outline-none"
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <p id="campus-error" role="alert" className="mt-2 min-h-5 text-sm text-red-600 dark:text-red-300">
            {error}
          </p>
          <button type="submit" className="mt-1 w-full rounded-lg bg-brand-blue px-4 py-2 font-semibold text-onbrand">
            Publish
          </button>
        </form>
      </div>
    </DemoFrame>
  )
}
