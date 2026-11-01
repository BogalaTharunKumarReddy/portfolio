import { ArrowLeft, ArrowRight, Check, Clock, Copy } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { blogPosts, formatDate, getPost, readingTime } from '@/data/blog'
import type { BlogBlock } from '@/types'
import NotFound from './NotFound'

function CodeBlock({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked */
    }
  }

  return (
    <figure className="glass-strong my-6 overflow-hidden rounded-xl">
      <figcaption className="flex items-center justify-between border-b border-white/10 px-4 py-2 font-code text-xs text-slate-400">
        {lang}
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 hover:bg-white/10 hover:text-white"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-brand-teal" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </figcaption>
      <pre tabIndex={0} className="overflow-x-auto p-4 font-code text-[13px] leading-relaxed text-slate-200">
        <code>{code}</code>
      </pre>
    </figure>
  )
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case 'h':
      return <h2 className="mb-3 mt-10 text-2xl font-semibold">{block.text}</h2>
    case 'p':
      return <p className="my-4 text-lg leading-relaxed text-slate-300">{block.text}</p>
    case 'ul':
      return (
        <ul className="my-4 list-disc space-y-2 pl-6 text-lg text-slate-300 marker:text-brand-cyan">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )
    case 'code':
      return <CodeBlock lang={block.lang} code={block.code} />
  }
}

export default function BlogPostPage() {
  const { slug = '' } = useParams()
  const post = getPost(slug)
  if (!post) return <NotFound />

  const index = blogPosts.findIndex((p) => p.slug === post.slug)
  const next = blogPosts[(index + 1) % blogPosts.length]!

  return (
    <article aria-labelledby="post-title" className="pb-24 pt-32">
      <Seo title={post.title} description={post.excerpt} path={`/blog/${post.slug}`} />
      <Container className="max-w-3xl">
        <Link
          to={{ pathname: '/', hash: '#blog' }}
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-brand-cyan"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All articles
        </Link>

        <header className="mt-8 border-b border-white/10 pb-8">
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" /> {readingTime(post)} min read
            </span>
          </div>
          <h1 id="post-title" className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            {post.title}
          </h1>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tags">
            {post.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-brand-cyan/25 bg-brand-cyan/10 px-3 py-1 font-mono text-xs text-brand-cyan">
                {tag}
              </li>
            ))}
          </ul>
        </header>

        <div className="mt-6">
          {post.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        <nav aria-label="Next article" className="mt-16 border-t border-white/10 pt-8">
          <Link to={`/blog/${next.slug}`} className="group inline-flex items-center gap-3 text-lg font-semibold hover:text-brand-cyan">
            <span>
              <span className="block font-mono text-xs font-normal uppercase tracking-widest text-slate-400">Next article</span>
              {next.title}
            </span>
            <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </nav>
      </Container>
    </article>
  )
}
