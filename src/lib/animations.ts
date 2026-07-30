import type { Variants } from 'framer-motion'
import { DUR, EASE, STAGGER_BUDGET } from './motion'

/**
 * Shared variants, all on the token scale so a timing change happens in one
 * place. Distances are short on purpose: these are supporting entrances, and the
 * authored motion on this site is the case rail.
 */

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.entrance, ease: EASE.out },
  },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.entrance, ease: EASE.out },
  },
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DUR.entrance, ease: EASE.out },
  },
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DUR.entrance, ease: EASE.out },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DUR.layout, ease: EASE.out },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
}

export const clipReveal: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    opacity: 1,
    // A wipe reads as a longer gesture than a fade, so it keeps a longer
    // duration than the entrance token.
    transition: { duration: STAGGER_BUDGET * 2.5, ease: EASE.out },
  },
}

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.layout, ease: EASE.out },
  },
}

export const cardVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.entrance, ease: EASE.out },
  },
}
