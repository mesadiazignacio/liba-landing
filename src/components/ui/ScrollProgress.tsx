import { motion, useScroll, useSpring } from 'framer-motion'
import { SPRING } from '../../lib/motion'

/**
 * The coral hairline across the top of the page.
 *
 * It rode `scrollYProgress` raw, so it tracked the wheel instead of reading as the
 * page advancing. `SPRING.progress` is the token for scroll-linked progress — the
 * case rail already runs on it — and this is the same gesture at page scale.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, SPRING.progress)

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-coral origin-left"
      style={{ scaleX: progress }}
    />
  )
}
