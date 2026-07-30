import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'
import { SPRING } from '../../lib/motion'
import { SHADOW } from '../../lib/shadows'
import { COLOR } from '../../lib/palette'

/**
 * The case rail — this site's one authored motion sequence.
 *
 * LIBA's product is the trámite resolved *and* the client knowing what stage it
 * is at; the registry's failure is opacity. So this is not a decorated list. A
 * coral fill advances along the rail as the visitor scrolls, and each marker
 * changes state at the exact offset the fill reaches it. The motion states the
 * promise: this moves, and you can see where it has got to.
 *
 * Two measurements make it honest rather than approximate:
 *
 * - The rail spans the first marker's centre to the last one's, so a full fill
 *   means the last stage, not the bottom of the final paragraph.
 * - Thresholds come from the rendered markers, because these stages carry wildly
 *   different amounts of copy. An even split would light stage 3 while the coral
 *   was still beside stage 2, breaking the only thing the sequence claims.
 *
 * Everything scroll-linked runs on motion values written straight to the DOM, so
 * advancing the rail costs no React renders.
 */

type Orientation = 'vertical' | 'horizontal'
type Tone = 'light' | 'dark'

interface Geometry {
  /** Offset of the first marker's centre from the track's leading edge, in px. */
  start: number
  /** Distance from the first marker's centre to the last, in px. */
  span: number
  thresholds: Map<HTMLElement, number>
}

const EMPTY_GEOMETRY: Geometry = { start: 0, span: 0, thresholds: new Map() }

interface TrackContext {
  progress: MotionValue<number>
  orientation: Orientation
  tone: Tone
  geometry: Geometry
  register: (marker: HTMLElement) => () => void
}

const StageTrackContext = createContext<TrackContext | null>(null)

const RAIL_TONE: Record<Tone, { base: string; number: string; ring: string }> = {
  // The unreached track uses the translucent-navy hairline from DESIGN.md rather
  // than border-cool: #dce8f6 is ~1.1:1 on white and ~1.05:1 on paper-cool, so a
  // 2px rail in it disappears and the sequence looks like it stops at the last
  // reached node instead of continuing.
  //
  // The pending number is the only place the stage's position is shown visually,
  // so it clears 4.5:1 (navy at 0.8 over white is ~5.1:1) rather than being
  // dimmed to signal "not yet" — the halo, fill, and ring already say that.
  light: {
    base: 'rgba(8,77,155,0.16)',
    number: 'rgba(8,77,155,0.8)',
    ring: 'rgba(8,77,155,0.2)',
  },
  dark: {
    base: 'rgba(255,255,255,0.22)',
    number: 'rgba(255,255,255,0.85)',
    ring: 'rgba(255,255,255,0.3)',
  },
}

const MARKER_SIZE = 40

interface StageTrackProps {
  children: ReactNode
  orientation?: Orientation
  /** Which band the track sits on, so the unreached rail stays visible on it. */
  tone?: Tone
  className?: string
}

export function StageTrack({
  children,
  orientation = 'vertical',
  tone = 'light',
  className = '',
}: StageTrackProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const markers = useRef(new Set<HTMLElement>())
  const [revision, setRevision] = useState(0)
  const [geometry, setGeometry] = useState<Geometry>(EMPTY_GEOMETRY)
  const reduced = useReducedMotionSafe()
  const isVertical = orientation === 'vertical'

  // Offsets are chosen so the rail begins filling as the first stage reaches
  // reading position and completes as the last one settles — not tied to the
  // viewport edges, which on a tall track would leave the final stage
  // permanently unreached.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: isVertical ? ['start 78%', 'end 62%'] : ['start 85%', 'end 68%'],
  })
  // SPRING.progress exists for exactly this and these four numbers were a verbatim
  // copy of it. The scroll-progress bar had the same drift in the other direction.
  const scrolled = useSpring(scrollYProgress, SPRING.progress)
  const complete = useMotionValue(1)
  // Reduced motion gets the finished state, not a frozen half-drawn rail: the
  // information the sequence carries must survive the preference.
  const progress = reduced ? complete : scrolled

  const remeasure = useCallback(() => setRevision((r) => r + 1), [])

  const register = useCallback(
    (marker: HTMLElement) => {
      markers.current.add(marker)
      remeasure()
      return () => {
        markers.current.delete(marker)
        remeasure()
      }
    },
    [remeasure],
  )

  // One read pass for every marker, after layout and with no writes in between,
  // so this does not force a reflow per stage.
  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track || markers.current.size === 0) return

    const trackRect = track.getBoundingClientRect()
    const axisOrigin = isVertical ? trackRect.top : trackRect.left

    const centers: Array<[HTMLElement, number]> = []
    let min = Infinity
    let max = -Infinity
    for (const marker of markers.current) {
      const rect = marker.getBoundingClientRect()
      const center =
        (isVertical ? rect.top + rect.height / 2 : rect.left + rect.width / 2) - axisOrigin
      centers.push([marker, center])
      if (center < min) min = center
      if (center > max) max = center
    }

    const span = Math.max(1, max - min)
    const thresholds = new Map<HTMLElement, number>()
    for (const [marker, center] of centers) {
      thresholds.set(marker, (center - min) / span)
    }
    setGeometry({ start: min, span, thresholds })
  }, [revision, isVertical])

  // Copy reflow moves the markers, so remeasure when the track resizes. Observing
  // the track alone is enough — any stage growing changes the track's own size.
  useEffect(() => {
    const track = trackRef.current
    if (!track || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(remeasure)
    observer.observe(track)
    return () => observer.disconnect()
  }, [remeasure])

  const ctx = useMemo<TrackContext>(
    () => ({ progress, orientation, tone, geometry, register }),
    [progress, orientation, tone, geometry, register],
  )

  const rail = RAIL_TONE[tone]
  const half = MARKER_SIZE / 2
  // The 2px rail is centred on the markers' centre line, hence the 1px back-off.
  const railBase = isVertical
    ? { top: geometry.start, height: geometry.span, left: half - 1, width: 2 }
    : { left: geometry.start, width: geometry.span, top: half - 1, height: 2 }

  return (
    <StageTrackContext.Provider value={ctx}>
      <div ref={trackRef} className={`relative ${className}`}>
        {geometry.span > 0 && (
          <>
            <div
              aria-hidden
              className="absolute"
              style={{ ...railBase, backgroundColor: rail.base }}
            />
            <motion.div
              aria-hidden
              className="absolute bg-coral"
              style={{
                ...railBase,
                ...(isVertical
                  ? { originY: 0, scaleY: progress }
                  : { originX: 0, scaleX: progress }),
              }}
            />
          </>
        )}
        {children}
      </div>
    </StageTrackContext.Provider>
  )
}

/** The list wrapper. Separate so the consumer owns gap and grid. */
export function StageList({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <ol className={`relative ${className}`}>{children}</ol>
}

interface StageProps {
  /** 1-based; rendered as the marker's label. */
  step: number
  children: ReactNode
  className?: string
}

/**
 * One stage. The marker carries the number and the reached state; `children` are
 * the stage's own content, composed by the consumer.
 */
export function Stage({ step, children, className = '' }: StageProps) {
  const ctx = useContext(StageTrackContext)
  if (!ctx) throw new Error('<Stage> must be rendered inside <StageTrack>')
  const { progress, orientation, tone, geometry, register } = ctx

  const markerRef = useRef<HTMLDivElement>(null)
  const rail = RAIL_TONE[tone]
  const isVertical = orientation === 'vertical'

  useEffect(() => {
    const marker = markerRef.current
    if (!marker) return
    return register(marker)
  }, [register])

  const threshold = (markerRef.current && geometry.thresholds.get(markerRef.current)) ?? 1

  // A tight window ending just past the threshold: the marker commits as the
  // coral passes through it, which is the whole point of measuring.
  const reach: [number, number] = [
    Math.max(0, threshold - 0.04),
    Math.min(1, Math.max(0.001, threshold + 0.01)),
  ]
  // Interpolation endpoints have to be literal values rather than classes, so they
  // come from the palette module — pending white to reached navy, with the coral
  // moving into the ring rather than behind the numeral.
  const markerBg = useTransform(progress, reach, [COLOR.white, COLOR.navy])
  const numberColor = useTransform(progress, reach, [rail.number, COLOR.white])
  const ringColor = useTransform(progress, reach, [rail.ring, COLOR.coral])
  const haloOpacity = useTransform(progress, reach, [0, 1])
  const haloScale = useTransform(progress, reach, [0.72, 1])

  // Content arrives ahead of its own marker so it is readable well before the
  // stage is reached. It moves but never dims: a stage the visitor has not
  // scrolled to yet is still theirs to read, and greying it would trade contrast
  // for a decorative point.
  const lead: [number, number] = [
    Math.max(0, threshold - 0.16),
    Math.max(0.001, threshold - 0.05),
  ]
  const contentY = useTransform(progress, lead, [10, 0])

  return (
    <li
      className={`relative ${isVertical ? 'flex gap-5 sm:gap-6' : 'flex flex-col items-center'} ${className}`}
    >
      <div
        ref={markerRef}
        aria-hidden
        className="relative z-10 flex-shrink-0"
        style={{ width: MARKER_SIZE, height: MARKER_SIZE }}
      >
        {/* Glow is a state in this system, never decoration: here it means the
            case has reached this stage. */}
        <motion.span
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            opacity: haloOpacity,
            scale: haloScale,
            boxShadow: SHADOW.stageReached,
          }}
        />
        <motion.span
          className="absolute inset-0 rounded-full border-2 flex items-center justify-center"
          style={{ backgroundColor: markerBg, borderColor: ringColor }}
        >
          <motion.span
            className="font-alverata font-black text-[15px] leading-none tabular-nums"
            style={{ color: numberColor }}
          >
            {step}
          </motion.span>
        </motion.span>
      </div>

      <motion.div
        style={{ y: contentY }}
        className={isVertical ? 'flex-1 min-w-0' : 'mt-6 w-full'}
      >
        {children}
      </motion.div>
    </li>
  )
}
