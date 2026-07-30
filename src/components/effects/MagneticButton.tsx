import { useCallback, useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'
import { SPRING } from '../../lib/motion'

interface Props {
  children: ReactNode
  className?: string
  strength?: number
}

/**
 * Pulls a control very slightly toward the pointer — an acknowledgment that the
 * cursor has been noticed, before any click.
 *
 * Wraps seven call sites, so how it tracks matters: it used to `setState` on
 * every mousemove, re-rendering the button and its whole subtree per pointer
 * event, and re-read `getBoundingClientRect()` each time on top of that. Now the
 * offset lives in motion values written straight to the transform, and the rect
 * is measured once on enter — zero renders and one layout read per hover.
 */
export function MagneticButton({ children, className, strength = 0.3 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const rect = useRef<DOMRect | null>(null)
  const reduced = useReducedMotionSafe()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, SPRING.follow)
  const springY = useSpring(y, SPRING.follow)

  const handleEnter = useCallback(() => {
    rect.current = ref.current?.getBoundingClientRect() ?? null
  }, [])

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const bounds = rect.current
      if (!bounds) return
      x.set((e.clientX - (bounds.left + bounds.width / 2)) * strength)
      y.set((e.clientY - (bounds.top + bounds.height / 2)) * strength)
    },
    [strength, x, y],
  )

  const handleLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  )
}
