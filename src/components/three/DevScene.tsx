import { Canvas, useFrame, type ThreeElements } from '@react-three/fiber'
import { Outlines, RoundedBox, Sparkles } from '@react-three/drei'
import { useEffect, useMemo, useRef } from 'react'
import {
  DataTexture,
  DoubleSide,
  MathUtils,
  NearestFilter,
  Quaternion,
  RedFormat,
  Vector3,
  type CanvasTexture,
  type Group,
  type Mesh,
  type MeshToonMaterial,
  type PointLight,
} from 'three'
import {
  codeTexture,
  hoodieLogoTexture,
  keyboardTexture,
  labelTexture,
  lidTexture,
  mugLogoTexture,
  projectsPanelTexture,
  techPanelTexture,
  windowBarTexture,
} from './devTextures'

/**
 * Cartoon 3D hero: a developer typing on a glowing laptop, with floating panels
 * for the tech stack and projects. Everything is built from primitives and canvas
 * textures (no model downloads). Toon shading + inverted-hull outlines give the
 * stylised look; all animation is paused when off-screen or for reduced motion.
 */

interface DevSceneProps {
  active: boolean
  reducedMotion: boolean
}

/* ------------------------------ shared look ------------------------------ */

const GRADIENT = (() => {
  const t = new DataTexture(new Uint8Array([80, 160, 255]), 3, 1, RedFormat)
  t.minFilter = NearestFilter
  t.magFilter = NearestFilter
  t.needsUpdate = true
  return t
})()

function Toon(props: ThreeElements['meshToonMaterial']) {
  return <meshToonMaterial gradientMap={GRADIENT} {...props} />
}

const INK = '#090714'
const SKIN = '#f1b48c'
const SKIN_SHADE = '#d98f68'
const HAIR = '#1a1320'
const HOODIE = '#22225a'
const HOODIE_LIGHT = '#34347c'
const DESK = '#1d1a46'

const Y_AXIS = new Vector3(0, 1, 0)
const tmpDir = new Vector3()
const tmpQuat = new Quaternion()

function placeSegment(group: Group | null, a: Vector3, b: Vector3) {
  if (!group) return
  tmpDir.subVectors(b, a)
  const length = tmpDir.length()
  group.position.copy(a)
  group.quaternion.copy(tmpQuat.setFromUnitVectors(Y_AXIS, tmpDir.normalize()))
  group.scale.set(1, length, 1)
}

function Segment({ radius, color, innerRef, outline = false }: { radius: number; color: string; innerRef?: (g: Group | null) => void; outline?: boolean }) {
  return (
    <group ref={innerRef}>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[radius, radius, 1, 14]} />
        <Toon color={color} />
        {outline && <Outlines thickness={0.02} color={INK} />}
      </mesh>
    </group>
  )
}

function Rod({ from, to, radius, color }: { from: [number, number, number]; to: [number, number, number]; radius: number; color: string }) {
  return <Segment radius={radius} color={color} innerRef={(g) => placeSegment(g, new Vector3(...from), new Vector3(...to))} />
}

/* --------------------------------- arms ---------------------------------- */

/** Where each hand rests on the (angled) keyboard, in the character's local space. */
const HAND_TARGET = {
  '-1': { x: 0.78, y: -1.36, z: 0.98 },
  '1': { x: 1.28, y: -1.36, z: 1.3 },
} as const

function Arm({ side, animated, phase }: { side: 1 | -1; animated: boolean; phase: number }) {
  const upper = useRef<Group | null>(null)
  const fore = useRef<Group | null>(null)
  const elbow = useRef<Mesh>(null)
  const hand = useRef<Mesh>(null)
  const S = useMemo(() => new Vector3(side * 0.82, -0.02, -0.08), [side])
  const H = useMemo(() => new Vector3(), [])
  const E = useMemo(() => new Vector3(), [])

  useFrame((state) => {
    const t = animated ? state.clock.elapsedTime : 0
    const tap = Math.max(0, Math.sin(t * 11 + phase)) * 0.05
    const slide = Math.sin(t * 2.3 + phase) * 0.07
    const target = HAND_TARGET[side === 1 ? '1' : '-1']
    H.set(target.x + slide * 0.6, target.y + tap, target.z + slide * 0.4)
    E.set((S.x + H.x) / 2 + side * 0.16, (S.y + H.y) / 2 - 0.18, (S.z + H.z) / 2 - 0.02)
    placeSegment(upper.current, S, E)
    placeSegment(fore.current, E, H)
    elbow.current?.position.copy(E)
    hand.current?.position.copy(H)
  })

  return (
    <>
      <mesh position={[S.x, S.y, S.z]}>
        <sphereGeometry args={[0.24, 18, 18]} />
        <Toon color={HOODIE} />
      </mesh>
      <Segment radius={0.19} color={HOODIE} innerRef={(g) => (upper.current = g)} outline />
      <Segment radius={0.16} color={HOODIE} innerRef={(g) => (fore.current = g)} outline />
      <mesh ref={elbow}>
        <sphereGeometry args={[0.185, 14, 14]} />
        <Toon color={HOODIE} />
      </mesh>
      <mesh ref={hand} scale={[1.05, 0.62, 1.35]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <Toon color={SKIN} />
        <Outlines thickness={0.015} color={INK} />
      </mesh>
    </>
  )
}

/* ---------------------------------- head --------------------------------- */

const SPIKES: { theta: number; phi: number; len: number }[] = [
  ...[0, 2.1, 4.2].map((phi, i) => ({ theta: 0.3, phi, len: 0.42 + i * 0.04 })),
  ...[0.3, 1.3, 2.2, 3.1, 4.0, 5.0].map((phi, i) => ({ theta: 0.68, phi, len: 0.38 + (i % 3) * 0.07 })),
  ...[0.1, 0.95, 1.8, 2.6, 3.4, 4.2, 5.1, 5.8].map((phi, i) => ({ theta: 1.0, phi, len: 0.3 + (i % 2) * 0.08 })),
]

function Hair() {
  const R = 0.6
  const spikes = useMemo(
    () =>
      SPIKES.map((s) => {
        const n = new Vector3(Math.sin(s.theta) * Math.cos(s.phi), Math.cos(s.theta), Math.sin(s.theta) * Math.sin(s.phi))
        const q = new Quaternion().setFromUnitVectors(Y_AXIS, n.clone().add(new Vector3(0, 0.15, 0)).normalize())
        return { pos: n.clone().multiplyScalar(R * 0.96), q, len: s.len }
      }),
    [],
  )
  const bangs = [-0.36, -0.18, 0, 0.18, 0.36]

  return (
    <group position={[0, 0.06, -0.02]} rotation={[0.18, 0, 0]}>
      <mesh>
        <sphereGeometry args={[R, 28, 18, 0, Math.PI * 2, 0, 1.38]} />
        <Toon color={HAIR} side={DoubleSide} />
        <Outlines thickness={0.02} color={INK} />
      </mesh>
      {spikes.map((s, i) => (
        <mesh key={i} position={s.pos} quaternion={s.q}>
          <coneGeometry args={[0.13, s.len, 8]} />
          <Toon color={i % 4 === 0 ? '#2c2036' : HAIR} />
        </mesh>
      ))}
      {bangs.map((x, i) => (
        <mesh key={`b${i}`} position={[x, 0.36, 0.42]} rotation={[1.9, 0, -x * 0.9]}>
          <coneGeometry args={[0.12, 0.34, 8]} />
          <Toon color={HAIR} />
        </mesh>
      ))}
    </group>
  )
}

function Head({ animated }: { animated: boolean }) {
  const head = useRef<Group>(null)
  const eyes = useRef<Group>(null)

  useFrame((state, delta) => {
    const t = animated ? state.clock.elapsedTime : 0
    const { pointer } = state
    if (head.current) {
      const ty = (animated ? pointer.x * 0.35 : 0) + Math.sin(t * 0.8) * 0.05 - 0.25
      const tx = (animated ? -pointer.y * 0.2 : 0) + Math.sin(t * 1.3) * 0.02 + 0.05
      head.current.rotation.y = MathUtils.damp(head.current.rotation.y, ty, 5, delta)
      head.current.rotation.x = MathUtils.damp(head.current.rotation.x, tx, 5, delta)
    }
    if (eyes.current) {
      const blink = animated && t % 3.8 < 0.13
      eyes.current.scale.y = MathUtils.damp(eyes.current.scale.y, blink ? 0.08 : 1, 30, delta)
    }
  })

  return (
    <group ref={head} position={[0, 0.98, -0.02]}>
      <mesh scale={[1.03, 1.02, 0.98]}>
        <sphereGeometry args={[0.56, 32, 32]} />
        <Toon color={SKIN} />
        <Outlines thickness={0.025} color={INK} />
      </mesh>
      {([-1, 1] as const).map((s) => (
        <mesh key={s} position={[s * 0.57, -0.04, 0]} scale={[0.5, 1, 0.8]}>
          <sphereGeometry args={[0.11, 12, 12]} />
          <Toon color={SKIN_SHADE} />
        </mesh>
      ))}
      <Hair />

      <group ref={eyes}>
        {([-1, 1] as const).map((s) => (
          <group key={s} position={[s * 0.2, 0.04, 0.5]}>
            <mesh scale={[1, 1.18, 0.55]}>
              <sphereGeometry args={[0.115, 16, 16]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            <mesh position={[s * 0.01, -0.005, 0.045]} scale={[1, 1.1, 0.5]}>
              <sphereGeometry args={[0.075, 16, 16]} />
              <meshBasicMaterial color="#5b3a24" />
            </mesh>
            <mesh position={[s * 0.01, -0.005, 0.07]}>
              <sphereGeometry args={[0.038, 12, 12]} />
              <meshBasicMaterial color="#0b0710" />
            </mesh>
            <mesh position={[s * 0.01 + 0.03, 0.035, 0.09]}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </group>
        ))}
      </group>

      {([-1, 1] as const).map((s) => (
        <mesh key={`brow${s}`} position={[s * 0.2, 0.27, 0.5]} rotation={[0.1, 0, -s * 0.12]}>
          <boxGeometry args={[0.2, 0.04, 0.04]} />
          <Toon color={HAIR} />
        </mesh>
      ))}

      {/* glasses */}
      {([-1, 1] as const).map((s) => (
        <group key={`g${s}`} position={[s * 0.2, 0.04, 0.585]}>
          <mesh>
            <torusGeometry args={[0.175, 0.024, 10, 36]} />
            <Toon color="#0b0b14" />
          </mesh>
          <mesh>
            <circleGeometry args={[0.17, 28]} />
            <meshBasicMaterial color="#bfe0ff" transparent opacity={0.13} side={DoubleSide} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.07, 0.585]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.014, 0.014, 0.08, 8]} />
        <Toon color="#0b0b14" />
      </mesh>
      {([-1, 1] as const).map((s) => (
        <Rod key={`t${s}`} from={[s * 0.375, 0.05, 0.56]} to={[s * 0.58, 0.03, 0.05]} radius={0.015} color="#0b0b14" />
      ))}

      <mesh position={[0, -0.06, 0.56]} scale={[1, 0.8, 0.9]}>
        <sphereGeometry args={[0.05, 10, 10]} />
        <Toon color={SKIN_SHADE} />
      </mesh>
      <mesh position={[0.03, -0.2, 0.5]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.13, 0.014, 8, 24, Math.PI]} />
        <meshBasicMaterial color="#9a3f2b" />
      </mesh>
      {([-1, 1] as const).map((s) => (
        <mesh key={`c${s}`} position={[s * 0.33, -0.1, 0.43]} scale={[1, 0.7, 0.3]}>
          <sphereGeometry args={[0.09, 10, 10]} />
          <meshBasicMaterial color="#ff8f8f" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  )
}

/* ------------------------------- character ------------------------------- */

function Character({ animated, logo }: { animated: boolean; logo: CanvasTexture }) {
  const torso = useRef<Group>(null)
  const glow = useRef<MeshToonMaterial>(null)

  useFrame((state) => {
    const t = animated ? state.clock.elapsedTime : 0
    if (torso.current) torso.current.scale.y = 1 + Math.sin(t * 1.7) * 0.012
    if (glow.current) glow.current.emissiveIntensity = 1.2 + Math.sin(t * 2.4) * 0.6
  })

  return (
    <group rotation={[0, 0.32, 0]}>
      <group ref={torso}>
        <mesh position={[0, -0.55, -0.15]} scale={[1.2, 1, 0.88]} rotation={[0.06, 0, 0]}>
          <capsuleGeometry args={[0.66, 0.85, 8, 28]} />
          <Toon color={HOODIE} />
          <Outlines thickness={0.025} color={INK} />
        </mesh>
        <mesh position={[0, 0.4, -0.36]} scale={[1.15, 0.7, 0.7]}>
          <sphereGeometry args={[0.5, 20, 20]} />
          <Toon color={HOODIE} />
          <Outlines thickness={0.02} color={INK} />
        </mesh>
        <mesh position={[0, 0.4, 0.06]} rotation={[Math.PI / 2 + 0.25, 0, 0]}>
          <torusGeometry args={[0.37, 0.15, 14, 28]} />
          <Toon color={HOODIE_LIGHT} />
          <Outlines thickness={0.02} color={INK} />
        </mesh>
        <mesh position={[0, 0.52, -0.02]}>
          <cylinderGeometry args={[0.17, 0.2, 0.34, 14]} />
          <Toon color={SKIN_SHADE} />
        </mesh>
        {([-1, 1] as const).map((s) => (
          <group key={s}>
            <Rod from={[s * 0.17, 0.18, 0.46]} to={[s * 0.19, -0.42, 0.5]} radius={0.02} color="#f1f5f9" />
            <mesh position={[s * 0.19, -0.44, 0.5]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <Toon color="#f1f5f9" />
            </mesh>
          </group>
        ))}
        <mesh position={[0, -0.5, 0.455]} rotation={[0.06, 0, 0]}>
          <planeGeometry args={[0.62, 0.31]} />
          <meshBasicMaterial map={logo} transparent />
        </mesh>

        {/* headphones resting on the chest */}
        <mesh position={[0, 0.3, 0.06]} rotation={[-Math.PI / 2 + 0.2, 0, 0]}>
          <torusGeometry args={[0.66, 0.055, 10, 40, Math.PI]} />
          <Toon color="#15152a" />
        </mesh>
        {([-1, 1] as const).map((s) => (
          <group key={`cup${s}`} position={[s * 0.66, 0.02, 0.27]} rotation={[Math.PI / 2, 0, s * 0.35]}>
            <mesh>
              <cylinderGeometry args={[0.24, 0.24, 0.2, 24]} />
              <Toon color="#10101f" />
              <Outlines thickness={0.02} color={INK} />
            </mesh>
            <mesh position={[0, 0.11, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.15, 0.025, 8, 24]} />
              <Toon ref={s === 1 ? glow : undefined} color="#c084fc" emissive="#a855f7" emissiveIntensity={1.4} />
            </mesh>
          </group>
        ))}
      </group>

      <Head animated={animated} />
      <Arm side={1} animated={animated} phase={0} />
      <Arm side={-1} animated={animated} phase={1.9} />
      <Laptop />
    </group>
  )
}

function Laptop() {
  const lid = useMemo(() => lidTexture(), [])
  const keys = useMemo(() => keyboardTexture(), [])
  useEffect(
    () => () => {
      lid.dispose()
      keys.dispose()
    },
    [lid, keys],
  )

  return (
    <group position={[1.02, -1.43, 1.12]} rotation={[0, 0.9, 0]}>
      <RoundedBox args={[1.7, 0.07, 1.1]} radius={0.03} smoothness={3}>
        <Toon color="#3a3d63" />
        <Outlines thickness={0.015} color={INK} />
      </RoundedBox>
      <mesh position={[0, 0.037, 0.02]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.5, 0.92]} />
        <meshBasicMaterial map={keys} />
      </mesh>
      <group position={[0, 0.03, 0.55]} rotation={[0.28, 0, 0]}>
        <RoundedBox args={[1.7, 1.08, 0.05]} radius={0.03} smoothness={3} position={[0, 0.54, 0]}>
          <Toon color="#34375e" />
          <Outlines thickness={0.015} color={INK} />
        </RoundedBox>
        <mesh position={[0, 0.54, 0.03]}>
          <planeGeometry args={[1.55, 0.95]} />
          <meshBasicMaterial map={lid} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0.54, -0.03]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.55, 0.95]} />
          <meshBasicMaterial color="#1d3a8a" toneMapped={false} />
        </mesh>
      </group>
    </group>
  )
}

/* --------------------------------- props --------------------------------- */

function Panels({ animated }: { animated: boolean }) {
  const tech = useRef<Group>(null)
  const projects = useRef<Group>(null)
  const code = useRef<Group>(null)
  const techTex = useMemo(() => techPanelTexture(), [])
  const projTex = useMemo(() => projectsPanelTexture(), [])
  const codeTex = useMemo(() => codeTexture(), [])
  const barTex = useMemo(() => windowBarTexture(), [])
  const scrolling = useRef<CanvasTexture | null>(null)
  useEffect(() => {
    scrolling.current = codeTex
  }, [codeTex])
  useEffect(
    () => () => {
      techTex.dispose()
      projTex.dispose()
      codeTex.dispose()
      barTex.dispose()
    },
    [techTex, projTex, codeTex, barTex],
  )

  useFrame((state) => {
    const t = animated ? state.clock.elapsedTime : 0
    if (tech.current) tech.current.position.y = 0.55 + Math.sin(t * 1.2) * 0.07
    if (projects.current) projects.current.position.y = 0.8 + Math.sin(t * 1.1 + 1.5) * 0.07
    if (code.current) code.current.position.y = 1.3 + Math.sin(t * 0.9 + 3) * 0.05
    if (scrolling.current) scrolling.current.offset.y = (t * 0.06) % 1
  })

  return (
    <>
      <group ref={tech} position={[-2.65, 0.6, 0.0]} rotation={[0, 0.5, 0]}>
        <mesh>
          <planeGeometry args={[1.75, 2.0]} />
          <meshBasicMaterial map={techTex} transparent toneMapped={false} side={DoubleSide} />
        </mesh>
      </group>
      <group ref={projects} position={[2.6, 0.85, -0.2]} rotation={[0, -0.42, 0]}>
        <mesh>
          <planeGeometry args={[2.5, 2.08]} />
          <meshBasicMaterial map={projTex} transparent toneMapped={false} side={DoubleSide} />
        </mesh>
      </group>
      <group ref={code} position={[-0.9, 1.25, -2.4]} rotation={[0, 0.14, 0]}>
        <RoundedBox args={[3.3, 2.5, 0.08]} radius={0.12} smoothness={3}>
          <meshBasicMaterial color="#0b1030" />
        </RoundedBox>
        <mesh position={[0, 1.05, 0.05]}>
          <planeGeometry args={[3.2, 0.3]} />
          <meshBasicMaterial map={barTex} toneMapped={false} />
        </mesh>
        <mesh position={[0, -0.12, 0.05]}>
          <planeGeometry args={[3.2, 2.1]} />
          <meshBasicMaterial map={codeTex} toneMapped={false} />
        </mesh>
      </group>
    </>
  )
}

function Plant({ position, flip = 1, animated }: { position: [number, number, number]; flip?: 1 | -1; animated: boolean }) {
  const leaves = useRef<Group>(null)
  useFrame((state) => {
    const t = animated ? state.clock.elapsedTime : 0
    if (leaves.current) leaves.current.rotation.z = Math.sin(t * 1.1 + position[0]) * 0.03
  })
  const angles = [-0.9, -0.55, -0.2, 0.15, 0.5, 0.85]
  return (
    <group position={position} scale={0.9}>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.38, 0.28, 0.5, 18]} />
        <Toon color="#e8e6f2" />
        <Outlines thickness={0.02} color={INK} />
      </mesh>
      <group ref={leaves} position={[0, 0.5, 0]}>
        {angles.map((a, i) => (
          <mesh key={i} position={[Math.sin(a * flip) * 0.34, 0.45 + (i % 2) * 0.12, Math.cos(i) * 0.08]} rotation={[0, 0, -a * flip]} scale={[0.17, 0.72 + (i % 3) * 0.12, 0.06]}>
            <sphereGeometry args={[1, 12, 12]} />
            <Toon color={i % 2 ? '#22a45d' : '#15803d'} />
            <Outlines thickness={0.03} color={INK} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

function Books() {
  const specs = useMemo(
    () => [
      { text: 'DSA', bg: '#2b2f5c', yaw: 0.03 },
      { text: 'System Design', bg: '#292d57', yaw: -0.04 },
      { text: 'Full Stack Dev', bg: '#6b4a2a', yaw: 0.05 },
      { text: 'Data Analysis', bg: '#34385f', yaw: -0.02 },
    ],
    [],
  )
  const textures = useMemo(() => specs.map((s) => labelTexture(s.text, s.bg)), [specs])
  useEffect(() => () => textures.forEach((t) => t.dispose()), [textures])

  return (
    <group position={[-2.35, -1.54, 1.0]} rotation={[0, 0.22, 0]} scale={0.82}>
      {specs.map((s, i) => (
        <group key={s.text} position={[0, 0.15 + i * 0.3, 0]} rotation={[0, s.yaw, 0]}>
          <mesh>
            <boxGeometry args={[1.8, 0.28, 1.1]} />
            <Toon color={s.bg} />
            <Outlines thickness={0.015} color={INK} />
          </mesh>
          <mesh position={[0, 0, 0.552]}>
            <planeGeometry args={[1.8, 0.28]} />
            <meshBasicMaterial map={textures[i]} />
          </mesh>
          <mesh position={[0.905, 0, 0]}>
            <boxGeometry args={[0.02, 0.22, 1.02]} />
            <Toon color="#efe9dc" />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Mug() {
  const logo = useMemo(() => mugLogoTexture(), [])
  useEffect(() => () => logo.dispose(), [logo])
  return (
    <group position={[-1.2, -1.3, 1.5]} rotation={[0, 0.3, 0]}>
      <mesh>
        <cylinderGeometry args={[0.25, 0.23, 0.48, 24]} />
        <Toon color="#15152a" />
        <Outlines thickness={0.02} color={INK} />
      </mesh>
      <mesh position={[0.3, 0, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.13, 0.035, 10, 20]} />
        <Toon color="#15152a" />
      </mesh>
      <mesh position={[0, 0, 0.255]}>
        <planeGeometry args={[0.32, 0.32]} />
        <meshBasicMaterial map={logo} transparent />
      </mesh>
    </group>
  )
}

const CUBE_FACES = ['#d62828', '#f77f00', '#fdfdfd', '#fcd34d', '#2dc653', '#3a86ff']

function Rubik() {
  const cells = useMemo(() => {
    const out: [number, number, number][] = []
    for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) out.push([x, y, z])
    return out
  }, [])
  return (
    <group position={[3.05, -1.3, 0.7]} rotation={[0.2, 0.5, 0.05]} scale={0.9}>
      <mesh>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshBasicMaterial color="#0b0b14" />
      </mesh>
      {cells.map(([x, y, z]) => (
        <mesh key={`${x}${y}${z}`} position={[x * 0.1, y * 0.1, z * 0.1]}>
          <boxGeometry args={[0.092, 0.092, 0.092]} />
          {CUBE_FACES.map((c, i) => (
            <meshToonMaterial key={i} attach={`material-${i}`} color={c} gradientMap={GRADIENT} />
          ))}
        </mesh>
      ))}
    </group>
  )
}

function Lamp({ animated }: { animated: boolean }) {
  const light = useRef<PointLight>(null)
  useFrame((state) => {
    const t = animated ? state.clock.elapsedTime : 0
    if (light.current) light.current.intensity = 7 + Math.sin(t * 2) * 1.2
  })
  return (
    <group>
      <mesh position={[2.9, -1.5, -1.1]}>
        <cylinderGeometry args={[0.38, 0.42, 0.1, 20]} />
        <Toon color="#10101f" />
      </mesh>
      <Rod from={[2.9, -1.45, -1.1]} to={[2.7, 1.5, -1.2]} radius={0.05} color="#10101f" />
      <Rod from={[2.7, 1.5, -1.2]} to={[1.6, 1.95, -1.2]} radius={0.05} color="#10101f" />
      <group position={[1.45, 1.8, -1.2]} rotation={[0, 0, 0.5]}>
        <mesh>
          <coneGeometry args={[0.55, 0.6, 28, 1, true]} />
          <Toon color="#0f0f1e" side={DoubleSide} />
        </mesh>
        <mesh position={[0, -0.05, 0]} scale={[0.82, 0.8, 0.82]}>
          <coneGeometry args={[0.55, 0.6, 28, 1, true]} />
          <meshBasicMaterial color="#f0abfc" side={DoubleSide} />
        </mesh>
        <mesh position={[0, -0.25, 0]}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshBasicMaterial color="#fff1fb" />
        </mesh>
        <pointLight ref={light} position={[0, -0.4, 0.2]} color="#d8b4fe" intensity={7} distance={7} />
      </group>
    </group>
  )
}

function Notebook() {
  return (
    <group position={[1.7, -1.51, 2.1]} rotation={[0, -0.25, 0]}>
      <mesh>
        <boxGeometry args={[1.3, 0.05, 0.9]} />
        <Toon color="#e9e7f5" />
        <Outlines thickness={0.012} color={INK} />
      </mesh>
      <mesh position={[0.25, 0.04, 0.05]} rotation={[0, 0.5, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.9, 10]} />
        <Toon color="#15152a" />
      </mesh>
    </group>
  )
}

/* ---------------------------------- scene -------------------------------- */

function World({ animated }: { animated: boolean }) {
  const root = useRef<Group>(null)
  const logo = useMemo(() => hoodieLogoTexture(), [])
  useEffect(() => () => logo.dispose(), [logo])

  useFrame((state, delta) => {
    if (!root.current) return
    const { pointer } = state
    const ty = animated ? pointer.x * 0.16 : 0
    const tx = animated ? -pointer.y * 0.05 : 0
    root.current.rotation.y = MathUtils.damp(root.current.rotation.y, ty, 4, delta)
    root.current.rotation.x = MathUtils.damp(root.current.rotation.x, tx, 4, delta)
  })

  return (
    <>
      <ambientLight intensity={1.05} />
      <directionalLight position={[3, 5, 6]} intensity={2.3} color="#ffe9d8" />
      <pointLight position={[-4, 2, 3]} intensity={14} color="#6d5cff" distance={12} />
      <pointLight position={[4, -1, 3]} intensity={9} color="#22d3ee" distance={10} />
      <pointLight position={[0.4, -1.0, 2.2]} intensity={3.5} color="#7dd3fc" distance={3.5} />

      <group ref={root} position={[0, -0.1, 0]}>
        {/* desk and chair */}
        <RoundedBox args={[9.4, 0.2, 3.6]} radius={0.06} smoothness={3} position={[0, -1.65, 0.45]}>
          <Toon color={DESK} />
        </RoundedBox>
        <mesh position={[0, -1.6, 2.26]}>
          <boxGeometry args={[9.4, 0.035, 0.03]} />
          <meshBasicMaterial color="#a78bfa" />
        </mesh>
        <RoundedBox args={[2.3, 3.2, 0.5]} radius={0.25} smoothness={4} position={[0, -0.1, -1.0]}>
          <Toon color="#0f0f1f" />
          <Outlines thickness={0.02} color="#2d2a5c" />
        </RoundedBox>
        <mesh position={[0, 1.35, -0.85]}>
          <boxGeometry args={[0.9, 0.5, 0.35]} />
          <Toon color="#12122a" />
        </mesh>

        {/* back wall glow strips */}
        <mesh position={[-3.6, 2.35, -2.8]}>
          <boxGeometry args={[2.6, 0.06, 0.06]} />
          <meshBasicMaterial color="#fb923c" />
        </mesh>
        <mesh position={[3.4, 0.0, -2.8]}>
          <boxGeometry args={[2.4, 0.05, 0.05]} />
          <meshBasicMaterial color="#e879f9" />
        </mesh>

        <Panels animated={animated} />
        <Character animated={animated} logo={logo} />
        <Books />
        <Mug />
        <Plant position={[-3.3, -1.55, 0.0]} animated={animated} />
        <Plant position={[3.55, -1.55, 0.5]} flip={-1} animated={animated} />
        <Rubik />
        <Notebook />
        <Lamp animated={animated} />
        <Sparkles count={36} scale={[9, 5, 4]} size={3} speed={animated ? 0.4 : 0} color="#c4b5fd" opacity={0.8} />
      </group>
    </>
  )
}

export default function DevScene({ active, reducedMotion }: DevSceneProps) {
  const animated = active && !reducedMotion
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.05, 8.6], fov: 38 }}
      // 'demand' renders a single frame, so the scene still appears when paused or reduced-motion.
      frameloop={animated ? 'always' : 'demand'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <World animated={animated} />
    </Canvas>
  )
}
