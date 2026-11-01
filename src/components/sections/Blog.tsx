import { ArrowUpRight, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GlassCard } from '@/components/ui/GlassCard'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { blogPosts, formatDate, readingTime } from '@/data/blog'
import { getSection } from '@/data/sections'

export function Blog() {
  const section = getSection('blog')

  return (
    <Section id={section.id}>
      <SectionHeading
        sectionId={section.id}
        eyebrow={section.eyebrow}
        title={section.title}
        highlight={section.highlight}
        description={section.description}
      />

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, i) => (
          <li key={post.slug}>
            <Reveal delay={(i % 3) * 0.08} className="h-full">
              <GlassCard className="flex h-full flex-col p-6">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {readingTime(post)} min read
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold leading-snug">
                  <Link to={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:content-[''] hover:text-brand-cyan">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{post.excerpt}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tags">
                  {post.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-slate-300">
                      {tag}
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-cyan">
                  Read article <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </GlassCard>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
