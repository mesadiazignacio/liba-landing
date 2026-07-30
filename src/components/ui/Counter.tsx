import { useEffect, useLayoutEffect, useRef } from 'react'
import { animate, useInView } from 'framer-motion'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'
import { EASE } from '../../lib/motion'

interface Props {
  end: number
  prefix?: string
  suffix?: string
  /** Milliseconds, to match the call sites. */
  duration?: number
  delay?: number
  className?: string
  /** Hold the count until something outside is ready. See BlurReveal. */
  play?: boolean
}

/**
 * Counts a real figure up to its value: +800 trámites, 48 hs. These numbers are
 * confirmed evidence, so the count has to land on them exactly and stay there.
 *
 * Three things were wrong with how it ran. It drove a `setInterval` at 16ms and
 * re-rendered on every tick; it started on a hardcoded delay whether or not it
 * had been scrolled to, so on any surface below the fold the count was over
 * before it was seen; and its cleanup called `setCount(0)`, flashing zero on
 * every unmount. Now it animates a value written straight to the node's text, and
 * it starts when it comes into view.
 */
export function Counter({
  end,
  prefix = '',
  suffix = '',
  duration = 1600,
  delay = 0,
  className,
  play = true,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduced = useReducedMotionSafe()

  // Reset to the start value before the first paint, not during render: the
  // markup carries the real figure so it survives a dead script, and this swap
  // happens early enough that the number never visibly counts backwards.
  useLayoutEffect(() => {
    if (reduced) return
    const node = ref.current
    if (node) node.textContent = `${prefix}0${suffix}`
  }, [reduced, prefix, suffix])

  useEffect(() => {
    const node = ref.current
    if (!node || reduced || !inView || !play) return

    const controls = animate(0, end, {
      duration: duration / 1000,
      delay: delay / 1000,
      ease: EASE.out,
      onUpdate: (value) => {
        node.textContent = `${prefix}${Math.round(value)}${suffix}`
      },
      // Land on the exact figure rather than wherever the easing rounds to.
      onComplete: () => {
        node.textContent = `${prefix}${end}${suffix}`
      },
    })

    return () => controls.stop()
  }, [inView, play, reduced, end, duration, delay, prefix, suffix])

  // Rendered at its final value, so the real number is present before any script
  // runs and nothing flashes if the animation never starts.
  return (
    <span ref={ref} className={className}>
      {prefix}
      {end}
      {suffix}
    </span>
  )
}
