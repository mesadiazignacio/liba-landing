import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'
import { DUR, EASE, STAGGER_BUDGET } from '../../lib/motion'

interface Props {
  children: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  delay?: number
  stagger?: number
  amount?: number
  /** Hold the entrance until something outside is ready. See BlurReveal. */
  play?: boolean
}

/**
 * Words rise into place from behind their own baseline. The site's loudest
 * entrance, so it is now reserved for the single display statement that opens a
 * surface — the h1 — rather than every heading on the page.
 *
 * The per-word delay is a preference, not a promise: whatever it is set to, the
 * last word starts within {@link STAGGER_BUDGET} of the first. Spanish headings
 * here run long ("Regularizá los trámites de tu vehículo con LIBA, Gestoría del
 * automotor." is twelve words), and at a fixed 0.04s step that heading took 1.2s
 * to finish arriving. Capping by count keeps a long heading and a short one
 * feeling like the same gesture.
 */
export function MaskReveal({
  children,
  className = '',
  as: Tag = 'div',
  delay = 0,
  stagger = 0.06,
  amount = 0.25,
  play = true,
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true, amount })
  const reduced = useReducedMotionSafe()

  const words = children.split(' ')

  if (reduced) {
    const El = Tag as React.ElementType
    return <El className={className}>{children}</El>
  }

  const step = words.length > 1 ? Math.min(stagger, STAGGER_BUDGET / (words.length - 1)) : 0

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className} aria-label={children}>
      {words.map((word, i) => (
        <span
          key={i}
          // The mask has to clear descenders and the accented capitals this copy
          // is full of (Regularizá, Gestoría, Trámites) — hence the padding and
          // the matching negative margin that keeps the line box unchanged.
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'bottom',
            paddingBottom: '0.18em',
            marginBottom: '-0.18em',
          }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '115%' }}
            animate={inView && play ? { y: '0%' } : {}}
            transition={{ duration: DUR.entrance, ease: EASE.out, delay: delay + i * step }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  )
}
