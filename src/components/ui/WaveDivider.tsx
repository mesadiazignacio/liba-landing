import { useEffect, useRef } from 'react'
import { getScrollY, onFrame } from '../../lib/ticker'

interface Props {
  fromColor: string
  toColor: string
  flip?: boolean
  className?: string
  /** Enable scroll-driven horizontal wave motion. Defaults to true. */
  animated?: boolean
  /** How much the wave shifts per pixel scrolled. Try 0.2 - 0.6. */
  scrollSpeed?: number
  /** Continuous idle drift in px/s so it never feels frozen. Set to 0 to disable. */
  idleSpeed?: number
}

// One wave cycle is 1440 units wide in the viewBox. The path spans two
// cycles so we can translate up to -1440px and still fill the viewport.
const WAVE_PERIOD = 1440
const WAVE_PATH =
  'M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 C1680,60 1920,0 2160,30 C2400,60 2640,0 2880,30 L2880,60 L0,60 Z'

export function WaveDivider({
  fromColor,
  toColor,
  flip = false,
  className,
  animated = true,
  scrollSpeed = 0.35,
  idleSpeed = 20,
}: Props) {
  const groupRef = useRef<SVGGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animated) return
    const group = groupRef.current
    const container = containerRef.current
    if (!group || !container) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReduced) return

    let idleOffset = 0
    let currentOffset = 0

    // Subscribed only while on screen, and to a loop shared with every other
    // divider rather than one of its own.
    let unsubscribe: (() => void) | null = null

    const step = (dt: number) => {
      idleOffset -= idleSpeed * dt

      const target = -getScrollY() * scrollSpeed + idleOffset
      currentOffset += (target - currentOffset) * Math.min(1, dt * 6)

      const wrapped = ((currentOffset % WAVE_PERIOD) + WAVE_PERIOD) % WAVE_PERIOD
      group.setAttribute('transform', `translate(${-wrapped}, 0)`)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!unsubscribe) unsubscribe = onFrame(step)
          } else if (unsubscribe) {
            unsubscribe()
            unsubscribe = null
          }
        }
      },
      { rootMargin: '100px' },
    )
    observer.observe(container)

    return () => {
      observer.disconnect()
      if (unsubscribe) unsubscribe()
    }
  }, [animated, scrollSpeed, idleSpeed])

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden leading-none ${className ?? ''}`}
      style={{ backgroundColor: fromColor }}
    >
      <svg
        viewBox="0 0 1440 60"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="block w-full"
        style={{
          height: '60px',
          transform: flip ? 'scaleY(-1)' : undefined,
        }}
      >
        <g ref={groupRef}>
          <path d={WAVE_PATH} fill={toColor} />
        </g>
      </svg>
    </div>
  )
}
