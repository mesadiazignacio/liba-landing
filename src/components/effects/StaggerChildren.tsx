import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'
import { staggerContainer } from '../../lib/animations'

interface Props {
  children: ReactNode
  className?: string
  amount?: number
  delay?: number
  staggerDelay?: number
}

export function StaggerChildren({ children, className, amount = 0.1, delay = 0, staggerDelay = 0.07 }: Props) {
  // Every other component reads the preference through this hook, which resolves
  // framer's `boolean | null` to a boolean. This one called `useReducedMotion()`
  // directly, so a null read fell through to the animated branch.
  const shouldReduceMotion = useReducedMotionSafe()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        ...staggerContainer,
        visible: {
          ...staggerContainer.visible,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
