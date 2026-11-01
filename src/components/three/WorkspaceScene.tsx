import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Float, OrbitControls, RoundedBox } from '@react-three/drei'
import { useEffect, useMemo, useRef, useState } from 'react'
import { CanvasTexture, MathUtils, SRGBColorSpace, type Group, type Mesh } from 'three'

export interface WorkspaceState {
  /** 0..n-1 index into `screens`. */
  screen: number
  lampOn: boolean
}

interface WorkspaceSceneProps extends WorkspaceState {
  active: boolean
  reducedMotion: boolean
  screens: ScreenContent[]
  onCycleScreen: () => void
  onToggleLamp: () => void
}

export interface ScreenContent {
  title: string
  lines: { text: string; color: string }[]
}

/** Draws a code-editor style texture for the monitor. */
function useScreenTexture(content: ScreenContent) {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 576
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.fillStyle = '#060b1a'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#0c1630'
      ctx.fillRect(0, 0, canvas.width, 64)
      ;['#ef4444', '#f59e0b', '#22c55e'].forEach((c, i) => {
        ctx.fillStyle = c
        ctx.beginPath()
        ctx.arc(36 + i * 34, 32, 10, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.fillStyle = '#94a3b8'
      ctx.font = '600 26px monospace'
      ctx.fillText(content.title, 170, 41)
      ctx.font = '500 30px monospace'
      content.lines.forEach((line, i) => {
        ctx.fillStyle = '#334155'
        ctx.fillText(String(i + 1).padStart(2, ' '), 36, 130 + i * 52)
        ctx.fillStyle = line.color
        ctx.fillText(line.text, 100, 130 + i * 52)
      })
    }
    const tex = new CanvasTexture(canvas)
    tex.colorSpace = SRGBColorSpace
    return tex
  }, [content])

  useEffect(() => () => texture.dispose(), [texture])
  return texture
}

function Monitor({ content, onClick, glow }: { content: ScreenContent; onClick: () => void; glow: boolean }) {
  const texture = useScreenTexture(content)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [hovered])

  return (
    <group position={[0, 1.12, -0.35]}>
      <RoundedBox args={[2.5, 1.5, 0.08]} radius={0.04} smoothness={3}>
        <meshStandardMaterial color="#0b1224" metalness={0.6} roughness={0.35} />
      </RoundedBox>
      <mesh
        position={[0, 0, 0.045]}
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
        }}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[2.36, 1.33]} />
        <meshBasicMaterial map={texture} toneMapped={false} color={hovered ? '#ffffff' : '#dbeafe'} />
      </mesh>
      {glow && <pointLight position={[0, 0, 0.8]} color="#60a5fa" intensity={1.6} distance={3.5} />}
      <mesh position={[0, -0.95, 0.05]}>
        <boxGeometry args={[0.16, 0.45, 0.08]} />
        <meshStandardMaterial color="#111a33" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, -1.18, 0.12]}>
        <cylinderGeometry args={[0.5, 0.56, 0.05, 32]} />
        <meshStandardMaterial color="#111a33" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  )
}

function Keyboard() {
  const keys = useMemo(() => {
    const out: [number, number][] = []
    for (let row = 0; row < 4; row++) for (let col = 0; col < 12; col++) out.push([col, row])
    return out
  }, [])

  return (
    <group position={[0, 0.07, 0.75]} rotation={[-0.04, 0, 0]}>
      <RoundedBox args={[1.9, 0.06, 0.7]} radius={0.02} smoothness={2}>
        <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.4} />
      </RoundedBox>
      {keys.map(([c, r]) => (
        <mesh key={`${c}-${r}`} position={[-0.8 + c * 0.145, 0.05, -0.24 + r * 0.16]}>
          <boxGeometry args={[0.115, 0.04, 0.12]} />
          <meshStandardMaterial color={r === 3 && c > 2 && c < 9 ? '#1e3a8a' : '#1e293b'} roughness={0.5} />
        </mesh>
      ))}
    </group>
  )
}

function Lamp({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  const [hovered, setHovered] = useState(false)
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [hovered])

  return (
    <group
      position={[-1.9, 0.04, -0.2]}
      onClick={(e) => {
        e.stopPropagation()
        onToggle()
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={() => setHovered(false)}
    >
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.26, 0.3, 0.06, 32]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 1.0, 12]} />
        <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.3} />
      </mesh>
      <group position={[0.18, 1.08, 0]} rotation={[0, 0, -0.5]}>
        <mesh>
          <coneGeometry args={[0.3, 0.38, 32, 1, true]} />
          <meshStandardMaterial color="#1d4ed8" side={2} metalness={0.4} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.12, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshBasicMaterial color={on ? '#fef3c7' : '#334155'} />
        </mesh>
      </group>
      {on && <pointLight position={[0.35, 1.0, 0.1]} color="#fde68a" intensity={5} distance={5} />}
    </group>
  )
}

function Mug() {
  return (
    <group position={[1.7, 0.02, 0.5]}>
      <mesh position={[0, 0.17, 0]}>
        <cylinderGeometry args={[0.15, 0.13, 0.34, 28]} />
        <meshStandardMaterial color="#22d3ee" roughness={0.35} />
      </mesh>
      <mesh position={[0.17, 0.17, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.07, 0.022, 10, 20]} />
        <meshStandardMaterial color="#22d3ee" roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.33, 0]}>
        <cylinderGeometry args={[0.125, 0.125, 0.01, 28]} />
        <meshStandardMaterial color="#1c1917" />
      </mesh>
    </group>
  )
}

function Plant() {
  return (
    <Float speed={1.4} rotationIntensity={0.1} floatIntensity={0.15}>
      <group position={[1.95, 0.03, -0.45]}>
        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.15, 0.11, 0.28, 20]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.6} />
        </mesh>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} position={[Math.cos(i * 1.3) * 0.08, 0.42, Math.sin(i * 1.3) * 0.08]} rotation={[Math.sin(i) * 0.5, i, Math.cos(i * 2) * 0.5]}>
            <coneGeometry args={[0.07, 0.4, 8]} />
            <meshStandardMaterial color="#2dd4bf" roughness={0.6} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

function Desk() {
  return (
    <group>
      <RoundedBox args={[5.4, 0.12, 2.3]} radius={0.04} smoothness={3} position={[0, -0.06, 0.15]}>
        <meshStandardMaterial color="#17223f" metalness={0.25} roughness={0.55} />
      </RoundedBox>
      {[
        [-2.5, -1.1, 0.9],
        [2.5, -1.1, 0.9],
        [-2.5, -1.1, -0.6],
        [2.5, -1.1, -0.6],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]}>
          <boxGeometry args={[0.12, 2.0, 0.12]} />
          <meshStandardMaterial color="#0b1224" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
    </group>
  )
}

function Rig({ animated, children }: { animated: boolean; children: React.ReactNode }) {
  const group = useRef<Group>(null)
  const orb = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (!animated) return
    if (group.current) {
      group.current.position.y = MathUtils.damp(
        group.current.position.y,
        Math.sin(state.clock.elapsedTime * 0.6) * 0.03,
        3,
        delta,
      )
    }
    if (orb.current) orb.current.rotation.y += delta * 0.6
  })

  return (
    <group ref={group}>
      {children}
      <mesh ref={orb} position={[-0.35, 2.35, -0.3]}>
        <icosahedronGeometry args={[0.16, 0]} />
        <meshBasicMaterial color="#22d3ee" wireframe />
      </mesh>
    </group>
  )
}

export default function WorkspaceScene({
  active,
  reducedMotion,
  screen,
  lampOn,
  screens,
  onCycleScreen,
  onToggleLamp,
}: WorkspaceSceneProps) {
  const animated = active && !reducedMotion
  const content = screens[screen] ?? screens[0]!

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [3.4, 2.4, 5.2], fov: 38 }}
      frameloop={active ? 'always' : 'demand'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={lampOn ? 0.55 : 0.32} />
      <directionalLight position={[4, 6, 4]} intensity={lampOn ? 0.9 : 0.5} color="#93c5fd" />
      <Rig animated={animated}>
        <Desk />
        <Monitor content={content} onClick={onCycleScreen} glow />
        <Keyboard />
        <Lamp on={lampOn} onToggle={onToggleLamp} />
        <Mug />
        <Plant />
      </Rig>
      <ContactShadows position={[0, -2.1, 0]} opacity={0.5} scale={9} blur={2.6} far={3} color="#000000" />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3.6}
        maxPolarAngle={Math.PI / 2.1}
        minAzimuthAngle={-Math.PI / 3}
        maxAzimuthAngle={Math.PI / 3}
        autoRotate={animated}
        autoRotateSpeed={0.5}
        target={[0, 0.7, 0]}
      />
    </Canvas>
  )
}
