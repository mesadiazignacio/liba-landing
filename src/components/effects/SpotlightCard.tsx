import { useCallback, useRef, type CSSProperties } from 'react'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'
import { DUR } from '../../lib/motion'

interface Props {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
  spotlightSize?: number
}

/**
 * A light that follows the pointer across a navy feature card.
 *
 * The gradient position moves through two CSS custom properties instead of being
 * rebuilt as a new `background` string per pointer event, and the writes are
 * coalesced onto a frame. Setting a whole new gradient 60+ times a second meant
 * re-parsing the paint value and re-rendering React on every one of them.
 */
export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(255,255,255,0.09)',
  spotlightSize = 320,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const rect = useRef<DOMRect | null>(null)
  const frame = useRef(0)
  const pending = useRef({ x: 0, y: 0 })
  const reduced = useReducedMotionSafe()

  const flush = useCallback(() => {
    frame.current = 0
    const glow = glowRef.current
    if (!glow) return
    glow.style.setProperty('--spot-x', `${pending.current.x}px`)
    glow.style.setProperty('--spot-y', `${pending.current.y}px`)
  }, [])

  const handleEnter = useCallback(() => {
    rect.current = ref.current?.getBoundingClientRect() ?? null
    if (glowRef.current) glowRef.current.style.opacity = '1'
  }, [])

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const bounds = rect.current
      if (!bounds) return
      pending.current.x = e.clientX - bounds.left
      pending.current.y = e.clientY - bounds.top
      if (frame.current === 0) frame.current = requestAnimationFrame(flush)
    },
    [flush],
  )

  const handleLeave = useCallback(() => {
    if (frame.current) {
      cancelAnimationFrame(frame.current)
      frame.current = 0
    }
    if (glowRef.current) glowRef.current.style.opacity = '0'
  }, [])

  const glowStyle: CSSProperties = {
    opacity: 0,
    borderRadius: 'inherit',
    background: `radial-gradient(${spotlightSize}px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${spotlightColor}, transparent 70%)`,
    transition: `opacity ${DUR.layout}s ease-out`,
  }

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={reduced ? undefined : handleEnter}
      onMouseMove={reduced ? undefined : handleMove}
      onMouseLeave={reduced ? undefined : handleLeave}
    >
      {!reduced && (
        <div ref={glowRef} aria-hidden className="pointer-events-none absolute inset-0" style={glowStyle} />
      )}
      {children}
    </div>
  )
}
