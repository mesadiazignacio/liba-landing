import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'
import { DUR, EASE } from '../../lib/motion'

interface Props {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  amount?: number
  y?: number
  /**
   * Hold the entrance until something outside is ready — the hero uses it to wait
   * for the intro cover to lift. Content stays mounted while held, so it is in the
   * markup from the first byte.
   */
  play?: boolean
}

/**
 * The quiet reveal: content arrives as one mass, close to where it will land.
 *
 * This is the site's workhorse — around forty call sites — which is exactly why
 * it is understated. It used to travel 14px over 0.8s, and with a copy of it on
 * nearly every paragraph the page read as a sequence of slides rather than a
 * page. Half the distance and a shorter, more decisive curve leave the authored
 * moments (the case rail, the hero) as the only motion that asks for attention.
 *
 * `duration` is still accepted because call sites pass it, but the default is now
 * the one to reach for.
 */
export function BlurReveal({
  children,
  className = '',
  delay = 0,
  duration = DUR.entrance,
  amount = 0.2,
  y = 8,
  play = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount })
  const reduced = useReducedMotionSafe()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? undefined : { opacity: 0, y }}
      animate={reduced ? undefined : inView && play ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, ease: EASE.out, delay }}
    >
      {children}
    </motion.div>
  )
}
