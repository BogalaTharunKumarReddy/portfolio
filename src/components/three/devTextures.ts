import { CanvasTexture, RepeatWrapping, SRGBColorSpace } from 'three'

/**
 * Canvas-drawn textures for the hero developer scene (panels, laptop, books...).
 * Drawing in code keeps the scene free of image downloads. All text here is
 * taken from the portfolio's own data, so the scene never claims anything extra.
 */

type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number) => void

function make(w: number, h: number, draw: Draw): CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (ctx) draw(ctx, w, h)
  const tex = new CanvasTexture(canvas)
  tex.colorSpace = SRGBColorSpace
  tex.anisotropy = 4
  return tex
}

const rr = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
}

const SERIF = '"Times New Roman", Times, serif'

function glassPanel(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = 'rgba(16, 20, 56, 0.93)'
  rr(ctx, 0, 0, w, h, 40)
  ctx.fill()
  const g = ctx.createLinearGradient(0, 0, w, h)
  g.addColorStop(0, '#7c6bff')
  g.addColorStop(1, '#22d3ee')
  ctx.strokeStyle = g
  ctx.lineWidth = 8
  rr(ctx, 4, 4, w - 8, h - 8, 38)
  ctx.stroke()
}

export function techPanelTexture(): CanvasTexture {
  const items: { label: string; draw: (ctx: CanvasRenderingContext2D, x: number, y: number) => void }[] = [
    { label: 'HTML', draw: (c, x, y) => badge(c, x, y, '#e44d26', 'H5', '#fff') },
    { label: 'CSS', draw: (c, x, y) => badge(c, x, y, '#2965f1', 'CSS', '#fff') },
    { label: 'JavaScript', draw: (c, x, y) => badge(c, x, y, '#f7df1e', 'JS', '#111') },
    { label: 'Bootstrap', draw: (c, x, y) => badge(c, x, y, '#7952b3', 'B', '#fff') },
    {
      label: 'ReactJS',
      draw: (c, x, y) => {
        c.fillStyle = '#0b1b33'
        rr(c, x, y, 104, 104, 26)
        c.fill()
        c.strokeStyle = '#61dafb'
        c.lineWidth = 6
        for (let i = 0; i < 3; i++) {
          c.beginPath()
          c.ellipse(x + 52, y + 52, 40, 16, (i * Math.PI) / 3, 0, Math.PI * 2)
          c.stroke()
        }
        c.fillStyle = '#61dafb'
        c.beginPath()
        c.arc(x + 52, y + 52, 8, 0, Math.PI * 2)
        c.fill()
      },
    },
    { label: 'MySQL', draw: (c, x, y) => badge(c, x, y, '#00758f', 'SQL', '#fff') },
  ]
  function badge(c: CanvasRenderingContext2D, x: number, y: number, bg: string, text: string, fg: string) {
    c.fillStyle = bg
    rr(c, x, y, 104, 104, 26)
    c.fill()
    c.fillStyle = fg
    c.font = `bold ${text.length > 2 ? 40 : 54}px ${SERIF}`
    c.textAlign = 'center'
    c.textBaseline = 'middle'
    c.fillText(text, x + 52, y + 54)
  }

  return make(560, 640, (ctx, w, h) => {
    glassPanel(ctx, w, h)
    ctx.fillStyle = '#fff'
    ctx.font = `bold 62px ${SERIF}`
    ctx.textAlign = 'left'
    ctx.textBaseline = 'alphabetic'
    ctx.fillText('Tech Stack', 44, 100)
    ctx.fillStyle = 'rgba(255,255,255,0.18)'
    ctx.fillRect(44, 124, w - 88, 3)
    items.forEach((it, i) => {
      const col = i % 3
      const row = Math.floor(i / 3)
      const x = 44 + col * 166
      const y = 170 + row * 220
      it.draw(ctx, x, y)
      ctx.fillStyle = '#e2e8f0'
      ctx.font = `600 27px ${SERIF}`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'alphabetic'
      ctx.fillText(it.label, x + 52, y + 148)
    })
  })
}

export function projectsPanelTexture(): CanvasTexture {
  const rows = [
    { name: 'Student Hostel Management System', tag: 'Academic project', letter: 'H', hue: ['#7c3aed', '#4f46e5'] },
    { name: 'CampusConnect', tag: 'Academic project', letter: 'C', hue: ['#06b6d4', '#2563eb'] },
    { name: 'Customer Churn Prediction', tag: 'Data analysis', letter: 'D', hue: ['#14b8a6', '#0ea5e9'] },
  ]
  return make(720, 600, (ctx, w, h) => {
    glassPanel(ctx, w, h)
    ctx.fillStyle = '#fff'
    ctx.font = `bold 64px ${SERIF}`
    ctx.textAlign = 'left'
    ctx.fillText('Projects', 48, 100)
    ctx.fillStyle = 'rgba(255,255,255,0.18)'
    ctx.fillRect(48, 124, w - 96, 3)
    rows.forEach((r, i) => {
      const y = 152 + i * 144
      ctx.fillStyle = 'rgba(255,255,255,0.07)'
      rr(ctx, 40, y, w - 80, 124, 24)
      ctx.fill()
      const g = ctx.createLinearGradient(56, y, 156, y + 100)
      g.addColorStop(0, r.hue[0]!)
      g.addColorStop(1, r.hue[1]!)
      ctx.fillStyle = g
      rr(ctx, 58, y + 18, 88, 88, 22)
      ctx.fill()
      ctx.fillStyle = '#fff'
      ctx.font = `bold 52px ${SERIF}`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(r.letter, 102, y + 64)
      ctx.textBaseline = 'alphabetic'
      ctx.textAlign = 'left'
      let size = 36
      ctx.font = `bold ${size}px ${SERIF}`
      while (ctx.measureText(r.name).width > w - 80 - 130 - 30 && size > 20) {
        size -= 2
        ctx.font = `bold ${size}px ${SERIF}`
      }
      ctx.fillStyle = '#fff'
      ctx.fillText(r.name, 168, y + 56)
      ctx.fillStyle = 'rgba(56, 189, 248, 0.22)'
      rr(ctx, 168, y + 70, 220, 38, 19)
      ctx.fill()
      ctx.fillStyle = '#7dd3fc'
      ctx.font = `600 24px ${SERIF}`
      ctx.fillText(r.tag, 184, y + 97)
    })
  })
}

/** Tall code texture, drawn twice so it can scroll seamlessly. */
export function codeTexture(): CanvasTexture {
  const tex = make(512, 1024, (ctx, w, h) => {
    ctx.fillStyle = '#0b1030'
    ctx.fillRect(0, 0, w, h)
    const colors = ['#93c5fd', '#67e8f9', '#86efac', '#e2e8f0', '#fcd34d', '#c4b5fd', '#f9a8d4']
    let seed = 7
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296
      return seed / 4294967296
    }
    const lines = 28
    const half = h / 2
    const pattern = Array.from({ length: lines }, () => ({
      indent: Math.floor(rnd() * 4),
      tokens: Array.from({ length: 1 + Math.floor(rnd() * 3) }, () => ({ w: 30 + rnd() * 110, c: colors[Math.floor(rnd() * colors.length)]! })),
    }))
    for (let rep = 0; rep < 2; rep++) {
      pattern.forEach((line, i) => {
        const y = rep * half + 14 + i * (half / lines)
        ctx.fillStyle = 'rgba(148,163,184,0.45)'
        ctx.fillRect(14, y, 22, 8)
        let x = 56 + line.indent * 26
        line.tokens.forEach((t) => {
          ctx.fillStyle = t.c
          rr(ctx, x, y, t.w, 8, 4)
          ctx.fill()
          x += t.w + 12
        })
      })
    }
  })
  tex.wrapT = RepeatWrapping
  tex.repeat.set(1, 0.5)
  return tex
}

export function windowBarTexture(): CanvasTexture {
  return make(512, 48, (ctx, w, h) => {
    ctx.fillStyle = '#151a45'
    ctx.fillRect(0, 0, w, h)
    ;['#ef4444', '#f59e0b', '#22c55e'].forEach((c, i) => {
      ctx.fillStyle = c
      ctx.beginPath()
      ctx.arc(26 + i * 28, h / 2, 8, 0, Math.PI * 2)
      ctx.fill()
    })
    ctx.fillStyle = 'rgba(148,163,184,0.25)'
    rr(ctx, 130, 12, 300, 24, 12)
    ctx.fill()
  })
}

export function hoodieLogoTexture(): CanvasTexture {
  return make(256, 128, (ctx, w, h) => {
    ctx.fillStyle = '#eef2ff'
    ctx.font = 'bold 96px monospace'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('</>', w / 2, h / 2 + 4)
  })
}

export function lidTexture(): CanvasTexture {
  return make(512, 340, (ctx, w, h) => {
    ctx.fillStyle = '#0a0f2e'
    ctx.fillRect(0, 0, w, h)
    ctx.shadowColor = '#38bdf8'
    ctx.shadowBlur = 36
    ctx.fillStyle = '#7dd3fc'
    ctx.font = 'bold 170px monospace'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('</>', w / 2, h / 2 + 8)
    ctx.fillText('</>', w / 2, h / 2 + 8)
  })
}

export function keyboardTexture(): CanvasTexture {
  return make(512, 340, (ctx, w, h) => {
    ctx.fillStyle = '#12132b'
    ctx.fillRect(0, 0, w, h)
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 14; c++) {
        ctx.fillStyle = '#2a2b5a'
        rr(ctx, 14 + c * 34.5, 16 + r * 36, 29, 28, 6)
        ctx.fill()
      }
    }
    ctx.fillStyle = '#2a2b5a'
    rr(ctx, 120, 16 + 5 * 36, 270, 30, 6)
    ctx.fill()
  })
}

export function labelTexture(text: string, bg: string, fg = '#f8fafc'): CanvasTexture {
  return make(512, 128, (ctx, w, h) => {
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = fg
    ctx.font = `bold 62px ${SERIF}`
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, 56, h / 2 + 4)
    ctx.font = `bold 60px ${SERIF}`
    ctx.textAlign = 'right'
    ctx.fillText('›', w - 40, h / 2)
  })
}

export function mugLogoTexture(): CanvasTexture {
  return make(128, 128, (ctx, w, h) => {
    ctx.fillStyle = '#eef2ff'
    ctx.font = 'bold 56px monospace'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('</>', w / 2, h / 2)
  })
}
