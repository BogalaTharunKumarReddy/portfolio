import { AlertCircle, CheckCircle2, Copy, Mail, MapPin, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { Magnetic } from '@/components/ui/Magnetic'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { profile } from '@/data/profile'
import { getSection } from '@/data/sections'
import { cn } from '@/lib/cn'

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT?.trim()

interface Values {
  name: string
  email: string
  message: string
}
type Errors = Partial<Record<keyof Values, string>>
type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(v: Values): Errors {
  const errors: Errors = {}
  if (v.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!EMAIL_RE.test(v.email.trim())) errors.email = 'Please enter a valid email address.'
  if (v.message.trim().length < 10) errors.message = 'Please write at least 10 characters.'
  return errors
}

const fieldClass =
  'mt-2 w-full rounded-xl border bg-white/5 px-4 py-3 text-white placeholder:text-slate-400 transition-colors focus:border-brand-cyan/60 focus:bg-white/10 focus:outline-none'

export function Contact() {
  const section = getSection('contact')
  const [values, setValues] = useState<Values>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [copied, setCopied] = useState(false)

  const github = profile.socials.find((s) => s.id === 'github')
  const linkedin = profile.socials.find((s) => s.id === 'linkedin')

  const set = (key: keyof Values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    // Honeypot: real users never see or fill this field.
    if ((form.elements.namedItem('company') as HTMLInputElement | null)?.value) return

    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      // Move focus to the first invalid field so keyboard and screen-reader users land on it.
      const first = (Object.keys(found) as (keyof Values)[])[0]!
      const field = form.elements.namedItem(first)
      if (field instanceof HTMLElement) field.focus()
      return
    }

    if (!ENDPOINT) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${values.name.trim()}`)
      const body = encodeURIComponent(`${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      setStatus('mailto')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: values.name.trim(), email: values.email.trim(), message: values.message.trim() }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      setValues({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked: the visible mailto link still works */
    }
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

      <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <GlassCard className="h-full space-y-6 p-6 sm:p-8">
            <div>
              <h3 className="text-lg font-semibold">Get in touch</h3>
              <p className="mt-2 text-sm text-slate-400">
                I’m looking for fresher Frontend roles and internships. I usually reply within a couple of days.
              </p>
            </div>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-brand-cyan" aria-hidden="true" />
                <a href={`mailto:${profile.email}`} className="break-all text-slate-200 hover:text-brand-cyan">
                  {profile.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="ml-auto grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-slate-300 hover:border-brand-cyan/40 hover:text-white"
                >
                  {copied ? <CheckCircle2 className="h-4 w-4 text-brand-teal" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                </button>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <MapPin className="h-5 w-5 shrink-0 text-brand-cyan" aria-hidden="true" />
                {profile.location}
              </li>
              {github && (
                <li>
                  <a href={github.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-200 hover:text-brand-cyan">
                    <GithubIcon className="h-5 w-5 shrink-0 text-brand-cyan" /> {github.handle}
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              )}
              {linkedin && (
                <li>
                  <a href={linkedin.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-200 hover:text-brand-cyan">
                    <LinkedinIcon className="h-5 w-5 shrink-0 text-brand-cyan" /> LinkedIn
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              )}
            </ul>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.1}>
          <GlassCard spotlight={false} className="p-6 sm:p-8">
            <form onSubmit={onSubmit} noValidate aria-label="Contact form" className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-slate-200">Name</label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={values.name}
                    onChange={set('name')}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    placeholder="Your name"
                    className={cn(fieldClass, errors.name ? 'border-red-400/60' : 'border-white/10')}
                  />
                  {errors.name && <p id="name-error" className="mt-1.5 text-sm text-red-300">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-slate-200">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={set('email')}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    placeholder="you@company.com"
                    className={cn(fieldClass, errors.email ? 'border-red-400/60' : 'border-white/10')}
                  />
                  {errors.email && <p id="email-error" className="mt-1.5 text-sm text-red-300">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="text-sm font-medium text-slate-200">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={values.message}
                  onChange={set('message')}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  placeholder="Tell me about the role or project…"
                  className={cn(fieldClass, 'resize-y', errors.message ? 'border-red-400/60' : 'border-white/10')}
                />
                {errors.message && <p id="message-error" className="mt-1.5 text-sm text-red-300">{errors.message}</p>}
              </div>

              {/* Honeypot field for bots: hidden from people and assistive tech. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>
                  Company
                  <input name="company" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Button type="submit" size="lg" disabled={status === 'sending'} trailingIcon={<Send className="h-4 w-4" aria-hidden="true" />}>
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                  </Button>
                </Magnetic>
                <div role="status" aria-live="polite" className="text-sm">
                  {status === 'sent' && (
                    <p className="flex items-center gap-2 text-brand-teal">
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Thanks! Your message was sent.
                    </p>
                  )}
                  {status === 'mailto' && (
                    <p className="text-slate-300">Opening your email app with the message ready to send.</p>
                  )}
                  {status === 'error' && (
                    <p className="flex items-center gap-2 text-red-300">
                      <AlertCircle className="h-4 w-4" aria-hidden="true" /> Couldn’t send. Please email me directly.
                    </p>
                  )}
                </div>
              </div>
            </form>
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  )
}
