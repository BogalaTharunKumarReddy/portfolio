import { motion, useReducedMotion } from 'framer-motion'
import { Fragment } from 'react'
import { cn } from '@/lib/cn'

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span'

interface TextRevealProps {
  text: string
  as?: Tag
  id?: string
  className?: string
  /** Space-separated words that get the accent gradient. */
  highlight?: string
  /** Seconds before the first word starts. */
  delay?: number
  /** Animate immediately on mount instead of when scrolled into view (hero). */
  immediate?: boolean
}

const wordVariants = {
  hidden: { y: '110%' },
  visible: { y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
}

/**
 * Word-by-word masked text reveal. Screen readers get the sentence once from a
 * visually hidden copy; the animated word fragments are aria-hidden. (aria-label
 * is not permitted on a plain <span>, so the hidden copy works for every tag.)
 */
export function TextReveal({
  text,
  as = 'h2',
  id,
  className,
  highlight,
  delay = 0,
  immediate = false,
}: TextRevealProps) {
  const reduceMotion = useReducedMotion()
  const words = text.split(' ')
  const highlighted = new Set((highlight ?? '').split(' ').filter(Boolean))

  if (reduceMotion) {
    const Static = as
    return (
      <Static id={id} className={className}>
        {words.map((word, i) => (
          <Fragment key={i}>
            <span className={cn(highlighted.has(word) && 'text-gradient')}>{word}</span>
            {i < words.length - 1 && ' '}
          </Fragment>
        ))}
      </Static>
    )
  }

  const MotionTag = motion[as] as typeof motion.h2
  const trigger = immediate
    ? { animate: 'visible' }
    : { whileInView: 'visible', viewport: { once: true, margin: '-80px' } }

  return (
    <MotionTag
      id={id}
      className={className}
      initial="hidden"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
      {...trigger}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span
            aria-hidden="true"
            className="inline-block overflow-hidden pb-[0.14em] align-bottom -mb-[0.14em]"
          >
            <motion.span
              className={cn('inline-block', highlighted.has(word) && 'text-gradient')}
              variants={wordVariants}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </MotionTag>
  )
}
