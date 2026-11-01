import type { BlogPost } from '@/types'

/** Technical posts. Add a new object here and it appears on the home page and at /blog/<slug>. */
export const blogPosts: BlogPost[] = [
  {
    slug: 'respecting-reduced-motion-in-react',
    title: 'Respecting prefers-reduced-motion in React and Framer Motion',
    excerpt:
      'Animation delights many users and makes others ill. Here is how I detect the preference and scale motion back without losing meaning.',
    date: '2026-10-28',
    tags: ['React', 'Accessibility', 'Framer Motion'],
    blocks: [
      {
        type: 'p',
        text: 'Large parallax effects, springy transitions and auto-playing loops look impressive, but for people with vestibular disorders they can cause dizziness or nausea. Operating systems expose a setting for this, and the web gives us the prefers-reduced-motion media query to respect it.',
      },
      { type: 'h', text: 'Detect the preference' },
      {
        type: 'p',
        text: 'Framer Motion ships a hook that reads the media query and stays in sync if the user changes the setting while the page is open.',
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `import { motion, useReducedMotion } from 'framer-motion'

export function Reveal({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()

  if (reduce) return <div>{children}</div>

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}`,
      },
      { type: 'h', text: 'Remove decoration, keep meaning' },
      {
        type: 'p',
        text: 'Reduced motion does not mean no feedback. The goal is to remove movement that is purely decorative while keeping state changes clear.',
      },
      {
        type: 'ul',
        items: [
          'Replace sliding and scaling with simple fades or instant changes.',
          'Stop parallax, floating loops and auto-rotating 3D scenes.',
          'Keep focus rings, colour changes and other cues that explain what happened.',
        ],
      },
      { type: 'h', text: 'Cover plain CSS too' },
      {
        type: 'p',
        text: 'Not every animation goes through a library. A global rule in the stylesheet catches CSS keyframes and transitions in one place.',
      },
      {
        type: 'code',
        lang: 'css',
        code: `@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`,
      },
      {
        type: 'p',
        text: 'Test it by turning on “Reduce motion” in your operating system, or in browser DevTools under Rendering, and make sure every page still makes sense.',
      },
    ],
  },
  {
    slug: 'tailwind-design-tokens',
    title: 'Building a consistent Tailwind theme with design tokens',
    excerpt:
      'Instead of sprinkling hex codes through components, I define colours, fonts and shadows once and let Tailwind generate the utilities.',
    date: '2026-10-20',
    tags: ['Tailwind CSS', 'Design Systems', 'CSS'],
    blocks: [
      {
        type: 'p',
        text: 'A portfolio can easily end up with fifteen slightly different blues. Design tokens fix that: named values for colour, typography and effects that every component shares. Tailwind makes tokens first-class through its theme configuration.',
      },
      { type: 'h', text: 'Define tokens once' },
      {
        type: 'code',
        lang: 'js',
        code: `// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        ink: '#02040a',
        brand: { blue: '#3b82f6', cyan: '#22d3ee' },
      },
      boxShadow: {
        glow: '0 0 36px -8px rgba(59, 130, 246, 0.55)',
      },
    },
  },
}`,
      },
      {
        type: 'p',
        text: 'Now bg-ink, text-brand-cyan and shadow-glow are available everywhere. Changing the brand colour later means editing a single line.',
      },
      { type: 'h', text: 'Compose reusable patterns' },
      {
        type: 'p',
        text: 'For effects that need several properties, such as glassmorphism, I use a small component class and pull values from the theme so it stays in sync.',
      },
      {
        type: 'code',
        lang: 'css',
        code: `@layer components {
  .glass {
    background: linear-gradient(145deg, rgb(255 255 255 / 0.07), rgb(255 255 255 / 0.02));
    backdrop-filter: blur(16px) saturate(140%);
    border: 1px solid rgb(255 255 255 / 0.08);
    box-shadow: theme('boxShadow.glass');
  }
}`,
      },
      { type: 'h', text: 'Habits that keep it tidy' },
      {
        type: 'ul',
        items: [
          'Name tokens by role (brand, ink), not by appearance (light-blue).',
          'Check text contrast on every background you use, not just the main one.',
          'Merge class lists with tailwind-merge so later classes reliably win.',
        ],
      },
    ],
  },
  {
    slug: 'react-three-fiber-performance-checklist',
    title: 'Keeping React Three Fiber fast: a practical checklist',
    excerpt:
      '3D on the web is fun until it drains a phone battery. These are the habits I follow so a scene stays smooth and polite.',
    date: '2026-10-12',
    tags: ['Three.js', 'React Three Fiber', 'Performance'],
    blocks: [
      {
        type: 'p',
        text: 'A WebGL canvas competes with everything else on the page for the GPU. A few simple rules keep a decorative scene from hurting the rest of the experience.',
      },
      { type: 'h', text: '1. Load 3D lazily' },
      {
        type: 'p',
        text: 'Three.js is large. Load the scene with React.lazy and only mount it when its container scrolls near the viewport, so people who never reach it never download it.',
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `const HeroScene = lazy(() => import('./HeroScene'))

<Suspense fallback={<StaticPoster />}>
  {inView && <HeroScene />}
</Suspense>`,
      },
      { type: 'h', text: '2. Cap the pixel ratio and pause offscreen' },
      {
        type: 'p',
        text: 'High-density phones can render four times the pixels you need. Clamp the device pixel ratio, and switch the render loop to demand mode when the canvas is not visible.',
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `<Canvas
  dpr={[1, 1.5]}
  frameloop={visible ? 'always' : 'demand'}
  gl={{ powerPreference: 'high-performance' }}
>
  {/* scene */}
</Canvas>`,
      },
      { type: 'h', text: '3. Prefer cheap geometry and lighting' },
      {
        type: 'ul',
        items: [
          'Reuse geometries and materials instead of creating new ones every render.',
          'Use a few lights and baked or fake shadows rather than many real-time ones.',
          'Dispose of textures you create by hand when the component unmounts.',
        ],
      },
      { type: 'h', text: '4. Always have a fallback' },
      {
        type: 'p',
        text: 'Some devices have no WebGL, and some users ask for reduced motion. Detect both, show a lightweight static version and make sure the page is fully usable without the canvas.',
      },
    ],
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function readingTime(post: BlogPost): number {
  const words = post.blocks
    .map((b) => {
      if (b.type === 'ul') return b.items.join(' ')
      if (b.type === 'code') return ''
      return b.text
    })
    .join(' ')
    .split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
