import { Lightbulb, LightbulbOff, Monitor, Moon, Sun } from 'lucide-react'
import { lazy, useState } from 'react'
import { SceneGate } from '@/components/three/SceneGate'
import type { ScreenContent } from '@/components/three/WorkspaceScene'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { ToolsPanel } from '@/components/workspace/ToolsPanel'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { profile } from '@/data/profile'
import { getSection } from '@/data/sections'

const WorkspaceScene = lazy(() => import('@/components/three/WorkspaceScene'))

const screens: ScreenContent[] = [
  {
    title: 'App.tsx',
    lines: [
      { text: 'export default function App() {', color: '#93c5fd' },
      { text: '  const dev = {', color: '#e2e8f0' },
      { text: `    name: "${profile.firstName}",`, color: '#67e8f9' },
      { text: '    role: "Frontend",', color: '#67e8f9' },
      { text: '    stack: ["HTML", "CSS", "JS", "React"],', color: '#67e8f9' },
      { text: '  }', color: '#e2e8f0' },
      { text: '  return <Portfolio dev={dev} />', color: '#86efac' },
      { text: '}', color: '#93c5fd' },
    ],
  },
  {
    title: 'terminal',
    lines: [
      { text: '$ npm run dev', color: '#e2e8f0' },
      { text: '  VITE ready in 227 ms', color: '#86efac' },
      { text: '  Local: http://localhost:5173', color: '#67e8f9' },
      { text: '$ npm run build', color: '#e2e8f0' },
      { text: '  ✓ built in 1.4s', color: '#86efac' },
      { text: '$ git push origin main', color: '#e2e8f0' },
      { text: '  Deployed to Vercel ✓', color: '#86efac' },
      { text: '$ _', color: '#67e8f9' },
    ],
  },
  {
    title: 'styles.css',
    lines: [
      { text: ':root {', color: '#93c5fd' },
      { text: '  --bg: #02040a;', color: '#e2e8f0' },
      { text: '  --blue: #3b82f6;', color: '#60a5fa' },
      { text: '  --cyan: #22d3ee;', color: '#67e8f9' },
      { text: '}', color: '#93c5fd' },
      { text: '.glass {', color: '#93c5fd' },
      { text: '  backdrop-filter: blur(16px);', color: '#e2e8f0' },
      { text: '}', color: '#93c5fd' },
    ],
  },
]

function WorkspaceFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center p-6">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#0c1630] p-4 font-code text-xs leading-6 shadow-glass">
        {screens[0]!.lines.map((line) => (
          <p key={line.text} style={{ color: line.color }}>
            {line.text}
          </p>
        ))}
      </div>
    </div>
  )
}

export function Workspace() {
  const section = getSection('workspace')
  const [screen, setScreen] = useState(0)
  const [lampOn, setLampOn] = useState(true)
  const night = lampOn

  const cycleScreen = () => setScreen((i) => (i + 1) % screens.length)
  const toggleLamp = () => setLampOn((on) => !on)

  return (
    <Section id={section.id}>
      <SectionHeading
        sectionId={section.id}
        eyebrow={section.eyebrow}
        title={section.title}
        highlight={section.highlight}
        description={section.description}
      />

      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <Reveal>
          <GlassCard spotlight={false} className="overflow-hidden p-2 sm:p-3">
            <div
              className={cn(
                'relative aspect-[4/3] w-full overflow-hidden rounded-xl transition-colors duration-700',
                night ? 'bg-[linear-gradient(180deg,#0c1630,#02040a)]' : 'bg-[linear-gradient(180deg,#6f9fe0,#dbe8f9)]',
              )}
            >
              <SceneGate
                className="absolute inset-0 h-full w-full touch-pan-y"
                label="Interactive 3D developer desk with a monitor, keyboard, lamp, mug and plant. Drag to look around."
                fallback={<WorkspaceFallback />}
              >
                {({ active, reducedMotion }) => (
                  <WorkspaceScene
                    active={active}
                    reducedMotion={reducedMotion}
                    screen={screen}
                    lampOn={lampOn}
                    screens={screens}
                    onCycleScreen={cycleScreen}
                    onToggleLamp={toggleLamp}
                  />
                )}
              </SceneGate>
              <p
                aria-hidden="true"
                className="pointer-events-none absolute bottom-3 left-4 font-mono text-xs uppercase tracking-[0.18em] text-white/80"
              >
                Drag to orbit · click monitor or lamp
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4">
              <p className="text-slate-400">
                Showing <span className="font-semibold text-brand-cyan">{screens[screen]!.title}</span>
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={cycleScreen}
                  leadingIcon={<Monitor className="h-4 w-4" aria-hidden="true" />}
                >
                  Change screen
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  aria-pressed={lampOn}
                  onClick={toggleLamp}
                  leadingIcon={
                    lampOn ? (
                      <Lightbulb className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <LightbulbOff className="h-4 w-4" aria-hidden="true" />
                    )
                  }
                >
                  {lampOn ? 'Lamp on' : 'Lamp off'}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={toggleLamp}
                  leadingIcon={night ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
                >
                  {night ? 'Switch to day' : 'Switch to night'}
                </Button>
              </div>
            </div>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.1}>
          <GlassCard spotlight={false} className="flex h-full flex-col p-4 sm:p-5">
            <h3 className="text-xl font-semibold">Tools I use</h3>
            <p className="mt-1 text-slate-400">What I build with day to day.</p>
            <div className="mt-4">
              <ToolsPanel />
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  )
}
